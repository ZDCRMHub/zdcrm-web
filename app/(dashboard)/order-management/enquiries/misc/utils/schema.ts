import { z } from "zod";

const inventorySchema = z.object({
    stock_inventory_id: z.number().optional(),
    product_inventory_id: z.number().optional(),
    message: z.string().optional(),
    instruction: z.string().optional(),
    quantity_used: z.number().optional(),
    variations: z.array(z.object({
        stock_variation_id: z.number(),
        quantity: z.number().min(1)
    })),
    custom_image: z.string().url().optional(),
    properties: z.object({
        layers: z.string().optional(),
        toppings: z.string().optional(),
        bouquet: z.string().optional(),
        glass_vase: z.string().optional(),
        whipped_cream_upgrade: z.boolean().optional()
    })
}).refine(
    (data) => data.stock_inventory_id != null || data.stock_inventory_id != undefined || data.product_inventory_id != null || data.product_inventory_id != undefined,
    {
        message: "Either stock_inventory_id or product_inventory_id must be provided",
        path: ["stock_inventory_id", "product_inventory_id"],
    }
)

const itemSchema = z.object({
    category: z.number({ message: "Category is required" }),
    product_id: z.number({ message: "Product type is required" }),
    quantity: z.number().min(1),
    inventories: z.array(inventorySchema),
    miscellaneous: z.array(z.object({
        description: z.string().min(1, { message: "Description is required" }),
        cost: z.string().min(1, { message: "Miscellaneous cost is required" })
    })).optional()
}).refine(
    (data) => {
        if (data.category == 8) {
            return data.inventories.every((inventory) => {
                if (inventory.properties.toppings && inventory.properties.layers) {
                    return true;
                }
                return false;
            });
        }
        return true
    },
    {
        message: "Toppings and layers must be provided for Cakes",
        path: ['inventories']
    }
);

export const NewEnquirySchema = z.object({
    customer: z.object({
        name: z.string().min(1, { message: "Customer's name is required" }),
        phone: z.string().min(1, { message: "Customer's phone number is required" }),
        email: z.string().email().optional()
    }),
    delivery: z.object({
        zone: z.enum(["LM", "LC", "LI"], { message: "Delivery zone is required" }),
        note: z.string().optional(),
        delivery_time: z.string(),
        delivery_date: z.string({ message: "Delivery date is required" }),
        method: z.enum(["Dispatch", "Pickup"], { message: "Delivery method is required" }),
        dispatch: z.number().optional(),
        address: z.string().min(1, { message: "Delivery address is required" }),
        recipient_name: z.string().min(1, { message: "Recipient's name is required" }),
        recipient_phone: z.string().min(1, { message: "Recipient's phone number is required" })
    }),
    enquiry_channel: z.string().min(1, { message: "Enquiry channel is required" }),
    social_media_details: z.string().optional(),
    enquiry_occasion: z.string().min(1, { message: "Enquiry occasion is required" }),
    branch: z.number({ message: "Select a branch" }),
    message: z.string().optional(),
    items: z.array(itemSchema)
});

export type NewEnquiryFormValues = z.infer<typeof NewEnquirySchema>;

