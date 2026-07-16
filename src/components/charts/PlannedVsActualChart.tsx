import ReactECharts from "echarts-for-react";
import { useMemo } from "react";

export default function PlannedVsActualChart({project,manager,startDate,endDate}:any) {
     const chartData = useMemo(() => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

    let planned = [];
    let actual = [];

    let lastPlanned = 0;
    let lastActual = 0;

    for (let i = 0; i < months.length; i++) {
      lastPlanned = Math.min(
        100,
        lastPlanned + Math.floor(Math.random() * 20 + 5)
      );
      lastActual = Math.min(
        100,
        lastActual + Math.floor(Math.random() * 18 + 4)
      );

      planned.push(lastPlanned);
      actual.push(lastActual);
    }

    return {
      months,
      planned,
      actual,
    };
  }, [project, manager, startDate, endDate]);


  const option = {
    tooltip: {
      trigger: "axis",
      formatter: (params: any) => {
        return params
          .map(
            (p: any) =>
              `${p.marker} ${p.seriesName}: ${p.value}%`
          )
          .join("<br/>");
      },
    },

    grid: {
      left: 60,
      right: 30,
      top: 120,
      bottom: 40,
    },

    legend: {
      top: 30,
      left: 16,
      itemGap: 20,
      itemWidth: 12,
      itemHeight: 12,
      textStyle: {
        fontSize: 14,
      },

      data: [
        {
          name: "Planned",
          icon: "circle",
          textStyle: {
            color: "#2563EB",
            backgroundColor: "#E0E7FF",
            padding: [8, 16],
            borderRadius: 8,
          },
        },
        {
          name: "Actual",
          icon: "circle",
          textStyle: {
            color: "#15803D",
            backgroundColor: "#DCFCE7",
            padding: [8, 16],
            borderRadius: 8,
          },
        },
      ],
    },


    xAxis: {
      type: "category",
      data: chartData.months,
      axisTick: { show: false },
      axisLine: { show: false },
      axisLabel: {
        color: "#6B7280",
        fontSize: 12,
      },
    },

    yAxis: {
      type: "value",
      min: 0,
      max: 100,
      interval: 25,
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
        name: "Planned",
        type: "line",
        smooth: true,
        data: chartData.planned,
        symbol: "circle",
        symbolSize: 10,
        lineStyle: {
          width: 4,
          color: "#2563EB",
        },
        itemStyle: {
          color: "#2563EB",
        },
      },
      {
        name: "Actual",
        type: "line",
        smooth: true,
        data: chartData.actual,
        symbol: "circle",
        symbolSize: 10,
        lineStyle: {
          width: 4,
          color: "#16A34A",
        },
        itemStyle: {
          color: "#16A34A",
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
          Planned vs Actual Project Progress
        </h3>
      </div>

      <div className="">
        <ReactECharts
          option={option}
          style={{ height: 390 }}
          notMerge
          lazyUpdate
        />
      </div>
    </div>
  );
}
