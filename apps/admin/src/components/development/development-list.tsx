import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, MoreVertical } from "lucide-react";
import { DevelopmentProject } from "@/types/development";

interface DevelopmentListProps {
  onView: (project: DevelopmentProject) => void;
  onDelete: (id: string) => void;
}

export function DevelopmentList({ onView, onDelete }: DevelopmentListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock data - will be replaced with actual data from database
  const projects: DevelopmentProject[] = [
    {
      id: "1",
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
            "Adjusted matcha ratio to 1:1.5. Improved texture and color.",
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
          labor: {
            hours: 2,
            rate: 15,
            total: 30.0,
          },
        },
        {
          id: "2",
          date: "2024-02-19",
          changes:
            "Initial test batch using base recipe. The cake turned out too dense and the matcha flavor was weak.",
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
          labor: {
            hours: 3,
            rate: 15,
            total: 45.0,
          },
        },
      ],
    },
    {
      id: "2",
      name: "New Cookie Recipe",
      status: "draft",
      baseRecipe: null,
      iterations: 3,
      lastUpdated: "2024-02-19",
      totalCost: 280.0,
      lastTestCost: 95.0,
      timeline: [],
    },
    {
      id: "3",
      name: "Chocolate Croissant v2",
      status: "completed",
      baseRecipe: "Classic Croissant",
      iterations: 8,
      lastUpdated: "2024-02-15",
      totalCost: 680.0,
      lastTestCost: 120.0,
      timeline: [],
    },
  ];

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "on-hold":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="cakes">Cakes</SelectItem>
            <SelectItem value="cookies">Cookies</SelectItem>
            <SelectItem value="pastries">Pastries</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="on-hold">On Hold</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project Name</TableHead>
              <TableHead>Base Recipe</TableHead>
              <TableHead>Iterations</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Total R&D Cost</TableHead>
              <TableHead className="text-right">Last Test Cost</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProjects.map((project) => (
              <TableRow key={project.id}>
                <TableCell className="font-medium">{project.name}</TableCell>
                <TableCell>{project.baseRecipe || "New Recipe"}</TableCell>
                <TableCell>{project.iterations}</TableCell>
                <TableCell>{project.lastUpdated}</TableCell>
                <TableCell>
                  <div
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(
                      project.status
                    )}`}
                  >
                    {project.status}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  RM {project.totalCost.toFixed(2)}
                </TableCell>
                <TableCell className="text-right">
                  RM {project.lastTestCost.toFixed(2)}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onView(project)}>
                        View details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onDelete(project.id)}>
                        Delete project
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
