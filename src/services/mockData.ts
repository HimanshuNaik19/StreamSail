import type { Torrent, TorrentFile, DashboardStats, AppSettings } from '../types';

// Mock data for development and testing
export const mockTorrents: Torrent[] = [
  {
    id: '1',
    name: 'Ubuntu 22.04.3 Desktop amd64.iso',
    size: '4.7 GB',
    sizeBytes: 5046586368,
    progress: 100,
    downloadSpeed: '0 KB/s',
    uploadSpeed: '2.3 MB/s',
    eta: 'Completed',
    status: 'seeding',
    peers: 12,
    seeds: 45,
    ratio: 2.34,
    dateAdded: '2024-01-15T10:30:00Z',
    downloadPath: '/home/user/Downloads/Ubuntu',
    magnetLink: 'magnet:?xt=urn:btih:...',
  },
  {
    id: '2',
    name: 'Big Buck Bunny 4K.mkv',
    size: '2.1 GB',
    sizeBytes: 2254857830,
    progress: 67,
    downloadSpeed: '5.2 MB/s',
    uploadSpeed: '0 KB/s',
    eta: '8m 32s',
    status: 'downloading',
    peers: 8,
    seeds: 23,
    ratio: 0.12,
    dateAdded: '2024-01-16T14:22:00Z',
    downloadPath: '/home/user/Downloads/Movies',
  },
  {
    id: '3',
    name: 'Linux Distro Collection',
    size: '12.3 GB',
    sizeBytes: 13194139533,
    progress: 0,
    downloadSpeed: '0 KB/s',
    uploadSpeed: '0 KB/s',
    eta: 'Paused',
    status: 'paused',
    peers: 0,
    seeds: 15,
    ratio: 0.00,
    dateAdded: '2024-01-16T16:45:00Z',
    downloadPath: '/home/user/Downloads/Software',
  },
];

export const mockFiles: TorrentFile[] = [
  {
    id: '1',
    name: 'Ubuntu',
    size: '4.7 GB',
    sizeBytes: 5046586368,
    path: '/home/user/Downloads/Ubuntu',
    extension: '',
    type: 'folder',
    progress: 100,
    priority: 'normal',
    items: 3,
    modified: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    name: 'ubuntu-22.04.3-desktop-amd64.iso',
    size: '4.7 GB',
    sizeBytes: 5046586368,
    path: '/home/user/Downloads/Ubuntu/ubuntu-22.04.3-desktop-amd64.iso',
    extension: 'iso',
    type: 'file',
    progress: 100,
    priority: 'normal',
    modified: '2024-01-15T10:30:00Z',
  },
  {
    id: '3',
    name: 'Movies',
    size: '2.1 GB',
    sizeBytes: 2254857830,
    path: '/home/user/Downloads/Movies',
    extension: '',
    type: 'folder',
    progress: 67,
    priority: 'normal',
    items: 1,
    modified: '2024-01-16T14:22:00Z',
  },
  {
    id: '4',
    name: 'Big Buck Bunny 4K.mkv',
    size: '2.1 GB',
    sizeBytes: 2254857830,
    path: '/home/user/Downloads/Movies/Big Buck Bunny 4K.mkv',
    extension: 'mkv',
    type: 'file',
    progress: 67,
    priority: 'high',
    modified: '2024-01-16T14:22:00Z',
  },
];

export const mockDashboardStats: DashboardStats = {
  totalDownloadSpeed: '5.2 MB/s',
  totalUploadSpeed: '2.3 MB/s',
  activeTorrents: 1,
  completedTorrents: 1,
  queuedTorrents: 1,
  storageUsed: '6.8 GB',
  storageTotal: '2.0 TB',
  storageUsedBytes: 7301444198,
  storageTotalBytes: 2199023255552,
};

export const mockSettings: AppSettings = {
  maxDownloadSpeed: 0, // unlimited
  maxUploadSpeed: 1024, // 1 MB/s
  maxActiveDownloads: 5,
  maxActiveUploads: 3,
  downloadPath: '/home/user/Downloads',
  autoStartTorrents: true,
  enableDHT: true,
  enablePEX: true,
  enableNotifications: true,
  notifyOnComplete: true,
  language: 'en',
  theme: 'system',
};

