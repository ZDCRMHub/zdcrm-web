import * as React from "react";
import { SVGProps } from "react";
const Plane = (props: SVGProps<SVGSVGElement>) => (
    <svg
        fill="none"
        height={44}
        viewBox="0 0 44 44"
        width={44}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M13.5666 11.5869L29.1316 6.39862C36.1166 4.07028 39.9116 7.88362 37.6016 14.8686L32.4132 30.4336C28.9299 40.902 23.2099 40.902 19.7266 30.4336L18.1866 25.8136L13.5666 24.2736C3.09825 20.7903 3.09825 15.0886 13.5666 11.5869Z"
            stroke={props.stroke || "white"}
            strokeLinecap="round"
            strokeLinejoin="round"

            strokeMiterlimit={10}
            strokeWidth={1.5}
        />
        <path
            d="M18.5349 25.025L25.0982 18.4434"
            stroke={props.stroke || "white"}
            strokeLinecap="round"
            strokeLinejoin="round"

            strokeMiterlimit={10}
            strokeWidth={1.5}
        />
    </svg>
);
export default Plane;
