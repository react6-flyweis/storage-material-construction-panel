import React from 'react';

interface Activity {
  id: string;
  type: string;
  description: string;
  timestamp: string;
  iconBg: string;
  icon: React.ReactNode;
}

export default function RecentActivity({ activities }: { activities: Activity[] }) {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
        <button className="text-sm font-semibold text-blue-600 bg-blue-50 px-4 py-1.5 rounded-lg">View All</button>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center gap-4 p-3 rounded-xl border border-gray-50 hover:bg-gray-50 transition-colors">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: activity.iconBg }}
            >
              {activity.icon}
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-900 line-clamp-2 sm:line-clamp-1">{activity.description}</p>
            </div>
            
            <div className="text-right">
              <p className="text-xs text-gray-400 font-medium whitespace-nowrap">{activity.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
