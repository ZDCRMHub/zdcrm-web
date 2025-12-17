import * as React from "react";
import { SVGProps } from "react";
const GreenDotIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        fill="none"
        height={6}
        viewBox="0 0 6 6"
        width={6}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M3.13091 5.22179C4.35821 5.22179 5.35314 4.22687 5.35314 2.99957C5.35314 1.77227 4.35821 0.777344 3.13091 0.777344C1.90361 0.777344 0.908691 1.77227 0.908691 2.99957C0.908691 4.22687 1.90361 5.22179 3.13091 5.22179Z"
            fill={props.fill || "#07C76D"}
        />
    </svg>
);
export default GreenDotIcon;
