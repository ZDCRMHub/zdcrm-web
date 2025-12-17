"use client"

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface SpinnerProps {
    className?: string
    pathClassName?: string
    color?: string
    size?: number
}

export default function Spinner({
    className,
    pathClassName,
    color = 'currentColor',
    size = 20
}: SpinnerProps) {
    return (
        <span className={cn('inline-flex', className)} role="status">
            <motion.svg
                width={size}
                height={size}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                animate={{ rotate: 360 }}
                transition={{
                    duration: 1.4,
                    repeat: Infinity,
                    ease: "linear"
                }}
            >
                <motion.circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke={color}
                    strokeWidth="4"
                    className={cn("opacity-25", pathClassName)}
                />
                <motion.circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke={color}
                    strokeWidth="4"
                    strokeLinecap="round"
                    className={pathClassName}
                    // initial={{ pathLength: 0.2 }}
                    // animate={{ pathLength: 0.8 }}
                    // transition={{
                    //     duration: 1.2,
                    //     repeat: Infinity,
                    //     ease: [0.5, 0.25, 0.5, 0.75]
                    // }}
                    initial={{ pathLength: 0.2 }}
                    animate={{ pathLength: [0.2, 0.8, 0.5, 0.2] }}
                    transition={{
                        duration: 1.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        times: [0, 0.5, 1]
                    }}
                />
            </motion.svg>
            <span className="sr-only">Loading</span>
        </span>
    )
}