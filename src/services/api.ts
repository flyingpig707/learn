// API服务层 - 统一管理所有API调用
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface MediaFile {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  thumbnailUrl?: string;
  duration?: number; // 音视频时长（秒）
  uploadedAt: Date;
}

export interface Article {
  id: string;
  title: string;
  content: string;
  summary: string;
  tags: string[];
  category: string;
  status: 'draft' | 'published' | 'archived';
  createdAt: Date;
  updatedAt: Date;
  author: string;
  coverImage?: string;
  viewCount: number;
  likeCount: number;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  industry: string;
  role: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  estimatedHours: number;
  modules: LearningModule[];
  createdAt: Date;
  updatedAt: Date;
}

export interface LearningModule {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'audio' | 'article' | 'quiz' | 'project';
  content: string;
  mediaFiles: MediaFile[];
  duration: number; // 预计学习时间（分钟）
  order: number;
  isCompleted: boolean;
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'student' | 'instructor' | 'admin';
  profile: {
    firstName: string;
    lastName: string;
    avatar?: string;
    bio?: string;
    industry?: string;
    position?: string;
  };
  progress: {
    completedModules: string[];
    currentPath?: string;
    totalHours: number;
  };
}

// API基础配置
const API_BASE_URL = 'http://localhost:3001/api';

class ApiService {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
    this.token = localStorage.getItem('auth_token');
  }

  // 设置认证令牌
  setAuthToken(token: string) {
    this.token = token;
    localStorage.setItem('auth_token', token);
  }

  // 清除认证令牌
  clearAuthToken() {
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  // 通用请求方法
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.message || `HTTP ${response.status}`,
        };
      }

      return {
        success: true,
        data: data.data || data,
        message: data.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : '网络请求失败',
      };
    }
  }

  // GET请求
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  // POST请求
  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // PUT请求
  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // DELETE请求
  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  // 文件上传
  async uploadFile(file: File, type: 'media' | 'image' = 'media'): Promise<ApiResponse<MediaFile>> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    const url = `${this.baseURL}/upload`;
    const headers: HeadersInit = {};

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.message || `上传失败: HTTP ${response.status}`,
        };
      }

      return {
        success: true,
        data: data.data || data,
        message: data.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : '文件上传失败',
      };
    }
  }

  // 用户认证相关API
  auth = {
    login: (credentials: { email: string; password: string }) =>
      this.post<{ user: User; token: string }>('/auth/login', credentials),
    
    register: (userData: { email: string; password: string; username: string }) =>
      this.post<{ user: User; token: string }>('/auth/register', userData),
    
    logout: () => this.post('/auth/logout'),
    
    getCurrentUser: () => this.get<User>('/auth/me'),
    
    refreshToken: () => this.post<{ token: string }>('/auth/refresh'),
  };

  // 文章相关API
  articles = {
    getAll: (params?: { page?: number; limit?: number; category?: string; status?: string }) =>
      this.get<{ articles: Article[]; total: number; page: number; limit: number }>(`/articles${this.buildQueryString(params)}`),
    
    getById: (id: string) => this.get<Article>(`/articles/${id}`),
    
    create: (article: Partial<Article>) => this.post<Article>('/articles', article),
    
    update: (id: string, article: Partial<Article>) => this.put<Article>(`/articles/${id}`, article),
    
    delete: (id: string) => this.delete(`/articles/${id}`),
    
    publish: (id: string) => this.put<Article>(`/articles/${id}/publish`),
    
    archive: (id: string) => this.put<Article>(`/articles/${id}/archive`),
  };

  // 学习路径相关API
  learningPaths = {
    getAll: (params?: { industry?: string; role?: string; level?: string }) =>
      this.get<LearningPath[]>(`/learning-paths${this.buildQueryString(params)}`),
    
    getById: (id: string) => this.get<LearningPath>(`/learning-paths/${id}`),
    
    create: (path: Partial<LearningPath>) => this.post<LearningPath>('/learning-paths', path),
    
    update: (id: string, path: Partial<LearningPath>) => this.put<LearningPath>(`/learning-paths/${id}`, path),
    
    delete: (id: string) => this.delete(`/learning-paths/${id}`),
    
    getRecommendations: (userProfile: { industry: string; role: string; experience: string }) =>
      this.post<LearningPath[]>('/learning-paths/recommendations', userProfile),
  };

  // 学习模块相关API
  modules = {
    getByPathId: (pathId: string) => this.get<LearningModule[]>(`/learning-paths/${pathId}/modules`),
    
    getById: (id: string) => this.get<LearningModule>(`/modules/${id}`),
    
    create: (pathId: string, module: Partial<LearningModule>) =>
      this.post<LearningModule>(`/learning-paths/${pathId}/modules`, module),
    
    update: (id: string, module: Partial<LearningModule>) =>
      this.put<LearningModule>(`/modules/${id}`, module),
    
    delete: (id: string) => this.delete(`/modules/${id}`),
    
    markCompleted: (id: string) => this.put<LearningModule>(`/modules/${id}/complete`),
  };

  // 媒体文件相关API
  media = {
    getAll: (params?: { type?: 'video' | 'audio' | 'image'; page?: number; limit?: number }) =>
      this.get<{ files: MediaFile[]; total: number }>(`/media${this.buildQueryString(params)}`),
    
    getById: (id: string) => this.get<MediaFile>(`/media/${id}`),
    
    upload: (file: File, type: 'media' | 'image' = 'media') => this.uploadFile(file, type),
    
    delete: (id: string) => this.delete(`/media/${id}`),
    
    updateMetadata: (id: string, metadata: { title?: string; description?: string; tags?: string[] }) =>
      this.put<MediaFile>(`/media/${id}`, metadata),
  };

  // 用户进度相关API
  progress = {
    getUserProgress: () => this.get<User['progress']>('/progress'),
    
    updateModuleProgress: (moduleId: string, completed: boolean) =>
      this.put(`/progress/modules/${moduleId}`, { completed }),
    
    getPathProgress: (pathId: string) =>
      this.get<{ completedModules: string[]; totalModules: number; progressPercentage: number }>(`/progress/paths/${pathId}`),
  };

  // 构建查询字符串
  private buildQueryString(params?: Record<string, any>): string {
    if (!params) return '';
    
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });
    
    const queryString = searchParams.toString();
    return queryString ? `?${queryString}` : '';
  }
}

