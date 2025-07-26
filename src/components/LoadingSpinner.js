import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const LoadingContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  min-height: ${props => props.fullScreen ? '100vh' : '200px'};
`;

const Spinner = styled.div`
  width: ${props => props.size || '40px'};
  height: ${props => props.size || '40px'};
  border: 3px solid rgba(255, 64, 129, 0.3);
  border-top: 3px solid #ff4081;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin-bottom: 20px;
`;

const LoadingText = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: clamp(0.9em, 2vw, 1.1em);
  color: #b0b0c0;
  text-align: center;
  animation: ${pulse} 2s ease-in-out infinite;
  margin: 0;
`;

const DotsContainer = styled.span`
  display: inline-block;
  width: 20px;
`;

const Dot = styled.span`
  animation: ${pulse} 1.4s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
`;

const LoadingDots = () => (
  <DotsContainer>
    <Dot delay={0}>.</Dot>
    <Dot delay={0.2}>.</Dot>
    <Dot delay={0.4}>.</Dot>
  </DotsContainer>
);

const LoadingSpinner = ({ 
  text = 'Loading', 
  size = '40px', 
  fullScreen = false,
  showDots = true 
}) => {
  return (
    <LoadingContainer
      fullScreen={fullScreen}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Spinner size={size} />
      <LoadingText>
        {text}
        {showDots && <LoadingDots />}
      </LoadingText>
    </LoadingContainer>
  );
};

export default LoadingSpinner;