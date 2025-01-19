import { z } from "zod";

const propertiesSchema = z.object({
    layers: z.string().optional(),
    toppings: z.string().optional(),
    bouquet: z.string().optional(),
    glass_vase: z.string().optional(),
    whipped_cream_upgrade: z.boolean().optional()
}).optional();

const variationSchema = z.object({
    stock_variation_id: z.number(),
    quantity: z.number().min(1)
});

const inventorySchema = z.object({
    stock_inventory_id: z.number().optional(),
    product_inventory_id: z.number().optional(),
    message: z.string().optional(),
    instruction: z.string().optional(),
    quantity_used: z.number().optional(),
    variations: z.array(variationSchema).optional(),
    custom_image: z.string().url().optional(),
    properties: propertiesSchema
}).nullable();

const itemSchema = z.object({
    category: z.number({ message: "Category is required" }),
    product_id: z.number({ message: "Product type is required" }),
    quantity: z.number().min(1),
    inventories: z.array(inventorySchema),
    miscellaneous: z.array(z.object({
        description: z.string().min(1, { message: "Description is required" }),
        cost: z.string().min(1, { message: "Miscellaneous cost is required" })
    })).optional()
}).superRefine((data, ctx) => {
    if (data.product_id && data.product_id == 0) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Product type is required",
        });
    }
    data.inventories.forEach((inventory, index) => {
        if (inventory === null) return; // Skip validation for null inventories

        if ([8, 9, 10].includes(data.category)) {
            if (inventory.stock_inventory_id == null) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Stock inventory ID is required for this category",
                    path: [`inventories.${index}.stock_inventory_id`]
                });
            }
        } else {
            if (inventory.product_inventory_id == null) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Product inventory ID is required for this category",
                    path: [`inventories.${index}.product_inventory_id`]
                });
            }
        }

        if (data.category === 8 && inventory.properties) {
            if (!inventory.properties.toppings) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Toppings must be provided for Cakes",
                    path: [`inventories.${index}.properties.toppings`]
                });
            }
            if (!inventory.properties.layers) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Layers must be provided for Cakes",
                    path: [`inventories.${index}.properties.layers`]
                });
            }
        }
    });
});
export const MAX_FILE_SIZE = 10000000;

export const NewOrderSchema = z.object({
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
        dispatch: z.string().optional(),
        address: z.string().min(1, { message: "Delivery address is required" }),
        recipient_name: z.string().min(1, { message: "Recipient's name is required" }),
        recipient_phone: z.string().min(1, { message: "Recipient's phone number is required" })
    }),
    enquiry_channel: z.string().min(1, { message: "Enquiry channel is required" }),
    social_media_details: z.string().optional(),
    enquiry_occasion: z.string().min(1, { message: "Enquiry occasion is required" }),
    branch: z.number({ message: "Select a branch" }),
    message: z.string().optional(),
    items: z.array(itemSchema).min(1, { message: "At least one item is required" }),
    payment_status: z.enum(["UP", "FP", "PP"]),
    payment_options: z.enum([
        "not_paid_go_ahead",
        "paid_website_card",
        "paid_naira_transfer",
        "paid_pos",
        "paid_usd_transfer",
        "paid_paypal",
        "cash_paid",
        "part_payment_cash",
        "part_payment_transfer",
        "paid_bitcoin",
        "not_received_paid"
    ]),
    // payment_proof: z.string().url().optional().nullable(),
    payment_proof: z.any().nullable().refine(
        file => {
            if (!file) {
                throw z.ZodError.create([{
                    path: ['payment_proof'],
                    message: 'Please select a file.',
                    code: 'custom',
                }]);
            }
            if (!file.type.startsWith('application/pdf') && !file.type.startsWith('image/')) {
                throw z.ZodError.create([{
                    path: ['payment_proof'],
                    message: 'Please select a PDF or image file.',
                    code: 'custom',
                }]);
            }
            return file.size <= MAX_FILE_SIZE;
        },

        {
            message: 'Max file size is 10MB.',
        }
    ),
    payment_receipt_name: z.string().optional(),
    payment_currency: z.enum(["NGN", "USD"]),
    amount_paid_in_usd: z.string().regex(/^\d+(\.\d{1,2})?$/).optional(),
    initial_amount_paid: z.string().regex(/^\d+(\.\d{1,2})?$/).optional(),
}).superRefine((data, ctx) => {
    if ((data.payment_options === "part_payment_cash" || data.payment_options === "part_payment_transfer") && !data.initial_amount_paid) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Enter initial amount paid",
            path: ["initial_amount_paid"]
        });
    }
    if (
        (data.payment_options === "paid_usd_transfer" ||
            data.payment_options === "paid_paypal" ||
            data.payment_options === "paid_bitcoin") &&
        !data.amount_paid_in_usd
    ) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Enter amount paid in USD",
            path: ["amount_paid_in_usd"]
        });
    }
});

export type NewOrderFormValues = z.infer<typeof NewOrderSchema>;

