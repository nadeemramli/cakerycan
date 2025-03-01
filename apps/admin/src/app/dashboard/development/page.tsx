"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NewProjectDialog } from "@/components/development/new-project-dialog";
import { ProjectDetailDialog } from "@/components/development/project-detail-dialog";
import { DevelopmentList } from "@/components/development/development-list";
import { PageContainer } from "@/components/layout/page-container";
import { toast } from "sonner";
import { DevelopmentProject } from "@/types/development";

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

export default function DevelopmentPage() {
  const [showNewProject, setShowNewProject] = useState(false);
  const [selectedProject, setSelectedProject] =
    useState<DevelopmentProject | null>(null);

  const handleView = (project: DevelopmentProject) => {
    setSelectedProject(project);
  };

  const handleDelete = (id: string) => {
    toast.success("Project deleted successfully");
  };

  return (
    <PageContainer
      title="Product Development"
      breadcrumbs={[
        {
          title: "Development",
          href: "/dashboard/development",
        },
      ]}
    >
      <div className="flex items-center justify-between space-y-2">
        <div />
        <Button onClick={() => setShowNewProject(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Development Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <DevelopmentList onView={handleView} onDelete={handleDelete} />
        </CardContent>
      </Card>

      <NewProjectDialog
        open={showNewProject}
        onOpenChange={setShowNewProject}
      />

      {selectedProject && (
        <ProjectDetailDialog
          project={selectedProject}
          open={!!selectedProject}
          onOpenChange={(open) => !open && setSelectedProject(null)}
        />
      )}
    </PageContainer>
  );
}
