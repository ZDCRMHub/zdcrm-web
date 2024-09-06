import * as React from "react";
import { SVGProps } from "react";
const SVGComponent = (props: SVGProps<SVGSVGElement>) => (
    <svg
        width={23}
        height={23}
        viewBox="0 0 23 23"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M7.375 7.89205V7.00288C7.375 4.94038 9.03417 2.91455 11.0967 2.72205C13.5533 2.48371 15.625 4.41788 15.625 6.82871V8.09371"
            stroke={"currentColor" || "#8B909A"}
            strokeWidth={1.375}
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M8.75009 21.0277H14.2501C17.9351 21.0277 18.5951 19.5518 18.7876 17.7552L19.4751 12.2552C19.7226 10.0185 19.0809 8.19434 15.1668 8.19434H7.83342C3.91925 8.19434 3.27759 10.0185 3.52509 12.2552L4.21259 17.7552C4.40509 19.5518 5.06509 21.0277 8.75009 21.0277Z"
            stroke={"currentColor" || "#8B909A"}
            strokeWidth={1.75}
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M14.7043 11.8612H14.7125"
            stroke={"currentColor" || "#8B909A"}
            strokeWidth={1.83333}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M8.28655 11.8612H8.29478"
            stroke={"currentColor" || "#8B909A"}
            strokeWidth={1.83333}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
export default SVGComponent;
