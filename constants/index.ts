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
        id: "cake-1",
        name: "Vanilla Cake",
        image: "/img/cake.png",
        category: "C"
    },
    {
        id: "cake-1",
        name: "Strawberry Cake",
        image: "/img/cake2.png",
        category: "C"
    },
    {
        id: "flower-1",
        name: "Rose Bouquet",
        image: "/img/flower1.webp",
        category: "F"
    },
    {
        id: "teddy-1",
        name: "Small Teddy",
        image: "/img/cake2.png",
        category: "TB"
    },
    {
        id: "teddy-1",
        name: "Small Teddy",
        image: "/img/flower2.webp",
        category: "TB"
    },
    {
        id: "chocolate-1",
        name: "Chocolate Cake",
        image: "/img/cake1.png",
        category: "C"
    },
    {
        id: "flower-1",
        name: "Rose Bouquet",
        image: null,
        category: "F"
    },
    {
        id: "teddy-1",
        name: "Small Teddy",
        image: null,
        category: "TB"
    },
    {
        id: "teddy-1",
        name: "Small Teddy",
        image: null,
        category: "TB"
    },
];