// 创建API服务实例
export const apiService = new ApiService();

// 导出便捷方法
export const {
  auth,
  articles,
  learningPaths,
  modules,
  media,
  progress,
} = apiService;

// 错误处理工具
export const handleApiError = (response: ApiResponse<any>) => {
  if (!response.success) {
    console.error('API Error:', response.error);
    // 这里可以添加全局错误处理逻辑，比如显示通知
    throw new Error(response.error || '请求失败');
  }
  return response.data;
};

// 模拟数据（开发阶段使用）
export const mockApiService = {
  // 模拟延迟
  delay: (ms: number = 1000) => new Promise(resolve => setTimeout(resolve, ms)),

  // 模拟文章数据
  mockArticles: [
    {
      id: '1',
      title: '人工智能学习指南',
      content: '这是一篇关于人工智能学习的详细指南...',
      summary: '人工智能学习的基础知识和进阶路径',
      tags: ['AI', '机器学习', '深度学习'],
      category: '技术',
      status: 'published',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-02'),
      author: 'AI助手',
      viewCount: 1250,
      likeCount: 89,
    },
    {
      id: '2',
      title: 'React性能优化最佳实践',
      content: '本文介绍React应用性能优化的各种技巧...',
      summary: 'React应用性能优化的实用技巧和方法',
      tags: ['React', '性能优化', '前端'],
      category: '技术',
      status: 'published',
      createdAt: new Date('2024-01-03'),
      updatedAt: new Date('2024-01-04'),
      author: 'React专家',
      viewCount: 980,
      likeCount: 67,
    },
  ] as Article[],

  // 模拟API调用
  async getArticles(): Promise<ApiResponse<Article[]>> {
    await this.delay(500);
    return {
      success: true,
      data: this.mockArticles,
      message: '获取文章列表成功',
    };
  },

  async createArticle(article: Omit<Article, 'id' | 'createdAt' | 'updatedAt' | 'viewCount' | 'likeCount'>): Promise<ApiResponse<Article>> {
    await this.delay(800);
    
    const newArticle: Article = {
      ...article,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
      viewCount: 0,
      likeCount: 0,
    };
    
    this.mockArticles.push(newArticle);
    return {
      success: true,
      data: newArticle,
      message: '文章创建成功',
    };
  },
};

export default apiService;