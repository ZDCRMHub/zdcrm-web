import * as React from "react";
import { SVGProps } from "react";
const SVGComponent = (props: SVGProps<SVGSVGElement>) => (
    <svg
        width={24}
        height={25}
        viewBox="0 0 24 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M5 10.0889C3.9 10.0889 3 10.9889 3 12.0889C3 13.1889 3.9 14.0889 5 14.0889C6.1 14.0889 7 13.1889 7 12.0889C7 10.9889 6.1 10.0889 5 10.0889Z"
            stroke={"currentColor" || "#666666"}
            strokeWidth={1.5}
        />
        <path
            d="M19 10.0889C17.9 10.0889 17 10.9889 17 12.0889C17 13.1889 17.9 14.0889 19 14.0889C20.1 14.0889 21 13.1889 21 12.0889C21 10.9889 20.1 10.0889 19 10.0889Z"
            stroke={"currentColor" || "#666666"}
            strokeWidth={1.5}
        />
        <path
            d="M12 10.0889C10.9 10.0889 10 10.9889 10 12.0889C10 13.1889 10.9 14.0889 12 14.0889C13.1 14.0889 14 13.1889 14 12.0889C14 10.9889 13.1 10.0889 12 10.0889Z"
            stroke={"currentColor" || "#666666"}
            strokeWidth={1.5}
        />
    </svg>
);
export default SVGComponent;
