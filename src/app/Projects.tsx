import { useState } from "react";
import Calendar from "../components/calendar/Calendar";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import MaterialRequestDetailsModal from "../components/materials/MaterialRequestDetailsModal";
import AddDeliveryDrawer from "../components/materials/AddDeliveryDrawer";

const projectData = [
  {
    id: "PRO-2025-0031",
    title: "Downtown Office Complex",
    site: "Construction Site A",
    status: "Work in Progress",
    priority: "High",
  },
  {
    id: "PRO-2025-0031",
    title: "Residential Tower A",
    site: "Residential Site",
    status: "Completed",
    priority: "Medium",
  },
  {
    id: "PRO-2025-0031",
    title: "Downtown Office Complex",
    site: "Construction Site A",
    status: "Canceled",
    priority: "Medium",
  },
  {
    id: "PRO-2025-0031",
    title: "ABC Construction LLC.",
    site: "Construction Site A",
    status: "Work in Progress",
    priority: "High",
  },
  {
    id: "PRO-2025-0031",
    title: "Downtown Office Complex",
    site: "Construction Site A",
    status: "Work in Progress",
    priority: "Medium",
  },
  {
    id: "PRO-2025-0031",
    title: "ABC Construction LLC.",
    site: "Construction Site A",
    status: "Completed",
    priority: "Low",
  },
  {
    id: "PRO-2025-0031",
    title: "Residential Tower A",
    site: "Residential Site",
    status: "Canceled",
    priority: "High",
  },
  {
    id: "PRO-2025-0031",
    title: "ABC Construction LLC.",
    site: "Construction Site A",
    status: "Completed",
    priority: "Low",
  },
];

export default function Projects() {
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"calendar" | "project">("calendar");
  const [toggle, setToggle] = useState(false);
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
            <div className="relative w-[320px]">
              <select className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-100">
                <option>Riverside Office Complex (PRJ-2025-0015)</option>
                <option>Downtown Office Complex (PRJ-2025-0031)</option>
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>
          <button onClick={() => setToggle(true)} className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-lg shadow-sm transition-colors text-sm flex items-center gap-2">
            <span className="text-lg leading-none">+</span> Add Delivery
          </button>
        </div>
      )}

      {activeTab === "calendar" ? (
        <div className="min-h-[600px]">
          <Calendar />
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
                  {projectData.map((project, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-3.5 text-xs font-bold text-gray-900">
                        {project.id}
                      </td>
                      <td className="px-6 py-3.5">
                        <div className="text-xs font-bold text-gray-900">
                          {project.title}
                        </div>
                        <div className="text-[10px] font-medium text-gray-400 mt-0.5">
                          {project.site}
                        </div>
                      </td>
                      <td className="px-6 py-3.5">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-lg ${project.status === "Work in Progress"
                            ? "bg-orange-50 text-orange-400"
                            : project.status === "Completed"
                              ? "bg-green-50 text-green-500"
                              : "bg-red-50 text-red-500"
                            }`}
                        >
                          {project.status}
                        </span>
                      </td>
                      <td className="px-6 py-3.5">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-lg text-[10px] font-bold ${project.priority === "High"
                            ? "bg-red-50 text-red-500"
                            : project.priority === "Medium"
                              ? "bg-orange-50 text-orange-400"
                              : "bg-blue-50 text-blue-400"
                            }`}
                        >
                          {project.priority}
                        </span>
                      </td>
                      <td className="px-6 py-3.5 text-center">
                        <button
                          onClick={() => setShowDetails(true)}
                          className="px-4 py-1 border border-gray-200 rounded-lg text-[11px] font-bold text-gray-700 hover:bg-gray-50 transition-all uppercase tracking-wider"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
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
                <select className="appearance-none bg-white border border-gray-100 rounded-xl pl-4 pr-10 py-1.5 text-xs font-bold text-gray-700 shadow-sm focus:outline-none focus:border-blue-500 transition-colors">
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
              </div>
              <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                Results
              </span>
            </div>

            <div className="flex items-center gap-1 order-1 sm:order-2">
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-600 text-white text-xs font-bold shadow-lg shadow-blue-100">
                1
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-50 text-xs font-bold">
                2
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-50 text-xs font-bold">
                3
              </button>
              <span className="text-gray-400 px-1">...</span>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-50 text-xs font-bold">
                15
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      <AddDeliveryDrawer open={toggle} onClose={() => setToggle(false)} />

      <MaterialRequestDetailsModal
        open={showDetails}
        onClose={() => setShowDetails(false)}
      />
    </div>
  );
}
