/**
 * EquiLedger Transactions Module (Personal Bank / UPI Accounts & Inter-Partner Settlements)
 * Selling prices are entered freely by the person recording the sale!
 */

const TransactionsModule = {
  selectedType: 'ALL',
  selectedPartnerFilter: 'ALL',
  searchQuery: '',
  saleLineItems: [],
  editingSaleLineItems: [],

  init() {
    this.bindEvents();
  },

  bindEvents() {
    const searchInput = document.getElementById('txSearch');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.render();
      });
    }

    const typeFilter = document.getElementById('txTypeFilter');
    if (typeFilter) {
      typeFilter.addEventListener('change', (e) => {
        this.selectedType = e.target.value;
        this.render();
      });
    }

    const partnerFilter = document.getElementById('txPartnerFilter');
    if (partnerFilter) {
      partnerFilter.addEventListener('change', (e) => {
        this.selectedPartnerFilter = e.target.value;
        this.render();
      });
    }

    // Forms
    const saleForm = document.getElementById('saleForm');
    if (saleForm) {
      saleForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleSaleSubmit(new FormData(saleForm));
      });
    }

    const editSaleForm = document.getElementById('editSaleForm');
    if (editSaleForm) {
      editSaleForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleEditSaleSubmit(new FormData(editSaleForm));
      });
    }

    const restockForm = document.getElementById('restockForm');
    if (restockForm) {
      restockForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleRestockSubmit(new FormData(restockForm));
      });
    }

    const editRestockForm = document.getElementById('editRestockForm');
    if (editRestockForm) {
      editRestockForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleEditRestockSubmit(new FormData(editRestockForm));
      });
    }

    const expenseForm = document.getElementById('expenseForm');
    if (expenseForm) {
      expenseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleExpenseSubmit(new FormData(expenseForm));
      });
    }

    const editExpenseForm = document.getElementById('editExpenseForm');
    if (editExpenseForm) {
      editExpenseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleEditExpenseSubmit(new FormData(editExpenseForm));
      });
    }

    const partnerTxForm = document.getElementById('partnerTxForm');
    if (partnerTxForm) {
      partnerTxForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handlePartnerTxSubmit(new FormData(partnerTxForm));
      });
    }

    const editPartnerTxForm = document.getElementById('editPartnerTxForm');
    if (editPartnerTxForm) {
      editPartnerTxForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleEditPartnerTxSubmit(new FormData(editPartnerTxForm));
      });
    }

    const partnerTransferForm = document.getElementById('partnerTransferForm');
    if (partnerTransferForm) {
      partnerTransferForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handlePartnerTransferSubmit(new FormData(partnerTransferForm));
      });
    }
  },

  render() {
    const state = window.Store.getState();
    const transactions = state.transactions || [];
    const tbody = document.getElementById('transactionsTableBody');
    if (!tbody) return;

    const filtered = transactions.filter(tx => {
      const matchesType = this.selectedType === 'ALL' || tx.type === this.selectedType;
      const matchesPartner = this.selectedPartnerFilter === 'ALL' || 
        tx.recordedBy === this.selectedPartnerFilter || 
        tx.partnerName === this.selectedPartnerFilter ||
        tx.partnerId === this.selectedPartnerFilter ||
        tx.holdingPartnerName === this.selectedPartnerFilter ||
        tx.holdingPartnerId === this.selectedPartnerFilter;

      const desc = (tx.description || '').toLowerCase();
      const customer = (tx.customer || '').toLowerCase();
      const vendor = (tx.vendor || '').toLowerCase();
      const cat = (tx.category || '').toLowerCase();
      const user = (tx.recordedBy || '').toLowerCase();
      const holding = (tx.holdingPartnerName || '').toLowerCase();

      const matchesSearch = !this.searchQuery ||
        desc.includes(this.searchQuery) ||
        customer.includes(this.searchQuery) ||
        vendor.includes(this.searchQuery) ||
        cat.includes(this.searchQuery) ||
        user.includes(this.searchQuery) ||
        holding.includes(this.searchQuery);

      return matchesType && matchesPartner && matchesSearch;
    });

    this.updatePartnerFilterOptions(state.partners);
    this.populateExpenseCategoryDropdowns();
    this.populatePartnerAccountDropdowns();

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align:center; padding: 36px 16px;">
            <div class="empty-state">
              <div class="empty-state-icon">📋</div>
              <div class="empty-state-title">No transactions found</div>
              <div class="empty-state-desc">Use the action buttons above to record sales, expenses, restocks, or partner transfers.</div>
            </div>
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = filtered.map(tx => {
      let typeBadge = '';
      let cashClass = '';
      let cashPrefix = '+';

      switch (tx.type) {
        case 'SALE':
          typeBadge = '<span class="badge badge-sale">SALE</span>';
          cashClass = 'color: var(--color-success); font-weight: 700;';
          cashPrefix = '+';
          break;
        case 'PURCHASE':
          typeBadge = '<span class="badge badge-purchase">RESTOCK</span>';
          cashClass = 'color: var(--color-danger); font-weight: 700;';
          cashPrefix = '-';
          break;
        case 'EXPENSE':
          typeBadge = '<span class="badge badge-expense">EXPENSE</span>';
          cashClass = 'color: var(--color-danger); font-weight: 700;';
          cashPrefix = '-';
          break;
        case 'INJECTION':
          typeBadge = '<span class="badge badge-injection">CAPITAL IN</span>';
          cashClass = 'color: var(--color-purple); font-weight: 700;';
          cashPrefix = '+';
          break;
        case 'DRAWING':
          typeBadge = '<span class="badge badge-drawing">DRAWING</span>';
          cashClass = 'color: var(--color-warning); font-weight: 700;';
          cashPrefix = '-';
          break;
        case 'TRANSFER':
          typeBadge = '<span class="badge" style="background: rgba(59, 130, 246, 0.15); color: var(--color-primary); border: 1px solid var(--color-primary);">SETTLEMENT</span>';
          cashClass = 'color: var(--color-primary); font-weight: 700;';
          cashPrefix = '⇄ ';
          break;
      }

      let stockBadge = '<span style="color: var(--text-muted);">-</span>';
      if (tx.stockImpact) {
        if (tx.stockImpact > 0) {
          stockBadge = `<span style="color: var(--color-success); font-weight: 600;">+${tx.stockImpact} pcs</span>`;
        } else if (tx.stockImpact < 0) {
          stockBadge = `<span style="color: var(--color-danger); font-weight: 600;">${tx.stockImpact} pcs</span>`;
        }
      }

      const partyName = tx.customer || tx.vendor || tx.partnerName || tx.paidTo || '';

      // Personal Account Badge
      let accountBadge = '';
      if (tx.type === 'SALE' && tx.holdingPartnerName) {
        accountBadge = `<span style="display: inline-block; font-size: 11px; background: rgba(16, 185, 129, 0.1); color: var(--color-success); border: 1px solid rgba(16, 185, 129, 0.25); padding: 1px 6px; border-radius: var(--radius-sm); margin-top: 3px;">💰 Received in: <strong>${tx.holdingPartnerName}'s Account</strong></span>`;
      } else if (tx.type === 'PURCHASE') {
        if (tx.payers && Array.isArray(tx.payers) && tx.payers.length > 0) {
          const payerStr = tx.payers.map(p => `<strong>${p.partnerName}</strong> (₹${Number(p.amount).toLocaleString('en-IN')})`).join(' + ');
          accountBadge = `<span style="display: inline-block; font-size: 11px; background: rgba(245, 158, 11, 0.12); color: var(--color-warning); border: 1px solid rgba(245, 158, 11, 0.3); padding: 1px 6px; border-radius: var(--radius-sm); margin-top: 3px;">📦 Stock Paid by: ${payerStr}</span>`;
        } else if (tx.holdingPartnerName) {
          accountBadge = `<span style="display: inline-block; font-size: 11px; background: rgba(239, 68, 68, 0.08); color: var(--color-danger); border: 1px solid rgba(239, 68, 68, 0.2); padding: 1px 6px; border-radius: var(--radius-sm); margin-top: 3px;">💳 Paid by: <strong>${tx.holdingPartnerName}'s Account</strong></span>`;
        }
      } else if (tx.type === 'EXPENSE' && tx.holdingPartnerName) {
        accountBadge = `<span style="display: inline-block; font-size: 11px; background: rgba(239, 68, 68, 0.08); color: var(--color-danger); border: 1px solid rgba(239, 68, 68, 0.2); padding: 1px 6px; border-radius: var(--radius-sm); margin-top: 3px;">💳 Paid by: <strong>${tx.holdingPartnerName}'s Account</strong></span>`;
      } else if (tx.type === 'TRANSFER') {
        accountBadge = `<span style="display: inline-block; font-size: 11px; background: rgba(59, 130, 246, 0.08); color: var(--color-primary); border: 1px solid rgba(59, 130, 246, 0.2); padding: 1px 6px; border-radius: var(--radius-sm); margin-top: 3px;">From: <strong>${tx.fromPartnerName}</strong> → To: <strong>${tx.toPartnerName}</strong></span>`;
      }

      return `
        <tr>
          <td style="white-space: nowrap;">
            <div style="font-weight: 600; font-size: 13px;">${window.UI.formatDate(tx.date)}</div>
            <div style="font-size: 11px; color: var(--text-muted);">${tx.paymentMethod || 'UPI / Bank'}</div>
          </td>
          <td>${typeBadge}</td>
          <td>
            <div style="font-weight: 600; color: var(--text-primary); font-size: 13.5px;">${tx.description || tx.category}</div>
            ${partyName ? `<div style="font-size: 11.5px; color: var(--text-secondary);">${partyName}</div>` : ''}
            ${accountBadge}
            ${tx.lastEditedBy ? `<div style="font-size: 10px; color: var(--color-warning); font-style: italic; margin-top: 2px;">✎ Edited by ${tx.lastEditedBy}</div>` : ''}
          </td>
          <td>
            <div class="user-tag">
              <span class="user-tag-avatar">${(tx.recordedBy || 'U')[0].toUpperCase()}</span>
              <span>${tx.recordedBy || 'Staff'}</span>
            </div>
          </td>
          <td>${stockBadge}</td>
          <td style="${cashClass}; font-size: 14px; font-family: var(--font-sans);">
            ${cashPrefix}${window.UI.formatCurrency(tx.amount)}
          </td>
          <td>
            <div style="display: flex; align-items: center; gap: 6px;">
              <button class="btn btn-primary btn-xs" onclick="TransactionsModule.openEditModal('${tx.id}')" title="Edit this transaction">
                ✎ Edit
              </button>
              <button class="btn btn-secondary btn-xs" onclick="TransactionsModule.viewDetails('${tx.id}')" title="View details">
                👁 View
              </button>
              <button class="btn btn-outline btn-xs" style="color: var(--color-danger);" onclick="TransactionsModule.confirmDelete('${tx.id}')" title="Delete transaction">
                ✕
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  },

  updatePartnerFilterOptions(partners = []) {
    const partnerSelect = document.getElementById('txPartnerFilter');
    if (!partnerSelect) return;

    const currentVal = this.selectedPartnerFilter;
    let html = `<option value="ALL">All Partners / Personal Accounts</option>`;
    for (const p of partners) {
      html += `<option value="${p.name}" ${p.name === currentVal ? 'selected' : ''}>${p.name}</option>`;
    }
    partnerSelect.innerHTML = html;
  },

  populatePartnerAccountDropdowns() {
    const state = window.Store.getState();
    const partners = state.partners || [];
    const activeUserId = state.activeUser ? state.activeUser.id : partners[0]?.id;

    const partnerSelectIds = [
      'salePartnerAccountSelect',
      'editSalePartnerAccountSelect',
      'expensePartnerAccountSelect',
      'editExpensePartnerAccountSelect',
      'restockPartnerAccountSelect',
      'editRestockPartnerAccountSelect',
      'transferFromPartnerSelect',
      'transferToPartnerSelect'
    ];

    for (const selectId of partnerSelectIds) {
      const el = document.getElementById(selectId);
      if (el) {
        const currentVal = el.value;
        el.innerHTML = partners.map(p => 
          `<option value="${p.id}">${p.name}'s Personal Account / UPI</option>`
        ).join('');

        if (currentVal && partners.some(p => p.id === currentVal)) {
          el.value = currentVal;
        } else if (selectId === 'transferToPartnerSelect' && partners.length > 1) {
          el.value = partners[1].id;
        } else if (activeUserId) {
          el.value = activeUserId;
        }
      }
    }
  },

  populateExpenseCategoryDropdowns() {
    const state = window.Store.getState();
    const categories = state.expenseCategories || [];

    const selects = ['expenseCategorySelect', 'editExpenseCategorySelect'];
    for (const selectId of selects) {
      const el = document.getElementById(selectId);
      if (el) {
        const currentVal = el.value;
        el.innerHTML = categories.map(c => `<option value="${c}">${c}</option>`).join('');
        if (currentVal && categories.includes(currentVal)) {
          el.value = currentVal;
        }
      }
    }
  },

  // -------------------------------------------------------------
  // EDIT TRANSACTION ROUTING
  // -------------------------------------------------------------
  openEditModal(txId) {
    const state = window.Store.getState();
    const tx = (state.transactions || []).find(t => t.id === txId);
    if (!tx) return;

    switch (tx.type) {
      case 'SALE':
        this.openEditSaleModal(tx);
        break;
      case 'PURCHASE':
        this.openEditRestockModal(tx);
        break;
      case 'EXPENSE':
        this.openEditExpenseModal(tx);
        break;
      case 'INJECTION':
      case 'DRAWING':
        this.openEditPartnerTxModal(tx);
        break;
      case 'TRANSFER':
        this.openEditPartnerTransferModal(tx);
        break;
    }
  },

  // -------------------------------------------------------------
  // SALE WORKFLOW (TRACK WHICH PERSONAL ACCOUNT RECEIVED MONEY)
  // -------------------------------------------------------------
  openSaleModal() {
    this.saleLineItems = [];
    const form = document.getElementById('saleForm');
    if (form) form.reset();
    document.getElementById('saleDate').value = new Date().toISOString().split('T')[0];

    this.populatePartnerAccountDropdowns();
    this.addSaleLineItem();
    window.UI.openModal('saleModal');
  },

  addSaleLineItem() {
    const state = window.Store.getState();
    const products = state.products || [];
    const firstProduct = products.find(p => p.stock > 0) || products[0];

    this.saleLineItems.push({
      productId: firstProduct ? firstProduct.id : '',
      quantity: 1,
      unitPrice: firstProduct ? (firstProduct.costPrice ? Math.round(firstProduct.costPrice * 1.5) : 0) : 0,
      unitCost: firstProduct ? (firstProduct.costPrice || 0) : 0
    });

    this.renderSaleLineItems();
  },

  removeSaleLineItem(index) {
    if (this.saleLineItems.length > 1) {
      this.saleLineItems.splice(index, 1);
      this.renderSaleLineItems();
    } else {
      window.UI.showToast('Sale must have at least one product.', 'info');
    }
  },

  onSaleProductChange(index, productId) {
    const state = window.Store.getState();
    const prod = (state.products || []).find(p => p.id === productId);
    if (prod && this.saleLineItems[index]) {
      this.saleLineItems[index].productId = prod.id;
      this.saleLineItems[index].unitCost = prod.costPrice || 0;
      if (!this.saleLineItems[index].unitPrice) {
        this.saleLineItems[index].unitPrice = Math.round((prod.costPrice || 0) * 1.5);
      }
      this.renderSaleLineItems();
    }
  },

  onSaleQtyChange(index, qty) {
    const num = Math.max(1, parseInt(qty, 10) || 1);
    if (this.saleLineItems[index]) {
      this.saleLineItems[index].quantity = num;
      const lineTotal = num * (this.saleLineItems[index].unitPrice || 0);
      const totalEl = document.getElementById(`saleLineTotal_${index}`);
      if (totalEl) totalEl.innerText = window.UI.formatCurrency(lineTotal);
      this.updateSaleSummaryBox();
    }
  },

  onSalePriceChange(index, price) {
    const num = Math.max(0, parseFloat(price) || 0);
    if (this.saleLineItems[index]) {
      this.saleLineItems[index].unitPrice = num;
      const lineTotal = (this.saleLineItems[index].quantity || 1) * num;
      const totalEl = document.getElementById(`saleLineTotal_${index}`);
      if (totalEl) totalEl.innerText = window.UI.formatCurrency(lineTotal);
      this.updateSaleSummaryBox();
    }
  },

  updateSaleSummaryBox() {
    let totalRevenue = 0;
    let totalCOGS = 0;

    for (const item of this.saleLineItems) {
      const lineTotal = (item.quantity || 1) * (item.unitPrice || 0);
      const lineCost = (item.quantity || 1) * (item.unitCost || 0);
      totalRevenue += lineTotal;
      totalCOGS += lineCost;
    }

    const grossProfit = totalRevenue - totalCOGS;
    const marginPct = totalRevenue > 0 ? ((grossProfit / totalRevenue) * 100).toFixed(1) : 0;

    const summaryBox = document.getElementById('saleSummaryBox');
    if (summaryBox) {
      summaryBox.innerHTML = `
        <div class="order-summary-row">
          <span>Gross Sales Revenue:</span>
          <span style="font-weight: 700; color: var(--text-primary);">${window.UI.formatCurrency(totalRevenue)}</span>
        </div>
        <div class="order-summary-row">
          <span>Cost of Goods Sold (COGS):</span>
          <span style="color: var(--text-muted);">${window.UI.formatCurrency(totalCOGS)}</span>
        </div>
        <div class="order-summary-row">
          <span>Estimated Gross Profit:</span>
          <span style="font-weight: 700; color: var(--color-success);">${window.UI.formatCurrency(grossProfit)} (${marginPct}%)</span>
        </div>
      `;
    }
  },

  renderSaleLineItems() {
    const container = document.getElementById('saleLineItemsContainer');
    if (!container) return;

    const state = window.Store.getState();
    const products = state.products || [];

    container.innerHTML = this.saleLineItems.map((item, idx) => {
      const lineTotal = (item.quantity || 1) * (item.unitPrice || 0);

      const productOptions = products.map(p => {
        const isSelected = p.id === item.productId ? 'selected' : '';
        const loc = p.location ? ` [📍 ${p.location}]` : '';
        const costStr = p.costPrice ? ` (Cost: ₹${p.costPrice.toLocaleString('en-IN')})` : '';
        return `<option value="${p.id}" ${isSelected}>${p.name} (Stock: ${p.stock})${loc}${costStr}</option>`;
      }).join('');

      return `
        <div class="item-row">
          <div>
            <label style="font-size: 11px; color: var(--text-muted); margin-bottom: 2px; display: block;">Select Product</label>
            <select class="form-control" onchange="TransactionsModule.onSaleProductChange(${idx}, this.value)">
              ${productOptions}
            </select>
          </div>
          <div>
            <label style="font-size: 11px; color: var(--text-muted); margin-bottom: 2px; display: block;">Qty</label>
            <input type="number" min="1" class="form-control" value="${item.quantity}" oninput="TransactionsModule.onSaleQtyChange(${idx}, this.value)">
          </div>
          <div>
            <label style="font-size: 11px; color: var(--color-primary); font-weight: 700; margin-bottom: 2px; display: block;">Selling Rate (₹)</label>
            <input type="number" step="1" min="0" class="form-control" style="font-weight: 700; border-color: var(--color-primary);" value="${item.unitPrice || ''}" placeholder="0" oninput="TransactionsModule.onSalePriceChange(${idx}, this.value)">
          </div>
          <div>
            <label style="font-size: 11px; color: var(--text-muted); margin-bottom: 2px; display: block;">Line Total</label>
            <div id="saleLineTotal_${idx}" style="font-weight: 700; color: var(--color-primary); padding: 9px 0;">${window.UI.formatCurrency(lineTotal)}</div>
          </div>
          <div>
            <label style="font-size: 11px; visibility: hidden; margin-bottom: 2px; display: block;">Del</label>
            <button type="button" class="item-row-btn-delete" onclick="TransactionsModule.removeSaleLineItem(${idx})" title="Remove item">
              ✕
            </button>
          </div>
        </div>
      `;
    }).join('');

    this.updateSaleSummaryBox();
  },

  handleSaleSubmit(formData) {
    const customer = formData.get('customer')?.trim() || 'Retail Customer';
    const date = formData.get('date') || new Date().toISOString().split('T')[0];
    const holdingPartnerId = formData.get('holdingPartnerId');
    const paymentMethod = formData.get('paymentMethod') || 'UPI / Personal Bank';
    const notes = formData.get('notes')?.trim() || '';

    const state = window.Store.getState();
    const products = state.products || [];
    const holdingPartner = state.partners.find(p => p.id === holdingPartnerId) || state.partners[0];

    if (this.saleLineItems.length === 0) {
      window.UI.showToast('Please add at least one product to the sale.', 'danger');
      return;
    }

    let totalRevenue = 0;
    let totalCOGS = 0;
    let totalQty = 0;
    const formattedItems = [];

    for (const item of this.saleLineItems) {
      const prod = products.find(p => p.id === item.productId);
      if (!prod) {
        window.UI.showToast('Invalid product selected.', 'danger');
        return;
      }

      if (!item.unitPrice || item.unitPrice <= 0) {
        window.UI.showToast(`Please enter a valid selling rate for "${prod.name}".`, 'warning');
        return;
      }

      const lineTotal = item.quantity * item.unitPrice;
      const lineCost = item.quantity * (prod.costPrice || 0);

      totalRevenue += lineTotal;
      totalCOGS += lineCost;
      totalQty += item.quantity;

      formattedItems.push({
        productId: prod.id,
        productName: prod.name,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        unitCost: prod.costPrice || 0,
        lineTotal
      });
    }

    const grossProfit = totalRevenue - totalCOGS;

    window.Store.addTransaction({
      type: 'SALE',
      date,
      customer,
      holdingPartnerId: holdingPartner ? holdingPartner.id : null,
      holdingPartnerName: holdingPartner ? holdingPartner.name : 'Personal Account',
      category: 'Product Sales',
      description: `Sale to ${customer} (${totalQty} items) - Received in ${holdingPartner ? holdingPartner.name : 'Personal'}'s Account`,
      amount: totalRevenue,
      cogs: totalCOGS,
      grossProfit,
      stockImpact: -totalQty,
      items: formattedItems,
      paymentMethod,
      notes
    });

    window.UI.closeModal('saleModal');
    window.UI.showToast(`Sale of ${window.UI.formatCurrency(totalRevenue)} recorded into ${holdingPartner ? holdingPartner.name : 'Partner'}'s Account!`);
  },

  // Edit Sale
  openEditSaleModal(tx) {
    this.populatePartnerAccountDropdowns();
    document.getElementById('editSaleTxId').value = tx.id;
    document.getElementById('editSaleCustomer').value = tx.customer || '';
    document.getElementById('editSaleDate').value = tx.date || '';
    document.getElementById('editSalePartnerAccountSelect').value = tx.holdingPartnerId || '';
    document.getElementById('editSalePaymentMethod').value = tx.paymentMethod || 'UPI / Personal Bank';
    document.getElementById('editSaleNotes').value = tx.notes || '';

    this.editingSaleLineItems = (tx.items || []).map(it => ({ ...it }));
    if (this.editingSaleLineItems.length === 0) {
      this.editingSaleLineItems = [{
        productId: window.Store.getState().products[0]?.id || '',
        quantity: 1,
        unitPrice: 0,
        unitCost: window.Store.getState().products[0]?.costPrice || 0
      }];
    }

    this.renderEditSaleLineItems();
    window.UI.openModal('editSaleModal');
  },

  addEditSaleLineItem() {
    const products = window.Store.getState().products || [];
    const firstProduct = products[0];
    this.editingSaleLineItems.push({
      productId: firstProduct ? firstProduct.id : '',
      quantity: 1,
      unitPrice: firstProduct ? (firstProduct.costPrice || 0) : 0,
      unitCost: firstProduct ? (firstProduct.costPrice || 0) : 0
    });
    this.renderEditSaleLineItems();
  },

  removeEditSaleLineItem(idx) {
    if (this.editingSaleLineItems.length > 1) {
      this.editingSaleLineItems.splice(idx, 1);
      this.renderEditSaleLineItems();
    }
  },

  onEditSaleProductChange(idx, productId) {
    const prod = window.Store.getState().products.find(p => p.id === productId);
    if (prod && this.editingSaleLineItems[idx]) {
      this.editingSaleLineItems[idx].productId = prod.id;
      this.editingSaleLineItems[idx].unitCost = prod.costPrice || 0;
      if (!this.editingSaleLineItems[idx].unitPrice) {
        this.editingSaleLineItems[idx].unitPrice = prod.costPrice || 0;
      }
      this.renderEditSaleLineItems();
    }
  },

  onEditSaleQtyChange(idx, qty) {
    const num = Math.max(1, parseInt(qty, 10) || 1);
    if (this.editingSaleLineItems[idx]) {
      this.editingSaleLineItems[idx].quantity = num;
      const lineTotal = num * (this.editingSaleLineItems[idx].unitPrice || 0);
      const totalEl = document.getElementById(`editSaleLineTotal_${idx}`);
      if (totalEl) totalEl.innerText = window.UI.formatCurrency(lineTotal);
      this.updateEditSaleSummaryBox();
    }
  },

  onEditSalePriceChange(idx, price) {
    const num = Math.max(0, parseFloat(price) || 0);
    if (this.editingSaleLineItems[idx]) {
      this.editingSaleLineItems[idx].unitPrice = num;
      const lineTotal = (this.editingSaleLineItems[idx].quantity || 1) * num;
      const totalEl = document.getElementById(`editSaleLineTotal_${idx}`);
      if (totalEl) totalEl.innerText = window.UI.formatCurrency(lineTotal);
      this.updateEditSaleSummaryBox();
    }
  },

  updateEditSaleSummaryBox() {
    let totalRevenue = 0;
    let totalCOGS = 0;

    for (const item of this.editingSaleLineItems) {
      const lineTotal = (item.quantity || 1) * (item.unitPrice || 0);
      const lineCost = (item.quantity || 1) * (item.unitCost || 0);
      totalRevenue += lineTotal;
      totalCOGS += lineCost;
    }

    const grossProfit = totalRevenue - totalCOGS;
    const marginPct = totalRevenue > 0 ? ((grossProfit / totalRevenue) * 100).toFixed(1) : 0;

    const summaryBox = document.getElementById('editSaleSummaryBox');
    if (summaryBox) {
      summaryBox.innerHTML = `
        <div class="order-summary-row">
          <span>Updated Revenue:</span>
          <span style="font-weight: 700; color: var(--text-primary);">${window.UI.formatCurrency(totalRevenue)}</span>
        </div>
        <div class="order-summary-row">
          <span>Updated COGS:</span>
          <span style="color: var(--text-muted);">${window.UI.formatCurrency(totalCOGS)}</span>
        </div>
        <div class="order-summary-row">
          <span>Updated Gross Profit:</span>
          <span style="font-weight: 700; color: var(--color-success);">${window.UI.formatCurrency(grossProfit)} (${marginPct}%)</span>
        </div>
      `;
    }
  },

  renderEditSaleLineItems() {
    const container = document.getElementById('editSaleLineItemsContainer');
    if (!container) return;

    const products = window.Store.getState().products || [];

    container.innerHTML = this.editingSaleLineItems.map((item, idx) => {
      const lineTotal = (item.quantity || 1) * (item.unitPrice || 0);

      const productOptions = products.map(p => {
        const isSelected = p.id === item.productId ? 'selected' : '';
        const loc = p.location ? ` [📍 ${p.location}]` : '';
        const costStr = p.costPrice ? ` (Cost: ₹${p.costPrice.toLocaleString('en-IN')})` : '';
        return `<option value="${p.id}" ${isSelected}>${p.name} (Stock: ${p.stock})${loc}${costStr}</option>`;
      }).join('');

      return `
        <div class="item-row">
          <div>
            <label style="font-size: 11px; color: var(--text-muted); margin-bottom: 2px; display: block;">Select Product</label>
            <select class="form-control" onchange="TransactionsModule.onEditSaleProductChange(${idx}, this.value)">
              ${productOptions}
            </select>
          </div>
          <div>
            <label style="font-size: 11px; color: var(--text-muted); margin-bottom: 2px; display: block;">Qty</label>
            <input type="number" min="1" class="form-control" value="${item.quantity}" oninput="TransactionsModule.onEditSaleQtyChange(${idx}, this.value)">
          </div>
          <div>
            <label style="font-size: 11px; color: var(--color-primary); font-weight: 700; margin-bottom: 2px; display: block;">Selling Rate (₹)</label>
            <input type="number" step="1" min="0" class="form-control" style="font-weight: 700; border-color: var(--color-primary);" value="${item.unitPrice || ''}" placeholder="0" oninput="TransactionsModule.onEditSalePriceChange(${idx}, this.value)">
          </div>
          <div>
            <label style="font-size: 11px; color: var(--text-muted); margin-bottom: 2px; display: block;">Line Total</label>
            <div id="editSaleLineTotal_${idx}" style="font-weight: 700; color: var(--color-primary); padding: 9px 0;">${window.UI.formatCurrency(lineTotal)}</div>
          </div>
          <div>
            <label style="font-size: 11px; visibility: hidden; margin-bottom: 2px; display: block;">Del</label>
            <button type="button" class="item-row-btn-delete" onclick="TransactionsModule.removeEditSaleLineItem(${idx})" title="Remove">
              ✕
            </button>
          </div>
        </div>
      `;
    }).join('');

    this.updateEditSaleSummaryBox();
  },

  handleEditSaleSubmit(formData) {
    const txId = formData.get('id');
    const customer = formData.get('customer')?.trim() || 'Retail Customer';
    const date = formData.get('date');
    const holdingPartnerId = formData.get('holdingPartnerId');
    const paymentMethod = formData.get('paymentMethod');
    const notes = formData.get('notes')?.trim() || '';

    const holdingPartner = window.Store.getState().partners.find(p => p.id === holdingPartnerId);
    const products = window.Store.getState().products || [];
    let totalRevenue = 0;
    let totalCOGS = 0;
    let totalQty = 0;
    const formattedItems = [];

    for (const item of this.editingSaleLineItems) {
      const prod = products.find(p => p.id === item.productId);
      const lineTotal = item.quantity * item.unitPrice;
      const lineCost = item.quantity * (prod ? prod.costPrice : 0);

      totalRevenue += lineTotal;
      totalCOGS += lineCost;
      totalQty += item.quantity;

      formattedItems.push({
        productId: item.productId,
        productName: prod ? prod.name : item.productName || 'Product',
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        unitCost: prod ? prod.costPrice : 0,
        lineTotal
      });
    }

    const grossProfit = totalRevenue - totalCOGS;

    window.Store.updateTransaction(txId, {
      customer,
      date,
      holdingPartnerId: holdingPartner ? holdingPartner.id : null,
      holdingPartnerName: holdingPartner ? holdingPartner.name : 'Personal Account',
      paymentMethod,
      notes,
      description: `Sale to ${customer} (${totalQty} items) - Received in ${holdingPartner ? holdingPartner.name : 'Personal'}'s Account`,
      amount: totalRevenue,
      cogs: totalCOGS,
      grossProfit,
      stockImpact: -totalQty,
      items: formattedItems
    });

    window.UI.closeModal('editSaleModal');
    window.UI.showToast(`Sale updated.`);
  },

  // -------------------------------------------------------------
  // RESTOCK WORKFLOW (TRACK WHICH PERSONAL ACCOUNTS PAID FOR STOCK)
  // -------------------------------------------------------------
  openRestockModal() {
    const form = document.getElementById('restockForm');
    if (form) form.reset();
    document.getElementById('restockDate').value = new Date().toISOString().split('T')[0];

    this.populatePartnerAccountDropdowns();

    const state = window.Store.getState();
    const prodSelect = document.getElementById('restockProductSelect');
    if (prodSelect) {
      prodSelect.innerHTML = (state.products || []).map(p => {
        const loc = p.location ? ` [📍 ${p.location}]` : '';
        return `<option value="${p.id}">${p.name} (Current: ${p.stock})${loc} - Cost: ₹${p.costPrice.toLocaleString('en-IN')}</option>`;
      }).join('');
      
      const firstProd = state.products[0];
      if (firstProd) {
        document.getElementById('restockUnitCost').value = firstProd.costPrice || 0;
      }
    }

    // Initialize Payer Modes
    const singleRadio = document.querySelector('input[name="restockPaymentType"][value="SINGLE"]');
    if (singleRadio) singleRadio.checked = true;
    this.onRestockPaymentTypeToggle('SINGLE');
    this.populateRestockSplitPayers();

    this.calculateRestockTotal();
    window.UI.openModal('restockModal');
  },

  populateRestockSplitPayers(defaultPayers = []) {
    const container = document.getElementById('restockSplitPayersList');
    if (!container) return;

    const state = window.Store.getState();
    const partners = state.partners || [];

    const defaultMap = {};
    for (const dp of defaultPayers) {
      defaultMap[dp.partnerId] = dp.amount;
    }

    container.innerHTML = partners.map(partner => {
      const initVal = defaultMap[partner.id] !== undefined ? defaultMap[partner.id] : '';
      return `
        <div style="display: flex; align-items: center; justify-content: space-between; background: var(--bg-surface); padding: 8px 12px; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
          <div style="display: flex; align-items: center; gap: 8px;">
            <div style="width: 24px; height: 24px; border-radius: var(--radius-full); background: var(--color-primary); color: #fff; font-size: 11px; font-weight: 700; display: flex; align-items: center; justify-content: center;">
              ${partner.name[0].toUpperCase()}
            </div>
            <div>
              <div style="font-weight: 600; font-size: 13px; color: var(--text-primary);">${partner.name}</div>
              <div style="font-size: 11px; color: var(--text-muted);">${partner.role || 'Partner'} (${partner.profitShareRatio}%)</div>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 6px;">
            <span style="font-size: 12px; color: var(--text-muted); font-weight: 600;">₹</span>
            <input type="number" step="1" min="0" id="restockPayerAmt_${partner.id}" data-partner-id="${partner.id}" data-partner-name="${partner.name}" class="form-control" style="width: 130px; font-weight: 700; text-align: right;" value="${initVal}" placeholder="0" oninput="TransactionsModule.onRestockPayerAmountChange()">
          </div>
        </div>
      `;
    }).join('');

    this.onRestockPayerAmountChange();
  },

  onRestockPaymentTypeToggle(mode) {
    const singleWrap = document.getElementById('restockSinglePayerWrapper');
    const splitWrap = document.getElementById('restockSplitPayersWrapper');

    if (mode === 'SINGLE') {
      if (singleWrap) singleWrap.style.display = 'block';
      if (splitWrap) splitWrap.style.display = 'none';
      const badge = document.getElementById('restockPayerStatusBadge');
      if (badge) {
        badge.innerHTML = '✓ 100% Single Payer';
        badge.style.background = 'rgba(16, 185, 129, 0.15)';
        badge.style.color = 'var(--color-success)';
        badge.style.borderColor = 'rgba(16, 185, 129, 0.3)';
      }
    } else {
      if (singleWrap) singleWrap.style.display = 'none';
      if (splitWrap) splitWrap.style.display = 'block';
      this.onRestockPayerAmountChange();
    }
  },

  splitRestockEqually() {
    const qty = parseInt(document.getElementById('restockQty')?.value, 10) || 0;
    const cost = parseFloat(document.getElementById('restockUnitCost')?.value) || 0;
    const totalCost = qty * cost;

    const state = window.Store.getState();
    const partners = state.partners || [];
    if (partners.length === 0 || totalCost <= 0) return;

    const baseShare = Math.floor(totalCost / partners.length);
    let remainder = totalCost - (baseShare * partners.length);

    partners.forEach((p, idx) => {
      const input = document.getElementById(`restockPayerAmt_${p.id}`);
      if (input) {
        const amt = baseShare + (idx === 0 ? remainder : 0);
        input.value = amt;
      }
    });

    this.onRestockPayerAmountChange();
  },

  clearRestockPayers() {
    const state = window.Store.getState();
    (state.partners || []).forEach(p => {
      const input = document.getElementById(`restockPayerAmt_${p.id}`);
      if (input) input.value = '';
    });
    this.onRestockPayerAmountChange();
  },

  onRestockPayerAmountChange() {
    const mode = document.querySelector('input[name="restockPaymentType"]:checked')?.value || 'SINGLE';
    const badge = document.getElementById('restockPayerStatusBadge');
    if (!badge) return;

    if (mode === 'SINGLE') {
      badge.innerHTML = '✓ 100% Single Payer';
      badge.style.background = 'rgba(16, 185, 129, 0.15)';
      badge.style.color = 'var(--color-success)';
      badge.style.borderColor = 'rgba(16, 185, 129, 0.3)';
      return;
    }

    const qty = parseInt(document.getElementById('restockQty')?.value, 10) || 0;
    const cost = parseFloat(document.getElementById('restockUnitCost')?.value) || 0;
    const totalCost = qty * cost;

    let totalAllocated = 0;
    const inputs = document.querySelectorAll('#restockSplitPayersList input[data-partner-id]');
    inputs.forEach(inp => {
      totalAllocated += (parseFloat(inp.value) || 0);
    });

    if (totalCost === 0) {
      badge.innerHTML = 'Set Quantity & Cost';
      badge.style.background = 'rgba(100, 116, 139, 0.15)';
      badge.style.color = 'var(--text-muted)';
      badge.style.borderColor = 'var(--border-subtle)';
    } else if (Math.abs(totalAllocated - totalCost) < 0.01) {
      badge.innerHTML = `✓ Matches 100% (${window.UI.formatCurrency(totalAllocated)})`;
      badge.style.background = 'rgba(16, 185, 129, 0.15)';
      badge.style.color = 'var(--color-success)';
      badge.style.borderColor = 'rgba(16, 185, 129, 0.3)';
    } else {
      const diff = totalCost - totalAllocated;
      if (diff > 0) {
        badge.innerHTML = `⚠️ Remaining: ${window.UI.formatCurrency(diff)} to allocate`;
      } else {
        badge.innerHTML = `⚠️ Over by ${window.UI.formatCurrency(Math.abs(diff))}`;
      }
      badge.style.background = 'rgba(239, 68, 68, 0.12)';
      badge.style.color = 'var(--color-danger)';
      badge.style.borderColor = 'rgba(239, 68, 68, 0.3)';
    }
  },

  onRestockProductChange(productId) {
    const prod = window.Store.getState().products.find(p => p.id === productId);
    if (prod) {
      document.getElementById('restockUnitCost').value = prod.costPrice || 0;
      this.calculateRestockTotal();
    }
  },

  calculateRestockTotal() {
    const qty = parseInt(document.getElementById('restockQty')?.value, 10) || 0;
    const cost = parseFloat(document.getElementById('restockUnitCost')?.value) || 0;
    const totalCost = qty * cost;
    const previewEl = document.getElementById('restockTotalPreview');
    if (previewEl) previewEl.innerText = window.UI.formatCurrency(totalCost);
    this.onRestockPayerAmountChange();
  },

  handleRestockSubmit(formData) {
    const productId = formData.get('productId');
    const vendor = formData.get('vendor')?.trim() || 'General Supplier';
    const quantity = parseInt(formData.get('quantity'), 10) || 0;
    const unitCost = parseFloat(formData.get('unitCost')) || 0;
    const date = formData.get('date') || new Date().toISOString().split('T')[0];
    const paymentMethod = formData.get('paymentMethod') || 'Personal Bank Transfer';
    const notes = formData.get('notes')?.trim() || '';
    const paymentType = document.querySelector('input[name="restockPaymentType"]:checked')?.value || 'SINGLE';

    const prod = window.Store.getState().products.find(p => p.id === productId);
    if (!prod || quantity <= 0) {
      window.UI.showToast('Please specify a valid product and quantity.', 'danger');
      return;
    }

    const totalCost = quantity * unitCost;
    let payers = [];
    let holdingPartnerId = null;
    let holdingPartnerName = 'Personal Account';
    let payerDescription = '';

    if (paymentType === 'SINGLE') {
      holdingPartnerId = formData.get('holdingPartnerId');
      const holdingPartner = window.Store.getState().partners.find(p => p.id === holdingPartnerId) || window.Store.getState().partners[0];
      if (holdingPartner) {
        holdingPartnerId = holdingPartner.id;
        holdingPartnerName = holdingPartner.name;
        payers = [{ partnerId: holdingPartner.id, partnerName: holdingPartner.name, amount: totalCost }];
        payerDescription = `Paid by ${holdingPartner.name}`;
      }
    } else {
      // Split / Multiple Payers
      const inputs = document.querySelectorAll('#restockSplitPayersList input[data-partner-id]');
      let sum = 0;
      inputs.forEach(inp => {
        const amt = parseFloat(inp.value) || 0;
        if (amt > 0) {
          payers.push({
            partnerId: inp.getAttribute('data-partner-id'),
            partnerName: inp.getAttribute('data-partner-name'),
            amount: amt
          });
          sum += amt;
        }
      });

      if (Math.abs(sum - totalCost) > 0.5) {
        window.UI.showToast(`Partner payer amounts (${window.UI.formatCurrency(sum)}) must equal total stock cost (${window.UI.formatCurrency(totalCost)}).`, 'danger', 4000);
        return;
      }

      if (payers.length === 1) {
        holdingPartnerId = payers[0].partnerId;
        holdingPartnerName = payers[0].partnerName;
        payerDescription = `Paid by ${payers[0].partnerName}`;
      } else {
        holdingPartnerId = payers[0]?.partnerId || null;
        holdingPartnerName = 'Multiple Partners (Split)';
        payerDescription = `Stock Paid by: ` + payers.map(p => `${p.partnerName} (₹${p.amount.toLocaleString('en-IN')})`).join(' + ');
      }
    }

    window.Store.addTransaction({
      type: 'PURCHASE',
      date,
      vendor,
      holdingPartnerId,
      holdingPartnerName,
      payers,
      category: 'Inventory Restock',
      description: `Restocked ${quantity}x ${prod.name} from ${vendor} (${payerDescription})`,
      amount: totalCost,
      cogs: 0,
      stockImpact: quantity,
      items: [{ productId: prod.id, productName: prod.name, quantity, unitCost, totalCost }],
      paymentMethod,
      notes
    });

    window.Store.updateProduct(prod.id, { costPrice: unitCost });
    window.UI.closeModal('restockModal');
    window.UI.showToast(`Restocked ${quantity} units of "${prod.name}" successfully!`);
  },

  // Edit Restock
  openEditRestockModal(tx) {
    this.populatePartnerAccountDropdowns();
    document.getElementById('editRestockTxId').value = tx.id;
    document.getElementById('editRestockVendor').value = tx.vendor || '';
    document.getElementById('editRestockDate').value = tx.date || '';
    document.getElementById('editRestockPartnerAccountSelect').value = tx.holdingPartnerId || '';
    document.getElementById('editRestockPaymentMethod').value = tx.paymentMethod || 'Personal Bank Transfer';
    document.getElementById('editRestockNotes').value = tx.notes || '';

    const state = window.Store.getState();
    const prodSelect = document.getElementById('editRestockProductSelect');
    const firstItem = tx.items && tx.items[0] ? tx.items[0] : {};

    if (prodSelect) {
      prodSelect.innerHTML = (state.products || []).map(p => {
        const loc = p.location ? ` [📍 ${p.location}]` : '';
        return `<option value="${p.id}" ${p.id === firstItem.productId ? 'selected' : ''}>${p.name} (Current: ${p.stock})${loc}</option>`;
      }).join('');
    }

    document.getElementById('editRestockQty').value = firstItem.quantity || 1;
    document.getElementById('editRestockUnitCost').value = firstItem.unitCost || 0;

    // Determine if previous restock was split or single
    const isSplit = tx.payers && Array.isArray(tx.payers) && tx.payers.length > 1;
    const mode = isSplit ? 'SPLIT' : 'SINGLE';
    const radio = document.querySelector(`input[name="editRestockPaymentType"][value="${mode}"]`);
    if (radio) radio.checked = true;

    this.populateEditRestockSplitPayers(tx.payers || []);
    this.onEditRestockPaymentTypeToggle(mode);

    this.calculateEditRestockTotal();
    window.UI.openModal('editRestockModal');
  },

  populateEditRestockSplitPayers(defaultPayers = []) {
    const container = document.getElementById('editRestockSplitPayersList');
    if (!container) return;

    const state = window.Store.getState();
    const partners = state.partners || [];

    const defaultMap = {};
    for (const dp of defaultPayers) {
      defaultMap[dp.partnerId] = dp.amount;
    }

    container.innerHTML = partners.map(partner => {
      const initVal = defaultMap[partner.id] !== undefined ? defaultMap[partner.id] : '';
      return `
        <div style="display: flex; align-items: center; justify-content: space-between; background: var(--bg-surface); padding: 8px 12px; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
          <div style="display: flex; align-items: center; gap: 8px;">
            <div style="width: 24px; height: 24px; border-radius: var(--radius-full); background: var(--color-primary); color: #fff; font-size: 11px; font-weight: 700; display: flex; align-items: center; justify-content: center;">
              ${partner.name[0].toUpperCase()}
            </div>
            <div>
              <div style="font-weight: 600; font-size: 13px; color: var(--text-primary);">${partner.name}</div>
              <div style="font-size: 11px; color: var(--text-muted);">${partner.role || 'Partner'}</div>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 6px;">
            <span style="font-size: 12px; color: var(--text-muted); font-weight: 600;">₹</span>
            <input type="number" step="1" min="0" id="editRestockPayerAmt_${partner.id}" data-partner-id="${partner.id}" data-partner-name="${partner.name}" class="form-control" style="width: 130px; font-weight: 700; text-align: right;" value="${initVal}" placeholder="0" oninput="TransactionsModule.onEditRestockPayerAmountChange()">
          </div>
        </div>
      `;
    }).join('');

    this.onEditRestockPayerAmountChange();
  },

  onEditRestockPaymentTypeToggle(mode) {
    const singleWrap = document.getElementById('editRestockSinglePayerWrapper');
    const splitWrap = document.getElementById('editRestockSplitPayersWrapper');

    if (mode === 'SINGLE') {
      if (singleWrap) singleWrap.style.display = 'block';
      if (splitWrap) splitWrap.style.display = 'none';
      const badge = document.getElementById('editRestockPayerStatusBadge');
      if (badge) {
        badge.innerHTML = '✓ 100% Single Payer';
        badge.style.background = 'rgba(16, 185, 129, 0.15)';
        badge.style.color = 'var(--color-success)';
        badge.style.borderColor = 'rgba(16, 185, 129, 0.3)';
      }
    } else {
      if (singleWrap) singleWrap.style.display = 'none';
      if (splitWrap) splitWrap.style.display = 'block';
      this.onEditRestockPayerAmountChange();
    }
  },

  splitEditRestockEqually() {
    const qty = parseInt(document.getElementById('editRestockQty')?.value, 10) || 0;
    const cost = parseFloat(document.getElementById('editRestockUnitCost')?.value) || 0;
    const totalCost = qty * cost;

    const state = window.Store.getState();
    const partners = state.partners || [];
    if (partners.length === 0 || totalCost <= 0) return;

    const baseShare = Math.floor(totalCost / partners.length);
    let remainder = totalCost - (baseShare * partners.length);

    partners.forEach((p, idx) => {
      const input = document.getElementById(`editRestockPayerAmt_${p.id}`);
      if (input) {
        const amt = baseShare + (idx === 0 ? remainder : 0);
        input.value = amt;
      }
    });

    this.onEditRestockPayerAmountChange();
  },

  clearEditRestockPayers() {
    const state = window.Store.getState();
    (state.partners || []).forEach(p => {
      const input = document.getElementById(`editRestockPayerAmt_${p.id}`);
      if (input) input.value = '';
    });
    this.onEditRestockPayerAmountChange();
  },

  onEditRestockPayerAmountChange() {
    const mode = document.querySelector('input[name="editRestockPaymentType"]:checked')?.value || 'SINGLE';
    const badge = document.getElementById('editRestockPayerStatusBadge');
    if (!badge) return;

    if (mode === 'SINGLE') {
      badge.innerHTML = '✓ 100% Single Payer';
      badge.style.background = 'rgba(16, 185, 129, 0.15)';
      badge.style.color = 'var(--color-success)';
      badge.style.borderColor = 'rgba(16, 185, 129, 0.3)';
      return;
    }

    const qty = parseInt(document.getElementById('editRestockQty')?.value, 10) || 0;
    const cost = parseFloat(document.getElementById('editRestockUnitCost')?.value) || 0;
    const totalCost = qty * cost;

    let totalAllocated = 0;
    const inputs = document.querySelectorAll('#editRestockSplitPayersList input[data-partner-id]');
    inputs.forEach(inp => {
      totalAllocated += (parseFloat(inp.value) || 0);
    });

    if (totalCost === 0) {
      badge.innerHTML = 'Set Quantity & Cost';
      badge.style.background = 'rgba(100, 116, 139, 0.15)';
      badge.style.color = 'var(--text-muted)';
      badge.style.borderColor = 'var(--border-subtle)';
    } else if (Math.abs(totalAllocated - totalCost) < 0.01) {
      badge.innerHTML = `✓ Matches 100% (${window.UI.formatCurrency(totalAllocated)})`;
      badge.style.background = 'rgba(16, 185, 129, 0.15)';
      badge.style.color = 'var(--color-success)';
      badge.style.borderColor = 'rgba(16, 185, 129, 0.3)';
    } else {
      const diff = totalCost - totalAllocated;
      if (diff > 0) {
        badge.innerHTML = `⚠️ Remaining: ${window.UI.formatCurrency(diff)}`;
      } else {
        badge.innerHTML = `⚠️ Over by ${window.UI.formatCurrency(Math.abs(diff))}`;
      }
      badge.style.background = 'rgba(239, 68, 68, 0.12)';
      badge.style.color = 'var(--color-danger)';
      badge.style.borderColor = 'rgba(239, 68, 68, 0.3)';
    }
  },

  calculateEditRestockTotal() {
    const qty = parseInt(document.getElementById('editRestockQty')?.value, 10) || 0;
    const cost = parseFloat(document.getElementById('editRestockUnitCost')?.value) || 0;
    const totalCost = qty * cost;
    const previewEl = document.getElementById('editRestockTotalPreview');
    if (previewEl) previewEl.innerText = window.UI.formatCurrency(totalCost);
    this.onEditRestockPayerAmountChange();
  },

  handleEditRestockSubmit(formData) {
    const txId = formData.get('id');
    const productId = formData.get('productId');
    const vendor = formData.get('vendor')?.trim() || 'Vendor';
    const quantity = parseInt(formData.get('quantity'), 10) || 0;
    const unitCost = parseFloat(formData.get('unitCost')) || 0;
    const date = formData.get('date');
    const paymentMethod = formData.get('paymentMethod');
    const notes = formData.get('notes')?.trim() || '';
    const paymentType = document.querySelector('input[name="editRestockPaymentType"]:checked')?.value || 'SINGLE';

    const prod = window.Store.getState().products.find(p => p.id === productId);
    const totalCost = quantity * unitCost;
    let payers = [];
    let holdingPartnerId = null;
    let holdingPartnerName = 'Personal Account';
    let payerDescription = '';

    if (paymentType === 'SINGLE') {
      holdingPartnerId = formData.get('holdingPartnerId');
      const holdingPartner = window.Store.getState().partners.find(p => p.id === holdingPartnerId) || window.Store.getState().partners[0];
      if (holdingPartner) {
        holdingPartnerId = holdingPartner.id;
        holdingPartnerName = holdingPartner.name;
        payers = [{ partnerId: holdingPartner.id, partnerName: holdingPartner.name, amount: totalCost }];
        payerDescription = `Paid by ${holdingPartner.name}`;
      }
    } else {
      const inputs = document.querySelectorAll('#editRestockSplitPayersList input[data-partner-id]');
      let sum = 0;
      inputs.forEach(inp => {
        const amt = parseFloat(inp.value) || 0;
        if (amt > 0) {
          payers.push({
            partnerId: inp.getAttribute('data-partner-id'),
            partnerName: inp.getAttribute('data-partner-name'),
            amount: amt
          });
          sum += amt;
        }
      });

      if (Math.abs(sum - totalCost) > 0.5) {
        window.UI.showToast(`Partner payer amounts (${window.UI.formatCurrency(sum)}) must equal total stock cost (${window.UI.formatCurrency(totalCost)}).`, 'danger', 4000);
        return;
      }

      if (payers.length === 1) {
        holdingPartnerId = payers[0].partnerId;
        holdingPartnerName = payers[0].partnerName;
        payerDescription = `Paid by ${payers[0].partnerName}`;
      } else {
        holdingPartnerId = payers[0]?.partnerId || null;
        holdingPartnerName = 'Multiple Partners (Split)';
        payerDescription = `Stock Paid by: ` + payers.map(p => `${p.partnerName} (₹${p.amount.toLocaleString('en-IN')})`).join(' + ');
      }
    }

    window.Store.updateTransaction(txId, {
      vendor,
      date,
      holdingPartnerId,
      holdingPartnerName,
      payers,
      paymentMethod,
      notes,
      description: `Restocked ${quantity}x ${prod ? prod.name : 'Item'} from ${vendor} (${payerDescription})`,
      amount: totalCost,
      stockImpact: quantity,
      items: [{ productId, productName: prod ? prod.name : 'Product', quantity, unitCost, totalCost }]
    });

    window.UI.closeModal('editRestockModal');
    window.UI.showToast(`Restock entry updated.`);
  },

  // -------------------------------------------------------------
  // OPERATING EXPENSE WORKFLOW (TRACK WHICH PARTNER PAID OUT OF POCKET)
  // -------------------------------------------------------------
  openExpenseModal() {
    const form = document.getElementById('expenseForm');
    if (form) form.reset();
    document.getElementById('expenseDate').value = new Date().toISOString().split('T')[0];
    this.populateExpenseCategoryDropdowns();
    this.populatePartnerAccountDropdowns();
    window.UI.openModal('expenseModal');
  },

  handleExpenseSubmit(formData) {
    const category = formData.get('category') || 'General';
    const description = formData.get('description')?.trim();
    const amount = parseFloat(formData.get('amount')) || 0;
    const holdingPartnerId = formData.get('holdingPartnerId');
    const paidTo = formData.get('paidTo')?.trim() || '';
    const date = formData.get('date') || new Date().toISOString().split('T')[0];
    const paymentMethod = formData.get('paymentMethod') || 'UPI / Personal Bank';
    const notes = formData.get('notes')?.trim() || '';

    const holdingPartner = window.Store.getState().partners.find(p => p.id === holdingPartnerId);

    if (!description || amount <= 0) {
      window.UI.showToast('Please enter description and valid amount.', 'danger');
      return;
    }

    window.Store.addTransaction({
      type: 'EXPENSE',
      date,
      category,
      description: `${description} (Paid by ${holdingPartner ? holdingPartner.name : 'Partner'})`,
      amount,
      paidTo,
      holdingPartnerId: holdingPartner ? holdingPartner.id : null,
      holdingPartnerName: holdingPartner ? holdingPartner.name : 'Personal Account',
      cogs: 0,
      stockImpact: 0,
      paymentMethod,
      notes
    });

    window.UI.closeModal('expenseModal');
    window.UI.showToast(`Expense of ${window.UI.formatCurrency(amount)} recorded (Paid by ${holdingPartner ? holdingPartner.name : 'Partner'}).`);
  },

  openEditExpenseModal(tx) {
    this.populateExpenseCategoryDropdowns();
    this.populatePartnerAccountDropdowns();
    document.getElementById('editExpenseTxId').value = tx.id;
    document.getElementById('editExpenseCategorySelect').value = tx.category || '';
    document.getElementById('editExpenseAmount').value = tx.amount || 0;
    document.getElementById('editExpenseDescription').value = tx.description || '';
    document.getElementById('editExpensePartnerAccountSelect').value = tx.holdingPartnerId || '';
    document.getElementById('editExpensePaidTo').value = tx.paidTo || '';
    document.getElementById('editExpenseDate').value = tx.date || '';
    document.getElementById('editExpensePaymentMethod').value = tx.paymentMethod || 'UPI';
    document.getElementById('editExpenseNotes').value = tx.notes || '';

    window.UI.openModal('editExpenseModal');
  },

  handleEditExpenseSubmit(formData) {
    const txId = formData.get('id');
    const category = formData.get('category');
    const description = formData.get('description')?.trim();
    const amount = parseFloat(formData.get('amount')) || 0;
    const holdingPartnerId = formData.get('holdingPartnerId');
    const paidTo = formData.get('paidTo')?.trim() || '';
    const date = formData.get('date');
    const paymentMethod = formData.get('paymentMethod');
    const notes = formData.get('notes')?.trim() || '';

    const holdingPartner = window.Store.getState().partners.find(p => p.id === holdingPartnerId);

    window.Store.updateTransaction(txId, {
      category,
      description: `${description} (Paid by ${holdingPartner ? holdingPartner.name : 'Partner'})`,
      amount,
      paidTo,
      holdingPartnerId: holdingPartner ? holdingPartner.id : null,
      holdingPartnerName: holdingPartner ? holdingPartner.name : 'Personal Account',
      date,
      paymentMethod,
      notes
    });

    window.UI.closeModal('editExpenseModal');
    window.UI.showToast(`Expense updated.`);
  },

  // -------------------------------------------------------------
  // PARTNER INJECTION & DRAWING WORKFLOW
  // -------------------------------------------------------------
  openPartnerTxModal(defaultType = 'INJECTION', preselectedPartnerId = null) {
    const form = document.getElementById('partnerTxForm');
    if (form) form.reset();
    document.getElementById('partnerTxDate').value = new Date().toISOString().split('T')[0];

    const state = window.Store.getState();
    const partnerSelect = document.getElementById('partnerTxPartnerSelect');
    if (partnerSelect) {
      partnerSelect.innerHTML = (state.partners || []).map(p => 
        `<option value="${p.id}" ${p.id === preselectedPartnerId ? 'selected' : ''}>${p.name} (${p.profitShareRatio}% Equity)</option>`
      ).join('');
    }

    const typeSelect = document.getElementById('partnerTxType');
    if (typeSelect) typeSelect.value = defaultType;

    window.UI.openModal('partnerTxModal');
  },

  handlePartnerTxSubmit(formData) {
    const partnerId = formData.get('partnerId');
    const type = formData.get('type') || 'INJECTION';
    const amount = parseFloat(formData.get('amount')) || 0;
    const date = formData.get('date') || new Date().toISOString().split('T')[0];
    const reason = formData.get('reason')?.trim() || (type === 'INJECTION' ? 'Capital Addition' : 'Profit Drawing');
    const paymentMethod = formData.get('paymentMethod') || 'Personal Bank Transfer';

    const partner = window.Store.getState().partners.find(p => p.id === partnerId);
    if (!partner || amount <= 0) {
      window.UI.showToast('Please select a partner and enter a valid positive amount.', 'danger');
      return;
    }

    window.Store.addTransaction({
      type,
      date,
      partnerId: partner.id,
      partnerName: partner.name,
      holdingPartnerId: partner.id,
      holdingPartnerName: partner.name,
      category: type === 'INJECTION' ? 'Partner Capital Addition' : 'Partner Drawings',
      description: `${type === 'INJECTION' ? 'Capital injection' : 'Profit drawing'} by ${partner.name}: ${reason}`,
      amount,
      cogs: 0,
      stockImpact: 0,
      paymentMethod,
      notes: reason
    });

    window.UI.closeModal('partnerTxModal');
    window.UI.showToast(`${type === 'INJECTION' ? 'Capital injection' : 'Drawing'} of ${window.UI.formatCurrency(amount)} recorded.`);
  },

  openEditPartnerTxModal(tx) {
    document.getElementById('editPartnerTxId').value = tx.id;
    const partnerSelect = document.getElementById('editPartnerTxPartnerSelect');
    if (partnerSelect) {
      partnerSelect.innerHTML = (window.Store.getState().partners || []).map(p => 
        `<option value="${p.id}" ${p.id === tx.partnerId ? 'selected' : ''}>${p.name} (${p.profitShareRatio}% Equity)</option>`
      ).join('');
    }

    document.getElementById('editPartnerTxType').value = tx.type;
    document.getElementById('editPartnerTxAmount').value = tx.amount;
    document.getElementById('editPartnerTxDate').value = tx.date;
    document.getElementById('editPartnerTxReason').value = tx.notes || tx.description || '';
    document.getElementById('editPartnerTxPaymentMethod').value = tx.paymentMethod || 'Personal Bank Transfer';

    window.UI.openModal('editPartnerTxModal');
  },

  handleEditPartnerTxSubmit(formData) {
    const txId = formData.get('id');
    const partnerId = formData.get('partnerId');
    const type = formData.get('type');
    const amount = parseFloat(formData.get('amount')) || 0;
    const date = formData.get('date');
    const reason = formData.get('reason')?.trim() || '';
    const paymentMethod = formData.get('paymentMethod');

    const partner = window.Store.getState().partners.find(p => p.id === partnerId);
    if (!partner || amount <= 0) return;

    window.Store.updateTransaction(txId, {
      type,
      partnerId: partner.id,
      partnerName: partner.name,
      holdingPartnerId: partner.id,
      holdingPartnerName: partner.name,
      category: type === 'INJECTION' ? 'Partner Capital Addition' : 'Partner Drawings',
      description: `${type === 'INJECTION' ? 'Capital injection' : 'Profit drawing'} by ${partner.name}: ${reason}`,
      amount,
      date,
      paymentMethod,
      notes: reason
    });

    window.UI.closeModal('editPartnerTxModal');
    window.UI.showToast(`Partner transaction updated.`);
  },

  // -------------------------------------------------------------
  // INTER-PARTNER SETTLEMENT TRANSFER WORKFLOW
  // -------------------------------------------------------------
  openPartnerTransferModal(fromPartnerId = null, toPartnerId = null, suggestedAmount = '') {
    const form = document.getElementById('partnerTransferForm');
    if (form) form.reset();
    this.populatePartnerAccountDropdowns();

    if (fromPartnerId) document.getElementById('transferFromPartnerSelect').value = fromPartnerId;
    if (toPartnerId) document.getElementById('transferToPartnerSelect').value = toPartnerId;
    if (suggestedAmount) document.getElementById('transferAmount').value = suggestedAmount;

    window.UI.openModal('partnerTransferModal');
  },

  handlePartnerTransferSubmit(formData) {
    const fromId = formData.get('fromPartnerId');
    const toId = formData.get('toPartnerId');
    const amount = parseFloat(formData.get('amount')) || 0;
    const notes = formData.get('notes')?.trim() || 'Inter-partner personal account settlement';

    if (!fromId || !toId || fromId === toId || amount <= 0) {
      window.UI.showToast('Please select two different partners and enter a valid positive amount.', 'danger');
      return;
    }

    window.Store.transferBetweenPartners(fromId, toId, amount, notes);
    window.UI.closeModal('partnerTransferModal');
    window.UI.showToast(`Settlement transfer of ${window.UI.formatCurrency(amount)} recorded.`);
  },

  // -------------------------------------------------------------
  // VIEW DETAILS MODAL
  // -------------------------------------------------------------
  viewDetails(txId) {
    const tx = (window.Store.getState().transactions || []).find(t => t.id === txId);
    if (!tx) return;

    const modalBody = document.getElementById('txDetailsModalBody');
    if (!modalBody) return;

    let itemsHtml = '';
    if (tx.items && tx.items.length > 0) {
      itemsHtml = `
        <div style="margin-top: 16px;">
          <h4 style="font-size: 13px; text-transform: uppercase; color: var(--text-secondary); margin-bottom: 8px;">Line Items</h4>
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Unit Rate</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                ${tx.items.map(it => `
                  <tr>
                    <td style="font-weight: 600;">${it.productName}</td>
                    <td>${it.quantity} pcs</td>
                    <td>${window.UI.formatCurrency(it.unitPrice || it.unitCost)}</td>
                    <td style="font-weight: 700;">${window.UI.formatCurrency(it.lineTotal || it.totalCost)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    modalBody.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px;">
        <div>
          <span style="font-size: 12px; color: var(--text-muted); font-family: var(--font-mono);">${tx.id}</span>
          <h3 style="font-size: 18px; font-weight: 700; color: var(--text-primary); margin-top: 2px;">${tx.description}</h3>
        </div>
        <div style="font-size: 20px; font-weight: 800; color: var(--color-primary);">
          ${window.UI.formatCurrency(tx.amount)}
        </div>
      </div>

      <div class="form-grid">
        <div class="stat-item">
          <span class="stat-label">Transaction Type</span>
          <span class="stat-value">${tx.type}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Date Recorded</span>
          <span class="stat-value">${window.UI.formatDate(tx.date)}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Personal Bank/UPI Handled By</span>
          <span class="stat-value" style="color: var(--color-primary); font-weight: 700;">${tx.holdingPartnerName || tx.recordedBy || 'Personal Account'}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Payment Channel</span>
          <span class="stat-value">${tx.paymentMethod || 'UPI / Personal Bank'}</span>
        </div>
        ${tx.lastEditedBy ? `
          <div class="stat-item form-full" style="background: rgba(245, 158, 11, 0.1); padding: 8px 12px; border-radius: var(--radius-sm); border: 1px solid var(--color-warning-border);">
            <span class="stat-label" style="color: var(--color-warning);">Audit Notice</span>
            <span style="font-size: 12px; color: var(--text-primary);">Last modified by <strong>${tx.lastEditedBy}</strong> on ${window.UI.formatDate(tx.lastEditedAt)}</span>
          </div>
        ` : ''}
      </div>

      ${itemsHtml}

      ${tx.notes ? `
        <div style="margin-top: 16px; background: var(--bg-surface-elevated); padding: 12px; border-radius: var(--radius-md);">
          <span style="font-size: 11px; text-transform: uppercase; color: var(--text-muted); font-weight: 600; display: block; margin-bottom: 4px;">Notes & Reference</span>
          <div style="font-size: 13px; color: var(--text-secondary);">${tx.notes}</div>
        </div>
      ` : ''}
    `;

    window.UI.openModal('txDetailsModal');
  },

  confirmDelete(txId) {
    const tx = (window.Store.getState().transactions || []).find(t => t.id === txId);
    if (!tx) return;

    if (confirm(`Are you sure you want to delete this ${tx.type} entry (${window.UI.formatCurrency(tx.amount)})? Inventory will be rolled back automatically.`)) {
      window.Store.deleteTransaction(txId);
      window.UI.showToast(`Transaction deleted.`);
    }
  }
};

window.TransactionsModule = TransactionsModule;
