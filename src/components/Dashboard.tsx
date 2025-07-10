import React from 'react';
import { Download, Upload, HardDrive, Activity, TrendingUp, TrendingDown } from 'lucide-react';
import { StatCard } from './ui/StatCard';
import { useApi } from '../hooks/useApi';
import { mockApiService } from '../services/mockData';
import type { StatCardProps } from './ui/StatCard';

export function Dashboard() {
  const { data: dashboardStats, loading, error } = useApi(() => mockApiService.getDashboardStats());
  const { data: torrents } = useApi(() => mockApiService.getTorrents());

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Loading your download activity...</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 animate-pulse">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-red-600 dark:text-red-400">Error loading dashboard: {error}</p>
        </div>
      </div>
    );
  }

  const stats: StatCardProps[] = [
    {
      title: 'Download Speed',
      value: dashboardStats?.totalDownloadSpeed || '0 KB/s',
      change: dashboardStats?.activeTorrents ? '+12%' : '0%',
      trend: dashboardStats?.activeTorrents ? 'up' as const : 'down' as const,
      icon: Download,
      color: 'blue'
    },
    {
      title: 'Upload Speed',
      value: dashboardStats?.totalUploadSpeed || '0 KB/s',
      change: dashboardStats?.completedTorrents ? '+5%' : '0%',
      trend: dashboardStats?.completedTorrents ? 'up' as const : 'down' as const,
      icon: Upload,
      color: 'green'
    },
    {
      title: 'Active Downloads',
      value: dashboardStats?.activeTorrents.toString() || '0',
      change: `${dashboardStats?.queuedTorrents || 0} queued`,
      trend: dashboardStats?.activeTorrents ? 'up' as const : 'down' as const,
      icon: Activity,
      color: 'purple'
    },
    {
      title: 'Storage Used',
      value: dashboardStats?.storageUsed || '0 B',
      change: `${Math.round(((dashboardStats?.storageUsedBytes || 0) / (dashboardStats?.storageTotalBytes || 1)) * 100)}%`,
      trend: 'up' as const,
      icon: HardDrive,
      color: 'orange'
    }
  ];

  const hasActiveTorrents = (dashboardStats?.activeTorrents || 0) > 0;
  const recentTorrents = torrents?.slice(0, 3) || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          {hasActiveTorrents 
            ? `You have ${dashboardStats?.activeTorrents} active download${dashboardStats?.activeTorrents !== 1 ? 's' : ''}`
            : 'Welcome back! Here\'s your download activity overview.'
          }
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {recentTorrents.length > 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentTorrents.map((torrent) => (
              <div key={torrent.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex-1">
                  <div className="font-medium text-gray-900 dark:text-white truncate">{torrent.name}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {torrent.size} • {torrent.status} • {torrent.progress}%
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {torrent.status === 'downloading' ? torrent.downloadSpeed : torrent.uploadSpeed}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{torrent.eta}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
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
      )}
    </div>
  );
}