import ReactECharts from "echarts-for-react";
import { useMemo } from "react";

export default function MaterialUsageVsDelivery({project,manager,startDate,endDate}:any) {
    const chartData = useMemo(() => {
    const materials = [
      "Concrete",
      "Steel",
      "Lumber",
      "Brick",
      "Glass",
      "Insulation",
    ];

    const requested: number[] = [];
    const delivered: number[] = [];

    materials.forEach(() => {
      const req = Math.floor(Math.random() * 30) + 20;
      const del = Math.max(
        0,
        req - Math.floor(Math.random() * 5)
      );

      requested.push(req);
      delivered.push(del);
    });

    return {
      materials,
      requested,
      delivered,
    };
  }, [project, manager, startDate, endDate]);

  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
    },

    grid: {
      left: 60,
      right: 30,
      top: 90,
      bottom: 50,
    },

    legend: {
      top: 30,
      left: 24,
      itemGap: 24,
      icon: "roundRect",
      itemWidth: 14,
      itemHeight: 14,
      textStyle: {
        fontSize: 16,
        color: "#374151",
      },
      data: [
        {
          name: "Requested",
          itemStyle: { color: "#EAB308" },
          textStyle: { color: "#374151", fontSize: 14 },
        },
        {
          name: "Delivered",
          itemStyle: { color: "#6B7280" },
          textStyle: { color: "#374151", fontSize: 14 },
        },
      ],
    },

    xAxis: {
      type: "category",
      data: chartData.materials,
      axisTick: { show: false },
      axisLine: { show: false },
      axisLabel: {
        color: "#6B7280",
        fontSize: 13,
        interval: 0,
      },
    },

    yAxis: {
      type: "value",
      min: 0,
      max: 50,
      interval: 10,
      axisLabel: {
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
        name: "Requested",
        type: "bar",
        barWidth: 26,
        itemStyle: {
          color: "#E3B341",
          borderRadius: [4, 4, 0, 0],
        },
        data: chartData.requested,
      },
      {
        name: "Delivered",
        type: "bar",
        barWidth: 26,
        itemStyle: {
          color: "#6B7280",
          borderRadius: [4, 4, 0, 0],
        },
        data: chartData.delivered,
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
          Material Usage vs Delivery
        </h3>
      </div>

      <div className="">
        <ReactECharts
          option={option}
          style={{ height: 360 }}
          notMerge
          lazyUpdate
        />
      </div>
    </div>
  );
}
