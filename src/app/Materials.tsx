import { useState } from "react";
import StatsOverview from "../components/cards/StatCard";
import SuccessModal from "../components/common/SuccessModal";
import RequestMaterialModel from "../components/requestMaterialModel";
import MaterialRequestDetailsModal from "../components/materials/MaterialRequestDetailsModal";
import { Plus } from "lucide-react";

export default function Materials() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const stats = [
    {
      key: "total",
      title: "Total Requests",
      value: 48,
      iconBg: "#F5F3FF",
      iconsvg: <div className="text-purple-600 text-lg">💰</div>,
      trend: { value: "All", label: "Payment Requests", isUp: true },
    },
    {
      key: "pending",
      title: "Pending",
      value: 18,
      iconBg: "#F0FDF4",
      iconsvg: <div className="text-green-600 text-lg">🛍️</div>,
      trend: { value: "$245,680.150", label: "", isUp: true },
    },
    {
      key: "approved",
      title: "Approved",
      value: 22,
      iconBg: "#FEFCE8",
      iconsvg: <div className="text-yellow-600 text-lg">🔓</div>,
      trend: { value: "582,390.75", label: "", isUp: true },
    },
    {
      key: "rejected",
      title: "Rejected",
      value: 6,
      iconBg: "#FEF2F2",
      iconsvg: <div className="text-red-600 text-lg">⌛</div>,
      trend: { value: "578,420.20", label: "", isUp: false },
    },
  ];

  const requests = [
    {
      id: "MR-2025-0031",
      site: "Downtown Office Complex",
      location: "Construction Site A",
      items: "8 Items",
      itemsDesc: "Steel,Cements,Rocks..",
      date: "May 19,2025",
      time: "03:40 PM",
      required: "May 23,2025",
      status: "Pending",
      priority: "High",
      color: "orange",
    },
    {
      id: "MR-2025-0031",
      site: "Residential Tower A",
      location: "Residential Site",
      items: "6 Items",
      itemsDesc: "Cement,Sand,Bricks..",
      date: "May 19,2025",
      time: "03:40 PM",
      required: "May 29,2025",
      status: "Approved",
      priority: "Medium",
      color: "green",
    },
    {
      id: "MR-2025-0031",
      site: "Downtown Office Complex",
      location: "Construction Site A",
      items: "8 Items",
      itemsDesc: "Steel,Cements,Rocks..",
      date: "May 19,2025",
      time: "03:40 PM",
      required: "May 15,2025",
      status: "Rejected",
      priority: "Medium",
      color: "red",
    },
    {
      id: "MR-2025-0031",
      site: "ABC Construction LLC.",
      location: "Construction Site A",
      items: "6 Items",
      itemsDesc: "Cement,Sand,Bricks..",
      date: "May 19,2025",
      time: "03:40 PM",
      required: "May 23,2025",
      status: "Pending",
      priority: "High",
      color: "orange",
    },
    {
      id: "MR-2025-0031",
      site: "Downtown Office Complex",
      location: "Construction Site A",
      items: "8 Items",
      itemsDesc: "Steel,Cements,Rocks..",
      date: "May 19,2025",
      time: "03:40 PM",
      required: "May 19,2025",
      status: "Pending",
      priority: "Medium",
      color: "orange",
    },
    {
      id: "MR-2025-0031",
      site: "ABC Construction LLC.",
      location: "Construction Site A",
      items: "6 Items",
      itemsDesc: "Cement,Sand,Bricks..",
      date: "May 19,2025",
      time: "03:40 PM",
      required: "May 23,2025",
      status: "Approved",
      priority: "Low",
      color: "green",
    },
    {
      id: "MR-2025-0031",
      site: "Residential Tower A",
      location: "Residential Site",
      items: "8 Items",
      itemsDesc: "Steel,Cements,Rocks..",
      date: "May 19,2025",
      time: "03:40 PM",
      required: "May 23,2025",
      status: "Rejected",
      priority: "High",
      color: "red",
    },
    {
      id: "MR-2025-0031",
      site: "ABC Construction LLC.",
      location: "Construction Site A",
      items: "6 Items",
      itemsDesc: "Cement,Sand,Bricks..",
      date: "May 19,2025",
      time: "03:40 PM",
      required: "May 23,2025",
      status: "Approved",
      priority: "Low",
      color: "green",
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
          <select className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100">
            <option>All Projects</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
            Departments
          </label>
          <select className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100">
            <option>All Departments</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
            Status
          </label>
          <select className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100">
            <option>All Status</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
            Requested By
          </label>
          <select className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100">
            <option>All</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
            Date Range
          </label>
          <div className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs font-bold text-gray-700 flex items-center justify-between cursor-pointer">
            <input type="date" className="bg-transparent outline-none cursor-pointer w-full text-[10px] sm:text-[11px] text-gray-500" />
            <span className="mx-1 text-gray-400">-</span>
            <input type="date" className="bg-transparent outline-none cursor-pointer w-full text-[10px] sm:text-[11px] text-gray-500" />
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
            Material Request (54)
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
              {requests.map((req, i) => (
                <tr
                  key={i}
                  className="text-[12px] hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-5 py-3.5 font-bold text-gray-900">
                    {req.id}
                  </td>
                  <td className="px-5 py-3.5">
                    <p className="font-bold text-gray-700 leading-tight">{req.site}</p>
                    <p className="text-[10px] text-gray-400 font-medium">
                      {req.location}
                    </p>
                  </td>
                  <td className="px-5 py-3.5">
                    <p className="font-bold text-gray-700 leading-tight">{req.items}</p>
                    <p className="text-[10px] text-gray-400 font-medium truncate w-32">
                      {req.itemsDesc}
                    </p>
                  </td>
                  <td className="px-5 py-3.5">
                    <p className="font-bold text-gray-700 leading-tight">{req.date}</p>
                    <p className="text-[10px] text-gray-400 font-medium">
                      {req.time}
                    </p>
                  </td>
                  <td className="px-5 py-3.5 font-bold text-gray-700">
                    {req.required}
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`text-[10px] font-bold ${
                        req.color === "orange"
                          ? "text-orange-500"
                          : req.color === "green"
                            ? "text-green-600"
                            : "text-red-500"
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-lg border ${
                        req.priority === "High"
                          ? "bg-red-50 text-red-600 border-red-100"
                          : req.priority === "Medium"
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
                        setDetailsOpen(true);
                      }}
                      className="text-xs font-bold text-gray-700 bg-white border border-gray-200 px-4 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 sm:p-6 border-t border-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 order-2 sm:order-1">
            <span className="text-sm font-medium text-gray-400">Showing</span>
            <select className="bg-white border border-gray-200 rounded-lg px-2 py-1 text-sm font-bold text-gray-700">
              <option>10</option>
            </select>
            <span className="text-sm font-medium text-gray-400">Results</span>
          </div>

          <div className="flex items-center gap-2 order-1 sm:order-2">
            <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-200 rounded-lg transition-colors">
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
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  className={`w-8 h-8 rounded-lg text-sm font-bold transition-all ${
                    page === 1
                      ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                      : "text-gray-400 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              ))}
              <span className="text-gray-300 px-1">...</span>
              <button className="w-8 h-8 rounded-lg text-gray-400 text-sm font-bold hover:bg-gray-50">
                15
              </button>
            </div>
            <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-200 rounded-lg transition-colors">
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
      />
      <MaterialRequestDetailsModal 
        open={detailsOpen} 
        onClose={() => setDetailsOpen(false)} 
      />
    </div>
  );
}
