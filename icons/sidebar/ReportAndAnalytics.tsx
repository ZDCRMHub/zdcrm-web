import * as React from "react";
import { SVGProps } from "react";
const SVGComponent = (props: SVGProps<SVGSVGElement>) => (
    <svg
        width={22}
        height={23}
        viewBox="0 0 22 23"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M17.4168 8.07901L12.5283 4.27667C11.6457 3.59007 10.4097 3.59007 9.52709 4.27667L4.63759 8.07901C4.04212 8.54208 3.69398 9.25426 3.69434 10.0086V16.6086C3.69434 17.6211 4.51515 18.4419 5.52767 18.4419H16.5277C17.5402 18.4419 18.361 17.6211 18.361 16.6086V10.0086C18.361 9.25417 18.0127 8.54192 17.4168 8.07901"
            stroke={"currentColor" || "#8B909A"}
            strokeWidth={1.75}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M14.6668 13.8439C12.641 15.0658 9.3575 15.0658 7.3335 13.8439"
            stroke={"currentColor" || "#8B909A"}
            strokeWidth={1.75}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
export default SVGComponent;
