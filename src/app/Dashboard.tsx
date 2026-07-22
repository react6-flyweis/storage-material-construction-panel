import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getDashboardApi } from "../api/projects.api";
import StatsOverview from "../components/cards/StatCard";
import DashboardDonutChart from "../components/charts/DashboardDonutChart";
import Timeline from "../components/common/Timeline";
import RecentActivity from "../components/common/RecentActivity";
import ExportIcon from "../assets/exportIcon.svg";
import SuccessModal from "../components/common/SuccessModal";
import ProjectSelector from "../components/common/ProjectSelector";


export default function Dashboard() {
  const [successOpen, setSuccessOpen] = useState(false);

  const [selectedProject, setSelectedProject] = useState("");

  const { data: dashboardResponse, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboardApi,
  });

  const dashboardData = dashboardResponse?.data?.data;
  const projectStats = dashboardData?.projectStats;
  const deliveryOverview = dashboardData?.deliveryOverview;
  const upcomingDeadlinesList = dashboardData?.upcomingDeadlines || [];
  const recentDeliveriesList = dashboardData?.recentDeliveries || [];

  const stats = [
    {
      key: "total",
      title: "Total Projects",
      value: isLoading ? "..." : (projectStats?.total ?? 0),
      iconBg: "#FEE2E2",
      iconsvg: (
        <div className="w-5 h-5 bg-orange-500 rounded text-white flex items-center justify-center text-[10px]">
          📊
        </div>
      ),
      trend: { value: "15%", label: "by Yesterday", isUp: true },
    },
    {
      key: "ontrack",
      title: "On Track",
      value: isLoading ? "..." : (projectStats?.onTrack ?? 0),
      iconBg: "#F3F4F6",
      iconsvg: (
        <div className="w-5 h-5 bg-gray-900 rounded text-white flex items-center justify-center text-[10px]">
          ⏱️
        </div>
      ),
      trend: { value: "86.2%", label: "on track", isUp: true },
    },
    {
      key: "delayed",
      title: "Delayed",
      value: isLoading ? "..." : (projectStats?.delayed ?? 0),
      iconBg: "#DBEAFE",
      iconsvg: (
        <div className="w-5 h-5 bg-blue-500 rounded text-white flex items-center justify-center text-[10px]">
          📅
        </div>
      ),
      trend: { value: "22.2%", label: "delayed", isUp: false },
    },
    {
      key: "completed",
      title: "Completed",
      value: isLoading ? "..." : (projectStats?.completed ?? 0),
      iconBg: "#FCE7F3",
      iconsvg: (
        <div className="w-5 h-5 bg-pink-500 rounded text-white flex items-center justify-center text-[10px]">
          ✅
        </div>
      ),
      trend: { value: "11.11%", label: "completed", isUp: true },
    },
    {
      key: "rate",
      title: "Completion Rate",
      value: isLoading ? "..." : `${projectStats?.completionRate ?? 0}%`,
      iconBg: "#FEF3C7",
      iconsvg: (
        <div className="w-5 h-5 bg-yellow-500 rounded text-white flex items-center justify-center text-[10px]">
          📈
        </div>
      ),
      trend: { value: "Average", label: "Completion", isUp: true },
    },
    {
      key: "deadlines",
      title: "Upcoming Deadlines",
      value: isLoading ? "..." : (projectStats?.upcomingDeadlines ?? 0),
      iconBg: "#FEE2E2",
      iconsvg: (
        <div className="w-5 h-5 bg-red-500 rounded text-white flex items-center justify-center text-[10px]">
          🔔
        </div>
      ),
      trend: { value: "Next", label: "30 days", isUp: true },
    },
  ];

  const deliveryData = [
    { value: deliveryOverview?.delivered ?? 0, name: "Delivered", color: "#1D51A4" },
    { value: deliveryOverview?.inTransit ?? 0, name: "In Transit", color: "#F59E0B" },
    { value: deliveryOverview?.outForDelivery ?? 0, name: "Out for Delivery", color: "#EC4899" },
    { value: deliveryOverview?.delayed ?? 0, name: "Delayed", color: "#EF4444" },
  ];

  const materialData = [
    { value: 0, name: "Approved", color: "#1D51A4" },
    { value: 0, name: "Pending Approval", color: "#F59E0B" },
    { value: 0, name: "Rejected", color: "#EC4899" },
    { value: 0, name: "Urgent Requests", color: "#EF4444" },
  ];

  const timelineSteps = [
    { title: "Planning", date: "-", status: "completed" as const },
    { title: "Design", date: "-", status: "completed" as const },
    { title: "Procurement", date: "-", status: "completed" as const },
    { title: "Execution", date: "-", status: "inprogress" as const },
    { title: "Handover", date: "-", status: "upcoming" as const },
  ];

  const activities = recentDeliveriesList.map((delivery) => ({
    id: delivery.deliveryId,
    type: "order",
    description: delivery.project?.projectName
      ? `Delivery (${delivery.status.replace("_", " ")}) for ${delivery.project.projectName} [${delivery.project.jobId}]`
      : `Delivery (${delivery.status.replace("_", " ")}) [${delivery.project?.jobId || "-"}]`,
    timestamp: new Date(delivery.deliveryDate).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    iconBg: "#F0FDF4",
    icon: <div className="text-green-500 text-lg">🚚</div>,
  }));

  return (
    <div className="space-y-8 pb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-sm text-gray-500 font-medium mt-1">
            Construction Department Performance
          </p>
        </div>
        <button
          onClick={() => setSuccessOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-md shadow-sm transition-colors text-sm flex items-center gap-2"
        >
          <img
            src={ExportIcon}
            alt=""
            className="w-4 h-4 brightness-0 invert"
          />
          Export Report
        </button>
      </div>

      {/* Stats Section */}
      <StatsOverview stats={stats} isLoading={isLoading} />

      {/* Filters Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:flex xl:flex-nowrap items-center gap-4">
        <div className="w-full xl:w-auto xl:flex-1 min-w-[200px]">
          <ProjectSelector
            value={selectedProject}
            onChange={(val) => setSelectedProject(val)}
            showAllOption
          />
        </div>

        <div className="relative w-full xl:w-auto xl:flex-1 min-w-[180px]">
          <select className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-100">
            <option>Buildings : All Buildings</option>
          </select>
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </div>
        </div>

        <div className="relative w-full xl:w-auto xl:flex-1 min-w-[180px]">
          <select className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-100">
            <option>Status : All Status</option>
          </select>
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </div>
        </div>

        <button className="relative bg-white border border-gray-200 shadow-sm rounded-lg text-xs sm:text-sm font-bold text-gray-700 flex items-center justify-between w-full xl:w-auto xl:flex-1 min-w-[220px] px-4 py-2 hover:bg-gray-50 transition-colors">
          <span>24 Mar 2025 - 31 Mar 2025</span>
          <svg
            className="w-4 h-4 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </button>

        <button className="xl:ml-auto flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors px-3 py-2 rounded-lg border border-gray-200 bg-white shadow-sm w-full sm:w-auto justify-center sm:justify-start">
          Restart
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <DashboardDonutChart
          title="Delivery Overview"
          total={deliveryOverview?.total ?? 0}
          data={deliveryData}
          subtitle="Today's Deliveries"
        />
        <DashboardDonutChart
          title="Material Request Overview"
          total={14}
          data={materialData}
          subtitle="Pending Approval"
        />

        {/* Active Construction Sites Table */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-100 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">
              Active Construction Sites
            </h3>
            <button className="text-[11px] font-bold text-gray-600 bg-white border border-gray-200 px-3 py-1 rounded-md flex items-center gap-1 hover:bg-gray-50 transition-colors">
              View All
              <svg
                className="w-3 h-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50/80">
                <tr className="text-[11px] font-bold text-gray-900 border-b border-gray-100 uppercase tracking-wider">
                  <th className="py-4 pl-4 pr-2 rounded-tl-lg">Project</th>
                  <th className="py-4 pr-2">Progress</th>
                  <th className="py-4 pr-2">Deadline</th>
                  <th className="py-4 pr-4 rounded-tr-lg">Delivery Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <tr>
                  <td colSpan={4} className="py-8 text-center text-xs font-medium text-gray-400">
                    No active construction site data available
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Deadlines */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">
              Upcoming Project Deadlines
            </h3>
            <button className="text-[11px] font-bold text-gray-600 bg-white border border-gray-200 px-3 py-1 rounded-md hover:bg-gray-50 transition-colors">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {isLoading ? (
              [1, 2, 3].map((n) => (
                <div key={n} className="flex justify-between items-center border-b border-gray-50 pb-3 last:border-0 last:pb-0 animate-pulse">
                  <div className="space-y-2">
                    <div className="h-4 w-40 bg-gray-200 rounded" />
                    <div className="h-3 w-24 bg-gray-100 rounded" />
                  </div>
                  <div className="space-y-2 flex flex-col items-end">
                    <div className="h-3.5 w-20 bg-gray-200 rounded" />
                    <div className="h-2.5 w-14 bg-gray-100 rounded" />
                  </div>
                </div>
              ))
            ) : upcomingDeadlinesList.length === 0 ? (
              <p className="text-sm text-gray-500 py-4 text-center">No upcoming deadlines</p>
            ) : (
              upcomingDeadlinesList.map((item, i) => (
                <div
                  key={item.leadId || i}
                  className="flex justify-between items-center border-b border-gray-50 pb-3 last:border-0 last:pb-0"
                >
                  <div>
                    <p className="text-sm font-bold text-gray-900">
                      {item.projectName || "Unnamed Project"}
                    </p>
                    <p className="text-[10px] text-orange-500 font-bold">
                      {item.location || "N/A"} <span className="text-gray-400">• {item.jobId}</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] font-bold text-red-500">
                      {new Date(item.endDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                    <p className="text-[9px] text-gray-400 font-bold">
                      {item.daysLeft} Days Left
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <Timeline steps={timelineSteps} />

        {/* Freight Carriers Table */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm flex flex-col h-full">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">
              Freight Carriers & Deliveries
            </h3>
            <button className="text-[11px] font-bold text-gray-600 bg-white border border-gray-200 px-3 py-1 rounded-md hover:bg-gray-50 transition-colors">
              View All
            </button>
          </div>

          <div className="flex-1 overflow-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50/80">
                <tr className="text-[11px] font-bold text-gray-900 border-b border-gray-100 uppercase tracking-wider">
                  <th className="py-4 pl-4 pr-2 rounded-tl-lg">Carrier</th>
                  <th className="py-4 pr-2">Loads Today</th>
                  <th className="py-4 pr-2">On Time</th>
                  <th className="py-4 pr-2">Delayed</th>
                  <th className="py-4 pr-4 rounded-tr-lg">Priority</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <tr>
                  <td colSpan={5} className="py-8 text-center text-xs font-medium text-gray-400">
                    No carrier delivery data available
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-4">
            <div className="bg-gray-50 p-2 rounded-lg">
              <div className="text-[10px] text-orange-500">🚚</div>
              <p className="text-lg font-bold text-gray-900">-</p>
              <p className="text-[8px] text-gray-400 font-bold uppercase">
                Total Loads
              </p>
            </div>
            <div className="bg-gray-50 p-2 rounded-lg">
              <div className="text-[10px] text-orange-800">📦</div>
              <p className="text-lg font-bold text-gray-900">-</p>
              <p className="text-[8px] text-gray-400 font-bold uppercase">
                On time
              </p>
            </div>
            <div className="bg-gray-50 p-2 rounded-lg">
              <div className="text-[10px] text-blue-600">⌛</div>
              <p className="text-lg font-bold text-gray-900">-</p>
              <p className="text-[8px] text-gray-400 font-bold uppercase">
                Delayed
              </p>
            </div>
          </div>
        </div>

        <RecentActivity activities={activities} />
      </div>

      <SuccessModal
        open={successOpen}
        title="Report Exported Successfully"
        onClose={() => setSuccessOpen(false)}
      />
    </div>
  );
}
