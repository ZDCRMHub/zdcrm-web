import { TCategory } from "@/app/(dashboard)/inventory/misc/types";




export interface TProductItem {
  id: number;
  name: string;
  category: Category;
  external_id: string;
  is_active: boolean;
  image: string;
  variations: Variation[];
  created_by: Recentlyupdatedby;
  create_date: string;
  update_date: string;
}

interface Variation {
  id: number;
  size: string;
  layer: null;
  max_flowers: null;
  cost_price: string;
  selling_price: string;
  quantity: number;
  recently_updated_by: Recentlyupdatedby;
}

interface Recentlyupdatedby {
  id: number;
  email: string;
  name: string;
  phone: string;
  image: null;
}

interface Category {
  id: number;
  name: string;
  type: string;
  create_date: string;
  update_date: string;
}


export interface PaginatedResponse<T> {
    data: TProductItem[];
    next_page: number | null;
    previous_page: number | null;
    number_of_pages: number;
    count: number;
  }
  
  export interface ProductsQueryParams {
    paginate?: boolean;
    page?: number;
    size?: number;
    search?: string;
    category?: string;
    is_active?: boolean;
  }



  import { z } from "zod"

  const imageSchema = z
    .object({
      file: z.instanceof(File).nullable().optional(),
      url: z.string().optional(),
    })
    .refine((data) => data.file || data.url, {
      message: "Either an image file or URL must be provided",
      path: ["file"],
    })
  
  const baseVariationSchema = z.object({
    id: z.number().optional(),
    size: z.string().min(1, "Size is required"),
    layer: z.string().optional(),
    max_flowers: z.number().optional(),
    cost_price: z.string().min(1, "Cost price is required"),
    selling_price: z.string().min(1, "Selling price is required"),
  })
  
  // Define the product schema with custom refinement for field-specific errors
  export const productSchema = z
    .object({
      name: z.string().min(1, "Product name is required"),
      category_id: z.number().min(1, "Category is required"),
      category_name: z.string().optional(), // This won't be submitted to the backend
      external_id: z.string().optional(),
      is_active: z.boolean().default(true),
      image: imageSchema,
      variations: z.array(baseVariationSchema).min(1, "At least one variation is required"),
    })
    .superRefine((data, ctx) => {
      // Check each variation individually and add specific path errors
      data.variations.forEach((variation, index) => {
        // For cake category, validate layer
        if (data.category_name?.toLowerCase().includes("cake")) {
          if (!variation.layer || variation.layer.trim() === "") {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Layer is required for Cake products",
              path: [`variations.${index}.layer`],
            })
          }
        }
  
        // For flower category, validate max_flowers
        if (data.category_name?.toLowerCase().includes("flower")) {
          if (variation.max_flowers === undefined || variation.max_flowers === null) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Max flowers is required for Flower products",
              path: [`variations.${index}.max_flowers`],
            })
          }
        }
      })
    })
  
  export type ProductFormType = z.infer<typeof productSchema>
  

  export const productListItemSchema = z.object({
    id: z.number(),
    name: z.string(),
    category_id: z.number(),
    external_id: z.string().optional(),
    is_active: z.boolean(),
    image: z.string().optional(),
    selling_price: z.string(),
    category: z.object({
      id: z.number(),
      name: z.string(),
    }),
  })

  export type ProductListItem = z.infer<typeof productListItemSchema>
