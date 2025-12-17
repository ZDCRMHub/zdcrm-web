import * as React from "react";
import { SVGProps } from "react";
const SVGComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M5.7334 15.1234V13.3984"
      stroke={"currentColor" || "white"}
      strokeWidth={1.36364}
      strokeLinecap="round"
    />
    <path
      d="M10 15.1219V11.6719"
      stroke={"currentColor" || "white"}
      strokeWidth={1.36364}
      strokeLinecap="round"
    />
    <path
      d="M14.2666 15.1247V9.94141"
      stroke={"currentColor" || "white"}
      strokeWidth={1.36364}
      strokeLinecap="round"
    />
    <path
      d="M14.2667 4.875L13.8834 5.325C11.7584 7.80833 8.9084 9.56667 5.7334 10.3583"
      stroke={"currentColor" || "white"}
      strokeWidth={1.36364}
      strokeLinecap="round"
    />
    <path
      d="M11.8247 4.875H14.2664V7.30833"
      stroke={"currentColor" || "white"}
      strokeWidth={1.36364}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.50033 18.3346H12.5003C16.667 18.3346 18.3337 16.668 18.3337 12.5013V7.5013C18.3337 3.33464 16.667 1.66797 12.5003 1.66797H7.50033C3.33366 1.66797 1.66699 3.33464 1.66699 7.5013V12.5013C1.66699 16.668 3.33366 18.3346 7.50033 18.3346Z"
      stroke={"currentColor" || "white"}
      strokeWidth={1.36364}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default SVGComponent;
