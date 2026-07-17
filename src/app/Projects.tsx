import { useState } from "react";
import Calendar from "../components/calendar/Calendar";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import MaterialRequestDetailsModal from "../components/materials/MaterialRequestDetailsModal";
import AddDeliveryDrawer from "../components/materials/AddDeliveryDrawer";
import { useQuery } from "@tanstack/react-query";
import { getProjectsApi } from "../api/projects.api";
import type { Project } from "../types/projects.types";
import ProjectSelector from "../components/common/ProjectSelector";

const statusMeta: Record<string, { label: string; className: string }> = {
  initial_contact: { label: "Initial Contact", className: "bg-gray-50 text-gray-500" },
  requirements_gathered: { label: "Requirements Gathered", className: "bg-cyan-50 text-cyan-600" },
  proposal_sent: { label: "Proposal Sent", className: "bg-blue-50 text-blue-600" },
  negotiation: { label: "Negotiation", className: "bg-yellow-50 text-yellow-600" },
  deal_closed: { label: "Deal Closed", className: "bg-green-50 text-green-600" },
  packing_bundling: { label: "Packing & Bundling", className: "bg-orange-50 text-orange-500" },
  fabrication_started: { label: "Fabrication Started", className: "bg-purple-50 text-purple-600" },
  quality_inspection: { label: "Quality Inspection", className: "bg-indigo-50 text-indigo-600" },
  ready_for_delivery: { label: "Ready for Delivery", className: "bg-green-50 text-green-500" },
  dispatched: { label: "Dispatched", className: "bg-teal-50 text-teal-600" },
};

const getStatusBadge = (status: string) => {
  const meta = statusMeta[status] || {
    label: status ? status.split("_").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") : "Unknown",
    className: "bg-gray-50 text-gray-500"
  };
  return (
    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-lg ${meta.className}`}>
      {meta.label}
    </span>
  );
};

const getPriorityBadge = (status: string) => {
  let priority = "Medium";
  let className = "bg-orange-50 text-orange-400";
  if (["fabrication_started", "quality_inspection", "ready_for_delivery"].includes(status)) {
    priority = "High";
    className = "bg-red-50 text-red-500";
  } else if (["initial_contact", "requirements_gathered", "negotiation"].includes(status)) {
    priority = "Low";
    className = "bg-blue-50 text-blue-400";
  }
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-lg text-[10px] font-bold ${className}`}>
      {priority}
    </span>
  );
};

