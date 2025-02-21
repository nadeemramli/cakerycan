import React from "react";

export const Button = ({
  children,
  variant = "primary",
  ...props
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const variantClasses = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-900",
    outline:
      "bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50",
  };

  return (
    <button
      className={`px-4 py-2 rounded-md transition-colors ${variantClasses[variant]}`}
      {...props}
    >
      {children}
    </button>
  );
};

export * from "./card";
