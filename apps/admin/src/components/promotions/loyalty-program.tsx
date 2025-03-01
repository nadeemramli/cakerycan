"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface LoyaltyTier {
  id: string;
  name: string;
  minSpend: number;
  pointsMultiplier: number;
  benefits: string[];
  members: number;
}

interface Reward {
  id: string;
  name: string;
  pointsCost: number;
  type: "discount" | "product" | "service";
  value: string;
  redemptions: number;
}

export function LoyaltyProgram() {
  const [showNewTier, setShowNewTier] = useState(false);
  const [showNewReward, setShowNewReward] = useState(false);

  // Mock data
  const tiers: LoyaltyTier[] = [
    {
      id: "1",
      name: "Bronze",
      minSpend: 0,
      pointsMultiplier: 1,
      benefits: ["Basic points earning", "Birthday reward"],
      members: 1250,
    },
    {
      id: "2",
      name: "Silver",
      minSpend: 1000,
      pointsMultiplier: 1.5,
      benefits: ["1.5x points earning", "Birthday reward", "Free delivery"],
      members: 750,
    },
    {
      id: "3",
      name: "Gold",
      minSpend: 5000,
      pointsMultiplier: 2,
      benefits: [
        "2x points earning",
        "Birthday reward",
        "Free delivery",
        "Priority orders",
      ],
      members: 450,
    },
  ];

  const rewards: Reward[] = [
    {
      id: "1",
      name: "RM10 Off",
      pointsCost: 1000,
      type: "discount",
      value: "RM 10",
      redemptions: 245,
    },
    {
      id: "2",
      name: "Free Cupcake",
      pointsCost: 500,
      type: "product",
      value: "1 Cupcake",
      redemptions: 189,
    },
  ];

  return (
    <div className="space-y-6">
      <Tabs defaultValue="tiers">
        <TabsList>
          <TabsTrigger value="tiers">Membership Tiers</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
        </TabsList>

        <TabsContent value="tiers" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Membership Tiers</h3>
            <Dialog open={showNewTier} onOpenChange={setShowNewTier}>
              <DialogTrigger asChild>
                <Button>New Tier</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Tier</DialogTitle>
                  <DialogDescription>
                    Set up a new membership tier with its benefits and
                    requirements.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="tier-name">Tier Name</Label>
                    <Input id="tier-name" placeholder="Enter tier name" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="min-spend">Minimum Spend (RM)</Label>
                    <Input
                      id="min-spend"
                      type="number"
                      placeholder="Enter minimum spend"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="multiplier">Points Multiplier</Label>
                    <Input
                      id="multiplier"
                      type="number"
                      step="0.1"
                      placeholder="Enter points multiplier"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowNewTier(false)}
                  >
                    Cancel
                  </Button>
                  <Button>Create Tier</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tier</TableHead>
                <TableHead>Min. Spend</TableHead>
                <TableHead>Points Multiplier</TableHead>
                <TableHead>Benefits</TableHead>
                <TableHead>Members</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tiers.map((tier) => (
                <TableRow key={tier.id}>
                  <TableCell className="font-medium">{tier.name}</TableCell>
                  <TableCell>RM {tier.minSpend}</TableCell>
                  <TableCell>{tier.pointsMultiplier}x</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {tier.benefits.map((benefit, index) => (
                        <Badge key={index} variant="secondary">
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{tier.members}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="rewards" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Rewards Catalog</h3>
            <Dialog open={showNewReward} onOpenChange={setShowNewReward}>
              <DialogTrigger asChild>
                <Button>New Reward</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Reward</DialogTitle>
                  <DialogDescription>
                    Add a new reward to the loyalty program catalog.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="reward-name">Reward Name</Label>
                    <Input id="reward-name" placeholder="Enter reward name" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="points-cost">Points Cost</Label>
                    <Input
                      id="points-cost"
                      type="number"
                      placeholder="Enter points required"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="reward-value">Reward Value</Label>
                    <Input id="reward-value" placeholder="Enter reward value" />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowNewReward(false)}
                  >
                    Cancel
                  </Button>
                  <Button>Create Reward</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {rewards.map((reward) => (
              <Card key={reward.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{reward.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Points:
                      </span>
                      <span className="font-medium">{reward.pointsCost}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Value:
                      </span>
                      <span className="font-medium">{reward.value}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Redemptions:
                      </span>
                      <span className="font-medium">{reward.redemptions}</span>
                    </div>
                    <Button className="w-full mt-4" variant="outline" size="sm">
                      Edit Reward
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
