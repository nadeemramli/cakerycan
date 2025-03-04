"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageContainer } from "@/components/layout/page-container";
import { IncomeStatement } from "@/components/ledger/income-statement";
import { CashFlow } from "@/components/ledger/cash-flow";
import { BalanceSheet } from "@/components/ledger/balance-sheet";
import { DateRangeSelector } from "@/components/ledger/date-range-selector";
import { DateRange } from "react-day-picker";

export default function LedgerPage() {
  const [primaryDateRange, setPrimaryDateRange] = useState<
    DateRange | undefined
  >({
    from: new Date(),
    to: undefined,
  });
  const [comparisonDateRange, setComparisonDateRange] = useState<
    DateRange | undefined
  >();
  const [showComparison, setShowComparison] = useState(false);

  return (
    <PageContainer title="Financial Ledger">
      <div className="space-y-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Financial Overview</CardTitle>
            <DateRangeSelector
              primaryDateRange={primaryDateRange}
              setPrimaryDateRange={setPrimaryDateRange}
              comparisonDateRange={comparisonDateRange}
              setComparisonDateRange={setComparisonDateRange}
              showComparison={showComparison}
              setShowComparison={setShowComparison}
            />
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="income" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger
                  value="income"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Income Statement
                </TabsTrigger>
                <TabsTrigger
                  value="cashflow"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground "
                >
                  Cash Flow
                </TabsTrigger>
                <TabsTrigger
                  value="balance"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Balance Sheet
                </TabsTrigger>
              </TabsList>
              <TabsContent value="income" className="space-y-4">
                <IncomeStatement
                  primaryDateRange={primaryDateRange}
                  comparisonDateRange={
                    showComparison ? comparisonDateRange : undefined
                  }
                />
              </TabsContent>
              <TabsContent value="cashflow" className="space-y-4">
                <CashFlow
                  primaryDateRange={primaryDateRange}
                  comparisonDateRange={
                    showComparison ? comparisonDateRange : undefined
                  }
                />
              </TabsContent>
              <TabsContent value="balance" className="space-y-4">
                <BalanceSheet
                  primaryDateRange={primaryDateRange}
                  comparisonDateRange={
                    showComparison ? comparisonDateRange : undefined
                  }
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
