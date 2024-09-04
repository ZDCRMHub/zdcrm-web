import * as React from "react";
import { SVGProps } from "react";
const Elipsis = (props: SVGProps<SVGSVGElement>) => (
    <svg
        fill="none"
        height={16}
        viewBox="0 0 4 16"
        width={4}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <circle cx={2} cy={2} fill={props.fill || "#4A4A68"} r={2} />
        <circle cx={2} cy={8} fill={props.fill || "#4A4A68"} r={2} />
        <circle cx={2} cy={14} fill={props.fill || "#4A4A68"} r={2} />
    </svg>
);

export default Elipsis