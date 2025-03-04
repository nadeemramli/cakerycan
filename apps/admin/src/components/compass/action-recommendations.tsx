"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  CircleDollarSign,
  LineChart,
  ShoppingCart,
  TrendingDown,
} from "lucide-react";

interface ActionItem {
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  category: "revenue" | "costs" | "operations";
  status: "critical" | "warning" | "positive";
  details: {
    currentValue: string;
    targetValue: string;
    recommendations: string[];
    nextSteps: string[];
  };
}

const getStatusIcon = (status: ActionItem["status"]) => {
  switch (status) {
    case "critical":
      return <AlertTriangle className="h-5 w-5 text-red-500" />;
    case "warning":
      return <TrendingDown className="h-5 w-5 text-yellow-500" />;
    case "positive":
      return <CheckCircle2 className="h-5 w-5 text-green-500" />;
  }
};

const getCategoryIcon = (category: ActionItem["category"]) => {
  switch (category) {
    case "revenue":
      return <CircleDollarSign className="h-5 w-5" />;
    case "costs":
      return <LineChart className="h-5 w-5" />;
    case "operations":
      return <ShoppingCart className="h-5 w-5" />;
  }
};

const getImpactColor = (impact: ActionItem["impact"]) => {
  switch (impact) {
    case "high":
      return "bg-red-100 text-red-800 border-red-200";
    case "medium":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "low":
      return "bg-green-100 text-green-800 border-green-200";
  }
};

interface ActionCardProps {
  action: ActionItem;
  onViewDetails: (action: ActionItem) => void;
}

const ActionCard = ({ action, onViewDetails }: ActionCardProps) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div className="mt-1">{getStatusIcon(action.status)}</div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <h4 className="font-medium">{action.title}</h4>
                <Badge
                  variant="outline"
                  className={`${getImpactColor(action.impact)}`}
                >
                  {action.impact} impact
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {action.description}
              </p>
              <div className="flex items-center space-x-2 pt-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  {getCategoryIcon(action.category)}
                  <span className="ml-1 capitalize">{action.category}</span>
                </div>
                <button
                  onClick={() => onViewDetails(action)}
                  className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                >
                  View Details
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ActionDetails = ({
  action,
  isOpen,
  onClose,
}: {
  action: ActionItem;
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getStatusIcon(action.status)}
            {action.title}
          </DialogTitle>
          <DialogDescription>{action.description}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-1">Current Value</h4>
              <p className="text-sm text-muted-foreground">
                {action.details.currentValue}
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-1">Target Value</h4>
              <p className="text-sm text-muted-foreground">
                {action.details.targetValue}
              </p>
            </div>
          </div>
          <div>
            <h4 className="font-medium mb-2">Recommendations</h4>
            <ul className="space-y-2">
              {action.details.recommendations.map((rec, index) => (
                <li key={index} className="text-sm text-muted-foreground">
                  • {rec}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Next Steps</h4>
            <ul className="space-y-2">
              {action.details.nextSteps.map((step, index) => (
                <li key={index} className="text-sm text-muted-foreground">
                  {index + 1}. {step}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export function ActionRecommendations() {
  const [selectedAction, setSelectedAction] = useState<ActionItem | null>(null);

  // TODO: Replace with actual data from API
  const actions: ActionItem[] = [
    {
      title: "Revenue Below Target",
      description:
        "Current revenue is 16.7% below forecast. Consider reviewing pricing strategy and implementing targeted promotions.",
      impact: "high",
      category: "revenue",
      status: "critical",
      details: {
        currentValue: "$125,000",
        targetValue: "$150,000",
        recommendations: [
          "Review current pricing strategy across all product lines",
          "Analyze competitor pricing and market positioning",
          "Identify opportunities for upselling and cross-selling",
        ],
        nextSteps: [
          "Conduct pricing analysis by product category",
          "Develop targeted promotion campaign for underperforming products",
          "Schedule team meeting to review sales strategy",
        ],
      },
    },
    {
      title: "Rising Operating Costs",
      description:
        "Operating expenses are 15.4% above forecast. Review cost centers and identify potential areas for optimization.",
      impact: "medium",
      category: "costs",
      status: "warning",
      details: {
        currentValue: "$75,000",
        targetValue: "$65,000",
        recommendations: [
          "Audit current operational expenses",
          "Identify areas of cost optimization",
          "Review vendor contracts and negotiate better terms",
        ],
        nextSteps: [
          "Create detailed expense report by department",
          "Schedule vendor review meetings",
          "Implement cost-saving measures",
        ],
      },
    },
    {
      title: "Strong Order Volume",
      description:
        "Order volume is 12.5% above forecast. Ensure inventory levels can support increased demand.",
      impact: "low",
      category: "operations",
      status: "positive",
      details: {
        currentValue: "450 orders",
        targetValue: "400 orders",
        recommendations: [
          "Review inventory management system",
          "Optimize supply chain for increased demand",
          "Consider additional staffing needs",
        ],
        nextSteps: [
          "Update inventory forecasts",
          "Contact suppliers to ensure stock availability",
          "Review staffing schedule",
        ],
      },
    },
  ];

  const handleViewDetails = (action: ActionItem) => {
    setSelectedAction(action);
  };

  const handleCloseDetails = () => {
    setSelectedAction(null);
  };

  return (
    <div className="space-y-4">
      {actions.map((action) => (
        <ActionCard
          key={action.title}
          action={action}
          onViewDetails={handleViewDetails}
        />
      ))}
      {selectedAction && (
        <ActionDetails
          action={selectedAction}
          isOpen={!!selectedAction}
          onClose={handleCloseDetails}
        />
      )}
    </div>
  );
}
