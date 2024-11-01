import { CATEGORIES_OPTIONS, PAYMENT_METHODS, PAYMENT_STATUS_OPTIONS, PRODUCT_TYPES_OPTIONS } from "@/constants";
import { z } from "zod";

const baseItemSchema = z.object({
    category: z.enum(CATEGORIES_OPTIONS.map(category => category.value) as [string, ...string[]], { message: "Category is required" }),
    productType: z.string().min(1),
    quantity: z.number().min(1),
    message: z.string().optional(),
    isCustomOrder: z.boolean().optional(),
    itemImage: z.instanceof(File).optional(),
    isEditing: z.boolean().optional(),
    additionalItems: z.array(z.object({
        name: z.string().min(1, { message: "Name is required" }),
        // quantity: z.number().min(1, { message: "Quantity must be at least 1" }),
        cost: z.string().min(1, { message: "Price is required" }),
    })).optional(),
    instruction: z.string().optional(),
});

const cakeSchema = baseItemSchema.extend({
    category: z.literal("C"),
    layers: z.enum(PRODUCT_TYPES_OPTIONS.Cakes.layers.map(layer => layer.value) as [string, ...string[]], { message: "Please select no of layers" }),
    flavours: z.array(z.enum(PRODUCT_TYPES_OPTIONS.Cakes.flavours.map(flavour => flavour.value) as [string, ...string[]], { message: "Select preferred flavour" })),
    // flavour: z.enum(PRODUCT_TYPES_OPTIONS.Cakes.flavours.map(flavour => flavour.value) as [string, ...string[]], { message: "Select preferred flavour" }),
    toppings: z.enum(PRODUCT_TYPES_OPTIONS.Cakes.toppings.map(topping => topping.value) as [string, ...string[]], { message: "Topping is required" }),
    sizes: z.array(z.enum(PRODUCT_TYPES_OPTIONS.Cakes.flavours.map(size => size.value) as [string, ...string[]], { message: "Select at least one size" })),
    whippedCreamUpgrade: z.enum(PRODUCT_TYPES_OPTIONS.Cakes.whippedCreamUpgrade.map(whippedCream => whippedCream.value) as [string, ...string[]], { message: "Whipped cream upgrade is required" }),
});

const flowerSchema = baseItemSchema.extend({
    category: z.literal("F"),
    vase: z.enum(["none", "25cm", "50cm"]),
});


const teddyBearSchema = baseItemSchema.extend({
    category: z.literal("TB"),
    sizes: z.array(z.enum(PRODUCT_TYPES_OPTIONS.Teddies.sizes.map(size => size.value) as [string, ...string[]], { message: "Select at least one size" })),
    bouquet: z.enum(PRODUCT_TYPES_OPTIONS.Teddies.bouquets.map(bouquet => bouquet.value) as [string, ...string[]]),
});

const itemSchema = z.discriminatedUnion("category", [
    cakeSchema,
    flowerSchema,
    teddyBearSchema
]);


export type NewOrderFormValues = z.infer<typeof NewOrderSchema>;

export const NewOrderSchema = z.object({
    branch: z.enum(["Zuzu Delights", "Prestige Flowers"], { message: "Branch is required" }),
    customerName: z.string().min(1, { message: "Customer's name is required" }),
    customerPhone: z.string().min(1, { message: "Customer's phone number is required" }),
    enquiryChannel: z.string({ message: "Invalid enquiry channel" }),
    recipientName: z.string().min(1, { message: "Recipient's name is required" }),
    recipientPhone: z.string().min(1, { message: "Recipient's phone number is required" }),
    enquiryOccasion: z.string().min(1, { message: "Enquiry occasion is required" }),
    isCustomDelivery: z.boolean(),
    deliveryNote: z.string().optional(),
    messageOnOrder: z.string().optional(),
    deliveryDate: z.date(),
    deliveryMethod: z.enum(["Dispatch", "Pickup"], { message: "Delivery method is required" }),
    deliveryAddress: z.string().min(1, { message: "Delivery address is required" }),
    deliveryZone: z.enum(["Lagos Mainland (LM)", "Lagos Central (LC)", "Lagos Island (LI)"], { message: "Delivery zone is required" }),
    paymentMode: z.enum([...(PAYMENT_METHODS.map(method => method.value) as [string, ...string[]])], { message: "Payment status is required" }),
    paymentStatus: z.enum([...(PAYMENT_STATUS_OPTIONS.map(method => method.value) as [string, ...string[]])], { message: "Payment mode is required" }),
    proofOfPayment: z.instanceof(File).refine(file => file.size <= 5 * 1024 * 1024, { message: "File size should be less than 5MB" }),
    deliveryFee: z.string().optional(),
    dispatchTime: z.string().optional(),
    items: z.array(itemSchema),

}).refine((data) => {
    const errors = [];

    if (data.isCustomDelivery) {
        if (!data.deliveryFee) {
            errors.push({
                path: ["deliveryFee"],
                message: "Delivery fee is required for custom delivery",
                code: "custom" as const
            });
        }
    }

    if (!data.isCustomDelivery) {
        if (!data.deliveryMethod) {
            errors.push({
                path: ["deliveryMethod"],
                message: "Delivery method is required when not using custom delivery",
                code: "custom" as const
            });
        }
    }

    if (data.items.length === 0) {
        errors.push({
            path: ["items"],
            message: "At least one item is required",
            code: "custom" as const
        });
    }

    if (errors.length > 0) {
        throw new z.ZodError(errors);
    }

    return true;
});
