"use client"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { ArrowLeft, Plus, Upload, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LinkButton } from "@/components/ui/linkButton"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useRouter } from "next/navigation"

const vendorSchema = z.object({
  name: z.string().min(1, "Vendor name is required"),
  businessName: z.string().min(1, "Business name is required"),
  phone: z.string().min(1, "Phone number is required"),
  address: z.string().min(1, "Address is required"),
  email: z.string().email("Invalid email address"),
  logo: z.any().optional(),
  products: z
    .array(
      z.object({
        name: z.string().min(1, "Product name is required"),
        branch: z.string().min(1, "Branch is required"),
        costPrice: z.string().min(1, "Cost price is required"),
      }),
    )
    .min(1, "At least one product is required"),
})

type VendorFormData = z.infer<typeof vendorSchema>

const branches = [
  { value: "zuzu-delight", label: "Zuzu Delight" },
  { value: "main-branch", label: "Main Branch" },
  { value: "lagos-branch", label: "Lagos Branch" },
]

export default function AddVendorPage() {
  const router = useRouter()

  const form = useForm<VendorFormData>({
    resolver: zodResolver(vendorSchema),
    defaultValues: {
      name: "",
      businessName: "",
      phone: "",
      address: "",
      email: "",
      products: [
        {
          name: "",
          branch: "",
          costPrice: "",
        },
      ],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "products",
  })

  const handleSubmit = (data: VendorFormData) => {
    console.log("Vendor data:", data)
    // Here you would typically save the vendor data
    router.push("/") // Navigate back to vendors list
  }

  const handleCancel = () => {
    form.reset()
    router.push("/") // Navigate back to vendors list
  }

  const addProduct = () => {
    append({
      name: "",
      branch: "",
      costPrice: "",
    })
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-6">
          <LinkButton variant="ghost" size="sm" href={"/inventory/vendors"} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </LinkButton>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
          <h1 className="text-2xl font-semibold text-gray-900">Add Vendor</h1>
        </div>

        <div className="flex items-center gap-3 mt-4">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="h-5 w-5 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold">Add Vendor</h2>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vendor Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter vendor name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="businessName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vendor Business Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter vendor business name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter email" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Logo Upload */}
            <div className="md:col-span-2">
              <FormLabel>Add Logo (800x800) 100KB</FormLabel>
              <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Click to upload logo</p>
              </div>
            </div>
          </div>

          {/* Product Bought Section */}
          <Accordion type="single" defaultValue="products" collapsible>
            <AccordionItem value="products">
              <AccordionTrigger className="text-lg font-semibold">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
                    <span className="text-xs text-blue-600">📦</span>
                  </div>
                  Product Bought
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-6">
                {fields.map((field, index) => (
                  <div key={field.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg">
                    <FormField
                      control={form.control}
                      name={`products.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Product Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter product name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`products.${index}.branch`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Branch</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select business branch" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {branches.map((branch) => (
                                <SelectItem key={branch.value} value={branch.value}>
                                  {branch.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`products.${index}.costPrice`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cost Price</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter amount" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {fields.length > 1 && (
                      <div className="md:col-span-3 flex justify-end">
                        <Button type="button" variant="destructive" size="sm" onClick={() => remove(index)}>
                          Remove Product
                        </Button>
                      </div>
                    )}
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  onClick={addProduct}
                  className="flex items-center gap-2 bg-transparent"
                >
                  <Plus className="h-4 w-4" />
                  Add Product
                </Button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6">
            <Button type="submit" className="flex-1 bg-black hover:bg-gray-800">
              Save Vendor
            </Button>
            <Button type="button" variant="outline" onClick={handleCancel} className="flex-1 bg-transparent">
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
