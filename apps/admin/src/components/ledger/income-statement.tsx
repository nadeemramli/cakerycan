"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DateRange } from "react-day-picker";
import { formatCurrency } from "@/lib/utils";

interface FinancialData {
  revenue: {
    sales: number;
  };
  cogs: {
    rawMaterials: number;
    directLabor: number;
    manufacturingOverhead: number;
  };
  operatingExpenses: {
    rd: number;
    marketing: number;
    administrative: number;
  };
}

// This would come from your API in a real implementation
const fetchFinancialData = (dateRange: DateRange): FinancialData => {
  // Simulated data - replace with actual API call
  return {
    revenue: {
      sales: 50000,
    },
    cogs: {
      rawMaterials: 15000,
      directLabor: 10000,
      manufacturingOverhead: 5000,
    },
    operatingExpenses: {
      rd: 2000,
      marketing: 3000,
      administrative: 5000,
    },
  };
};

const calculateFinancials = {
  totalCOGS: (data?: FinancialData) => {
    if (!data) return 0;
    const { rawMaterials, directLabor, manufacturingOverhead } = data.cogs;
    return rawMaterials + directLabor + manufacturingOverhead;
  },
  totalOperatingExpenses: (data?: FinancialData) => {
    if (!data) return 0;
    const { rd, marketing, administrative } = data.operatingExpenses;
    return rd + marketing + administrative;
  },
  grossProfit: (data?: FinancialData) => {
    if (!data) return 0;
    return data.revenue.sales - calculateFinancials.totalCOGS(data);
  },
  netIncome: (data?: FinancialData) => {
    if (!data) return 0;
    return (
      calculateFinancials.grossProfit(data) -
      calculateFinancials.totalOperatingExpenses(data)
    );
  },
  variance: (current: number, comparison: number) => {
    if (!comparison) return 0;
    return ((current / comparison - 1) * 100).toFixed(2);
  },
};

interface IncomeStatementProps {
  primaryDateRange: DateRange | undefined;
  comparisonDateRange?: DateRange | undefined;
}

