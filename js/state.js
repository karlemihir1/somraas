/**
 * Somraas State Management & Data Store (Rupees INR)
 * Supports Multi-Partner Personal Bank / UPI Accounts, Inter-Partner Settlement & Full Audit Trail
 */

const STORAGE_KEY = 'somraas_store_inr_v1';
const FIREBASE_DB_URL = 'https://somraas-a3f58-default-rtdb.firebaseio.com/somraas_cloud_store.json';

const DEFAULT_INITIAL_STATE = {
  settings: {
    businessName: 'Somraas',
    currencySymbol: '₹',
    currencyCode: 'INR',
    taxRatePercent: 0
  },
  expenseCategories: [
    'Rent & Warehouse',
    'Salaries & Staff Wages',
    'Electricity & Utilities',
    'Marketing & Online Ads',
    'Logistics & Courier Shipping',
    'Software & SaaS Tools',
    'CA, Legal & Accounting Fees',
    'Repairs & Maintenance',
    'Tea, Food & Hospitality',
    'Packaging & Raw Materials',
    'Miscellaneous Expenses'
  ],
  activeUser: {
    id: 'partner_mihir',
    name: 'Mihir',
    role: 'Managing Partner',
    avatar: 'M'
  },
  partners: [
    {
      id: 'partner_mihir',
      name: 'Mihir',
      role: 'Managing Partner',
      email: 'mihir@somraas.in',
      avatar: 'M',
      color: '#3b82f6',
      profitShareRatio: 33.4,
      initialCapital: 0,
      createdAt: '2026-01-01'
    },
    {
      id: 'partner_varun',
      name: 'Varun',
      role: 'Operations Partner',
      email: 'varun@somraas.in',
      avatar: 'V',
      color: '#10b981',
      profitShareRatio: 33.3,
      initialCapital: 0,
      createdAt: '2026-01-01'
    },
    {
      id: 'partner_vaishali',
      name: 'Vaishali',
      role: 'Founding Partner',
      email: 'vaishali@somraas.in',
      avatar: 'V',
      color: '#8b5cf6',
      profitShareRatio: 33.3,
      initialCapital: 0,
      createdAt: '2026-01-01'
    }
  ],
  products: [
    {
      id: 'prod_1',
      sku: 'SKU-ELEC-01',
      name: 'Noise-Canceling Pro Headphones',
      category: 'Electronics',
      location: 'Warehouse A - Rack 2 (Top Shelf)',
      unit: 'pcs',
      costPrice: 2800.00,
      stock: 45,
      minThreshold: 15,
      createdAt: '2026-01-05'
    },
    {
      id: 'prod_2',
      sku: 'SKU-ELEC-02',
      name: 'Ultra-Slim Mechanical RGB Keyboard',
      category: 'Electronics',
      location: 'Warehouse A - Shelf 4B',
      unit: 'pcs',
      costPrice: 1950.00,
      stock: 32,
      minThreshold: 10,
      createdAt: '2026-01-05'
    },
    {
      id: 'prod_3',
      sku: 'SKU-ACC-03',
      name: 'USB-C Fast Charging Multi-Hub (100W)',
      category: 'Accessories',
      location: 'Main Storefront - Counter Cabinet 1',
      unit: 'pcs',
      costPrice: 850.00,
      stock: 80,
      minThreshold: 20,
      createdAt: '2026-01-08'
    },
    {
      id: 'prod_4',
      sku: 'SKU-ACC-04',
      name: 'Ergonomic Wireless Vertical Mouse',
      category: 'Accessories',
      location: 'Main Storefront - Display Aisle 3',
      unit: 'pcs',
      costPrice: 950.00,
      stock: 8,
      minThreshold: 12,
      createdAt: '2026-01-10'
    },
    {
      id: 'prod_5',
      sku: 'SKU-WRK-05',
      name: 'Adjustable Aluminum Laptop Stand',
      category: 'Workstation',
      location: 'Warehouse B - Storage Bin 12',
      unit: 'pcs',
      costPrice: 1100.00,
      stock: 38,
      minThreshold: 10,
      createdAt: '2026-01-12'
    }
  ],
  transactions: [
    {
      id: 'tx_init_1',
      type: 'INJECTION',
      date: '2026-01-01',
      recordedBy: 'Aarav Sharma',
      partnerId: 'partner_aarav',
      partnerName: 'Aarav Sharma',
      holdingPartnerId: 'partner_aarav',
      holdingPartnerName: 'Aarav Sharma',
      category: 'Capital Contribution',
      description: 'Initial Equity Contribution by Aarav (in Aarav\'s Account)',
      amount: 500000.00,
      cogs: 0,
      stockImpact: 0,
      paymentMethod: 'Personal Bank Account',
      notes: 'Initial capital in Aarav\'s personal account'
    },
    {
      id: 'tx_init_2',
      type: 'INJECTION',
      date: '2026-01-01',
      recordedBy: 'Sneha Patel',
      partnerId: 'partner_sneha',
      partnerName: 'Sneha Patel',
      holdingPartnerId: 'partner_sneha',
      holdingPartnerName: 'Sneha Patel',
      category: 'Capital Contribution',
      description: 'Initial Equity Contribution by Sneha (in Sneha\'s Account)',
      amount: 350000.00,
      cogs: 0,
      stockImpact: 0,
      paymentMethod: 'Personal Bank Account',
      notes: 'Initial capital in Sneha\'s personal account'
    },
    {
      id: 'tx_init_3',
      type: 'INJECTION',
      date: '2026-01-01',
      recordedBy: 'Rohan Verma',
      partnerId: 'partner_rohan',
      partnerName: 'Rohan Verma',
      holdingPartnerId: 'partner_rohan',
      holdingPartnerName: 'Rohan Verma',
      category: 'Capital Contribution',
      description: 'Initial Equity Contribution by Rohan (in Rohan\'s Account)',
      amount: 250000.00,
      cogs: 0,
      stockImpact: 0,
      paymentMethod: 'Personal Bank Account',
      notes: 'Initial capital in Rohan\'s personal account'
    },
    {
      id: 'tx_restock_1',
      type: 'PURCHASE',
      date: '2026-01-05',
      recordedBy: 'Sneha Patel',
      holdingPartnerId: 'partner_sneha',
      holdingPartnerName: 'Sneha Patel',
      vendor: 'TechZone Wholesale Distributors Mumbai',
      category: 'Inventory Restock',
      description: 'Bulk opening batch: Headphones, Keyboards, Hubs, Stands',
      amount: 380000.00,
      cogs: 0,
      stockImpact: 220,
      items: [
        { productId: 'prod_1', productName: 'Noise-Canceling Pro Headphones', quantity: 60, unitCost: 2800.00, totalCost: 168000.00 },
        { productId: 'prod_2', productName: 'Ultra-Slim Mechanical RGB Keyboard', quantity: 50, unitCost: 1950.00, totalCost: 97500.00 },
        { productId: 'prod_3', productName: 'USB-C Fast Charging Multi-Hub (100W)', quantity: 100, unitCost: 850.00, totalCost: 85000.00 },
        { productId: 'prod_5', productName: 'Adjustable Aluminum Laptop Stand', quantity: 45, unitCost: 1100.00, totalCost: 49500.00 }
      ],
      paymentMethod: 'Sneha\'s Personal HDFC Account',
      notes: 'Paid from Sneha\'s personal account'
    },
    {
      id: 'tx_exp_1',
      type: 'EXPENSE',
      date: '2026-01-10',
      recordedBy: 'Aarav Sharma',
      holdingPartnerId: 'partner_aarav',
      holdingPartnerName: 'Aarav Sharma',
      category: 'Rent & Warehouse',
      description: 'Q1 Commercial Warehouse & Office Rent',
      amount: 45000.00,
      cogs: 0,
      stockImpact: 0,
      paymentMethod: 'Aarav\'s Personal Bank Transfer',
      paidTo: 'Apex Realty Properties'
    },
    {
      id: 'tx_exp_2',
      type: 'EXPENSE',
      date: '2026-01-15',
      recordedBy: 'Rohan Verma',
      holdingPartnerId: 'partner_rohan',
      holdingPartnerName: 'Rohan Verma',
      category: 'Marketing & Online Ads',
      description: 'Google Ads & Digital Performance Marketing',
      amount: 22500.00,
      cogs: 0,
      stockImpact: 0,
      paymentMethod: 'Rohan\'s Personal Credit Card',
      paidTo: 'Digital Media Agency'
    },
    {
      id: 'tx_exp_3',
      type: 'EXPENSE',
      date: '2026-01-20',
      recordedBy: 'Sneha Patel',
      holdingPartnerId: 'partner_sneha',
      holdingPartnerName: 'Sneha Patel',
      category: 'Logistics & Courier Shipping',
      description: 'Courier shipments & packaging materials',
      amount: 14200.00,
      cogs: 0,
      stockImpact: 0,
      paymentMethod: 'Sneha\'s Personal UPI (GPay)',
      paidTo: 'Bluedart Logistics'
    },
    {
      id: 'tx_sale_1',
      type: 'SALE',
      date: '2026-01-24',
      recordedBy: 'Sneha Patel',
      holdingPartnerId: 'partner_sneha',
      holdingPartnerName: 'Sneha Patel',
      customer: 'Infosys Tech Park Client',
      category: 'Product Sales',
      description: 'Corporate order: 10x Headphones, 12x Keyboards',
      amount: 110388.00,
      cogs: 51400.00,
      grossProfit: 58988.00,
      stockImpact: -22,
      items: [
        { productId: 'prod_1', productName: 'Noise-Canceling Pro Headphones', quantity: 10, unitPrice: 5999.00, unitCost: 2800.00, lineTotal: 59990.00 },
        { productId: 'prod_2', productName: 'Ultra-Slim Mechanical RGB Keyboard', quantity: 12, unitPrice: 4200.00, unitCost: 1950.00, lineTotal: 50400.00 }
      ],
      paymentMethod: 'Received in Sneha\'s Account',
      notes: 'Customer transferred to Sneha\'s HDFC'
    },
    {
      id: 'tx_sale_2',
      type: 'SALE',
      date: '2026-02-02',
      recordedBy: 'Aarav Sharma',
      holdingPartnerId: 'partner_aarav',
      holdingPartnerName: 'Aarav Sharma',
      customer: 'Studio 99 Coworking Space',
      category: 'Product Sales',
      description: 'Order: 20x USB Hubs, 15x Laptop Stands',
      amount: 81965.00,
      cogs: 33500.00,
      grossProfit: 48465.00,
      stockImpact: -35,
      items: [
        { productId: 'prod_3', productName: 'USB-C Fast Charging Multi-Hub (100W)', quantity: 20, unitPrice: 1999.00, unitCost: 850.00, lineTotal: 39980.00 },
        { productId: 'prod_5', productName: 'Adjustable Aluminum Laptop Stand', quantity: 15, unitPrice: 2799.00, unitCost: 1100.00, lineTotal: 41985.00 }
      ],
      paymentMethod: 'Received in Aarav\'s UPI (PhonePe)',
      notes: 'Customer scanned Aarav\'s QR'
    },
    {
      id: 'tx_sale_3',
      type: 'SALE',
      date: '2026-02-12',
      recordedBy: 'Rohan Verma',
      holdingPartnerId: 'partner_rohan',
      holdingPartnerName: 'Rohan Verma',
      customer: 'Online Store Shoppers Mumbai',
      category: 'Product Sales',
      description: 'Direct D2C Online Store Sales Batch',
      amount: 95400.00,
      cogs: 42100.00,
      grossProfit: 53300.00,
      stockImpact: -28,
      items: [
        { productId: 'prod_1', productName: 'Noise-Canceling Pro Headphones', quantity: 8, unitPrice: 5999.00, unitCost: 2800.00, lineTotal: 47992.00 },
        { productId: 'prod_2', productName: 'Ultra-Slim Mechanical RGB Keyboard', quantity: 6, unitPrice: 4200.00, unitCost: 1950.00, lineTotal: 25200.00 },
        { productId: 'prod_4', productName: 'Ergonomic Wireless Vertical Mouse', quantity: 9, unitPrice: 2450.00, unitCost: 950.00, lineTotal: 22050.00 }
      ],
      paymentMethod: 'Received in Rohan\'s Razorpay/Bank',
      notes: 'Settled to Rohan\'s ICICI account'
    },
    {
      id: 'tx_draw_1',
      type: 'DRAWING',
      date: '2026-02-10',
      recordedBy: 'Aarav Sharma',
      partnerId: 'partner_aarav',
      partnerName: 'Aarav Sharma',
      holdingPartnerId: 'partner_aarav',
      holdingPartnerName: 'Aarav Sharma',
      category: 'Partner Drawings',
      description: 'Interim Profit Drawing kept by Aarav',
      amount: 25000.00,
      cogs: 0,
      stockImpact: 0,
      paymentMethod: 'Retained from Sales',
      notes: 'Kept from collected sales cash'
    }
  ],
  auditLogs: [
    {
      id: 'log_init_1',
      timestamp: '2026-02-14 10:30 AM',
      user: 'Aarav Sharma',
      action: 'SYSTEM INITIALIZED',
      details: 'Initial system setup with Personal Account Tracking and Partner Cash Settlement engine.'
    }
  ],
  selectedPeriod: 'ALL'
};

