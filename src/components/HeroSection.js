import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const HeroContainer = styled(motion.div)`
  background: linear-gradient(135deg, rgba(30, 35, 45, 0.9) 0%, rgba(40, 45, 60, 0.9) 100%);
  padding: 50px;
  border-radius: 20px;
  border: 2px solid rgba(255, 64, 129, 0.4);
  text-align: center;
  margin-bottom: 60px;
  margin-top: -20px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 15px 50px rgba(255, 64, 129, 0.2);
  backdrop-filter: blur(20px);
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    padding: 30px 20px;
    margin-bottom: 40px;
    margin-top: -10px;
    border-radius: 15px;
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 60px rgba(255, 64, 129, 0.3);
    border-color: rgba(255, 64, 129, 0.6);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 64, 129, 0.15) 0%, transparent 70%);
    z-index: -1;
    animation: pulse 4s ease-in-out infinite;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 64, 129, 0.1), transparent);
    animation: shimmer 3s ease-in-out infinite;
  }
  
  @keyframes shimmer {
    0% { left: -100%; }
    50% { left: 100%; }
    100% { left: 100%; }
  }
`;

const HeroTitle = styled(motion.h2)`
  font-family: 'Press Start 2P', cursive;
  font-size: clamp(1.5em, 4.5vw, 2.5em);
  margin-bottom: 20px;
  text-shadow: 0 0 10px rgba(255, 64, 129, 0.5);
  color: #ff4081;
  text-transform: uppercase;
`;

const HeroDescription = styled(motion.p)`
  font-size: clamp(1em, 2.8vw, 1.6em);
  color: #e0e0e0;
  margin-bottom: 30px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  font-weight: 500;
  line-height: 1.6;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const ServerIP = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: linear-gradient(135deg, rgba(255, 64, 129, 0.2), rgba(255, 64, 129, 0.3));
  padding: clamp(12px, 1.5vw, 16px) clamp(20px, 2.5vw, 30px);
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  font-size: clamp(1em, 2vw, 1.4em);
  border: 2px solid rgba(255, 64, 129, 0.5);
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s ease;
  }
  
  &:hover::before {
    left: 100%;
  }
  
  &:hover {
    background: linear-gradient(135deg, rgba(255, 64, 129, 0.4), rgba(255, 64, 129, 0.5));
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 10px 30px rgba(255, 64, 129, 0.4);
    border-color: rgba(255, 64, 129, 0.8);
  }
  
  span {
    font-family: 'Roboto', sans-serif;
    color: white;
    font-weight: 700;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    letter-spacing: 0.5px;
  }
  
  i {
    color: white;
    font-size: clamp(1.1em, 2vw, 1.3em);
    transition: all 0.2s ease;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    margin-left: 8px;
  }
  
  &:hover i {
    transform: scale(1.2) rotate(10deg);
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
  }
  
  &.copied i.fa-copy {
    opacity: 0;
    transform: scale(0);
  }
  
  .tick {
    position: absolute;
    color: white;
    font-size: clamp(1.1em, 2vw, 1.3em);
    opacity: 0;
    top: 50%;
    right: clamp(20px, 2.5vw, 30px);
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    width: clamp(1.1em, 2vw, 1.3em);
    height: clamp(1.1em, 2vw, 1.3em);
    
    &.show {
      opacity: 1;
      animation: checkmark 0.5s ease-out forwards;
    }
  }
  
  @keyframes checkmark {
    0% {
      opacity: 0;
      transform: translateY(-50%) scale(0.5) rotate(-180deg);
    }
    50% {
      opacity: 1;
      transform: translateY(-50%) scale(1.3) rotate(0deg);
    }
    100% {
      opacity: 1;
      transform: translateY(-50%) scale(1) rotate(0deg);
    }
  }
`;

const HeroSection = () => {
  const [copied, setCopied] = useState(false);

  const copyIP = () => {
    navigator.clipboard.writeText('play.towerofbedrock.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <HeroContainer>
      <HeroTitle>
        JOIN THE JOURNEY
      </HeroTitle>
      <HeroDescription>
        Unleash your adventure in the ultimate Minecraft MMORPG—conquer towering floors, forge epic gear, and raid with your crew!
      </HeroDescription>
      <ServerIP
        onClick={copyIP}
        className={copied ? 'copied' : ''}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span>play.towerofbedrock.com</span>
        <i className="fas fa-copy"></i>
        <i className={`fas fa-check tick ${copied ? 'show' : ''}`}></i>
      </ServerIP>
    </HeroContainer>
  );
};

export default HeroSection;