import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EyeIcon from "../../assets/EyeIcon.svg";
import EditIcon from "../../assets/EditIcon.svg";
import LeftArrowIcon from "../../assets/left-arrow.svg";
import RightArrowIcon from "../../assets/right-arrow.svg";
import { useSearch } from "../../context/SearchContext";

export type TeamMember = {
  role: string;
  name: string;
};

export type Project = {
  id: string;
  name: string;
  code: string;
  client: string;
  startDate: string;
  endDate: string;
  progress: number;
  team: TeamMember[];
  status: "Active" | "Completed" | "On Hold";
};

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export type Props = {
  projects: Project[];
};

export default function AllProjectsTable({ projects }: Props) {
  const [activeTab, setActiveTab] = useState<"overview" | "calendar">(
    "overview"
  );
  const {search} = useSearch();
  const navigate = useNavigate();
  const today = new Date();

  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<number | null>(
    today.getDate()
  );

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();

  const hasEventDays = [15, 16, 18, 22];

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
    setSelectedDate(null);
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
    setSelectedDate(null);
  };

  const handleToday = () => {
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
    setSelectedDate(today.getDate());
  };

  const filteredProjects = projects.filter((p) =>
  search
    ? `${p.name} ${p.code} ${p.client} ${p.status}`
        .toLowerCase()
        .includes(search.toLowerCase())
    : true
);
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-6 mb-5 mt-11">
        <h2 className="text-[18px] font-bold text-[#111827]">All Projects</h2>

        <div className="flex bg-[#F3F4F6] rounded-[10px] p-1 h-11 border border-[#E5E7EB]">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-5 py-2 rounded-[8px] text-[14px] transition
                ${
                  activeTab === "overview"
                    ? "bg-white text-[#1D51A4]"
                    : "text-[#6B7280]"
                }`}
          >
            Projects Overview
          </button>

          <button
            onClick={() => setActiveTab("calendar")}
            className={`px-5 py-2 rounded-[8px] text-[14px] transition
                ${
                  activeTab === "calendar"
                    ? "bg-white text-[#1D51A4]"
                    : "text-[#6B7280]"
                }`}
          >
            Projects Calendar
          </button>
        </div>
      </div>

      {activeTab === "overview" && (
        <div
          className="rounded-[8px] bg-white border border-[#F3F4F6]
            shadow-[0px_2px_4px_-2px_rgba(0,0,0,0.1),_0px_4px_6px_-1px_rgba(0,0,0,0.1)]
            overflow-hidden"
        >
          <div className="overflow-x-auto scroll-hide w-[calc(100vw-26px)] lg:w-[calc(100vw-324px)]">
            <table className="min-w-[900px] w-full border-collapse rounded-[8px]">
              <thead className="bg-white">
                <tr className="text-left text-[12px] uppercase text-[#6B7280] border-b border-[#E5E7EB]">
                  <th className="lg:px-6 px-3 lg:py-4 py-3 font-normal">
                    Project
                  </th>
                  <th className="lg:px-6 px-3 lg:py-4 py-3 font-normal">
                    Client
                  </th>
                  <th className="lg:px-6 px-3 lg:py-4 py-3 font-normal">
                    Timeline
                  </th>
                  <th className="lg:px-6 px-3 lg:py-4 py-3 font-normal">
                    Progress
                  </th>
                  <th className="lg:px-6 px-3 lg:py-4 py-3 font-normal">
                    Team
                  </th>
                  <th className="lg:px-6 px-3 lg:py-4 py-3 font-normal">
                    Status
                  </th>
                  <th className="lg:px-6 px-3 lg:py-4 py-3 font-normal">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredProjects.map((project) => (
                  <tr
                    key={project.id}
                    className="border-b border-[#E5E7EB] last:border-b-0"
                  >
                    <td className="lg:px-6 px-3 lg:py-6 py-3">
                      <p className="text-[13.8px] text-[#111827]">
                        {project.name}
                      </p>
                      <p className="text-[12px] text-[#6B7280] mt-1">
                        {project.code}
                      </p>
                    </td>

                    <td className="lg:px-6 px-3 lg:py-6 py-3 text-[#111827] text-[14px]">
                      {project.client}
                    </td>

                    <td className="lg:px-6 px-3 lg:py-6 py-3">
                      <p className="text-[#111827] text-[14px]">
                        {project.startDate}
                      </p>
                      <p className="text-[12px] text-[#6B7280]">
                        to {project.endDate}
                      </p>
                    </td>

                    <td className="lg:px-6 px-3 lg:py-6 py-3">
                      <div className="w-[120px]">
                        <div className="h-2 bg-[#E5E7EB] rounded-full">
                          <div
                            className="h-2 bg-[#2563EB] rounded-full"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                        <p className="text-[14px] mt-2 text-[#111827]">
                          {project.progress}%
                        </p>
                      </div>
                    </td>

                    <td className="lg:px-6 px-3 lg:py-6 py-3 space-y-2">
                      {project.team.map((member, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <span className="bg-[#F3F4F6] text-[#111827] text-[12px] px-3 py-1 rounded-md">
                            {member.role}
                          </span>
                          <span className="text-[#6B7280] text-[12px]">
                            {member.name}
                          </span>
                        </div>
                      ))}
                    </td>

                    <td className="lg:px-6 px-3 lg:py-6 py-3">
                      <span className="bg-[#DBEAFE] text-[#1E40AF] px-4 py-1 rounded-full text-[14px]">
                        {project.status}
                      </span>
                    </td>

                    <td className="lg:px-6 px-3 lg:py-6 py-3">
                      <div className="flex gap-4 text-[#2563EB]">
                        <button
                          onClick={() =>
                            navigate("/project-view-page", {
                              state: {
                                projectCode: project.code,
                                projectName: project.name,
                              },
                            })
                          }
                          className="hover:opacity-70"
                        >
                          <img src={EyeIcon} alt="" className="w-fit" />
                        </button>

                        <button onClick={() =>
                            navigate("/project-view-page", {
                              state: {
                                projectCode: project.code,
                                projectName: project.name,
                              },
                            })
                          } className="hover:opacity-70">
                          <img src={EditIcon} alt="" className="w-fit" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
                 {filteredProjects.length === 0 && (
                    <p className="text-center text-sm text-[#6B7280] py-8 w-full">
                      No projects found
                    </p>
                  )}
          </div>
        </div>
      )}

      {activeTab === "calendar" && (
        <div className="grid lg:grid-cols-[2fr_1fr] items-start gap-6">
          <div className="bg-white rounded-[12px] border border-[#E5E7EB] pb-10">
            <div className="lg:p-6 p-3 border-b border-[#E5E7EB]">
              <h3 className="text-[17px] font-bold text-[#111827]">
                Upcoming Events
              </h3>
              <p className="text-[13px] text-[#4B5563] mt-1">
                Quick view of scheduled activities
              </p>

              <div className="flex items-center justify-between mt-6">
                <p className="text-[17px] font-bold">
                  {new Date(currentYear, currentMonth).toLocaleString(
                    "default",
                    {
                      month: "long",
                    }
                  )}{" "}
                  {currentYear}
                </p>

                <div className="flex items-center gap-4 text-gray-600">
                  <button
                    onClick={handleToday}
                    className="text-[14px] text-[#272C42]"
                  >
                    TODAY
                  </button>

                  <button onClick={handlePrevMonth}>
                    <img src={LeftArrowIcon} alt="" className="w-1.5" />
                  </button>

                  <button onClick={handleNextMonth}>
                    <img src={RightArrowIcon} alt="" className="w-1.5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:p-6 p-3">
              <div className="grid grid-cols-7 text-center text-[13px] text-gray-500 mb-12">
                {weekDays.map((d) => (
                  <div key={d}>{d}</div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-3 text-[14px]">
                {Array.from({ length: firstDayIndex }).map((_, i) => (
                  <div key={`empty-${i}`} />
                ))}

                {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(
                  (day) => {
                    const isSelected = day === selectedDate;
                    const hasEvent = hasEventDays.includes(day);

                    return (
                      <button
                        key={day}
                        onClick={() => setSelectedDate(day)}
                        className={`h-[44px] rounded-[8px] flex items-center justify-center relative
                  ${
                    isSelected
                      ? "bg-blue-600 text-white"
                      : hasEvent
                      ? "bg-red-50 text-red-500"
                      : "text-gray-700"
                  }`}
                      >
                        {day}

                        {hasEvent && !isSelected && (
                          <span className="absolute right-2 top-2 w-1.5 h-1.5 bg-red-500 rounded-full" />
                        )}
                      </button>
                    );
                  }
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-[12px] border border-[#E5E7EB] lg:p-6 p-3">
              <h3 className="text-[17px] font-bold mb-4">Event Types</h3>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-blue-700" />
                  <p className="text-[#4B5563] text-sm">Site Inspection</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-green-500" />
                  <p className="text-[#4B5563] text-sm">Material Delivery</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-yellow-400" />
                  <p className="text-[#4B5563] text-sm">Installation</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-orange-400" />
                  <p className="text-[#4B5563] text-sm">Testing</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[12px] border border-[#E5E7EB] lg:p-6 p-3">
              <h3 className="text-[17px] font-bold mb-4">Upcoming Events</h3>

              <div className="space-y-4">
                {[
                  {
                    title: "Steel Delivery",
                    color: "bg-green-500",
                  },
                  {
                    title: "Concrete Pouring",
                    color: "bg-orange-400",
                  },
                  {
                    title: "Electrical Testing",
                    color: "bg-blue-700",
                  },
                ].map((e) => (
                  <div
                    key={e.title}
                    className="flex items-center gap-2 justify-between bg-[#F9FAFB] rounded-[10px] xl:px-4 xl:py-4 p-2"
                  >
                    <div className="flex items-start gap-4">
                      <span
                        className={`w-3 h-3 rounded-full mt-1 ${e.color}`}
                      />
                      <div>
                        <p className="font-bold text-[#4B5563] text-sm">
                          {e.title}
                        </p>
                        <p className="text-[12px] text-[#4B5563]">
                          2024-01-26 at 14:00
                        </p>
                      </div>
                    </div>

                    <p className="text-[#4B5563] text-[12px]">PRJ-001</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
