import axios from 'axios';

// Base API configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const endpoints = {
  // Authentication
  login: '/auth/login',
  register: '/auth/register',
  logout: '/auth/logout',
  
  // User management
  profile: '/user/profile',
  updateProfile: '/user/profile',
  
  // Server status
  serverStatus: '/server/status',
  playerCount: '/server/players',
  
  // Forums
  forums: '/forums',
  forumThreads: '/forums/threads',
  forumPosts: '/forums/posts',
  
  // Wiki
  wikiPages: '/wiki/pages',
  wikiSearch: '/wiki/search',
  
  // Store
  storeItems: '/store/items',
  purchase: '/store/purchase',
  transactions: '/store/transactions',
  
  // Events
  events: '/events',
  eventParticipation: '/events/participate',
  
  // Changelogs
  changelogs: '/changelogs',
  
  // Statistics
  stats: '/stats',
  leaderboards: '/stats/leaderboards',
};

// API functions
export const authAPI = {
  login: (credentials) => api.post(endpoints.login, credentials),
  register: (userData) => api.post(endpoints.register, userData),
  logout: () => api.post(endpoints.logout),
};

export const userAPI = {
  getProfile: () => api.get(endpoints.profile),
  updateProfile: (data) => api.put(endpoints.updateProfile, data),
};

export const serverAPI = {
  getStatus: () => api.get(endpoints.serverStatus),
  getPlayerCount: () => api.get(endpoints.playerCount),
};

export const forumAPI = {
  getForums: () => api.get(endpoints.forums),
  getThreads: (forumId) => api.get(`${endpoints.forumThreads}?forum=${forumId}`),
  getPosts: (threadId) => api.get(`${endpoints.forumPosts}?thread=${threadId}`),
  createThread: (data) => api.post(endpoints.forumThreads, data),
  createPost: (data) => api.post(endpoints.forumPosts, data),
};

export const wikiAPI = {
  getPages: () => api.get(endpoints.wikiPages),
  getPage: (pageId) => api.get(`${endpoints.wikiPages}/${pageId}`),
  searchPages: (query) => api.get(`${endpoints.wikiSearch}?q=${query}`),
};

export const storeAPI = {
  getItems: () => api.get(endpoints.storeItems),
  purchase: (itemId, quantity = 1) => api.post(endpoints.purchase, { itemId, quantity }),
  getTransactions: () => api.get(endpoints.transactions),
};

export const eventAPI = {
  getEvents: () => api.get(endpoints.events),
  participate: (eventId) => api.post(`${endpoints.eventParticipation}/${eventId}`),
};

export const changelogAPI = {
  getChangelogs: (limit = 10) => api.get(`${endpoints.changelogs}?limit=${limit}`),
  getChangelog: (id) => api.get(`${endpoints.changelogs}/${id}`),
};

export const statsAPI = {
  getStats: () => api.get(endpoints.stats),
  getLeaderboards: (type = 'level') => api.get(`${endpoints.leaderboards}?type=${type}`),
};

export default api;