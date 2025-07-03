import React, { useState } from 'react';
import { Play, Pause, Trash2, MoreHorizontal, Filter } from 'lucide-react';
import clsx from 'clsx';

export function Downloads() {
  const [filter, setFilter] = useState('all');
  
  const torrents = [
    {
      id: 1,
      name: 'Ubuntu 22.04.3 Desktop AMD64',
      size: '4.7 GB',
      progress: 100,
      downloadSpeed: '0 B/s',
      uploadSpeed: '2.1 MB/s',
      eta: 'Complete',
      ratio: 2.34,
      seeds: 450,
      peers: 23,
      status: 'seeding'
    },
    {
      id: 2,
      name: 'Fedora-39-1.5-x86_64-netinst.iso',
      size: '695 MB',
      progress: 75,
      downloadSpeed: '8.2 MB/s',
      uploadSpeed: '1.5 MB/s',
      eta: '2m 15s',
      ratio: 0.12,
      seeds: 23,
      peers: 8,
      status: 'downloading'
    },
    {
      id: 3,
      name: 'LibreOffice 7.6.2 Linux x86-64',
      size: '295 MB',
      progress: 45,
      downloadSpeed: '3.1 MB/s',
      uploadSpeed: '0.8 MB/s',
      eta: '1m 42s',
      ratio: 0.05,
      seeds: 12,
      peers: 4,
      status: 'downloading'
    },
    {
      id: 4,
      name: 'VLC Media Player 3.0.18',
      size: '156 MB',
      progress: 0,
      downloadSpeed: '0 B/s',
      uploadSpeed: '0 B/s',
      eta: '∞',
      ratio: 0.00,
      seeds: 0,
      peers: 0,
      status: 'paused'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'downloading': return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/50';
      case 'seeding': return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/50';
      case 'paused': return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-700';
      case 'error': return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/50';
      default: return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-700';
    }
  };

  const filteredTorrents = torrents.filter(torrent => {
    if (filter === 'all') return true;
    return torrent.status === filter;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Downloads</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your active and completed downloads</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All Status</option>
              <option value="downloading">Downloading</option>
              <option value="seeding">Seeding</option>
              <option value="paused">Paused</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Size
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Progress
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Speed
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  ETA
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Seeds/Peers
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredTorrents.map((torrent) => (
                <tr key={torrent.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900 dark:text-white truncate max-w-xs">
                      {torrent.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    {torrent.size}
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-full max-w-xs">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {torrent.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div 
                          className={clsx(
                            'h-2 rounded-full transition-all duration-300',
                            torrent.progress === 100 ? 'bg-green-500' : 'bg-blue-500'
                          )}
                          style={{ width: `${torrent.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="text-green-600 dark:text-green-400">↓ {torrent.downloadSpeed}</div>
                    <div className="text-blue-600 dark:text-blue-400">↑ {torrent.uploadSpeed}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    {torrent.eta}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    {torrent.seeds}/{torrent.peers}
                  </td>
                  <td className="px-6 py-4">
                    <span className={clsx(
                      'inline-flex px-2 py-1 text-xs font-semibold rounded-full capitalize',
                      getStatusColor(torrent.status)
                    )}>
                      {torrent.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      {torrent.status === 'paused' ? (
                        <button className="p-1 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300">
                          <Play className="w-4 h-4" />
                        </button>
                      ) : (
                        <button className="p-1 text-yellow-600 hover:text-yellow-800 dark:text-yellow-400 dark:hover:text-yellow-300">
                          <Pause className="w-4 h-4" />
                        </button>
                      )}
                      <button className="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}