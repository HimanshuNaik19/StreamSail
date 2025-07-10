import React, { useState } from 'react';
import { Play, Pause, Trash2, MoreHorizontal, Filter, Download } from 'lucide-react';
import { useApi, useApiMutation } from '../hooks/useApi';
import { apiService } from '../services/api';
import type { Torrent } from '../types';
import clsx from 'clsx';

export function Downloads() {
  const [filter, setFilter] = useState('all');
  const [showAddTorrent, setShowAddTorrent] = useState(false);
  const [magnetLink, setMagnetLink] = useState('');
  
  const { data: torrents, loading, error, refetch } = useApi(() => apiService.getTorrents());
  const pauseMutation = useApiMutation<void, string>();
  const resumeMutation = useApiMutation<void, string>();
  const deleteMutation = useApiMutation<void, { id: string; deleteFiles: boolean }>();
  const addMutation = useApiMutation<Torrent, string>();

  const handlePauseTorrent = async (id: string) => {
    const result = await pauseMutation.mutate(apiService.pauseTorrent, id);
    if (result.success) {
      refetch();
    }
  };

  const handleResumeTorrent = async (id: string) => {
    const result = await resumeMutation.mutate(apiService.resumeTorrent, id);
    if (result.success) {
      refetch();
    }
  };

  const handleDeleteTorrent = async (id: string, deleteFiles: boolean = false) => {
    if (confirm('Are you sure you want to delete this torrent?')) {
      const result = await deleteMutation.mutate(apiService.deleteTorrent, { id, deleteFiles });
      if (result.success) {
        refetch();
      }
    }
  };

  const handleAddTorrent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!magnetLink.trim()) return;

    const result = await addMutation.mutate(apiService.addTorrent, magnetLink);
    if (result.success) {
      setMagnetLink('');
      setShowAddTorrent(false);
      refetch();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'downloading': return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/50';
      case 'seeding': return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/50';
      case 'paused': return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-700';
      case 'error': return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/50';
      default: return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-700';
    }
  };

  const filteredTorrents = (torrents || []).filter(torrent => {
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
          <button 
            onClick={() => setShowAddTorrent(true)}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Add Torrent</span>
          </button>
          
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

      {showAddTorrent && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Add New Torrent</h3>
          <form onSubmit={handleAddTorrent} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Magnet Link or Torrent URL
              </label>
              <input
                type="text"
                value={magnetLink}
                onChange={(e) => setMagnetLink(e.target.value)}
                placeholder="magnet:?xt=urn:btih:..."
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                required
              />
            </div>
            <div className="flex items-center space-x-3">
              <button
                type="submit"
                disabled={addMutation.loading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg transition-colors"
              >
                {addMutation.loading ? 'Adding...' : 'Add Torrent'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddTorrent(false);
                  setMagnetLink('');
                }}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
            {addMutation.error && (
              <p className="text-red-600 dark:text-red-400 text-sm">{addMutation.error}</p>
            )}
          </form>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Loading Downloads</h3>
            <p className="text-gray-600 dark:text-gray-400">Fetching your torrent list...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">Error Loading Downloads</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
            <button 
              onClick={refetch}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Retry
            </button>
          </div>
        ) : filteredTorrents.length === 0 ? (
          <div className="text-center py-12">
            <Download className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {filter === 'all' ? 'No Downloads' : `No ${filter} downloads`}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {filter === 'all' 
                ? 'Add a torrent file or magnet link to start downloading.'
                : `No torrents with status "${filter}" found.`
              }
            </p>
            <button 
              onClick={() => setShowAddTorrent(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Add Torrent
            </button>
          </div>
        ) : (
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
                    Peers
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    ETA
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
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Added {new Date(torrent.dateAdded).toLocaleDateString()}
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
                      <div className="space-y-1">
                        <div className="text-green-600 dark:text-green-400">↓ {torrent.downloadSpeed}</div>
                        <div className="text-blue-600 dark:text-blue-400">↑ {torrent.uploadSpeed}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="space-y-1">
                        <div>{torrent.peers} peers</div>
                        <div>{torrent.seeds} seeds</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {torrent.eta}
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
                          <button 
                            onClick={() => handleResumeTorrent(torrent.id)}
                            disabled={resumeMutation.loading}
                            className="p-1 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 disabled:opacity-50"
                            title="Resume"
                          >
                            <Play className="w-4 h-4" />
                          </button>
                        ) : (
                          <button 
                            onClick={() => handlePauseTorrent(torrent.id)}
                            disabled={pauseMutation.loading}
                            className="p-1 text-yellow-600 hover:text-yellow-800 dark:text-yellow-400 dark:hover:text-yellow-300 disabled:opacity-50"
                            title="Pause"
                          >
                            <Pause className="w-4 h-4" />
                          </button>
                        )}
                        <button 
                          onClick={() => handleDeleteTorrent(torrent.id)}
                          disabled={deleteMutation.loading}
                          className="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 disabled:opacity-50"
                          title="Delete"
                        >
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
        )}
      </div>
    </div>
  );
}