// Mock API responses
export const mockApiService = {
  async getTorrents() {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
    return { success: true, data: mockTorrents };
  },

  async getTorrent(id: string) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const torrent = mockTorrents.find(t => t.id === id);
    return torrent 
      ? { success: true, data: torrent }
      : { success: false, error: 'Torrent not found' };
  },

  async addTorrent(magnetLink: string) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newTorrent: Torrent = {
      id: Date.now().toString(),
      name: 'New Torrent',
      size: '0 B',
      sizeBytes: 0,
      progress: 0,
      downloadSpeed: '0 KB/s',
      uploadSpeed: '0 KB/s',
      eta: 'Calculating...',
      status: 'downloading',
      peers: 0,
      seeds: 0,
      ratio: 0,
      dateAdded: new Date().toISOString(),
      downloadPath: '/home/user/Downloads',
      magnetLink,
    };
    mockTorrents.push(newTorrent);
    return { success: true, data: newTorrent };
  },

  async pauseTorrent(id: string) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const torrent = mockTorrents.find(t => t.id === id);
    if (torrent) {
      torrent.status = 'paused';
      torrent.downloadSpeed = '0 KB/s';
      torrent.eta = 'Paused';
    }
    return { success: true };
  },

  async resumeTorrent(id: string) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const torrent = mockTorrents.find(t => t.id === id);
    if (torrent) {
      torrent.status = torrent.progress === 100 ? 'seeding' : 'downloading';
      if (torrent.progress < 100) {
        torrent.downloadSpeed = '3.2 MB/s';
        torrent.eta = '5m 23s';
      }
    }
    return { success: true };
  },

  async deleteTorrent(id: string, deleteFiles: boolean = false) {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockTorrents.findIndex(t => t.id === id);
    if (index !== -1) {
      mockTorrents.splice(index, 1);
      if (deleteFiles) {
        // Remove associated files
        const filesToRemove = mockFiles.filter(f => f.path.includes(id));
        filesToRemove.forEach(file => {
          const fileIndex = mockFiles.findIndex(f => f.id === file.id);
          if (fileIndex !== -1) mockFiles.splice(fileIndex, 1);
        });
      }
    }
    return { success: true };
  },

  async getAllFiles() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { success: true, data: mockFiles };
  },

  async openFileLocation(filePath: string) {
    await new Promise(resolve => setTimeout(resolve, 200));
    console.log('Opening file location:', filePath);
    return { success: true };
  },

  async deleteFile(filePath: string) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const index = mockFiles.findIndex(f => f.path === filePath);
    if (index !== -1) {
      mockFiles.splice(index, 1);
    }
    return { success: true };
  },

  async getDashboardStats() {
    await new Promise(resolve => setTimeout(resolve, 200));
    // Update stats based on current torrents
    const activeTorrents = mockTorrents.filter(t => t.status === 'downloading').length;
    const completedTorrents = mockTorrents.filter(t => t.status === 'seeding' || t.status === 'completed').length;
    const queuedTorrents = mockTorrents.filter(t => t.status === 'paused').length;
    
    const totalDownloadSpeedKbps = mockTorrents
      .filter(t => t.status === 'downloading')
      .reduce((total, t) => {
        const speed = parseFloat(t.downloadSpeed.replace(/[^\d.]/g, ''));
        const unit = t.downloadSpeed.includes('MB') ? 1024 : 1;
        return total + (speed * unit);
      }, 0);
    
    const totalUploadSpeedKbps = mockTorrents
      .reduce((total, t) => {
        const speed = parseFloat(t.uploadSpeed.replace(/[^\d.]/g, ''));
        const unit = t.uploadSpeed.includes('MB') ? 1024 : 1;
        return total + (speed * unit);
      }, 0);

    const formatSpeed = (kbps: number) => {
      if (kbps >= 1024) {
        return `${(kbps / 1024).toFixed(1)} MB/s`;
      }
      return `${kbps.toFixed(0)} KB/s`;
    };

    return {
      success: true,
      data: {
        ...mockDashboardStats,
        totalDownloadSpeed: formatSpeed(totalDownloadSpeedKbps),
        totalUploadSpeed: formatSpeed(totalUploadSpeedKbps),
        activeTorrents,
        completedTorrents,
        queuedTorrents,
      }
    };
  },

  async getSettings() {
    await new Promise(resolve => setTimeout(resolve, 200));
    return { success: true, data: mockSettings };
  },

  async updateSettings(settings: Partial<AppSettings>) {
    await new Promise(resolve => setTimeout(resolve, 500));
    Object.assign(mockSettings, settings);
    return { success: true, data: mockSettings };
  },
};