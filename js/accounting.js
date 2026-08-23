/**
 * EquiLedger Double-Entry Financial Engine (Indian Rupees - ₹ INR)
 * Supports Personal Bank / UPI Accounts, Cash Holdings per Partner & Settlement Math
 */

const AccountingEngine = {

  // Compatibility alias for summary calculations
  calculateFinancialSummary(state, period = 'ALL') {
    const f = this.calculateFinancials(state, period);
    const partners = (f.partnerSummaries || []).map(p => ({
      ...p,
      totalCapitalAccountBalance: p.endingCapital
    }));

    return {
      ...f,
      totalRevenue: f.revenue,
      totalCOGS: f.cogs,
      totalExpenses: f.expenses,
      grossProfit: f.grossProfit,
      grossMarginPercent: f.grossMarginPercent,
      netProfit: f.netProfit,
      netMarginPercent: f.netMarginPercent,
      inventory: {
        totalCostValue: f.inventoryValuation,
        totalStockUnits: f.totalStockUnits
      },
      cash: {
        balance: f.liquidCashBalance
      },
      partners
    };
  },

  // Core Financial Statements in ₹ INR
  calculateFinancials(state, period = 'ALL') {
    const transactions = this.filterTransactionsByPeriod(state.transactions || [], period);
    const partners = state.partners || [];
    const products = state.products || [];

    let totalRevenue = 0;
    let totalCOGS = 0;
    let totalExpenses = 0;
    let totalInjections = 0;
    let totalDrawings = 0;
    const expensesByCategory = {};

    for (const tx of transactions) {
      const amount = Number(tx.amount) || 0;
      switch (tx.type) {
        case 'SALE':
          totalRevenue += amount;
          totalCOGS += (Number(tx.cogs) || 0);
          break;
        case 'EXPENSE':
          totalExpenses += amount;
          const cat = tx.category || 'General Expense';
          expensesByCategory[cat] = (expensesByCategory[cat] || 0) + amount;
          break;
        case 'PURCHASE':
          break;
        case 'INJECTION':
          totalInjections += amount;
          break;
        case 'DRAWING':
          totalDrawings += amount;
          break;
      }
    }

    const grossProfit = totalRevenue - totalCOGS;
    const grossMarginPercent = totalRevenue > 0 ? (grossProfit / totalRevenue) * 100 : 0;
    const netProfit = grossProfit - totalExpenses;
    const netMarginPercent = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;

    // Inventory Valuation in ₹ (Using purchase cost price)
    let totalInventoryValuation = 0;
    let totalStockUnits = 0;
    for (const prod of products) {
      const stock = Number(prod.stock) || 0;
      const cost = Number(prod.costPrice) || 0;
      totalStockUnits += stock;
      totalInventoryValuation += (stock * cost);
    }

    // Partner Personal Cash Holdings & Capital Accounts
    const partnerSummaries = {};
    for (const partner of partners) {
      partnerSummaries[partner.id] = {
        partnerId: partner.id,
        name: partner.name,
        role: partner.role || 'Partner',
        avatar: partner.avatar || partner.name[0].toUpperCase(),
        profitShareRatio: Number(partner.profitShareRatio) || 0,
        initialCapital: Number(partner.initialCapital) || 0,
        salesCollected: 0,
        expensesPaid: 0,
        restocksPaid: 0,
        injections: 0,
        drawings: 0,
        transfersSent: 0,
        transfersReceived: 0,
        netCashHeld: 0,
        allocatedProfit: 0,
        endingCapital: 0
      };
    }

    // Process all transactions for personal cash flow & account balances
    for (const tx of transactions) {
      const amount = Number(tx.amount) || 0;
      const holdingPartner = tx.holdingPartnerId || (partners.find(p => p.name === tx.recordedBy)?.id);

      if (tx.type === 'SALE' && holdingPartner && partnerSummaries[holdingPartner]) {
        partnerSummaries[holdingPartner].salesCollected += amount;
      } else if (tx.type === 'EXPENSE' && holdingPartner && partnerSummaries[holdingPartner]) {
        partnerSummaries[holdingPartner].expensesPaid += amount;
      } else if (tx.type === 'STOCK_CONTRIBUTION' || tx.type === 'STOCK_INVESTMENT' || tx.type === 'PURCHASE') {
        if (tx.payers && Array.isArray(tx.payers) && tx.payers.length > 0) {
          for (const payer of tx.payers) {
            const pId = payer.partnerId;
            const pAmt = Number(payer.amount) || 0;
            if (pId && partnerSummaries[pId]) {
              partnerSummaries[pId].restocksPaid += pAmt;
            }
          }
        } else if (holdingPartner && partnerSummaries[holdingPartner]) {
          partnerSummaries[holdingPartner].restocksPaid += amount;
        }
      } else if (tx.type === 'INJECTION') {
        const pId = tx.partnerId || holdingPartner;
        if (pId && partnerSummaries[pId]) {
          partnerSummaries[pId].injections += amount;
        }
      } else if (tx.type === 'DRAWING') {
        const pId = tx.partnerId || holdingPartner;
        if (pId && partnerSummaries[pId]) {
          partnerSummaries[pId].drawings += amount;
        }
      } else if (tx.type === 'TRANSFER') {
        if (tx.fromPartnerId && partnerSummaries[tx.fromPartnerId]) {
          partnerSummaries[tx.fromPartnerId].transfersSent += amount;
        }
        if (tx.toPartnerId && partnerSummaries[tx.toPartnerId]) {
          partnerSummaries[tx.toPartnerId].transfersReceived += amount;
        }
      }
    }

    let totalLiquidCashHeldAcrossPartners = 0;

    for (const partner of partners) {
      const s = partnerSummaries[partner.id];
      if (!s) continue;

      // Net cash currently sitting in this partner's personal account / UPI
      s.netCashHeld = (s.salesCollected + s.injections + s.transfersReceived) - 
                      (s.expensesPaid + s.restocksPaid + s.drawings + s.transfersSent);

      totalLiquidCashHeldAcrossPartners += s.netCashHeld;

      // Partner's share of Net Business Profit
      s.allocatedProfit = (netProfit * s.profitShareRatio) / 100;

      // Partner's total Capital balance
      s.endingCapital = s.initialCapital + s.injections + s.allocatedProfit - s.drawings;
    }

    const totalPartnerAllocatedProfit = Object.values(partnerSummaries)
      .reduce((sum, p) => sum + p.allocatedProfit, 0);

    const totalEndingCapital = Object.values(partnerSummaries)
      .reduce((sum, p) => sum + p.endingCapital, 0);

    return {
      revenue: totalRevenue,
      cogs: totalCOGS,
      grossProfit,
      grossMarginPercent,
      expenses: totalExpenses,
      expensesByCategory,
      netProfit,
      netMarginPercent,
      inventoryValuation: totalInventoryValuation,
      totalStockUnits,
      liquidCashBalance: totalLiquidCashHeldAcrossPartners,
      totalInjections,
      totalDrawings,
      totalEndingCapital,
      totalPartnerAllocatedProfit,
      partnerSummaries: Object.values(partnerSummaries),
      period
    };
  },

  filterTransactionsByPeriod(transactions, period) {
    if (period === 'ALL') return transactions;

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    const currentDay = now.getDate();

    return transactions.filter(tx => {
      if (!tx.date) return true;
      const txDate = new Date(tx.date);

      switch (period) {
        case 'TODAY':
          return txDate.getFullYear() === currentYear &&
                 txDate.getMonth() === currentMonth &&
                 txDate.getDate() === currentDay;
        case 'WEEK': {
          const weekAgo = new Date(now);
          weekAgo.setDate(now.getDate() - 7);
          return txDate >= weekAgo;
        }
        case 'MONTH':
          return txDate.getFullYear() === currentYear &&
                 txDate.getMonth() === currentMonth;
        case 'QUARTER': {
          const currentQuarter = Math.floor(currentMonth / 3);
          const txQuarter = Math.floor(txDate.getMonth() / 3);
          return txDate.getFullYear() === currentYear && txQuarter === currentQuarter;
        }
        case 'YEAR':
          return txDate.getFullYear() === currentYear;
        default:
          return true;
      }
    });
  }
};

if (typeof window !== 'undefined') {
  window.AccountingEngine = AccountingEngine;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AccountingEngine;
}
