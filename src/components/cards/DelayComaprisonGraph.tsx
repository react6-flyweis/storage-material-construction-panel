import { useMemo } from "react";
import ReactECharts from "echarts-for-react";

export default function ProjectDelayComparison({
  project,
  manager,
  startDate,
  endDate,
}: any) {
  const { categories, onTimeData, warningData, criticalData } = useMemo(() => {
    const cats = [
      "Downtown Office",
      "Residential Tower",
      "Shopping Mall",
      "Highway Bridge",
      "Industrial Warehouse",
      "Medical Center",
    ];

    const onTime: any[] = [];
    const warning: any[] = [];
    const critical: any[] = [];

    cats.forEach(() => {
      const type = Math.floor(Math.random() * 3);

      if (type === 0) {
        onTime.push({
          value: Math.floor(Math.random() * 3) + 1,
          itemStyle: { color: "#10B981" },
        });
        warning.push(null);
        critical.push(null);
      }

      if (type === 1) {
        onTime.push(null);
        warning.push({
          value: Math.floor(Math.random() * 5) + 3,
          itemStyle: { color: "#F97316" },
        });
        critical.push(null);
      }

      if (type === 2) {
        onTime.push(null);
        warning.push(null);
        critical.push({
          value: Math.floor(Math.random() * 8) + 7,
          itemStyle: { color: "#EF4444" },
        });
      }
    });

    return {
      categories: cats,
      onTimeData: onTime,
      warningData: warning,
      criticalData: critical,
    };
  }, [project, manager, startDate, endDate]);

  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      formatter: (params: any[]) => {
        const valid = params.find(
          (p) => typeof p.value === "number" && p.value > 0
        );
        if (!valid) return "";
        return `${valid.name}<br/>Delay: ${valid.value} days`;
      },
    },

    grid: {
      left: 40,
      right: 20,
      top: 80,
      bottom: 80,
      containLabel: true,
    },

    legend: {
      top: 20,
      left: 16,
      itemGap: 20,
      icon: "roundRect",
      itemWidth: 12,
      itemHeight: 12,
      textStyle: {
        fontSize: 14,
        color: "#374151",
      },
    },

    xAxis: {
      type: "category",
      data: categories,
      axisTick: { show: false },
      axisLine: { show: false },
      axisLabel: {
        color: "#6B7280",
        fontSize: 12,
        interval: 0,
        formatter: (value: string) => {
          const words = value.split(" ");
          return words.length > 2
            ? `${words.slice(0, 2).join(" ")}\n${words.slice(2).join(" ")}`
            : value;
        },
      },
    },

    yAxis: {
      type: "value",
      min: 0,
      max: 15,
      interval: 3,
      axisLabel: {
        color: "#6B7280",
        fontSize: 12,
      },
      splitLine: {
        lineStyle: { color: "#E5E7EB" },
      },
    },

    series: [
      {
        name: "On Time (< 3 days)",
        type: "bar",
        barWidth: 34,
        color: "#10B981",
        data: onTimeData,
        itemStyle: { borderRadius: [6, 6, 0, 0] },
        label: {
          show: true,
          position: "top",
          formatter: (p: any) => (p.value ? `${p.value}d` : ""),
          fontSize: 13,
        },
      },
      {
        name: "Warning (3-7 days)",
        type: "bar",
        barWidth: 34,
        color: "#F97316",
        data: warningData,
        itemStyle: { borderRadius: [6, 6, 0, 0] },
        label: {
          show: true,
          position: "top",
          formatter: (p: any) => (p.value ? `${p.value}d` : ""),
          fontSize: 13,
        },
      },
      {
        name: "Critical (> 7 days)",
        type: "bar",
        barWidth: 34,
        color: "#EF4444",
        data: criticalData,
        itemStyle: { borderRadius: [6, 6, 0, 0] },
        label: {
          show: true,
          position: "top",
          formatter: (p: any) => (p.value ? `${p.value}d` : ""),
          fontSize: 13,
        },
      },
    ],

    media: [
      {
        query: { maxWidth: 480 },
        option: {
          grid: { left: 30, right: 16, bottom: 110 },
          xAxis: {
            axisLabel: { rotate: 45, fontSize: 10 },
          },
          series: [{ barWidth: 18 }, { barWidth: 18 }, { barWidth: 18 }],
          legend: {
            bottom: 8,
            left: "center",
            top: "auto",
            orient: "horizontal",
            itemGap: 12,
            itemWidth: 10,
            itemHeight: 10,
            textStyle: { fontSize: 11 },
          },
        },
      },
      {
        query: { maxWidth: 768 },
        option: {
          grid: { bottom: 10 },
          xAxis: {
            axisLabel: { rotate: 35, fontSize: 11 },
          },
          series: [{ barWidth: 24 }, { barWidth: 24 }, { barWidth: 24 }],
          legend: {
            top: 16,
            left: "center",
            itemGap: 16,
            textStyle: { fontSize: 12 },
          },
        },
      },
    ],
  };

  return (
    <div className="rounded-[8px] bg-white border border-[#F3F4F6] shadow">
      <div className="lg:px-6 px-3 py-4 border-b border-[#E5E7EB]">
        <h3 className="text-[18px] text-[#1F2937]">
          Project Delay (Days) Comparison
        </h3>
      </div>

      <ReactECharts
        option={option}
        style={{ height: 400, width: "100%" }}
        opts={{ renderer: "canvas" }}
        notMerge
        lazyUpdate
      />
    </div>
  );
}
