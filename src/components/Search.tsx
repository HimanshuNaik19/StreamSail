import React, { useState } from 'react';
import { Search as SearchIcon, Filter, Download, Star, Clock } from 'lucide-react';

export function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('seeders');

  const searchResults = [
    {
      id: 1,
      name: 'Ubuntu 22.04.3 Desktop AMD64 Official ISO',
      size: '4.7 GB',
      seeders: 450,
      leechers: 23,
      uploaded: '2024-01-20',
      category: 'Software',
      uploader: 'ubuntu-team',
      verified: true,
      rating: 4.9
    },
    {
      id: 2,
      name: 'Fedora Linux 39 Workstation Live ISO',
      size: '1.9 GB',
      seeders: 127,
      leechers: 8,
      uploaded: '2024-01-18',
      category: 'Software',
      uploader: 'fedora-official',
      verified: true,
      rating: 4.8
    },
    {
      id: 3,
      name: 'LibreOffice 7.6.2 Complete Suite',
      size: '295 MB',
      seeders: 89,
      leechers: 12,
      uploaded: '2024-01-15',
      category: 'Software',
      uploader: 'libreoffice-team',
      verified: true,
      rating: 4.7
    },
    {
      id: 4,
      name: 'GIMP 2.10.36 Portable Edition',
      size: '156 MB',
      seeders: 43,
      leechers: 4,
      uploaded: '2024-01-12',
      category: 'Software',
      uploader: 'gimp-community',
      verified: false,
      rating: 4.5
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Search Torrents</h1>
        <p className="text-gray-600 dark:text-gray-400">Discover and download torrents from the community</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for torrents, software, media..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex gap-3">
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All Categories</option>
              <option value="software">Software</option>
              <option value="movies">Movies</option>
              <option value="music">Music</option>
              <option value="games">Games</option>
              <option value="books">Books</option>
            </select>
            
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="seeders">Most Seeders</option>
              <option value="size">Size</option>
              <option value="date">Upload Date</option>
              <option value="name">Name</option>
            </select>
            
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Search Results</h3>
            <span className="text-sm text-gray-500 dark:text-gray-400">{searchResults.length} results found</span>
          </div>
        </div>
        
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {searchResults.map((result) => (
            <div key={result.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white">{result.name}</h4>
                    {result.verified && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400">
                        ✓ Verified
                      </span>
                    )}
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-400">
                      {result.category}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                    <div>
                      <span className="font-medium">Size:</span> {result.size}
                    </div>
                    <div>
                      <span className="font-medium">Seeders:</span> <span className="text-green-600 dark:text-green-400">{result.seeders}</span>
                    </div>
                    <div>
                      <span className="font-medium">Leechers:</span> <span className="text-red-600 dark:text-red-400">{result.leechers}</span>
                    </div>
                    <div>
                      <span className="font-medium">Uploader:</span> {result.uploader}
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span>{result.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300">
                      <Clock className="w-4 h-4" />
                      <span>Add to Queue</span>
                    </button>
                  </div>
                </div>
                
                <div className="text-right text-sm text-gray-500 dark:text-gray-400">
                  Uploaded {result.uploaded}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}