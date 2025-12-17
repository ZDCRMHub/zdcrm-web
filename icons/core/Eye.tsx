import * as React from 'react';
import { SVGProps } from 'react';
interface extraProps {
    circlecolor?: string
}
const Eye = (props: SVGProps<SVGSVGElement> & extraProps) => (
    <svg
        fill="none"
        height={30}
        viewBox="0 0 30 30"
        width={30}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <circle cx={15} cy={15} fill={props.circlecolor || "#E6E0FF"} r={15} />
        <path
            d="M17.9833 15C17.9833 16.65 16.6499 17.9833 14.9999 17.9833C13.3499 17.9833 12.0166 16.65 12.0166 15C12.0166 13.35 13.3499 12.0167 14.9999 12.0167C16.6499 12.0167 17.9833 13.35 17.9833 15Z"
            stroke={props.stroke || "#755AE2"}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
        />
        <path
            d="M14.9999 21.8917C17.9415 21.8917 20.6832 20.1583 22.5915 17.1583C23.3415 15.9833 23.3415 14.0083 22.5915 12.8333C20.6832 9.83334 17.9415 8.10001 14.9999 8.10001C12.0582 8.10001 9.31654 9.83334 7.4082 12.8333C6.6582 14.0083 6.6582 15.9833 7.4082 17.1583C9.31654 20.1583 12.0582 21.8917 14.9999 21.8917Z"
            stroke={props.stroke || "#755AE2"}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
        />
    </svg>
);
export default Eye;
