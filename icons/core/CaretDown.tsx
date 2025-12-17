import * as React from "react";
import { SVGProps } from "react";
const CaretDownIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        fill="none"
        height={20}
        viewBox="0 0 24 24"
        width={20}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            clipRule="evenodd"
            d="M15.182 13.799a4.044 4.044 0 0 1-5.498.149l-.16-.15L5.647 9.74a.975.975 0 0 1 0-1.393 1.01 1.01 0 0 1 1.32-.082l.094.082 3.879 4.058c.74.73 1.915.768 2.701.116l.127-.116 3.879-4.058a1.01 1.01 0 0 1 1.414 0c.36.355.389.914.083 1.3l-.083.093-3.878 4.059Z"
            fill={props.fill || "#755AE2"}
            fillRule="evenodd"
        />
    </svg>
);
export default CaretDownIcon;
