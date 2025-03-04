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

interface BalanceSheetData {
  assets: {
    currentAssets: {
      cash: number;
      inventory: number;
      accountsReceivable: number;
    };
    fixedAssets: {
      equipment: number;
      accumulatedDepreciation: number;
    };
  };
  liabilities: {
    currentLiabilities: {
      accountsPayable: number;
      shortTermLoans: number;
    };
    longTermLiabilities: {
      longTermLoans: number;
    };
  };
  equity: {
    capital: number;
    retainedEarnings: number;
  };
}

// This would come from your API in a real implementation
const fetchBalanceSheetData = (dateRange: DateRange): BalanceSheetData => {
  // Simulated data - replace with actual API call
  return {
    assets: {
      currentAssets: {
        cash: 25000,
        inventory: 35000,
        accountsReceivable: 15000,
      },
      fixedAssets: {
        equipment: 50000,
        accumulatedDepreciation: -10000,
      },
    },
    liabilities: {
      currentLiabilities: {
        accountsPayable: 20000,
        shortTermLoans: 15000,
      },
      longTermLiabilities: {
        longTermLoans: 40000,
      },
    },
    equity: {
      capital: 30000,
      retainedEarnings: 10000,
    },
  };
};

const calculateBalanceSheet = {
  totalCurrentAssets: (data?: BalanceSheetData) => {
    if (!data) return 0;
    const { cash, inventory, accountsReceivable } = data.assets.currentAssets;
    return cash + inventory + accountsReceivable;
  },
  totalFixedAssets: (data?: BalanceSheetData) => {
    if (!data) return 0;
    const { equipment, accumulatedDepreciation } = data.assets.fixedAssets;
    return equipment + accumulatedDepreciation;
  },
  totalAssets: (data?: BalanceSheetData) => {
    if (!data) return 0;
    return (
      calculateBalanceSheet.totalCurrentAssets(data) +
      calculateBalanceSheet.totalFixedAssets(data)
    );
  },
  totalCurrentLiabilities: (data?: BalanceSheetData) => {
    if (!data) return 0;
    const { accountsPayable, shortTermLoans } =
      data.liabilities.currentLiabilities;
    return accountsPayable + shortTermLoans;
  },
  totalLongTermLiabilities: (data?: BalanceSheetData) => {
    if (!data) return 0;
    return data.liabilities.longTermLiabilities.longTermLoans;
  },
  totalLiabilities: (data?: BalanceSheetData) => {
    if (!data) return 0;
    return (
      calculateBalanceSheet.totalCurrentLiabilities(data) +
      calculateBalanceSheet.totalLongTermLiabilities(data)
    );
  },
  totalEquity: (data?: BalanceSheetData) => {
    if (!data) return 0;
    const { capital, retainedEarnings } = data.equity;
    return capital + retainedEarnings;
  },
  totalLiabilitiesAndEquity: (data?: BalanceSheetData) => {
    if (!data) return 0;
    return (
      calculateBalanceSheet.totalLiabilities(data) +
      calculateBalanceSheet.totalEquity(data)
    );
  },
  variance: (current: number, comparison: number) => {
    if (!comparison) return 0;
    return ((current / comparison - 1) * 100).toFixed(2);
  },
};

interface BalanceSheetProps {
  primaryDateRange: DateRange | undefined;
  comparisonDateRange?: DateRange | undefined;
}

