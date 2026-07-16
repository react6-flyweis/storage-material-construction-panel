import { useState } from "react";
import type { StatItem } from "../components/cards/StatCard";
import StatsOverview from "../components/cards/StatCard";
import TaskBoard from "../components/common/TaskBoard";
import ProgressTracker from "../components/common/ProgressTracker";
import FolderIcon from "../assets/activeproject.svg";
import MoneyIcon from "../assets/righttick.svg";
import BoxIcon from "../assets/clockicon.svg";
import ShieldIcon from "../assets/safetyscoreicon.svg";

const stats: StatItem[] = [
  {
    key: "activeProjects",
    title: "Total Tasks",
    value: 56,
    icon: FolderIcon,
  },
  {
    key: "completionRate",
    title: "Completed",
    value: 29,
    icon: MoneyIcon,
  },
  {
    key: "pendingMaterials",
    title: "In Progress",
    value: 13,
    icon: BoxIcon,
  },
  {
    key: "safetyScore",
    title: "Overdue",
    value: 3,
    icon: ShieldIcon,
  },
];

export default function Tasks() {
  const [activeTab, setActiveTab] = useState<"Task Management" | "Progress Tracker">(
    "Task Management"
  );
  return (
    <div className="space-y-6">
      <div>
        <div className="mb-8 flex md:flex-row flex-col gap-3 md:items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Tasks & Progress
          </h1>
          <div className="flex bg-[#F3F4F6] w-fit rounded-[10px] p-1 h-11 border border-[#E5E7EB]">
            <button
              onClick={() => setActiveTab("Task Management")}
              className={`px-5 py-2 rounded-[8px] text-sm font-medium transition
                ${activeTab === "Task Management"
                  ? "bg-white text-[#1D51A4]"
                  : "text-[#6B7280]"
                }`}
            >
              Task Management
            </button>

            <button
              onClick={() => setActiveTab("Progress Tracker")}
              className={`px-5 py-2 rounded-[8px] text-sm font-medium transition
                ${activeTab === "Progress Tracker"
                  ? "bg-white text-[#1D51A4]"
                  : "text-[#6B7280]"
                }`}
            >
              Progress Tracker
            </button>
          </div>
        </div>
        <StatsOverview stats={stats} />
      </div>
      {activeTab === "Task Management" && (
        <TaskBoard />
      )}
      {activeTab === "Progress Tracker" && (
        <ProgressTracker />
      )}
    </div>
  );
}
