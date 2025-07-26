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
  background: linear-gradient(135deg, rgba(15, 15, 25, 0.98), rgba(25, 25, 40, 0.98));
  border-bottom: 1px solid rgba(255, 64, 129, 0.3);
  z-index: 1000;
  transition: top 0.3s ease;
  backdrop-filter: blur(20px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  
  &.scrolled {
    top: 0;
  }
`;

const NavContent = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 0 40px;
  height: 70px;
  
  @media (max-width: 768px) {
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    height: 60px;
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
  width: 45px;
  height: 45px;
  background: linear-gradient(135deg, #ff4081, #e03570);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5em;
  color: white;
  font-weight: 700;
  box-shadow: 0 0 20px rgba(255, 64, 129, 0.4);
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    inset: -2px;
    background: linear-gradient(45deg, #ff4081, #e03570, #ff4081);
    border-radius: 10px;
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s ease;
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

const LogoText = styled.div`
  h1 {
    font-family: 'Press Start 2P', cursive;
    font-size: clamp(1em, 2.5vw, 1.3em);
    color: #ff4081;
    text-transform: uppercase;
    margin: 0;
    text-shadow: 0 0 10px rgba(255, 64, 129, 0.5);
    line-height: 1.2;
  }
  
  .subtitle {
    font-family: 'Roboto', sans-serif;
    font-size: 0.7em;
    color: #b0b0c0;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-top: 2px;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  
  @media (max-width: 968px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  color: #e0e0e0;
  text-decoration: none;
  font-family: 'Roboto', sans-serif;
  font-size: 0.95em;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-radius: 8px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 64, 129, 0.2), transparent);
    transition: left 0.5s ease;
  }
  
  &:hover::before {
    left: 100%;
  }
  
  &:hover,
  &.active {
    color: #ff4081;
    background: rgba(255, 64, 129, 0.1);
    transform: translateY(-1px);
    box-shadow: 0 4px 15px rgba(255, 64, 129, 0.2);
  }
  
  &.active {
    background: rgba(255, 64, 129, 0.15);
    box-shadow: 0 0 20px rgba(255, 64, 129, 0.3);
  }
  
  i {
    font-size: 1.1em;
    opacity: 0.8;
  }
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  justify-self: end;
`;

const AuthButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const AuthButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  text-decoration: none;
  font-family: 'Roboto', sans-serif;
  font-size: 0.9em;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-radius: 6px;
  transition: all 0.3s ease;
  
  &.login {
    color: #e0e0e0;
    border: 1px solid rgba(255, 64, 129, 0.3);
    
    &:hover {
      color: #ff4081;
      border-color: rgba(255, 64, 129, 0.6);
      background: rgba(255, 64, 129, 0.1);
    }
  }
  
  &.register {
    color: white;
    background: linear-gradient(135deg, #ff4081, #e03570);
    border: 1px solid #ff4081;
    box-shadow: 0 0 15px rgba(255, 64, 129, 0.3);
    
    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 20px rgba(255, 64, 129, 0.4);
    }
  }
  
  i {
    font-size: 1em;
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
  
  @media (max-width: 968px) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: linear-gradient(135deg, rgba(15, 15, 25, 0.98), rgba(25, 25, 40, 0.98));
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(255, 64, 129, 0.3);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  
  @media (min-width: 969px) {
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
  color: #e0e0e0;
  text-decoration: none;
  font-family: 'Roboto', sans-serif;
  font-size: 1em;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-radius: 8px;
  transition: all 0.3s ease;
  
  &:hover,
  &.active {
    color: #ff4081;
    background: rgba(255, 64, 129, 0.1);
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
    { path: '/stats', label: 'Stats', icon: 'fas fa-chart-bar' },
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
          <LogoText>
            <h1>Tower of<br />Bedrock</h1>
          </LogoText>
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
          </MobileNavLinks>
        </MobileMenu>
      )}
    </NavContainer>
  );
};

export default Navbar;