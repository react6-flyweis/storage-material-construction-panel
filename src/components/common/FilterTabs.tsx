import { useSidebar } from "../../context/SidebarContext";


export default function FilterTabs() {
  const { activeDate,setActiveDate } = useSidebar();


  const baseBtn = "relative lg:w-56 sm:w-40 w-32 text-white font-medium transition-all";

  return (
    <div className="absolute lg:-left-8 -left-3 lg:-right-8 -right-3 -top-16 flex h-10 bg-[#89D5DC] overflow-hidden">
      <button
        onClick={() => setActiveDate("today")}
        className={`${baseBtn} ${activeDate === "today" ? "bg-[#89D5DC]" : "bg-[#6B93CE99]"}`}
        style={{
          clipPath: "polygon(0 0, calc(100% - 30px) 0, 100% 100%, 0 100%)",
        }}
      >
        Today
      </button>

      <button
        onClick={() => setActiveDate("week")}
        className={`${baseBtn} -ml-8 ${activeDate === "week" ? "bg-[#89D5DC]" : "bg-[#6B93CE]"}`}
        style={{
          clipPath: "polygon(0 0, calc(100% - 30px) 0, 100% 100%, 30px 100%)",
        }}
      >
        Week
      </button>

      <button
        onClick={() => setActiveDate("month")}
        className={`${baseBtn} -ml-8 ${activeDate === "month" ? "bg-[#89D5DC]" : "bg-[#4A72B7]"}`}
        style={{
          clipPath: "polygon(0 0, calc(100% - 30px) 0, 100% 100%, 30px 100%)",
        }}
      >
        Month
      </button>
    </div>
  );
}
