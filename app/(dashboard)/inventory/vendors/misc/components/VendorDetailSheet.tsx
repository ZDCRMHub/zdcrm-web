"use client"
import { ArrowLeft, Package } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface VendorDetailSheetProps {
  vendor: any
  isOpen: boolean
  onClose: () => void
}

export default function VendorDetailSheet({ vendor, isOpen, onClose }: VendorDetailSheetProps) {
  if (!vendor) return null

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full max-w-2xl overflow-y-auto">
        <SheetHeader className="space-y-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onClose} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              VENDOR DETAILS
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-red-600 font-bold text-lg">M</span>
            </div>
            <div>
              <SheetTitle className="text-xl font-semibold">{vendor.businessName}</SheetTitle>
              <p className="text-gray-500">{vendor.email}</p>
            </div>
          </div>
        </SheetHeader>

        <div className="space-y-6 mt-8">
          {/* Details Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-[120px,1fr] gap-4 text-sm">
                <span className="text-gray-500">Vendor Name</span>
                <span className="text-gray-900 font-medium">{vendor.name}</span>

                <span className="text-gray-500">Phone Number</span>
                <span className="text-gray-900">{vendor.phone}</span>

                <span className="text-gray-500">Address</span>
                <span className="text-gray-900">{vendor.address}</span>
              </div>
            </CardContent>
          </Card>

          {/* Product Bought Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Product Bought</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {vendor.products?.map((product: any, index: number) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Package className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{product.name}</h4>
                    </div>
                  </div>

                  <div className="ml-13 space-y-2 text-sm">
                    <div className="grid grid-cols-[80px,1fr] gap-4">
                      <span className="text-gray-500">Branch</span>
                      <span className="text-gray-900 font-medium">{product.branch}</span>

                      <span className="text-gray-500">Cost Amount</span>
                      <span className="text-gray-900 font-medium">{product.costAmount || product.costPrice}</span>
                    </div>
                  </div>

                  {index < vendor.products.length - 1 && <Separator className="my-4" />}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Close Button */}
          <div className="flex justify-end pt-6">
            <Button onClick={onClose} className="px-8">
              Close
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
