import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Pencil, Eye } from "lucide-react";

interface TimelineEntry {
  id: string;
  date: string;
  changes: string;
  ingredients: Array<{
    id: string;
    name: string;
    quantity: string;
    unitCost: number;
    total: number;
  }>;
  steps: Array<{
    id: string;
    order: number;
    description: string;
  }>;
  laborHours: string;
  totalCost: number;
  version: number;
}

interface ProjectTimelineProps {
  entries: TimelineEntry[];
  onEdit: (entryId: string) => void;
  onView: (entryId: string) => void;
}

export function ProjectTimeline({
  entries,
  onEdit,
  onView,
}: ProjectTimelineProps) {
  return (
    <ScrollArea className="h-[calc(100vh-300px)]">
      <div className="relative pl-8 pr-4">
        {/* Main timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />

        <div className="space-y-8">
          {entries.map((entry, index) => (
            <div key={entry.id} className="relative">
              {/* Timeline dot */}
              <div className="absolute left-[-8px] w-8 h-8 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                <span className="text-xs font-medium">v{entry.version}</span>
              </div>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">
                          {entry.date}
                        </span>
                        <Badge variant="outline">Version {entry.version}</Badge>
                      </div>
                      <p className="text-muted-foreground">{entry.changes}</p>

                      <div className="mt-4 space-y-2">
                        <div className="text-sm">
                          <span className="font-medium">Ingredients:</span>{" "}
                          {entry.ingredients.map((i) => i.name).join(", ")}
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Labor:</span>{" "}
                          {entry.laborHours} hours
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Total Cost:</span> RM{" "}
                          {entry.totalCost.toFixed(2)}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onView(entry.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(entry.id)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
}
