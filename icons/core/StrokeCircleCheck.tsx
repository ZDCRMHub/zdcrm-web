import * as React from "react";
import { SVGProps } from "react";
const StrokeCircleCheck = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height={46}
    viewBox="0 0 47 46"
    width={47}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M23.5035 41.9587C33.9243 41.9587 42.4504 33.4326 42.4504 23.0118C42.4504 12.591 33.9243 4.06494 23.5035 4.06494C13.0827 4.06494 4.55664 12.591 4.55664 23.0118C4.55664 33.4326 13.0827 41.9587 23.5035 41.9587Z"
      stroke={props.stroke || "white"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={props.strokeWidth || 1.5}
    />
    <path
      d="M15.4512 23.0118L20.8131 28.3738L31.556 17.6498"
      stroke={props.stroke || "white"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={props.strokeWidth || 1.5}
    />
  </svg>
);
export default StrokeCircleCheck;
