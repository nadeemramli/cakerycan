"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProjectTimeline } from "@/components/development/project-timeline";
import { PageContainer } from "@/components/layout/page-container";

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

interface DevelopmentProject {
  id: string;
  name: string;
  status: "active" | "completed" | "on-hold" | "draft";
  baseRecipe: string | null;
  iterations: number;
  lastUpdated: string;
  totalCost: number;
  lastTestCost: number;
  timeline: TimelineEntry[];
}

interface ProjectPageProps {
  params: {
    projectId: string;
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const router = useRouter();
  const [project, setProject] = useState<DevelopmentProject | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch project data
    // This is mock data for now
    const mockProject: DevelopmentProject = {
      id: params.projectId,
      name: "Matcha Cake Evolution",
      status: "active",
      baseRecipe: "Classic Sponge Cake",
      iterations: 5,
      lastUpdated: "2024-02-20",
      totalCost: 450.0,
      lastTestCost: 180.0,
      timeline: [
        {
          id: "1",
          date: "2024-02-20",
          changes:
            "Adjusted matcha ratio to 1:1.5. Improved texture and color. The cake now has a more vibrant green color and the matcha flavor is more pronounced without being bitter. Texture is more moist and tender.",
          ingredients: [
            {
              id: "1",
              name: "Matcha Powder",
              quantity: "100g",
              unitCost: 0.5,
              total: 50.0,
            },
            {
              id: "2",
              name: "Cake Flour",
              quantity: "500g",
              unitCost: 0.2,
              total: 100.0,
            },
          ],
          steps: [
            {
              id: "1",
              order: 1,
              description: "Mix matcha powder with hot water in 1:1.5 ratio",
            },
            {
              id: "2",
              order: 2,
              description: "Sift cake flour and set aside",
            },
          ],
          laborHours: "2",
          totalCost: 180.0,
          version: 2,
        },
        {
          id: "2",
          date: "2024-02-19",
          changes:
            "Initial test batch using base recipe. The cake turned out too dense and the matcha flavor was weak. Need to adjust the ratios and possibly incorporate more air into the batter.",
          ingredients: [
            {
              id: "3",
              name: "Matcha Powder",
              quantity: "150g",
              unitCost: 0.5,
              total: 75.0,
            },
            {
              id: "4",
              name: "Cake Flour",
              quantity: "750g",
              unitCost: 0.2,
              total: 150.0,
            },
          ],
          steps: [
            {
              id: "1",
              order: 1,
              description: "Mix matcha powder with hot water in 1:1 ratio",
            },
            {
              id: "2",
              order: 2,
              description: "Sift cake flour and set aside",
            },
          ],
          laborHours: "3",
          totalCost: 270.0,
          version: 1,
        },
      ],
    };

    setProject(mockProject);
    setIsLoading(false);
  }, [params.projectId]);

  const handleEditEntry = (entryId: string) => {
    router.push(
      `/dashboard/development/${params.projectId}/entries/${entryId}/edit`
    );
  };

  const handleViewEntry = (entryId: string) => {
    router.push(
      `/dashboard/development/${params.projectId}/entries/${entryId}`
    );
  };

  if (isLoading || !project) {
    return (
      <PageContainer
        title="Loading..."
        breadcrumbs={[
          {
            title: "Development",
            href: "/dashboard/development",
          },
          {
            title: "Loading Project...",
          },
        ]}
      >
        <div>Loading...</div>
      </PageContainer>
    );
  }

  return (
    <PageContainer
      title={project.name}
      breadcrumbs={[
        {
          title: "Development",
          href: "/dashboard/development",
        },
        {
          title: project.name,
        },
      ]}
    >
      <div className="flex items-center gap-2 mt-1">
        <Badge variant="outline">{project.baseRecipe || "New Recipe"}</Badge>
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

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">
              {project.status}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Last updated: {project.lastUpdated}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total R&D Cost
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              RM {project.totalCost.toFixed(2)}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Last test: RM {project.lastTestCost.toFixed(2)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Iterations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{project.iterations}</div>
            <p className="text-sm text-muted-foreground mt-1">
              {project.timeline.length} entries
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Development Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <ProjectTimeline
            entries={project.timeline}
            onEdit={handleEditEntry}
            onView={handleViewEntry}
          />
        </CardContent>
      </Card>
    </PageContainer>
  );
}
