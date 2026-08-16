/**
 * EquiLedger Partners & Personal Bank Account Settlement Module (₹ INR)
 */

const PartnersModule = {
  init() {
    this.bindEvents();
  },

  bindEvents() {
    const addPartnerForm = document.getElementById('addPartnerForm');
    if (addPartnerForm) {
      addPartnerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleAddPartner(new FormData(addPartnerForm));
      });
    }

    const editPartnerForm = document.getElementById('editPartnerForm');
    if (editPartnerForm) {
      editPartnerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleEditPartner(new FormData(editPartnerForm));
      });
    }

    const batchRatioForm = document.getElementById('batchRatioForm');
    if (batchRatioForm) {
      batchRatioForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleBatchRatioSubmit(new FormData(batchRatioForm));
      });
    }
  },

  render() {
    const state = window.Store.getState();
    const financials = window.AccountingEngine.calculateFinancials(state, state.selectedPeriod);
    const partnerSummaries = financials.partnerSummaries || [];

    this.renderDashboardPartnerMatrix(financials);
    this.renderPartnersTable(partnerSummaries);
    this.renderSettingsRatioEditor(state.partners);
  },

  renderDashboardPartnerMatrix(financials) {
    const container = document.getElementById('dashboardPartnerCards');
    if (!container) return;

    const partnerSummaries = financials.partnerSummaries || [];

    container.innerHTML = partnerSummaries.map(p => {
      const isPositiveHold = p.netCashHeld >= 0;

      return `
        <div class="partner-summary-card">
          <div class="partner-card-header">
            <div class="partner-identity">
              <div class="partner-avatar" style="background: var(--color-primary);">${p.avatar}</div>
              <div>
                <div class="partner-name">${p.name}</div>
                <div class="partner-role">${p.role}</div>
              </div>
            </div>
            <div class="partner-share-badge">
              ${p.profitShareRatio}% Equity
            </div>
          </div>

          <!-- Personal Bank / UPI Account Cash Box -->
          <div style="background: var(--bg-surface-elevated); padding: 10px 12px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); margin-bottom: 12px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 11px; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Personal A/C Cash:</span>
              <span style="font-size: 14px; font-weight: 800; color: ${isPositiveHold ? 'var(--color-success)' : 'var(--color-danger)'};">
                ${window.UI.formatCurrency(p.netCashHeld)}
              </span>
            </div>
            <div style="font-size: 11px; color: var(--text-secondary); margin-top: 2px;">
              ${isPositiveHold ? '✓ Holding business sales cash' : '⚠️ Owed out-of-pocket reimbursement'}
            </div>
          </div>

          <div class="partner-metrics-list">
            <div class="partner-metric-row">
              <span class="partner-metric-label">Sales Collected:</span>
              <span class="partner-metric-value" style="color: var(--color-success);">+${window.UI.formatCurrency(p.salesCollected)}</span>
            </div>
            <div class="partner-metric-row">
              <span class="partner-metric-label">Expenses / Stock Paid:</span>
              <span class="partner-metric-value" style="color: var(--color-danger); font-size: 12px;">-${window.UI.formatCurrency(p.expensesPaid + p.restocksPaid)}</span>
            </div>
            <div class="partner-metric-row">
              <span class="partner-metric-label">Allocated Profit (Share):</span>
              <span class="partner-metric-value" style="color: var(--color-primary); font-weight: 700;">${window.UI.formatCurrency(p.allocatedProfit)}</span>
            </div>
            <div class="partner-metric-row" style="border-top: 1px solid var(--border-subtle); padding-top: 6px; margin-top: 4px;">
              <span class="partner-metric-label" style="font-weight: 700; color: var(--text-primary);">Total Capital Equity:</span>
              <span class="partner-metric-value" style="font-weight: 800; color: var(--color-purple);">${window.UI.formatCurrency(p.endingCapital)}</span>
            </div>
          </div>

          <div style="display: flex; gap: 6px; margin-top: 14px;">
            <button class="btn btn-primary btn-xs" style="flex: 1;" onclick="TransactionsModule.openPartnerTransferModal('${p.partnerId}')" title="Transfer cash between personal accounts">
              💸 Settle / Transfer
            </button>
            <button class="btn btn-secondary btn-xs" onclick="TransactionsModule.openPartnerTxModal('DRAWING', '${p.partnerId}')" title="Record Profit Drawing">
              - Payout
            </button>
          </div>
        </div>
      `;
    }).join('');

    // Ratio distribution bar
    const ratioBar = document.getElementById('partnerRatioBar');
    if (ratioBar) {
      const colors = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ec4899', '#06b6d4'];
      ratioBar.innerHTML = partnerSummaries.map((p, idx) => `
        <div class="ratio-segment" style="width: ${p.profitShareRatio}%; background: ${colors[idx % colors.length]};" title="${p.name}: ${p.profitShareRatio}%">
          ${p.profitShareRatio >= 10 ? `${p.name.split(' ')[0]} (${p.profitShareRatio}%)` : `${p.profitShareRatio}%`}
        </div>
      `).join('');
    }
  },

  renderPartnersTable(partnerSummaries = []) {
    const tbody = document.getElementById('partnersTableBody');
    if (!tbody) return;

    if (partnerSummaries.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="8" style="text-align:center; padding: 36px 16px;">
            <div class="empty-state">
              <div class="empty-state-icon">👥</div>
              <div class="empty-state-title">No partners found</div>
              <div class="empty-state-desc">Click "+ Add Partner" to configure partnership equity shares.</div>
            </div>
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = partnerSummaries.map(p => `
      <tr>
        <td>
          <div style="display: flex; align-items: center; gap: 10px;">
            <div class="partner-avatar" style="width: 32px; height: 32px; font-size: 13px; background: var(--color-primary);">${p.avatar}</div>
            <div>
              <div style="font-weight: 700; color: var(--text-primary); font-size: 13.5px;">${p.name}</div>
              <div style="font-size: 11px; color: var(--text-muted);">${p.role || 'Partner'}</div>
            </div>
          </div>
        </td>
        <td>
          <span style="font-weight: 700; color: var(--color-primary); background: rgba(59, 130, 246, 0.1); padding: 3px 8px; border-radius: var(--radius-sm);">
            ${p.profitShareRatio}%
          </span>
        </td>
        <td>
          <div style="font-weight: 700; font-size: 13.5px; color: ${p.netCashHeld >= 0 ? 'var(--color-success)' : 'var(--color-danger)'};">
            ${window.UI.formatCurrency(p.netCashHeld)}
          </div>
          <div style="font-size: 10.5px; color: var(--text-muted);">In Personal Account</div>
        </td>
        <td style="font-weight: 600;">${window.UI.formatCurrency(p.initialCapital)}</td>
        <td style="font-weight: 700; color: var(--color-success);">${window.UI.formatCurrency(p.allocatedProfit)}</td>
        <td style="font-weight: 600; color: var(--color-warning);">${window.UI.formatCurrency(p.drawings)}</td>
        <td style="font-weight: 800; color: var(--color-purple); font-size: 14px;">${window.UI.formatCurrency(p.endingCapital)}</td>
        <td>
          <div style="display: flex; gap: 6px;">
            <button class="btn btn-primary btn-xs" onclick="TransactionsModule.openPartnerTransferModal('${p.partnerId}')" title="Settle / Transfer">
              💸 Settle
            </button>
            <button class="btn btn-secondary btn-xs" onclick="PartnersModule.openEditModal('${p.partnerId}')" title="Edit Partner">
              ✎ Edit
            </button>
            <button class="btn btn-outline btn-xs" style="color: var(--color-danger);" onclick="PartnersModule.confirmDelete('${p.partnerId}')" title="Delete">
              ✕
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  },

  renderSettingsRatioEditor(partners = []) {
    const container = document.getElementById('settingsPartnerRatioRows');
    if (!container) return;

    let total = 0;
    container.innerHTML = partners.map(p => {
      total += Number(p.profitShareRatio) || 0;
      return `
        <div class="ratio-editor-row" style="margin-bottom: 12px; background: var(--bg-surface-elevated); padding: 12px 14px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span style="font-weight: 700; font-size: 13.5px; color: var(--text-primary);">${p.name} (${p.role})</span>
            <div style="display: flex; align-items: center; gap: 4px;">
              <input type="number" step="0.1" min="0" max="100" class="form-control" style="width: 80px; font-weight: 700; text-align: right;" name="ratio_${p.id}" id="input_ratio_${p.id}" value="${p.profitShareRatio}" oninput="PartnersModule.onRatioInputChange('${p.id}', this.value)">
              <span style="font-weight: 700; color: var(--text-muted);">%</span>
            </div>
          </div>
          <input type="range" min="0" max="100" step="0.5" class="ratio-slider" id="slider_ratio_${p.id}" value="${p.profitShareRatio}" style="width: 100%; accent-color: var(--color-primary);" oninput="PartnersModule.onRatioSliderChange('${p.id}', this.value)">
        </div>
      `;
    }).join('');

    this.updateRatioTotalBadge(total);
  },

  onRatioSliderChange(partnerId, val) {
    const num = parseFloat(val) || 0;
    const input = document.getElementById(`input_ratio_${partnerId}`);
    if (input) input.value = num;
    this.calculateSettingsTotalRatio();
  },

  onRatioInputChange(partnerId, val) {
    const num = parseFloat(val) || 0;
    const slider = document.getElementById(`slider_ratio_${partnerId}`);
    if (slider) slider.value = num;
    this.calculateSettingsTotalRatio();
  },

  calculateSettingsTotalRatio() {
    const state = window.Store.getState();
    let total = 0;
    for (const p of state.partners) {
      const input = document.getElementById(`input_ratio_${p.id}`);
      if (input) total += parseFloat(input.value) || 0;
    }
    this.updateRatioTotalBadge(total);
  },

  updateRatioTotalBadge(total) {
    const display = document.getElementById('settingsTotalRatioDisplay');
    const badge = document.getElementById('settingsRatioStatusBadge');
    if (!display || !badge) return;

    const rounded = Math.round(total * 10) / 10;
    display.innerText = `${rounded}%`;

    if (Math.abs(rounded - 100) < 0.05) {
      badge.className = 'badge badge-sale';
      badge.innerText = '✓ Perfect (100%)';
    } else if (rounded < 100) {
      badge.className = 'badge badge-drawing';
      badge.innerText = `⚠️ Under-allocated (${(100 - rounded).toFixed(1)}% remaining)`;
    } else {
      badge.className = 'badge badge-expense';
      badge.innerText = `⚠️ Over-allocated by ${(rounded - 100).toFixed(1)}%`;
    }
  },

  autoSplitEqually() {
    const state = window.Store.getState();
    const count = state.partners.length;
    if (count === 0) return;

    const equalShare = Math.round((100 / count) * 10) / 10;
    let remainder = Math.round((100 - (equalShare * count)) * 10) / 10;

    state.partners.forEach((p, idx) => {
      let share = equalShare;
      if (idx === 0) share += remainder;
      const input = document.getElementById(`input_ratio_${p.id}`);
      const slider = document.getElementById(`slider_ratio_${p.id}`);
      if (input) input.value = Math.round(share * 10) / 10;
      if (slider) slider.value = Math.round(share * 10) / 10;
    });

    this.calculateSettingsTotalRatio();
    window.UI.showToast('Equity split equally across all partners.');
  },

  handleBatchRatioSubmit(formData) {
    const state = window.Store.getState();
    const ratiosMap = {};
    let total = 0;

    for (const p of state.partners) {
      const val = parseFloat(formData.get(`ratio_${p.id}`)) || 0;
      ratiosMap[p.id] = val;
      total += val;
    }

    if (Math.abs(total - 100) > 0.5) {
      if (!confirm(`Warning: Total profit share is ${total.toFixed(1)}% (not 100%). Do you still want to save?`)) {
        return;
      }
    }

    window.Store.updateAllPartnerRatios(ratiosMap);
    window.UI.showToast('Partner profit-sharing ratios updated successfully!');
  },

  openAddModal() {
    const form = document.getElementById('addPartnerForm');
    if (form) form.reset();
    window.UI.openModal('addPartnerModal');
  },

  openEditModal(partnerId) {
    const state = window.Store.getState();
    const partner = (state.partners || []).find(p => p.id === partnerId);
    if (!partner) return;

    document.getElementById('editPartnerId').value = partner.id;
    document.getElementById('editPartnerName').value = partner.name || '';
    document.getElementById('editPartnerRole').value = partner.role || 'Partner';
    document.getElementById('editPartnerEmail').value = partner.email || '';
    document.getElementById('editPartnerRatio').value = partner.profitShareRatio || 0;
    document.getElementById('editPartnerCapital').value = partner.initialCapital || 0;

    window.UI.openModal('editPartnerModal');
  },

  handleAddPartner(formData) {
    const name = formData.get('name')?.trim();
    const role = formData.get('role')?.trim() || 'Partner';
    const email = formData.get('email')?.trim() || '';
    const profitShareRatio = parseFloat(formData.get('profitShareRatio')) || 0;
    const initialCapital = parseFloat(formData.get('initialCapital')) || 0;

    if (!name) {
      window.UI.showToast('Please enter a partner name', 'danger');
      return;
    }

    const newPartner = window.Store.addPartner({
      name,
      role,
      email,
      profitShareRatio,
      initialCapital,
      avatar: name[0].toUpperCase()
    });

    window.UI.closeModal('addPartnerModal');
    window.UI.showToast(`Partner "${newPartner.name}" added!`);
  },

  handleEditPartner(formData) {
    const id = formData.get('id');
    const name = formData.get('name')?.trim();
    const role = formData.get('role')?.trim();
    const email = formData.get('email')?.trim();
    const profitShareRatio = parseFloat(formData.get('profitShareRatio')) || 0;
    const initialCapital = parseFloat(formData.get('initialCapital')) || 0;

    if (!id || !name) {
      window.UI.showToast('Partner name is required', 'danger');
      return;
    }

    window.Store.updatePartner(id, {
      name,
      role,
      email,
      profitShareRatio,
      initialCapital,
      avatar: name[0].toUpperCase()
    });

    window.UI.closeModal('editPartnerModal');
    window.UI.showToast(`Partner "${name}" updated.`);
  },

  confirmDelete(partnerId) {
    const state = window.Store.getState();
    const partner = (state.partners || []).find(p => p.id === partnerId);
    if (!partner) return;

    if (confirm(`Are you sure you want to remove "${partner.name}"?`)) {
      window.Store.deletePartner(partnerId);
      window.UI.showToast(`Partner "${partner.name}" removed.`, 'info');
    }
  }
};

window.PartnersModule = PartnersModule;
