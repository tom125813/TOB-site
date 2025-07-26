import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const NotFoundContainer = styled(motion.div)`
  min-height: 100vh;
  padding: 180px 20px 60px;
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMjHxIGmVAAAAMElEQVQYV2NgoBJwcnJyanJycvL///8/AQwMTEwsLCwsLCwsLCwsLCwsLCwsLCwsDI4GAV8HAFrpV3gAAAAASUVORK5CYII=') repeat;
  background-size: 16px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba(255, 64, 129, 0.1) 0%, transparent 70%);
    z-index: -1;
  }
`;

const NotFoundContent = styled(motion.div)`
  text-align: center;
  max-width: 600px;
  padding: 40px;
  background: rgba(40, 40, 60, 0.9);
  border-radius: 20px;
  border: 2px solid rgba(255, 64, 129, 0.4);
  backdrop-filter: blur(10px);
  box-shadow: 0 0 30px rgba(255, 64, 129, 0.3);
`;

const ErrorCode = styled(motion.h1)`
  font-family: 'Press Start 2P', cursive;
  font-size: clamp(4em, 15vw, 8em);
  color: #ff4081;
  text-shadow: 0 0 20px rgba(255, 64, 129, 0.7);
  margin-bottom: 20px;
  line-height: 1;
  animation: pulse 2s ease-in-out infinite;
`;

const ErrorTitle = styled(motion.h2)`
  font-family: 'Press Start 2P', cursive;
  font-size: clamp(1.2em, 4vw, 1.8em);
  color: #ff4081;
  text-transform: uppercase;
  margin-bottom: 20px;
  text-shadow: 0 0 10px rgba(255, 64, 129, 0.5);
`;

const ErrorMessage = styled(motion.p)`
  font-family: 'Montserrat', sans-serif;
  font-size: clamp(1em, 2.5vw, 1.2em);
  color: #b0b0c0;
  margin-bottom: 30px;
  line-height: 1.6;
`;

const ErrorIcon = styled(motion.div)`
  font-size: clamp(3em, 8vw, 5em);
  color: #ff4081;
  margin-bottom: 20px;
  text-shadow: 0 0 15px rgba(255, 64, 129, 0.5);
`;

const ActionButtons = styled(motion.div)`
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 30px;
`;

const ActionButton = styled(motion(Link))`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 15px 30px;
  background: rgba(255, 64, 129, 0.3);
  color: #ff4081;
  border: 2px solid rgba(255, 64, 129, 0.5);
  border-radius: 25px;
  font-family: 'Roboto', sans-serif;
  font-size: clamp(1em, 2vw, 1.1em);
  font-weight: 600;
  text-decoration: none;
  text-transform: uppercase;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 64, 129, 0.5);
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(255, 64, 129, 0.4);
  }
  
  i {
    font-size: 1.2em;
  }
`;

const SecondaryButton = styled(ActionButton)`
  background: rgba(50, 50, 70, 0.9);
  color: #e0e0e0;
  border-color: rgba(255, 255, 255, 0.3);
  
  &:hover {
    background: rgba(60, 60, 80, 0.9);
    color: #ff4081;
    border-color: rgba(255, 64, 129, 0.5);
  }
`;

const FloatingElements = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
  
  .floating-block {
    position: absolute;
    width: 20px;
    height: 20px;
    background: rgba(255, 64, 129, 0.2);
    border: 1px solid rgba(255, 64, 129, 0.4);
    animation: float 6s ease-in-out infinite;
    
    &:nth-child(1) {
      top: 20%;
      left: 10%;
      animation-delay: 0s;
    }
    
    &:nth-child(2) {
      top: 60%;
      left: 80%;
      animation-delay: 2s;
    }
    
    &:nth-child(3) {
      top: 80%;
      left: 20%;
      animation-delay: 4s;
    }
    
    &:nth-child(4) {
      top: 30%;
      right: 15%;
      animation-delay: 1s;
    }
    
    &:nth-child(5) {
      top: 70%;
      right: 60%;
      animation-delay: 3s;
    }
  }
  
  @keyframes float {
    0%, 100% {
      transform: translateY(0px) rotate(0deg);
      opacity: 0.3;
    }
    50% {
      transform: translateY(-20px) rotate(180deg);
      opacity: 0.8;
    }
  }
`;

const NotFound = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <NotFoundContainer
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <FloatingElements>
        <div className="floating-block"></div>
        <div className="floating-block"></div>
        <div className="floating-block"></div>
        <div className="floating-block"></div>
        <div className="floating-block"></div>
      </FloatingElements>
      
      <NotFoundContent
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
      >
        <ErrorIcon variants={itemVariants}>
          <i className="fas fa-exclamation-triangle"></i>
        </ErrorIcon>
        
        <ErrorCode variants={itemVariants}>
          404
        </ErrorCode>
        
        <ErrorTitle variants={itemVariants}>
          Floor Not Found
        </ErrorTitle>
        
        <ErrorMessage variants={itemVariants}>
          Looks like you've wandered into an unexplored floor of the tower! 
          This page doesn't exist, but don't worry - there are plenty of other 
          floors to discover in Tower of Bedrock.
        </ErrorMessage>
        
        <ActionButtons variants={itemVariants}>
          <ActionButton
            to="/"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <i className="fas fa-home"></i>
            Return Home
          </ActionButton>
          
          <SecondaryButton
            to="/forums"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <i className="fas fa-comments"></i>
            Visit Forums
          </SecondaryButton>
        </ActionButtons>
      </NotFoundContent>
    </NotFoundContainer>
  );
};

export default NotFound;