import * as React from "react";
import { SVGProps } from "react";
const SVGComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height={16}
    viewBox="0 0 16 16"
    width={16}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m14.53 5.03-8 8a.751.751 0 0 1-1.062 0l-3.5-3.5a.751.751 0 1 1 1.063-1.062L6 11.438l7.47-7.469a.751.751 0 0 1 1.062 1.063l-.001-.002Z"
      fill={props.fill || "#755AE2"}
    />
  </svg>
);
export default SVGComponent;
