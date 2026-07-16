import { useState } from "react";
import type { StatItem } from "../components/cards/StatCard";
import StatsOverview from "../components/cards/StatCard";
import AssignedIcon from "../assets/assignedicon.svg";
import MeetingIcon from "../assets/meetingicon.svg";
import RedAlertIcon from "../assets/redalerticon.svg";
import ReminderIcon from "../assets/remindericon.svg";
import NotificationBellIcon from "../assets/NotificationCardIcon";

const notifications = [
  {
    id: 1,
    title: "New lead assigned",
    description: "Alice Johnson from tech solutions has been assigned to you.",
    time: "2 minutes ago",
    priority: "High priority",
    type: "Meeting",
    iconBg: "bg-blue-100",
    icon: AssignedIcon,
    read: false,
  },
  {
    id: 2,
    title: "Task Reminder",
    description: "Follow up with Bob Smith is due in 30 minutes",
    time: "30 minutes ago",
    priority: "High priority",
    type: "Lead",
    iconBg: "bg-yellow-100",
    icon: ReminderIcon,
    read: false,
  },
  {
    id: 3,
    title: "AI escalation assigned",
    description: "Customer support case ESC-001 requires your attention",
    time: "1 hour ago",
    priority: "High priority",
    type: "Task",
    iconBg: "bg-red-100",
    icon: RedAlertIcon,
    read: false,
  },
  {
    id: 4,
    title: "Meeting scheduled",
    description: "Meeting with Design studio confirmed for tomorrow at 2 pm",
    time: "2 hours ago",
    priority: "Medium priority",
    type: "Meeting",
    iconBg: "bg-blue-100",
    icon: MeetingIcon,
    read: false,
  },
];

const priorityStyle = (priority: string) =>
  priority.includes("High")
    ? "bg-[#FEE2E2] text-[#BF0000]"
    : "bg-[#E5E7EB] text-[#CA8C16]";

const stats: StatItem[] = [
  {
    key: "activeProjects",
    title: "Total",
    value: 8,
    iconsvg: <NotificationBellIcon color="#1D51A4" />,
  },
  {
    key: "completionRate",
    title: "Unread",
    value: 3,
    iconsvg: <NotificationBellIcon color="#3AB449" />,
  },
  {
    key: "pendingMaterials",
    title: "High Priority",
    value: 3,
    iconsvg: <NotificationBellIcon color="#EAB308" />,
  },
  {
    key: "safetyScore",
    title: "Today",
    value: 5,
    iconsvg: <NotificationBellIcon color="#FD8D5B" />,
  },
];

export default function Notifications() {
  const [active, setActive] = useState("all");

  const filteredNotifications = notifications.filter((item) => {
    if (active === "all") return true;
    if (active === "unread") return false;
    if (active === "leads") return item.type.toLowerCase() === "lead";
    if (active === "tasks") return item.type.toLowerCase() === "task";
    if (active === "meetings") return item.type.toLowerCase() === "meeting";
    if (active === "escalations")
      return item.type.toLowerCase().includes("escalation");
    return true;
  });

  const notificationCounts = {
    all: notifications.length,
    unread: notifications.filter((n) => n.read).length,
    leads: notifications.filter((n) => n.type.toLowerCase() === "lead").length,
    tasks: notifications.filter((n) => n.type.toLowerCase() === "task").length,
    meetings: notifications.filter((n) => n.type.toLowerCase() === "meeting")
      .length,
    escalations: notifications.filter((n) =>
      n.type.toLowerCase().includes("escalation")
    ).length,
  };

  const filters = [
    { label: "All", value: "all", count: notificationCounts.all },
    { label: "Unread", value: "unread", count: notificationCounts.unread },
    { label: "Leads", value: "leads", count: notificationCounts.leads },
    { label: "Tasks", value: "tasks", count: notificationCounts.tasks },
    {
      label: "Meetings",
      value: "meetings",
      count: notificationCounts.meetings,
    },
    {
      label: "Escalations",
      value: "escalations",
      count: notificationCounts.escalations,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-2">
            Notifications
          </h1>
          <p className="text-sm text-gray-500 font-medium">
            Stay updated with your latest activities and alerts
          </p>
        </div>
        <StatsOverview stats={stats} />
      </div>

      <div
        className="
          rounded-[8px] lg:p-6 lg:px-10 p-3 border !bg-white border-[#F3F4F6]
          !shadow-[0px_2px_4px_-2px_rgba(0,0,0,0.1),_0px_4px_6px_-1px_rgba(0,0,0,0.1)]
        "
      >
        <div className="flex items-center md:gap-4 gap-2 flex-wrap">
          <span className="text-[#111827] text-[17px]">Filter by:</span>

          {filters.map((item) => {
            const isActive = active === item.value;

            return (
              <button
                key={item.value}
                onClick={() => setActive(item.value)}
                className={`
                  md:px-6 px-2 py-2 min-w-[60px] rounded-[10px] text-sm transition
                  ${isActive
                    ? "bg-[#2563EB] text-white"
                    : "bg-[#F3F4F6] text-[#4B5563]"
                  }
                `}
              >
                {item.label}
                {item.count !== undefined && (
                  <span className="ml-1">({item.count})</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div
        className="
          rounded-[8px] border !bg-white border-[#F3F4F6] lg:py-10 py-5
          !shadow-[0px_2px_4px_-2px_rgba(0,0,0,0.1),_0px_4px_6px_-1px_rgba(0,0,0,0.1)]
        "
      >
        <div className="divide-y">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((item) => (
              <div
                key={item.id}
                className="flex sm:gap-4 gap-2 lg:px-10 px-3 lg:pb-6 pb-3 last:pb-0 lg:pt-6 pt-3 first:pt-0"
              >
                <div
                  className={`w-8 min-w-8 h-8 sm:w-10 sm:min-w-10 sm:h-10 sm:rounded-xl rounded-md flex items-center justify-center text-lg ${item.iconBg}`}
                >
                  <img src={item.icon} alt="" />
                </div>

                <div className="flex-1">
                  <p className="text-[14px] font-semibold text-[#4B5563]">
                    {item.title}
                  </p>
                  <p className="text-[14px] text-[#3D3D3D] mt-1.5">
                    {item.description}
                  </p>

                  <div className="flex items-center gap-3 mt-4">
                    <span className="text-[12px] text-[#3D3D3D]">
                      {item.time}
                    </span>

                    <span
                      className={`px-3 py-1 rounded-full text-[12px] ${priorityStyle(
                        item.priority
                      )}`}
                    >
                      {item.priority}
                    </span>

                    <span className="px-3 py-1 rounded-full text-[12px] bg-[#F3F4F6] text-[#3D3D3D]">
                      {item.type}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 text-center">
              <p className="text-[#6B7280] text-[15px]">No data found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
