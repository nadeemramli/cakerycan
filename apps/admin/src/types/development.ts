export interface TimelineEntry {
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
    notes?: string;
  }>;
  laborHours: string;
  totalCost: number;
  version: number;
  observations?: string;
  improvements?: string;
  nextSteps?: string;
  tasteRating?: number;
  textureRating?: number;
  appearanceRating?: number;
  labor: {
    hours: number;
    rate: number;
    total: number;
  };
}

export interface DevelopmentProject {
  id: string;
  name: string;
  status: "active" | "completed" | "on-hold" | "draft";
  baseRecipe: string | null;
  iterations: number;
  lastUpdated: string;
  totalCost: number;
  lastTestCost: number;
  timeline: TimelineEntry[];
  ingredients?: Array<{
    id: string;
    name: string;
    quantity: string;
    unit: string;
  }>;
  steps?: Array<{
    id: string;
    order: number;
    description: string;
  }>;
} 