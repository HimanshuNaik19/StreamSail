import React from 'react';
import { 
  LayoutDashboard, 
  Download,  
  FolderOpen, 
  Settings,
  TrendingUp,
  Clock,
  CheckCircle
} from 'lucide-react';
import clsx from 'clsx';

import { useApi } from '../hooks/useApi';
import { apiService } from '../services/api';
import type { ViewType } from '../App';

interface SidebarProps {
  isOpen: boolean;
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

export function Sidebar({ isOpen, currentView, onViewChange }: SidebarProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'downloads', label: 'Downloads', icon: Download },
    { id: 'files', label: 'Files', icon: FolderOpen },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const { data: dashboardStats } = useApi(() => apiService.getDashboardStats());
  
  const stats = [
    { 
      label: 'Active', 
      value: dashboardStats?.activeTorrents.toString() || '0', 
      icon: TrendingUp, 
      color: 'text-green-500' 
    },
    { 
      label: 'Queued', 
      value: dashboardStats?.queuedTorrents.toString() || '0', 
      icon: Clock, 
      color: 'text-yellow-500' 
    },
    { 
      label: 'Complete', 
      value: dashboardStats?.completedTorrents.toString() || '0', 
      icon: CheckCircle, 
      color: 'text-blue-500' 
    },
  ];

  const storagePercentage = dashboardStats 
    ? Math.round((dashboardStats.storageUsedBytes / dashboardStats.storageTotalBytes) * 100)
    : 0;

  return (
    <aside className={clsx(
      'fixed left-0 top-16 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-transform duration-300 z-40',
      isOpen ? 'translate-x-0' : '-translate-x-full',
      'w-64'
    )}>
      <div className="p-6 h-full overflow-y-auto">
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id as ViewType)}
                className={clsx(
                  'w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-colors',
                  currentView === item.id
                    ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Quick Stats</h3>
          <div className="space-y-3">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon className={clsx('w-4 h-4', stat.color)} />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">{stat.value}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 text-white">
            <h4 className="font-semibold mb-2">Storage Usage</h4>
            <div className="flex items-center justify-between text-sm mb-2">
              <span>{dashboardStats?.storageUsed || '0 B'} used</span>
              <span>{dashboardStats?.storageTotal || '0 B'} total</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className="bg-white rounded-full h-2 transition-all duration-300" 
                style={{ width: `${Math.min(storagePercentage, 100)}%` }}
              ></div>
            </div>
            <div className="text-xs mt-1 opacity-90">{storagePercentage}% used</div>
          </div>
        </div>
      </div>
    </aside>
  );
}