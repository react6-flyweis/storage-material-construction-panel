import { X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getProjectDetailsApi } from "../../api/projects.api";
import type { Delivery, Task } from "../../types/projects.types";

type MaterialRequestDetailsModalProps = {
  open: boolean;
  projectId?: string | null;
  onClose: () => void;
};

const formatDate = (dateStr: string | null | undefined) => {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const formatStatus = (status: string) => {
  if (!status) return "-";
  return status.split("_").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
};

const getStatusBadgeClass = (status: string) => {
  const lowercaseStatus = status?.toLowerCase() || "";
  if (["delivered", "deal_closed", "dispatched", "ready_for_delivery"].includes(lowercaseStatus)) {
    return "bg-green-50 text-green-700 border border-green-100";
  }
  if (["in_transit", "fabrication_started", "quality_inspection", "proposal_sent"].includes(lowercaseStatus)) {
    return "bg-blue-50 text-blue-700 border border-blue-100";
  }
  if (["scheduled", "negotiation", "packing_bundling", "requirements_gathered"].includes(lowercaseStatus)) {
    return "bg-yellow-50 text-yellow-700 border border-yellow-100";
  }
  return "bg-gray-50 text-gray-700 border border-gray-100";
};

const getPriorityClass = (priority: string) => {
  const p = priority?.toLowerCase() || "";
  if (p === "high") return "bg-red-50 text-red-700 border border-red-100";
  if (p === "medium") return "bg-orange-50 text-orange-700 border border-orange-100";
  return "bg-blue-50 text-blue-700 border border-blue-100";
};

export default function MaterialRequestDetailsModal({
  open,
  projectId,
  onClose,
}: MaterialRequestDetailsModalProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["project-details", projectId],
    queryFn: () => getProjectDetailsApi(projectId!),
    enabled: !!projectId && open,
  });

  const responseData = data?.data?.data;
  const project = responseData?.project;
  const deliveries = responseData?.deliveries || [];
  const tasks = responseData?.tasks || [];

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4 py-6">
      <div className="bg-white rounded-xl w-full max-w-[700px] flex flex-col max-h-[90vh] shadow-xl animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-gray-100 flex-shrink-0">
          <h2 className="text-lg font-bold text-gray-900">Project & Construction Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto px-8 py-6 custom-scrollbar flex-1">
          {isLoading ? (
            /* Skeleton Loader */
            <div className="animate-pulse space-y-6 py-4">
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-3.5 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 pt-6 space-y-4">
                <div className="h-5 bg-gray-200 rounded w-1/3"></div>
                <div className="h-20 bg-gray-100 rounded"></div>
              </div>
              <div className="border-t border-gray-100 pt-6 space-y-4">
                <div className="h-5 bg-gray-200 rounded w-1/3"></div>
                <div className="h-20 bg-gray-100 rounded"></div>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-10 text-red-500 font-medium">
              Failed to load project details. Please try again.
            </div>
          ) : !project ? (
            <div className="text-center py-10 text-gray-500 font-medium">
              No project details found.
            </div>
          ) : (
            <div>
              {/* Status Badge */}
              <div className="mb-6 mt-2">
                <span className={`px-3 py-1 rounded-md text-sm font-semibold ${getStatusBadgeClass(project.lifecycleStatus)}`}>
                  {formatStatus(project.lifecycleStatus)}
                </span>
              </div>

              {/* Grid Details */}
              <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-8">
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Project ID</p>
                  <p className="text-base font-bold text-gray-900">{project.jobId}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Building Type</p>
                  <p className="text-base font-bold text-gray-900 capitalize">{project.buildingType || "-"}</p>
                </div>

                <div className="col-span-1">
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Project / Site Name</p>
                  <p className="text-base font-bold text-gray-900">
                    {project.projectName || `${project.buildingType || "Project"} - ${project.location || "Site"}`}
                  </p>
                  <p className="text-sm text-gray-500 mt-0.5">{project.location || "No location listed"}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Buildings Count</p>
                  <p className="text-base font-bold text-gray-900">{project.numberOfBuildings ?? "-"}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">End Date</p>
                  <p className="text-base font-bold text-gray-900">{formatDate(project.endDate)}</p>
                </div>
                {project.customerId && (
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Customer</p>
                    <p className="text-base font-bold text-gray-900">
                      {project.customerId.firstName} {project.customerId.lastName || ""}
                    </p>
                    <p className="text-xs text-gray-500">{project.customerId.email}</p>
                  </div>
                )}
              </div>

              {/* Deliveries */}
              <div className="border-t border-gray-100 pt-6 mb-6">
                <h3 className="text-base font-bold text-gray-900 mb-4">Deliveries ({deliveries.length})</h3>
                {deliveries.length === 0 ? (
                  <p className="text-sm text-gray-500">No deliveries scheduled for this project.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[500px]">
                      <thead>
                        <tr className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                          <th className="pb-3 pr-4">Delivery #</th>
                          <th className="pb-3 pr-4">Status</th>
                          <th className="pb-3 pr-4">Date</th>
                          <th className="pb-3">Description</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {deliveries.map((delivery: Delivery) => (
                          <tr key={delivery._id} className="text-sm">
                            <td className="py-3 text-gray-900 font-semibold">{delivery.deliveryNumber}</td>
                            <td className="py-3 pr-4">
                              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(delivery.status)}`}>
                                {formatStatus(delivery.status)}
                              </span>
                            </td>
                            <td className="py-3 text-gray-500">{formatDate(delivery.deliveryDate)}</td>
                            <td className="py-3 text-gray-500 truncate max-w-[200px]">{delivery.description || "-"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Tasks */}
              <div className="border-t border-gray-100 pt-6 mb-6">
                <h3 className="text-base font-bold text-gray-900 mb-4">Tasks ({tasks.length})</h3>
                {tasks.length === 0 ? (
                  <p className="text-sm text-gray-500">No tasks assigned to this project.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[500px]">
                      <thead>
                        <tr className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                          <th className="pb-3 pr-4">Task Title</th>
                          <th className="pb-3 pr-4">Priority</th>
                          <th className="pb-3 pr-4">Status</th>
                          <th className="pb-3">Due Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {tasks.map((task: Task) => (
                          <tr key={task._id} className="text-sm">
                            <td className="py-3 text-gray-900 font-semibold pr-4">{task.title}</td>
                            <td className="py-3 pr-4">
                              <span className={`px-2.5 py-0.5 rounded-lg text-xs font-bold ${getPriorityClass(task.priority)}`}>
                                {task.priority}
                              </span>
                            </td>
                            <td className="py-3 pr-4">
                              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(task.status)}`}>
                                {formatStatus(task.status)}
                              </span>
                            </td>
                            <td className="py-3 text-gray-500">{formatDate(task.dueDate)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
