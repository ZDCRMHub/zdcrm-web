import * as React from "react";
import { SVGProps } from "react";
const SVGComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={21}
    height={20}
    viewBox="0 0 21 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M7.97493 18.3307H12.9749C17.1416 18.3307 18.8083 16.6641 18.8083 12.4974V7.4974C18.8083 3.33073 17.1416 1.66406 12.9749 1.66406H7.97493C3.80827 1.66406 2.1416 3.33073 2.1416 7.4974V12.4974C2.1416 16.6641 3.80827 18.3307 7.97493 18.3307Z"
      stroke={"currentColor" || "#8B909A"}
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2.1416 10.5821L7.1416 10.5655C7.7666 10.5655 8.4666 11.0405 8.69993 11.6238L9.64993 14.0238C9.8666 14.5655 10.2083 14.5655 10.4249 14.0238L12.3333 9.18212C12.5166 8.71546 12.8583 8.69879 13.0916 9.14046L13.9583 10.7821C14.2166 11.2738 14.8833 11.6738 15.4333 11.6738H18.8166"
      stroke={"currentColor" || "#8B909A"}
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default SVGComponent;
