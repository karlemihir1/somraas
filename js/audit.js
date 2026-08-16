/**
 * EquiLedger Audit Trail & Edit Activity Log Module
 * Tracks who edited what, when, and displays a clean chronological history.
 */

const AuditModule = {
  selectedUserFilter: 'ALL',
  selectedActionFilter: 'ALL',

  init() {
    this.bindEvents();
  },

  bindEvents() {
    const userFilter = document.getElementById('auditUserFilter');
    if (userFilter) {
      userFilter.addEventListener('change', (e) => {
        this.selectedUserFilter = e.target.value;
        this.render();
      });
    }

    const actionFilter = document.getElementById('auditActionFilter');
    if (actionFilter) {
      actionFilter.addEventListener('change', (e) => {
        this.selectedActionFilter = e.target.value;
        this.render();
      });
    }

    // Category Add Form
    const addCatForm = document.getElementById('addCategoryForm');
    if (addCatForm) {
      addCatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.getElementById('newCategoryInput');
        if (input && input.value.trim()) {
          const success = window.Store.addExpenseCategory(input.value.trim());
          if (success) {
            input.value = '';
            window.UI.showToast('Expense category added!');
            this.renderCategoryManager();
          } else {
            window.UI.showToast('Category already exists.', 'info');
          }
        }
      });
    }
  },

  render() {
    this.renderAuditLogs();
    this.renderCategoryManager();
  },

  renderAuditLogs() {
    const state = window.Store.getState();
    const logs = state.auditLogs || [];
    const tbody = document.getElementById('auditLogsTableBody');
    if (!tbody) return;

    this.updateUserFilterOptions(state.partners);

    const filtered = logs.filter(log => {
      const matchesUser = this.selectedUserFilter === 'ALL' || log.user === this.selectedUserFilter;
      const matchesAction = this.selectedActionFilter === 'ALL' || 
        (this.selectedActionFilter === 'EDITS' && (log.action.includes('EDIT') || log.action.includes('ADJUST') || log.action.includes('SPLIT'))) ||
        (this.selectedActionFilter === 'CREATIONS' && (log.action.includes('NEW') || log.action.includes('CREATED') || log.action.includes('ADDED'))) ||
        (this.selectedActionFilter === 'DELETIONS' && (log.action.includes('DELETED') || log.action.includes('REMOVED')));
      return matchesUser && matchesAction;
    });

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="4" style="text-align:center; padding: 36px 16px;">
            <div class="empty-state">
              <div class="empty-state-icon">📝</div>
              <div class="empty-state-title">No activity logs found</div>
              <div class="empty-state-desc">Every action, edit, and entry made by any user is recorded here automatically.</div>
            </div>
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = filtered.map(log => {
      let actionBadge = `<span class="badge badge-purchase">${log.action}</span>`;
      if (log.action.includes('EDIT') || log.action.includes('ADJUST') || log.action.includes('SPLIT')) {
        actionBadge = `<span class="badge badge-drawing">✎ ${log.action}</span>`;
      } else if (log.action.includes('NEW') || log.action.includes('CREATED') || log.action.includes('ADDED')) {
        actionBadge = `<span class="badge badge-sale">+ ${log.action}</span>`;
      } else if (log.action.includes('DELETED') || log.action.includes('REMOVED')) {
        actionBadge = `<span class="badge badge-expense">✕ ${log.action}</span>`;
      }

      const avatarLetter = (log.user || 'U')[0].toUpperCase();

      return `
        <tr>
          <td style="white-space: nowrap; font-size: 12.5px; color: var(--text-muted); font-family: var(--font-mono);">
            ${log.timestamp}
          </td>
          <td>
            <div class="user-tag">
              <span class="user-tag-avatar" style="background: var(--color-primary);">${avatarLetter}</span>
              <span style="font-weight: 700; color: var(--text-primary);">${log.user}</span>
            </div>
          </td>
          <td>${actionBadge}</td>
          <td style="font-size: 13.5px; color: var(--text-secondary); font-weight: 500;">
            ${log.details}
          </td>
        </tr>
      `;
    }).join('');
  },

  updateUserFilterOptions(partners = []) {
    const userSelect = document.getElementById('auditUserFilter');
    if (!userSelect) return;

    const currentVal = this.selectedUserFilter;
    let html = `<option value="ALL">All Users / Partners</option>`;
    for (const p of partners) {
      html += `<option value="${p.name}" ${p.name === currentVal ? 'selected' : ''}>${p.name}</option>`;
    }
    userSelect.innerHTML = html;
  },

  // Category Manager inside Settings Tab
  renderCategoryManager() {
    const container = document.getElementById('expenseCategoryManagerList');
    if (!container) return;

    const state = window.Store.getState();
    const categories = state.expenseCategories || [];

    if (categories.length === 0) {
      container.innerHTML = `<div style="color: var(--text-muted); padding: 8px;">No custom categories. Add one below.</div>`;
      return;
    }

    container.innerHTML = categories.map((cat, idx) => `
      <div style="display: flex; justify-content: space-between; align-items: center; background: var(--bg-surface-elevated); padding: 8px 12px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); margin-bottom: 6px;">
        <span style="font-weight: 600; font-size: 13px; color: var(--text-primary);">${cat}</span>
        <div style="display: flex; gap: 6px;">
          <button class="btn btn-secondary btn-xs" onclick="AuditModule.promptEditCategory('${cat.replace(/'/g, "\\'")}')" title="Rename category">
            ✎ Rename
          </button>
          <button class="btn btn-outline btn-xs" style="color: var(--color-danger);" onclick="AuditModule.confirmDeleteCategory('${cat.replace(/'/g, "\\'")}')" title="Delete category">
            ✕
          </button>
        </div>
      </div>
    `).join('');
  },

  promptEditCategory(oldCat) {
    const newCat = prompt(`Rename expense category "${oldCat}" to:`, oldCat);
    if (newCat && newCat.trim() && newCat.trim() !== oldCat) {
      window.Store.updateExpenseCategory(oldCat, newCat.trim());
      window.UI.showToast(`Category renamed to "${newCat.trim()}".`);
      this.renderCategoryManager();
    }
  },

  confirmDeleteCategory(cat) {
    if (confirm(`Are you sure you want to remove category "${cat}"?`)) {
      window.Store.deleteExpenseCategory(cat);
      window.UI.showToast(`Category "${cat}" removed.`, 'info');
      this.renderCategoryManager();
    }
  }
};

window.AuditModule = AuditModule;
