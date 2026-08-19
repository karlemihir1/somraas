const AccountingEngine = require('./js/accounting.js');

// Mock Store State
const mockState = {
  settings: { currencySymbol: '₹', currencyCode: 'INR' },
  partners: [
    { id: 'partner_aarav', name: 'Aarav Sharma', role: 'Managing Partner', profitShareRatio: 40, initialCapital: 500000 },
    { id: 'partner_sneha', name: 'Sneha Patel', role: 'Operations Partner', profitShareRatio: 35, initialCapital: 350000 },
    { id: 'partner_rohan', name: 'Rohan Verma', role: 'Marketing Partner', profitShareRatio: 25, initialCapital: 250000 }
  ],
  products: [
    { id: 'prod_1', name: 'Headphones', location: 'Warehouse A', costPrice: 2800, stock: 45 },
    { id: 'prod_2', name: 'Keyboard', location: 'Warehouse A', costPrice: 1950, stock: 32 },
    { id: 'prod_3', name: 'USB Hub', location: 'Storefront', costPrice: 850, stock: 80 },
    { id: 'prod_4', name: 'Mouse', location: 'Storefront', costPrice: 950, stock: 8 },
    { id: 'prod_5', name: 'Stand', location: 'Warehouse B', costPrice: 1100, stock: 38 }
  ],
  transactions: [
    { type: 'INJECTION', amount: 500000, holdingPartnerId: 'partner_aarav', partnerId: 'partner_aarav' },
    { type: 'INJECTION', amount: 350000, holdingPartnerId: 'partner_sneha', partnerId: 'partner_sneha' },
    { type: 'INJECTION', amount: 250000, holdingPartnerId: 'partner_rohan', partnerId: 'partner_rohan' },
    { type: 'PURCHASE', amount: 380000, holdingPartnerId: 'partner_sneha' },
    { type: 'EXPENSE', amount: 45000, holdingPartnerId: 'partner_aarav' },
    { type: 'EXPENSE', amount: 22500, holdingPartnerId: 'partner_rohan' },
    { type: 'EXPENSE', amount: 14200, holdingPartnerId: 'partner_sneha' },
    { type: 'SALE', amount: 110388, cogs: 51400, holdingPartnerId: 'partner_sneha' },
    { type: 'SALE', amount: 81965, cogs: 33500, holdingPartnerId: 'partner_aarav' },
    { type: 'SALE', amount: 95400, cogs: 42100, holdingPartnerId: 'partner_rohan' },
    { type: 'DRAWING', amount: 25000, holdingPartnerId: 'partner_aarav', partnerId: 'partner_aarav' }
  ]
};

console.log('--- Testing EquiLedger Personal Account & Financial Engine in ₹ INR ---');
const report = AccountingEngine.calculateFinancials(mockState, 'ALL');

console.log(`Total Sales Revenue: ₹${report.revenue.toLocaleString('en-IN')}`);
console.log(`Total COGS: ₹${report.cogs.toLocaleString('en-IN')}`);
console.log(`Gross Profit: ₹${report.grossProfit.toLocaleString('en-IN')} (${report.grossMarginPercent.toFixed(1)}%)`);
console.log(`Total Operating Expenses: ₹${report.expenses.toLocaleString('en-IN')}`);
console.log(`Net Distributable Profit: ₹${report.netProfit.toLocaleString('en-IN')} (${report.netMarginPercent.toFixed(1)}%)`);
console.log(`Inventory Valuation: ₹${report.inventoryValuation.toLocaleString('en-IN')} (${report.totalStockUnits} units)`);
console.log(`Total Liquid Cash Held Across Personal Accounts: ₹${report.liquidCashBalance.toLocaleString('en-IN')}\n`);

console.log('Personal Bank / UPI Account Cash Breakdown:');
for (const p of report.partnerSummaries) {
  console.log(`- ${p.name}: Personal Cash Held = ₹${p.netCashHeld.toLocaleString('en-IN')} | Allocated Profit = ₹${p.allocatedProfit.toLocaleString('en-IN')} | Total Capital Equity = ₹${p.endingCapital.toLocaleString('en-IN')}`);
}

