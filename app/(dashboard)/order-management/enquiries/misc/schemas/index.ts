import { BRANCH_OPTIONS, PRODUCT_TYPES_OPTIONS } from "@/constants";
import { z } from "zod";



// branch: z.enum(["Zuzu Delights", "Prestige Flowers"], { message: "Branch is required" }),
// isCustomOrder: z.boolean().optional(),
// itemImage: z.instanceof(File).optional(),
// category: z.enum(CATEGORIES_OPTIONS.map(cat => cat.value) as [string, ...string[]], { message: "Category is required" }),
// productType: z.string().min(1, { message: "Product type is required" }),
// productSize: z.string().optional(),
// quantity: z.number().min(1, { message: "Quantity must be at least 1" }),
// message: z.string().optional(),
// isEditing: z.boolean().optional(),
// layers: z.enum(["2", "3", "4", "5"]).optional(),
// flavour: z.enum(["vanilla", "chocolate", "red velvet"]).optional(),
// whippedCreamUpgrade: z.enum(["true", "false"]).optional(),
// toppings: z.enum(["none", "chocolate", "fruits", "mixed"]).optional(),
// vase: z.enum(["none", "25cm", "50cm"]).optional(),
// size: z.enum(["8 inches", "10 inches", "12 inches"]).optional(),
// bouquet: z.enum(["entry", "xsmall", "small", "medium", "standard", "human"]).optional(),
// additionalItems: z.array(z.object({
  //     name: z.string().min(1, { message: "Name is required" }),
  //     quantity: z.number().min(1, { message: "Quantity must be at least 1" }),
  //     cost: z.string().min(1, { message: "Price is required" }),
  // })).optional(),
  const cakeSchema = z.object({
    branch:  z.enum(BRANCH_OPTIONS.map(cat => cat.value) as [string, ...string[]], { message: "Branch is required" }),
    layers: z.enum(PRODUCT_TYPES_OPTIONS.Cakes.layers.map(layer => layer.value) as [string, ...string[]]),
    toppings: z.enum(PRODUCT_TYPES_OPTIONS.Cakes.toppings.map(topping => topping.value) as [string, ...string[]]),
    flavour: z.enum(PRODUCT_TYPES_OPTIONS.Cakes.flavours.map(flavour => flavour.value) as [string, ...string[]]),
    size: z.enum(PRODUCT_TYPES_OPTIONS.Cakes.sizes.map(size => size.value) as [string, ...string[]]),
    whippedCreamUpgrade: z.enum(["true", "false"]),
  // whippedCreamUpgrade: z.boolean().optional(),
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
  console.log("category", category);
  switch (category) {
    case "C":
      return cakeSchema;
    case "F":
      return flowersSchema;
    case "TB":
      return teddySchema;
    default:
      return z.object({});
  }
};
