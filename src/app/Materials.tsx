import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import StatsOverview from "../components/cards/StatCard";
import SuccessModal from "../components/common/SuccessModal";
import RequestMaterialModel from "../components/requestMaterialModel";
import MaterialRequestDetailsModal from "../components/materials/MaterialRequestDetailsModal";
import { Plus } from "lucide-react";
import { getMaterialRequestsApi, getProjectsApi } from "../api/projects.api";
import type { MaterialRequest } from "../types/projects.types";

const formatDateTime = (dateStr: string) => {
  if (!dateStr) return { date: "-", time: "-" };
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return { date: "-", time: "-" };
  
  const date = d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  
  const time = d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  
  return { date, time };
};

const formatDate = (dateStr: string | null) => {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "-";
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export default function Materials() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<MaterialRequest | null>(null);

  // Filters State
  const [projectFilter, setProjectFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [requestedByFilter, setRequestedByFilter] = useState("");
  const [startDateFilter, setStartDateFilter] = useState("");
  const [endDateFilter, setEndDateFilter] = useState("");

  // Fetch Projects for Filter Dropdown
  const { data: projectsDropdownData } = useQuery({
    queryKey: ["projects-dropdown"],
    queryFn: () => getProjectsApi({ page: 1, limit: 100 }),
  });
  const projectsList = projectsDropdownData?.data?.data?.projects || [];

  // Fetch Material Requests
  const { data, isLoading, error } = useQuery({
    queryKey: [
      "material-requests",
      page,
      limit,
      projectFilter,
      departmentFilter,
      statusFilter,
      requestedByFilter,
      startDateFilter,
      endDateFilter,
    ],
    queryFn: () =>
      getMaterialRequestsApi({
        page,
        limit,
        project: projectFilter || undefined,
        department: departmentFilter || undefined,
        status: statusFilter || undefined,
        requestedBy: requestedByFilter || undefined,
        startDate: startDateFilter || undefined,
        endDate: endDateFilter || undefined,
      }),
  });

  const responseData = data?.data?.data;
  const requests = responseData?.materialRequests || [];
  const total = responseData?.total || 0;
  const statsData = responseData?.stats;
  const totalPages = Math.ceil(total / limit) || 1;

  // Extract unique departments and requesters from current list for filters
  const uniqueDepartments = Array.from(
    new Set(requests.map((r) => r.department).filter(Boolean))
  );
  const uniqueRequesters = Array.from(
    new Set(requests.map((r) => r.requestedBy?.name).filter(Boolean))
  );

  const stats = [
    {
      key: "total",
      title: "Total Requests",
      value: statsData?.totalRequests ?? 0,
      iconBg: "#F5F3FF",
      iconsvg: <div className="text-purple-600 text-lg">💰</div>,
    },
    {
      key: "pending",
      title: "Pending",
      value: statsData?.pending ?? 0,
      iconBg: "#F0FDF4",
      iconsvg: <div className="text-green-600 text-lg">🛍️</div>,
    },
    {
      key: "approved",
      title: "Approved",
      value: statsData?.approved ?? 0,
      iconBg: "#FEFCE8",
      iconsvg: <div className="text-yellow-600 text-lg">🔓</div>,
    },
    {
      key: "rejected",
      title: "Rejected",
      value: statsData?.rejected ?? 0,
      iconBg: "#FEF2F2",
      iconsvg: <div className="text-red-600 text-lg">⌛</div>,
    },
  ];

  return (
    <div className="space-y-6 pb-10">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            Material Requests
          </h1>
          <p className="text-gray-500 font-medium mt-0.5 text-xs sm:text-[13px]">
            View & Manage all additional material requests.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
          <button className="bg-white border border-gray-200 text-gray-700 font-bold px-4 py-2 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors text-xs">
            Export
          </button>
          <button
            onClick={() => setIsCreateOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-95 flex items-center justify-center gap-2 text-xs"
          >
            <Plus className="w-4 h-4" />
            Requests Material
          </button>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
            Projects
          </label>
          <select
            value={projectFilter}
            onChange={(e) => {
              setProjectFilter(e.target.value);
              setPage(1);
            }}
            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100"
          >
            <option value="">All Projects</option>
            {projectsList.map((proj: any) => (
              <option key={proj._id} value={proj.leadId || proj._id}>
                {proj.projectName || proj.jobId}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
            Departments
          </label>
          <select
            value={departmentFilter}
            onChange={(e) => {
              setDepartmentFilter(e.target.value);
              setPage(1);
            }}
            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100"
          >
            <option value="">All Departments</option>
            {uniqueDepartments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
            Status
          </label>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
            Requested By
          </label>
          <select
            value={requestedByFilter}
            onChange={(e) => {
              setRequestedByFilter(e.target.value);
              setPage(1);
            }}
            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100"
          >
            <option value="">All</option>
            {uniqueRequesters.map((reqName) => (
              <option key={reqName} value={reqName}>
                {reqName}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
            Date Range
          </label>
          <div className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs font-bold text-gray-700 flex items-center justify-between cursor-pointer">
            <input
              type="date"
              value={startDateFilter}
              onChange={(e) => {
                setStartDateFilter(e.target.value);
                setPage(1);
              }}
              className="bg-transparent outline-none cursor-pointer w-full text-[10px] sm:text-[11px] text-gray-500"
            />
            <span className="mx-1 text-gray-400">-</span>
            <input
              type="date"
              value={endDateFilter}
              onChange={(e) => {
                setEndDateFilter(e.target.value);
                setPage(1);
              }}
              className="bg-transparent outline-none cursor-pointer w-full text-[10px] sm:text-[11px] text-gray-500"
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <StatsOverview
        stats={stats}
        gridCols="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      />

      {/* Table Section */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-gray-50 flex items-center justify-between">
          <h3 className="text-base font-bold text-gray-900">
            Material Request ({total})
          </h3>
        </div>

        <div className="overflow-x-auto scroll-hide">
          <table className="w-full text-left min-w-[900px]">
            <thead>
              <tr className="text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-50 bg-gray-50/50">
                <th className="px-5 py-3">Request ID</th>
                <th className="px-5 py-3">Project / Site</th>
                <th className="px-5 py-3">Items</th>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3">Required</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Priority</th>
                <th className="px-5 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {isLoading ? (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-gray-500 font-medium">
                    Loading material requests...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-red-500 font-medium">
                    Error loading material requests.
                  </td>
                </tr>
              ) : requests.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-gray-500 font-medium">
                    No material requests found.
                  </td>
                </tr>
              ) : (
                requests.map((req: MaterialRequest) => {
                  const { date, time } = formatDateTime(req.requestDate);
                  return (
                    <tr
                      key={req._id}
                      className="text-[12px] hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-5 py-3.5 font-bold text-gray-900">
                        {req.requestId}
                      </td>
                      <td className="px-5 py-3.5">
                        <p className="font-bold text-gray-700 leading-tight">
                          {req.project?.projectName || "N/A"}
                        </p>
                        <p className="text-[10px] text-gray-400 font-medium">
                          {req.siteLocation}
                        </p>
                      </td>
                      <td className="px-5 py-3.5">
                        <p className="font-bold text-gray-700 leading-tight">
                          {req.itemCount} {req.itemCount === 1 ? "Item" : "Items"}
                        </p>
                        <p className="text-[10px] text-gray-400 font-medium truncate w-32">
                          {req.requestedItems.map((i) => i.name).join(", ")}
                        </p>
                      </td>
                      <td className="px-5 py-3.5">
                        <p className="font-bold text-gray-700 leading-tight">{date}</p>
                        <p className="text-[10px] text-gray-400 font-medium">
                          {time}
                        </p>
                      </td>
                      <td className="px-5 py-3.5 font-bold text-gray-700">
                        {formatDate(req.requiredBy)}
                      </td>
                      <td className="px-5 py-3.5">
                        <span
                          className={`text-[10px] font-bold capitalize ${
                            req.status === "pending"
                              ? "text-orange-500"
                              : req.status === "approved"
                                ? "text-green-600"
                                : "text-red-500"
                          }`}
                        >
                          {req.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-lg border capitalize ${
                            req.priority === "high"
                              ? "bg-red-50 text-red-600 border-red-100"
                              : req.priority === "medium"
                                ? "bg-yellow-50 text-yellow-600 border-yellow-100"
                                : "bg-blue-50 text-blue-600 border-blue-100"
                          }`}
                        >
                          {req.priority}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <button
                          onClick={() => {
                            setSelectedRequest(req);
                            setDetailsOpen(true);
                          }}
                          className="text-xs font-bold text-gray-700 bg-white border border-gray-200 px-4 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 sm:p-6 border-t border-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 order-2 sm:order-1">
            <span className="text-sm font-medium text-gray-400">Showing</span>
            <select
              disabled
              className="bg-white border border-gray-200 rounded-lg px-2 py-1 text-sm font-bold text-gray-700"
            >
              <option>{limit}</option>
            </select>
            <span className="text-sm font-medium text-gray-400">Results</span>
          </div>

          <div className="flex items-center gap-2 order-1 sm:order-2">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="p-2 text-gray-400 hover:text-gray-600 border border-gray-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }).map((_, idx) => {
                const pageNum = idx + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`w-8 h-8 rounded-lg text-sm font-bold transition-all ${
                      pageNum === page
                        ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                        : "text-gray-400 hover:bg-gray-50"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="p-2 text-gray-400 hover:text-gray-600 border border-gray-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <SuccessModal
        open={successOpen}
        title="Material Requested Successfully"
        onClose={() => setSuccessOpen(false)}
      />
      <RequestMaterialModel
        onClose={() => setIsCreateOpen(false)}
        open={isCreateOpen}
        onCreate={() => {
          setIsCreateOpen(false);
          setSuccessOpen(true);
        }}
      />
      <MaterialRequestDetailsModal
        open={detailsOpen}
        projectId={selectedProjectId}
        request={selectedRequest}
        onClose={() => {
          setDetailsOpen(false);
          setSelectedProjectId(null);
          setSelectedRequest(null);
        }}
      />
    </div>
  );
}
