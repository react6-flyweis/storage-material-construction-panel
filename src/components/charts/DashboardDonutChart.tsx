import ReactECharts from "echarts-for-react";

interface DonutChartProps {
  title: string;
  total: number;
  data: { value: number; name: string; color: string }[];
  subtitle: string;
}

export default function DashboardDonutChart({ title, total, data, subtitle }: DonutChartProps) {
  const option = {
    color: data.map(item => item.color),
    tooltip: {
      trigger: 'item'
    },
    legend: {
      show: false
    },
    series: [
      {
        name: title,
        type: 'pie',
        radius: ['50%', '85%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: false,
          }
        },
        labelLine: {
          show: false
        },
        data: data
      }
    ],
    graphic: [
      {
        type: 'text',
        left: 'center',
        top: '38%',
        style: {
          text: subtitle,
          textAlign: 'center',
          fill: '#6B7280',
          fontSize: 12,
          fontWeight: 500
        }
      },
      {
        type: 'text',
        left: 'center',
        top: '50%',
        style: {
          text: total.toString(),
          textAlign: 'center',
          fill: '#111827',
          fontSize: 28,
          fontWeight: 'bold'
        }
      }
    ]
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <button className="text-[11px] font-bold text-gray-600 bg-white border border-gray-200 px-3 py-1 rounded-md hover:bg-gray-50 transition-colors">View All</button>
      </div>
      
      <div className="flex flex-col items-center justify-center gap-8">
        <div className="w-48 h-48 flex-shrink-0">
          <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
        </div>
        
        <div className="w-full space-y-4 px-2">
          {data.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm font-medium text-gray-500">{item.name}</span>
              </div>
              <span className="text-sm font-bold text-gray-900">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
