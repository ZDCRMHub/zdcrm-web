import React from "react";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "./avatar"
import { cn } from "@/lib/utils";
import { getInitials } from "@/utils/strings";


interface AvatarProps {
    src?: string | null;
    alt: string;
    fallback: string;
    fallbackClass?: string
    size?: "small" | "medium" | "large"
    className?: string

}
const AvatarComponent: React.FC<AvatarProps> = ({ src, alt, fallback, size = "medium", fallbackClass, className }) => {
    return (
        <Avatar className={cn(
            size === "small" && "w-7 h-7",
            size === "medium" && "w-9 h-9",
            size === "large" && "w-12 h-12",
            className
        )}>
            {
                src &&
                <AvatarImage src={src} alt={alt || "avatar"} />
            }
            <AvatarFallback className={cn("bg-primary text-white",
                size === "small" && "text-xs font-normal",
                size === "medium" && "text-sm",
                size === "large" && "text-base",
                fallbackClass
            )}>
                {getInitials(fallback || "")}

            </AvatarFallback>
        </Avatar>
    )
}
export default AvatarComponent