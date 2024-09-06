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
    { id: "cake-1", name: "Vanilla Cake", image: "/img/cake.png", category: "C" },
    { id: "cake-2", name: "Strawberry Cake", image: "/img/cake2.png", category: "C" },
    { id: "flower-1", name: "Rose Bouquet", image: "/img/flower1.webp", category: "F" },
    { id: "teddy-1", name: "Small Teddy", image: "/img/cake2.png", category: "TB" },
    { id: "teddy-2", name: "Small Teddy", image: "/img/flower2.webp", category: "TB" },
    { id: "chocolate-1", name: "Chocolate Cake", image: "/img/cake1.png", category: "C" },
    { id: "flower-2", name: "Rose Bouquet", image: null, category: "F" },
    { id: "teddy-3", name: "Small Teddy", image: null, category: "TB" },
    { id: "teddy-4", name: "Small Teddy", image: null, category: "TB" },
    // New products added from the provided data
    {
      id: "4669",
      name: "Cake",
      image: null,
      category: "C",
      price: 17500,
      subcategory: "Occasions",
      published: false,
      inStock: false,
      description: ""
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
        { size: "6 inches", layers: [
          { layers: 3, price: 34000 },
          { layers: 4, price: 46000 },
          { layers: 5, price: 56500 }
        ]},
        { size: "8 inches", layers: [
          { layers: 3, price: 56000 },
          { layers: 4, price: 73500 },
          { layers: 5, price: 87500 }
        ]},
        { size: "10 inches", layers: [
          { layers: 3, price: 59000 },
          { layers: 4, price: 78000 },
          { layers: 5, price: 94000 }
        ]},
        { size: "12 inches", layers: [
          { layers: 3, price: 67500 },
          { layers: 4, price: 97000 },
          { layers: 5, price: 139500 }
        ]}
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
        { size: "6 inches", layers: [
          { layers: 3, price: 31000 },
          { layers: 4, price: 42500 },
          { layers: 5, price: 47000 }
        ]},
        { size: "8 inches", layers: [
          { layers: 3, price: 49500 },
          { layers: 4, price: 65500 },
          { layers: 5, price: 78500 }
        ]},
        { size: "10 inches", layers: [
          { layers: 3, price: 54500 },
          { layers: 4, price: 71000 },
          { layers: 5, price: 87500 }
        ]}
      ]
    }
  ];
