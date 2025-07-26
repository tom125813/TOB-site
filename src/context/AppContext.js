import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { STORAGE_KEYS } from '../utils/constants';

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  serverStatus: {
    online: true,
    playerCount: 0,
    maxPlayers: 100,
  },
  events: [],
  changelogs: [],
  loading: false,
  error: null,
  theme: 'dark',
  notifications: [],
};

// Action types
export const ACTION_TYPES = {
  SET_USER: 'SET_USER',
  SET_AUTHENTICATED: 'SET_AUTHENTICATED',
  SET_SERVER_STATUS: 'SET_SERVER_STATUS',
  SET_EVENTS: 'SET_EVENTS',
  SET_CHANGELOGS: 'SET_CHANGELOGS',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  SET_THEME: 'SET_THEME',
  ADD_NOTIFICATION: 'ADD_NOTIFICATION',
  REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION',
  LOGOUT: 'LOGOUT',
};

// Reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
      };
    
    case ACTION_TYPES.SET_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    
    case ACTION_TYPES.SET_SERVER_STATUS:
      return {
        ...state,
        serverStatus: { ...state.serverStatus, ...action.payload },
      };
    
    case ACTION_TYPES.SET_EVENTS:
      return {
        ...state,
        events: action.payload,
      };
    
    case ACTION_TYPES.SET_CHANGELOGS:
      return {
        ...state,
        changelogs: action.payload,
      };
    
    case ACTION_TYPES.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    
    case ACTION_TYPES.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    
    case ACTION_TYPES.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    
    case ACTION_TYPES.SET_THEME:
      return {
        ...state,
        theme: action.payload,
      };
    
    case ACTION_TYPES.ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };
    
    case ACTION_TYPES.REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification.id !== action.payload
        ),
      };
    
    case ACTION_TYPES.LOGOUT:
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    
    default:
      return state;
  }
};

// Create context
const AppContext = createContext();

// Context provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load user preferences from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
    if (savedTheme) {
      dispatch({ type: ACTION_TYPES.SET_THEME, payload: savedTheme });
    }

    const authToken = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    if (authToken) {
      // Validate token and set user if valid
      // This would typically involve an API call
      dispatch({ type: ACTION_TYPES.SET_AUTHENTICATED, payload: true });
    }
  }, []);

  // Action creators
  const actions = {
    setUser: (user) => {
      dispatch({ type: ACTION_TYPES.SET_USER, payload: user });
    },

    setAuthenticated: (isAuthenticated) => {
      dispatch({ type: ACTION_TYPES.SET_AUTHENTICATED, payload: isAuthenticated });
    },

    setServerStatus: (status) => {
      dispatch({ type: ACTION_TYPES.SET_SERVER_STATUS, payload: status });
    },

    setEvents: (events) => {
      dispatch({ type: ACTION_TYPES.SET_EVENTS, payload: events });
    },

    setChangelogs: (changelogs) => {
      dispatch({ type: ACTION_TYPES.SET_CHANGELOGS, payload: changelogs });
    },

    setLoading: (loading) => {
      dispatch({ type: ACTION_TYPES.SET_LOADING, payload: loading });
    },

    setError: (error) => {
      dispatch({ type: ACTION_TYPES.SET_ERROR, payload: error });
    },

    clearError: () => {
      dispatch({ type: ACTION_TYPES.CLEAR_ERROR });
    },

    setTheme: (theme) => {
      localStorage.setItem(STORAGE_KEYS.THEME, theme);
      dispatch({ type: ACTION_TYPES.SET_THEME, payload: theme });
    },

    addNotification: (notification) => {
      const id = Date.now().toString();
      dispatch({
        type: ACTION_TYPES.ADD_NOTIFICATION,
        payload: { ...notification, id },
      });

      // Auto-remove notification after 5 seconds
      setTimeout(() => {
        dispatch({ type: ACTION_TYPES.REMOVE_NOTIFICATION, payload: id });
      }, 5000);
    },

    removeNotification: (id) => {
      dispatch({ type: ACTION_TYPES.REMOVE_NOTIFICATION, payload: id });
    },

    logout: () => {
      dispatch({ type: ACTION_TYPES.LOGOUT });
    },
  };

  const value = {
    state,
    actions,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook to use the context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export default AppContext;