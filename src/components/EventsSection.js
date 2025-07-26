import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const EventsContainer = styled(motion.div)`
  background: rgba(40, 40, 60, 0.9);
  padding: 30px;
  border-radius: 15px;
  border: 2px solid rgba(255, 64, 129, 0.4);
  text-align: center;
  margin-bottom: 60px;
  box-shadow: inset 0 0 20px rgba(255, 64, 129, 0.1);
  backdrop-filter: blur(10px);
`;

const EventsTitle = styled(motion.h2)`
  font-family: 'Press Start 2P', cursive;
  font-size: clamp(1.4em, 4vw, 1.8em);
  color: #ff4081;
  margin-bottom: 30px;
  text-shadow: 0 0 5px rgba(255, 64, 129, 0.3);
  text-transform: uppercase;
`;

const EventsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const EventItem = styled(motion.div)`
  background: linear-gradient(135deg, rgba(50, 50, 70, 0.9), rgba(60, 60, 80, 0.9));
  padding: 25px;
  border-radius: 15px;
  border: 2px solid rgba(255, 64, 129, 0.3);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, rgba(255, 64, 129, 0.1), transparent);
    z-index: -1;
  }
  
  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 15px 40px rgba(255, 64, 129, 0.4);
    border-color: rgba(255, 64, 129, 0.6);
  }
  
  i {
    font-size: clamp(2.8em, 5vw, 3.5em);
    color: #ff4081;
    margin-bottom: 20px;
    text-shadow: 0 0 15px rgba(255, 64, 129, 0.5);
    transition: all 0.3s ease;
    display: block;
  }
  
  &:hover i {
    transform: scale(1.15) rotate(10deg);
    text-shadow: 0 0 25px rgba(255, 64, 129, 0.8);
  }
  
  h3 {
    font-family: 'Roboto', sans-serif;
    font-size: clamp(1.3em, 3vw, 1.5em);
    color: #ff4081;
    margin-bottom: 20px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;

const Countdown = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  
  .label {
    font-size: clamp(0.8em, 1.8vw, 0.9em);
    color: #b0b0c0;
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  
  .time-display {
    display: flex;
    gap: 8px;
    align-items: center;
  }
  
  .time-unit {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgba(255, 64, 129, 0.2);
    border: 1px solid rgba(255, 64, 129, 0.4);
    border-radius: 8px;
    padding: 8px 6px;
    min-width: 45px;
    transition: all 0.3s ease;
    
    &:hover {
      background: rgba(255, 64, 129, 0.3);
      transform: scale(1.05);
    }
    
    .number {
      font-family: 'Orbitron', sans-serif;
      font-size: clamp(1.1em, 2.5vw, 1.3em);
      font-weight: 700;
      color: #ff4081;
      text-shadow: 0 0 5px rgba(255, 64, 129, 0.5);
      line-height: 1;
      
      &.update {
        animation: countdownFlip 0.5s ease;
      }
    }
    
    .unit-label {
      font-size: clamp(0.6em, 1.5vw, 0.7em);
      color: #e0e0e0;
      font-family: 'Roboto', sans-serif;
      font-weight: 500;
      text-transform: uppercase;
      margin-top: 2px;
      letter-spacing: 0.5px;
    }
  }
  
  .separator {
    font-family: 'Orbitron', sans-serif;
    font-size: clamp(1.2em, 2.5vw, 1.4em);
    color: #ff4081;
    font-weight: 700;
    margin: 0 2px;
    animation: pulse 2s infinite;
  }
`;

const EventsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  const [countdowns, setCountdowns] = useState({
    doubleExp: { hours: 37, minutes: 0, seconds: 0 },
    outpost: { hours: 6, minutes: 0, seconds: 0 },
    gemSale: { hours: 48, minutes: 0, seconds: 0 }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdowns(prev => {
        const newCountdowns = {};
        
        Object.keys(prev).forEach(key => {
          const countdown = { ...prev[key] };
          if (countdown.seconds > 0) {
            countdown.seconds--;
          } else if (countdown.minutes > 0) {
            countdown.minutes--;
            countdown.seconds = 59;
          } else if (countdown.hours > 0) {
            countdown.hours--;
            countdown.minutes = 59;
            countdown.seconds = 59;
          }
          newCountdowns[key] = countdown;
        });
        
        return newCountdowns;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
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

  const events = [
    {
      icon: 'fas fa-star',
      title: 'Double EXP Weekend',
      countdown: countdowns.doubleExp,
      label: 'Ends in:'
    },
    {
      icon: 'fas fa-flag-checkered',
      title: 'Outpost Siege',
      countdown: countdowns.outpost,
      label: 'Starts in:'
    },
    {
      icon: 'fas fa-gem',
      title: 'Gem Sale',
      countdown: countdowns.gemSale,
      label: 'Ends in:'
    }
  ];

  return (
    <EventsContainer
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <EventsTitle variants={itemVariants}>
        Featured Events
      </EventsTitle>
      <EventsGrid>
        {events.map((event, index) => (
          <EventItem
            key={index}
            variants={itemVariants}
            whileHover={{ 
              scale: 1.05,
              rotateX: 5,
              rotateY: 5,
              transition: { duration: 0.3 }
            }}
          >
            <i className={event.icon}></i>
            <h3>{event.title}</h3>
            <Countdown>
              <span className="label">{event.label}</span>
              <div className="time-display">
                <div className="time-unit">
                  <span className="number">{String(event.countdown.hours).padStart(2, '0')}</span>
                  <span className="unit-label">Hours</span>
                </div>
                <span className="separator">:</span>
                <div className="time-unit">
                  <span className="number">{String(event.countdown.minutes).padStart(2, '0')}</span>
                  <span className="unit-label">Min</span>
                </div>
                <span className="separator">:</span>
                <div className="time-unit">
                  <span className="number">{String(event.countdown.seconds).padStart(2, '0')}</span>
                  <span className="unit-label">Sec</span>
                </div>
              </div>
            </Countdown>
          </EventItem>
        ))}
      </EventsGrid>
    </EventsContainer>
  );
};

export default EventsSection;