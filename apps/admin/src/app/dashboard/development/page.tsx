"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NewProjectDialog } from "@/components/development/new-project-dialog";
import { ProjectDetailDialog } from "@/components/development/project-detail-dialog";
import { DevelopmentList } from "@/components/development/development-list";
import { toast } from "sonner";
import { DevelopmentProject } from "@/types/development";

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
    <div className="h-full flex flex-col">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Development Projects</h1>
          <Button onClick={() => setShowNewProject(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Active Projects</CardTitle>
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
            open={true}
            onOpenChange={(open) => {
              if (!open) setSelectedProject(null);
            }}
          />
        )}
      </div>
    </div>
  );
}
