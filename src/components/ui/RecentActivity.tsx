import React from 'react';
import { Download, Upload, CheckCircle, Clock } from 'lucide-react';

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: 'download_complete',
      title: 'Ubuntu 22.04.3 Desktop',
      time: '2 minutes ago',
      icon: CheckCircle,
      color: 'text-green-500'
    },
    {
      id: 2,
      type: 'download_started',
      title: 'Fedora Linux 39 Workstation',
      time: '15 minutes ago',
      icon: Download,
      color: 'text-blue-500'
    },
    {
      id: 3,
      type: 'upload_started',
      title: 'LibreOffice Collection',
      time: '1 hour ago',
      icon: Upload,
      color: 'text-purple-500'
    },
    {
      id: 4,
      type: 'queued',
      title: 'GIMP Portable Edition',
      time: '2 hours ago',
      icon: Clock,
      color: 'text-yellow-500'
    }
  ];

  return (
    <div className="space-y-4">
      {activities.map((activity) => {
        const Icon = activity.icon;
        return (
          <div key={activity.id} className="flex items-center space-x-3">
            <div className={`p-2 rounded-full bg-gray-100 dark:bg-gray-700 ${activity.color}`}>
              <Icon className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {activity.title}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {activity.time}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}