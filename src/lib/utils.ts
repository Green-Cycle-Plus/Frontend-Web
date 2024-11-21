import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateAbbreviation(fullName: string): string {
  // Step 1: Split the full name into words
  const names: string[] = fullName.split(' ');

  // Step 2: Extract the first letter of each name
  const initials: string[] = names.map(name => name.charAt(0).toUpperCase());

  // Step 3: Limit to just two letters
  const abbreviation: string = initials.slice(0, 2).join('');

  // Step 4: Return the abbreviation
  return abbreviation;
}