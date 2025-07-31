import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const BannerContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 40px;
  background: rgba(30, 30, 50, 0.95);
  z-index: 1001;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateY(0);
  
  &.scrolled {
    top: -40px;
    transform: translateY(0);
  }
`;

const BannerContent = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 40px;
  background: rgba(255, 64, 129, 0.2);
  z-index: 1002;
  overflow: hidden;
  display: flex;
  align-items: center;
  transition: opacity 0.3s ease, transform 0.3s ease;
  
  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  &.hidden {
    opacity: 0;
    transform: translateY(-100%);
  }
`;

const Ticker = styled.div`
  display: inline-block;
  white-space: nowrap;
  animation: bannerSlide 30s linear infinite;
  
  span {
    font-family: 'Orbitron', sans-serif;
    font-size: clamp(1em, 2vw, 1.2em);
    font-weight: 700;
    color: #ff4081;
    margin: 0 clamp(30px, 5vw, 50px);
    text-transform: uppercase;
    text-shadow: 0 0 5px rgba(255, 64, 129, 0.5);
  }
`;

const Banner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 100;
      setIsScrolled(scrolled);
      setIsVisible(!scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const bannerMessages = [
    'DOUBLE EXP WEEKEND',
    'THE OUTPOST UPDATE',
    '20% GEM SALE',
    'JOIN THE DISCORD',
    'TOWER OF BEDROCK'
  ];

  return (
    <BannerContainer className={isScrolled ? 'scrolled' : ''}>
      <BannerContent className={isVisible ? 'visible' : 'hidden'}>
        <Ticker>
          {[...Array(3)].map((_, i) => (
            <React.Fragment key={i}>
              {bannerMessages.map((message, index) => (
                <span key={`${i}-${index}`}>{message}</span>
              ))}
            </React.Fragment>
          ))}
        </Ticker>
      </BannerContent>
    </BannerContainer>
  );
};

export default Banner;