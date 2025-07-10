export interface Torrent {
  id: string;
  name: string;
  size: string;
  sizeBytes: number;
  progress: number;
  downloadSpeed: string;
  uploadSpeed: string;
  eta: string;
  status: 'downloading' | 'seeding' | 'paused' | 'completed' | 'error';
  peers: number;
  seeds: number;
  ratio: number;
  dateAdded: string;
  downloadPath: string;
  magnetLink?: string;
  files?: TorrentFile[];
}

export interface TorrentFile {
  id: string;
  name: string;
  size: string;
  sizeBytes: number;
  path: string;
  extension: string;
  type: 'file' | 'folder';
  progress: number;
  priority: 'low' | 'normal' | 'high';
  items?: number; // for folders
  modified: string;
}

export interface DashboardStats {
  totalDownloadSpeed: string;
  totalUploadSpeed: string;
  activeTorrents: number;
  completedTorrents: number;
  queuedTorrents: number;
  storageUsed: string;
  storageTotal: string;
  storageUsedBytes: number;
  storageTotalBytes: number;
}

export interface AppSettings {
  maxDownloadSpeed: number; // KB/s, 0 = unlimited
  maxUploadSpeed: number; // KB/s, 0 = unlimited
  maxActiveDownloads: number;
  maxActiveUploads: number;
  downloadPath: string;
  autoStartTorrents: boolean;
  enableDHT: boolean;
  enablePEX: boolean;
  enableNotifications: boolean;
  notifyOnComplete: boolean;
  language: string;
  theme: 'light' | 'dark' | 'system';
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}