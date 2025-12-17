import * as React from "react";
import { SVGProps } from "react";
const SVGComponent = (props: SVGProps<SVGSVGElement>) => (
    <svg
        width={20}
        height={21}
        viewBox="0 0 20 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M7.4585 3.49531L12.8918 8.92865C13.5335 9.57031 13.5335 10.6203 12.8918 11.262L7.4585 16.6953"
            stroke="currentColor"
            strokeWidth={1.25}
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
export default SVGComponent;