// Validation
if (report.grossProfit === 160753 && report.netProfit === 79053) {
  console.log('\n--- BASE ACCOUNTING & PERSONAL ACCOUNT TESTS PASSED! ---');
} else {
  console.error('Test mismatch!', report);
  process.exit(1);
}

// Test Multi-Partner Split Stock Purchase
console.log('\n--- Testing Multi-Partner Split Stock Purchase ---');
const splitState = JSON.parse(JSON.stringify(mockState));
splitState.transactions.push({
  type: 'PURCHASE',
  amount: 60000,
  payers: [
    { partnerId: 'partner_aarav', partnerName: 'Aarav Sharma', amount: 35000 },
    { partnerId: 'partner_rohan', partnerName: 'Rohan Verma', amount: 25000 }
  ]
});

const splitReport = AccountingEngine.calculateFinancials(splitState, 'ALL');
const aarav = splitReport.partnerSummaries.find(p => p.partnerId === 'partner_aarav');
const rohan = splitReport.partnerSummaries.find(p => p.partnerId === 'partner_rohan');

console.log(`Aarav stock paid: ₹${aarav.restocksPaid} (Expected: 35,000)`);
console.log(`Rohan stock paid: ₹${rohan.restocksPaid} (Expected: 25,000)`);

if (aarav.restocksPaid === 35000 && rohan.restocksPaid === 25000) {
  console.log('--- ALL MULTI-PARTNER STOCK SPLIT SETTLEMENT TESTS PASSED WITH 100% ACCURACY! ---');
} else {
  console.error('Split test failed!');
  process.exit(1);
}

// Test Independent STOCK_INVESTMENT on separate date
console.log('\n--- Testing Independent STOCK_INVESTMENT on Separate Date ---');
const investState = JSON.parse(JSON.stringify(mockState));
investState.transactions.push({
  type: 'STOCK_INVESTMENT',
  date: '2026-08-10',
  amount: 50000,
  holdingPartnerId: 'partner_rohan'
});

const investReport = AccountingEngine.calculateFinancials(investState, 'ALL');
const rohanInvest = investReport.partnerSummaries.find(p => p.partnerId === 'partner_rohan');

console.log(`Rohan stock investment credited: ₹${rohanInvest.restocksPaid} (Expected: 50,000)`);
if (rohanInvest.restocksPaid === 50000) {
  console.log('--- INDEPENDENT STOCK INVESTMENT ON SEPARATE DATES VERIFIED 100% ACCURATELY! ---');
} else {
  console.error('Stock investment test failed!');
  process.exit(1);
}

// Test STOCK_CONTRIBUTION with multi-partner payers
console.log('\n--- Testing STOCK_CONTRIBUTION Multi-Partner Payers ---');
const contribState = JSON.parse(JSON.stringify(mockState));
contribState.transactions.push({
  type: 'STOCK_CONTRIBUTION',
  date: '2026-08-12',
  amount: 40000,
  payers: [
    { partnerId: 'partner_sneha', partnerName: 'Sneha Patel', amount: 30000 },
    { partnerId: 'partner_aarav', partnerName: 'Aarav Sharma', amount: 10000 }
  ]
});

const contribReport = AccountingEngine.calculateFinancials(contribState, 'ALL');
const sneha = contribReport.partnerSummaries.find(p => p.partnerId === 'partner_sneha');
const aarav2 = contribReport.partnerSummaries.find(p => p.partnerId === 'partner_aarav');

console.log(`Sneha stock contribution: ₹${sneha.restocksPaid} (Expected: 410,000 with baseline 380k + 30k)`);
console.log(`Aarav stock contribution: ₹${aarav2.restocksPaid} (Expected: 10,000)`);

if (sneha.restocksPaid === 410000 && aarav2.restocksPaid === 10000) {
  console.log('--- ALL DEDICATED PARTNER STOCK MONEY & SETTLEMENT TESTS PASSED WITH 100% ACCURACY! ---');
} else {
  console.error('Stock contribution test failed!');
  process.exit(1);
}
