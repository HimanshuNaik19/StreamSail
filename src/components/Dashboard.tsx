import React from 'react';
import { Download, Upload, HardDrive, Activity, TrendingUp, TrendingDown } from 'lucide-react';
import { StatCard } from './ui/StatCard';
import { Chart } from './ui/Chart';
import { RecentActivity } from './ui/RecentActivity';

export function Dashboard() {
  const stats = [
    {
      title: 'Download Speed',
      value: '12.3 MB/s',
      change: '+15%',
      trend: 'up' as const,
      icon: Download,
      color: 'blue'
    },
    {
      title: 'Upload Speed',
      value: '8.7 MB/s',
      change: '+8%',
      trend: 'up' as const,
      icon: Upload,
      color: 'green'
    },
    {
      title: 'Active Torrents',
      value: '15',
      change: '-2',
      trend: 'down' as const,
      icon: Activity,
      color: 'purple'
    },
    {
      title: 'Storage Used',
      value: '1.2 TB',
      change: '+5%',
      trend: 'up' as const,
      icon: HardDrive,
      color: 'orange'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Welcome back! Here's your torrent activity overview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Bandwidth Usage</h3>
            <div className="flex space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <TrendingDown className="w-4 h-4 text-blue-500" />
                <span className="text-gray-600 dark:text-gray-400">Download</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-gray-600 dark:text-gray-400">Upload</span>
              </div>
            </div>
          </div>
          <Chart />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Recent Activity</h3>
          <RecentActivity />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Top Downloads</h3>
        <div className="space-y-4">
          {[
            { name: 'Ubuntu 22.04.3 Desktop', size: '4.7 GB', progress: 100, speed: 'Complete', seeders: 450 },
            { name: 'Fedora-39-1.5-x86_64-netinst.iso', size: '695 MB', progress: 75, speed: '8.2 MB/s', seeders: 23 },
            { name: 'LibreOffice_7.6.2_Linux_x86-64_deb.tar.gz', size: '295 MB', progress: 45, speed: '3.1 MB/s', seeders: 12 },
          ].map((torrent, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 dark:text-white">{torrent.name}</h4>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                  <span>{torrent.size}</span>
                  <span>{torrent.seeders} seeders</span>
                  <span>{torrent.speed}</span>
                </div>
                <div className="mt-2 w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${torrent.progress}%` }}
                  ></div>
                </div>
              </div>
              <div className="ml-4 text-right">
                <div className="text-sm font-semibold text-gray-900 dark:text-white">{torrent.progress}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}