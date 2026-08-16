/**
 * EquiLedger Financial Statements, P&L Reports & Data Portability
 */

const ReportsModule = {
  init() {
    this.bindEvents();
  },

  bindEvents() {
    // Import File handler
    const fileInput = document.getElementById('importFileInput');
    if (fileInput) {
      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          this.importJsonFile(file);
        }
      });
    }
  },

  render() {
    const state = window.Store.getState();
    const summary = window.AccountingEngine.calculateFinancialSummary(state);

    this.renderIncomeStatement(summary);
    this.renderBalanceSheet(summary);
    this.renderVisualBreakdown(summary);
  },

  renderIncomeStatement(summary) {
    const container = document.getElementById('incomeStatementContainer');
    if (!container) return;

    const { totalRevenue, totalCOGS, grossProfit, grossMarginPercent, totalExpenses, expensesByCategory, netProfit, netMarginPercent, period } = summary;

    const expenseRowsHtml = Object.entries(expensesByCategory).map(([cat, amount]) => `
      <div class="statement-row indent">
        <span>${cat}</span>
        <span>${window.UI.formatCurrency(amount)}</span>
      </div>
    `).join('') || `
      <div class="statement-row indent" style="color: var(--text-muted);">
        <span>No operating expenses recorded</span>
        <span>$0.00</span>
      </div>
    `;

    const isProfit = netProfit >= 0;

    container.innerHTML = `
      <div class="statement-card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px;">
          <div>
            <h3 style="font-size: 16px; font-weight: 700; color: var(--text-primary);">Income Statement (Profit & Loss)</h3>
            <span style="font-size: 12px; color: var(--text-muted);">Period: ${period === 'ALL' ? 'All Time' : period}</span>
          </div>
          <span class="badge ${isProfit ? 'badge-sale' : 'badge-expense'}" style="font-size: 13px; padding: 5px 12px;">
            ${isProfit ? 'PROFITABLE' : 'NET LOSS'}
          </span>
        </div>

        <div class="statement-row" style="font-weight: 700;">
          <span>1. Gross Sales Revenue</span>
          <span style="color: var(--color-primary);">${window.UI.formatCurrency(totalRevenue)}</span>
        </div>
        <div class="statement-row indent">
          <span>Cost of Goods Sold (COGS - Inventory Depletion)</span>
          <span style="color: var(--text-muted);">- ${window.UI.formatCurrency(totalCOGS)}</span>
        </div>

        <div class="statement-row subtotal">
          <span>= Gross Profit (Gross Margin: ${grossMarginPercent.toFixed(1)}%)</span>
          <span style="color: var(--color-info);">${window.UI.formatCurrency(grossProfit)}</span>
        </div>

        <div style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase;">
          2. Operating Expenses Breakdown
        </div>
        ${expenseRowsHtml}

        <div class="statement-row subtotal">
          <span>= Total Operating Expenses</span>
          <span style="color: var(--color-danger);">- ${window.UI.formatCurrency(totalExpenses)}</span>
        </div>

        <div class="statement-row grand-total ${!isProfit ? 'negative' : ''}">
          <div>
            <div>= Net Operating ${isProfit ? 'Profit' : 'Loss'}</div>
            <div style="font-size: 12px; font-weight: 500; opacity: 0.85;">Net Margin: ${netMarginPercent.toFixed(1)}%</div>
          </div>
          <div style="font-size: 22px;">${window.UI.formatCurrency(netProfit)}</div>
        </div>
      </div>
    `;
  },

  renderBalanceSheet(summary) {
    const container = document.getElementById('balanceSheetContainer');
    if (!container) return;

    const cash = summary.cash.balance;
    const stockVal = summary.inventory.totalCostValue;
    const totalAssets = cash + stockVal;

    const totalPartnerEquity = summary.partners.reduce((sum, p) => sum + p.totalCapitalAccountBalance, 0);

    container.innerHTML = `
      <div class="statement-card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px;">
          <div>
            <h3 style="font-size: 16px; font-weight: 700; color: var(--text-primary);">Balance Sheet & Net Worth</h3>
            <span style="font-size: 12px; color: var(--text-muted);">Real-time Assets vs Partner Capital</span>
          </div>
        </div>

        <div style="font-size: 13px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 6px;">
          Current Assets
        </div>
        <div class="statement-row indent">
          <span>Liquid Cash & Bank Reserves</span>
          <span style="font-weight: 600; color: var(--color-success);">${window.UI.formatCurrency(cash)}</span>
        </div>
        <div class="statement-row indent">
          <span>Inventory Valuation (at cost)</span>
          <span style="font-weight: 600; color: var(--color-purple);">${window.UI.formatCurrency(stockVal)}</span>
        </div>
        <div class="statement-row subtotal">
          <span>= Total Current Business Assets</span>
          <span style="color: var(--text-primary); font-size: 15px;">${window.UI.formatCurrency(totalAssets)}</span>
        </div>

        <div style="font-size: 13px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-top: 16px; margin-bottom: 6px;">
          Partner Equity & Capital Accounts
        </div>
        ${summary.partners.map(p => `
          <div class="statement-row indent">
            <span>${p.name} (${p.profitShareRatio}%)</span>
            <span style="font-weight: 600;">${window.UI.formatCurrency(p.totalCapitalAccountBalance)}</span>
          </div>
        `).join('')}
        <div class="statement-row subtotal">
          <span>= Total Partner Capital & Equity</span>
          <span style="color: var(--color-primary); font-size: 15px;">${window.UI.formatCurrency(totalPartnerEquity)}</span>
        </div>
      </div>
    `;
  },

  renderVisualBreakdown(summary) {
    const container = document.getElementById('visualBreakdownChart');
    if (!container) return;

    const { totalRevenue, totalCOGS, totalExpenses, netProfit } = summary;
    const maxVal = Math.max(totalRevenue, totalCOGS + totalExpenses, 1);

    const cogsPct = Math.min(100, Math.max(0, (totalCOGS / maxVal) * 100));
    const expPct = Math.min(100, Math.max(0, (totalExpenses / maxVal) * 100));
    const profitPct = Math.min(100, Math.max(0, (netProfit / maxVal) * 100));

    container.innerHTML = `
      <div class="bar-chart-container">
        <div class="bar-row">
          <div class="bar-labels">
            <span class="bar-label-name">Total Sales Revenue (100%)</span>
            <span class="bar-label-value">${window.UI.formatCurrency(totalRevenue)}</span>
          </div>
          <div class="bar-track">
            <div class="bar-fill" style="width: 100%; background: linear-gradient(90deg, #3b82f6, #60a5fa);"></div>
          </div>
        </div>

        <div class="bar-row">
          <div class="bar-labels">
            <span class="bar-label-name">Cost of Goods Sold (COGS)</span>
            <span class="bar-label-value" style="color: var(--color-warning);">${window.UI.formatCurrency(totalCOGS)}</span>
          </div>
          <div class="bar-track">
            <div class="bar-fill" style="width: ${cogsPct}%; background: linear-gradient(90deg, #f59e0b, #fbbf24);"></div>
          </div>
        </div>

        <div class="bar-row">
          <div class="bar-labels">
            <span class="bar-label-name">Operating Expenses</span>
            <span class="bar-label-value" style="color: var(--color-danger);">${window.UI.formatCurrency(totalExpenses)}</span>
          </div>
          <div class="bar-track">
            <div class="bar-fill" style="width: ${expPct}%; background: linear-gradient(90deg, #f43f5e, #fb7185);"></div>
          </div>
        </div>

        <div class="bar-row">
          <div class="bar-labels">
            <span class="bar-label-name">Net Distributable Profit</span>
            <span class="bar-label-value" style="color: var(--color-success); font-size: 14px;">${window.UI.formatCurrency(netProfit)}</span>
          </div>
          <div class="bar-track">
            <div class="bar-fill" style="width: ${profitPct}%; background: linear-gradient(90deg, #10b981, #34d399);"></div>
          </div>
        </div>
      </div>
    `;
  },

  // -------------------------------------------------------------
  // DATA BACKUP & RESTORE
  // -------------------------------------------------------------
  exportJsonBackup() {
    const state = window.Store.getState();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `equiledger_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    window.UI.showToast('Backup JSON file exported successfully!');
  },

  triggerImport() {
    const fileInput = document.getElementById('importFileInput');
    if (fileInput) {
      fileInput.click();
    }
  },

  importJsonFile(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target.result);
        const success = window.Store.importData(json);
        if (success) {
          window.UI.showToast('Data imported successfully! All records updated.');
        } else {
          window.UI.showToast('Invalid backup file format.', 'danger');
        }
      } catch (err) {
        window.UI.showToast('Failed to parse JSON file.', 'danger');
      }
    };
    reader.readAsText(file);
  },

  exportCsvTransactions() {
    const state = window.Store.getState();
    const txs = state.transactions || [];

    if (txs.length === 0) {
      window.UI.showToast('No transactions to export.', 'info');
      return;
    }

    const headers = ['ID', 'Date', 'Type', 'Category', 'Description', 'Party/Customer', 'RecordedBy', 'Amount', 'COGS', 'GrossProfit', 'StockImpact', 'PaymentMethod', 'Notes'];
    const rows = txs.map(t => [
      t.id,
      t.date,
      t.type,
      `"${(t.category || '').replace(/"/g, '""')}"`,
      `"${(t.description || '').replace(/"/g, '""')}"`,
      `"${(t.customer || t.vendor || t.partnerName || t.paidTo || '').replace(/"/g, '""')}"`,
      `"${(t.recordedBy || '').replace(/"/g, '""')}"`,
      t.amount || 0,
      t.cogs || 0,
      t.grossProfit || 0,
      t.stockImpact || 0,
      `"${(t.paymentMethod || '').replace(/"/g, '""')}"`,
      `"${(t.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", encodeURI(csvContent));
    downloadAnchor.setAttribute("download", `equiledger_transactions_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    window.UI.showToast('Transactions exported as CSV.');
  },

  resetDemoData() {
    if (confirm('Are you sure you want to reload default sample demo data? Any unsaved changes will be replaced.')) {
      window.Store.resetToSampleData();
      window.UI.showToast('Loaded sample demo data.');
    }
  },

  clearAll() {
    if (confirm('CAUTION: Are you sure you want to clear all data? This will erase all products, transactions, and partners.')) {
      window.Store.clearAllData();
      window.UI.showToast('All company data cleared.', 'info');
    }
  }
};

window.ReportsModule = ReportsModule;
