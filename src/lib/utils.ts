import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function constrainNumber(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max);
}

export function formatDate(input: Date | string): string {
  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

/**
 * Button animation variants
 */
export const buttonVariants = {
  shine: "shine relative overflow-hidden after:absolute after:inset-0 after:translate-x-[-100%] after:bg-white/25 after:transition after:duration-500 hover:after:translate-x-[100%]",
  glow: "hover:shadow-[0_0_15px_rgba(0,245,255,0.5)] transition-shadow duration-300",
  float: "hover:translate-y-[-3px] transition-transform duration-300",
  pop: "active:scale-95 transition-transform duration-200"
};

/**
 * Text animation variants
 */
export const textAnimationVariants = {
  glow: "hover:text-shadow-[0_0_15px_rgba(0,245,255,0.8)] transition-all duration-300",
  float: "hover:translate-y-[-2px] transition-transform duration-300",
  type: "overflow-hidden whitespace-nowrap border-r-4 border-primary animate-typing"
};
