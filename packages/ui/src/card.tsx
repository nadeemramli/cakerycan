import React from "react";

export const Card = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`rounded-lg shadow-md p-4 bg-white ${className}`}>
      {children}
    </div>
  );
};
