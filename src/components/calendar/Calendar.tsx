import React from "react";
import dayjs from "dayjs";
import AddDeliveryDrawer from "../materials/AddDeliveryDrawer";
import DeliveryDetailsModal from "../materials/DeliveryDetailsModal";

export default function Calendar() {
  const [toggle, setToggle] = React.useState(false);
  const [showDetails, setShowDetails] = React.useState(false);
  const [currentMonth, setCurrentMonth] = React.useState(dayjs("2025-01-01"));

  const daysInMonth = currentMonth.daysInMonth();
  const firstDayOfMonth = currentMonth.startOf("month").day();

  const days = [];
  // Previous month padding
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push({
      day:
        currentMonth.subtract(1, "month").daysInMonth() -
        firstDayOfMonth +
        i +
        1,
      current: false,
    });
  }
  // Current month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({ day: i, current: true });
  }

  const events: Record<number, { title: string; color: string }[]> = {
    5: [{ title: "Column C1-C8", color: "#3B82F6" }],
    6: [{ title: "Steel Beams", color: "#3B82F6" }],
    7: [{ title: "Slab S1", color: "#3B82F6" }],
    8: [{ title: "MEP Ducts", color: "#3B82F6" }],
    12: [{ title: "Window Frames", color: "#3B82F6" }],
    13: [{ title: "Brick Walls", color: "#3B82F6" }],
    15: [{ title: "Elevator Unit", color: "#3B82F6" }],
    19: [
      { title: "Facade Panels", color: "#3B82F6" },
      { title: "Staircase Structure", color: "#3B82F6" },
      { title: "Overall Project", color: "#3B82F6" },
    ],
    20: [{ title: "MEP Equipment", color: "#3B82F6" }],
    22: [{ title: "Interior Doors", color: "#3B82F6" }],
    28: [{ title: "Ceiling Works", color: "#3B82F6" }],
    30: [{ title: "Paint & Finishes", color: "#3B82F6" }],
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full">
      <div className="flex-1 rounded-xl border   border-gray-100 shadow-sm overflow-hidden flex flex-col min-w-0">
        <div className="p-4 sm:p-6 border-b border-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={() => setCurrentMonth(dayjs())}
            className="bg-gray-50 px-4 py-1.5 rounded-lg text-sm font-bold text-gray-700 border border-gray-200 w-full sm:w-auto hover:bg-gray-100 transition-colors"
          >
            Today
          </button>

          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={() => setCurrentMonth(currentMonth.subtract(1, 'month'))}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                className="w-5 h-5"
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
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 whitespace-nowrap min-w-[150px] text-center">
              {currentMonth.format("MMMM YYYY")}
            </h2>
            <button
              onClick={() => setCurrentMonth(currentMonth.add(1, 'month'))}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                className="w-5 h-5"
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

          <div className="relative w-full sm:w-auto">
            <select className="w-full appearance-none bg-white border border-gray-200 rounded-lg pl-4 pr-10 py-1.5 text-sm font-bold text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer">
              <option value="month">Month</option>
              <option value="week">Week</option>
              <option value="day">Day</option>
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-700"
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
            </div>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-7 overflow-x-auto bg-white  min-w-[600px] sm:min-w-0">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="py-3 text-center text-sm font-medium text-gray-400 border-b border-gray-50"
            >
              {day}
            </div>
          ))}

          {days.map((item, idx) => (
            <div
              key={idx}
              className={`min-h-[80px] sm:min-h-[120px] p-1 sm:p-2 border-r border-b border-gray-50 last:border-r-0 ${item.current && item.day === 19
                ? "bg-blue-50 ring-2 ring-blue-600 ring-inset z-10"
                : ""
                }`}
            >
              <div className="flex justify-center mb-1 sm:mb-2">
                <span
                  className={`text-[10px] sm:text-sm font-bold ${!item.current
                    ? "text-gray-300"
                    : item.day === 19
                      ? "bg-blue-600 text-white w-5 h-5 sm:w-7 sm:h-7 rounded-full flex items-center justify-center"
                      : "text-gray-900"
                    }`}
                >
                  {item.day}
                </span>
              </div>

              <div className="space-y-1">
                {item.current &&
                  events[item.day]?.map((event, eIdx) => (
                    <div
                      key={eIdx}
                      className="flex items-center gap-1 px-1 py-0.5 rounded transition-colors hover:bg-white/50"
                    >
                      <div
                        className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: event.color }}
                      />
                      <span className="text-[8px] sm:text-[10px] font-bold text-gray-700 truncate">
                        {event.title}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full lg:w-[380px] space-y-6 overflow-auto">
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">
              Monday, May 19 ,2025
            </h3>
          </div>

          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-4">
            <p className="text-sm font-medium text-gray-500">
              Deliveries on this date
            </p>
            <button onClick={() => setToggle(true)} className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg flex items-center justify-center gap-1">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add Delivery
            </button>
          </div>

          <div className="space-y-4">
            {[
              {
                title: "Facade Panels- Level 1 to 5",
                loc: "Building A- Front Elevation",
              },
              {
                title: "Staircase Structure- Block A",
                loc: "Building A- Staircase 1 & 2",
              },
              {
                title: "Facade Panels- Level 1 to 5",
                loc: "Building A- Front Elevation",
              },
            ].map((delivery, i) => (
              <div
                onClick={() => setShowDetails(true)}
                key={i}
                className="p-4 rounded-xl border border-gray-100 bg-white shadow-sm hover:border-blue-200 transition-colors"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-sm font-bold text-gray-900">
                      {delivery.title}
                    </p>
                    <p className="text-[11px] text-gray-400 font-medium">
                      Section/Location
                    </p>
                    <p className="text-xs font-bold text-gray-700">
                      {delivery.loc}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[11px] text-gray-400 font-medium">
                      Delivery Date
                    </p>
                    <p className="text-xs font-bold text-gray-900">
                      May 19, 2025
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] text-gray-400 font-medium mb-0.5">
                      Status
                    </p>
                    <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-md">
                      On Schedule
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-6 py-3 text-sm font-bold text-blue-600 flex items-center justify-center gap-2 border-t border-gray-50">
            View All Deliveries
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
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </div>
      </div>
      <DeliveryDetailsModal open={showDetails} onClose={() => setShowDetails(false)} />
      <AddDeliveryDrawer onClose={() => setToggle(false)} open={toggle} />
    </div>
  );
}
