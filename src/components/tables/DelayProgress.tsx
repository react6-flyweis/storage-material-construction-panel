import { useMemo } from "react";
import ReactECharts from "echarts-for-react";

export default function DelayVsProgressComparison({
  project,
  manager,
  startDate,
  endDate,
}: any) {
  const delayData = useMemo(() => {
    return Array.from({ length: 6 }, () =>
      Math.floor(Math.random() * 13)
    );
  }, [project, manager, startDate, endDate]);

  const progressData = useMemo(() => {
    return Array.from({ length: 6 }, () =>
      Math.floor(Math.random() * 50) + 50
    );
  }, [project, manager, startDate, endDate]);

  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
    },

    grid: {
      left: 50,
      right: 30,
      top: 100,
      bottom: 10,
      containLabel: true,
    },

    legend: {
      top: 30,
      left: 24,
      itemGap: 24,
      icon: "circle",
      itemWidth: 14,
      itemHeight: 14,
      textStyle: {
        fontSize: 14,
        color: "#374151",
      },
      data: [
        { name: "Delay (Days)", itemStyle: { color: "#EF4444" } },
        { name: "Progress (%)", itemStyle: { color: "#3B82F6" } },
      ],
    },

    xAxis: {
      type: "category",
      data: [
        "Downtown Office",
        "Residential Tower",
        "Shopping Mall",
        "Highway Bridge",
        "Industrial Warehouse",
        "Medical Center",
      ],
      axisTick: { show: false },
      axisLine: { show: false },
      axisLabel: {
        color: "#6B7280",
        fontSize: 12,
        rotate: 45,
        margin: 16,
      },
    },

    yAxis: [
      {
        type: "value",
        name: "Delay (Days)",
        min: 0,
        max: 15,
        interval: 3,
        nameTextStyle: {
          color: "#EF4444",
          fontSize: 13,
        },
        axisLabel: {
          color: "#EF4444",
          fontSize: 12,
        },
        splitLine: {
          lineStyle: { color: "#E5E7EB" },
        },
      },
      {
        type: "value",
        name: "Progress (%)",
        min: 0,
        max: 100,
        interval: 25,
        nameTextStyle: {
          color: "#3B82F6",
          fontSize: 13,
        },
        axisLabel: {
          formatter: "{value}%",
          color: "#3B82F6",
          fontSize: 12,
        },
        splitLine: { show: false },
      },
    ],

    series: [
      {
        name: "Delay (Days)",
        type: "bar",
        yAxisIndex: 0,
        barWidth: 32,
        itemStyle: {
          color: "#EF4444",
          borderRadius: [6, 6, 0, 0],
        },
        data: delayData,
      },
      {
        name: "Progress (%)",
        type: "line",
        yAxisIndex: 1,
        symbol: "circle",
        symbolSize: 10,
        lineStyle: {
          width: 3,
          color: "#3B82F6",
        },
        itemStyle: {
          color: "#3B82F6",
        },
        data: progressData,
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
          Delay vs Progress Comparison
        </h3>
      </div>

      <ReactECharts
        option={option}
        style={{ height: 420 }}
        notMerge
        lazyUpdate
      />
    </div>
  );
}
