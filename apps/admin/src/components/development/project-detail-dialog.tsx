"use client";

import { useState } from "react";
import { Plus, ArrowLeftRight, RefreshCw, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { NewEntryForm } from "./new-entry-form";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { DevelopmentProject, TimelineEntry } from "@/types/development";

interface ProjectDetailDialogProps {
  project: DevelopmentProject;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface SyncConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  version: number;
  changes: {
    ingredients: {
      name: string;
      from: { quantity: string; total: number } | null;
      to: { quantity: string; total: number } | null;
      difference: number;
    }[];
    steps: {
      order: number;
      from: { description: string } | null;
      to: { description: string } | null;
    }[];
  };
  onConfirm: () => void;
}

function SyncConfirmDialog({
  open,
  onOpenChange,
  version,
  changes,
  onConfirm,
}: SyncConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sync Recipe Changes</DialogTitle>
          <DialogDescription>
            Review the changes that will be applied to the menu recipe.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Ingredient Changes</h4>
            <div className="space-y-2">
              {changes.ingredients.map((change, index) => (
                <div key={index} className="text-sm">
                  <span className="font-medium">{change.name}:</span>{" "}
                  {change.from ? (
                    <>
                      {change.from.quantity} (RM {change.from.total.toFixed(2)})
                    </>
                  ) : (
                    "New"
                  )}{" "}
                  →{" "}
                  {change.to ? (
                    <>
                      {change.to.quantity} (RM {change.to.total.toFixed(2)})
                    </>
                  ) : (
                    "Removed"
                  )}
                  <span className="text-muted-foreground ml-2">
                    {change.difference > 0
                      ? `+RM ${change.difference.toFixed(2)}`
                      : change.difference < 0
                      ? `-RM ${Math.abs(change.difference).toFixed(2)}`
                      : ""}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Step Changes</h4>
            <div className="space-y-2">
              {changes.steps.map((change, index) => (
                <div key={index} className="text-sm">
                  <span className="font-medium">Step {change.order}:</span>
                  <br />
                  {change.from ? (
                    <div className="text-muted-foreground line-through">
                      {change.from.description}
                    </div>
                  ) : (
                    <div className="text-green-600">New step</div>
                  )}
                  {change.to && (
                    <div className="text-green-600">
                      {change.to.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onConfirm}>Confirm Sync</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function ProjectDetailDialog({
  project,
  open,
  onOpenChange,
}: ProjectDetailDialogProps) {
  const router = useRouter();
  const [showNewEntry, setShowNewEntry] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState<number | null>(null);
  const [compareVersions, setCompareVersions] = useState<{
    from: number;
    to: number;
  } | null>(null);
  const [showSyncConfirm, setShowSyncConfirm] = useState(false);

  const handleNewEntry = () => {
    router.push(`/dashboard/development/${project.id}/entries/new`);
    onOpenChange(false);
  };

  const handleEditEntry = (entryId: string) => {
    router.push(`/dashboard/development/${project.id}/entries/${entryId}/edit`);
    onOpenChange(false);
  };

  const getVersionEntry = (version: number) => {
    return project.timeline.find((entry) => entry.version === version);
  };

  const compareIngredients = (from: TimelineEntry, to: TimelineEntry) => {
    const changes: {
      name: string;
      from: { quantity: string; total: number } | null;
      to: { quantity: string; total: number } | null;
      difference: number;
    }[] = [];

    // Get all unique ingredient names
    const allIngredients = new Set([
      ...from.ingredients.map((i) => i.name),
      ...to.ingredients.map((i) => i.name),
    ]);

    allIngredients.forEach((name) => {
      const fromIng = from.ingredients.find((i) => i.name === name);
      const toIng = to.ingredients.find((i) => i.name === name);

      if (fromIng?.quantity !== toIng?.quantity) {
        changes.push({
          name,
          from: fromIng
            ? { quantity: fromIng.quantity, total: fromIng.total }
            : null,
          to: toIng ? { quantity: toIng.quantity, total: toIng.total } : null,
          difference: (toIng?.total || 0) - (fromIng?.total || 0),
        });
      }
    });

    return changes;
  };

  const compareSteps = (from: TimelineEntry, to: TimelineEntry) => {
    const changes: {
      order: number;
      from: { description: string } | null;
      to: { description: string } | null;
    }[] = [];

    const maxSteps = Math.max(from.steps?.length || 0, to.steps?.length || 0);

    for (let i = 0; i < maxSteps; i++) {
      const fromStep = from.steps?.[i];
      const toStep = to.steps?.[i];

      if (fromStep?.description !== toStep?.description) {
        changes.push({
          order: i + 1,
          from: fromStep ? { description: fromStep.description } : null,
          to: toStep ? { description: toStep.description } : null,
        });
      }
    }

    return changes;
  };

  const handleSync = () => {
    if (!selectedVersion) return;

    // Get the current recipe version
    const currentRecipe = {
      ingredients: project.ingredients || [],
      steps: project.steps || [],
    };

    // Compare with selected version
    const selectedEntry = getVersionEntry(selectedVersion);
    if (!selectedEntry) return;

    const changes = {
      ingredients: compareIngredients(
        {
          ...selectedEntry,
          ingredients: currentRecipe.ingredients.map((i) => ({
            id: i.id,
            name: i.name,
            quantity: `${i.quantity}${i.unit}`,
            unitCost: 0,
            total: 0,
          })),
        },
        selectedEntry
      ),
      steps: compareSteps(
        {
          ...selectedEntry,
          steps: currentRecipe.steps || [],
        },
        selectedEntry
      ),
    };

    setShowSyncConfirm(true);
  };

  const handleSyncConfirm = async () => {
    if (!selectedVersion) return;

    const entry = getVersionEntry(selectedVersion);
    if (!entry) return;

    try {
      const response = await fetch("/api/development/sync", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectId: project.id,
          version: selectedVersion,
          recipeId: project.baseRecipe,
          changes: {
            ingredients: entry.ingredients,
            steps: entry.steps,
          },
        }),
      });

      if (response.ok) {
        toast.success("Recipe synced successfully");
        setShowSyncConfirm(false);
      } else {
        toast.error("Failed to sync recipe");
      }
    } catch (error) {
      console.error("Error syncing recipe:", error);
      toast.error("Failed to sync recipe");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {project.name}
          </DialogTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline">
              {project.baseRecipe || "New Recipe"}
            </Badge>
            <Badge
              variant={
                project.status === "active"
                  ? "default"
                  : project.status === "completed"
                  ? "outline"
                  : project.status === "on-hold"
                  ? "destructive"
                  : "secondary"
              }
            >
              {project.status}
            </Badge>
          </div>
        </DialogHeader>

        <Tabs defaultValue="timeline" className="flex-1">
          <TabsList>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="recipe">Current Recipe</TabsTrigger>
            <TabsTrigger value="compare" disabled={!compareVersions}>
              Version Compare
            </TabsTrigger>
            <TabsTrigger value="cost">Cost Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="timeline">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-sm font-medium">Total R&D Cost</div>
                    <div className="text-2xl font-bold">
                      RM {project.totalCost.toFixed(2)}
                    </div>
                  </div>
                  <Button onClick={handleNewEntry}>
                    <Plus className="w-4 h-4 mr-2" />
                    New Entry
                  </Button>
                </div>

                <ScrollArea className="h-[500px] pr-4">
                  <div className="space-y-8">
                    {project.timeline.map((entry) => (
                      <div
                        key={entry.id}
                        className="relative pl-6 border-l-2 border-muted"
                      >
                        <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1.5" />
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-sm text-muted-foreground">
                                {entry.date}
                              </span>
                              <Badge variant="outline" className="ml-2">
                                v{entry.version}
                              </Badge>
                            </div>
                            <span className="text-sm font-medium">
                              RM {entry.totalCost.toFixed(2)}
                            </span>
                          </div>
                          <p className="text-sm">{entry.changes}</p>

                          <Card>
                            <CardHeader>
                              <CardTitle className="text-sm">
                                Recipe Changes
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <div className="space-y-2">
                                <h4 className="text-sm font-medium">
                                  Ingredients:
                                </h4>
                                {entry.ingredients.map((ingredient, i) => (
                                  <div
                                    key={i}
                                    className="flex justify-between text-sm"
                                  >
                                    <span>
                                      {ingredient.name} ({ingredient.quantity})
                                    </span>
                                    <span>
                                      RM {ingredient.total.toFixed(2)}
                                    </span>
                                  </div>
                                ))}
                              </div>

                              <div className="space-y-2">
                                <h4 className="text-sm font-medium">Steps:</h4>
                                {entry.steps?.map((step) => (
                                  <div key={step.id} className="text-sm">
                                    {step.order}. {step.description}
                                  </div>
                                ))}
                              </div>

                              <div className="border-t pt-2">
                                <div className="flex justify-between text-sm">
                                  <span>Labor ({entry.labor.hours} hours)</span>
                                  <span>RM {entry.labor.total.toFixed(2)}</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          <div className="flex justify-end space-x-2">
                            {!compareVersions ? (
                              <>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    setCompareVersions({
                                      from: entry.version,
                                      to: entry.version + 1,
                                    })
                                  }
                                  disabled={
                                    !project.timeline.some(
                                      (t) => t.version === entry.version + 1
                                    )
                                  }
                                >
                                  Compare with Next
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    setSelectedVersion(entry.version)
                                  }
                                >
                                  Use This Version
                                </Button>
                              </>
                            ) : (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  setCompareVersions({
                                    ...compareVersions,
                                    from: entry.version,
                                  })
                                }
                              >
                                Compare From This
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditEntry(entry.id)}
                            >
                              <Pencil className="w-4 h-4 mr-2" />
                              Edit
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compare">
            {compareVersions && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="space-y-1">
                      <Label>From Version</Label>
                      <Select
                        value={compareVersions.from.toString()}
                        onValueChange={(v) =>
                          setCompareVersions({
                            ...compareVersions,
                            from: parseInt(v),
                          })
                        }
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {project.timeline.map((entry) => (
                            <SelectItem
                              key={entry.version}
                              value={entry.version.toString()}
                            >
                              Version {entry.version}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <Label>To Version</Label>
                      <Select
                        value={compareVersions.to.toString()}
                        onValueChange={(v) =>
                          setCompareVersions({
                            ...compareVersions,
                            to: parseInt(v),
                          })
                        }
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {project.timeline.map((entry) => (
                            <SelectItem
                              key={entry.version}
                              value={entry.version.toString()}
                            >
                              Version {entry.version}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {(() => {
                  const fromEntry = getVersionEntry(compareVersions.from);
                  const toEntry = getVersionEntry(compareVersions.to);

                  if (!fromEntry || !toEntry) return null;

                  const ingredientChanges = compareIngredients(
                    fromEntry,
                    toEntry
                  );
                  const stepChanges = compareSteps(fromEntry, toEntry);

                  return (
                    <div className="grid gap-6 grid-cols-2">
                      <Card>
                        <CardHeader>
                          <CardTitle>Ingredient Changes</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {ingredientChanges.map((change, i) => (
                              <div
                                key={i}
                                className="p-4 border rounded-lg space-y-2"
                              >
                                <div className="font-medium">{change.name}</div>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <div className="text-muted-foreground">
                                      From:
                                    </div>
                                    {change.from ? (
                                      <div>
                                        {change.from.quantity} (RM{" "}
                                        {change.from.total.toFixed(2)})
                                      </div>
                                    ) : (
                                      <div className="text-muted-foreground italic">
                                        Not present
                                      </div>
                                    )}
                                  </div>
                                  <div>
                                    <div className="text-muted-foreground">
                                      To:
                                    </div>
                                    {change.to ? (
                                      <div>
                                        {change.to.quantity} (RM{" "}
                                        {change.to.total.toFixed(2)})
                                      </div>
                                    ) : (
                                      <div className="text-muted-foreground italic">
                                        Removed
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div
                                  className={`text-sm ${
                                    change.difference > 0
                                      ? "text-red-500"
                                      : change.difference < 0
                                      ? "text-green-500"
                                      : ""
                                  }`}
                                >
                                  Cost difference: RM{" "}
                                  {Math.abs(change.difference).toFixed(2)}{" "}
                                  {change.difference > 0
                                    ? "increase"
                                    : "decrease"}
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Step Changes</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {stepChanges.map((change, i) => (
                              <div
                                key={i}
                                className="p-4 border rounded-lg space-y-2"
                              >
                                <div className="font-medium">
                                  Step {change.order}
                                </div>
                                <div className="space-y-2 text-sm">
                                  <div>
                                    <div className="text-muted-foreground">
                                      From:
                                    </div>
                                    {change.from ? (
                                      <div>{change.from.description}</div>
                                    ) : (
                                      <div className="text-muted-foreground italic">
                                        Not present
                                      </div>
                                    )}
                                  </div>
                                  <div>
                                    <div className="text-muted-foreground">
                                      To:
                                    </div>
                                    {change.to ? (
                                      <div>{change.to.description}</div>
                                    ) : (
                                      <div className="text-muted-foreground italic">
                                        Removed
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="col-span-2">
                        <CardHeader>
                          <CardTitle>Cost Impact</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <div className="text-sm text-muted-foreground">
                                  Total Cost (From):
                                </div>
                                <div className="text-2xl font-bold">
                                  RM {fromEntry.totalCost.toFixed(2)}
                                </div>
                              </div>
                              <div>
                                <div className="text-sm text-muted-foreground">
                                  Total Cost (To):
                                </div>
                                <div className="text-2xl font-bold">
                                  RM {toEntry.totalCost.toFixed(2)}
                                </div>
                              </div>
                            </div>
                            <div
                              className={`text-lg font-medium ${
                                toEntry.totalCost - fromEntry.totalCost > 0
                                  ? "text-red-500"
                                  : "text-green-500"
                              }`}
                            >
                              Cost{" "}
                              {toEntry.totalCost - fromEntry.totalCost > 0
                                ? "increased"
                                : "decreased"}{" "}
                              by RM{" "}
                              {Math.abs(
                                toEntry.totalCost - fromEntry.totalCost
                              ).toFixed(2)}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  );
                })()}
              </div>
            )}
          </TabsContent>

          <TabsContent value="recipe">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">
                      Current Recipe Version
                    </h3>
                    {selectedVersion ? (
                      <Button variant="default" size="sm" onClick={handleSync}>
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Sync with Menu
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCompareVersions(null)}
                        disabled={!compareVersions}
                      >
                        <ArrowLeftRight className="w-4 h-4 mr-2" />
                        Compare Versions
                      </Button>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Ingredients</h4>
                      <div className="space-y-2">
                        {project.ingredients?.map((ingredient) => (
                          <div
                            key={ingredient.id}
                            className="flex justify-between text-sm"
                          >
                            <span>
                              {ingredient.name} ({ingredient.quantity}
                              {ingredient.unit})
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Steps</h4>
                      <div className="space-y-2">
                        {project.steps?.map((step) => (
                          <div key={step.id} className="text-sm">
                            {step.order}. {step.description}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cost">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Cost Analysis</h3>
                    <p className="text-sm text-muted-foreground">
                      Track the cost evolution of your development process.
                    </p>
                  </div>

                  <div className="grid gap-4 grid-cols-3">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">
                          Total R&D Cost
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          RM {project.totalCost.toFixed(2)}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">
                          Average Cost per Test
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          RM{" "}
                          {(
                            project.totalCost / project.timeline.length
                          ).toFixed(2)}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">Latest Test</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          RM {project.lastTestCost.toFixed(2)}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>

      {selectedVersion && (
        <SyncConfirmDialog
          open={showSyncConfirm}
          onOpenChange={setShowSyncConfirm}
          version={selectedVersion}
          changes={{
            ingredients: compareIngredients(
              {
                ...getVersionEntry(selectedVersion)!,
                ingredients:
                  project.ingredients?.map((i) => ({
                    id: i.id,
                    name: i.name,
                    quantity: `${i.quantity}${i.unit}`,
                    unitCost: 0,
                    total: 0,
                  })) || [],
              },
              getVersionEntry(selectedVersion)!
            ),
            steps: compareSteps(
              {
                ...getVersionEntry(selectedVersion)!,
                steps: project.steps || [],
              },
              getVersionEntry(selectedVersion)!
            ),
          }}
          onConfirm={handleSyncConfirm}
        />
      )}
    </Dialog>
  );
}
