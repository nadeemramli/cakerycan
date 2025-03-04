import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { MetricFormat } from "@/types/dashboard"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-MY", {
    style: "currency",
    currency: "MYR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatValue(value: number, format: MetricFormat): string {
  switch (format) {
    case "currency":
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(value);
    case "percentage":
      return `${value.toFixed(1)}%`;
    case "number":
      return new Intl.NumberFormat("en-US").format(value);
    default:
      return value.toString();
  }
}
