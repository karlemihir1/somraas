/**
 * Somraas Inventory & Stock Management Module (Rupees INR)
 * Multi-Partner Stock Holdings, 1-Click Location Transfers & Clean Unified Catalog
 */

const InventoryModule = {
  selectedCategory: 'ALL',
  selectedLocation: 'ALL',
  searchQuery: '',

  init() {
    this.bindEvents();
  },

  bindEvents() {
    const searchInput = document.getElementById('inventorySearch');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.render();
      });
    }

    const locSelect = document.getElementById('inventoryLocationFilter');
    if (locSelect) {
      locSelect.addEventListener('change', (e) => {
        this.selectedLocation = e.target.value;
        this.render();
      });
    }

    const catSelect = document.getElementById('inventoryCategoryFilter');
    if (catSelect) {
      catSelect.addEventListener('change', (e) => {
        this.selectedCategory = e.target.value;
        this.render();
      });
    }

    const addProductForm = document.getElementById('addProductForm');
    if (addProductForm) {
      addProductForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleAddProduct(new FormData(addProductForm));
      });
    }

    const editProductForm = document.getElementById('editProductForm');
    if (editProductForm) {
      editProductForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleEditProduct(new FormData(editProductForm));
      });
    }

    const adjustStockForm = document.getElementById('adjustStockForm');
    if (adjustStockForm) {
      adjustStockForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleAdjustStock(new FormData(adjustStockForm));
      });
    }

    const stockTransferForm = document.getElementById('stockTransferForm');
    if (stockTransferForm) {
      stockTransferForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleTransferStock(new FormData(stockTransferForm));
      });
    }
  },

  render() {
    const state = window.Store.getState();
    const products = state.products || [];
    const tbody = document.getElementById('inventoryTableBody');
    if (!tbody) return;

    this.renderLocationBreakdown(products);
    this.updateLocationOptions(products);
    this.updateCategoryOptions(products);

    const filtered = products.filter(prod => {
      const matchesCategory = this.selectedCategory === 'ALL' || prod.category === this.selectedCategory;
      
      let matchesLocation = true;
      if (this.selectedLocation !== 'ALL') {
        const locs = prod.locationStocks || { [prod.location || 'Varun']: Number(prod.stock) || 0 };
        matchesLocation = (Number(locs[this.selectedLocation]) || 0) > 0;
      }

      const matchesSearch = !this.searchQuery || 
        prod.name.toLowerCase().includes(this.searchQuery) ||
        (prod.sku && prod.sku.toLowerCase().includes(this.searchQuery)) ||
        (prod.category && prod.category.toLowerCase().includes(this.searchQuery));
      return matchesCategory && matchesLocation && matchesSearch;
    });

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="8" style="text-align:center; padding: 36px 16px;">
            <div class="empty-state">
              <div class="empty-state-icon">📦</div>
              <div class="empty-state-title">No products found</div>
              <div class="empty-state-desc">Click "+ Add Product" to add items to your catalog.</div>
            </div>
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = filtered.map(prod => {
      const cost = Number(prod.costPrice) || 0;
      const minAlert = Number(prod.minThreshold) || 5;

      // Location Stocks Mapping
      const locStocks = prod.locationStocks || { [prod.location || 'Varun']: Number(prod.stock) || 0 };
      const stockEntries = Object.entries(locStocks).filter(([_, qty]) => Number(qty) > 0);
      const totalStock = Object.values(locStocks).reduce((a, b) => Number(a) + Number(b), 0);
      const stockValue = totalStock * cost;

      let statusBadge = `<span class="badge badge-instock">✓ In Stock</span>`;
      if (totalStock === 0) {
        statusBadge = `<span class="badge badge-outstock">✕ Out of Stock</span>`;
      } else if (totalStock <= minAlert) {
        statusBadge = `<span class="badge badge-lowstock">⚠ Low Stock</span>`;
      }

      // Render Partner Location Badges
      let locationBadgesHtml = '';
      if (stockEntries.length === 0) {
        locationBadgesHtml = `<span style="font-size: 11.5px; color: var(--text-muted); font-style: italic;">No stock allocated</span>`;
      } else {
        locationBadgesHtml = `
          <div style="display: flex; flex-wrap: wrap; gap: 5px;">
            ${stockEntries.map(([loc, qty], idx) => {
              const colors = [
                'background: rgba(59, 130, 246, 0.12); color: var(--color-primary); border: 1px solid rgba(59, 130, 246, 0.25);',
                'background: rgba(16, 185, 129, 0.12); color: var(--color-success); border: 1px solid rgba(16, 185, 129, 0.25);',
                'background: rgba(139, 92, 246, 0.12); color: var(--color-purple); border: 1px solid rgba(139, 92, 246, 0.25);',
                'background: rgba(245, 158, 11, 0.12); color: var(--color-warning); border: 1px solid rgba(245, 158, 11, 0.25);'
              ];
              const style = colors[idx % colors.length];
              return `
                <span style="${style} padding: 3px 8px; border-radius: var(--radius-sm); font-size: 12px; font-weight: 600; display: inline-flex; align-items: center; gap: 4px;">
                  <span>📍</span> <strong>${loc}:</strong> ${qty} ${prod.unit || 'pcs'}
                </span>
              `;
            }).join('')}
          </div>
        `;
      }

      return `
        <tr>
          <td>
            <span style="font-family: var(--font-mono); font-size: 12px; color: var(--text-secondary); background: var(--bg-surface-elevated); padding: 2px 6px; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
              ${prod.sku || 'N/A'}
            </span>
          </td>
          <td>
            <div style="font-weight: 700; color: var(--text-primary); font-size: 14px;">${prod.name}</div>
            <div style="font-size: 11px; color: var(--text-muted);">Unit: ${prod.unit || 'pcs'}</div>
          </td>
          <td>
            <span style="background: var(--bg-surface-elevated); padding: 3px 8px; border-radius: var(--radius-full); font-size: 11.5px; color: var(--text-secondary);">
              ${prod.category || 'General'}
            </span>
          </td>
          <td style="font-weight: 700; color: var(--text-primary); font-size: 13.5px;">${window.UI.formatCurrency(cost)}</td>
          <td>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-weight: 800; font-size: 14.5px; ${totalStock <= minAlert ? 'color: var(--color-warning);' : 'color: var(--text-primary);'}">${totalStock} ${prod.unit || 'pcs'}</span>
              ${statusBadge}
            </div>
          </td>
          <td style="min-width: 200px;">
            ${locationBadgesHtml}
          </td>
          <td style="font-weight: 800; color: var(--color-purple); font-size: 14px;">${window.UI.formatCurrency(stockValue)}</td>
          <td>
            <div style="display: flex; align-items: center; gap: 6px;">
              <button class="btn btn-purple btn-xs" onclick="InventoryModule.openTransferModal('${prod.id}')" title="Shift / Transfer stock location between partners" style="background: linear-gradient(135deg, #6366f1, #4f46e5); color: #fff; font-weight: 700; border: none;">
                ⇄ Shift
              </button>
              <button class="btn btn-primary btn-xs" onclick="InventoryModule.openEditModal('${prod.id}')" title="Edit Product Details & Stock">
                ✎ Edit
              </button>
              <button class="btn btn-outline btn-xs" style="color: var(--color-danger);" onclick="InventoryModule.confirmDelete('${prod.id}')" title="Delete">
                ✕
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  },

  renderLocationBreakdown(products) {
    const container = document.getElementById('stockLocationBreakdown');
    if (!container) return;

    const locMap = {};
    let grandTotalUnits = 0;
    let grandTotalValuation = 0;

    for (const prod of products) {
      const cost = Number(prod.costPrice) || 0;
      const locStocks = prod.locationStocks || { [prod.location || 'Varun']: Number(prod.stock) || 0 };

      for (const [loc, rawQty] of Object.entries(locStocks)) {
        const qty = Number(rawQty) || 0;
        if (qty > 0) {
          const val = qty * cost;
          if (!locMap[loc]) {
            locMap[loc] = { name: loc, units: 0, valuation: 0, itemsCount: 0 };
          }
          locMap[loc].units += qty;
          locMap[loc].valuation += val;
          locMap[loc].itemsCount += 1;

          grandTotalUnits += qty;
          grandTotalValuation += val;
        }
      }
    }

    const locations = Object.values(locMap);

    let html = `
      <div onclick="InventoryModule.filterByLocation('ALL')" 
           style="cursor: pointer; background: ${this.selectedLocation === 'ALL' ? 'rgba(59, 130, 246, 0.18)' : 'var(--bg-surface-elevated)'}; border: 1px solid ${this.selectedLocation === 'ALL' ? 'var(--color-primary)' : 'var(--border-subtle)'}; padding: 8px 14px; border-radius: var(--radius-md); transition: all 0.2s ease;">
        <div style="font-size: 11px; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">All Storage Locations</div>
        <div style="font-size: 14px; font-weight: 800; color: var(--text-primary); margin-top: 2px;">
          ${grandTotalUnits} units <span style="font-size: 11.5px; font-weight: 600; color: var(--color-purple);">(${window.UI.formatCurrency(grandTotalValuation)})</span>
        </div>
      </div>
    `;

    for (const loc of locations) {
      const isSelected = this.selectedLocation === loc.name;
      html += `
        <div onclick="InventoryModule.filterByLocation('${loc.name.replace(/'/g, "\\'")}')" 
             style="cursor: pointer; background: ${isSelected ? 'rgba(59, 130, 246, 0.18)' : 'var(--bg-surface-elevated)'}; border: 1px solid ${isSelected ? 'var(--color-primary)' : 'var(--border-subtle)'}; padding: 8px 14px; border-radius: var(--radius-md); transition: all 0.2s ease;">
          <div style="font-size: 11px; color: ${isSelected ? 'var(--color-primary)' : 'var(--text-secondary)'}; font-weight: 700;">📍 ${loc.name}</div>
          <div style="font-size: 14px; font-weight: 800; color: var(--text-primary); margin-top: 2px;">
            ${loc.units} units <span style="font-size: 11.5px; font-weight: 600; color: var(--color-purple);">(${window.UI.formatCurrency(loc.valuation)})</span>
          </div>
          <div style="font-size: 10.5px; color: var(--text-muted); margin-top: 1px;">
            ${loc.itemsCount} product ${loc.itemsCount === 1 ? 'variety' : 'varieties'}
          </div>
        </div>
      `;
    }

    container.innerHTML = html;
  },

  filterByLocation(locName) {
    this.selectedLocation = locName;
    const locSelect = document.getElementById('inventoryLocationFilter');
    if (locSelect) locSelect.value = locName;
    this.render();
  },

  updateLocationOptions(products) {
    const locSelect = document.getElementById('inventoryLocationFilter');
    if (!locSelect) return;

    const locSet = new Set();
    for (const p of products) {
      const locStocks = p.locationStocks || { [p.location || 'Varun']: Number(p.stock) || 0 };
      for (const [l, q] of Object.entries(locStocks)) {
        if (Number(q) > 0) locSet.add(l);
      }
    }

    const locations = Array.from(locSet).sort();
    const currentVal = this.selectedLocation;

    locSelect.innerHTML = `<option value="ALL">📍 All Locations</option>` +
      locations.map(l => `<option value="${l}" ${l === currentVal ? 'selected' : ''}>📍 ${l}</option>`).join('');
  },

  updateCategoryOptions(products) {
    const catSelect = document.getElementById('inventoryCategoryFilter');
    if (!catSelect) return;

    const categories = Array.from(new Set(products.map(p => p.category || 'General'))).sort();
    const currentVal = this.selectedCategory;

    catSelect.innerHTML = `<option value="ALL">All Categories (${products.length})</option>` +
      categories.map(c => `<option value="${c}" ${c === currentVal ? 'selected' : ''}>${c}</option>`).join('');
  },

  // -------------------------------------------------------------
  // 1-CLICK STOCK SHIFT / LOCATION TRANSFER MODAL
  // -------------------------------------------------------------
  openTransferModal(productId) {
    const state = window.Store.getState();
    const prod = (state.products || []).find(p => p.id === productId);
    if (!prod) return;

    document.getElementById('transferProdId').value = prod.id;
    document.getElementById('transferProdTitle').innerText = `Shift stock for "${prod.name}" (Cost: ${window.UI.formatCurrency(prod.costPrice)})`;
    document.getElementById('transferDate').value = new Date().toISOString().split('T')[0];
    document.getElementById('transferNotes').value = '';

    const locStocks = prod.locationStocks || { [prod.location || 'Varun']: Number(prod.stock) || 0 };
    const fromSelect = document.getElementById('transferFromLocationSelect');
    const toSelect = document.getElementById('transferToLocationSelect');

    const availableEntries = Object.entries(locStocks).filter(([_, qty]) => Number(qty) > 0);

    if (availableEntries.length === 0) {
      window.UI.showToast(`No available stock in hand for "${prod.name}" to move.`, 'warning');
      return;
    }

    // Populate From Select
    fromSelect.innerHTML = availableEntries.map(([loc, qty]) => `
      <option value="${loc}" data-qty="${qty}">📍 ${loc} (${qty} ${prod.unit || 'pcs'} available)</option>
    `).join('');

    // Populate To Select (all partners + custom)
    const partners = state.partners || [];
    const allKnownLocations = Array.from(new Set([
      ...partners.map(p => p.name),
      'Storefront',
      'Warehouse A',
      'Warehouse B',
      'Office'
    ]));

    const firstFrom = availableEntries[0][0];
    toSelect.innerHTML = allKnownLocations.map(loc => `
      <option value="${loc}" ${loc !== firstFrom ? 'selected' : ''}>📍 ${loc}</option>
    `).join('');

    this.onTransferFromChange();
    window.UI.openModal('stockTransferModal');
  },

  onTransferFromChange() {
    const fromSelect = document.getElementById('transferFromLocationSelect');
    if (!fromSelect) return;

    const selectedOption = fromSelect.options[fromSelect.selectedIndex];
    const availableQty = selectedOption ? parseInt(selectedOption.getAttribute('data-qty'), 10) || 0 : 0;

    const qtyInput = document.getElementById('transferQuantity');
    const hint = document.getElementById('transferAvailableHint');

    if (qtyInput) {
      qtyInput.max = availableQty;
      qtyInput.value = Math.min(1, availableQty);
    }
    if (hint) {
      hint.innerText = `Available to move: ${availableQty} pcs`;
    }
  },

  handleTransferStock(formData) {
    const productId = formData.get('productId');
    const fromLocation = formData.get('fromLocation');
    const toLocation = formData.get('toLocation')?.trim();
    const quantity = parseInt(formData.get('quantity'), 10) || 0;
    const notes = formData.get('notes')?.trim() || '';

    if (!productId || !fromLocation || !toLocation || quantity <= 0) {
      window.UI.showToast('Please specify valid source, destination, and quantity.', 'danger');
      return;
    }

    if (fromLocation === toLocation) {
      window.UI.showToast('Source location and destination location must be different.', 'danger');
      return;
    }

    const success = window.Store.transferProductStock(productId, fromLocation, toLocation, quantity, notes);
    if (success) {
      window.UI.closeModal('stockTransferModal');
      window.UI.showToast(`Shifted ${quantity} pcs from 📍 ${fromLocation} → 📍 ${toLocation}!`, 'success');
    } else {
      window.UI.showToast('Unable to complete stock shift. Insufficient units available.', 'danger');
    }
  },

  openAddModal() {
    const form = document.getElementById('addProductForm');
    if (form) form.reset();
    window.UI.openModal('addProductModal');
  },

  openEditModal(productId) {
    const state = window.Store.getState();
    const prod = (state.products || []).find(p => p.id === productId);
    if (!prod) return;

    document.getElementById('editProdId').value = prod.id;
    document.getElementById('editProdSku').value = prod.sku || '';
    document.getElementById('editProdName').value = prod.name || '';
    document.getElementById('editProdCategory').value = prod.category || '';
    document.getElementById('editProdLocation').value = prod.location || 'Varun';
    document.getElementById('editProdUnit').value = prod.unit || 'pcs';
    document.getElementById('editProdCost').value = prod.costPrice || 0;
    document.getElementById('editProdStock').value = prod.stock || 0;
    document.getElementById('editProdMin').value = prod.minThreshold || 5;

    window.UI.openModal('editProductModal');
  },

  handleAddProduct(formData) {
    const sku = formData.get('sku')?.trim() || `SKU-${Date.now().toString().slice(-4)}`;
    const name = formData.get('name')?.trim();
    const category = formData.get('category')?.trim() || 'General';
    const location = formData.get('location')?.trim() || 'Varun';
    const unit = formData.get('unit')?.trim() || 'pcs';
    const costPrice = parseFloat(formData.get('costPrice')) || 0;
    const initialStock = parseInt(formData.get('initialStock'), 10) || 0;
    const minThreshold = parseInt(formData.get('minThreshold'), 10) || 5;

    if (!name) {
      window.UI.showToast('Please enter a product name', 'danger');
      return;
    }

    const newProd = window.Store.addProduct({
      sku,
      name,
      category,
      location,
      unit,
      costPrice,
      sellingPrice: 0,
      stock: initialStock,
      minThreshold
    });

    window.UI.closeModal('addProductModal');
    window.UI.showToast(`Product "${newProd.name}" added to inventory!`);
  },

  handleEditProduct(formData) {
    const id = formData.get('id');
    const sku = formData.get('sku')?.trim();
    const name = formData.get('name')?.trim();
    const category = formData.get('category')?.trim() || 'General';
    const location = formData.get('location')?.trim() || 'Varun';
    const unit = formData.get('unit')?.trim() || 'pcs';
    const costPrice = parseFloat(formData.get('costPrice')) || 0;
    const stock = parseInt(formData.get('stock'), 10) || 0;
    const minThreshold = parseInt(formData.get('minThreshold'), 10) || 5;

    if (!id || !name) {
      window.UI.showToast('Product name is required', 'danger');
      return;
    }

    window.Store.updateProduct(id, {
      sku,
      name,
      category,
      location,
      unit,
      costPrice,
      stock,
      minThreshold
    });

    window.UI.closeModal('editProductModal');
    window.UI.showToast(`Product "${name}" updated.`);
  },

  handleAdjustStock(formData) {
    const id = formData.get('id');
    const delta = parseInt(formData.get('deltaQty'), 10);
    const reason = formData.get('reason')?.trim() || 'Physical Stock Correction';

    if (!id || isNaN(delta) || delta === 0) {
      window.UI.showToast('Please enter a valid non-zero adjustment quantity (+ or -)', 'danger');
      return;
    }

    window.Store.adjustProductStock(id, delta, reason);

    window.UI.closeModal('adjustStockModal');
    window.UI.showToast(`Stock updated by ${delta > 0 ? '+' : ''}${delta} units.`);
  },

  confirmDelete(productId) {
    const state = window.Store.getState();
    const prod = (state.products || []).find(p => p.id === productId);
    if (!prod) return;

    if (confirm(`Are you sure you want to remove "${prod.name}" from inventory?`)) {
      window.Store.deleteProduct(productId);
      window.UI.showToast(`Product "${prod.name}" deleted.`, 'info');
    }
  }
};

window.InventoryModule = InventoryModule;
