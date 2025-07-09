import React from 'react';
import { Download, Upload, HardDrive, Activity, TrendingUp, TrendingDown } from 'lucide-react';
import { StatCard } from './ui/StatCard';
import { Chart } from './ui/Chart';
import { RecentActivity } from './ui/RecentActivity';

export function Dashboard() {
  const stats = [
    {
      title: 'Download Speed',
      value: '0 MB/s',
      change: '0%',
      trend: 'down' as const,
      icon: Download,
      color: 'blue'
    },
    {
      title: 'Active Torrents',
      value: '0',
      change: '0',
      trend: 'down' as const,
      icon: Activity,
      color: 'purple'
    },
    {
      title: 'Storage Used',
      value: '0 GB',
      change: '0%',
      trend: 'down' as const,
      icon: HardDrive,
      color: 'orange'
    },
    {
      title: 'Total Downloads',
      value: '0',
      change: '0',
      trend: 'down' as const,
      icon: Download,
      color: 'green'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Welcome back! Here's your download activity overview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="text-center py-12">
          <Download className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Downloads Yet</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Start downloading torrents to see your activity here.</p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            Add Torrent
          </button>
        </div>
      </div>
    </div>
  );
}