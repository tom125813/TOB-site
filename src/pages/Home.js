import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import HeroSection from '../components/HeroSection';
import EventsSection from '../components/EventsSection';
import ChangelogSection from '../components/ChangelogSection';

const HomeContainer = styled(motion.div)`
  min-height: 100vh;
  padding: 140px 20px 60px;
  background: linear-gradient(135deg, #0f0f19 0%, #1a1a2e 100%);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMjHxIGmVAAAAMElEQVQYV2NgoBJwcnJyanJycvL///8/AQwMTEwsLCwsLCwsLCwsLCwsLCwsLCwsDI4GAV8HAFrpV3gAAAAASUVORK5CYII=') repeat;
    background-size: 16px 16px;
    opacity: 0.03;
    z-index: -1;
  }
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 30px;
  
  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

const Home = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <HomeContainer
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: inView ? 1 : 0 }}
      transition={{ duration: 0.6 }}
    >
      <Container>
        <HeroSection />
        <EventsSection />
        <ChangelogSection />
      </Container>
    </HomeContainer>
  );
};

export default Home;