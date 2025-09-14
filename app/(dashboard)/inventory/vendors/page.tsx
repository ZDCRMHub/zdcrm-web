"use client"

import { useState } from "react"
import { Plus, RefreshCw, Edit, Trash2, User, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { VendorDetailSheet } from "./misc/components"

// Mock data for vendors
const mockVendors = [
  {
    id: 1,
    name: "Mary Jibrin",
    businessName: "JLK Ventures",
    email: "jlkventures@gmail.com",
    phone: "08162487755",
    address: "No. 2, Adeniran close, Lekki Epe",
    logo: "/generic-vendor-logo.png",
    products: [
      { name: "Vegetable Oil", branch: "Zuzu Delight", costAmount: "₦50,000.00" },
      { name: "Cake Fondant", branch: "Zuzu Delight", costPrice: "₦50,000.00" },
    ],
  },
  {
    id: 2,
    name: "Mary Jibrin",
    businessName: "JLK Ventures",
    email: "jlkventures@gmail.com",
    phone: "08162487755",
    address: "No. 2, Adeniran close, Lekki Epe",
    logo: "/generic-vendor-logo.png",
    products: [{ name: "Vegetable Oil", branch: "Zuzu Delight", costAmount: "₦50,000.00" }],
  },
  {
    id: 3,
    name: "Mary Jibrin",
    businessName: "JLK Ventures",
    email: "jlkventures@gmail.com",
    phone: "08162487755",
    address: "No. 2, Adeniran close, Lekki Epe",
    logo: "/generic-vendor-logo.png",
    products: [{ name: "Vegetable Oil", branch: "Zuzu Delight", costAmount: "₦50,000.00" }],
  },
]

export default function VendorsPage() {
  const [vendors, setVendors] = useState(mockVendors)
  const [selectedVendor, setSelectedVendor] = useState(null)
  const [isVendorDetailOpen, setIsVendorDetailOpen] = useState(false)

  const handleViewVendor = (vendor: any) => {
    setSelectedVendor(vendor)
    setIsVendorDetailOpen(true)
  }

  const handleRefresh = () => {
    // Simulate refresh
    console.log("Refreshing vendors...")
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
          <h1 className="text-2xl font-semibold text-gray-900">Vendors</h1>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={handleRefresh}
            className="flex items-center gap-2 text-green-600 border-green-200 hover:bg-green-50 bg-transparent"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <Link href="/add-vendor">
            <Button className="flex items-center gap-2 bg-black hover:bg-gray-800">
              <Plus className="h-4 w-4" />
              Add Vendor
            </Button>
          </Link>
        </div>
      </div>

      {/* Vendors Grid */}
      {vendors.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Package className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">NOTHING TO SEE HERE</h3>
          <p className="text-gray-500 mb-6">You would need to vendor details</p>
          <Link href="/add-vendor">
            <Button className="bg-blue-600 hover:bg-blue-700">ADD A VENDOR</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vendors.map((vendor) => (
            <Card key={vendor.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{vendor.name}</h3>
                      <Badge variant="secondary" className="text-green-600 bg-green-50">
                        Vendor
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Vendor Business Name</span>
                    <span className="text-gray-900 font-medium">{vendor.businessName}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Address</span>
                    <span className="text-gray-900 text-right max-w-[200px] truncate">{vendor.address}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Phone Number</span>
                    <span className="text-gray-900">{vendor.phone}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Email</span>
                    <span className="text-gray-900 truncate max-w-[200px]">{vendor.email}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Product Sold</span>
                    <span className="text-gray-900">{vendor.products[0]?.name || "N/A"}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <button
                    onClick={() => handleViewVendor(vendor)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Vendor Detail Sheet */}
      <VendorDetailSheet
        vendor={selectedVendor}
        isOpen={isVendorDetailOpen}
        onClose={() => setIsVendorDetailOpen(false)}
      />
    </div>
  )
}
