import type { Torrent, TorrentFile, DashboardStats, AppSettings, ApiResponse } from '../types';

// Mock API base URL - replace with actual backend URL
const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:8080/api';

class ApiService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('API request failed:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  // Torrent operations
  async getTorrents(): Promise<ApiResponse<Torrent[]>> {
    return this.request<Torrent[]>('/torrents');
  }

  async getTorrent(id: string): Promise<ApiResponse<Torrent>> {
    return this.request<Torrent>(`/torrents/${id}`);
  }

  async addTorrent(magnetLink: string): Promise<ApiResponse<Torrent>> {
    return this.request<Torrent>('/torrents', {
      method: 'POST',
      body: JSON.stringify({ magnetLink }),
    });
  }

  async pauseTorrent(id: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/torrents/${id}/pause`, {
      method: 'POST',
    });
  }

  async resumeTorrent(id: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/torrents/${id}/resume`, {
      method: 'POST',
    });
  }

  async deleteTorrent(id: string, deleteFiles: boolean = false): Promise<ApiResponse<void>> {
    return this.request<void>(`/torrents/${id}`, {
      method: 'DELETE',
      body: JSON.stringify({ deleteFiles }),
    });
  }

  // File operations
  async getTorrentFiles(torrentId: string): Promise<ApiResponse<TorrentFile[]>> {
    return this.request<TorrentFile[]>(`/torrents/${torrentId}/files`);
  }

  async getAllFiles(): Promise<ApiResponse<TorrentFile[]>> {
    return this.request<TorrentFile[]>('/files');
  }

  async openFileLocation(filePath: string): Promise<ApiResponse<void>> {
    return this.request<void>('/files/open', {
      method: 'POST',
      body: JSON.stringify({ path: filePath }),
    });
  }

  async deleteFile(filePath: string): Promise<ApiResponse<void>> {
    return this.request<void>('/files', {
      method: 'DELETE',
      body: JSON.stringify({ path: filePath }),
    });
  }

  // Dashboard stats
  async getDashboardStats(): Promise<ApiResponse<DashboardStats>> {
    return this.request<DashboardStats>('/stats');
  }

  // Settings
  async getSettings(): Promise<ApiResponse<AppSettings>> {
    return this.request<AppSettings>('/settings');
  }

  async updateSettings(settings: Partial<AppSettings>): Promise<ApiResponse<AppSettings>> {
    return this.request<AppSettings>('/settings', {
      method: 'PUT',
      body: JSON.stringify(settings),
    });
  }
}

export const apiService = new ApiService();