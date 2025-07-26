import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';

const NotificationContainer = styled.div`
  position: fixed;
  top: 100px;
  right: 20px;
  z-index: 3000;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
  
  @media (max-width: 768px) {
    right: 10px;
    left: 10px;
    max-width: none;
  }
`;

const NotificationItem = styled(motion.div)`
  background: rgba(40, 40, 60, 0.95);
  border: 1px solid rgba(255, 64, 129, 0.3);
  border-radius: 10px;
  padding: 15px;
  backdrop-filter: blur(10px);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: ${props => {
      switch (props.type) {
        case 'success': return '#4caf50';
        case 'error': return '#f44336';
        case 'warning': return '#ff9800';
        case 'info': return '#2196f3';
        default: return '#ff4081';
      }
    }};
  }
  
  .notification-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 8px;
  }
  
  .notification-title {
    font-family: 'Roboto', sans-serif;
    font-size: 1em;
    font-weight: 600;
    color: #ff4081;
    margin: 0;
  }
  
  .notification-close {
    background: none;
    border: none;
    color: #b0b0c0;
    cursor: pointer;
    font-size: 1.2em;
    padding: 0;
    transition: color 0.3s ease;
    
    &:hover {
      color: #ff4081;
    }
  }
  
  .notification-message {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.9em;
    color: #e0e0e0;
    line-height: 1.4;
    margin: 0;
  }
  
  .notification-icon {
    display: inline-block;
    margin-right: 8px;
    font-size: 1.1em;
    color: ${props => {
      switch (props.type) {
        case 'success': return '#4caf50';
        case 'error': return '#f44336';
        case 'warning': return '#ff9800';
        case 'info': return '#2196f3';
        default: return '#ff4081';
      }
    }};
  }
`;

const NotificationSystem = () => {
  const { state, actions } = useApp();
  const { notifications } = state;

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return 'fas fa-check-circle';
      case 'error':
        return 'fas fa-exclamation-circle';
      case 'warning':
        return 'fas fa-exclamation-triangle';
      case 'info':
        return 'fas fa-info-circle';
      default:
        return 'fas fa-bell';
    }
  };

  return (
    <NotificationContainer>
      <AnimatePresence>
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            type={notification.type}
            initial={{ opacity: 0, x: 300, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <div className="notification-header">
              <h4 className="notification-title">
                <i className={`${getIcon(notification.type)} notification-icon`}></i>
                {notification.title || 'Notification'}
              </h4>
              <button
                className="notification-close"
                onClick={() => actions.removeNotification(notification.id)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <p className="notification-message">{notification.message}</p>
          </NotificationItem>
        ))}
      </AnimatePresence>
    </NotificationContainer>
  );
};

export default NotificationSystem;