
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Button animation utilities
export const buttonVariants = {
  shine: "relative overflow-hidden after:absolute after:inset-0 after:translate-x-[-100%] after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent hover:after:translate-x-[100%] after:transition-transform after:duration-1000",
  float: "transition-transform hover:-translate-y-1 duration-300 ease-out",
  scale: "transition-transform hover:scale-105 duration-300 ease-out",
  glow: "transition-shadow hover:shadow-[0_0_15px_theme(colors.primary.DEFAULT)] duration-300 ease-out"
}

// Text animation utilities
export const textAnimationVariants = {
  glow: "transition-all duration-300 hover:text-glow",
  typewriter: "border-r-2 border-primary animate-typewriter overflow-hidden whitespace-nowrap",
  gradient: "bg-clip-text text-transparent bg-gradient-to-r from-primary via-white to-primary-foreground animate-gradient-x bg-[length:200%_100%]"
}