export default function Projects() {
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"calendar" | "project">("calendar");
  const [toggle, setToggle] = useState(false);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [selectedCalendarProjectId, setSelectedCalendarProjectId] = useState<string>("");

  // Query for paginated projects list
  const { data, isLoading, error } = useQuery({
    queryKey: ["projects", page, limit],
    queryFn: () => getProjectsApi({ page, limit }),
    enabled: activeTab === "project",
  });

  // Query for calendar dropdown projects list (higher limit to show more in dropdown)
  const { data: dropdownData } = useQuery({
    queryKey: ["projects-dropdown"],
    queryFn: () => getProjectsApi({ page: 1, limit: 100 }),
    enabled: activeTab === "calendar",
  });

  const projectsResponse = data?.data?.data;
  const projects = projectsResponse?.projects || [];
  const total = projectsResponse?.total || 0;
  const totalPages = Math.ceil(total / limit) || 1;

  const dropdownProjects = dropdownData?.data?.data?.projects || [];

  const selectedProjObj = dropdownProjects.find((p: Project) => p._id === selectedCalendarProjectId);
  const leadIdToPass = selectedProjObj?.leadId || selectedCalendarProjectId || "";

  return (
    <div className="space-y-6 pb-10">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Projects and Calendar
          </h1>
          <p className="text-sm text-gray-500 font-medium mt-1">
            Construction Department Performance
          </p>
        </div>
        <div className="flex items-center">
          <div className="bg-[#F3F4F6] p-1 rounded-lg flex">
            <button
              onClick={() => setActiveTab("calendar")}
              className={`px-8 py-2 rounded-md text-sm font-medium transition-all ${activeTab === "calendar"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
                }`}
            >
              Calendar
            </button>
            <button
              onClick={() => setActiveTab("project")}
              className={`px-8 py-2 rounded-md text-sm font-medium transition-all ${activeTab === "project"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
                }`}
            >
              Project
            </button>
          </div>
        </div>
      </div>

      {activeTab === "calendar" && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 mb-2">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-gray-900">Project</span>
            <ProjectSelector
              value={selectedCalendarProjectId}
              onChange={setSelectedCalendarProjectId}
              showAllOption
              width="320px"
            />
          </div>
          <button onClick={() => setToggle(true)} className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-lg shadow-sm transition-colors text-sm flex items-center gap-2">
            <span className="text-lg leading-none">+</span> Add Delivery
          </button>
        </div>
      )}

      {activeTab === "calendar" ? (
        <div className="min-h-[600px]">
          <Calendar leadId={leadIdToPass} />
        </div>
      ) : (
        <div className="space-y-4">
          {/* Project List Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-50">
              <h2 className="text-base font-bold text-gray-900 uppercase tracking-tight">
                Project List
              </h2>
            </div>

            <div className="overflow-x-auto scroll-hide">
              <table className="w-full text-left min-w-[800px]">
                <thead className="bg-[#F9FAFB] border-b border-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-[11px] font-bold text-gray-900 uppercase tracking-wider">
                      Project ID
                    </th>
                    <th className="px-6 py-3 text-[11px] font-bold text-gray-900 uppercase tracking-wider">
                      Project / Site
                    </th>
                    <th className="px-6 py-3 text-[11px] font-bold text-gray-900 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-[11px] font-bold text-gray-900 uppercase tracking-wider">
                      Priority
                    </th>
                    <th className="px-6 py-3 text-[11px] font-bold text-gray-900 uppercase tracking-wider text-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {isLoading ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-10 text-center text-sm text-gray-500 font-medium">
                        Loading projects...
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-10 text-center text-sm text-red-500 font-medium">
                        Failed to load projects. Please try again.
                      </td>
                    </tr>
                  ) : projects.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-10 text-center text-sm text-gray-500 font-medium">
                        No projects found.
                      </td>
                    </tr>
                  ) : (
                    projects.map((project: Project) => (
                      <tr
                        key={project._id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-3.5 text-xs font-bold text-gray-900">
                          {project.jobId}
                        </td>
                        <td className="px-6 py-3.5">
                          <div className="text-xs font-bold text-gray-900">
                            {project.projectName || `${project.buildingType || "Project"} - ${project.location || "Site"}`}
                          </div>
                          <div className="text-[10px] font-medium text-gray-400 mt-0.5">
                            {project.location || "No Location"}
                          </div>
                        </td>
                        <td className="px-6 py-3.5">
                          {getStatusBadge(project.lifecycleStatus)}
                        </td>
                        <td className="px-6 py-3.5">
                          {getPriorityBadge(project.lifecycleStatus)}
                        </td>
                        <td className="px-6 py-3.5 text-center">
                          <button
                            onClick={() => {
                              setSelectedProjectId(project._id);
                              setShowDetails(true);
                            }}
                            className="px-4 py-1 border border-gray-200 rounded-lg text-[11px] font-bold text-gray-700 hover:bg-gray-50 transition-all uppercase tracking-wider"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 order-2 sm:order-1">
              <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                Showing
              </span>
              <div className="relative">
                <select
                  value={limit}
                  onChange={(e) => {
                    setLimit(Number(e.target.value));
                    setPage(1);
                  }}
                  className="appearance-none bg-white border border-gray-100 rounded-xl pl-4 pr-10 py-1.5 text-xs font-bold text-gray-700 shadow-sm focus:outline-none focus:border-blue-500 transition-colors"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
              </div>
              <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                Results
              </span>
            </div>

            <div className="flex items-center gap-1 order-1 sm:order-2">
              <button
                disabled={page === 1}
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-100 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                .map((p, idx, arr) => {
                  const showEllipsis = idx > 0 && p - arr[idx - 1] > 1;
                  return (
                    <div key={p} className="flex items-center gap-1">
                      {showEllipsis && <span className="text-gray-400 px-1">...</span>}
                      <button
                        onClick={() => setPage(p)}
                        className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold transition-all ${
                          page === p
                            ? "bg-blue-600 text-white shadow-lg shadow-blue-100"
                            : "text-gray-400 hover:bg-gray-50"
                        }`}
                      >
                        {p}
                      </button>
                    </div>
                  );
                })}

              <button
                disabled={page === totalPages}
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-100 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      <AddDeliveryDrawer open={toggle} onClose={() => setToggle(false)} />

      <MaterialRequestDetailsModal
        open={showDetails}
        projectId={selectedProjectId}
        onClose={() => {
          setShowDetails(false);
          setSelectedProjectId(null);
        }}
      />
    </div>
  );
}

