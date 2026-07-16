import { useMemo } from "react";
import ReactECharts from "echarts-for-react";

export default function SafetyComplianceOverTime({
  project,
  manager,
  startDate,
  endDate,
}: any) {
  const data = useMemo(() => {
    return Array.from({ length: 8 }, () =>
      Math.floor(Math.random() * 15) + 85
    );
  }, [project, manager, startDate, endDate]);

  const safeWeeks = data.filter((v) => v >= 95).length;
  const warningWeeks = data.filter((v) => v >= 90 && v < 95).length;
  const totalIncidents = data.filter((v) => v < 90).length * 2;

  const option = {
    tooltip: {
      trigger: "axis",
      formatter: (params: any) => {
        const p = params[0];
        return `Week ${p.axisValue}<br/>Compliance: ${p.value}%`;
      },
    },

    grid: {
      left: 10,
      right: 30,
      top: 90,
      bottom: 30,
      containLabel: true,
    },

    legend: {
      top: 30,
      left: 10,
      itemGap: 10,
      icon: "circle",
      itemWidth: 14,
      itemHeight: 14,
      textStyle: {
        fontSize: 14,
        color: "#374151",
      },
      data: [
        { name: "Safe (≥95%)", itemStyle: { color: "#10B981" } },
        { name: "Warning (90-94%)", itemStyle: { color: "#F97316" } },
        { name: "Critical (<90%)", itemStyle: { color: "#EF4444" } },
      ],
    },

    xAxis: {
      type: "category",
      data: ["1", "2", "3", "4", "5", "6", "7", "8"],
      axisTick: { show: false },
      axisLine: { show: false },
      axisLabel: {
        color: "#6B7280",
        formatter: (v: string) => `W\n${v}`,
        fontSize: 12,
      },
    },

    yAxis: {
      type: "value",
      min: 80,
      max: 100,
      interval: 5,
      axisLabel: {
        formatter: "{value}%",
        color: "#6B7280",
        fontSize: 12,
      },
      splitLine: {
        lineStyle: {
          color: "#E5E7EB",
        },
      },
    },

    series: [
      {
        name: "Safe (≥95%)",
        color: "#10B981",
        type: "line",
        data: data.map((v) => ({
          value: v,
          itemStyle: {
            color:
              v >= 95
                ? "#10B981"
                : v >= 90
                ? "#F97316"
                : "#EF4444",
          },
        })),
        symbol: "circle",
        symbolSize: 10,
        lineStyle: {
          color: "#6B7280",
          width: 2,
        },
      },
      {
        name: "Warning (90-94%)",
        color: "#F97316",
        type: "line",
        data: data.map((v) => ({
          value: v,
          itemStyle: {
            color:
              v >= 95
                ? "#10B981"
                : v >= 90
                ? "#F97316"
                : "#EF4444",
          },
        })),
        symbol: "circle",
        symbolSize: 10,
        lineStyle: {
          color: "#6B7280",
          width: 2,
        },
      },
      {
        name: "Critical (<90%)",
        color: "#EF4444",
        type: "line",
        data: data.map((v) => ({
          value: v,
          itemStyle: {
            color:
              v >= 95
                ? "#10B981"
                : v >= 90
                ? "#F97316"
                : "#EF4444",
          },
        })),
        symbol: "circle",
        symbolSize: 10,
        lineStyle: {
          color: "#6B7280",
          width: 2,
        },
      },
    ],
  };

  return (
    <div
      className="rounded-[8px] bg-white border border-[#F3F4F6]
      shadow-[0px_2px_4px_-2px_rgba(0,0,0,0.1),_0px_4px_6px_-1px_rgba(0,0,0,0.1)]"
    >
      <div className="lg:px-6 px-3 py-4 border-b border-[#E5E7EB]">
        <h3 className="text-[18px] text-[#1F2937]">
          Safety Compliance Over Time
        </h3>
      </div>

      <ReactECharts
        option={option}
        style={{ height: 360 }}
        notMerge
        lazyUpdate
      />

      <div className="px-6 pb-4 grid grid-cols-3 text-center">
        <div>
          <p className="text-[20px] font-semibold text-green-600">
            {safeWeeks}
          </p>
          <p className="text-[14px] text-gray-500">Safe Weeks</p>
        </div>
        <div>
          <p className="text-[20px] font-semibold text-orange-500">
            {warningWeeks}
          </p>
          <p className="text-[14px] text-gray-500">Warning Weeks</p>
        </div>
        <div>
          <p className="text-[20px] font-semibold text-red-500">
            {totalIncidents}
          </p>
          <p className="text-[14px] text-gray-500">Total Incidents</p>
        </div>
      </div>
    </div>
  );
}
