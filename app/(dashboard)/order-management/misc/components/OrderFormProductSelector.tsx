'use client'

import * as React from "react"
import { CheckIcon, SearchIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { convertKebabAndSnakeToTitleCase } from "@/utils/strings"
import { SmallSpinner } from "@/icons/core"

import { Button, buttonVariants, Popover, PopoverContent, PopoverTrigger } from "@/components/ui"
import { Label } from "@/components/ui/label"
import FormError from "@/components/ui/formError"
import { VariantProps } from "class-variance-authority"
import { ProductsAPIReponse } from "@/app/(dashboard)/inventory/misc/api/getProducts"


type CustomLabelFormat = string | ((item: any) => string);

export function generateCustomLabel(item: any, format: CustomLabelFormat): string {
    if (typeof format === 'function') {
        return format(item);
    }

    return format.replace(/\{(\w+)\}/g, (match, key) => {
        return item[key] !== undefined ? String(item[key]) : match;
    });
}


interface SelectProps extends VariantProps<typeof buttonVariants> {
    productId: string;
    variationId: string;
    category: string
    setProductId: (value: string) => void;
    setVariationId: (value: string) => void;
    options: ProductsAPIReponse[] | undefined;
    disabled?: boolean;
    name: string;
    hasError?: boolean;
    errorMessage?: string;
    label?: string | React.ReactNode;
    bottomItem?: React.ReactNode;
    placeholder: string;
    className?: string;
    containerClass?: string;
    labelClass?: string;
    itemClass?: string;
    fullWidth?: boolean;
    withIcon?: boolean;
    isLoadingOptions?: boolean;
    triggerColor?: string;
    showSelectedValue?: boolean;
    placeHolderClass?: string;
    allowDisselect?: boolean;
}

const ProductSelector = ({
    productId,
    variationId,
    category,
    setProductId,
    setVariationId,
    options,
    disabled,
    hasError,
    errorMessage,
    label,
    name,
    placeholder,
    className,
    containerClass,
    labelClass,
    itemClass,
    fullWidth,
    bottomItem,
    placeHolderClass,
    withIcon,
    isLoadingOptions,
    triggerColor,
    showSelectedValue = true,
    variant = "inputButton",
    size = "inputButton",
    allowDisselect = false
}: SelectProps) => {
    const [isOpen, setOpen] = React.useState(false)
    const [searchText, setSearchText] = React.useState<string>("")

    const baseOptions = React.useMemo(() => {
        if (!options || isLoadingOptions) return [];
        return options?.map((product) =>
            product.variations.map((variation) => ({
                label: `${product.name} - ${variation.size} ${category == "Cake" ? "inches" : ""} ${category == "Cake" ? "- " + variation.layer + " layers" : ""}`,
                product_id: product.id,
                product_variation_id: variation.id,
            }))
        ).flat(1) || []
    }, [options, isLoadingOptions, category]);

    const optionsToDisplay = React.useMemo(() => {
        if (!options) return [];
        if (searchText) {
            return baseOptions.filter((option) => {
                const label = option.label.toLowerCase();
                const search = searchText.toLowerCase();
                return label.includes(search);
            });
        }
        return baseOptions;
    }, [options, searchText, baseOptions, category, isLoadingOptions]);


    const handleSelect = (value: {
        product_id: string;
        product_variation_id: string;
    }) => {

        if (allowDisselect && productId == value.product_id && variationId == value.product_variation_id) {
            setProductId("");
            setVariationId("");
        } else {
            setProductId(value.product_id);
            setVariationId(value.product_variation_id);
        }
        setOpen(false);
    }


    const triggerRef = React.useRef<HTMLButtonElement | null>(null)
    const [width, setWidth] = React.useState<string>("50%")
    React.useEffect(() => {
        if (triggerRef?.current) {
            setWidth(`${triggerRef.current.clientWidth}px`)
        }
    }, [triggerRef?.current?.clientWidth])

    const getLabel = (option?: ProductsAPIReponse) => {
        if (!option) return "Select Product"
        const selectedVariation = option?.variations?.find((variation) => variation.id === Number(variationId))
        if (showSelectedValue) {
            return `${option.name} - ${selectedVariation?.size} ${category == "Cake" ? "inches" : ""} ${category == "Cake" ? "- " + selectedVariation?.layer + " layers" : ""}` || "Select Product"
        } else {
            return option?.name || "Select Product"
        }
    }



    return (
        <div className={cn("inputdiv", withIcon && "withicon", containerClass)}>

            <Popover open={isOpen} onOpenChange={setOpen}>
                <div className="flex flex-col gap-2">
                    {
                        label && (
                            <Label className="text-sm text-[#0F172B] font-poppins font-medium" htmlFor={name || "gbo"}>
                                {label}
                                <span className="text-red-400 font-medium"> *</span>
                            </Label>
                        )
                    }
                    <PopoverTrigger asChild>
                        <Button
                            variant={variant}
                            size={size}
                            className={cn(
                                'flex w-full items-center justify-between gap-2 text-left text-sm transition duration-300',
                                className
                            )}
                            type="button"
                            role="combobox"
                            onClick={() => setOpen(!isOpen)}
                            ref={triggerRef}
                            disabled={isLoadingOptions || disabled}
                        >
                            <span className={cn(
                                '!overflow-hidden text-sm w-full font-normal',
                                productId && variationId && options && options?.length ? '' : 'text-[#A4A4A4]',
                                placeHolderClass,
                            )}>
                                {
                                    isLoadingOptions ?
                                        "Loading options..."
                                        :

                                        (productId && variationId && options && options?.length) ?
                                            getLabel(options?.find((option) => option.id === Number(productId))) || "Select Product"
                                            :
                                            placeholder || "Select Product"

                                }

                            </span>
                            <svg
                                className={cn("ml-2  shrink-0 opacity-70 transition-transform duration-300", isOpen && "rotate-180")}
                                fill="none"
                                height={7}
                                viewBox="0 0 12 7"
                                width={12}
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    className={cn('fill-label-text')}
                                    clipRule="evenodd"
                                    d="M8.357 5.522a3.333 3.333 0 0 1-4.581.126l-.133-.126L.41 2.089A.833.833 0 0 1 1.51.84l.078.07L4.82 4.342c.617.617 1.597.65 2.251.098l.106-.098L10.411.91a.833.833 0 0 1 1.248 1.1l-.07.079-3.232 3.433Z"
                                    fill={triggerColor || "#032282"}
                                    fillRule="evenodd"
                                />
                            </svg>
                        </Button>
                    </PopoverTrigger>
                </div>


                <PopoverContent className={cn("p-0 overflow-hidden", triggerRef?.current && `min-w-max`, isLoadingOptions && "hidden")} style={{ width }}>
                    <div className="">
                        <div className="relative px-6">
                            <SearchIcon className="absolute top-1/2 left-2 -translate-y-1/2 text-[#032282] h-4 w-4" />
                            <input
                                className="focus:!ring-0 !ring-0 bg-transparent pl-5 p-3 !outline-none text-sm placeholder:text-[#86898ec7] border-b border-[#E6E6E6] w-full rounded-none"
                                placeholder={placeholder || "Search"}
                                type="text"
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                        </div>
                        {
                            isLoadingOptions &&
                            <button className="flex items-center justify-center gap-2 text-main-solid py-2 font-medium" disabled>
                                <SmallSpinner color='#000000' /> Loading options...
                            </button>
                        }
                        <div className="flex flex-col gap-1.5 px-5 py-3 max-h-[450px] overflow-y-auto">
                            {
                                !isLoadingOptions && options && options?.length > 0 ? (
                                    optionsToDisplay?.map((option, index) => (
                                        <button
                                            className={cn("text-xs relative flex select-none items-center rounded-md px-3 py-2 outline-none aria-selected:bg-blue-100/70 aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                                                itemClass, "hover:bg-blue-100 w-full text-sm",
                                                "py-2 hover:!bg-primary hover:!text-white cursor-pointer rounded-lg border hover:border-transparent"
                                            )}
                                            key={index}
                                            onClick={() => handleSelect(
                                                {
                                                    product_id: String(option.product_id),
                                                    product_variation_id: String(option.product_variation_id)
                                                }
                                            )}
                                        >
                                            <CheckIcon
                                                className={cn(
                                                    "mr-2 h-4 w-4",

                                                    productId === String(option.product_id) && variationId === String(option.product_variation_id) ? "opacity-100" : "opacity-0",
                                                )}
                                            />
                                            {option.label}
                                        </button>
                                    ))
                                ) :
                                    <button className={cn("text-[0.8125rem]", isLoadingOptions && "!hidden", itemClass)} disabled>
                                        There&apos;s no option to select from
                                    </button>

                            }
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
            {
                bottomItem && bottomItem
            }
            {
                hasError && errorMessage && (
                    <FormError errorMessage={errorMessage} />
                )
            }
        </div>
    )
}

export default ProductSelector
