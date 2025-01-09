export const PRODUCT_TYPES_OPTIONS = {
  Cakes: {
    sizes: [
      { label: "6 inches", value: "6" },
      { label: "8 inches", value: "8" },
      { label: "10 inches", value: "10" },
      { label: "12 inches", value: "12" }
    ],
    layers: [
      { label: "2 layers", value: "2" },
      { label: "3 layers", value: "3" },
      { label: "4 layers", value: "4" },
      { label: "5 layers", value: "5" }
    ],
    flavours: [
      { label: "Vanilla", value: "Vanilla" },
      { label: "Chocolate", value: "Chocolate" },
      { label: "Red Velvet", value: "Red Velvet" },
      { label: "None", value: "None" }
    ],
    whippedCreamUpgrade: [
      { label: "1 Layer", value: "0" },
      { label: "2 Layers", value: "5000" },
      { label: "3 Layers", value: "7000" },
      { label: "5 Layers", value: "7000" },
      { label: "Tiered", value: "15000" }
    ],
    toppings: [
      { label: "None", value: "none" },
      { label: "Chocolate Cookies", value: "chocolate" },
      { label: "Fruits", value: "fruits" },
      { label: "Fruits & Chocolate Cookies", value: "mixed" }
    ]
  },
  Flowers: {
    vaseOptions: [
      { label: "25cm", value: "25cm" },
      { label: "50cm", value: "50cm" }
    ]
  },
  Teddies: {
    sizes: [
      { label: "25cm (Entry)", value: "25cm", price: 20000 },
      { label: "30cm (X-Small)", value: "30cm", price: 45000 },
      { label: "40cm (Small)", value: "40cm", price: 52000 },
      { label: "60cm (Medium)", value: "60cm", price: 72000 }
    ],
    bouquets: [
      { label: "Entry", value: "Entry" },
      { label: "X-Small", value: "Xsmall" },
      { label: "Small", value: "Small" },
      { label: "Moyenne", value: "Moyenne" },
      { label: "Standard", value: "Standard" },
      { label: "Human-sized", value: "Human-sized" }
    ]
  }
};


export const BRANCH_OPTIONS = [
  { label: "Zuzu Delights", value: "Zuzu Delights" },
  { label: "Prestige Flowers", value: "Prestige Flowers" }
]

export const ENQUIRY_PAYMENT_OPTIONS = [
  { value: "not_paid_go_ahead", label: "Not Paid (Go Ahead)" },
  { value: "paid_website_card", label: "Paid (Website Card)" },
  { value: "paid_naira_transfer", label: "Paid (Naira Transfer)" },
  { value: "paid_pos", label: "Paid (POS)" },
  { value: "paid_usd_transfer", label: "Paid (USD Transfer)" },
  { value: "paid_paypal", label: "Paid (PayPal)" },
  { value: "cash_paid", label: "Cash Paid" },
  { value: "part_payment", label: "Part Payment" },
  { value: "paid_bitcoin", label: "Paid (Bitcoin)" },
  { value: "not_received_paid", label: "Not Received (Paid)" },
];

export const ORDER_STATUS_OPTIONS = [
  { value: "PND", label: "Payment Made" },
  { value: "SOA", label: "SOA" },
  { value: "SOR", label: "Sorted" },
  { value: "STD", label: "Sent to Dispatch" },
  { value: "COM", label: "Delivered" },
  { value: "CAN", label: "Cancelled" },
]





export const paymentOptions = [
  { label: "Not Paid (But Go Ahead)", value: "not_paid_go_ahead" },
  { label: "Paid (Website Card)", value: "paid_website_card" },
  { label: "Paid (Naira Transfer)", value: "paid_naira_transfer" },
  { label: "Paid (POS)", value: "paid_pos" },
  { label: "Paid (USD Transfer)", value: "paid_usd_transfer" },
  { label: "Paid (Paypal)", value: "paid_paypal" },
  { label: "Cash Paid", value: "cash_paid" },
  { label: "Part Payment", value: "part_payment" },
  { label: "Paid (Bitcoin)", value: "paid_bitcoin" },
  { label: "Not Received (Paid)", value: "not_received_paid" }
];

































export const STOCK_CATEGORIES_OPTIONS = [
  { value: 'C', label: 'Cake' },
  { value: 'F', label: 'Flower' },
  { value: 'CC', label: 'Cup Cake' },
]

export const PRODUCT_CATEGORIES_OPTIONS = [
  { value: 'W', label: 'Wine' },
  { value: 'TB', label: 'Teddy Bear' },
  { value: 'GC', label: 'Gift Card' },
  { value: 'V', label: 'Vase' },
  { value: 'CH', label: 'Chocolate' },
  { value: 'B', label: 'Baloon' },
  { value: 'P', label: 'Perfume' },
  { value: 'HB', label: 'Hand Bag' },
]

export const PAYMENT_STATUS_OPTIONS = [
  { label: "Not Paid", value: "not_paid" },
  { label: "Paid", value: "paid" },
  { label: "Part Payment", value: "part_payment" },
  { label: "Not Received(Paid)", value: "not_received" }
]

export const DELIVERY_LOCATION_OPTIONS = [
  { value: "YABA", label: "Yaba N5,000" },
  { value: "SHOMOLU_BARIGA", label: "Shomolu/Bariga N5,000" },
  { value: "IYANA-IPAJA", label: "Iyana Ipaja (N8,500)" },
]

export const PAYMENT_METHODS = [
  { label: "Website Card", value: "website_card" },
  { label: "Naira Transfer", value: "naira_transfer" },
  { label: "POS", value: "pos" },
  { label: "USD Transfer", value: "usd_transfer" },
  { label: "Paypal", value: "paypal" },
  { label: "Cash Paid", value: "cash_paid" },
  { label: "Part Payment", value: "part_payment" },
  { label: "Bitcoin", value: "bitcoin" }
]

export const ENQUIRY_CHANNEL_OPTIONS = [
  { value: 'Email', label: 'Email' },
  { value: 'Whatsapp', label: 'WhatsApp' },
  { value: 'Website', label: 'Website' },
  { value: 'Walk-in', label: 'Store Walk In' },
  { value: 'Instagram', label: 'Instagram' },
  { value: 'Phone', label: 'Phone Call' },
  { value: 'Facebook', label: 'Facebook' },
  { value: 'Tik Ttok', label: 'Tik Tok' },
]

export const ENQUIRY_OCCASION_OPTIONS = [
  { value: 'birthday', label: 'Birthday' },
  { value: 'anniversary', label: 'Anniversary' },
  { value: 'wedding', label: 'Wedding' },
  { value: 'father_s_Day', label: "Father's Day" },
  { value: 'mother_s_Day', label: "Mother's Day" },
]

export const DISPATCH_METHOD_OPTIONS = [
  { value: "Dispatch", label: "Dispatch" },
  { value: "Pickup", label: "Pickup" },
]