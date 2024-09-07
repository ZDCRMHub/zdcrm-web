export const productOptions = {
  Cakes: {
    sizes: [
      { label: "6 inches", value: "6 inches)" },
      { label: "8 inches", value: "8 inches)" },
      { label: "10 inches", value: "10 inches" },
      { label: "12 inches", value: "12 inches" }
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
      { label: "1 Layer", value: 0 },
      { label: "2 Layers", value: 5000 },
      { label: "3 Layers", value: 7000 },
      { label: "5 Layers", value: 7000 },
      { label: "Tiered", value: 15000 }
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
      { label: "25cm (Entry)", value: { size: "25cm", price: 20000 } },
      { label: "30cm (X-Small)", value: { size: "30cm", price: 45000 } },
      { label: "40cm (Small)", value: { size: "40cm", price: 52000 } },
      { label: "60cm (Medium)", value: { size: "60cm", price: 72000 } }
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

export const AllProducts = [
  {
    id: "cake-1", name: "Vanilla Cake", image: "/img/cake.png", category: "C",
    variants: [
      { size: "Pack of 6", price: 9500 },
      { size: "Pack of 12", price: 19000 },
      { size: "Pack of 36", price: 36000 },
      { size: "Pack of 48", price: 48000 }
    ]
  },
  {
    id: "cake-2", name: "Strawberry Cake", image: "/img/cake2.png", category: "C",
    variants: [
      { size: "Pack of 6", price: 9500 },
      { size: "Pack of 36", price: 36000 },
      { size: "Pack of 48", price: 48000 }
    ]
  },
  {
    id: "flower-1", name: "Rose Bouquet", image: "/img/flower1.webp", category: "F",
    variants: [
      { size: "Pack of 6", price: 9500 },
      { size: "Pack of 36", price: 36000 },
      { size: "Pack of 48", price: 48000 }
    ]
  },
  {
    id: "teddy-1", name: "Small Teddy", image: "/img/cake2.png", category: "TB",
    variants: [
      { size: "Pack of 6", price: 9500 },
      { size: "Pack of 36", price: 36000 },
      { size: "Pack of 48", price: 48000 }
    ]
  },
  {
    id: "teddy-2", name: "Small Teddy", image: "/img/flower2.webp", category: "TB",
    variants: [
      { size: "Pack of 6", price: 9500 },
      { size: "Pack of 36", price: 36000 },
      { size: "Pack of 48", price: 48000 }
    ]
  },
  {
    id: "chocolate-1", name: "Chocolate Cake", image: "/img/cake1.png", category: "C",
    variants: [
      { size: "Pack of 6", price: 9500 },
      { size: "Pack of 36", price: 36000 },
      { size: "Pack of 48", price: 48000 }
    ]
  },
  {
    id: "flower-2", name: "Rose Bouquet", image: "/img/flower2.webp", category: "F",
    variants: [
      { size: "Pack of 6", price: 9500 },
      { size: "Pack of 36", price: 36000 },
      { size: "Pack of 48", price: 48000 }
    ]
  },
  {
    id: "teddy-3", name: "Small Teddy", image: "/img/flower2.webp", category: "TB",
    variants: [
      { size: "Pack of 6", price: 9500 },
      { size: "Pack of 36", price: 36000 },
      { size: "Pack of 48", price: 48000 }
    ]
  },
  {
    id: "teddy-4", name: "Small Teddy", image: "/img/flower2.webp", category: "TB",
    variants: [
      { size: "Pack of 6", price: 9500 },
      { size: "Pack of 36", price: 36000 },
      { size: "Pack of 48", price: 48000 }
    ]
  },
  // New products added from the provided data
  {
    id: "4669",
    name: "Cake",
    image: "https://www.zuzudelights.com/wp-content/uploads/2022/11/1000033825.jpg",
    category: "C",
    price: 17500,
    subcategory: "Occasions",
    published: false,
    inStock: false,
    description: "",
    variants: [
      { size: "Pack of 6", price: 9500 },
      { size: "Pack of 36", price: 36000 },
      { size: "Pack of 48", price: 48000 }
    ]
  },
  {
    id: "4742",
    name: "Ombre by ZD",
    image: "https://www.zuzudelights.com/wp-content/uploads/2022/11/1000033825.jpg",
    category: "C",
    subcategory: "Cupcakes",
    published: true,
    inStock: true,
    description: "Delightful mix of 2 or 3 hues of American buttercream frosting color to form a perfect blend (Available in various sizes).",
    variants: [
      { size: "Pack of 6", price: 9500 },
      { size: "Pack of 12", price: 19000 },
      { size: "Pack of 24", price: 28800 },
      { size: "Pack of 36", price: 36000 },
      { size: "Pack of 48", price: 48000 }
    ]
  },
  {
    id: "4752",
    name: "Classic Cupcakes",
    image: "https://www.zuzudelights.com/wp-content/uploads/2023/03/1000187954.jpg",
    category: "C",
    subcategory: "Cupcakes",
    published: true,
    inStock: true,
    description: "Moist and fluffy cupcakes. Perfect for all-purpose gifting - birthdays, anniversary, just because etc (Available in various sizes).",
    variants: [
      { size: "Pack of 6", price: 5500 },
      { size: "Pack of 12", price: 10900 },
      { size: "Pack of 24", price: 21900 },
      { size: "Pack of 36", price: 32900 },
      { size: "Pack of 48", price: 43900 }
    ]
  },
  {
    id: "4761",
    name: "Cream and cookies Cupcakes",
    image: "https://www.zuzudelights.com/wp-content/uploads/2022/06/43330.jpg",
    category: "C",
    subcategory: "Cupcakes",
    published: true,
    inStock: true,
    description: "All round luxurious cookie infused frosting and topping (Available in various sizes).",
    variants: [
      { size: "Pack of 6", price: 9500 },
      { size: "Pack of 12", price: 19000 },
      { size: "Pack of 24", price: 28800 },
      { size: "Pack of 36", price: 36000 },
      { size: "Pack of 48", price: 48000 }
    ]
  },
  {
    id: "4781",
    name: "Cascading Oreos Cake",
    image: "https://www.zuzudelights.com/wp-content/uploads/2021/09/Cascading-Oreos-Cake.png",
    category: "C",
    subcategory: "All Cakes",
    published: true,
    inStock: true,
    description: "A rich moist cake with rich spongy surface filled with Oreos filled cream and a cascading oreos cookie topping (Available in different sizes).",
    variants: [
      {
        size: "6 inches", layers: [
          { layers: 3, price: 34000 },
          { layers: 4, price: 46000 },
          { layers: 5, price: 56500 }
        ]
      },
      {
        size: "8 inches", layers: [
          { layers: 3, price: 56000 },
          { layers: 4, price: 73500 },
          { layers: 5, price: 87500 }
        ]
      },
      {
        size: "10 inches", layers: [
          { layers: 3, price: 59000 },
          { layers: 4, price: 78000 },
          { layers: 5, price: 94000 }
        ]
      },
      {
        size: "12 inches", layers: [
          { layers: 3, price: 67500 },
          { layers: 4, price: 97000 },
          { layers: 5, price: 139500 }
        ]
      }
    ]
  },
  {
    id: "4854",
    name: "Luc Belaire Luxe",
    image: "https://www.zuzudelights.com/wp-content/uploads/2021/10/belaire.jpeg",
    category: "W",
    subcategory: "Mother's Day > Gifts > Champagnes & Wines",
    published: false,
    inStock: true,
    price: 59000,
    description: "Luc Belaire Luxe is based on 100% Chardonnay. The white wine from Burgundy is married with a dosage of Chablis, which matured before in oak barrels."
  },
  {
    id: "4858",
    name: "Eisberg Cabernet Sauvignon Non Alcoholic",
    image: "https://www.zuzudelights.com/wp-content/uploads/2021/10/eisberg-non-alcoholic.jpg",
    category: "W",
    subcategory: "Mother's Day > Gifts > Champagnes & Wines",
    published: false,
    inStock: false,
    price: 10500,
    description: "The Eisberg grapes are selected by winemakers for their ability to maintain the true taste of the grape variety after the alcohol has been removed."
  },
  {
    id: "4896",
    name: "Euphoria : Round Pull Apart Cupcake",
    image: "https://www.zuzudelights.com/wp-content/uploads/2022/04/983689.jpg",
    category: "C",
    subcategory: "Cupcakes > Pull Apart Cupcakes",
    published: true,
    inStock: true,
    description: "Introducing our Classic Cupcake Gift Board. Cupcakes with optional customized message, fresh flowers, chocolate and berries toppings.",
    variants: [
      { size: "Entry 10cm", price: 18900 },
      { size: "Medium 12cm", price: 28900 },
      { size: "Standard 14cm", price: 36900 }
    ]
  },
  {
    id: "4902",
    name: "Choc Drip Drop 102",
    image: "https://www.zuzudelights.com/wp-content/uploads/2023/07/1000326340.jpg",
    category: "C",
    subcategory: "All Cakes",
    published: true,
    inStock: true,
    description: "Celebrate with a Delicious Zuzu Delights Chocolate Birthday Cake Lagos!",
    variants: [
      {
        size: "6 inches", layers: [
          { layers: 3, price: 31000 },
          { layers: 4, price: 42500 },
          { layers: 5, price: 47000 }
        ]
      },
      {
        size: "8 inches", layers: [
          { layers: 3, price: 49500 },
          { layers: 4, price: 65500 },
          { layers: 5, price: 78500 }
        ]
      },
      {
        size: "10 inches", layers: [
          { layers: 3, price: 54500 },
          { layers: 4, price: 71000 },
          { layers: 5, price: 87500 }
        ]
      }
    ]
  },
  {
    id: "4931",
    name: "Floral Exposé 101 (Tall)",
    category: "C",
    published: false,
    inStock: false,
    image: "https://www.zuzudelights.com/wp-content/uploads/2021/10/gilded-pine.jpg",
    description: "",
    variants: [
      { size: "8 inches", layers: 5, price: 27500 }
    ],
    attributes: [
      { name: "Select Size", value: "8 inches", visible: true, global: true, default: "8 inches" },
      { name: "Cake Layers", value: "5 layers", visible: true, global: true, default: "5 layers" }
    ]
  },
  {
    id: "4932",
    name: "GILDED PINE",
    category: "C",
    published: true,
    inStock: true,
    description: "With a simplistic appeal, fresh pine greens and golden accentuate toppings, the Gilded pine option is purely perfect for all occasions (Available in various sizes)",
    image: "https://www.zuzudelights.com/wp-content/uploads/2021/10/gilded-pine.jpg",
    subcategory: "Occasions > Birthday, Occasions > Bridal Shower, Occasions > Christmas, Occasions > Just to say (Sorry, Thank you, Congrats, Get Well etc), Occasions > Love and Romance, Standard Cakes",
    variants: [
      { size: "8 inches", layers: 4, price: 18500 },
      { size: "8 inches", layers: 5, price: 25500 },
      { size: "8 inches", layers: 6, price: 36500 },
      { size: "10 inches", layers: 6, price: 65500 }
    ],
    attributes: [
      { name: "Select Size", value: "10 inches, 8 inches", visible: true, global: true, default: "8 inches" },
      { name: "Cake Layers", value: "3 layers, 4 layers, 5 layers, 6 layers", visible: true, global: true, default: "4 layers" }
    ]
  },
  {
    id: "4940",
    name: "Choc Drip Drop 104",
    category: "C",
    published: true,
    inStock: true,
    description: "Chocolate frosting and fondant based note inscription on a decadent moist cupcake set. Perfect for all purpose gifting - birthdays, anniversary, just because etc (Available in various sizes).",
    image: "https://www.zuzudelights.com/wp-content/uploads/2021/10/drip-102-2.jpg",
    subcategory: "All Cakes, Occasions > Birthday, Occasions > Bridal Shower, All Cakes > Chocolate Cake, Occasions > Just to say (Sorry, Thank you, Congrats, Get Well etc), Occasions > Love and Romance, Occasions, Standard Cakes",
    variants: [
      { size: "6 inches", layers: 3, price: 31000 },
      { size: "6 inches", layers: 4, price: 42500 },
      { size: "6 inches", layers: 5, price: 47000 },
      { size: "8 inches", layers: 3, price: 49500 },
      { size: "8 inches", layers: 4, price: 65500 },
      { size: "8 inches", layers: 5, price: 78500 },
      { size: "10 inches", layers: 3, price: 54500 },
      { size: "10 inches", layers: 4, price: 71000 },
      { size: "10 inches", layers: 5, price: 87500 }
    ],
    attributes: [
      { name: "Select Size", value: "10 inches, 6 inches, 8 inches", visible: true, global: true, default: "8 inches" },
      { name: "Cake Layers", value: "3 layers, 4 layers, 5 layers", visible: true, global: true, default: "4 layers" }
    ]
  },
  {
    id: "4957",
    name: "Magnus Choc frosting",
    category: "C",
    published: true,
    inStock: true,
    description: "Chocolate frosting and fondant based note inscription on a decadent moist cupcake set. Perfect for all purpose gifting - birthdays, anniversary, just because etc (Available in various sizes).",
    image: "https://www.zuzudelights.com/wp-content/uploads/2021/10/magnus-1.jpg",
    subcategory: "Cupcakes > Cupcake Gift Box, Cupcakes, Same Day Cakes, Valentine Category > VALENTINE CUPCAKE",
    variants: [
      { size: "Pack of 6", price: 5500 },
      { size: "Pack of 12", price: 10900 },
      { size: "Pack of 24", price: 21900 },
      { size: "Pack of 36", price: 32900 },
      { size: "Pack of 48", price: 43900 }
    ],
    attributes: [
      { name: "Cupcakes Size", value: "Pack of 12, Pack of 24, Pack of 36, Pack of 48, Pack of 6", visible: true, global: true, default: "Pack of 12" },
      { name: "Cupcake Flavour", value: "Chocolate, Mixed, Red Velvet, Strawberry, Vanilla", visible: true, global: true, default: "Mixed" }
    ]
  },
  {
    id: "4973",
    name: "SIGNATURE - Personalize Your Cupcake",
    category: "C",
    published: true,
    inStock: true,
    description: "Signature – Personalize Your Cupcake",
    image: "https://www.zuzudelights.com/wp-content/uploads/2022/06/39748.jpg",
    subcategory: "Cupcakes, Cupcakes > Pull Apart Cupcakes, Same Day Cakes",
    variants: [
      { size: "14cm", price: 28900 },
      { size: "16cm", price: 36900 }
    ],
    attributes: [
      { name: "Pull Apart Set", value: "Double row, Single row", visible: true, global: true },
      { name: "Select Size", value: "14cm, 16cm", visible: true, global: true, default: "16cm" }
    ]
  },
  {
    id: "4988",
    name: "160cm Life sized Teddy. . . more",
    category: "TB",
    published: true,
    inStock: true,
    price: 180000,
    description: "Get the WOW effect with our 160cm super soft human sized teddy bear. This is great for hugging and snuggling. This human sized teddy bear is always smiling. Makes a perfect gift to send to someone special.",
    image: "https://www.zuzudelights.com/wp-content/uploads/2021/10/lifesized.jpg",
    subcategory: "Mother's Day > Gifts > Teddy Bears"
  },
  {
    id: "4997",
    name: "CUDDLES TEDDY",
    category: "TB",
    published: true,
    inStock: true,
    description: "Cute and Cuddly. It is a great companion for kids and cuddly adults alike.",
    image: "https://www.zuzudelights.com/wp-content/uploads/2024/03/1000246398.jpg",
    subcategory: "Mother's Day > Gifts > Teddy Bears",
    variants: [
      { size: "Entry 25cm", price: 20000 },
      { size: "Xsmall 30cm", price: 45000 },
      { size: "Small 40cm", price: 52000 },
      { size: "Medium 60cm", price: 72000 }
    ],
    attributes: [
      { name: "Select Size", value: "Entry Bouquet, Human sized, Moyenne Bouquet, Small Bouquet, Standard Bouquet, Xsmall Bouquet", visible: true, global: true, default: "Small Bouquet" }
    ]
  }
];
