"use client"

import React, { useState, useEffect } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import Image from "next/image"
import { SearchIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import type { TStockInventoryItem, TStockVariation } from "@/app/(dashboard)/inventory/misc/types/stock"
import FormError from "@/components/ui/formError"
import type { orderItemSchema } from "../utils/schema"
import type { z } from "zod"
import { enquiryItemSchema } from "../../enquiries/misc/utils/schema"

export type orderItemType = z.infer<typeof orderItemSchema>
export type enquiryItemType = z.infer<typeof enquiryItemSchema>
type InventoryType = enquiryItemType["inventories"] | orderItemType["inventories"]

// type VariationsType = NonNullable<InventoryType>[number]["variations"]

interface OrderFormStockInventorySelectorProps {
    options: TStockInventoryItem[]
    inventories: InventoryType
    setInventories: (inventories: InventoryType) => void
    isLoadingOptions?: boolean
    isFetchingOptions: boolean
    disabled?: boolean
    hasError: boolean
    errorMessage?: string
}

const OrderFormStockInventorySelector: React.FC<OrderFormStockInventorySelectorProps> = ({
    options,
    isLoadingOptions,
    isFetchingOptions,
    disabled,
    inventories,
    setInventories,
    hasError,
    errorMessage,
}) => {
    const [open, setOpen] = useState(false)
    const [searchText, setSearchText] = useState("")
    const [filteredOptions, setFilteredOptions] = useState(options)

    // Set selected inventory when inventoryId changes externally
    useEffect(() => {
        // Set selected variations based on current inventories state
        inventories?.forEach((inventory) => {
            const inv = options?.find((o) => o.id === inventory?.stock_inventory_id) || null

            if (inv && inventory?.variations && inventory?.variations?.length > 0) {
                const currentVariations = inv.variations.filter((v) =>
                    inventory?.variations?.some(
                        (variation) => variation.stock_variation_id === v.id,
                    ),
                )
            }
        })
    }, [options, inventories])

    // Filter options by search
    useEffect(() => {
        setFilteredOptions(options?.filter((option) => option.name.toLowerCase().includes(searchText.toLowerCase())))
    }, [searchText, options])

    // Handle selecting/deselecting a variation
    const handleSelect = (variation: TStockVariation) => {
        console.log(inventories, " inventories before selection change")
        const isDefaultInventoryExist = (inventories?.length === 1) && !inventories?.[0]?.variations?.length && !inventories?.[0]?.stock_inventory_id && !inventories?.[0]?.stock_inventory_id

        const selectedOption = options?.find((option) => option.variations.some((vari) => vari.id === variation.id))

        // Find the inventory that contains this variation, or create a new one
        let updatedInventories = isDefaultInventoryExist ? [] : [...(inventories || [])]
        const inventoryIndex = updatedInventories?.findIndex((inv) => inv?.stock_inventory_id === (selectedOption?.id || 0))

        if (inventoryIndex === -1) {
            // Create new inventory
            updatedInventories?.push({
                product_inventory_id: undefined,
                stock_inventory_id: selectedOption?.id || 0,
                variations: [
                    {
                        product_inventory_variation_id: undefined,
                        stock_variation_id: variation.id,
                        quantity: 1,
                    },
                ],
            })
        } else {
            // Inventory exists, update variations
            const existingInventory = updatedInventories[inventoryIndex]
            if (!existingInventory) return
            const variationIndex = existingInventory.variations?.findIndex(
                (v) => v.stock_variation_id === variation.id,
            )

            if (variationIndex === -1) {
                // Add variation
                existingInventory.variations = [
                    ...(existingInventory.variations ?? []),
                    {
                        product_inventory_variation_id: undefined,
                        stock_variation_id: variation.id,
                        quantity: 1,
                    },
                ]
            } else {
                // Remove variation
                existingInventory.variations = existingInventory.variations?.filter(
                    (v) => v.stock_variation_id !== variation.id,
                )

                // If no variations left, remove inventory
                if (existingInventory.variations?.length === 0) {
                    updatedInventories = updatedInventories?.filter((_, i) => i !== inventoryIndex)
                } else {
                    updatedInventories[inventoryIndex] = existingInventory
                }
            }
        }

        setInventories(updatedInventories)
    }

    // Get current quantity for selected variation from inventories state
    const getQuantityForVariation = (variationId: number) => {
        if (!inventories || inventories.length === 0) return 1
        for (const inventory of inventories) {
            const v = inventory?.variations?.find((v) => v.stock_variation_id === variationId)
            if (v) return v.quantity || 1
        }
        return 1
    }

    // Update quantity for selected variation inside inventories state
    const updateQuantityForVariation = (variationId: number, quantity: number) => {
        if (quantity < 1) quantity = 1
        const updatedInventories = Array.isArray(inventories) ? [...inventories] : []

        for (let i = 0; i < updatedInventories?.length; i++) {
            const inventory = updatedInventories[i]
            const idx = inventory?.variations?.findIndex((v) => v.stock_variation_id === variationId)

            if (idx !== -1) {
                // Update existing
                if (inventory && inventory.variations && idx !== undefined && idx > -1) {
                    inventory.variations[idx] = {
                        ...inventory.variations[idx],
                        quantity,
                    }
                    updatedInventories[i] = inventory
                    setInventories(updatedInventories)
                    return
                }
            }
        }
    }

    const getSelectedVariations = () => {
        const selectedVariations: TStockVariation[] = []
        inventories?.forEach((inventory) => {
            const inv = options?.find((o) => o.id === inventory?.stock_inventory_id)
            inventory?.variations?.forEach((variation) => {
                const v = inv?.variations.find((v) => v.id === variation.stock_variation_id)
                if (v) selectedVariations.push(v)
            })
        })
        return selectedVariations
    }

    return (
        <div>
            <Popover open={open} onOpenChange={setOpen}>
                <div className="flex flex-col gap-2">
                    <Label className="text-sm text-[#0F172B] font-poppins font-medium">Stock</Label>
                    <PopoverTrigger asChild>
                        <Button
                            variant="inputButton"
                            size="inputButton"
                            className={cn(
                                "flex w-full items-center justify-between gap-2 text-left text-sm transition duration-300",
                                isFetchingOptions || isLoadingOptions || (disabled && "!text-[#A4A4A4]"),
                            )}
                            type="button"
                            role="combobox"
                            aria-expanded={open}
                            disabled={isLoadingOptions || isFetchingOptions || disabled}
                        >
                            <span className="!overflow-hidden text-sm w-full truncate">
                                {isLoadingOptions || isFetchingOptions
                                    ? "Loading options?..."
                                    : options?.length === 0
                                        ? "No inventory found"
                                        : (inventories?.length || 0) > 0
                                            ? inventories?.length === 1
                                                ? `${options?.find((o) => o.id === inventories?.[0]?.stock_inventory_id)?.name} (${inventories?.[0]?.variations?.length} variations)`
                                                : `${getSelectedVariations().length} variations selected`
                                            : "Select inventory"}
                            </span>
                            <svg
                                className={cn("ml-2 h-4 w-4 shrink-0 opacity-50", open && "rotate-180")}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </Button>
                    </PopoverTrigger>
                    {hasError && <FormError errorMessage={errorMessage} />}
                </div>
                <PopoverContent className="w-full p-0">
                    <div className="relative px-3 py-2">
                        <SearchIcon className="absolute left-4 top-3 h-4 w-4 text-gray-500" />
                        <input
                            className="w-full rounded-md border border-gray-300 bg-transparent py-2 pl-10 pr-4 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Search products..."
                            type="text"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                    </div>
                    {
                        searchText.trim() !== "" && filteredOptions?.length === 0 ? (
                            <p className="text-xs text-[#8B909A] text-center w-full py-4 col-span-full">No inventory found</p>
                        )
                            :
                            (
                                <div className="grid grid-cols-2 xl:grid-cols-3 min-w-max h-max min-h-[16rem] max-h-[30rem] overflow-scroll overflow-y-auto">
                                    {filteredOptions?.map((option) => (
                                        <React.Fragment key={option.id}>
                                            {option.variations.map((variation) => (
                                                <button
                                                    key={variation.id}
                                                    className={cn(
                                                        "flex flex-col items-center gap-2 p-2 hover:bg-gray-100 transition-colors relative",
                                                        getSelectedVariations().some((v) => v.id === variation.id) &&
                                                        "bg-blue-100 border-2 border-blue-500",
                                                    )}
                                                    onClick={() => handleSelect(variation)}
                                                >
                                                    {getSelectedVariations().some((v) => v.id === variation.id) && (
                                                        <div className="absolute top-1 right-1 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                                            ✓
                                                        </div>
                                                    )}
                                                    <div className="relative bg-white-grey w-[150px] aspect-square rounded-xl">
                                                        {typeof option.image_one === "string" ? (
                                                            <Image
                                                                src={(option.image_one as string) || "/placeholder.svg"}
                                                                alt={option.name as string}
                                                                className="w-full h-full object-cover text-xs"
                                                                fill
                                                            />
                                                        ) : null}
                                                    </div>
                                                    <span className="text-xs">
                                                        {option.name} - {variation.size || variation.color || variation.flavour}
                                                    </span>
                                                </button>
                                            ))}
                                        </React.Fragment>
                                    ))}
                                </div>
                            )}
                </PopoverContent>
            </Popover>

            <div className="mt-4 px-4">
                {
                    (inventories?.length ?? 0) > 0 && (
                        <div className="space-y-3">
                            <Label className="text-sm font-medium">Selected Variations & Quantities</Label>
                            {
                                inventories?.map((inventory) => {
                                    const product = options?.find((o) => o.id === inventory?.stock_inventory_id)
                                    return inventory?.variations?.map((variation) => {
                                        const v = product?.variations.find((v) => v.id === variation.stock_variation_id)
                                        return (
                                            <div
                                                key={variation.stock_variation_id}
                                                className="flex items-center justify-between p-2 bg-gray-50 rounded"
                                            >
                                                <span className="text-sm">
                                                    {product?.name} - {v?.color || v?.size || v?.flavour}
                                                </span>
                                                <div className="flex items-center gap-2">
                                                    <Label htmlFor={`quantity-${variation.stock_variation_id}`} className="text-xs">
                                                        Qty:
                                                    </Label>
                                                    <input
                                                        id={`quantity-${variation.stock_variation_id}`}
                                                        type="number"
                                                        min={1}
                                                        value={getQuantityForVariation(variation.stock_variation_id || 1)}
                                                        onChange={(e) =>
                                                            updateQuantityForVariation((variation.stock_variation_id || 1), Number(e.target.value))
                                                        }
                                                        className="w-16 rounded border border-gray-300 px-2 py-1 text-sm"
                                                        disabled={disabled}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => handleSelect(v!)}
                                                        className="text-red-500 hover:text-red-700 text-xs"
                                                        disabled={disabled}
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    })
                                })
                            }
                        </div>
                    )}
            </div>
        </div>
    )
}

export default OrderFormStockInventorySelector