export function IncomeStatement({
  primaryDateRange,
  comparisonDateRange,
}: IncomeStatementProps) {
  const primaryData = primaryDateRange?.from
    ? fetchFinancialData(primaryDateRange)
    : undefined;
  const comparisonData = comparisonDateRange?.from
    ? fetchFinancialData(comparisonDateRange)
    : undefined;

  const renderFinancialRow = (
    label: string,
    amount: number,
    comparisonAmount?: number,
    total?: number,
    indent?: boolean
  ) => (
    <TableRow>
      <TableCell className={indent ? "pl-8" : ""}>{label}</TableCell>
      <TableCell className="text-right">{formatCurrency(amount)}</TableCell>
      {comparisonData && (
        <>
          <TableCell className="text-right">
            {formatCurrency(comparisonAmount || 0)}
          </TableCell>
          <TableCell className="text-right">
            {calculateFinancials.variance(amount, comparisonAmount || 0)}%
          </TableCell>
        </>
      )}
      <TableCell className="text-right">
        {total !== undefined ? formatCurrency(total) : ""}
      </TableCell>
    </TableRow>
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40%]">Item</TableHead>
                <TableHead className="text-right">Amount (RM)</TableHead>
                {comparisonData && (
                  <>
                    <TableHead className="text-right">
                      Comparison (RM)
                    </TableHead>
                    <TableHead className="text-right">Variance (%)</TableHead>
                  </>
                )}
                <TableHead className="text-right">Total (RM)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Revenue Section */}
              <TableRow className="font-medium">
                <TableCell>Revenue</TableCell>
                <TableCell className="text-right" />
                {comparisonData && (
                  <>
                    <TableCell className="text-right" />
                    <TableCell className="text-right" />
                  </>
                )}
                <TableCell className="text-right" />
              </TableRow>

              {renderFinancialRow(
                "Sales Revenue",
                primaryData?.revenue.sales || 0,
                comparisonData?.revenue.sales,
                undefined,
                true
              )}

              {renderFinancialRow(
                "Total Revenue",
                primaryData?.revenue.sales || 0,
                comparisonData?.revenue.sales,
                primaryData?.revenue.sales || 0
              )}

              {/* COGS Section */}
              <TableRow className="font-medium">
                <TableCell>Cost of Goods Sold</TableCell>
                <TableCell className="text-right" />
                {comparisonData && (
                  <>
                    <TableCell className="text-right" />
                    <TableCell className="text-right" />
                  </>
                )}
                <TableCell className="text-right">
                  {formatCurrency(calculateFinancials.totalCOGS(primaryData))}
                </TableCell>
              </TableRow>

              {renderFinancialRow(
                "Raw Materials",
                primaryData?.cogs.rawMaterials || 0,
                comparisonData?.cogs.rawMaterials,
                undefined,
                true
              )}

              {renderFinancialRow(
                "Direct Labor",
                primaryData?.cogs.directLabor || 0,
                comparisonData?.cogs.directLabor,
                undefined,
                true
              )}

              {renderFinancialRow(
                "Manufacturing Overhead",
                primaryData?.cogs.manufacturingOverhead || 0,
                comparisonData?.cogs.manufacturingOverhead,
                undefined,
                true
              )}

              {renderFinancialRow(
                "Total COGS",
                calculateFinancials.totalCOGS(primaryData),
                calculateFinancials.totalCOGS(comparisonData),
                calculateFinancials.totalCOGS(primaryData)
              )}

              {/* Gross Profit */}
              {renderFinancialRow(
                "Gross Profit",
                calculateFinancials.grossProfit(primaryData),
                calculateFinancials.grossProfit(comparisonData),
                calculateFinancials.grossProfit(primaryData)
              )}

              {/* Operating Expenses */}
              <TableRow className="font-medium">
                <TableCell>Operating Expenses</TableCell>
                <TableCell className="text-right" />
                {comparisonData && (
                  <>
                    <TableCell className="text-right" />
                    <TableCell className="text-right" />
                  </>
                )}
                <TableCell className="text-right">
                  {formatCurrency(
                    calculateFinancials.totalOperatingExpenses(primaryData)
                  )}
                </TableCell>
              </TableRow>

              {renderFinancialRow(
                "R&D Expenses",
                primaryData?.operatingExpenses.rd || 0,
                comparisonData?.operatingExpenses.rd,
                undefined,
                true
              )}

              {renderFinancialRow(
                "Marketing Expenses",
                primaryData?.operatingExpenses.marketing || 0,
                comparisonData?.operatingExpenses.marketing,
                undefined,
                true
              )}

              {renderFinancialRow(
                "Administrative Expenses",
                primaryData?.operatingExpenses.administrative || 0,
                comparisonData?.operatingExpenses.administrative,
                undefined,
                true
              )}

              {renderFinancialRow(
                "Total Operating Expenses",
                calculateFinancials.totalOperatingExpenses(primaryData),
                calculateFinancials.totalOperatingExpenses(comparisonData),
                calculateFinancials.totalOperatingExpenses(primaryData)
              )}

              {/* Net Income */}
              <TableRow className="font-medium text-lg">
                <TableCell>Net Income</TableCell>
                <TableCell className="text-right">
                  {formatCurrency(calculateFinancials.netIncome(primaryData))}
                </TableCell>
                {comparisonData && (
                  <>
                    <TableCell className="text-right">
                      {formatCurrency(
                        calculateFinancials.netIncome(comparisonData)
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {calculateFinancials.variance(
                        calculateFinancials.netIncome(primaryData),
                        calculateFinancials.netIncome(comparisonData)
                      )}
                      %
                    </TableCell>
                  </>
                )}
                <TableCell className="text-right">
                  {formatCurrency(calculateFinancials.netIncome(primaryData))}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