class StateStore {
  constructor() {
    this.listeners = [];
    this.isSyncing = false;
    this.state = this.loadInitialState();
    this.initServerSync();
  }

  loadInitialState() {
    let st = null;
    const allStorageKeys = [
      STORAGE_KEY,
      'somraas_store_inr_v1',
      'equiledger_store_inr_v5',
      'equiledger_store_inr_v4',
      'equiledger_store_inr_v3',
      'equiledger_store_inr_v2',
      'equiledger_store_inr_v1',
      'equiledger_store_v1',
      'equiledger_app_state',
      'equiledger_state'
    ];

    for (const key of allStorageKeys) {
      try {
        const saved = localStorage.getItem(key);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed && Array.isArray(parsed.transactions) && parsed.transactions.length > 0) {
            st = parsed;
            console.log(`Auto-migrated data from storage key: ${key}`);
            break;
          } else if (!st && parsed && Array.isArray(parsed.partners)) {
            st = parsed;
          }
        }
      } catch (e) {}
    }

    if (!st) {
      st = JSON.parse(JSON.stringify(DEFAULT_INITIAL_STATE));
    }

    // Auto-sync partner names across activeUser, transactions, and audit logs
    if (st && st.partners && Array.isArray(st.partners)) {
      const partnerMap = {};
      for (const p of st.partners) {
        partnerMap[p.id] = p.name;
      }

      // Sync activeUser
      if (st.activeUser && partnerMap[st.activeUser.id]) {
        st.activeUser.name = partnerMap[st.activeUser.id];
      } else if (st.partners && st.partners.length > 0) {
        const firstP = st.partners[0];
        st.activeUser = {
          id: firstP.id,
          name: firstP.name,
          role: firstP.role || 'Managing Partner',
          avatar: (firstP.name || 'M')[0].toUpperCase()
        };
      }

      // Clean legacy "Aarav Sharma" from audit logs
      const defaultName = st.partners[0]?.name || 'Mihir';
      if (st.auditLogs && Array.isArray(st.auditLogs)) {
        for (const log of st.auditLogs) {
          if (log.user === 'Aarav Sharma') log.user = defaultName;
          if (log.details && typeof log.details === 'string' && log.details.includes('Aarav Sharma')) {
            log.details = log.details.replaceAll('Aarav Sharma', defaultName);
          }
        }
      }

      // Sync transactions
      if (st.transactions && Array.isArray(st.transactions)) {
        for (const tx of st.transactions) {
          if (tx.holdingPartnerId && partnerMap[tx.holdingPartnerId]) {
            tx.holdingPartnerName = partnerMap[tx.holdingPartnerId];
          }
          if (tx.fromPartnerId && partnerMap[tx.fromPartnerId]) {
            tx.fromPartnerName = partnerMap[tx.fromPartnerId];
          }
          if (tx.toPartnerId && partnerMap[tx.toPartnerId]) {
            tx.toPartnerName = partnerMap[tx.toPartnerId];
          }
          if (tx.recordedBy === 'Aarav Sharma') tx.recordedBy = defaultName;
          if (tx.lastEditedBy === 'Aarav Sharma') tx.lastEditedBy = defaultName;
        }
      }
    }

    return st;
  }

  updateSyncBadge(status) {
    const badge = document.getElementById('cloudSyncStatusBadge');
    if (!badge) return;

    if (status === 'online') {
      badge.innerHTML = '<span style="font-size: 8px;">🟢</span> Cloud Synced (24/7 Live)';
      badge.style.background = 'rgba(16, 185, 129, 0.15)';
      badge.style.color = 'var(--color-success)';
      badge.style.borderColor = 'rgba(16, 185, 129, 0.3)';
    } else if (status === 'syncing') {
      badge.innerHTML = '<span style="font-size: 8px;">🔄</span> Syncing to Cloud...';
      badge.style.background = 'rgba(59, 130, 246, 0.15)';
      badge.style.color = 'var(--color-primary)';
      badge.style.borderColor = 'rgba(59, 130, 246, 0.3)';
    } else {
      badge.innerHTML = '<span style="font-size: 8px;">💾</span> Local Offline (Saved)';
      badge.style.background = 'rgba(245, 158, 11, 0.15)';
      badge.style.color = 'var(--color-warning)';
      badge.style.borderColor = 'rgba(245, 158, 11, 0.3)';
    }
  }

  initServerSync() {
    if (typeof window === 'undefined' || !window.fetch) return;

    // 1. Initial Cloud Sync from Firebase Realtime Database
    fetch(FIREBASE_DB_URL)
      .then(res => res.json())
      .then(cloudData => {
        if (cloudData && Array.isArray(cloudData.transactions) && cloudData.transactions.length > 0) {
          const currentActiveUser = this.state.activeUser;
          this.state = cloudData;
          if (!this.state.auditLogs) this.state.auditLogs = [];
          if (!this.state.expenseCategories) this.state.expenseCategories = DEFAULT_INITIAL_STATE.expenseCategories;
          
          if (this.state.partners && this.state.partners.length > 0) {
            const partnerMap = {};
            this.state.partners.forEach(p => partnerMap[p.id] = p.name);
            if (!this.state.activeUser || !partnerMap[this.state.activeUser.id]) {
              const firstP = this.state.partners[0];
              this.state.activeUser = {
                id: firstP.id,
                name: firstP.name,
                role: firstP.role || 'Managing Partner',
                avatar: (firstP.name || 'M')[0].toUpperCase()
              };
            }
            const defaultName = this.state.partners[0]?.name || 'Mihir';
            for (const log of this.state.auditLogs) {
              if (log.user === 'Aarav Sharma') log.user = defaultName;
              if (log.details && typeof log.details === 'string') {
                log.details = log.details.replaceAll('Aarav Sharma', defaultName);
              }
            }
          }
          if (currentActiveUser && this.state.partners.some(p => p.id === currentActiveUser.id)) {
            this.state.activeUser = currentActiveUser;
          }
          this.normalizeAndMergeDuplicateProducts();
          try { localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state)); } catch (e) {}
          this.notify();
          this.updateSyncBadge('online');
        } else {
          // Cloud database is empty or local state has the user's data -> push local data to cloud!
          this.normalizeAndMergeDuplicateProducts();
          this.syncToServer();
        }
      })
      .catch(err => {
        console.warn('Firebase initial sync fallback to local storage:', err);
        this.updateSyncBadge('local');
      });

    // 2. Realtime 2-Way Live Streaming EventSource (Like Google Docs)
    if (typeof EventSource !== 'undefined') {
      try {
        const eventSource = new EventSource(FIREBASE_DB_URL);

        eventSource.addEventListener('put', (e) => {
          if (this.isSyncing) return;
          try {
            const payload = JSON.parse(e.data);
            if (payload && payload.data && Array.isArray(payload.data.partners) && Array.isArray(payload.data.products)) {
              const currentActiveUser = this.state.activeUser;
              this.state = payload.data;
              if (!this.state.auditLogs) this.state.auditLogs = [];
              if (this.state.partners && this.state.partners.length > 0) {
                const partnerMap = {};
                this.state.partners.forEach(p => partnerMap[p.id] = p.name);
                if (!this.state.activeUser || !partnerMap[this.state.activeUser.id]) {
                  const firstP = this.state.partners[0];
                  this.state.activeUser = {
                    id: firstP.id,
                    name: firstP.name,
                    role: firstP.role || 'Managing Partner',
                    avatar: (firstP.name || 'M')[0].toUpperCase()
                  };
                }
                const defaultName = this.state.partners[0]?.name || 'Mihir';
                for (const log of this.state.auditLogs) {
                  if (log.user === 'Aarav Sharma') log.user = defaultName;
                  if (log.details && typeof log.details === 'string') {
                    log.details = log.details.replaceAll('Aarav Sharma', defaultName);
                  }
                }
              }
              if (currentActiveUser && this.state.partners.some(p => p.id === currentActiveUser.id)) {
                this.state.activeUser = currentActiveUser;
              }
              try { localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state)); } catch (err) {}
              this.notify();
              this.updateSyncBadge('online');
              if (window.UI && window.UI.showToast) {
                window.UI.showToast('⚡ Live update synced across devices!', 'info', 2000);
              }
            }
          } catch (err) {}
        });

        eventSource.onopen = () => {
          this.updateSyncBadge('online');
        };

        eventSource.onerror = () => {
          this.updateSyncBadge('local');
        };
      } catch (e) {}
    }
  }

  syncToServer() {
    if (typeof window === 'undefined' || !window.fetch) return;
    this.isSyncing = true;
    this.updateSyncBadge('syncing');

    // Save to Google Firebase Cloud Database (Worldwide 24/7 sync)
    fetch(FIREBASE_DB_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state)
    })
    .then(() => {
      this.updateSyncBadge('online');
    })
    .catch(err => {
      console.warn('Firebase cloud sync save error:', err);
      this.updateSyncBadge('local');
    })
    .finally(() => {
      setTimeout(() => { this.isSyncing = false; }, 300);
    });

    // Also sync to local backend if running locally
    fetch('/api/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state)
    }).catch(() => {});
  }

  saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.error('Failed to save state to localStorage', e);
    }
    this.notify();
    this.syncToServer();
  }

  getState() {
    return this.state;
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    for (const listener of this.listeners) {
      try {
        listener(this.state);
      } catch (err) {
        console.error('Listener error:', err);
      }
    }
  }

  // AUDIT LOGGING HELPER
  logActivity(action, details) {
    if (!this.state.auditLogs) this.state.auditLogs = [];
    const now = new Date();
    const timeStr = now.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }) + ' ' + now.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });

    const activeUserName = this.state.activeUser ? this.state.activeUser.name : 'Staff';

    this.state.auditLogs.unshift({
      id: 'log_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      timestamp: timeStr,
      user: activeUserName,
      action,
      details
    });

    if (this.state.auditLogs.length > 150) {
      this.state.auditLogs = this.state.auditLogs.slice(0, 150);
    }
  }

  // Active User
  setActiveUser(user) {
    this.state.activeUser = user;
    this.logActivity('USER SWITCHED', `Switched active user profile to "${user.name}" (${user.role})`);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state)); } catch (e) {}
    this.notify();
  }

  // Period Filter
  setSelectedPeriod(period) {
    this.state.selectedPeriod = period;
    this.saveState();
  }

  // Business Settings
  updateSettings(settingsData) {
    this.state.settings = { ...this.state.settings, ...settingsData };
    this.logActivity('SETTINGS UPDATED', `Updated company settings: ${JSON.stringify(settingsData)}`);
    this.saveState();
  }

  // Dynamic Expense Categories
  addExpenseCategory(categoryName) {
    const trimmed = categoryName.trim();
    if (!trimmed) return false;
    if (!this.state.expenseCategories) this.state.expenseCategories = [];
    if (!this.state.expenseCategories.includes(trimmed)) {
      this.state.expenseCategories.push(trimmed);
      this.logActivity('CATEGORY ADDED', `Added new expense category "${trimmed}"`);
      this.saveState();
      return true;
    }
    return false;
  }

  deleteExpenseCategory(categoryName) {
    if (!this.state.expenseCategories) return;
    this.state.expenseCategories = this.state.expenseCategories.filter(c => c !== categoryName);
    this.logActivity('CATEGORY DELETED', `Removed expense category "${categoryName}"`);
    this.saveState();
  }

  updateExpenseCategory(oldName, newName) {
    const trimmed = newName.trim();
    if (!trimmed || !this.state.expenseCategories) return false;
    const idx = this.state.expenseCategories.indexOf(oldName);
    if (idx !== -1) {
      this.state.expenseCategories[idx] = trimmed;
      for (const tx of this.state.transactions) {
        if (tx.category === oldName) tx.category = trimmed;
      }
      this.logActivity('CATEGORY RENAMED', `Renamed expense category from "${oldName}" to "${trimmed}"`);
      this.saveState();
      return true;
    }
    return false;
  }

  // Partners
  addPartner(partner) {
    partner.id = partner.id || 'partner_' + Date.now();
    partner.createdAt = partner.createdAt || new Date().toISOString().split('T')[0];
    partner.profitShareRatio = Number(partner.profitShareRatio) || 0;
    partner.initialCapital = Number(partner.initialCapital) || 0;
    this.state.partners.push(partner);
    this.logActivity('PARTNER ADDED', `Registered new partner "${partner.name}" with ${partner.profitShareRatio}% equity`);
    this.saveState();
    return partner;
  }

  updatePartner(partnerId, updatedData) {
    const idx = this.state.partners.findIndex(p => p.id === partnerId);
    if (idx !== -1) {
      const oldPartner = this.state.partners[idx];
      const oldName = oldPartner.name;
      const newName = updatedData.name ? updatedData.name.trim() : oldName;

      if (updatedData.profitShareRatio !== undefined) updatedData.profitShareRatio = Number(updatedData.profitShareRatio) || 0;
      if (updatedData.initialCapital !== undefined) updatedData.initialCapital = Number(updatedData.initialCapital) || 0;
      
      this.state.partners[idx] = { 
        ...this.state.partners[idx], 
        ...updatedData, 
        name: newName,
        avatar: (newName || 'P')[0].toUpperCase()
      };

      // 1. Sync Active User if current active user is this partner
      if (this.state.activeUser && (this.state.activeUser.id === partnerId || this.state.activeUser.name === oldName)) {
        this.state.activeUser.id = partnerId;
        this.state.activeUser.name = newName;
        this.state.activeUser.role = updatedData.role || this.state.activeUser.role;
        this.state.activeUser.avatar = newName[0].toUpperCase();
      }

      // 2. Sync existing transactions associated with this partner
      if (this.state.transactions && Array.isArray(this.state.transactions)) {
        for (const tx of this.state.transactions) {
          if (tx.holdingPartnerId === partnerId) {
            tx.holdingPartnerName = newName;
          }
          if (tx.partnerId === partnerId) {
            tx.partnerName = newName;
          }
          if (tx.fromPartnerId === partnerId) {
            tx.fromPartnerName = newName;
          }
          if (tx.toPartnerId === partnerId) {
            tx.toPartnerName = newName;
          }
          if (tx.recordedBy === oldName) {
            tx.recordedBy = newName;
          }
          if (tx.lastEditedBy === oldName) {
            tx.lastEditedBy = newName;
          }
        }
      }

      this.logActivity('PARTNER EDITED', `Renamed partner "${oldName}" → "${newName}" (Role: ${this.state.partners[idx].role}, Equity: ${this.state.partners[idx].profitShareRatio}%)`);
      this.saveState();
      return this.state.partners[idx];
    }
    return null;
  }

  updateAllPartnerRatios(ratiosMap) {
    const ratioChanges = [];
    for (const partner of this.state.partners) {
      if (ratiosMap[partner.id] !== undefined) {
        const old = partner.profitShareRatio;
        partner.profitShareRatio = Number(ratiosMap[partner.id]) || 0;
        ratioChanges.push(`${partner.name}: ${old}% → ${partner.profitShareRatio}%`);
      }
    }
    this.logActivity('EQUITY SPLIT ADJUSTED', `Updated partner equity ratios: ${ratioChanges.join(', ')}`);
    this.saveState();
  }

  deletePartner(partnerId) {
    const partner = this.state.partners.find(p => p.id === partnerId);
    this.state.partners = this.state.partners.filter(p => p.id !== partnerId);
    this.logActivity('PARTNER REMOVED', `Removed partner "${partner ? partner.name : partnerId}"`);
    this.saveState();
  }

  // Products & Stock (Multi-Location & Partner Stock Holdings)
  normalizeAndMergeDuplicateProducts() {
    if (!this.state.products || !Array.isArray(this.state.products)) return;

    const mergedProducts = [];
    const nameMap = {};
    const idRedirectMap = {};
    let didMerge = false;

    for (const p of this.state.products) {
      // Ensure locationStocks object exists
      if (!p.locationStocks || typeof p.locationStocks !== 'object') {
        p.locationStocks = {};
      }

      // If locationStocks is empty or sums to 0 but p.stock > 0, initialize it from p.location
      const existingSum = Object.values(p.locationStocks).reduce((a, b) => Number(a) + Number(b), 0);
      if (existingSum === 0 && Number(p.stock) > 0) {
        const loc = p.location || 'Varun';
        p.locationStocks[loc] = Number(p.stock);
      }

      const normName = p.name.trim().toLowerCase();

      if (nameMap[normName] !== undefined) {
        // Duplicate found! Merge into existing product
        didMerge = true;
        const target = mergedProducts[nameMap[normName]];
        idRedirectMap[p.id] = target.id;

        // Merge locationStocks
        for (const [loc, qty] of Object.entries(p.locationStocks)) {
          target.locationStocks[loc] = (target.locationStocks[loc] || 0) + (Number(qty) || 0);
        }

        // Recalculate total stock
        target.stock = Object.values(target.locationStocks).reduce((a, b) => Number(a) + Number(b), 0);

        // Keep highest/latest cost price if available
        if (p.costPrice && !target.costPrice) target.costPrice = p.costPrice;
      } else {
        nameMap[normName] = mergedProducts.length;
        // Recalculate total stock from locationStocks
        p.stock = Object.values(p.locationStocks).reduce((a, b) => Number(a) + Number(b), 0);
        mergedProducts.push(p);
      }
    }

    if (didMerge) {
      this.state.products = mergedProducts;
      // Remap any transactions referencing merged IDs
      if (this.state.transactions && Array.isArray(this.state.transactions)) {
        for (const tx of this.state.transactions) {
          if (tx.items && Array.isArray(tx.items)) {
            for (const item of tx.items) {
              if (idRedirectMap[item.productId]) {
                item.productId = idRedirectMap[item.productId];
              }
            }
          }
        }
      }
      this.logActivity('CATALOG CLEANED', 'Auto-merged duplicate product entries across locations into unified stock holdings.');
    }
  }

  addProduct(product) {
    product.id = product.id || 'prod_' + Date.now();
    product.createdAt = product.createdAt || new Date().toISOString().split('T')[0];
    const initLocation = product.location || 'Varun';
    product.stock = Number(product.stock) || 0;
    product.costPrice = Number(product.costPrice) || 0;
    product.minThreshold = Number(product.minThreshold) || 5;

    if (!product.locationStocks || typeof product.locationStocks !== 'object') {
      product.locationStocks = {};
      product.locationStocks[initLocation] = product.stock;
    }

    this.state.products.push(product);
    this.normalizeAndMergeDuplicateProducts();
    this.logActivity('ITEM CREATED', `Added product "${product.name}" with stock at "${initLocation}" (Stock: ${product.stock} ${product.unit || 'pcs'})`);
    this.saveState();
    return product;
  }

  updateProduct(productId, updatedData) {
    const idx = this.state.products.findIndex(p => p.id === productId);
    if (idx !== -1) {
      const old = this.state.products[idx];
      const newCost = updatedData.costPrice !== undefined ? Number(updatedData.costPrice) : old.costPrice;

      let locationStocks = updatedData.locationStocks ? { ...updatedData.locationStocks } : (old.locationStocks ? { ...old.locationStocks } : {});
      
      if (updatedData.stock !== undefined && !updatedData.locationStocks) {
        // If updating stock directly, put into primary location
        const loc = old.location || Object.keys(locationStocks)[0] || 'Varun';
        locationStocks = { [loc]: Number(updatedData.stock) };
      }

      const totalStock = Object.values(locationStocks).reduce((a, b) => Number(a) + Number(b), 0);

      this.state.products[idx] = {
        ...this.state.products[idx],
        ...updatedData,
        costPrice: newCost,
        locationStocks,
        stock: totalStock
      };

      this.logActivity('ITEM EDITED', `Edited "${old.name}": Cost: ₹${newCost}, Total Stock: ${totalStock}`);
      this.saveState();
      return this.state.products[idx];
    }
    return null;
  }

  transferProductStock(productId, fromLocation, toLocation, quantity, notes = '') {
    const prod = this.state.products.find(p => p.id === productId);
    if (!prod) return false;

    if (!prod.locationStocks) {
      prod.locationStocks = { [prod.location || 'Varun']: Number(prod.stock) || 0 };
    }

    const available = Number(prod.locationStocks[fromLocation]) || 0;
    const qty = Number(quantity) || 0;

    if (qty <= 0) return false;

    prod.locationStocks[fromLocation] = Math.max(0, available - qty);
    prod.locationStocks[toLocation] = (Number(prod.locationStocks[toLocation]) || 0) + qty;
    prod.stock = Object.values(prod.locationStocks).reduce((a, b) => Number(a) + Number(b), 0);

    this.logActivity('STOCK SHIFTED', `Transferred ${qty}x "${prod.name}" from 📍 ${fromLocation} → 📍 ${toLocation} (${notes || 'Location Shift'})`);
    this.saveState();
    return true;
  }

  deleteProduct(productId) {
    const prod = this.state.products.find(p => p.id === productId);
    this.state.products = this.state.products.filter(p => p.id !== productId);
    this.logActivity('ITEM DELETED', `Removed product "${prod ? prod.name : productId}" from catalog`);
    this.saveState();
  }

  adjustProductStock(productId, deltaQty, reason = 'Stock adjustment') {
    const prod = this.state.products.find(p => p.id === productId);
    if (prod) {
      const oldStock = prod.stock || 0;
      prod.stock = Math.max(0, oldStock + Number(deltaQty));
      this.logActivity('STOCK ADJUSTED', `Stock for "${prod.name}" (at ${prod.location || 'Storage'}) changed from ${oldStock} to ${prod.stock} (${deltaQty > 0 ? '+' : ''}${deltaQty} ${prod.unit || 'pcs'}. Reason: ${reason})`);
      this.saveState();
    }
  }

  // Transactions (with Personal Account Tracking & Internal Partner Transfers)
  addTransaction(tx) {
    tx.id = tx.id || 'tx_' + Date.now();
    tx.date = tx.date || new Date().toISOString().split('T')[0];
    tx.recordedBy = tx.recordedBy || (this.state.activeUser ? this.state.activeUser.name : 'Staff');
    tx.createdAt = new Date().toISOString();

    // Default holding partner if not set
    if (!tx.holdingPartnerId && this.state.activeUser) {
      tx.holdingPartnerId = this.state.activeUser.id;
      tx.holdingPartnerName = this.state.activeUser.name;
    }

    if (tx.type === 'SALE' && tx.items && tx.items.length > 0) {
      for (const item of tx.items) {
        const prod = this.state.products.find(p => p.id === item.productId);
        if (prod) {
          if (!prod.locationStocks) prod.locationStocks = {};
          const targetLoc = item.location || tx.location || Object.keys(prod.locationStocks)[0] || prod.location || 'Varun';
          prod.locationStocks[targetLoc] = Math.max(0, (Number(prod.locationStocks[targetLoc]) || 0) - Number(item.quantity));
          prod.stock = Object.values(prod.locationStocks).reduce((a, b) => Number(a) + Number(b), 0);
        }
      }
    } else if (tx.type === 'PURCHASE' && tx.items && tx.items.length > 0) {
      for (const item of tx.items) {
        const prod = this.state.products.find(p => p.id === item.productId);
        if (prod) {
          if (!prod.locationStocks) prod.locationStocks = {};
          const targetLoc = item.location || tx.location || prod.location || 'Varun';
          prod.locationStocks[targetLoc] = (Number(prod.locationStocks[targetLoc]) || 0) + Number(item.quantity);
          prod.stock = Object.values(prod.locationStocks).reduce((a, b) => Number(a) + Number(b), 0);
        }
      }
    }

    this.state.transactions.unshift(tx);
    const accountNote = tx.holdingPartnerName ? ` [Personal Account: ${tx.holdingPartnerName}]` : '';
    this.logActivity(`NEW ${tx.type}`, `Created ${tx.type} entry: ${tx.description} (₹${tx.amount.toLocaleString('en-IN')})${accountNote}`);
    this.saveState();
    return tx;
  }

  updateTransaction(txId, updatedTxData) {
    const idx = this.state.transactions.findIndex(t => t.id === txId);
    if (idx === -1) return null;

    const oldTx = this.state.transactions[idx];

    // Revert old transaction stock impact
    if (oldTx.type === 'SALE' && oldTx.items) {
      for (const item of oldTx.items) {
        const prod = this.state.products.find(p => p.id === item.productId);
        if (prod) {
          if (!prod.locationStocks) prod.locationStocks = {};
          const targetLoc = item.location || oldTx.location || Object.keys(prod.locationStocks)[0] || prod.location || 'Varun';
          prod.locationStocks[targetLoc] = (Number(prod.locationStocks[targetLoc]) || 0) + Number(item.quantity);
          prod.stock = Object.values(prod.locationStocks).reduce((a, b) => Number(a) + Number(b), 0);
        }
      }
    } else if (oldTx.type === 'PURCHASE' && oldTx.items) {
      for (const item of oldTx.items) {
        const prod = this.state.products.find(p => p.id === item.productId);
        if (prod) {
          if (!prod.locationStocks) prod.locationStocks = {};
          const targetLoc = item.location || oldTx.location || prod.location || 'Varun';
          prod.locationStocks[targetLoc] = Math.max(0, (Number(prod.locationStocks[targetLoc]) || 0) - Number(item.quantity));
          prod.stock = Object.values(prod.locationStocks).reduce((a, b) => Number(a) + Number(b), 0);
        }
      }
    }

    const newTx = { ...oldTx, ...updatedTxData, lastEditedBy: this.state.activeUser ? this.state.activeUser.name : 'Staff', lastEditedAt: new Date().toISOString() };

    // Apply new transaction stock impact
    if (newTx.type === 'SALE' && newTx.items) {
      for (const item of newTx.items) {
        const prod = this.state.products.find(p => p.id === item.productId);
        if (prod) {
          if (!prod.locationStocks) prod.locationStocks = {};
          const targetLoc = item.location || newTx.location || Object.keys(prod.locationStocks)[0] || prod.location || 'Varun';
          prod.locationStocks[targetLoc] = Math.max(0, (Number(prod.locationStocks[targetLoc]) || 0) - Number(item.quantity));
          prod.stock = Object.values(prod.locationStocks).reduce((a, b) => Number(a) + Number(b), 0);
        }
      }
    } else if (newTx.type === 'PURCHASE' && newTx.items) {
      for (const item of newTx.items) {
        const prod = this.state.products.find(p => p.id === item.productId);
        if (prod) {
          if (!prod.locationStocks) prod.locationStocks = {};
          const targetLoc = item.location || newTx.location || prod.location || 'Varun';
          prod.locationStocks[targetLoc] = (Number(prod.locationStocks[targetLoc]) || 0) + Number(item.quantity);
          prod.stock = Object.values(prod.locationStocks).reduce((a, b) => Number(a) + Number(b), 0);
        }
      }
    }

    this.state.transactions[idx] = newTx;
    this.logActivity(`EDITED ${oldTx.type}`, `Edited transaction ${oldTx.id}: ${newTx.description} (₹${oldTx.amount} → ₹${newTx.amount}) [Account: ${newTx.holdingPartnerName || 'Personal'}]`);
    this.saveState();
    return newTx;
  }

  deleteTransaction(txId) {
    const tx = this.state.transactions.find(t => t.id === txId);
    if (tx) {
      if (tx.type === 'SALE' && tx.items) {
        for (const item of tx.items) {
          const prod = this.state.products.find(p => p.id === item.productId);
          if (prod) {
            if (!prod.locationStocks) prod.locationStocks = {};
            const targetLoc = item.location || tx.location || Object.keys(prod.locationStocks)[0] || prod.location || 'Varun';
            prod.locationStocks[targetLoc] = (Number(prod.locationStocks[targetLoc]) || 0) + Number(item.quantity);
            prod.stock = Object.values(prod.locationStocks).reduce((a, b) => Number(a) + Number(b), 0);
          }
        }
      } else if (tx.type === 'PURCHASE' && tx.items) {
        for (const item of tx.items) {
          const prod = this.state.products.find(p => p.id === item.productId);
          if (prod) {
            if (!prod.locationStocks) prod.locationStocks = {};
            const targetLoc = item.location || tx.location || prod.location || 'Varun';
            prod.locationStocks[targetLoc] = Math.max(0, (Number(prod.locationStocks[targetLoc]) || 0) - Number(item.quantity));
            prod.stock = Object.values(prod.locationStocks).reduce((a, b) => Number(a) + Number(b), 0);
          }
        }
      }
      this.state.transactions = this.state.transactions.filter(t => t.id !== txId);
      this.logActivity(`DELETED ${tx.type}`, `Voided/deleted transaction ${tx.id}: ${tx.description} (₹${tx.amount.toLocaleString('en-IN')})`);
      this.saveState();
    }
  }

  // Inter-Partner Settlement Transfer
  transferBetweenPartners(fromPartnerId, toPartnerId, amount, notes = 'Inter-partner cash settlement') {
    const fromP = this.state.partners.find(p => p.id === fromPartnerId);
    const toP = this.state.partners.find(p => p.id === toPartnerId);
    if (!fromP || !toP || amount <= 0) return null;

    const tx = {
      id: 'tx_transfer_' + Date.now(),
      type: 'TRANSFER',
      date: new Date().toISOString().split('T')[0],
      recordedBy: this.state.activeUser ? this.state.activeUser.name : 'Staff',
      fromPartnerId: fromP.id,
      fromPartnerName: fromP.name,
      toPartnerId: toP.id,
      toPartnerName: toP.name,
      category: 'Internal Partner Settlement',
      description: `Settlement Transfer: ${fromP.name} sent ₹${amount.toLocaleString('en-IN')} to ${toP.name}`,
      amount: Number(amount),
      cogs: 0,
      stockImpact: 0,
      paymentMethod: 'UPI / Personal Bank Transfer',
      notes,
      createdAt: new Date().toISOString()
    };

    this.state.transactions.unshift(tx);
    this.logActivity('PARTNER SETTLEMENT', `Transfer of ₹${amount.toLocaleString('en-IN')} from ${fromP.name}'s account to ${toP.name}'s account`);
    this.saveState();
    return tx;
  }

  resetToSampleData() {
    this.state = JSON.parse(JSON.stringify(DEFAULT_INITIAL_STATE));
    this.logActivity('DATA RESET', 'Reloaded default demo sample dataset');
    this.saveState();
  }

  clearAllData() {
    this.state = {
      settings: { businessName: 'My Enterprise', currencySymbol: '₹', currencyCode: 'INR' },
      expenseCategories: DEFAULT_INITIAL_STATE.expenseCategories,
      activeUser: { id: 'admin', name: 'Primary Admin', role: 'Partner / Admin', avatar: 'A' },
      partners: [],
      products: [],
      transactions: [],
      auditLogs: [{
        id: 'log_clear_' + Date.now(),
        timestamp: new Date().toLocaleDateString('en-IN') + ' ' + new Date().toLocaleTimeString('en-IN'),
        user: 'Primary Admin',
        action: 'ALL DATA CLEARED',
        details: 'Cleared all transactions, products, and partners.'
      }],
      selectedPeriod: 'ALL'
    };
    this.saveState();
  }

  importData(jsonData) {
    if (jsonData && Array.isArray(jsonData.partners) && Array.isArray(jsonData.products) && Array.isArray(jsonData.transactions)) {
      this.state = jsonData;
      if (!this.state.auditLogs) this.state.auditLogs = [];
      if (!this.state.expenseCategories) this.state.expenseCategories = DEFAULT_INITIAL_STATE.expenseCategories;
      this.logActivity('DATA IMPORTED', `Imported backup file with ${jsonData.transactions.length} transactions, ${jsonData.products.length} products`);
      this.saveState();
      return true;
    }
    return false;
  }
}

window.Store = new StateStore();
