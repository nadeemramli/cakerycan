"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Campaign {
  id: string;
  name: string;
  type: "one-time" | "evergreen";
  status: "active" | "scheduled" | "ended" | "draft";
  discountType: "percentage" | "fixed" | "bogo";
  discountValue: string;
  startDate: string;
  endDate?: string;
  redemptions: number;
  revenue: string;
}

export function CampaignManager({ type }: { type: "one-time" | "evergreen" }) {
  const [showNewCampaign, setShowNewCampaign] = useState(false);

  // Mock data
  const campaigns: Campaign[] = [
    {
      id: "1",
      name: "New Year Special",
      type: "one-time" as const,
      status: "active" as const,
      discountType: "percentage" as const,
      discountValue: "20%",
      startDate: "2024-01-01",
      endDate: "2024-01-31",
      redemptions: 145,
      revenue: "RM 12,450",
    },
    {
      id: "2",
      name: "First Purchase",
      type: "evergreen" as const,
      status: "active" as const,
      discountType: "fixed" as const,
      discountValue: "RM 10",
      startDate: "2024-01-01",
      redemptions: 89,
      revenue: "RM 8,900",
    },
  ].filter((campaign) => campaign.type === type);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">
          {type === "one-time"
            ? "One-time / Launch Campaigns"
            : "Evergreen Campaigns"}
        </h3>
        <Dialog open={showNewCampaign} onOpenChange={setShowNewCampaign}>
          <DialogTrigger asChild>
            <Button>New Campaign</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New Campaign</DialogTitle>
              <DialogDescription>
                Set up a new {type} campaign. Fill in the campaign details
                below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Campaign Name</Label>
                <Input id="name" placeholder="Enter campaign name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="discount-type">Discount Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select discount type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentage Off</SelectItem>
                    <SelectItem value="fixed">Fixed Amount Off</SelectItem>
                    <SelectItem value="bogo">Buy One Get One</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="discount-value">Discount Value</Label>
                <Input id="discount-value" placeholder="Enter discount value" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="start-date">Start Date</Label>
                <Input id="start-date" type="date" />
              </div>
              {type === "one-time" && (
                <div className="grid gap-2">
                  <Label htmlFor="end-date">End Date</Label>
                  <Input id="end-date" type="date" />
                </div>
              )}
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowNewCampaign(false)}
              >
                Cancel
              </Button>
              <Button>Create Campaign</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Campaign</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Discount</TableHead>
            <TableHead>Start Date</TableHead>
            {type === "one-time" && <TableHead>End Date</TableHead>}
            <TableHead>Redemptions</TableHead>
            <TableHead>Revenue</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {campaigns.map((campaign) => (
            <TableRow key={campaign.id}>
              <TableCell>{campaign.name}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    campaign.status === "active"
                      ? "default"
                      : campaign.status === "scheduled"
                      ? "secondary"
                      : campaign.status === "ended"
                      ? "destructive"
                      : "outline"
                  }
                >
                  {campaign.status}
                </Badge>
              </TableCell>
              <TableCell>{campaign.discountValue}</TableCell>
              <TableCell>{campaign.startDate}</TableCell>
              {type === "one-time" && <TableCell>{campaign.endDate}</TableCell>}
              <TableCell>{campaign.redemptions}</TableCell>
              <TableCell>{campaign.revenue}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
