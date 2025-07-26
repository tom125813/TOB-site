// Server configuration
export const SERVER_CONFIG = {
  IP: 'play.towerofbedrock.com',
  PORT: 25565,
  VERSION: '1.20.1',
  MAX_PLAYERS: 100,
};

// Theme colors
export const COLORS = {
  primary: '#ff4081',
  primaryDark: '#e03570',
  secondary: '#e0e0e0',
  muted: '#b0b0c0',
  background: '#1e1e2f',
  cardBackground: 'rgba(40, 40, 60, 0.9)',
  border: 'rgba(255, 64, 129, 0.3)',
  success: '#4caf50',
  warning: '#ff9800',
  error: '#f44336',
  info: '#2196f3',
};

// Animation durations
export const ANIMATIONS = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  verySlow: 0.8,
};

// Breakpoints for responsive design
export const BREAKPOINTS = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1024px',
  large: '1200px',
};

// Font families
export const FONTS = {
  pixel: "'Press Start 2P', cursive",
  primary: "'Roboto', sans-serif",
  secondary: "'Montserrat', sans-serif",
  mono: "'Orbitron', sans-serif",
};

// Z-index layers
export const Z_INDEX = {
  background: -1,
  content: 1,
  navbar: 1000,
  banner: 1001,
  modal: 2000,
  tooltip: 3000,
};

// API endpoints base URLs
export const API_ENDPOINTS = {
  development: 'http://localhost:3001/api',
  production: 'https://api.towerofbedrock.com/api',
};

// Social media links
export const SOCIAL_LINKS = {
  discord: 'https://discord.gg/towerofbedrock',
  twitter: 'https://twitter.com/towerofbedrock',
  youtube: 'https://youtube.com/@towerofbedrock',
  reddit: 'https://reddit.com/r/towerofbedrock',
};

// Game-related constants
export const GAME_CONFIG = {
  MAX_LEVEL: 100,
  FLOORS: 10,
  ENERGY_TYPES: ['Fire', 'Ice', 'Lightning', 'Earth', 'Dark', 'Light'],
  RARITIES: ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary', 'Mythic'],
  WEAPON_TYPES: ['Sword', 'Axe', 'Bow', 'Staff', 'Dagger', 'Hammer'],
};

// Event types
export const EVENT_TYPES = {
  DOUBLE_EXP: 'double_exp',
  OUTPOST_SIEGE: 'outpost_siege',
  GEM_SALE: 'gem_sale',
  BOSS_RAID: 'boss_raid',
  PVP_TOURNAMENT: 'pvp_tournament',
};

// Store item categories
export const STORE_CATEGORIES = {
  RANKS: 'ranks',
  GEMS: 'gems',
  WEAPONS: 'weapons',
  ARMOR: 'armor',
  COSMETICS: 'cosmetics',
  BOOSTERS: 'boosters',
};

// Forum categories
export const FORUM_CATEGORIES = {
  GENERAL: 'general',
  ANNOUNCEMENTS: 'announcements',
  GUIDES: 'guides',
  SUGGESTIONS: 'suggestions',
  BUG_REPORTS: 'bug_reports',
  GUILD_RECRUITMENT: 'guild_recruitment',
};

// Wiki categories
export const WIKI_CATEGORIES = {
  GETTING_STARTED: 'getting_started',
  FLOORS: 'floors',
  COMBAT: 'combat',
  ENCHANTING: 'enchanting',
  GUILDS: 'guilds',
  ECONOMY: 'economy',
  EVENTS: 'events',
  FAQ: 'faq',
};

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  USER_PREFERENCES: 'userPreferences',
  THEME: 'theme',
  LANGUAGE: 'language',
};

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  NOT_FOUND: 'The requested resource was not found.',
};

// Success messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Successfully logged in!',
  REGISTER_SUCCESS: 'Account created successfully!',
  PROFILE_UPDATED: 'Profile updated successfully!',
  PURCHASE_SUCCESS: 'Purchase completed successfully!',
  POST_CREATED: 'Post created successfully!',
};

export default {
  SERVER_CONFIG,
  COLORS,
  ANIMATIONS,
  BREAKPOINTS,
  FONTS,
  Z_INDEX,
  API_ENDPOINTS,
  SOCIAL_LINKS,
  GAME_CONFIG,
  EVENT_TYPES,
  STORE_CATEGORIES,
  FORUM_CATEGORIES,
  WIKI_CATEGORIES,
  STORAGE_KEYS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
};