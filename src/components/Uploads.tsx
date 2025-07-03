import React from 'react';
import { Upload, Share2, Copy, ExternalLink } from 'lucide-react';

export function Uploads() {
  const uploads = [
    {
      id: 1,
      name: 'My Linux Distribution Collection',
      size: '15.3 GB',
      uploaded: '45.2 GB',
      ratio: 2.95,
      seeders: 12,
      leechers: 3,
      dateAdded: '2024-01-15',
      magnetLink: 'magnet:?xt=urn:btih:...'
    },
    {
      id: 2,
      name: 'Open Source Software Bundle',
      size: '2.8 GB',
      uploaded: '8.4 GB',
      ratio: 3.00,
      seeders: 8,
      leechers: 1,
      dateAdded: '2024-01-10',
      magnetLink: 'magnet:?xt=urn:btih:...'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Uploads & Seeding</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your uploads and seeding contributions</p>
        </div>
        
        <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
          <Upload className="w-4 h-4" />
          <span>Create Torrent</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Uploaded</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">53.6 GB</p>
            </div>
            <Upload className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Average Ratio</p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">2.98</p>
            </div>
            <Share2 className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Seeds</p>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">2</p>
            </div>
            <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-purple-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">My Uploads</h3>
        </div>
        
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {uploads.map((upload) => (
            <div key={upload.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{upload.name}</h4>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Size:</span>
                      <span className="ml-2 text-gray-900 dark:text-white">{upload.size}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Uploaded:</span>
                      <span className="ml-2 text-green-600 dark:text-green-400">{upload.uploaded}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Ratio:</span>
                      <span className="ml-2 text-blue-600 dark:text-blue-400">{upload.ratio}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Seeds/Peers:</span>
                      <span className="ml-2 text-gray-900 dark:text-white">{upload.seeders}/{upload.leechers}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center space-x-4">
                    <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                      <Copy className="w-4 h-4" />
                      <span>Copy Magnet</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300">
                      <ExternalLink className="w-4 h-4" />
                      <span>View Details</span>
                    </button>
                  </div>
                </div>

                <div className="text-right text-sm text-gray-500 dark:text-gray-400">
                  Added {upload.dateAdded}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}