import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const HeroContainer = styled(motion.div)`
  background: radial-gradient(circle, rgba(255, 64, 129, 0.2) 0%, transparent 100%);
  padding: 40px;
  border-radius: 15px;
  border: 2px solid rgba(255, 64, 129, 0.4);
  text-align: center;
  margin-bottom: 60px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 30px rgba(255, 64, 129, 0.3);
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 64, 129, 0.2) 0%, transparent 70%);
    z-index: -1;
    animation: pulse 4s ease-in-out infinite;
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
  color: #b0b0c0;
  margin-bottom: 30px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  font-weight: 500;
`;

const ServerIP = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 64, 129, 0.3);
  padding: clamp(8px, 1.5vw, 12px) clamp(15px, 2.5vw, 25px);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  font-size: clamp(0.9em, 2vw, 1.4em);
  border: 1px solid rgba(255, 64, 129, 0.5);
  
  &:hover {
    background: rgba(255, 64, 129, 0.5);
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(255, 64, 129, 0.6);
  }
  
  span {
    font-family: 'Roboto', sans-serif;
    color: #ff4081;
    font-weight: 600;
  }
  
  i {
    color: #ff4081;
    font-size: clamp(1em, 2vw, 1.2em);
    transition: opacity 0.3s, transform 0.3s;
  }
  
  &.copied i.fa-copy {
    opacity: 0;
    transform: scale(0);
  }
  
  .tick {
    position: absolute;
    color: #ff4081;
    font-size: clamp(1em, 2vw, 1.2em);
    opacity: 0;
    top: 50%;
    right: clamp(15px, 2.5vw, 25px);
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    width: clamp(1em, 2vw, 1.2em);
    height: clamp(1em, 2vw, 1.2em);
    
    &.show {
      opacity: 1;
      animation: checkmark 0.5s ease-out forwards;
    }
  }
  
  @keyframes checkmark {
    0% {
      opacity: 0;
      transform: translateY(-50%) scale(0.5);
    }
    50% {
      opacity: 1;
      transform: translateY(-50%) scale(1.2);
    }
    100% {
      opacity: 1;
      transform: translateY(-50%) scale(1);
    }
  }
`;

const HeroSection = () => {
  const [copied, setCopied] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3
  });

  const copyIP = () => {
    navigator.clipboard.writeText('play.towerofbedrock.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  return (
    <HeroContainer
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <HeroTitle variants={itemVariants}>
        JOIN THE JOURNEY
      </HeroTitle>
      <HeroDescription variants={itemVariants}>
        Unleash your adventure in the ultimate Minecraft MMORPG—conquer towering floors, forge epic gear, and raid with your crew!
      </HeroDescription>
      <ServerIP
        variants={itemVariants}
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