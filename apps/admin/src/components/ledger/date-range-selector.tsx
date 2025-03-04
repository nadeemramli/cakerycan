"use client";

import { format } from "date-fns";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface DateRangeSelectorProps {
  primaryDateRange: DateRange | undefined;
  setPrimaryDateRange: (range: DateRange | undefined) => void;
  comparisonDateRange?: DateRange | undefined;
  setComparisonDateRange?: (range: DateRange | undefined) => void;
  showComparison?: boolean;
  setShowComparison?: (show: boolean) => void;
}

export function DateRangeSelector({
  primaryDateRange,
  setPrimaryDateRange,
  comparisonDateRange,
  setComparisonDateRange,
  showComparison = false,
  setShowComparison,
}: DateRangeSelectorProps) {
  const formatDateRange = (range: DateRange | undefined) => {
    if (!range?.from) return <span>Pick a date</span>;
    if (!range.to) return format(range.from, "MMM dd, yyyy");
    return (
      <>
        {format(range.from, "MMM dd, yyyy")} -{" "}
        {format(range.to, "MMM dd, yyyy")}
      </>
    );
  };

  return (
    <div className="flex items-center gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !primaryDateRange && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {formatDateRange(primaryDateRange)}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={primaryDateRange?.from}
            selected={primaryDateRange}
            onSelect={setPrimaryDateRange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>

      {setShowComparison && setComparisonDateRange && (
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-secondary rounded-lg px-3 py-2">
            <Switch
              checked={showComparison}
              onCheckedChange={setShowComparison}
              className="data-[state=checked]:bg-primary"
            />
            <Label htmlFor="compare-mode" className="text-sm font-medium">
              Compare Mode
            </Label>
          </div>

          {showComparison && (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[300px] justify-start text-left font-normal",
                    !comparisonDateRange && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formatDateRange(comparisonDateRange)}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={comparisonDateRange?.from}
                  selected={comparisonDateRange}
                  onSelect={setComparisonDateRange}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          )}
        </div>
      )}
    </div>
  );
}
