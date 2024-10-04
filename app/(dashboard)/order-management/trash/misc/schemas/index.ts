import { z } from "zod";

// Base schema
const schema = z.object({
  customerName: z.string().min(1, { message: "Customer's name is required" }),
  customerPhone: z.string().min(1, { message: "Customer's phone number is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  recipientName: z.string().min(1, { message: "Recipient's name is required" }),
  recipientPhone: z.string().min(1, { message: "Recipient's phone number is required" }),
  enquiryOccasion: z.string().min(1, { message: "Enquiry occasion is required" }),
  deliveryNote: z.string().optional(),
  deliveryDate: z.date(),
  
  // Items array containing dynamic product details
  items: z.array(z.object({
    category: z.enum(["cake", "flowers", "teddy"], { message: "Category is required" }),
    productType: z.string().min(1, { message: "Product type is required" }),
    quantity: z.number().min(1, { message: "Quantity must be at least 1" }),
    message: z.string().optional(),
    isEditing: z.boolean().optional(),
    // We'll dynamically merge the category-specific fields here
  }).refine((item) => {
    // Dynamically validate based on the category
    const dynamicValidation = getSchemaForCategory(item.category);
    return dynamicValidation.safeParse(item).success;
  }, { message: "Invalid product details for the selected category" }))
});

// Category-specific schemas
const cakeSchema = z.object({
  layers: z.number().min(1, "Must have at least 1 layer").optional(),
  flavour: z.enum(["vanilla", "chocolate", "red velvet"]).optional(),
  whippedCreamUpgrade: z.boolean().optional(),
  toppings: z.enum(["none", "chocolate", "fruits", "mixed"]).optional(),
});

const flowersSchema = z.object({
  vase: z.enum(["none", "25cm", "50cm"]).optional(),
});

const teddySchema = z.object({
  size: z.enum(["entry", "xsmall", "small", "medium"]),
  bouquet: z.enum(["entry", "xsmall", "small", "medium", "standard", "human"]),
});

// Function to dynamically select the schema for the category
export const getSchemaForCategory = (category: string) => {
  switch (category) {
    case "cake":
      return cakeSchema;
    case "flowers":
      return flowersSchema;
    case "teddy":
      return teddySchema;
    default:
      return z.object({});
  }
};

// Example usage
const formData = {
  customerName: "John Doe",
  customerPhone: "1234567890",
  email: "john@example.com",
  recipientName: "Jane Doe",
  recipientPhone: "0987654321",
  enquiryOccasion: "Birthday",
  deliveryNote: "Leave at the door",
  deliveryDate: new Date(),
  items: [
    {
      category: "cake",
      productType: "birthday cake",
      productSize: "medium",
      quantity: 2,
      layers: 3,
      flavour: "vanilla",
      whippedCreamUpgrade: true,
      toppings: "chocolate",
      isEditing: false
    }
  ]
};

// Perform validation
const validation = schema.safeParse(formData);

if (!validation.success) {
  console.log(validation.error.errors);
} else {
  console.log("Form validation successful", validation.data);
}
