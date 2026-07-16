import { useMemo } from "react";
import ReactECharts from "echarts-for-react";

export default function ResourceUtilizationDistribution({
  project,
  manager,
  startDate,
  endDate,
}: any) {
  const utilization = useMemo(() => {
    return {
      labor: Math.floor(Math.random() * 20) + 70,
      equipment: Math.floor(Math.random() * 20) + 70,
      material: Math.floor(Math.random() * 20) + 70,
      admin: Math.floor(Math.random() * 30) + 50,
    };
  }, [project, manager, startDate, endDate]);

  const total =
    Math.round(
      (utilization.labor +
        utilization.equipment +
        utilization.material +
        utilization.admin) /
        4
    );

  const colors = ["#3B82F6", "#10B981", "#F59E0B", "#8B5CF6"];

  const option = {
    tooltip: { show: false },

    series: [
      {
        type: "pie",
        radius: ["65%", "80%"],
        center: ["50%", "45%"],
        silent: true,
        label: { show: false },
        data: [
          {
            value: 1,
            itemStyle: { color: "#E5E7EB" },
          },
        ],
      },

      {
        type: "pie",
        radius: ["65%", "80%"],
        center: ["50%", "45%"],
        silent: true,
        startAngle: 90,
        clockwise: true,
        label: { show: false },
        labelLine: { show: false },

        data: colors.flatMap((c: any) => [
          { value: 0.3, itemStyle: { color: "#F59E0B" } },
          { value: 1.2, itemStyle: { color: c } },
          { value: 0.3, itemStyle: { color: "#F59E0B" } },
          { value: 4.8, itemStyle: { color: "transparent" } },
        ]),
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
          Resource Utilization Distribution
        </h3>
      </div>

      <div className="relative h-[260px]">
        <ReactECharts
          option={option}
          style={{ height: "100%", width: "100%" }}
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-[28px] font-semibold text-[#111827]">
            {total}%
          </p>
          <p className="text-[14px] text-gray-500">
            Total Utilization
          </p>
        </div>
      </div>

      <div className="px-6 pb-6 grid grid-cols-2 gap-y-4 gap-x-10">
        <Legend color="#3B82F6" label="Labor" value={`${utilization.labor}%`} />
        <Legend color="#10B981" label="Equipment" value={`${utilization.equipment}%`} />
        <Legend color="#F59E0B" label="Material" value={`${utilization.material}%`} />
        <Legend color="#8B5CF6" label="Admin" value={`${utilization.admin}%`} />
      </div>
    </div>
  );
}

function Legend({
  color,
  label,
  value,
}: {
  color: string;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span
        className="w-3.5 h-3.5 rounded-full mt-1"
        style={{ backgroundColor: color }}
      />
      <div>
        <p className="text-[14px] text-[#1F2937] leading-tight">
          {label}
        </p>
        <p className="text-[13px] text-gray-500">
          {value}
        </p>
      </div>
    </div>
  );
}
