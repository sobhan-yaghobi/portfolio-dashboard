import { type ClassValue, clsx } from "clsx"
import { env } from "process"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
