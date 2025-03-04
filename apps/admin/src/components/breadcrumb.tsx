"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { Breadcrumb as BreadcrumbPrimitive } from "@/components/ui/breadcrumb";
import { SearchParamsWrapper } from "@/components/dashboard/search-params-wrapper";

const getTitleFromPath = (path: string): string => {
  const formatted = path.charAt(0).toUpperCase() + path.slice(1);
  return formatted.replace(/-/g, " ");
};

function BreadcrumbContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const paths = pathname.split("/").filter(Boolean);
  const tab = searchParams.get("tab");

  return (
    <div className="flex items-center text-sm text-muted-foreground">
      <Link
        href="/dashboard"
        className="flex items-center hover:text-foreground transition-colors"
      >
        <Home className="h-4 w-4" />
      </Link>
      {paths.map((path, index) => {
        const href = `/${paths.slice(0, index + 1).join("/")}`;
        const isLast = index === paths.length - 1;
        const title = getTitleFromPath(path);

        return (
          <div key={path} className="flex items-center">
            <ChevronRight className="h-4 w-4 mx-2" />
            {isLast ? (
              <>
                <span className="text-foreground">{title}</span>
                {tab && (
                  <>
                    <ChevronRight className="h-4 w-4 mx-2" />
                    <span className="text-foreground capitalize">
                      {getTitleFromPath(tab)}
                    </span>
                  </>
                )}
              </>
            ) : (
              <Link
                href={href}
                className="hover:text-foreground transition-colors"
              >
                {title}
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function Breadcrumb() {
  return (
    <SearchParamsWrapper>
      <BreadcrumbContent />
    </SearchParamsWrapper>
  );
}
