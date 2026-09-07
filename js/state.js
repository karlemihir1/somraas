/**
 * Somraas State Management & Data Store (Rupees INR)
 * Supports Multi-Partner Personal Bank / UPI Accounts, Inter-Partner Settlement & Full Audit Trail
 */

const STORAGE_KEY = 'somraas_store_inr_v4';
const FIREBASE_DB_URL = 'https://somraas-a3f58-default-rtdb.firebaseio.com/somraas_cloud_store.json';

const DEFAULT_INITIAL_STATE = {
  "settings": {
    "businessName": "Somraas",
    "currencySymbol": "\u20b9",
    "currencyCode": "INR",
    "taxRatePercent": 0
  },
  "expenseCategories": [
    "Logistics & Courier Shipping",
    "Stock Purchase",
    "Partner Settlement",
    "Rent & Warehouse",
    "Packaging & Raw Materials",
    "Miscellaneous Expenses"
  ],
  "activeUser": {
    "id": "partner_mihir",
    "name": "Mihir",
    "role": "Managing Partner",
    "avatar": "M"
  },
  "partners": [
    {
      "id": "partner_varun",
      "name": "Varun",
      "role": "Partner",
      "email": "varun@somraas.in",
      "avatar": "V",
      "color": "#10b981",
      "profitShareRatio": 33.34,
      "initialCapital": 0,
      "createdAt": "2026-08-01"
    },
    {
      "id": "partner_mihir",
      "name": "Mihir",
      "role": "Partner",
      "email": "mihir@somraas.in",
      "avatar": "M",
      "color": "#3b82f6",
      "profitShareRatio": 33.33,
      "initialCapital": 0,
      "createdAt": "2026-08-01"
    },
    {
      "id": "partner_vaishali",
      "name": "Vaishali",
      "role": "Partner",
      "email": "vaishali@somraas.in",
      "avatar": "V",
      "color": "#ec4899",
      "profitShareRatio": 33.33,
      "initialCapital": 0,
      "createdAt": "2026-08-01"
    }
  ],
  "products": [
    {
      "id": "prod_ballentines",
      "name": "Ballentines",
      "category": "Whisky",
      "costPrice": 1500,
      "stock": 5,
      "locationStocks": {
        "Varun": 3,
        "Mihir": 2
      },
      "minThreshold": 2
    },
    {
      "id": "prod_jameson",
      "name": "Jameson Irish Whiskey",
      "category": "Whisky",
      "costPrice": 2100,
      "stock": 5,
      "locationStocks": {
        "Varun": 3,
        "Mihir": 2
      },
      "minThreshold": 2
    },
    {
      "id": "prod_red_label",
      "name": "Red Label",
      "category": "Whisky",
      "costPrice": 1500,
      "stock": 3,
      "locationStocks": {
        "Varun": 3,
        "Mihir": 0
      },
      "minThreshold": 2
    },
    {
      "id": "prod_lemon",
      "name": "Bacardi Limon",
      "category": "Rum",
      "costPrice": 940,
      "stock": 2,
      "locationStocks": {
        "Varun": 2,
        "Mihir": 0
      },
      "minThreshold": 2
    },
    {
      "id": "prod_mango",
      "name": "Bacardi Mango Chilli",
      "category": "Rum",
      "costPrice": 980,
      "stock": 4,
      "locationStocks": {
        "Varun": 2,
        "Mihir": 2
      },
      "minThreshold": 2
    },
    {
      "id": "prod_minti_jamun_smirnoff",
      "name": "Smirnoff Minty Jamun",
      "category": "Vodka",
      "costPrice": 980,
      "stock": 5,
      "locationStocks": {
        "Varun": 3,
        "Mihir": 2
      },
      "minThreshold": 2
    },
    {
      "id": "prod_mango_mirchi",
      "name": "Smirnoff Mango Mirchi",
      "category": "Vodka",
      "costPrice": 980,
      "stock": 0,
      "locationStocks": {
        "Varun": 0,
        "Mihir": 0,
        "Ishan": 0
      },
      "minThreshold": 2
    },
    {
      "id": "prod_jim_beam",
      "name": "Jim Beam",
      "category": "Bourbon",
      "costPrice": 1580,
      "stock": 2,
      "locationStocks": {
        "Varun": 0,
        "Mihir": 2
      },
      "minThreshold": 2
    },
    {
      "id": "prod_rockford",
      "name": "Rockford Classic Whisky",
      "category": "Whisky",
      "costPrice": 1050,
      "stock": 3,
      "locationStocks": {
        "Varun": 1,
        "Mihir": 2
      },
      "minThreshold": 2
    },
    {
      "id": "prod_bombay_sapphire",
      "name": "Bombay Sapphire",
      "category": "Gin",
      "costPrice": 2100,
      "stock": 0,
      "locationStocks": {
        "Varun": 0,
        "Mihir": 0
      },
      "minThreshold": 2
    },
    {
      "id": "prod_absolute",
      "name": "Absolute Vodka",
      "category": "Vodka",
      "costPrice": 1870,
      "stock": 0,
      "locationStocks": {
        "Varun": 0,
        "Mihir": 0
      },
      "minThreshold": 2
    },
    {
      "id": "prod_bacardi_black",
      "name": "Bacardi Black",
      "category": "Rum",
      "costPrice": 760,
      "stock": 0,
      "locationStocks": {
        "Varun": 0,
        "Mihir": 0
      },
      "minThreshold": 2
    },
    {
      "id": "prod_ranthambore",
      "name": "Royal Ranthambore",
      "category": "Whisky",
      "costPrice": 1630,
      "stock": 0,
      "locationStocks": {
        "Varun": 0,
        "Mihir": 0
      },
      "minThreshold": 2
    }
  ],
  "transactions": [
    {
      "id": "tx_1001",
      "type": "PURCHASE",
      "date": "2026-08-01",
      "category": "Stock Purchase",
      "description": "Batch 1 Opening Stock: 12x Ballentines share (Varun paid \u20b99,800)",
      "amount": 9800,
      "holdingPartnerId": "partner_varun",
      "holdingPartnerName": "Varun",
      "stockImpact": 9,
      "paymentMethod": "UPI / Bank Transfer",
      "recordedBy": "Varun"
    },
    {
      "id": "tx_1012",
      "type": "SALE",
      "date": "2026-08-06",
      "category": "Bottle Sale",
      "description": "Sold 1x Ballentines (From: Varun)",
      "customer": "Customer",
      "amount": 1250,
      "cogs": 1125,
      "stockImpact": -1,
      "holdingPartnerId": "partner_varun",
      "holdingPartnerName": "Varun",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_ballentines",
          "productName": "Ballentines",
          "quantity": 1,
          "unitPrice": 1250,
          "unitCost": 1125,
          "location": "Varun"
        }
      ],
      "recordedBy": "Varun"
    },
    {
      "id": "tx_1013",
      "type": "SALE",
      "date": "2026-08-06",
      "category": "Bottle Sale",
      "description": "Sold 1x Ballentines (From: Varun)",
      "customer": "Customer",
      "amount": 1850,
      "cogs": 1125,
      "stockImpact": -1,
      "holdingPartnerId": "partner_varun",
      "holdingPartnerName": "Varun",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_ballentines",
          "productName": "Ballentines",
          "quantity": 1,
          "unitPrice": 1850,
          "unitCost": 1125,
          "location": "Varun"
        }
      ],
      "recordedBy": "Varun"
    },
    {
      "id": "tx_1014",
      "type": "SALE",
      "date": "2026-08-06",
      "category": "Bottle Sale",
      "description": "Sold 1x Ballentines (From: Varun)",
      "customer": "Customer",
      "amount": 1900,
      "cogs": 1125,
      "stockImpact": -1,
      "holdingPartnerId": "partner_varun",
      "holdingPartnerName": "Varun",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_ballentines",
          "productName": "Ballentines",
          "quantity": 1,
          "unitPrice": 1900,
          "unitCost": 1125,
          "location": "Varun"
        }
      ],
      "recordedBy": "Varun"
    },
    {
      "id": "tx_1002",
      "type": "PURCHASE",
      "date": "2026-08-07",
      "category": "Stock Purchase",
      "description": "Stock Purchase Batch 2 (Mihir paid)",
      "amount": 7510,
      "holdingPartnerId": "partner_mihir",
      "holdingPartnerName": "Mihir",
      "stockImpact": 6,
      "paymentMethod": "UPI / Bank Transfer",
      "recordedBy": "Mihir"
    },
    {
      "id": "tx_1009",
      "type": "EXPENSE",
      "date": "2026-08-07",
      "category": "Logistics & Courier Shipping",
      "description": "Goods Transport / Delivery (Mihir paid)",
      "amount": 200,
      "holdingPartnerId": "partner_mihir",
      "holdingPartnerName": "Mihir",
      "paymentMethod": "UPI",
      "recordedBy": "Mihir"
    },
    {
      "id": "tx_1015",
      "type": "SALE",
      "date": "2026-08-07",
      "category": "Bottle Sale",
      "description": "Sold 1x Ballentines (From: Mihir)",
      "customer": "Customer",
      "amount": 1850,
      "cogs": 1125,
      "stockImpact": -1,
      "holdingPartnerId": "partner_mihir",
      "holdingPartnerName": "Mihir",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_ballentines",
          "productName": "Ballentines",
          "quantity": 1,
          "unitPrice": 1850,
          "unitCost": 1125,
          "location": "Mihir"
        }
      ],
      "recordedBy": "Mihir"
    },
    {
      "id": "tx_1016",
      "type": "SALE",
      "date": "2026-08-07",
      "category": "Bottle Sale",
      "description": "Sold 1x Ballentines (From: Varun)",
      "customer": "Customer",
      "amount": 1850,
      "cogs": 1125,
      "stockImpact": -1,
      "holdingPartnerId": "partner_varun",
      "holdingPartnerName": "Varun",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_ballentines",
          "productName": "Ballentines",
          "quantity": 1,
          "unitPrice": 1850,
          "unitCost": 1125,
          "location": "Varun"
        }
      ],
      "recordedBy": "Varun"
    },
    {
      "id": "tx_1017",
      "type": "SALE",
      "date": "2026-08-07",
      "category": "Bottle Sale",
      "description": "Sold 1x Ballentines (From: Mihir)",
      "customer": "Customer",
      "amount": 1900,
      "cogs": 1125,
      "stockImpact": -1,
      "holdingPartnerId": "partner_mihir",
      "holdingPartnerName": "Mihir",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_ballentines",
          "productName": "Ballentines",
          "quantity": 1,
          "unitPrice": 1900,
          "unitCost": 1125,
          "location": "Mihir"
        }
      ],
      "recordedBy": "Mihir"
    },
    {
      "id": "tx_1018",
      "type": "SALE",
      "date": "2026-08-08",
      "category": "Bottle Sale",
      "description": "Sold 1x Ballentines (From: Varun)",
      "customer": "Customer",
      "amount": 1800,
      "cogs": 1125,
      "stockImpact": -1,
      "holdingPartnerId": "partner_varun",
      "holdingPartnerName": "Varun",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_ballentines",
          "productName": "Ballentines",
          "quantity": 1,
          "unitPrice": 1800,
          "unitCost": 1125,
          "location": "Varun"
        }
      ],
      "recordedBy": "Varun"
    },
    {
      "id": "tx_1019",
      "type": "SALE",
      "date": "2026-08-08",
      "category": "Bottle Sale",
      "description": "Sold 1x Ballentines (From: Varun)",
      "customer": "Customer",
      "amount": 1900,
      "cogs": 1125,
      "stockImpact": -1,
      "holdingPartnerId": "partner_varun",
      "holdingPartnerName": "Varun",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_ballentines",
          "productName": "Ballentines",
          "quantity": 1,
          "unitPrice": 1900,
          "unitCost": 1125,
          "location": "Varun"
        }
      ],
      "recordedBy": "Varun"
    },
    {
      "id": "tx_1020",
      "type": "SALE",
      "date": "2026-08-08",
      "category": "Bottle Sale",
      "description": "Sold 1x Ballentines (From: Varun)",
      "customer": "Customer",
      "amount": 1900,
      "cogs": 1125,
      "stockImpact": -1,
      "holdingPartnerId": "partner_varun",
      "holdingPartnerName": "Varun",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_ballentines",
          "productName": "Ballentines",
          "quantity": 1,
          "unitPrice": 1900,
          "unitCost": 1125,
          "location": "Varun"
        }
      ],
      "recordedBy": "Varun"
    },
    {
      "id": "tx_1003",
      "type": "PURCHASE",
      "date": "2026-08-09",
      "category": "Stock Purchase",
      "description": "Stock Purchase Batch 3 (Mihir paid)",
      "amount": 5880,
      "holdingPartnerId": "partner_mihir",
      "holdingPartnerName": "Mihir",
      "stockImpact": 6,
      "paymentMethod": "UPI / Bank Transfer",
      "recordedBy": "Mihir"
    },
    {
      "id": "tx_1010",
      "type": "EXPENSE",
      "date": "2026-08-09",
      "category": "Logistics & Courier Shipping",
      "description": "Goods Transport / Delivery (Mihir paid)",
      "amount": 150,
      "holdingPartnerId": "partner_mihir",
      "holdingPartnerName": "Mihir",
      "paymentMethod": "UPI",
      "recordedBy": "Mihir"
    },
    {
      "id": "tx_1021",
      "type": "SALE",
      "date": "2026-08-09",
      "category": "Bottle Sale",
      "description": "Sold 1x Ballentines (From: Varun)",
      "customer": "Customer",
      "amount": 1900,
      "cogs": 1125,
      "stockImpact": -1,
      "holdingPartnerId": "partner_varun",
      "holdingPartnerName": "Varun",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_ballentines",
          "productName": "Ballentines",
          "quantity": 1,
          "unitPrice": 1900,
          "unitCost": 1125,
          "location": "Varun"
        }
      ],
      "recordedBy": "Varun"
    },
    {
      "id": "tx_1022",
      "type": "SALE",
      "date": "2026-08-09",
      "category": "Bottle Sale",
      "description": "Sold 1x Ballentines (From: Mihir)",
      "customer": "Customer",
      "amount": 1900,
      "cogs": 1125,
      "stockImpact": -1,
      "holdingPartnerId": "partner_mihir",
      "holdingPartnerName": "Mihir",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_ballentines",
          "productName": "Ballentines",
          "quantity": 1,
          "unitPrice": 1900,
          "unitCost": 1125,
          "location": "Mihir"
        }
      ],
      "recordedBy": "Mihir"
    },
    {
      "id": "tx_1023",
      "type": "SALE",
      "date": "2026-08-09",
      "category": "Bottle Sale",
      "description": "Sold 1x Ballentines (From: Mihir)",
      "customer": "Customer",
      "amount": 1900,
      "cogs": 1125,
      "stockImpact": -1,
      "holdingPartnerId": "partner_mihir",
      "holdingPartnerName": "Mihir",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_ballentines",
          "productName": "Ballentines",
          "quantity": 1,
          "unitPrice": 1900,
          "unitCost": 1125,
          "location": "Mihir"
        }
      ],
      "recordedBy": "Mihir"
    },
    {
      "id": "tx_1004",
      "type": "PURCHASE",
      "date": "2026-08-10",
      "category": "Stock Purchase",
      "description": "Stock Purchase Batch 4 (Vaishali paid)",
      "amount": 3700,
      "holdingPartnerId": "partner_vaishali",
      "holdingPartnerName": "Vaishali",
      "stockImpact": 3,
      "paymentMethod": "UPI / Bank Transfer",
      "recordedBy": "Vaishali"
    },
    {
      "id": "tx_1008",
      "type": "EXPENSE",
      "date": "2026-08-10",
      "category": "Logistics & Courier Shipping",
      "description": "Goods Transport / Delivery (Vaishali paid)",
      "amount": 1200,
      "holdingPartnerId": "partner_vaishali",
      "holdingPartnerName": "Vaishali",
      "paymentMethod": "UPI",
      "recordedBy": "Vaishali"
    },
    {
      "id": "tx_1024",
      "type": "SALE",
      "date": "2026-08-10",
      "category": "Bottle Sale",
      "description": "Sold 1x Minti Jamun (From: Mihir)",
      "customer": "Customer",
      "amount": 1300,
      "cogs": 810,
      "stockImpact": -1,
      "holdingPartnerId": "partner_mihir",
      "holdingPartnerName": "Mihir",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_minti_jamun",
          "productName": "Minti Jamun",
          "quantity": 1,
          "unitPrice": 1300,
          "unitCost": 810,
          "location": "Mihir"
        }
      ],
      "recordedBy": "Mihir"
    },
    {
      "id": "tx_1025",
      "type": "SALE",
      "date": "2026-08-10",
      "category": "Bottle Sale",
      "description": "Sold 1x Minti Jamun (From: Varun)",
      "customer": "Customer",
      "amount": 1300,
      "cogs": 810,
      "stockImpact": -1,
      "holdingPartnerId": "partner_varun",
      "holdingPartnerName": "Varun",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_minti_jamun",
          "productName": "Minti Jamun",
          "quantity": 1,
          "unitPrice": 1300,
          "unitCost": 810,
          "location": "Varun"
        }
      ],
      "recordedBy": "Varun"
    },
    {
      "id": "tx_1026",
      "type": "SALE",
      "date": "2026-08-10",
      "category": "Bottle Sale",
      "description": "Sold 1x Lemon (From: Mihir)",
      "customer": "Customer",
      "amount": 1200,
      "cogs": 980,
      "stockImpact": -1,
      "holdingPartnerId": "partner_mihir",
      "holdingPartnerName": "Mihir",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_lemon",
          "productName": "Lemon",
          "quantity": 1,
          "unitPrice": 1200,
          "unitCost": 980,
          "location": "Mihir"
        }
      ],
      "recordedBy": "Mihir"
    },
    {
      "id": "tx_1027",
      "type": "SALE",
      "date": "2026-08-10",
      "category": "Bottle Sale",
      "description": "Sold 1x Lemon (From: Mihir)",
      "customer": "Customer",
      "amount": 1200,
      "cogs": 980,
      "stockImpact": -1,
      "holdingPartnerId": "partner_mihir",
      "holdingPartnerName": "Mihir",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_lemon",
          "productName": "Lemon",
          "quantity": 1,
          "unitPrice": 1200,
          "unitCost": 980,
          "location": "Mihir"
        }
      ],
      "recordedBy": "Mihir"
    },
    {
      "id": "tx_1051",
      "type": "TRANSFER",
      "date": "2026-08-10",
      "category": "Partner Settlement",
      "description": "Inter-Partner Transfer: Mihir to Varun",
      "amount": 450,
      "fromPartnerId": "partner_mihir",
      "fromPartnerName": "Mihir",
      "toPartnerId": "partner_varun",
      "toPartnerName": "Varun",
      "paymentMethod": "UPI / Bank",
      "recordedBy": "Mihir"
    },
    {
      "id": "tx_1052",
      "type": "TRANSFER",
      "date": "2026-08-10",
      "category": "Partner Settlement",
      "description": "Inter-Partner Transfer: Mihir to Vaishali",
      "amount": 3000,
      "fromPartnerId": "partner_mihir",
      "fromPartnerName": "Mihir",
      "toPartnerId": "partner_vaishali",
      "toPartnerName": "Vaishali",
      "paymentMethod": "UPI / Bank",
      "recordedBy": "Mihir"
    },
    {
      "id": "tx_1028",
      "type": "SALE",
      "date": "2026-08-11",
      "category": "Bottle Sale",
      "description": "Sold 1x Absolute (From: Varun)",
      "customer": "Customer",
      "amount": 2800,
      "cogs": 1970,
      "stockImpact": -1,
      "holdingPartnerId": "partner_mihir",
      "holdingPartnerName": "Mihir",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_absolute",
          "productName": "Absolute",
          "quantity": 1,
          "unitPrice": 2800,
          "unitCost": 1970,
          "location": "Varun"
        }
      ],
      "recordedBy": "Mihir"
    },
    {
      "id": "tx_1029",
      "type": "SALE",
      "date": "2026-08-11",
      "category": "Bottle Sale",
      "description": "Sold 1x Mango (From: Varun)",
      "customer": "Customer",
      "amount": 1200,
      "cogs": 980,
      "stockImpact": -1,
      "holdingPartnerId": "partner_mihir",
      "holdingPartnerName": "Mihir",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_mango",
          "productName": "Mango",
          "quantity": 1,
          "unitPrice": 1200,
          "unitCost": 980,
          "location": "Varun"
        }
      ],
      "recordedBy": "Mihir"
    },
    {
      "id": "tx_1030",
      "type": "SALE",
      "date": "2026-08-11",
      "category": "Bottle Sale",
      "description": "Sold 1x Mango (From: Kunal)",
      "customer": "Customer",
      "amount": 1200,
      "cogs": 980,
      "stockImpact": -1,
      "holdingPartnerId": "partner_mihir",
      "holdingPartnerName": "Mihir",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_mango",
          "productName": "Mango",
          "quantity": 1,
          "unitPrice": 1200,
          "unitCost": 980,
          "location": "Kunal"
        }
      ],
      "recordedBy": "Mihir"
    },
    {
      "id": "tx_1005",
      "type": "PURCHASE",
      "date": "2026-08-12",
      "category": "Stock Purchase",
      "description": "Stock Purchase Batch 5 (Varun paid)",
      "amount": 5440,
      "holdingPartnerId": "partner_varun",
      "holdingPartnerName": "Varun",
      "stockImpact": 5,
      "paymentMethod": "UPI / Bank Transfer",
      "recordedBy": "Varun"
    },
    {
      "id": "tx_1031",
      "type": "SALE",
      "date": "2026-08-12",
      "category": "Bottle Sale",
      "description": "Sold 1x Minti Jamun Smrinoff (From: Mihir)",
      "customer": "Customer",
      "amount": 1200,
      "cogs": 980,
      "stockImpact": -1,
      "holdingPartnerId": "partner_mihir",
      "holdingPartnerName": "Mihir",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_minti_jamun_smirnoff",
          "productName": "Minti Jamun Smrinoff",
          "quantity": 1,
          "unitPrice": 1200,
          "unitCost": 980,
          "location": "Mihir"
        }
      ],
      "recordedBy": "Mihir"
    },
    {
      "id": "tx_1032",
      "type": "SALE",
      "date": "2026-08-12",
      "category": "Bottle Sale",
      "description": "Sold 1x Minti Jamun Smrinoff (From: Mihir)",
      "customer": "Customer",
      "amount": 1200,
      "cogs": 980,
      "stockImpact": -1,
      "holdingPartnerId": "partner_mihir",
      "holdingPartnerName": "Mihir",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_minti_jamun_smirnoff",
          "productName": "Minti Jamun Smrinoff",
          "quantity": 1,
          "unitPrice": 1200,
          "unitCost": 980,
          "location": "Mihir"
        }
      ],
      "recordedBy": "Mihir"
    },
    {
      "id": "tx_1033",
      "type": "SALE",
      "date": "2026-08-12",
      "category": "Bottle Sale",
      "description": "Sold 1x Minti Jamun Smrinoff (From: Mihir)",
      "customer": "Customer",
      "amount": 1200,
      "cogs": 980,
      "stockImpact": -1,
      "holdingPartnerId": "partner_mihir",
      "holdingPartnerName": "Mihir",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_minti_jamun_smirnoff",
          "productName": "Minti Jamun Smrinoff",
          "quantity": 1,
          "unitPrice": 1200,
          "unitCost": 980,
          "location": "Mihir"
        }
      ],
      "recordedBy": "Mihir"
    },
    {
      "id": "tx_1034",
      "type": "SALE",
      "date": "2026-08-12",
      "category": "Bottle Sale",
      "description": "Sold 1x Minti Jamun Smrinoff (From: Mihir)",
      "customer": "Customer",
      "amount": 1300,
      "cogs": 980,
      "stockImpact": -1,
      "holdingPartnerId": "partner_vaishali",
      "holdingPartnerName": "Vaishali",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_minti_jamun_smirnoff",
          "productName": "Minti Jamun Smrinoff",
          "quantity": 1,
          "unitPrice": 1300,
          "unitCost": 980,
          "location": "Mihir"
        }
      ],
      "recordedBy": "Vaishali"
    },
    {
      "id": "tx_1035",
      "type": "SALE",
      "date": "2026-08-12",
      "category": "Bottle Sale",
      "description": "Sold 1x Minti Jamun Smrinoff (From: Mihir)",
      "customer": "Customer",
      "amount": 1200,
      "cogs": 980,
      "stockImpact": -1,
      "holdingPartnerId": "partner_mihir",
      "holdingPartnerName": "Mihir",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_minti_jamun_smirnoff",
          "productName": "Minti Jamun Smrinoff",
          "quantity": 1,
          "unitPrice": 1200,
          "unitCost": 980,
          "location": "Mihir"
        }
      ],
      "recordedBy": "Mihir"
    },
    {
      "id": "tx_1036",
      "type": "SALE",
      "date": "2026-08-13",
      "category": "Bottle Sale",
      "description": "Sold 1x Minti Jamun Smrinoff (From: Mihir)",
      "customer": "Customer",
      "amount": 1300,
      "cogs": 980,
      "stockImpact": -1,
      "holdingPartnerId": "partner_mihir",
      "holdingPartnerName": "Mihir",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_minti_jamun_smirnoff",
          "productName": "Minti Jamun Smrinoff",
          "quantity": 1,
          "unitPrice": 1300,
          "unitCost": 980,
          "location": "Mihir"
        }
      ],
      "recordedBy": "Mihir"
    },
    {
      "id": "tx_1037",
      "type": "SALE",
      "date": "2026-08-13",
      "category": "Bottle Sale",
      "description": "Sold 1x Jim Beam (From: Mihir)",
      "customer": "Customer",
      "amount": 2000,
      "cogs": 1670,
      "stockImpact": -1,
      "holdingPartnerId": "partner_mihir",
      "holdingPartnerName": "Mihir",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_jim_beam",
          "productName": "Jim Beam",
          "quantity": 1,
          "unitPrice": 2000,
          "unitCost": 1670,
          "location": "Mihir"
        }
      ],
      "recordedBy": "Mihir"
    },
    {
      "id": "tx_1038",
      "type": "SALE",
      "date": "2026-08-13",
      "category": "Bottle Sale",
      "description": "Sold 1x Jim Beam (From: Mihir)",
      "customer": "Customer",
      "amount": 2000,
      "cogs": 1670,
      "stockImpact": -1,
      "holdingPartnerId": "partner_mihir",
      "holdingPartnerName": "Mihir",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_jim_beam",
          "productName": "Jim Beam",
          "quantity": 1,
          "unitPrice": 2000,
          "unitCost": 1670,
          "location": "Mihir"
        }
      ],
      "recordedBy": "Mihir"
    },
    {
      "id": "tx_1006",
      "type": "PURCHASE",
      "date": "2026-08-14",
      "category": "Stock Purchase",
      "description": "Stock Purchase Batch 6 (Varun paid)",
      "amount": 5000,
      "holdingPartnerId": "partner_varun",
      "holdingPartnerName": "Varun",
      "stockImpact": 5,
      "paymentMethod": "UPI / Bank Transfer",
      "recordedBy": "Varun"
    },
    {
      "id": "tx_1011",
      "type": "EXPENSE",
      "date": "2026-08-14",
      "category": "Logistics & Courier Shipping",
      "description": "Goods Transport / Delivery (Varun paid)",
      "amount": 200,
      "holdingPartnerId": "partner_varun",
      "holdingPartnerName": "Varun",
      "paymentMethod": "UPI",
      "recordedBy": "Varun"
    },
    {
      "id": "tx_1039",
      "type": "SALE",
      "date": "2026-08-14",
      "category": "Bottle Sale",
      "description": "Sold 1x Minti Jamun Smrinoff (From: Varun)",
      "customer": "Customer",
      "amount": 1350,
      "cogs": 1050,
      "stockImpact": -1,
      "holdingPartnerId": "partner_varun",
      "holdingPartnerName": "Varun",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_minti_jamun_smirnoff",
          "productName": "Minti Jamun Smrinoff",
          "quantity": 1,
          "unitPrice": 1350,
          "unitCost": 1050,
          "location": "Varun"
        }
      ],
      "recordedBy": "Varun"
    },
    {
      "id": "tx_1040",
      "type": "SALE",
      "date": "2026-08-14",
      "category": "Bottle Sale",
      "description": "Sold 1x Minti Jamun Smrinoff (From: Varun)",
      "customer": "Customer",
      "amount": 1350,
      "cogs": 1050,
      "stockImpact": -1,
      "holdingPartnerId": "partner_varun",
      "holdingPartnerName": "Varun",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_minti_jamun_smirnoff",
          "productName": "Minti Jamun Smrinoff",
          "quantity": 1,
          "unitPrice": 1350,
          "unitCost": 1050,
          "location": "Varun"
        }
      ],
      "recordedBy": "Varun"
    },
    {
      "id": "tx_1041",
      "type": "SALE",
      "date": "2026-08-14",
      "category": "Bottle Sale",
      "description": "Sold 1x Royal Ramthambore (From: Varun)",
      "customer": "Customer",
      "amount": 470,
      "cogs": 0,
      "stockImpact": -1,
      "holdingPartnerId": "partner_varun",
      "holdingPartnerName": "Varun",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_ranthambore",
          "productName": "Royal Ramthambore",
          "quantity": 1,
          "unitPrice": 470,
          "unitCost": 0,
          "location": "Varun"
        }
      ],
      "recordedBy": "Varun"
    },
    {
      "id": "tx_1007",
      "type": "PURCHASE",
      "date": "2026-08-15",
      "category": "Stock Purchase",
      "description": "Stock Purchase Batch 7 (Mihir paid)",
      "amount": 6150,
      "holdingPartnerId": "partner_mihir",
      "holdingPartnerName": "Mihir",
      "stockImpact": 5,
      "paymentMethod": "UPI / Bank Transfer",
      "recordedBy": "Mihir"
    },
    {
      "id": "tx_1042",
      "type": "SALE",
      "date": "2026-08-15",
      "category": "Bottle Sale",
      "description": "Sold 1x Minti Jamun Smrinoff (From: Varun)",
      "customer": "Customer",
      "amount": 1450,
      "cogs": 1050,
      "stockImpact": -1,
      "holdingPartnerId": "partner_varun",
      "holdingPartnerName": "Varun",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_minti_jamun_smirnoff",
          "productName": "Minti Jamun Smrinoff",
          "quantity": 1,
          "unitPrice": 1450,
          "unitCost": 1050,
          "location": "Varun"
        }
      ],
      "recordedBy": "Varun"
    },
    {
      "id": "tx_1043",
      "type": "SALE",
      "date": "2026-08-15",
      "category": "Bottle Sale",
      "description": "Sold 1x Minti Jamun Smrinoff (From: Varun)",
      "customer": "Customer",
      "amount": 1450,
      "cogs": 1050,
      "stockImpact": -1,
      "holdingPartnerId": "partner_varun",
      "holdingPartnerName": "Varun",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_minti_jamun_smirnoff",
          "productName": "Minti Jamun Smrinoff",
          "quantity": 1,
          "unitPrice": 1450,
          "unitCost": 1050,
          "location": "Varun"
        }
      ],
      "recordedBy": "Varun"
    },
    {
      "id": "tx_1044",
      "type": "SALE",
      "date": "2026-08-15",
      "category": "Bottle Sale",
      "description": "Sold 1x Minti Jamun Smrinoff (From: Varun)",
      "customer": "Customer",
      "amount": 1450,
      "cogs": 1050,
      "stockImpact": -1,
      "holdingPartnerId": "partner_varun",
      "holdingPartnerName": "Varun",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_minti_jamun_smirnoff",
          "productName": "Minti Jamun Smrinoff",
          "quantity": 1,
          "unitPrice": 1450,
          "unitCost": 1050,
          "location": "Varun"
        }
      ],
      "recordedBy": "Varun"
    },
    {
      "id": "tx_1045",
      "type": "SALE",
      "date": "2026-08-15",
      "category": "Bottle Sale",
      "description": "Sold 1x Minti Jamun Smrinoff (From: Varun)",
      "customer": "Customer",
      "amount": 1450,
      "cogs": 1050,
      "stockImpact": -1,
      "holdingPartnerId": "partner_varun",
      "holdingPartnerName": "Varun",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_minti_jamun_smirnoff",
          "productName": "Minti Jamun Smrinoff",
          "quantity": 1,
          "unitPrice": 1450,
          "unitCost": 1050,
          "location": "Varun"
        }
      ],
      "recordedBy": "Varun"
    },
    {
      "id": "tx_1046",
      "type": "SALE",
      "date": "2026-08-16",
      "category": "Bottle Sale",
      "description": "Sold 1x Jim Bean (From: Mihir)",
      "customer": "Customer",
      "amount": 2200,
      "cogs": 1670,
      "stockImpact": -1,
      "holdingPartnerId": "partner_varun",
      "holdingPartnerName": "Varun",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_jim_beam",
          "productName": "Jim Bean",
          "quantity": 1,
          "unitPrice": 2200,
          "unitCost": 1670,
          "location": "Mihir"
        }
      ],
      "recordedBy": "Varun"
    },
    {
      "id": "tx_1047",
      "type": "SALE",
      "date": "2026-08-16",
      "category": "Bottle Sale",
      "description": "Sold 1x Royal Ramthambore (From: Mihir)",
      "customer": "Customer",
      "amount": 2000,
      "cogs": 1630,
      "stockImpact": -1,
      "holdingPartnerId": "partner_varun",
      "holdingPartnerName": "Varun",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_ranthambore",
          "productName": "Royal Ramthambore",
          "quantity": 1,
          "unitPrice": 2000,
          "unitCost": 1630,
          "location": "Mihir"
        }
      ],
      "recordedBy": "Varun"
    },
    {
      "id": "tx_1048",
      "type": "SALE",
      "date": "2026-08-16",
      "category": "Bottle Sale",
      "description": "Sold 1x Bombay Sapphire (From: Mihir)",
      "customer": "Customer",
      "amount": 2000,
      "cogs": 1690,
      "stockImpact": -1,
      "holdingPartnerId": "partner_mihir",
      "holdingPartnerName": "Mihir",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_bombay_sapphire",
          "productName": "Bombay Sapphire",
          "quantity": 1,
          "unitPrice": 2000,
          "unitCost": 1690,
          "location": "Mihir"
        }
      ],
      "recordedBy": "Mihir"
    },
    {
      "id": "tx_1053",
      "type": "TRANSFER",
      "date": "2026-08-16",
      "category": "Partner Settlement",
      "description": "Inter-Partner Transfer: Varun to Mihir",
      "amount": 1440,
      "fromPartnerId": "partner_varun",
      "fromPartnerName": "Varun",
      "toPartnerId": "partner_mihir",
      "toPartnerName": "Mihir",
      "paymentMethod": "UPI / Bank",
      "recordedBy": "Varun"
    },
    {
      "id": "tx_1054",
      "type": "TRANSFER",
      "date": "2026-08-16",
      "category": "Partner Settlement",
      "description": "Inter-Partner Transfer: Varun to Vaishali",
      "amount": 1511,
      "fromPartnerId": "partner_varun",
      "fromPartnerName": "Varun",
      "toPartnerId": "partner_vaishali",
      "toPartnerName": "Vaishali",
      "paymentMethod": "UPI / Bank",
      "recordedBy": "Varun"
    },
    {
      "id": "tx_1049",
      "type": "SALE",
      "date": "2026-08-17",
      "category": "Bottle Sale",
      "description": "Sold 1x Mango (From: Varun)",
      "customer": "Customer",
      "amount": 1500,
      "cogs": 980,
      "stockImpact": -1,
      "holdingPartnerId": "partner_varun",
      "holdingPartnerName": "Varun",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_mango",
          "productName": "Mango",
          "quantity": 1,
          "unitPrice": 1500,
          "unitCost": 980,
          "location": "Varun"
        }
      ],
      "recordedBy": "Varun"
    },
    {
      "id": "tx_1050",
      "type": "SALE",
      "date": "2026-08-17",
      "category": "Bottle Sale",
      "description": "Sold 1x Limon (From: Varun)",
      "customer": "Customer",
      "amount": 1300,
      "cogs": 980,
      "stockImpact": -1,
      "holdingPartnerId": "partner_vaishali",
      "holdingPartnerName": "Vaishali",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_lemon",
          "productName": "Limon",
          "quantity": 1,
          "unitPrice": 1300,
          "unitCost": 980,
          "location": "Varun"
        }
      ],
      "recordedBy": "Vaishali"
    },
    {
      "id": "tx_2001",
      "type": "PURCHASE",
      "date": "2026-08-19",
      "category": "Stock Purchase",
      "description": "Stock Purchase Lot 19-Aug: 7 bottles (5x Smirnoff Jamun, 2x Bacardi Mango)",
      "amount": 6910,
      "holdingPartnerId": "partner_vaishali",
      "holdingPartnerName": "Vaishali",
      "stockImpact": 7,
      "paymentMethod": "UPI / Bank Transfer",
      "recordedBy": "Vaishali"
    },
    {
      "id": "tx_2021",
      "type": "SALE",
      "date": "2026-08-19",
      "category": "Bottle Sale",
      "description": "Sold 1x Smirnoff Minty Jamun (From: Mihir)",
      "customer": "Customer",
      "amount": 1300,
      "cogs": 990,
      "stockImpact": -1,
      "holdingPartnerId": "partner_mihir",
      "holdingPartnerName": "Mihir",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_minti_jamun_smirnoff",
          "productName": "Smirnoff Minty Jamun",
          "quantity": 1,
          "unitPrice": 1300,
          "unitCost": 990,
          "location": "Mihir"
        }
      ],
      "recordedBy": "Mihir"
    },
    {
      "id": "tx_2022",
      "type": "SALE",
      "date": "2026-08-19",
      "category": "Bottle Sale",
      "description": "Sold 1x Smirnoff Minty Jamun (From: Mihir)",
      "customer": "Customer",
      "amount": 1300,
      "cogs": 990,
      "stockImpact": -1,
      "holdingPartnerId": "partner_mihir",
      "holdingPartnerName": "Mihir",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_minti_jamun_smirnoff",
          "productName": "Smirnoff Minty Jamun",
          "quantity": 1,
          "unitPrice": 1300,
          "unitCost": 990,
          "location": "Mihir"
        }
      ],
      "recordedBy": "Mihir"
    },
    {
      "id": "tx_2023",
      "type": "SALE",
      "date": "2026-08-19",
      "category": "Bottle Sale",
      "description": "Sold 1x Smirnoff Minty Jamun (From: Varun)",
      "customer": "Customer",
      "amount": 1300,
      "cogs": 990,
      "stockImpact": -1,
      "holdingPartnerId": "partner_vaishali",
      "holdingPartnerName": "Vaishali",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_minti_jamun_smirnoff",
          "productName": "Smirnoff Minty Jamun",
          "quantity": 1,
          "unitPrice": 1300,
          "unitCost": 990,
          "location": "Varun"
        }
      ],
      "recordedBy": "Vaishali"
    },
    {
      "id": "tx_2024",
      "type": "SALE",
      "date": "2026-08-19",
      "category": "Bottle Sale",
      "description": "Sold 1x Smirnoff Minty Jamun (From: Varun)",
      "customer": "Customer",
      "amount": 1300,
      "cogs": 990,
      "stockImpact": -1,
      "holdingPartnerId": "partner_vaishali",
      "holdingPartnerName": "Vaishali",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_minti_jamun_smirnoff",
          "productName": "Smirnoff Minty Jamun",
          "quantity": 1,
          "unitPrice": 1300,
          "unitCost": 990,
          "location": "Varun"
        }
      ],
      "recordedBy": "Vaishali"
    },
    {
      "id": "tx_2025",
      "type": "SALE",
      "date": "2026-08-19",
      "category": "Bottle Sale",
      "description": "Sold 1x Smirnoff Minty Jamun (From: Varun)",
      "customer": "Customer",
      "amount": 1300,
      "cogs": 990,
      "stockImpact": -1,
      "holdingPartnerId": "partner_varun",
      "holdingPartnerName": "Varun",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_minti_jamun_smirnoff",
          "productName": "Smirnoff Minty Jamun",
          "quantity": 1,
          "unitPrice": 1300,
          "unitCost": 990,
          "location": "Varun"
        }
      ],
      "recordedBy": "Varun"
    },
    {
      "id": "tx_2026",
      "type": "SALE",
      "date": "2026-08-19",
      "category": "Bottle Sale",
      "description": "Sold 1x Bacardi Mango Chilli (From: Varun)",
      "customer": "Customer",
      "amount": 1300,
      "cogs": 980,
      "stockImpact": -1,
      "holdingPartnerId": "partner_vaishali",
      "holdingPartnerName": "Vaishali",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_mango",
          "productName": "Bacardi Mango Chilli",
          "quantity": 1,
          "unitPrice": 1300,
          "unitCost": 980,
          "location": "Varun"
        }
      ],
      "recordedBy": "Vaishali"
    },
    {
      "id": "tx_2027",
      "type": "SALE",
      "date": "2026-08-19",
      "category": "Bottle Sale",
      "description": "Sold 1x Bacardi Mango Chilli (From: Varun)",
      "customer": "Customer",
      "amount": 1300,
      "cogs": 980,
      "stockImpact": -1,
      "holdingPartnerId": "partner_varun",
      "holdingPartnerName": "Varun",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_mango",
          "productName": "Bacardi Mango Chilli",
          "quantity": 1,
          "unitPrice": 1300,
          "unitCost": 980,
          "location": "Varun"
        }
      ],
      "recordedBy": "Varun"
    },
    {
      "id": "tx_2002",
      "type": "PURCHASE",
      "date": "2026-08-21",
      "category": "Stock Purchase",
      "description": "Stock Purchase Lot 21-Aug: 12 bottles (6x Jameson, 6x Red Label)",
      "amount": 21600,
      "payers": [
        {
          "partnerId": "partner_varun",
          "partnerName": "Varun",
          "amount": 9600
        },
        {
          "partnerId": "partner_vaishali",
          "partnerName": "Vaishali",
          "amount": 12000
        }
      ],
      "stockImpact": 12,
      "paymentMethod": "Split UPI / Bank Transfer",
      "recordedBy": "Varun"
    },
    {
      "id": "tx_2011",
      "type": "EXPENSE",
      "date": "2026-08-21",
      "category": "Logistics & Courier Shipping",
      "description": "Goods Transport / Delivery Lot 21-Aug (Varun paid)",
      "amount": 500,
      "holdingPartnerId": "partner_varun",
      "holdingPartnerName": "Varun",
      "paymentMethod": "UPI / Cash",
      "recordedBy": "Varun"
    },
    {
      "id": "tx_2028",
      "type": "SALE",
      "date": "2026-08-21",
      "category": "Bottle Sale",
      "description": "Sold 1x Jameson (From: Mihir)",
      "customer": "Customer",
      "amount": 2600,
      "cogs": 2100,
      "stockImpact": -1,
      "holdingPartnerId": "partner_varun",
      "holdingPartnerName": "Varun",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_jameson",
          "productName": "Jameson",
          "quantity": 1,
          "unitPrice": 2600,
          "unitCost": 2100,
          "location": "Mihir"
        }
      ],
      "recordedBy": "Varun"
    },
    {
      "id": "tx_2029",
      "type": "SALE",
      "date": "2026-08-21",
      "category": "Bottle Sale",
      "description": "Sold 1x Jameson (From: Mihir)",
      "customer": "Customer",
      "amount": 2600,
      "cogs": 2100,
      "stockImpact": -1,
      "holdingPartnerId": "partner_mihir",
      "holdingPartnerName": "Mihir",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_jameson",
          "productName": "Jameson",
          "quantity": 1,
          "unitPrice": 2600,
          "unitCost": 2100,
          "location": "Mihir"
        }
      ],
      "recordedBy": "Mihir"
    },
    {
      "id": "tx_2030",
      "type": "SALE",
      "date": "2026-08-21",
      "category": "Bottle Sale",
      "description": "Sold 1x Jameson (From: Mihir)",
      "customer": "Customer",
      "amount": 2600,
      "cogs": 2100,
      "stockImpact": -1,
      "holdingPartnerId": "partner_mihir",
      "holdingPartnerName": "Mihir",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_jameson",
          "productName": "Jameson",
          "quantity": 1,
          "unitPrice": 2600,
          "unitCost": 2100,
          "location": "Mihir"
        }
      ],
      "recordedBy": "Mihir"
    },
    {
      "id": "tx_2031",
      "type": "SALE",
      "date": "2026-08-21",
      "category": "Bottle Sale",
      "description": "Sold 1x Jameson (From: Varun)",
      "customer": "Customer",
      "amount": 2600,
      "cogs": 2100,
      "stockImpact": -1,
      "holdingPartnerId": "partner_mihir",
      "holdingPartnerName": "Mihir",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_jameson",
          "productName": "Jameson",
          "quantity": 1,
          "unitPrice": 2600,
          "unitCost": 2100,
          "location": "Varun"
        }
      ],
      "recordedBy": "Mihir"
    },
    {
      "id": "tx_2032",
      "type": "SALE",
      "date": "2026-08-21",
      "category": "Bottle Sale",
      "description": "Sold 1x Jameson (From: Varun)",
      "customer": "Customer",
      "amount": 2800,
      "cogs": 2100,
      "stockImpact": -1,
      "holdingPartnerId": "partner_vaishali",
      "holdingPartnerName": "Vaishali",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_jameson",
          "productName": "Jameson",
          "quantity": 1,
          "unitPrice": 2800,
          "unitCost": 2100,
          "location": "Varun"
        }
      ],
      "recordedBy": "Vaishali"
    },
    {
      "id": "tx_2033",
      "type": "SALE",
      "date": "2026-08-21",
      "category": "Bottle Sale",
      "description": "Sold 1x Jameson (From: Mihir)",
      "customer": "Customer",
      "amount": 2600,
      "cogs": 2100,
      "stockImpact": -1,
      "holdingPartnerId": "partner_mihir",
      "holdingPartnerName": "Mihir",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_jameson",
          "productName": "Jameson",
          "quantity": 1,
          "unitPrice": 2600,
          "unitCost": 2100,
          "location": "Mihir"
        }
      ],
      "recordedBy": "Mihir"
    },
    {
      "id": "tx_2034",
      "type": "SALE",
      "date": "2026-08-21",
      "category": "Bottle Sale",
      "description": "Sold 1x Red Label (From: Mihir)",
      "customer": "Customer",
      "amount": 2000,
      "cogs": 1500,
      "stockImpact": -1,
      "holdingPartnerId": "partner_vaishali",
      "holdingPartnerName": "Vaishali",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_red_label",
          "productName": "Red Label",
          "quantity": 1,
          "unitPrice": 2000,
          "unitCost": 1500,
          "location": "Mihir"
        }
      ],
      "recordedBy": "Vaishali"
    },
    {
      "id": "tx_2035",
      "type": "SALE",
      "date": "2026-08-21",
      "category": "Bottle Sale",
      "description": "Sold 1x Red Label (From: Mihir)",
      "customer": "Customer",
      "amount": 2000,
      "cogs": 1500,
      "stockImpact": -1,
      "holdingPartnerId": "partner_vaishali",
      "holdingPartnerName": "Vaishali",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_red_label",
          "productName": "Red Label",
          "quantity": 1,
          "unitPrice": 2000,
          "unitCost": 1500,
          "location": "Mihir"
        }
      ],
      "recordedBy": "Vaishali"
    },
    {
      "id": "tx_2036",
      "type": "SALE",
      "date": "2026-08-21",
      "category": "Bottle Sale",
      "description": "Sold 1x Red Label (From: Mihir)",
      "customer": "Customer",
      "amount": 2100,
      "cogs": 1500,
      "stockImpact": -1,
      "holdingPartnerId": "partner_mihir",
      "holdingPartnerName": "Mihir",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_red_label",
          "productName": "Red Label",
          "quantity": 1,
          "unitPrice": 2100,
          "unitCost": 1500,
          "location": "Mihir"
        }
      ],
      "recordedBy": "Mihir"
    },
    {
      "id": "tx_2037",
      "type": "SALE",
      "date": "2026-08-21",
      "category": "Bottle Sale",
      "description": "Sold 1x Red Label (From: Mihir)",
      "customer": "Customer",
      "amount": 2100,
      "cogs": 1500,
      "stockImpact": -1,
      "holdingPartnerId": "partner_mihir",
      "holdingPartnerName": "Mihir",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_red_label",
          "productName": "Red Label",
          "quantity": 1,
          "unitPrice": 2100,
          "unitCost": 1500,
          "location": "Mihir"
        }
      ],
      "recordedBy": "Mihir"
    },
    {
      "id": "tx_2038",
      "type": "SALE",
      "date": "2026-08-21",
      "category": "Bottle Sale",
      "description": "Sold 1x Red Label (From: Varun)",
      "customer": "Customer",
      "amount": 2100,
      "cogs": 1500,
      "stockImpact": -1,
      "holdingPartnerId": "partner_mihir",
      "holdingPartnerName": "Mihir",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_red_label",
          "productName": "Red Label",
          "quantity": 1,
          "unitPrice": 2100,
          "unitCost": 1500,
          "location": "Varun"
        }
      ],
      "recordedBy": "Mihir"
    },
    {
      "id": "tx_2039",
      "type": "SALE",
      "date": "2026-08-21",
      "category": "Bottle Sale",
      "description": "Sold 1x Red Label (From: Mihir)",
      "customer": "Customer",
      "amount": 2000,
      "cogs": 1500,
      "stockImpact": -1,
      "holdingPartnerId": "partner_varun",
      "holdingPartnerName": "Varun",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_red_label",
          "productName": "Red Label",
          "quantity": 1,
          "unitPrice": 2000,
          "unitCost": 1500,
          "location": "Mihir"
        }
      ],
      "recordedBy": "Varun"
    },
    {
      "id": "tx_2003",
      "type": "PURCHASE",
      "date": "2026-08-22",
      "category": "Stock Purchase",
      "description": "Stock Purchase Lot 22-Aug: 12 bottles (6x Smirnoff, 2x Mango Mirchi, 2x Bacardi Mango, 2x Limon)",
      "amount": 11720,
      "holdingPartnerId": "partner_varun",
      "holdingPartnerName": "Varun",
      "stockImpact": 12,
      "paymentMethod": "UPI / Bank Transfer",
      "recordedBy": "Varun"
    },
    {
      "id": "tx_2012",
      "type": "EXPENSE",
      "date": "2026-08-22",
      "category": "Logistics & Courier Shipping",
      "description": "Goods Transport / Delivery Lot 22-Aug (Varun paid)",
      "amount": 50,
      "holdingPartnerId": "partner_varun",
      "holdingPartnerName": "Varun",
      "paymentMethod": "UPI / Cash",
      "recordedBy": "Varun"
    },
    {
      "id": "tx_2040",
      "type": "SALE",
      "date": "2026-08-22",
      "category": "Bottle Sale",
      "description": "Sold 1x Smirnoff Minty Jamun (From: Mihir)",
      "customer": "Customer",
      "amount": 1300,
      "cogs": 980,
      "stockImpact": -1,
      "holdingPartnerId": "partner_mihir",
      "holdingPartnerName": "Mihir",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_minti_jamun_smirnoff",
          "productName": "Smirnoff Minty Jamun",
          "quantity": 1,
          "unitPrice": 1300,
          "unitCost": 980,
          "location": "Mihir"
        }
      ],
      "recordedBy": "Mihir"
    },
    {
      "id": "tx_2041",
      "type": "SALE",
      "date": "2026-08-22",
      "category": "Bottle Sale",
      "description": "Sold 1x Smirnoff Minty Jamun (From: Varun)",
      "customer": "Customer",
      "amount": 1300,
      "cogs": 980,
      "stockImpact": -1,
      "holdingPartnerId": "partner_mihir",
      "holdingPartnerName": "Mihir",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_minti_jamun_smirnoff",
          "productName": "Smirnoff Minty Jamun",
          "quantity": 1,
          "unitPrice": 1300,
          "unitCost": 980,
          "location": "Varun"
        }
      ],
      "recordedBy": "Mihir"
    },
    {
      "id": "tx_2042",
      "type": "SALE",
      "date": "2026-08-22",
      "category": "Bottle Sale",
      "description": "Sold 1x Smirnoff Minty Jamun (From: Mihir)",
      "customer": "Customer",
      "amount": 1050,
      "cogs": 980,
      "stockImpact": -1,
      "holdingPartnerId": "partner_vaishali",
      "holdingPartnerName": "Vaishali",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_minti_jamun_smirnoff",
          "productName": "Smirnoff Minty Jamun",
          "quantity": 1,
          "unitPrice": 1050,
          "unitCost": 980,
          "location": "Mihir"
        }
      ],
      "recordedBy": "Vaishali"
    },
    {
      "id": "tx_2043",
      "type": "SALE",
      "date": "2026-08-22",
      "category": "Bottle Sale",
      "description": "Sold 1x Smirnoff Minty Jamun (From: Mihir)",
      "customer": "Customer",
      "amount": 1050,
      "cogs": 980,
      "stockImpact": -1,
      "holdingPartnerId": "partner_vaishali",
      "holdingPartnerName": "Vaishali",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_minti_jamun_smirnoff",
          "productName": "Smirnoff Minty Jamun",
          "quantity": 1,
          "unitPrice": 1050,
          "unitCost": 980,
          "location": "Mihir"
        }
      ],
      "recordedBy": "Vaishali"
    },
    {
      "id": "tx_2045",
      "type": "SALE",
      "date": "2026-08-22",
      "category": "Bottle Sale",
      "description": "Sold 1x Smirnoff Minty Jamun (From: Varun)",
      "customer": "Customer",
      "amount": 1350,
      "cogs": 980,
      "stockImpact": -1,
      "holdingPartnerId": "partner_varun",
      "holdingPartnerName": "Varun",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_minti_jamun_smirnoff",
          "productName": "Smirnoff Minty Jamun",
          "quantity": 1,
          "unitPrice": 1350,
          "unitCost": 980,
          "location": "Varun"
        }
      ],
      "recordedBy": "Varun"
    },
    {
      "id": "tx_2046",
      "type": "SALE",
      "date": "2026-08-22",
      "category": "Bottle Sale",
      "description": "Sold 1x Mango Mirchi Smirnoff (From: Mihir)",
      "customer": "Customer",
      "amount": 1300,
      "cogs": 980,
      "stockImpact": -1,
      "holdingPartnerId": "partner_mihir",
      "holdingPartnerName": "Mihir",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_mango_mirchi",
          "productName": "Mango Mirchi Smirnoff",
          "quantity": 1,
          "unitPrice": 1300,
          "unitCost": 980,
          "location": "Mihir"
        }
      ],
      "recordedBy": "Mihir"
    },
    {
      "id": "tx_2047",
      "type": "SALE",
      "date": "2026-08-22",
      "category": "Bottle Sale",
      "description": "Sold 1x Mango Mirchi Smirnoff (From: Mihir)",
      "customer": "Customer",
      "amount": 1300,
      "cogs": 980,
      "stockImpact": -1,
      "holdingPartnerId": "partner_vaishali",
      "holdingPartnerName": "Vaishali",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_mango_mirchi",
          "productName": "Mango Mirchi Smirnoff",
          "quantity": 1,
          "unitPrice": 1300,
          "unitCost": 980,
          "location": "Mihir"
        }
      ],
      "recordedBy": "Vaishali"
    },
    {
      "id": "tx_2048",
      "type": "SALE",
      "date": "2026-08-22",
      "category": "Bottle Sale",
      "description": "Sold 1x Bacardi Mango Chilli (From: Varun)",
      "customer": "Customer",
      "amount": 1350,
      "cogs": 970,
      "stockImpact": -1,
      "holdingPartnerId": "partner_mihir",
      "holdingPartnerName": "Mihir",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_mango",
          "productName": "Bacardi Mango Chilli",
          "quantity": 1,
          "unitPrice": 1350,
          "unitCost": 970,
          "location": "Varun"
        }
      ],
      "recordedBy": "Mihir"
    },
    {
      "id": "tx_2049",
      "type": "SALE",
      "date": "2026-08-22",
      "category": "Bottle Sale",
      "description": "Sold 1x Bacardi Mango Chilli (From: Mihir)",
      "customer": "Customer",
      "amount": 1350,
      "cogs": 970,
      "stockImpact": -1,
      "holdingPartnerId": "partner_mihir",
      "holdingPartnerName": "Mihir",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_mango",
          "productName": "Bacardi Mango Chilli",
          "quantity": 1,
          "unitPrice": 1350,
          "unitCost": 970,
          "location": "Mihir"
        }
      ],
      "recordedBy": "Mihir"
    },
    {
      "id": "tx_2050",
      "type": "SALE",
      "date": "2026-08-22",
      "category": "Bottle Sale",
      "description": "Sold 1x Bacardi Limon (From: Varun)",
      "customer": "Customer",
      "amount": 1300,
      "cogs": 970,
      "stockImpact": -1,
      "holdingPartnerId": "partner_mihir",
      "holdingPartnerName": "Mihir",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_lemon",
          "productName": "Bacardi Limon",
          "quantity": 1,
          "unitPrice": 1300,
          "unitCost": 970,
          "location": "Varun"
        }
      ],
      "recordedBy": "Mihir"
    },
    {
      "id": "tx_2051",
      "type": "SALE",
      "date": "2026-08-22",
      "category": "Bottle Sale",
      "description": "Sold 1x Bacardi Limon (From: Varun)",
      "customer": "Customer",
      "amount": 1350,
      "cogs": 970,
      "stockImpact": -1,
      "holdingPartnerId": "partner_varun",
      "holdingPartnerName": "Varun",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_lemon",
          "productName": "Bacardi Limon",
          "quantity": 1,
          "unitPrice": 1350,
          "unitCost": 970,
          "location": "Varun"
        }
      ],
      "recordedBy": "Varun"
    },
    {
      "id": "tx_2004",
      "type": "PURCHASE",
      "date": "2026-08-24",
      "category": "Stock Purchase",
      "description": "Stock Purchase Lot 24-Aug: 12 bottles (10x Smirnoff Jamun, 2x Mango Mirchi)",
      "amount": 11710,
      "holdingPartnerId": "partner_mihir",
      "holdingPartnerName": "Mihir",
      "stockImpact": 12,
      "paymentMethod": "UPI / Bank Transfer",
      "recordedBy": "Mihir"
    },
    {
      "id": "tx_2013",
      "type": "EXPENSE",
      "date": "2026-08-24",
      "category": "Logistics & Courier Shipping",
      "description": "Goods Transport / Delivery Lot 24-Aug (Mihir paid)",
      "amount": 50,
      "holdingPartnerId": "partner_mihir",
      "holdingPartnerName": "Mihir",
      "paymentMethod": "UPI / Cash",
      "recordedBy": "Mihir"
    },
    {
      "id": "tx_2052",
      "type": "SALE",
      "date": "2026-08-24",
      "category": "Bottle Sale",
      "description": "Sold 1x Smirnoff Minty Jamun (From: Mihir)",
      "customer": "Customer",
      "amount": 1200,
      "cogs": 980,
      "stockImpact": -1,
      "holdingPartnerId": "partner_mihir",
      "holdingPartnerName": "Mihir",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_minti_jamun_smirnoff",
          "productName": "Smirnoff Minty Jamun",
          "quantity": 1,
          "unitPrice": 1200,
          "unitCost": 980,
          "location": "Mihir"
        }
      ],
      "recordedBy": "Mihir"
    },
    {
      "id": "tx_2053",
      "type": "SALE",
      "date": "2026-08-24",
      "category": "Bottle Sale",
      "description": "Sold 1x Smirnoff Minty Jamun (From: Mihir)",
      "customer": "Customer",
      "amount": 1200,
      "cogs": 980,
      "stockImpact": -1,
      "holdingPartnerId": "partner_mihir",
      "holdingPartnerName": "Mihir",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_minti_jamun_smirnoff",
          "productName": "Smirnoff Minty Jamun",
          "quantity": 1,
          "unitPrice": 1200,
          "unitCost": 980,
          "location": "Mihir"
        }
      ],
      "recordedBy": "Mihir"
    },
    {
      "id": "tx_2054",
      "type": "SALE",
      "date": "2026-08-24",
      "category": "Bottle Sale",
      "description": "Sold 1x Smirnoff Minty Jamun (From: Varun)",
      "customer": "Customer",
      "amount": 1300,
      "cogs": 980,
      "stockImpact": -1,
      "holdingPartnerId": "partner_varun",
      "holdingPartnerName": "Varun",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_minti_jamun_smirnoff",
          "productName": "Smirnoff Minty Jamun",
          "quantity": 1,
          "unitPrice": 1300,
          "unitCost": 980,
          "location": "Varun"
        }
      ],
      "recordedBy": "Varun"
    },
    {
      "id": "tx_2055",
      "type": "SALE",
      "date": "2026-08-24",
      "category": "Bottle Sale",
      "description": "Sold 1x Smirnoff Minty Jamun (From: Varun)",
      "customer": "Customer",
      "amount": 1350,
      "cogs": 980,
      "stockImpact": -1,
      "holdingPartnerId": "partner_varun",
      "holdingPartnerName": "Varun",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_minti_jamun_smirnoff",
          "productName": "Smirnoff Minty Jamun",
          "quantity": 1,
          "unitPrice": 1350,
          "unitCost": 980,
          "location": "Varun"
        }
      ],
      "recordedBy": "Varun"
    },
    {
      "id": "tx_2056",
      "type": "SALE",
      "date": "2026-08-24",
      "category": "Bottle Sale",
      "description": "Sold 1x Smirnoff Minty Jamun (From: Ishan)",
      "customer": "Customer",
      "amount": 1300,
      "cogs": 980,
      "stockImpact": -1,
      "holdingPartnerId": "partner_mihir",
      "holdingPartnerName": "Mihir",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_minti_jamun_smirnoff",
          "productName": "Smirnoff Minty Jamun",
          "quantity": 1,
          "unitPrice": 1300,
          "unitCost": 980,
          "location": "Ishan"
        }
      ],
      "recordedBy": "Mihir"
    },
    {
      "id": "tx_2057",
      "type": "SALE",
      "date": "2026-08-24",
      "category": "Bottle Sale",
      "description": "Sold 1x Smirnoff Minty Jamun (From: Ishan)",
      "customer": "Customer",
      "amount": 1300,
      "cogs": 980,
      "stockImpact": -1,
      "holdingPartnerId": "partner_mihir",
      "holdingPartnerName": "Mihir",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_minti_jamun_smirnoff",
          "productName": "Smirnoff Minty Jamun",
          "quantity": 1,
          "unitPrice": 1300,
          "unitCost": 980,
          "location": "Ishan"
        }
      ],
      "recordedBy": "Mihir"
    },
    {
      "id": "tx_2059",
      "type": "SALE",
      "date": "2026-08-24",
      "category": "Bottle Sale",
      "description": "Sold 1x Smirnoff Minty Jamun (From: Mihir)",
      "customer": "Customer",
      "amount": 1300,
      "cogs": 980,
      "stockImpact": -1,
      "holdingPartnerId": "partner_mihir",
      "holdingPartnerName": "Mihir",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_minti_jamun_smirnoff",
          "productName": "Smirnoff Minty Jamun",
          "quantity": 1,
          "unitPrice": 1300,
          "unitCost": 980,
          "location": "Mihir"
        }
      ],
      "recordedBy": "Mihir"
    },
    {
      "id": "tx_2060",
      "type": "SALE",
      "date": "2026-08-24",
      "category": "Bottle Sale",
      "description": "Sold 1x Smirnoff Minty Jamun (From: Mihir)",
      "customer": "Customer",
      "amount": 1250,
      "cogs": 980,
      "stockImpact": -1,
      "holdingPartnerId": "partner_mihir",
      "holdingPartnerName": "Mihir",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_minti_jamun_smirnoff",
          "productName": "Smirnoff Minty Jamun",
          "quantity": 1,
          "unitPrice": 1250,
          "unitCost": 980,
          "location": "Mihir"
        }
      ],
      "recordedBy": "Mihir"
    },
    {
      "id": "tx_2062",
      "type": "SALE",
      "date": "2026-08-24",
      "category": "Bottle Sale",
      "description": "Sold 1x Mango Mirchi Smirnoff (From: Mihir)",
      "customer": "Customer",
      "amount": 1200,
      "cogs": 980,
      "stockImpact": -1,
      "holdingPartnerId": "partner_mihir",
      "holdingPartnerName": "Mihir",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_mango_mirchi",
          "productName": "Mango Mirchi Smirnoff",
          "quantity": 1,
          "unitPrice": 1200,
          "unitCost": 980,
          "location": "Mihir"
        }
      ],
      "recordedBy": "Mihir"
    },
    {
      "id": "tx_2099",
      "type": "SALE",
      "date": "2026-08-24",
      "category": "Bottle Sale",
      "description": "Sold 1x Mango Mirchi Smirnoff (From: Mihir)",
      "customer": "Customer",
      "amount": 1200,
      "cogs": 980,
      "stockImpact": -1,
      "holdingPartnerId": "partner_mihir",
      "holdingPartnerName": "Mihir",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_mango_mirchi",
          "productName": "Mango Mirchi Smirnoff",
          "quantity": 1,
          "unitPrice": 1200,
          "unitCost": 980,
          "location": "Mihir"
        }
      ],
      "recordedBy": "Mihir"
    },
    {
      "id": "tx_2005",
      "type": "PURCHASE",
      "date": "2026-08-29",
      "category": "Stock Purchase",
      "description": "Stock Purchase Lot 29-Aug-A: 8 bottles (Jameson Irish Whiskey)",
      "amount": 7810,
      "holdingPartnerId": "partner_mihir",
      "holdingPartnerName": "Mihir",
      "stockImpact": 8,
      "paymentMethod": "UPI / Bank Transfer",
      "recordedBy": "Mihir"
    },
    {
      "id": "tx_2006",
      "type": "PURCHASE",
      "date": "2026-08-29",
      "category": "Stock Purchase",
      "description": "Stock Purchase Lot 29-Aug-B: 23 bottles (Ballentines, Red Label, Smirnoff, Bacardi)",
      "amount": 39300,
      "payers": [
        {
          "partnerId": "partner_mihir",
          "partnerName": "Mihir",
          "amount": 17400
        },
        {
          "partnerId": "partner_varun",
          "partnerName": "Varun",
          "amount": 21900
        }
      ],
      "stockImpact": 23,
      "paymentMethod": "Split UPI / Bank Transfer",
      "recordedBy": "Mihir"
    },
    {
      "id": "tx_2014",
      "type": "EXPENSE",
      "date": "2026-08-29",
      "category": "Logistics & Courier Shipping",
      "description": "Goods Transport / Delivery Lot 29-Aug (Mihir paid)",
      "amount": 700,
      "holdingPartnerId": "partner_mihir",
      "holdingPartnerName": "Mihir",
      "paymentMethod": "UPI / Cash",
      "recordedBy": "Mihir"
    },
    {
      "id": "tx_2070",
      "type": "SALE",
      "date": "2026-08-29",
      "category": "Bottle Sale",
      "description": "Sold 1x Ballentines (From: Varun)",
      "customer": "Customer",
      "amount": 2000,
      "cogs": 1500,
      "stockImpact": -1,
      "holdingPartnerId": "partner_varun",
      "holdingPartnerName": "Varun",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_ballentines",
          "productName": "Ballentines",
          "quantity": 1,
          "unitPrice": 2000,
          "unitCost": 1500,
          "location": "Varun"
        }
      ],
      "recordedBy": "Varun"
    },
    {
      "id": "tx_2007",
      "type": "PURCHASE",
      "date": "2026-08-30",
      "category": "Stock Purchase",
      "description": "Stock Purchase Lot 30-Aug: 4 bottles (Bombay Sapphire, Bacardi Mango, Limon)",
      "amount": 5000,
      "holdingPartnerId": "partner_mihir",
      "holdingPartnerName": "Mihir",
      "stockImpact": 4,
      "paymentMethod": "UPI / Bank Transfer",
      "recordedBy": "Mihir"
    },
    {
      "id": "tx_2015",
      "type": "EXPENSE",
      "date": "2026-08-30",
      "category": "Logistics & Courier Shipping",
      "description": "Goods Transport / Delivery Lot 30-Aug (Mihir paid)",
      "amount": 150,
      "holdingPartnerId": "partner_mihir",
      "holdingPartnerName": "Mihir",
      "paymentMethod": "UPI / Cash",
      "recordedBy": "Mihir"
    },
    {
      "id": "tx_2044",
      "type": "SALE",
      "date": "2026-08-30",
      "category": "Bottle Sale",
      "description": "Sold 1x Smirnoff Minty Jamun (From: Mihir)",
      "customer": "Customer",
      "amount": 1300,
      "cogs": 980,
      "stockImpact": -1,
      "holdingPartnerId": "partner_mihir",
      "holdingPartnerName": "Mihir",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_minti_jamun_smirnoff",
          "productName": "Smirnoff Minty Jamun",
          "quantity": 1,
          "unitPrice": 1300,
          "unitCost": 980,
          "location": "Mihir"
        }
      ],
      "recordedBy": "Mihir"
    },
    {
      "id": "tx_2058",
      "type": "SALE",
      "date": "2026-08-30",
      "category": "Bottle Sale",
      "description": "Sold 1x Smirnoff Minty Jamun (From: Ishan)",
      "customer": "Customer",
      "amount": 1350,
      "cogs": 980,
      "stockImpact": -1,
      "holdingPartnerId": "partner_varun",
      "holdingPartnerName": "Varun",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_minti_jamun_smirnoff",
          "productName": "Smirnoff Minty Jamun",
          "quantity": 1,
          "unitPrice": 1350,
          "unitCost": 980,
          "location": "Ishan"
        }
      ],
      "recordedBy": "Varun"
    },
    {
      "id": "tx_2075",
      "type": "SALE",
      "date": "2026-08-30",
      "category": "Bottle Sale",
      "description": "Sold 1x Smirnoff Minty Jamun (From: Mihir)",
      "customer": "Customer",
      "amount": 1300,
      "cogs": 980,
      "stockImpact": -1,
      "holdingPartnerId": "partner_mihir",
      "holdingPartnerName": "Mihir",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_minti_jamun_smirnoff",
          "productName": "Smirnoff Minty Jamun",
          "quantity": 1,
          "unitPrice": 1300,
          "unitCost": 980,
          "location": "Mihir"
        }
      ],
      "recordedBy": "Mihir"
    },
    {
      "id": "tx_2077",
      "type": "SALE",
      "date": "2026-08-30",
      "category": "Bottle Sale",
      "description": "Sold 1x Bacardi Limon (From: Mihir)",
      "customer": "Customer",
      "amount": 1200,
      "cogs": 970,
      "stockImpact": -1,
      "holdingPartnerId": "partner_varun",
      "holdingPartnerName": "Varun",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_lemon",
          "productName": "Bacardi Limon",
          "quantity": 1,
          "unitPrice": 1200,
          "unitCost": 970,
          "location": "Mihir"
        }
      ],
      "recordedBy": "Varun"
    },
    {
      "id": "tx_2078",
      "type": "SALE",
      "date": "2026-08-30",
      "category": "Bottle Sale",
      "description": "Sold 1x Bacardi Limon (From: Mihir)",
      "customer": "Customer",
      "amount": 1200,
      "cogs": 970,
      "stockImpact": -1,
      "holdingPartnerId": "partner_varun",
      "holdingPartnerName": "Varun",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_lemon",
          "productName": "Bacardi Limon",
          "quantity": 1,
          "unitPrice": 1200,
          "unitCost": 970,
          "location": "Mihir"
        }
      ],
      "recordedBy": "Varun"
    },
    {
      "id": "tx_2081",
      "type": "SALE",
      "date": "2026-08-30",
      "category": "Bottle Sale",
      "description": "Sold 1x Bacardi Mango Chilli (From: Mihir)",
      "customer": "Customer",
      "amount": 1200,
      "cogs": 980,
      "stockImpact": -1,
      "holdingPartnerId": "partner_varun",
      "holdingPartnerName": "Varun",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_mango",
          "productName": "Bacardi Mango Chilli",
          "quantity": 1,
          "unitPrice": 1200,
          "unitCost": 980,
          "location": "Mihir"
        }
      ],
      "recordedBy": "Varun"
    },
    {
      "id": "tx_2082",
      "type": "SALE",
      "date": "2026-08-30",
      "category": "Bottle Sale",
      "description": "Sold 1x Bacardi Mango Chilli (From: Mihir)",
      "customer": "Customer",
      "amount": 1200,
      "cogs": 980,
      "stockImpact": -1,
      "holdingPartnerId": "partner_varun",
      "holdingPartnerName": "Varun",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_mango",
          "productName": "Bacardi Mango Chilli",
          "quantity": 1,
          "unitPrice": 1200,
          "unitCost": 980,
          "location": "Mihir"
        }
      ],
      "recordedBy": "Varun"
    },
    {
      "id": "tx_2083",
      "type": "SALE",
      "date": "2026-08-30",
      "category": "Bottle Sale",
      "description": "Sold 1x Bombay Sapphire (From: Mihir)",
      "customer": "Customer",
      "amount": 2200,
      "cogs": 2100,
      "stockImpact": -1,
      "holdingPartnerId": "partner_varun",
      "holdingPartnerName": "Varun",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_bombay_sapphire",
          "productName": "Bombay Sapphire",
          "quantity": 1,
          "unitPrice": 2200,
          "unitCost": 2100,
          "location": "Mihir"
        }
      ],
      "recordedBy": "Varun"
    },
    {
      "id": "tx_2084",
      "type": "SALE",
      "date": "2026-08-30",
      "category": "Bottle Sale",
      "description": "Sold 1x Bacardi Limon (From: Mihir)",
      "customer": "Customer",
      "amount": 1200,
      "cogs": 970,
      "stockImpact": -1,
      "holdingPartnerId": "partner_varun",
      "holdingPartnerName": "Varun",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_lemon",
          "productName": "Bacardi Limon",
          "quantity": 1,
          "unitPrice": 1200,
          "unitCost": 970,
          "location": "Mihir"
        }
      ],
      "recordedBy": "Varun"
    },
    {
      "id": "tx_2061",
      "type": "SALE",
      "date": "2026-09-01",
      "category": "Bottle Sale",
      "description": "Sold 1x Mango Mirchi Smirnoff (From: Ishan)",
      "customer": "Customer",
      "amount": 1350,
      "cogs": 980,
      "stockImpact": -1,
      "holdingPartnerId": "partner_varun",
      "holdingPartnerName": "Varun",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_mango_mirchi",
          "productName": "Mango Mirchi Smirnoff",
          "quantity": 1,
          "unitPrice": 1350,
          "unitCost": 980,
          "location": "Ishan"
        }
      ],
      "recordedBy": "Varun"
    },
    {
      "id": "tx_2073",
      "type": "SALE",
      "date": "2026-09-01",
      "category": "Bottle Sale",
      "description": "Sold 1x Smirnoff Minty Jamun (From: Varun)",
      "customer": "Customer",
      "amount": 1350,
      "cogs": 980,
      "stockImpact": -1,
      "holdingPartnerId": "partner_varun",
      "holdingPartnerName": "Varun",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_minti_jamun_smirnoff",
          "productName": "Smirnoff Minty Jamun",
          "quantity": 1,
          "unitPrice": 1350,
          "unitCost": 980,
          "location": "Varun"
        }
      ],
      "recordedBy": "Varun"
    },
    {
      "id": "tx_2079",
      "type": "SALE",
      "date": "2026-09-01",
      "category": "Bottle Sale",
      "description": "Sold 1x Bacardi Mango Chilli (From: Varun)",
      "customer": "Customer",
      "amount": 1300,
      "cogs": 970,
      "stockImpact": -1,
      "holdingPartnerId": "partner_varun",
      "holdingPartnerName": "Varun",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_mango",
          "productName": "Bacardi Mango Chilli",
          "quantity": 1,
          "unitPrice": 1300,
          "unitCost": 970,
          "location": "Varun"
        }
      ],
      "recordedBy": "Varun"
    },
    {
      "id": "tx_2080",
      "type": "SALE",
      "date": "2026-09-01",
      "category": "Bottle Sale",
      "description": "Sold 1x Bacardi Mango Chilli (From: Varun)",
      "customer": "Customer",
      "amount": 1300,
      "cogs": 980,
      "stockImpact": -1,
      "holdingPartnerId": "partner_varun",
      "holdingPartnerName": "Varun",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_mango",
          "productName": "Bacardi Mango Chilli",
          "quantity": 1,
          "unitPrice": 1300,
          "unitCost": 980,
          "location": "Varun"
        }
      ],
      "recordedBy": "Varun"
    },
    {
      "id": "tx_2063",
      "type": "SALE",
      "date": "2026-09-02",
      "category": "Bottle Sale",
      "description": "Sold 1x Jameson (From: Varun)",
      "customer": "Customer",
      "amount": 2600,
      "cogs": 2100,
      "stockImpact": -1,
      "holdingPartnerId": "partner_varun",
      "holdingPartnerName": "Varun",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_jameson",
          "productName": "Jameson",
          "quantity": 1,
          "unitPrice": 2600,
          "unitCost": 2100,
          "location": "Varun"
        }
      ],
      "recordedBy": "Varun"
    },
    {
      "id": "tx_2074",
      "type": "SALE",
      "date": "2026-09-02",
      "category": "Bottle Sale",
      "description": "Sold 1x Smirnoff Minty Jamun (From: Varun)",
      "customer": "Customer",
      "amount": 1350,
      "cogs": 980,
      "stockImpact": -1,
      "holdingPartnerId": "partner_varun",
      "holdingPartnerName": "Varun",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_minti_jamun_smirnoff",
          "productName": "Smirnoff Minty Jamun",
          "quantity": 1,
          "unitPrice": 1350,
          "unitCost": 980,
          "location": "Varun"
        }
      ],
      "recordedBy": "Varun"
    },
    {
      "id": "tx_2076",
      "type": "SALE",
      "date": "2026-09-02",
      "category": "Bottle Sale",
      "description": "Sold 1x Smirnoff Minty Jamun (From: Mihir)",
      "customer": "Customer",
      "amount": 1350,
      "cogs": 980,
      "stockImpact": -1,
      "holdingPartnerId": "partner_mihir",
      "holdingPartnerName": "Mihir",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_minti_jamun_smirnoff",
          "productName": "Smirnoff Minty Jamun",
          "quantity": 1,
          "unitPrice": 1350,
          "unitCost": 980,
          "location": "Mihir"
        }
      ],
      "recordedBy": "Mihir"
    },
    {
      "id": "tx_2008",
      "type": "PURCHASE",
      "date": "2026-09-03",
      "category": "Stock Purchase",
      "description": "Stock Purchase Lot 03-Sep: 25 bottles (Bombay, Absolute, Jim Beam, Rockford, Bacardi, Smirnoff)",
      "amount": 23680,
      "payers": [
        {
          "partnerId": "partner_varun",
          "partnerName": "Varun",
          "amount": 12910
        },
        {
          "partnerId": "partner_mihir",
          "partnerName": "Mihir",
          "amount": 10770
        }
      ],
      "stockImpact": 25,
      "paymentMethod": "Split UPI / Bank Transfer",
      "recordedBy": "Varun"
    },
    {
      "id": "tx_2016",
      "type": "EXPENSE",
      "date": "2026-09-03",
      "category": "Logistics & Courier Shipping",
      "description": "Goods Transport / Delivery Lot 03-Sep (Varun paid)",
      "amount": 50,
      "holdingPartnerId": "partner_varun",
      "holdingPartnerName": "Varun",
      "paymentMethod": "UPI / Cash",
      "recordedBy": "Varun"
    },
    {
      "id": "tx_2064",
      "type": "SALE",
      "date": "2026-09-03",
      "category": "Bottle Sale",
      "description": "Sold 1x Jameson (From: Varun)",
      "customer": "Customer",
      "amount": 2300,
      "cogs": 2100,
      "stockImpact": -1,
      "holdingPartnerId": "partner_mihir",
      "holdingPartnerName": "Mihir",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_jameson",
          "productName": "Jameson",
          "quantity": 1,
          "unitPrice": 2300,
          "unitCost": 2100,
          "location": "Varun"
        }
      ],
      "recordedBy": "Mihir"
    },
    {
      "id": "tx_2065",
      "type": "SALE",
      "date": "2026-09-03",
      "category": "Bottle Sale",
      "description": "Sold 1x Jameson (From: Varun)",
      "customer": "Customer",
      "amount": 2300,
      "cogs": 2100,
      "stockImpact": -1,
      "holdingPartnerId": "partner_mihir",
      "holdingPartnerName": "Mihir",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_jameson",
          "productName": "Jameson",
          "quantity": 1,
          "unitPrice": 2300,
          "unitCost": 2100,
          "location": "Varun"
        }
      ],
      "recordedBy": "Mihir"
    },
    {
      "id": "tx_2066",
      "type": "SALE",
      "date": "2026-09-03",
      "category": "Bottle Sale",
      "description": "Sold 1x Ballentines (From: Mihir)",
      "customer": "Customer",
      "amount": 1800,
      "cogs": 1500,
      "stockImpact": -1,
      "holdingPartnerId": "partner_mihir",
      "holdingPartnerName": "Mihir",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_ballentines",
          "productName": "Ballentines",
          "quantity": 1,
          "unitPrice": 1800,
          "unitCost": 1500,
          "location": "Mihir"
        }
      ],
      "recordedBy": "Mihir"
    },
    {
      "id": "tx_2067",
      "type": "SALE",
      "date": "2026-09-03",
      "category": "Bottle Sale",
      "description": "Sold 1x Ballentines (From: Mihir)",
      "customer": "Customer",
      "amount": 1800,
      "cogs": 1500,
      "stockImpact": -1,
      "holdingPartnerId": "partner_mihir",
      "holdingPartnerName": "Mihir",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_ballentines",
          "productName": "Ballentines",
          "quantity": 1,
          "unitPrice": 1800,
          "unitCost": 1500,
          "location": "Mihir"
        }
      ],
      "recordedBy": "Mihir"
    },
    {
      "id": "tx_2068",
      "type": "SALE",
      "date": "2026-09-03",
      "category": "Bottle Sale",
      "description": "Sold 1x Ballentines (From: Mihir)",
      "customer": "Customer",
      "amount": 1800,
      "cogs": 1500,
      "stockImpact": -1,
      "holdingPartnerId": "partner_mihir",
      "holdingPartnerName": "Mihir",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_ballentines",
          "productName": "Ballentines",
          "quantity": 1,
          "unitPrice": 1800,
          "unitCost": 1500,
          "location": "Mihir"
        }
      ],
      "recordedBy": "Mihir"
    },
    {
      "id": "tx_2069",
      "type": "SALE",
      "date": "2026-09-03",
      "category": "Bottle Sale",
      "description": "Sold 1x Ballentines (From: Mihir)",
      "customer": "Customer",
      "amount": 1800,
      "cogs": 1500,
      "stockImpact": -1,
      "holdingPartnerId": "partner_mihir",
      "holdingPartnerName": "Mihir",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_ballentines",
          "productName": "Ballentines",
          "quantity": 1,
          "unitPrice": 1800,
          "unitCost": 1500,
          "location": "Mihir"
        }
      ],
      "recordedBy": "Mihir"
    },
    {
      "id": "tx_2071",
      "type": "SALE",
      "date": "2026-09-03",
      "category": "Bottle Sale",
      "description": "Sold 1x Ballentines (From: Varun)",
      "customer": "Customer",
      "amount": 2000,
      "cogs": 1500,
      "stockImpact": -1,
      "holdingPartnerId": "partner_mihir",
      "holdingPartnerName": "Mihir",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_ballentines",
          "productName": "Ballentines",
          "quantity": 1,
          "unitPrice": 2000,
          "unitCost": 1500,
          "location": "Varun"
        }
      ],
      "recordedBy": "Mihir"
    },
    {
      "id": "tx_2072",
      "type": "SALE",
      "date": "2026-09-03",
      "category": "Bottle Sale",
      "description": "Sold 1x Ballentines (From: Mihir)",
      "customer": "Customer",
      "amount": 1800,
      "cogs": 1500,
      "stockImpact": -1,
      "holdingPartnerId": "partner_mihir",
      "holdingPartnerName": "Mihir",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_ballentines",
          "productName": "Ballentines",
          "quantity": 1,
          "unitPrice": 1800,
          "unitCost": 1500,
          "location": "Mihir"
        }
      ],
      "recordedBy": "Mihir"
    },
    {
      "id": "tx_2085",
      "type": "SALE",
      "date": "2026-09-03",
      "category": "Bottle Sale",
      "description": "Sold 1x Bombay Sapphire (From: Varun)",
      "customer": "Customer",
      "amount": 2300,
      "cogs": 2100,
      "stockImpact": -1,
      "holdingPartnerId": "partner_mihir",
      "holdingPartnerName": "Mihir",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_bombay_sapphire",
          "productName": "Bombay Sapphire",
          "quantity": 1,
          "unitPrice": 2300,
          "unitCost": 2100,
          "location": "Varun"
        }
      ],
      "recordedBy": "Mihir"
    },
    {
      "id": "tx_2086",
      "type": "SALE",
      "date": "2026-09-03",
      "category": "Bottle Sale",
      "description": "Sold 1x Bombay Sapphire (From: Varun)",
      "customer": "Customer",
      "amount": 2300,
      "cogs": 2100,
      "stockImpact": -1,
      "holdingPartnerId": "partner_mihir",
      "holdingPartnerName": "Mihir",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_bombay_sapphire",
          "productName": "Bombay Sapphire",
          "quantity": 1,
          "unitPrice": 2300,
          "unitCost": 2100,
          "location": "Varun"
        }
      ],
      "recordedBy": "Mihir"
    },
    {
      "id": "tx_2087",
      "type": "SALE",
      "date": "2026-09-03",
      "category": "Bottle Sale",
      "description": "Sold 1x Absolute (From: Varun)",
      "customer": "Customer",
      "amount": 2200,
      "cogs": 1870,
      "stockImpact": -1,
      "holdingPartnerId": "partner_mihir",
      "holdingPartnerName": "Mihir",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_absolute",
          "productName": "Absolute",
          "quantity": 1,
          "unitPrice": 2200,
          "unitCost": 1870,
          "location": "Varun"
        }
      ],
      "recordedBy": "Mihir"
    },
    {
      "id": "tx_2088",
      "type": "SALE",
      "date": "2026-09-03",
      "category": "Bottle Sale",
      "description": "Sold 1x Bacardi Black (From: Varun)",
      "customer": "Customer",
      "amount": 900,
      "cogs": 760,
      "stockImpact": -1,
      "holdingPartnerId": "partner_mihir",
      "holdingPartnerName": "Mihir",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_bacardi_black",
          "productName": "Bacardi Black",
          "quantity": 1,
          "unitPrice": 900,
          "unitCost": 760,
          "location": "Varun"
        }
      ],
      "recordedBy": "Mihir"
    },
    {
      "id": "tx_2089",
      "type": "SALE",
      "date": "2026-09-03",
      "category": "Bottle Sale",
      "description": "Sold 1x Bacardi Limon (From: Varun)",
      "customer": "Customer",
      "amount": 1250,
      "cogs": 940,
      "stockImpact": -1,
      "holdingPartnerId": "partner_mihir",
      "holdingPartnerName": "Mihir",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_lemon",
          "productName": "Bacardi Limon",
          "quantity": 1,
          "unitPrice": 1250,
          "unitCost": 940,
          "location": "Varun"
        }
      ],
      "recordedBy": "Mihir"
    },
    {
      "id": "tx_2090",
      "type": "SALE",
      "date": "2026-09-03",
      "category": "Bottle Sale",
      "description": "Sold 1x Bacardi Limon (From: Varun)",
      "customer": "Customer",
      "amount": 1250,
      "cogs": 940,
      "stockImpact": -1,
      "holdingPartnerId": "partner_mihir",
      "holdingPartnerName": "Mihir",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_lemon",
          "productName": "Bacardi Limon",
          "quantity": 1,
          "unitPrice": 1250,
          "unitCost": 940,
          "location": "Varun"
        }
      ],
      "recordedBy": "Mihir"
    },
    {
      "id": "tx_2091",
      "type": "SALE",
      "date": "2026-09-03",
      "category": "Bottle Sale",
      "description": "Sold 1x Bacardi Limon (From: Varun)",
      "customer": "Customer",
      "amount": 1200,
      "cogs": 940,
      "stockImpact": -1,
      "holdingPartnerId": "partner_mihir",
      "holdingPartnerName": "Mihir",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_lemon",
          "productName": "Bacardi Limon",
          "quantity": 1,
          "unitPrice": 1200,
          "unitCost": 940,
          "location": "Varun"
        }
      ],
      "recordedBy": "Mihir"
    },
    {
      "id": "tx_2092",
      "type": "SALE",
      "date": "2026-09-03",
      "category": "Bottle Sale",
      "description": "Sold 1x Bacardi Limon (From: Mihir)",
      "customer": "Customer",
      "amount": 1200,
      "cogs": 940,
      "stockImpact": -1,
      "holdingPartnerId": "partner_mihir",
      "holdingPartnerName": "Mihir",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_lemon",
          "productName": "Bacardi Limon",
          "quantity": 1,
          "unitPrice": 1200,
          "unitCost": 940,
          "location": "Mihir"
        }
      ],
      "recordedBy": "Mihir"
    },
    {
      "id": "tx_2093",
      "type": "SALE",
      "date": "2026-09-03",
      "category": "Bottle Sale",
      "description": "Sold 1x Bacardi Mango Chilli (From: Mihir)",
      "customer": "Customer",
      "amount": 1250,
      "cogs": 980,
      "stockImpact": -1,
      "holdingPartnerId": "partner_varun",
      "holdingPartnerName": "Varun",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_mango",
          "productName": "Bacardi Mango Chilli",
          "quantity": 1,
          "unitPrice": 1250,
          "unitCost": 980,
          "location": "Mihir"
        }
      ],
      "recordedBy": "Varun"
    },
    {
      "id": "tx_2094",
      "type": "SALE",
      "date": "2026-09-03",
      "category": "Bottle Sale",
      "description": "Sold 1x Bacardi Mango Chilli (From: Mihir)",
      "customer": "Customer",
      "amount": 1250,
      "cogs": 980,
      "stockImpact": -1,
      "holdingPartnerId": "partner_varun",
      "holdingPartnerName": "Varun",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_mango",
          "productName": "Bacardi Mango Chilli",
          "quantity": 1,
          "unitPrice": 1250,
          "unitCost": 980,
          "location": "Mihir"
        }
      ],
      "recordedBy": "Varun"
    },
    {
      "id": "tx_2095",
      "type": "SALE",
      "date": "2026-09-03",
      "category": "Bottle Sale",
      "description": "Sold 1x Smirnoff Minty Jamun (From: Mihir)",
      "customer": "Customer",
      "amount": 1200,
      "cogs": 980,
      "stockImpact": -1,
      "holdingPartnerId": "partner_mihir",
      "holdingPartnerName": "Mihir",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_minti_jamun_smirnoff",
          "productName": "Smirnoff Minty Jamun",
          "quantity": 1,
          "unitPrice": 1200,
          "unitCost": 980,
          "location": "Mihir"
        }
      ],
      "recordedBy": "Mihir"
    },
    {
      "id": "tx_2096",
      "type": "SALE",
      "date": "2026-09-03",
      "category": "Bottle Sale",
      "description": "Sold 1x Smirnoff Minty Jamun (From: Mihir)",
      "customer": "Customer",
      "amount": 1200,
      "cogs": 980,
      "stockImpact": -1,
      "holdingPartnerId": "partner_mihir",
      "holdingPartnerName": "Mihir",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_minti_jamun_smirnoff",
          "productName": "Smirnoff Minty Jamun",
          "quantity": 1,
          "unitPrice": 1200,
          "unitCost": 980,
          "location": "Mihir"
        }
      ],
      "recordedBy": "Mihir"
    },
    {
      "id": "tx_2097",
      "type": "SALE",
      "date": "2026-09-03",
      "category": "Bottle Sale",
      "description": "Sold 1x Smirnoff Minty Jamun (From: Mihir)",
      "customer": "Customer",
      "amount": 1200,
      "cogs": 980,
      "stockImpact": -1,
      "holdingPartnerId": "partner_mihir",
      "holdingPartnerName": "Mihir",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_minti_jamun_smirnoff",
          "productName": "Smirnoff Minty Jamun",
          "quantity": 1,
          "unitPrice": 1200,
          "unitCost": 980,
          "location": "Mihir"
        }
      ],
      "recordedBy": "Mihir"
    },
    {
      "id": "tx_2009",
      "type": "PURCHASE",
      "date": "2026-09-05",
      "category": "Stock Purchase",
      "description": "Stock Purchase Lot 05-Sep: 5 bottles (Mihir paid \u20b99,730 of \u20b99,800)",
      "amount": 9730,
      "holdingPartnerId": "partner_mihir",
      "holdingPartnerName": "Mihir",
      "stockImpact": 5,
      "paymentMethod": "UPI / Bank Transfer",
      "recordedBy": "Mihir"
    },
    {
      "id": "tx_2017",
      "type": "EXPENSE",
      "date": "2026-09-05",
      "category": "Logistics & Courier Shipping",
      "description": "Goods Transport / Delivery Lot 05-Sep (Mihir paid \u20b970 of \u20b99,800)",
      "amount": 70,
      "holdingPartnerId": "partner_mihir",
      "holdingPartnerName": "Mihir",
      "paymentMethod": "UPI / Cash",
      "recordedBy": "Mihir"
    },
    {
      "id": "tx_2098",
      "type": "SALE",
      "date": "2026-09-05",
      "category": "Bottle Sale",
      "description": "Sold 1x Smirnoff Minty Jamun (From: Mihir)",
      "customer": "Customer",
      "amount": 1300,
      "cogs": 980,
      "stockImpact": -1,
      "holdingPartnerId": "partner_mihir",
      "holdingPartnerName": "Mihir",
      "paymentMethod": "UPI / Cash",
      "paymentStatus": "PAID",
      "items": [
        {
          "productId": "prod_minti_jamun_smirnoff",
          "productName": "Smirnoff Minty Jamun",
          "quantity": 1,
          "unitPrice": 1300,
          "unitCost": 980,
          "location": "Mihir"
        }
      ],
      "recordedBy": "Mihir"
    }
  ],
  "auditLogs": [
    {
      "id": "log_init",
      "timestamp": "2026-09-06T15:35:21.990Z",
      "action": "DATA_IMPORT",
      "user": "Mihir",
      "details": "Cleared old records and initialized 39 sales, 7 stock purchases, 4 transport expenses, and 4 partner transfers from verified business sheets"
    },
    {
      "id": "log_batch2_import",
      "timestamp": "2026-09-07T00:18:16.936275Z",
      "action": "DATA_IMPORT",
      "user": "Mihir",
      "details": "Imported Batch 2 business cycle: 79 sales (Rs. 124,150 revenue), 9 lot purchases (Rs. 137,460), 7 transport expenses (Rs. 1,570), and 29 inventory stock bottles (Rs. 39,510 valuation across Varun and Mihir)."
    }
  ]
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
          if (parsed && Array.isArray(parsed.transactions)) {
            if (key === STORAGE_KEY) {
              st = parsed;
              break;
            } else if (parsed.transactions.length >= DEFAULT_INITIAL_STATE.transactions.length) {
              st = parsed;
              console.log(`Auto-migrated data from storage key: ${key}`);
              break;
            }
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
    
    let activityTitle = `NEW ${tx.type}`;
    let activityDetails = '';

    if (tx.type === 'SALE') {
      activityTitle = 'NEW SALE';
      let itemsListStr = '';
      if (tx.items && Array.isArray(tx.items) && tx.items.length > 0) {
        itemsListStr = tx.items.map(i => `${i.quantity}x ${i.productName || 'Item'} @ ₹${Number(i.unitPrice || 0).toLocaleString('en-IN')}`).join(', ');
      }
      const customerStr = tx.customer ? ` to ${tx.customer}` : '';
      const accountStr = tx.holdingPartnerName ? ` [Received in: ${tx.holdingPartnerName}'s Account]` : '';
      activityDetails = `Sold ${itemsListStr || 'products'}${customerStr} for ₹${Number(tx.amount || 0).toLocaleString('en-IN')}${accountStr}`;
    } else if (tx.type === 'PURCHASE') {
      activityTitle = 'NEW RESTOCK';
      let itemsListStr = '';
      if (tx.items && Array.isArray(tx.items) && tx.items.length > 0) {
        itemsListStr = tx.items.map(i => `${i.quantity}x ${i.productName || 'Item'} (Cost: ₹${Number(i.unitCost || 0).toLocaleString('en-IN')})`).join(', ');
      }
      const vendorStr = tx.vendor ? ` from ${tx.vendor}` : '';
      const locStr = tx.location ? ` at 📍 ${tx.location}` : '';
      activityDetails = `Restocked ${itemsListStr || 'goods'}${vendorStr}${locStr} (Total: ₹${Number(tx.amount || 0).toLocaleString('en-IN')})`;
    } else if (tx.type === 'STOCK_CONTRIBUTION' || tx.type === 'STOCK_INVESTMENT') {
      activityTitle = 'STOCK MONEY';
      let payersStr = '';
      if (tx.payers && Array.isArray(tx.payers) && tx.payers.length > 0) {
        payersStr = tx.payers.map(p => `${p.partnerName} (₹${Number(p.amount).toLocaleString('en-IN')})`).join(' + ');
      } else if (tx.holdingPartnerName) {
        payersStr = tx.holdingPartnerName;
      }
      activityDetails = `Partner money put in for buying stock: ${payersStr} (Total: ₹${Number(tx.amount || 0).toLocaleString('en-IN')})`;
    } else if (tx.type === 'EXPENSE') {
      activityTitle = 'NEW EXPENSE';
      const payerStr = tx.holdingPartnerName ? ` [Paid by: ${tx.holdingPartnerName}]` : '';
      activityDetails = `Operating expense: ${tx.description || tx.category} (₹${Number(tx.amount || 0).toLocaleString('en-IN')})${payerStr}`;
    } else if (tx.type === 'TRANSFER') {
      activityTitle = 'SETTLEMENT TRANSFER';
      activityDetails = `Settlement transfer: ₹${Number(tx.amount || 0).toLocaleString('en-IN')} from ${tx.fromPartnerName} → ${tx.toPartnerName}`;
    } else {
      const accountNote = tx.holdingPartnerName ? ` [Account: ${tx.holdingPartnerName}]` : '';
      activityDetails = `Created ${tx.type} entry: ${tx.description} (₹${Number(tx.amount || 0).toLocaleString('en-IN')})${accountNote}`;
    }

    this.logActivity(activityTitle, activityDetails);
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

    let editActivityDetails = '';
    if (newTx.type === 'SALE') {
      let itemsListStr = '';
      if (newTx.items && Array.isArray(newTx.items) && newTx.items.length > 0) {
        itemsListStr = newTx.items.map(i => `${i.quantity}x ${i.productName || 'Item'} @ ₹${Number(i.unitPrice || 0).toLocaleString('en-IN')}`).join(', ');
      }
      const customerStr = newTx.customer ? ` to ${newTx.customer}` : '';
      const accountStr = newTx.holdingPartnerName ? ` [Account: ${newTx.holdingPartnerName}]` : '';
      editActivityDetails = `Updated sale${customerStr}: ${itemsListStr || 'items'} (Total: ₹${Number(newTx.amount).toLocaleString('en-IN')})${accountStr}`;
    } else if (newTx.type === 'PURCHASE') {
      let itemsListStr = '';
      if (newTx.items && Array.isArray(newTx.items) && newTx.items.length > 0) {
        itemsListStr = newTx.items.map(i => `${i.quantity}x ${i.productName || 'Item'}`).join(', ');
      }
      editActivityDetails = `Updated restock entry: ${itemsListStr || 'goods'} from ${newTx.vendor || 'Supplier'} (₹${Number(newTx.amount).toLocaleString('en-IN')})`;
    } else {
      editActivityDetails = `Edited ${oldTx.type}: ${newTx.description} (₹${oldTx.amount} → ₹${newTx.amount})`;
    }

    this.logActivity(`EDITED ${oldTx.type}`, editActivityDetails);
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

      let deleteDetails = '';
      if (tx.type === 'SALE' && tx.items && tx.items.length > 0) {
        const itemsListStr = tx.items.map(i => `${i.quantity}x ${i.productName || 'Item'}`).join(', ');
        deleteDetails = `Voided/deleted sale of [${itemsListStr}] to ${tx.customer || 'Customer'} (₹${Number(tx.amount).toLocaleString('en-IN')})`;
      } else if (tx.type === 'PURCHASE' && tx.items && tx.items.length > 0) {
        const itemsListStr = tx.items.map(i => `${i.quantity}x ${i.productName || 'Item'}`).join(', ');
        deleteDetails = `Voided/deleted restock of [${itemsListStr}] from ${tx.vendor || 'Supplier'} (₹${Number(tx.amount).toLocaleString('en-IN')})`;
      } else {
        deleteDetails = `Voided/deleted ${tx.type} entry: ${tx.description} (₹${Number(tx.amount).toLocaleString('en-IN')})`;
      }

      this.logActivity(`DELETED ${tx.type}`, deleteDetails);
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
