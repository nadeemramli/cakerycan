"use client";

import { ReactNode } from "react";

interface PageContainerProps {
  title: string;
  actions?: ReactNode;
  children: ReactNode;
}

export function PageContainer({
  title,
  actions,
  children,
}: PageContainerProps) {
  return (
    <div className="h-full flex-1 flex-col space-y-8 px-8 py-6">
      <div className="flex items-center justify-between space-x-2">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {actions && (
          <div className="flex items-center space-x-2">{actions}</div>
        )}
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