export function BalanceSheet({
  primaryDateRange,
  comparisonDateRange,
}: BalanceSheetProps) {
  const primaryData = primaryDateRange?.from
    ? fetchBalanceSheetData(primaryDateRange)
    : undefined;
  const comparisonData = comparisonDateRange?.from
    ? fetchBalanceSheetData(comparisonDateRange)
    : undefined;

  const renderBalanceSheetRow = (
    label: string,
    amount: number,
    comparisonAmount?: number,
    total?: number,
    indent?: boolean
  ) => (
    <TableRow>
      <TableCell className={indent ? "pl-12" : indent === false ? "pl-8" : ""}>
        {label}
      </TableCell>
      <TableCell className="text-right">{formatCurrency(amount)}</TableCell>
      {comparisonData && (
        <>
          <TableCell className="text-right">
            {formatCurrency(comparisonAmount || 0)}
          </TableCell>
          <TableCell className="text-right">
            {calculateBalanceSheet.variance(amount, comparisonAmount || 0)}%
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
              {/* Assets */}
              <TableRow className="font-medium">
                <TableCell>Assets</TableCell>
                <TableCell className="text-right" />
                {comparisonData && (
                  <>
                    <TableCell className="text-right" />
                    <TableCell className="text-right" />
                  </>
                )}
                <TableCell className="text-right" />
              </TableRow>

              {/* Current Assets */}
              <TableRow>
                <TableCell className="pl-8 font-medium">
                  Current Assets
                </TableCell>
                <TableCell className="text-right" />
                {comparisonData && (
                  <>
                    <TableCell className="text-right" />
                    <TableCell className="text-right" />
                  </>
                )}
                <TableCell className="text-right" />
              </TableRow>

              {renderBalanceSheetRow(
                "Cash and Cash Equivalents",
                primaryData?.assets.currentAssets.cash || 0,
                comparisonData?.assets.currentAssets.cash,
                undefined,
                true
              )}

              {renderBalanceSheetRow(
                "Inventory",
                primaryData?.assets.currentAssets.inventory || 0,
                comparisonData?.assets.currentAssets.inventory,
                undefined,
                true
              )}

              {renderBalanceSheetRow(
                "Accounts Receivable",
                primaryData?.assets.currentAssets.accountsReceivable || 0,
                comparisonData?.assets.currentAssets.accountsReceivable,
                undefined,
                true
              )}

              {renderBalanceSheetRow(
                "Total Current Assets",
                calculateBalanceSheet.totalCurrentAssets(primaryData),
                calculateBalanceSheet.totalCurrentAssets(comparisonData),
                calculateBalanceSheet.totalCurrentAssets(primaryData),
                false
              )}

              {/* Fixed Assets */}
              <TableRow>
                <TableCell className="pl-8 font-medium">Fixed Assets</TableCell>
                <TableCell className="text-right" />
                {comparisonData && (
                  <>
                    <TableCell className="text-right" />
                    <TableCell className="text-right" />
                  </>
                )}
                <TableCell className="text-right" />
              </TableRow>

              {renderBalanceSheetRow(
                "Equipment",
                primaryData?.assets.fixedAssets.equipment || 0,
                comparisonData?.assets.fixedAssets.equipment,
                undefined,
                true
              )}

              {renderBalanceSheetRow(
                "Less: Accumulated Depreciation",
                primaryData?.assets.fixedAssets.accumulatedDepreciation || 0,
                comparisonData?.assets.fixedAssets.accumulatedDepreciation,
                undefined,
                true
              )}

              {renderBalanceSheetRow(
                "Total Fixed Assets",
                calculateBalanceSheet.totalFixedAssets(primaryData),
                calculateBalanceSheet.totalFixedAssets(comparisonData),
                calculateBalanceSheet.totalFixedAssets(primaryData),
                false
              )}

              {renderBalanceSheetRow(
                "Total Assets",
                calculateBalanceSheet.totalAssets(primaryData),
                calculateBalanceSheet.totalAssets(comparisonData),
                calculateBalanceSheet.totalAssets(primaryData)
              )}

              {/* Liabilities */}
              <TableRow className="font-medium">
                <TableCell>Liabilities</TableCell>
                <TableCell className="text-right" />
                {comparisonData && (
                  <>
                    <TableCell className="text-right" />
                    <TableCell className="text-right" />
                  </>
                )}
                <TableCell className="text-right" />
              </TableRow>

              {/* Current Liabilities */}
              <TableRow>
                <TableCell className="pl-8 font-medium">
                  Current Liabilities
                </TableCell>
                <TableCell className="text-right" />
                {comparisonData && (
                  <>
                    <TableCell className="text-right" />
                    <TableCell className="text-right" />
                  </>
                )}
                <TableCell className="text-right" />
              </TableRow>

              {renderBalanceSheetRow(
                "Accounts Payable",
                primaryData?.liabilities.currentLiabilities.accountsPayable ||
                  0,
                comparisonData?.liabilities.currentLiabilities.accountsPayable,
                undefined,
                true
              )}

              {renderBalanceSheetRow(
                "Short-term Loans",
                primaryData?.liabilities.currentLiabilities.shortTermLoans || 0,
                comparisonData?.liabilities.currentLiabilities.shortTermLoans,
                undefined,
                true
              )}

              {renderBalanceSheetRow(
                "Total Current Liabilities",
                calculateBalanceSheet.totalCurrentLiabilities(primaryData),
                calculateBalanceSheet.totalCurrentLiabilities(comparisonData),
                calculateBalanceSheet.totalCurrentLiabilities(primaryData),
                false
              )}

              {/* Long-term Liabilities */}
              <TableRow>
                <TableCell className="pl-8 font-medium">
                  Long-term Liabilities
                </TableCell>
                <TableCell className="text-right" />
                {comparisonData && (
                  <>
                    <TableCell className="text-right" />
                    <TableCell className="text-right" />
                  </>
                )}
                <TableCell className="text-right" />
              </TableRow>

              {renderBalanceSheetRow(
                "Long-term Loans",
                primaryData?.liabilities.longTermLiabilities.longTermLoans || 0,
                comparisonData?.liabilities.longTermLiabilities.longTermLoans,
                undefined,
                true
              )}

              {renderBalanceSheetRow(
                "Total Long-term Liabilities",
                calculateBalanceSheet.totalLongTermLiabilities(primaryData),
                calculateBalanceSheet.totalLongTermLiabilities(comparisonData),
                calculateBalanceSheet.totalLongTermLiabilities(primaryData),
                false
              )}

              {renderBalanceSheetRow(
                "Total Liabilities",
                calculateBalanceSheet.totalLiabilities(primaryData),
                calculateBalanceSheet.totalLiabilities(comparisonData),
                calculateBalanceSheet.totalLiabilities(primaryData)
              )}

              {/* Owner's Equity */}
              <TableRow className="font-medium">
                <TableCell>Owner's Equity</TableCell>
                <TableCell className="text-right" />
                {comparisonData && (
                  <>
                    <TableCell className="text-right" />
                    <TableCell className="text-right" />
                  </>
                )}
                <TableCell className="text-right" />
              </TableRow>

              {renderBalanceSheetRow(
                "Capital",
                primaryData?.equity.capital || 0,
                comparisonData?.equity.capital,
                undefined,
                false
              )}

              {renderBalanceSheetRow(
                "Retained Earnings",
                primaryData?.equity.retainedEarnings || 0,
                comparisonData?.equity.retainedEarnings,
                undefined,
                false
              )}

              {renderBalanceSheetRow(
                "Total Owner's Equity",
                calculateBalanceSheet.totalEquity(primaryData),
                calculateBalanceSheet.totalEquity(comparisonData),
                calculateBalanceSheet.totalEquity(primaryData)
              )}

              {/* Total Liabilities and Equity */}
              <TableRow className="font-medium text-lg">
                <TableCell>Total Liabilities and Equity</TableCell>
                <TableCell className="text-right">
                  {formatCurrency(
                    calculateBalanceSheet.totalLiabilitiesAndEquity(primaryData)
                  )}
                </TableCell>
                {comparisonData && (
                  <>
                    <TableCell className="text-right">
                      {formatCurrency(
                        calculateBalanceSheet.totalLiabilitiesAndEquity(
                          comparisonData
                        )
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {calculateBalanceSheet.variance(
                        calculateBalanceSheet.totalLiabilitiesAndEquity(
                          primaryData
                        ),
                        calculateBalanceSheet.totalLiabilitiesAndEquity(
                          comparisonData
                        )
                      )}
                      %
                    </TableCell>
                  </>
                )}
                <TableCell className="text-right">
                  {formatCurrency(
                    calculateBalanceSheet.totalLiabilitiesAndEquity(primaryData)
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
