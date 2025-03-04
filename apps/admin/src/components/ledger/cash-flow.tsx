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

interface CashFlowData {
  operatingActivities: {
    netIncome: number;
    depreciation: number;
    inventoryChanges: number;
  };
  investingActivities: {
    equipmentPurchase: number;
    assetSale: number;
  };
  financingActivities: {
    loansReceived: number;
    loanPayments: number;
  };
}

// This would come from your API in a real implementation
const fetchCashFlowData = (dateRange: DateRange): CashFlowData => {
  // Simulated data - replace with actual API call
  return {
    operatingActivities: {
      netIncome: 10000,
      depreciation: 2000,
      inventoryChanges: -5000,
    },
    investingActivities: {
      equipmentPurchase: -15000,
      assetSale: 3000,
    },
    financingActivities: {
      loansReceived: 20000,
      loanPayments: -5000,
    },
  };
};

const calculateCashFlow = {
  operatingActivities: (data?: CashFlowData) => {
    if (!data) return 0;
    const { netIncome, depreciation, inventoryChanges } =
      data.operatingActivities;
    return netIncome + depreciation + inventoryChanges;
  },
  investingActivities: (data?: CashFlowData) => {
    if (!data) return 0;
    const { equipmentPurchase, assetSale } = data.investingActivities;
    return equipmentPurchase + assetSale;
  },
  financingActivities: (data?: CashFlowData) => {
    if (!data) return 0;
    const { loansReceived, loanPayments } = data.financingActivities;
    return loansReceived + loanPayments;
  },
  netChange: (data?: CashFlowData) => {
    if (!data) return 0;
    return (
      calculateCashFlow.operatingActivities(data) +
      calculateCashFlow.investingActivities(data) +
      calculateCashFlow.financingActivities(data)
    );
  },
  variance: (current: number, comparison: number) => {
    if (!comparison) return 0;
    return ((current / comparison - 1) * 100).toFixed(2);
  },
};

interface CashFlowProps {
  primaryDateRange: DateRange | undefined;
  comparisonDateRange?: DateRange | undefined;
}

export function CashFlow({
  primaryDateRange,
  comparisonDateRange,
}: CashFlowProps) {
  const primaryData = primaryDateRange?.from
    ? fetchCashFlowData(primaryDateRange)
    : undefined;
  const comparisonData = comparisonDateRange?.from
    ? fetchCashFlowData(comparisonDateRange)
    : undefined;

  const renderCashFlowRow = (
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
            {calculateCashFlow.variance(amount, comparisonAmount || 0)}%
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
              {/* Operating Activities */}
              <TableRow className="font-medium">
                <TableCell>Operating Activities</TableCell>
                <TableCell className="text-right" />
                {comparisonData && (
                  <>
                    <TableCell className="text-right" />
                    <TableCell className="text-right" />
                  </>
                )}
                <TableCell className="text-right" />
              </TableRow>

              {renderCashFlowRow(
                "Net Income",
                primaryData?.operatingActivities.netIncome || 0,
                comparisonData?.operatingActivities.netIncome,
                undefined,
                true
              )}

              {renderCashFlowRow(
                "Depreciation",
                primaryData?.operatingActivities.depreciation || 0,
                comparisonData?.operatingActivities.depreciation,
                undefined,
                true
              )}

              {renderCashFlowRow(
                "Changes in Inventory",
                primaryData?.operatingActivities.inventoryChanges || 0,
                comparisonData?.operatingActivities.inventoryChanges,
                undefined,
                true
              )}

              {renderCashFlowRow(
                "Net Cash from Operating Activities",
                calculateCashFlow.operatingActivities(primaryData),
                calculateCashFlow.operatingActivities(comparisonData),
                calculateCashFlow.operatingActivities(primaryData)
              )}

              {/* Investing Activities */}
              <TableRow className="font-medium">
                <TableCell>Investing Activities</TableCell>
                <TableCell className="text-right" />
                {comparisonData && (
                  <>
                    <TableCell className="text-right" />
                    <TableCell className="text-right" />
                  </>
                )}
                <TableCell className="text-right" />
              </TableRow>

              {renderCashFlowRow(
                "Purchase of Equipment",
                primaryData?.investingActivities.equipmentPurchase || 0,
                comparisonData?.investingActivities.equipmentPurchase,
                undefined,
                true
              )}

              {renderCashFlowRow(
                "Sale of Assets",
                primaryData?.investingActivities.assetSale || 0,
                comparisonData?.investingActivities.assetSale,
                undefined,
                true
              )}

              {renderCashFlowRow(
                "Net Cash from Investing Activities",
                calculateCashFlow.investingActivities(primaryData),
                calculateCashFlow.investingActivities(comparisonData),
                calculateCashFlow.investingActivities(primaryData)
              )}

              {/* Financing Activities */}
              <TableRow className="font-medium">
                <TableCell>Financing Activities</TableCell>
                <TableCell className="text-right" />
                {comparisonData && (
                  <>
                    <TableCell className="text-right" />
                    <TableCell className="text-right" />
                  </>
                )}
                <TableCell className="text-right" />
              </TableRow>

              {renderCashFlowRow(
                "Loans Received",
                primaryData?.financingActivities.loansReceived || 0,
                comparisonData?.financingActivities.loansReceived,
                undefined,
                true
              )}

              {renderCashFlowRow(
                "Loan Payments",
                primaryData?.financingActivities.loanPayments || 0,
                comparisonData?.financingActivities.loanPayments,
                undefined,
                true
              )}

              {renderCashFlowRow(
                "Net Cash from Financing Activities",
                calculateCashFlow.financingActivities(primaryData),
                calculateCashFlow.financingActivities(comparisonData),
                calculateCashFlow.financingActivities(primaryData)
              )}

              {/* Net Change in Cash */}
              <TableRow className="font-medium text-lg">
                <TableCell>Net Change in Cash</TableCell>
                <TableCell className="text-right">
                  {formatCurrency(calculateCashFlow.netChange(primaryData))}
                </TableCell>
                {comparisonData && (
                  <>
                    <TableCell className="text-right">
                      {formatCurrency(
                        calculateCashFlow.netChange(comparisonData)
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {calculateCashFlow.variance(
                        calculateCashFlow.netChange(primaryData),
                        calculateCashFlow.netChange(comparisonData)
                      )}
                      %
                    </TableCell>
                  </>
                )}
                <TableCell className="text-right">
                  {formatCurrency(calculateCashFlow.netChange(primaryData))}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
