import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const calculatePercentageChange = (
  currentValue: number,
  previousValue: number
) => {
  if (previousValue === 0) {
    return 0;
  }

  const percentageChange =
    ((currentValue - previousValue) / previousValue) * 100;
  return parseFloat(percentageChange.toFixed(2));
};
