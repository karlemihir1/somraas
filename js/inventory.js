/**
 * EquiLedger Inventory & Stock Management Module (Rupees INR - Storage Location & Purchase Cost)
 * Selling prices are entered directly at the time of making a sale!
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
      const matchesLocation = this.selectedLocation === 'ALL' || (prod.location || 'Main Storage') === this.selectedLocation;
      const matchesSearch = !this.searchQuery || 
        prod.name.toLowerCase().includes(this.searchQuery) ||
        (prod.sku && prod.sku.toLowerCase().includes(this.searchQuery)) ||
        (prod.location && prod.location.toLowerCase().includes(this.searchQuery)) ||
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
              <div class="empty-state-desc">Click "+ Add Product" to add stock items with purchase cost and location.</div>
            </div>
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = filtered.map(prod => {
      const stock = Number(prod.stock) || 0;
      const cost = Number(prod.costPrice) || 0;
      const minAlert = Number(prod.minThreshold) || 5;
      const stockValue = stock * cost;
      const location = prod.location || 'Main Storage';

      let statusBadge = `<span class="badge badge-instock">✓ In Stock</span>`;
      if (stock === 0) {
        statusBadge = `<span class="badge badge-outstock">✕ Out of Stock</span>`;
      } else if (stock <= minAlert) {
        statusBadge = `<span class="badge badge-lowstock">⚠ Low Stock (${stock})</span>`;
      }

      return `
        <tr>
          <td>
            <span style="font-family: var(--font-mono); font-size: 12px; color: var(--text-secondary); background: var(--bg-surface-elevated); padding: 2px 6px; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
              ${prod.sku || 'N/A'}
            </span>
          </td>
          <td>
            <div style="font-weight: 600; color: var(--text-primary); font-size: 13.5px;">${prod.name}</div>
            <div style="font-size: 11px; color: var(--text-muted);">Unit: ${prod.unit || 'pcs'}</div>
          </td>
          <td>
            <span style="background: var(--bg-surface-elevated); padding: 3px 8px; border-radius: var(--radius-full); font-size: 11.5px; color: var(--text-secondary);">
              ${prod.category || 'General'}
            </span>
          </td>
          <td>
            <div style="display: inline-flex; align-items: center; gap: 5px; background: rgba(59, 130, 246, 0.08); border: 1px solid rgba(59, 130, 246, 0.2); padding: 3px 8px; border-radius: var(--radius-sm); font-size: 12px; color: var(--color-primary); font-weight: 600;">
              <span>📍</span> ${location}
            </div>
          </td>
          <td style="font-weight: 700; color: var(--text-primary);">${window.UI.formatCurrency(cost)}</td>
          <td>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-weight: 700; font-size: 14px; ${stock <= minAlert ? 'color: var(--color-warning);' : ''}">${stock} ${prod.unit || 'pcs'}</span>
              ${statusBadge}
            </div>
          </td>
          <td style="font-weight: 700; color: var(--color-purple); font-size: 14px;">${window.UI.formatCurrency(stockValue)}</td>
          <td>
            <div style="display: flex; align-items: center; gap: 6px;">
              <button class="btn btn-primary btn-xs" onclick="InventoryModule.openEditModal('${prod.id}')" title="Edit Product Details, Location & Cost">
                ✎ Edit
              </button>
              <button class="btn btn-secondary btn-xs" onclick="InventoryModule.openAdjustStockModal('${prod.id}')" title="Quick +/- Stock Count">
                ± Count
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
      const loc = prod.location || 'Main Storage';
      const stock = Number(prod.stock) || 0;
      const cost = Number(prod.costPrice) || 0;
      const val = stock * cost;

      if (!locMap[loc]) {
        locMap[loc] = { name: loc, units: 0, valuation: 0, itemsCount: 0, items: [] };
      }
      locMap[loc].units += stock;
      locMap[loc].valuation += val;
      locMap[loc].itemsCount += 1;
      locMap[loc].items.push({ name: prod.name, stock, unit: prod.unit || 'pcs' });

      grandTotalUnits += stock;
      grandTotalValuation += val;
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
            ${loc.itemsCount} product ${loc.itemsCount === 1 ? 'type' : 'types'}
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

    const locations = Array.from(new Set(products.map(p => p.location || 'Main Storage'))).sort();
    const currentVal = this.selectedLocation;

    locSelect.innerHTML = `<option value="ALL">📍 All Locations (${products.length} products)</option>` +
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
    document.getElementById('editProdLocation').value = prod.location || 'Warehouse A';
    document.getElementById('editProdUnit').value = prod.unit || 'pcs';
    document.getElementById('editProdCost').value = prod.costPrice || 0;
    document.getElementById('editProdStock').value = prod.stock || 0;
    document.getElementById('editProdMin').value = prod.minThreshold || 5;

    window.UI.openModal('editProductModal');
  },

  openAdjustStockModal(productId) {
    const state = window.Store.getState();
    const prod = (state.products || []).find(p => p.id === productId);
    if (!prod) return;

    document.getElementById('adjustProdId').value = prod.id;
    document.getElementById('adjustProdName').innerText = `${prod.name} (Location: ${prod.location || 'Main Storage'} · Current: ${prod.stock} ${prod.unit || 'pcs'})`;
    document.getElementById('adjustDeltaQty').value = '';
    document.getElementById('adjustReason').value = 'Physical Stock Audit Correction';

    window.UI.openModal('adjustStockModal');
  },

  handleAddProduct(formData) {
    const sku = formData.get('sku')?.trim() || `SKU-${Date.now().toString().slice(-4)}`;
    const name = formData.get('name')?.trim();
    const category = formData.get('category')?.trim() || 'General';
    const location = formData.get('location')?.trim() || 'Warehouse A';
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
      sellingPrice: 0, // selling prices are entered per sale
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
    const location = formData.get('location')?.trim() || 'Warehouse A';
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
