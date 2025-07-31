import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';

const NavContainer = styled(motion.nav)`
  position: fixed;
  top: 40px;
  width: 100%;
  padding: 0;
  background: rgba(30, 35, 45, 0.95);
  border-bottom: 1px solid rgba(255, 64, 129, 0.2);
  z-index: 1000;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(20px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  transform: translateY(0);
  
  &.scrolled {
    top: 0;
    background: rgba(30, 35, 45, 0.98);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
    transform: translateY(0);
  }
`;

const NavContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  height: 85px;
  max-width: 1400px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 0 20px;
    height: 70px;
  }
`;

const LogoSection = styled(Link)`
  display: flex;
  align-items: center;
  gap: 15px;
  text-decoration: none;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.02);
  }
`;

const LogoIcon = styled.div`
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #ff4081, #e03570);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8em;
  color: white;
  font-weight: 700;
  box-shadow: 0 0 25px rgba(255, 64, 129, 0.4);
  position: relative;
  transition: all 0.3s ease;
  
  &::after {
    content: '';
    position: absolute;
    inset: -2px;
    background: linear-gradient(45deg, #ff4081, #e03570, #ff4081);
    border-radius: 14px;
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 30px rgba(255, 64, 129, 0.6);
  }
  
  &:hover::after {
    opacity: 1;
    animation: rotate 2s linear infinite;
  }
  
  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;



const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;
  height: 50px;
  
  @media (max-width: 1350px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 25px;
  height: 50px;
  color: #b0b0c0;
  text-decoration: none;
  font-family: 'Roboto', sans-serif;
  font-size: 1em;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  border-radius: 12px;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
  border: 2px solid transparent;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 64, 129, 0.3), transparent);
    transition: left 0.4s ease;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: radial-gradient(circle, rgba(255, 64, 129, 0.4), transparent);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.3s ease;
  }
  
  &:hover::before {
    left: 100%;
  }
  
  &:hover::after {
    width: 100px;
    height: 100px;
  }
  
  &:hover,
  &.active {
    color: #ff4081;
    background: rgba(255, 64, 129, 0.1);
    transform: scale(1.05);
    box-shadow: 0 8px 25px rgba(255, 64, 129, 0.3);
    border-color: rgba(255, 64, 129, 0.4);
    text-shadow: 0 0 8px rgba(255, 64, 129, 0.6);
  }
  
  &.active {
    background: rgba(255, 64, 129, 0.15);
    box-shadow: 0 6px 20px rgba(255, 64, 129, 0.4);
    border-color: rgba(255, 64, 129, 0.6);
  }
  
  i {
    font-size: 1.1em;
    opacity: 0.9;
    transition: all 0.2s ease;
  }
  
  &:hover i {
    transform: scale(1.2) rotate(5deg);
    text-shadow: 0 0 10px rgba(255, 64, 129, 0.8);
  }
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  height: 50px;
`;

const AuthButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  
  @media (max-width: 480px) {
    display: none;
  }
`;

const AuthButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  height: 50px;
  text-decoration: none;
  font-family: 'Roboto', sans-serif;
  font-size: 0.9em;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  border-radius: 10px;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.4s ease;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: radial-gradient(circle, rgba(255, 64, 129, 0.3), transparent);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.3s ease;
  }
  
  &:hover::before {
    left: 100%;
  }
  
  &:hover::after {
    width: 80px;
    height: 80px;
  }
  
  &.login {
    color: #e0e0e0;
    background: rgba(255, 64, 129, 0.1);
    border: 2px solid rgba(255, 64, 129, 0.3);
    
    &:hover {
      color: #ff4081;
      border-color: rgba(255, 64, 129, 0.8);
      background: rgba(255, 64, 129, 0.2);
      transform: scale(1.05);
      box-shadow: 0 8px 25px rgba(255, 64, 129, 0.4);
      text-shadow: 0 0 8px rgba(255, 64, 129, 0.6);
    }
  }
  
  &.register {
    color: white;
    background: linear-gradient(135deg, #ff4081, #e03570);
    border: 2px solid #ff4081;
    box-shadow: 0 4px 15px rgba(255, 64, 129, 0.3);
    
    &:hover {
      transform: scale(1.05);
      box-shadow: 0 10px 35px rgba(255, 64, 129, 0.6);
      background: linear-gradient(135deg, #ff5a92, #e8467a);
      border-color: #ff5a92;
      text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
    }
  }
  
  i {
    font-size: 1.1em;
    transition: all 0.2s ease;
  }
  
  &:hover i {
    transform: scale(1.3) rotate(10deg);
    text-shadow: 0 0 10px currentColor;
  }
`;

const UserProfile = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 15px;
  background: rgba(255, 64, 129, 0.1);
  border: 1px solid rgba(255, 64, 129, 0.3);
  border-radius: 25px;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 64, 129, 0.2);
    border-color: rgba(255, 64, 129, 0.5);
    transform: scale(1.02);
  }
  
  .avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: linear-gradient(135deg, #ff4081, #e03570);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 600;
    font-size: 0.9em;
  }
  
  .user-info {
    .username {
      font-family: 'Roboto', sans-serif;
      font-size: 0.9em;
      color: #ff4081;
      font-weight: 600;
      margin: 0;
    }
    
    .level {
      font-size: 0.7em;
      color: #b0b0c0;
      margin: 0;
    }
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: #ff4081;
  font-size: 1.5em;
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 64, 129, 0.1);
  }
  
  @media (max-width: 1350px) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: rgba(30, 35, 45, 0.98);
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(255, 64, 129, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  
  @media (min-width: 1351px) {
    display: none;
  }
`;

const MobileNavLinks = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const MobileNavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 15px 20px;
  color: #b0b0c0;
  text-decoration: none;
  font-family: 'Roboto', sans-serif;
  font-size: 1em;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-radius: 8px;
  transition: all 0.3s ease;
  
  &:hover,
  &.active {
    color: #ff4081;
    background: rgba(255, 64, 129, 0.08);
  }
  
  i {
    font-size: 1.2em;
    width: 20px;
    text-align: center;
  }
`;

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { state } = useApp();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: '/', label: 'Home', icon: 'fas fa-home' },
    { path: '/forums', label: 'Forums', icon: 'fas fa-comments' },
    { path: '/wiki', label: 'Wiki', icon: 'fas fa-book' },
    { path: '/leaderboards', label: 'Leaderboards', icon: 'fas fa-trophy' },
    { path: '/store', label: 'Store', icon: 'fas fa-shopping-cart' }
  ];

  return (
    <NavContainer 
      className={isScrolled ? 'scrolled' : ''}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <NavContent>
        <LogoSection to="/">
          <LogoIcon>T</LogoIcon>
        </LogoSection>

        <NavLinks>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={isActive(item.path) ? 'active' : ''}
            >
              <i className={item.icon}></i>
              {item.label}
            </NavLink>
          ))}
        </NavLinks>

        <UserSection>
          {state.isAuthenticated && state.user ? (
            <UserProfile to={`/profile/${state.user.username}`}>
              <div className="avatar">
                {state.user.username.charAt(0).toUpperCase()}
              </div>
              <div className="user-info">
                <div className="username">{state.user.username}</div>
                <div className="level">Lv.{state.user.level || 1}</div>
              </div>
            </UserProfile>
          ) : (
            <AuthButtons>
              <AuthButton to="/login" className="login">
                <i className="fas fa-sign-in-alt"></i>
                Login
              </AuthButton>
              <AuthButton to="/register" className="register">
                <i className="fas fa-user-plus"></i>
                Sign Up
              </AuthButton>
            </AuthButtons>
          )}

          <MobileMenuButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <i className={mobileMenuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
          </MobileMenuButton>
        </UserSection>
      </NavContent>

      {mobileMenuOpen && (
        <MobileMenu
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <MobileNavLinks>
            {navItems.map((item) => (
              <MobileNavLink
                key={item.path}
                to={item.path}
                className={isActive(item.path) ? 'active' : ''}
                onClick={() => setMobileMenuOpen(false)}
              >
                <i className={item.icon}></i>
                {item.label}
              </MobileNavLink>
            ))}
            
            {!state.isAuthenticated && (
              <>
                <MobileNavLink
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <i className="fas fa-sign-in-alt"></i>
                  Login
                </MobileNavLink>
                <MobileNavLink
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <i className="fas fa-user-plus"></i>
                  Sign Up
                </MobileNavLink>
              </>
            )}
          </MobileNavLinks>
        </MobileMenu>
      )}
    </NavContainer>
  );
};

export default Navbar;