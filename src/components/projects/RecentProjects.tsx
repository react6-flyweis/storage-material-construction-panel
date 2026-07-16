import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(customParseFormat);
import CustomSelect from "../common/CustomSelect";
import { useNavigate } from "react-router-dom";
import { useSidebar } from "../../context/SidebarContext";
import { useSearch } from "../../context/SearchContext";

const projectFilterOptions = [
  { label: "All Projects", value: "all" },
  { label: "Downtown Office Complex", value: "PRJ-001" },
  { label: "Residential Tower A", value: "PRJ-002" },
  { label: "Shopping Mall Renovation", value: "PRJ-003" },
  { label: "Industrial Warehouse", value: "PRJ-004" },
];

const fieldManagerOptions = [
  { label: "All Field Managers", value: "all" },
  { label: "John Smith", value: "John Smith" },
  { label: "Sarah Wilson", value: "Sarah Wilson" },
  { label: "David Lee", value: "David Lee" },
  { label: "Suresh Kumar", value: "Suresh Kumar" },
];

const projects = [
  {
    name: "Downtown Office Complex",
    code: "PRJ-001",
    manager: "John Smith",
    progress: 65,
    status: "On Track",
    statusBg: "bg-[#DCFCE7]",
    statusText: "text-[#166534]",
    projectDate: dayjs().format("DD/MM/YYYY"), 
  },
  {
    name: "Residential Tower A",
    code: "PRJ-002",
    manager: "Sarah Wilson",
    progress: 35,
    status: "Delayed",
    statusBg: "bg-[#FEE2E2]",
    statusText: "text-[#991B1B]",
    projectDate: "12/01/2026",
  },
  {
    name: "Shopping Mall Renovation",
    code: "PRJ-003",
    manager: "David Lee",
    progress: 0,
    status: "Starting",
    statusBg: "bg-[#FEF9C3]",
    statusText: "text-[#854D0E]",
    projectDate: "10/01/2026",
  },
];

export default function RecentProjects({setManager,setProject,setStartDate,setEndDate,startDate,endDate,project,manager}:any) {
  const {activeDate} = useSidebar();
  const {search} = useSearch();
  const navigate = useNavigate();
const getFilteredProjects = () => {
  const today = dayjs();

  return projects.filter((p) => {
    const projectDate = dayjs(p.projectDate, "DD/MM/YYYY");
    const daysDifference = today.diff(projectDate, "day");

    let tabFilter = true;
    if (activeDate === "today") {
      tabFilter = today.isSame(projectDate, "day");
    } else if (activeDate === "week") {
      tabFilter = daysDifference <= 7;
    } else if (activeDate === "month") {
      tabFilter = daysDifference <= 30;
    }

    const matchProject =
      project === "all" || p.code === project || p.name === project;

    const matchManager =
      manager === "all" || p.manager === manager;

    const matchStartDate =
      !startDate || projectDate.isSameOrAfter(startDate, "day");

    const matchEndDate =
      !endDate || projectDate.isSameOrBefore(endDate, "day");

    const matchSearch = search
      ? `${p.name} ${p.code} ${p.manager}`
          .toLowerCase()
          .includes(search.toLowerCase())
      : true;

    return (
      tabFilter &&
      matchProject &&
      matchManager &&
      matchStartDate &&
      matchEndDate &&
      matchSearch
    );
  });
};

  

  const filteredProjects = getFilteredProjects();

  return (
    <>
      <div className="rounded-[8px] sm:p-6 p-3 border !bg-white border-[#F3F4F6] !shadow-[0px_2px_4px_-2px_rgba(0,0,0,0.1),_0px_4px_6px_-1px_rgba(0,0,0,0.1)]">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 md:gap-6 gap-3">
            <div className="flex flex-col gap-2">
              <label className="text-[14px] text-[#374151]">Project</label>
              <CustomSelect
                title="All Requests"
                options={projectFilterOptions}
                value={project}
                onChange={setProject}
                width="100%"
                searchable
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[14px] text-[#374151]">Start Date</label>
              <DatePicker
                value={startDate}
                onChange={setStartDate}
                format="DD-MM-YYYY"
                slotProps={{
                  textField: {
                    fullWidth: true,
                    sx: inputStyle,
                  },
                }}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[14px] text-[#374151]">End Date</label>
              <DatePicker
                value={endDate}
                onChange={setEndDate}
                format="DD-MM-YYYY"
                slotProps={{
                  textField: {
                    fullWidth: true,
                    sx: inputStyle,
                  },
                }}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[14px] text-[#374151]">
                Field Manager
              </label>
              <CustomSelect
                title="All Manager"
                options={fieldManagerOptions}
                value={manager}
                onChange={setManager}
                width="100%"
                searchable
              />
            </div>
          </div>
        </LocalizationProvider>
      </div>
      <div
        className="rounded-[8px] sm:p-6 p-3 border border-[#F3F4F6] bg-white
      shadow-[0px_2px_4px_-2px_rgba(0,0,0,0.1),_0px_4px_6px_-1px_rgba(0,0,0,0.1)]"
      >
        <div className="flex justify-between items-center pb-4 border-b border-[#E5E7EB]">
          <h3 className="text-[18px] text-[#111827]">Recent Projects</h3>
          <button
            className="text-[#2563EB] text-[14px]"
            onClick={() => navigate("/projects")}
          >
            View All
          </button>
        </div>

        <div className="mt-6 space-y-6">
          {filteredProjects.map((p) => (
            <div key={p.code} className="bg-[#F9FAFB] rounded-[8px] p-4">
              <div className="mb-3">
                <div className="flex items-center justify-between w-full mb-3">
                  <p className="text-[16px] text-[#111827]">{p.name}</p>
                  <span
                    className={`px-3 py-1 rounded-full min-w-max text-[12px] ${p.statusBg} ${p.statusText}`}
                  >
                    {p.status}
                  </span>
                </div>

                <div className="flex items-center justify-between w-full">
                  <p className="text-[14px] text-[#4B5563]">
                    {p.code} • {p.manager}
                  </p>
                  <span className="text-[14px] text-[#111827]">
                    {p.progress}%
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex-1 h-[8px] bg-[#E5E7EB] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#2563EB] rounded-full"
                    style={{ width: `${p.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
          {filteredProjects.length === 0 && (
            <p className="text-center text-sm text-[#6B7280] py-8">
              No projects found
            </p>
          )}
        </div>
      </div>
    </>
  );
}
export const inputStyle = {
  height: 40,
  fontSize: 14,
  borderRadius: "10px",
  backgroundColor: "#fff",
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    borderColor: "#D1D5DB",
  },
  "& .MuiPickersOutlinedInput-root": {
    borderRadius: "8px",
    borderColor: "#D1D5DB",
    fontSize: 14,
    height: 40,
  },
  "& .MuiPickersInputBase-sectionsContainer": {
    padding: 0,
    fontSize: 14,
  },
};
