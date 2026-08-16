/**
 * Somraas State Management & Data Store (Rupees INR)
 * Supports Multi-Partner Personal Bank / UPI Accounts, Inter-Partner Settlement & Full Audit Trail
 */

const STORAGE_KEY = 'somraas_store_inr_v1';

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
    id: 'partner_aarav',
    name: 'Aarav Sharma',
    role: 'Managing Partner',
    avatar: 'A'
  },
  partners: [
    {
      id: 'partner_aarav',
      name: 'Aarav Sharma',
      role: 'Managing Partner',
      email: 'aarav@company.in',
      avatar: 'A',
      color: '#3b82f6',
      profitShareRatio: 40,
      initialCapital: 500000,
      createdAt: '2026-01-01'
    },
    {
      id: 'partner_sneha',
      name: 'Sneha Patel',
      role: 'Operations Partner',
      email: 'sneha@company.in',
      avatar: 'S',
      color: '#10b981',
      profitShareRatio: 35,
      initialCapital: 350000,
      createdAt: '2026-01-01'
    },
    {
      id: 'partner_rohan',
      name: 'Rohan Verma',
      role: 'Marketing & Sales Partner',
      email: 'rohan@company.in',
      avatar: 'R',
      color: '#8b5cf6',
      profitShareRatio: 25,
      initialCapital: 250000,
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
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        st = JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to parse saved state, using default demo state', e);
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
        }
      }
    }

    return st;
  }

  initServerSync() {
    if (typeof window === 'undefined' || !window.fetch) return;

    fetch('/api/data')
      .then(res => res.json())
      .then(serverData => {
        if (serverData && serverData.partners && serverData.transactions) {
          const currentActiveUser = this.state.activeUser;
          this.state = serverData;
          if (!this.state.auditLogs) this.state.auditLogs = [];
          if (!this.state.expenseCategories) this.state.expenseCategories = DEFAULT_INITIAL_STATE.expenseCategories;
          if (currentActiveUser) this.state.activeUser = currentActiveUser;
          try { localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state)); } catch (e) {}
          this.notify();
        } else {
          this.syncToServer();
        }
      })
      .catch(() => {});

    if (typeof EventSource !== 'undefined') {
      try {
        const eventSource = new EventSource('/api/events');
        eventSource.addEventListener('data_update', (e) => {
          if (this.isSyncing) return;
          try {
            const updatedData = JSON.parse(e.data);
            if (updatedData && updatedData.partners) {
              const currentActiveUser = this.state.activeUser;
              this.state = updatedData;
              if (currentActiveUser) this.state.activeUser = currentActiveUser;
              try { localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state)); } catch (err) {}
              this.notify();
              if (window.UI && window.UI.showToast) {
                window.UI.showToast('⚡ Real-time update synced from partner!', 'info', 2500);
              }
            }
          } catch (err) {}
        });
      } catch (e) {}
    }
  }

  syncToServer() {
    if (typeof window === 'undefined' || !window.fetch) return;
    this.isSyncing = true;
    fetch('/api/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state)
    })
    .catch(() => {})
    .finally(() => {
      setTimeout(() => { this.isSyncing = false; }, 300);
    });
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

  // Products & Stock (with Location Tracking)
  addProduct(product) {
    product.id = product.id || 'prod_' + Date.now();
    product.createdAt = product.createdAt || new Date().toISOString().split('T')[0];
    product.location = product.location || 'Warehouse A';
    product.stock = Number(product.stock) || 0;
    product.costPrice = Number(product.costPrice) || 0;
    product.minThreshold = Number(product.minThreshold) || 5;
    this.state.products.push(product);
    this.logActivity('ITEM CREATED', `Added product "${product.name}" at location "${product.location}" (Stock: ${product.stock} ${product.unit || 'pcs'})`);
    this.saveState();
    return product;
  }

  updateProduct(productId, updatedData) {
    const idx = this.state.products.findIndex(p => p.id === productId);
    if (idx !== -1) {
      const old = this.state.products[idx];
      const newStock = updatedData.stock !== undefined ? Number(updatedData.stock) : old.stock;
      const newCost = updatedData.costPrice !== undefined ? Number(updatedData.costPrice) : old.costPrice;
      const newLocation = updatedData.location !== undefined ? updatedData.location : (old.location || 'Warehouse A');

      this.state.products[idx] = {
        ...this.state.products[idx],
        ...updatedData,
        location: newLocation,
        stock: newStock,
        costPrice: newCost
      };

      const locChange = old.location !== newLocation ? `, Location: "${old.location}" → "${newLocation}"` : '';
      this.logActivity('ITEM EDITED', `Edited "${old.name}": Cost: ₹${newCost}, Stock: ${newStock}${locChange}`);
      this.saveState();
      return this.state.products[idx];
    }
    return null;
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
        if (prod) prod.stock = Math.max(0, (prod.stock || 0) - Number(item.quantity));
      }
    } else if (tx.type === 'PURCHASE' && tx.items && tx.items.length > 0) {
      for (const item of tx.items) {
        const prod = this.state.products.find(p => p.id === item.productId);
        if (prod) prod.stock = (prod.stock || 0) + Number(item.quantity);
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

    if (oldTx.type === 'SALE' && oldTx.items) {
      for (const item of oldTx.items) {
        const prod = this.state.products.find(p => p.id === item.productId);
        if (prod) prod.stock += Number(item.quantity);
      }
    } else if (oldTx.type === 'PURCHASE' && oldTx.items) {
      for (const item of oldTx.items) {
        const prod = this.state.products.find(p => p.id === item.productId);
        if (prod) prod.stock = Math.max(0, prod.stock - Number(item.quantity));
      }
    }

    const newTx = { ...oldTx, ...updatedTxData, lastEditedBy: this.state.activeUser ? this.state.activeUser.name : 'Staff', lastEditedAt: new Date().toISOString() };

    if (newTx.type === 'SALE' && newTx.items) {
      for (const item of newTx.items) {
        const prod = this.state.products.find(p => p.id === item.productId);
        if (prod) prod.stock = Math.max(0, prod.stock - Number(item.quantity));
      }
    } else if (newTx.type === 'PURCHASE' && newTx.items) {
      for (const item of newTx.items) {
        const prod = this.state.products.find(p => p.id === item.productId);
        if (prod) prod.stock += Number(item.quantity);
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
          if (prod) prod.stock += Number(item.quantity);
        }
      } else if (tx.type === 'PURCHASE' && tx.items) {
        for (const item of tx.items) {
          const prod = this.state.products.find(p => p.id === item.productId);
          if (prod) prod.stock = Math.max(0, prod.stock - Number(item.quantity));
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
