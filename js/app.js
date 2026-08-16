/**
 * EquiLedger Main Application Coordinator & Reactive Orchestrator (Rupees INR)
 */

const App = {
  currentTab: 'dashboardTab',

  init() {
    console.log('Initializing EquiLedger Application (Rupees INR)...');

    // Initialize submodules
    if (window.InventoryModule) window.InventoryModule.init();
    if (window.TransactionsModule) window.TransactionsModule.init();
    if (window.PartnersModule) window.PartnersModule.init();
    if (window.ReportsModule) window.ReportsModule.init();
    if (window.AuditModule) window.AuditModule.init();

    this.bindHeaderControls();
    this.bindNavigation();
    this.bindKeyboardShortcuts();
    this.fetchServerInfo();

    // Subscribe to reactive store changes
    window.Store.subscribe((state) => {
      this.renderAll(state);
    });

    // Initial render
    this.renderAll(window.Store.getState());
  },

  fetchServerInfo() {
    if (typeof fetch === 'undefined') return;
    fetch('/api/info')
      .then(res => res.json())
      .then(info => {
        if (info && info.localIps && info.localIps.length > 0) {
          const lanInput = document.getElementById('lanShareInput');
          if (lanInput) {
            lanInput.value = `http://${info.localIps[0]}:${info.port || 3000}`;
          }
        }
      })
      .catch(() => {});
  },

  bindHeaderControls() {
    // Active User Switcher
    const userSelect = document.getElementById('activeUserSelect');
    if (userSelect) {
      userSelect.addEventListener('change', (e) => {
        const state = window.Store.getState();
        const partners = state.partners || [];
        const selectedId = e.target.value;

        let userObj = { id: 'staff', name: 'Accounting Staff', role: 'Staff', avatar: 'S' };
        const partner = partners.find(p => p.id === selectedId);
        if (partner) {
          userObj = { id: partner.id, name: partner.name, role: partner.role, avatar: (partner.name || 'P')[0].toUpperCase() };
        }

        window.Store.setActiveUser(userObj);
        window.UI.showToast(`Logged in as: ${userObj.name} (${userObj.role})`, 'info');
      });
    }

    // Period Filter
    const periodSelect = document.getElementById('periodSelect');
    if (periodSelect) {
      periodSelect.addEventListener('change', (e) => {
        window.Store.setSelectedPeriod(e.target.value);
        window.UI.showToast(`Filter set to: ${e.target.options[e.target.selectedIndex].text}`, 'info');
      });
    }
  },

  bindNavigation() {
    document.querySelectorAll('.nav-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        const tabId = tab.dataset.tab;
        if (tabId) {
          this.currentTab = tabId;
          window.UI.switchTab(tabId);
        }
      });
    });
  },

  bindKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        window.UI.closeAllModals();
      }
    });
  },

  onTabSwitch(tabId) {
    this.currentTab = tabId;
    const state = window.Store.getState();
    this.renderActiveTab(state);
  },

  renderAll(state) {
    this.updateUserSwitcher(state);
    this.updatePeriodSelector(state);
    this.renderExecutiveKPIBanner(state);
    this.renderActiveTab(state);
    this.renderDashboardRecentLists(state);
  },

  updateUserSwitcher(state) {
    const userSelect = document.getElementById('activeUserSelect');
    const userAvatar = document.getElementById('activeUserAvatar');
    if (!userSelect) return;

    const partners = state.partners || [];
    const active = state.activeUser || { id: 'staff', name: 'Accounting Staff' };

    let html = '';
    for (const p of partners) {
      html += `<option value="${p.id}" ${p.id === active.id ? 'selected' : ''}>${p.name} (${p.role || 'Partner'})</option>`;
    }
    html += `<option value="staff" ${active.id === 'staff' ? 'selected' : ''}>Accounting Staff</option>`;

    userSelect.innerHTML = html;
    if (userAvatar) {
      userAvatar.innerText = (active.name || 'U')[0].toUpperCase();
    }
  },

  updatePeriodSelector(state) {
    const periodSelect = document.getElementById('periodSelect');
    if (periodSelect && state.selectedPeriod) {
      periodSelect.value = state.selectedPeriod;
    }
  },

  // High Visibility Executive Summary Banner (KPI Cards)
  renderExecutiveKPIBanner(state) {
    const summary = window.AccountingEngine.calculateFinancialSummary(state);

    // Revenue
    const revEl = document.getElementById('kpiRevenue');
    if (revEl) revEl.innerText = window.UI.formatCurrency(summary.totalRevenue);

    // COGS
    const cogsEl = document.getElementById('kpiCOGS');
    if (cogsEl) cogsEl.innerText = window.UI.formatCurrency(summary.totalCOGS);

    // Gross Profit
    const grossEl = document.getElementById('kpiGrossProfit');
    const grossMarginEl = document.getElementById('kpiGrossMargin');
    if (grossEl) grossEl.innerText = window.UI.formatCurrency(summary.grossProfit);
    if (grossMarginEl) grossMarginEl.innerText = `${summary.grossMarginPercent.toFixed(1)}% gross margin`;

    // Expenses
    const expEl = document.getElementById('kpiExpenses');
    if (expEl) expEl.innerText = window.UI.formatCurrency(summary.totalExpenses);

    // Net Profit
    const netEl = document.getElementById('kpiNetProfit');
    const netMarginEl = document.getElementById('kpiNetMargin');
    const netCard = document.getElementById('kpiNetProfitCard');
    if (netEl) netEl.innerText = window.UI.formatCurrency(summary.netProfit);
    if (netMarginEl) netMarginEl.innerText = `${summary.netMarginPercent.toFixed(1)}% net margin`;
    if (netCard) {
      netCard.className = `kpi-card ${summary.netProfit >= 0 ? 'net-profit' : 'net-loss'}`;
    }

    // Inventory Valuation
    const invEl = document.getElementById('kpiInventoryVal');
    const invUnitsEl = document.getElementById('kpiInventoryUnits');
    if (invEl) invEl.innerText = window.UI.formatCurrency(summary.inventory.totalCostValue);
    if (invUnitsEl) invUnitsEl.innerText = `${summary.inventory.totalStockUnits} units in stock`;

    // Cash Balance
    const cashEl = document.getElementById('kpiCashBalance');
    if (cashEl) cashEl.innerText = window.UI.formatCurrency(summary.cash.balance);

    // Update Tab Badges
    const invBadge = document.getElementById('navInventoryBadge');
    if (invBadge) invBadge.innerText = (state.products || []).length;

    const txBadge = document.getElementById('navTxBadge');
    if (txBadge) txBadge.innerText = (state.transactions || []).length;

    const partnerBadge = document.getElementById('navPartnerBadge');
    if (partnerBadge) partnerBadge.innerText = (state.partners || []).length;
  },

  renderActiveTab(state) {
    if (this.currentTab === 'dashboardTab') {
      if (window.PartnersModule) window.PartnersModule.render();
      if (window.ReportsModule) window.ReportsModule.renderVisualBreakdown(window.AccountingEngine.calculateFinancialSummary(state));
    } else if (this.currentTab === 'transactionsTab') {
      if (window.TransactionsModule) window.TransactionsModule.render();
    } else if (this.currentTab === 'inventoryTab') {
      if (window.InventoryModule) window.InventoryModule.render();
    } else if (this.currentTab === 'partnersTab') {
      if (window.PartnersModule) window.PartnersModule.render();
    } else if (this.currentTab === 'reportsTab') {
      if (window.ReportsModule) window.ReportsModule.render();
    } else if (this.currentTab === 'auditTab') {
      if (window.AuditModule) window.AuditModule.render();
    } else if (this.currentTab === 'settingsTab') {
      if (window.PartnersModule) window.PartnersModule.render();
      if (window.AuditModule) window.AuditModule.renderCategoryManager();
    }
  },

  renderDashboardRecentLists(state) {
    const recentTxBody = document.getElementById('dashboardRecentTx');
    if (recentTxBody) {
      const recentTx = (state.transactions || []).slice(0, 5);
      if (recentTx.length === 0) {
        recentTxBody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:var(--text-muted); padding:20px;">No transactions recorded yet.</td></tr>`;
      } else {
        recentTxBody.innerHTML = recentTx.map(tx => {
          let badge = `<span class="badge badge-sale">SALE</span>`;
          if (tx.type === 'PURCHASE') badge = `<span class="badge badge-purchase">RESTOCK</span>`;
          if (tx.type === 'EXPENSE') badge = `<span class="badge badge-expense">EXPENSE</span>`;
          if (tx.type === 'INJECTION') badge = `<span class="badge badge-injection">CAPITAL</span>`;
          if (tx.type === 'DRAWING') badge = `<span class="badge badge-drawing">DRAWING</span>`;

          const isPositive = tx.type === 'SALE' || tx.type === 'INJECTION';

          return `
            <tr>
              <td style="white-space:nowrap; font-size:12px; color:var(--text-secondary);">${window.UI.formatDate(tx.date)}</td>
              <td>${badge}</td>
              <td style="font-weight:600; font-size:13px;">${tx.description || tx.category}</td>
              <td style="text-align:right; font-weight:700; color: ${isPositive ? 'var(--color-success)' : 'var(--color-danger)'}; font-family:var(--font-sans);">
                ${isPositive ? '+' : '-'}${window.UI.formatCurrency(tx.amount)}
              </td>
            </tr>
          `;
        }).join('');
      }
    }

    const lowStockContainer = document.getElementById('dashboardLowStockList');
    if (lowStockContainer) {
      const lowStockItems = (state.products || []).filter(p => p.stock <= (p.minThreshold || 5));
      if (lowStockItems.length === 0) {
        lowStockContainer.innerHTML = `
          <div style="padding: 16px; text-align: center; color: var(--color-success); font-size: 13px; font-weight: 500;">
            ✓ All inventory items are adequately stocked!
          </div>
        `;
      } else {
        lowStockContainer.innerHTML = lowStockItems.map(p => `
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; background: var(--bg-surface-elevated); border-radius: var(--radius-md); margin-bottom: 6px; border: 1px solid var(--border-subtle);">
            <div>
              <div style="font-weight: 600; font-size: 13px; color: var(--text-primary);">${p.name}</div>
              <div style="font-size: 11px; color: var(--text-muted);">${p.sku} · Min Alert: ${p.minThreshold}</div>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="badge ${p.stock === 0 ? 'badge-outstock' : 'badge-lowstock'}">
                ${p.stock === 0 ? 'Out of stock' : `${p.stock} remaining`}
              </span>
              <button class="btn btn-primary btn-xs" onclick="TransactionsModule.openRestockModal();">
                + Restock
              </button>
            </div>
          </div>
        `).join('');
      }
    }
  }
};

window.App = App;

// Bootstrap on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.App.init();
});
