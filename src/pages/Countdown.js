import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const CountdownContainer = styled(motion.div)`
  min-height: 100vh;
  padding: 220px 20px 60px;
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMjHxIGmVAAAAMElEQVQYV2NgoBJwcnJyanJycvL///8/AQwMTEwsLCwsLCwsLCwsLCwsLCwsLCwsDI4GAV8HAFrpV3gAAAAASUVORK5CYII=') repeat;
  background-size: 16px 16px;
  position: relative;
  
  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba(255, 64, 129, 0.15) 0%, transparent 70%);
    animation: pulse 10s ease infinite;
    z-index: -1;
    pointer-events: none;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 clamp(20px, 5vw, 50px);
`;

const HeroSection = styled(motion.div)`
  background: radial-gradient(circle, rgba(255, 64, 129, 0.2) 0%, transparent 100%);
  padding: 60px 40px;
  border-radius: 15px;
  border: 3px solid #ff4081;
  margin-bottom: 60px;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 0 20px rgba(255, 64, 129, 0.4);
  text-align: center;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 64, 129, 0.3) 0%, transparent 70%);
    z-index: -1;
  }
`;

const HeroTitle = styled(motion.h2)`
  font-family: 'Press Start 2P', cursive;
  font-size: clamp(2.2em, 5.5vw, 3.2em);
  color: #ff4081;
  text-transform: uppercase;
  margin-bottom: 25px;
  text-shadow: 0 0 20px rgba(255, 64, 129, 0.7);
  animation: pulse 2s infinite;
`;

const HeroDescription = styled(motion.p)`
  font-size: clamp(1.3em, 3vw, 1.9em);
  color: #b0b0c0;
  max-width: 800px;
  margin: 0 auto 25px;
  font-weight: 600;
`;

const CountdownDisplay = styled(motion.div)`
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
  margin: 20px 0;
`;

const CountdownItem = styled(motion.div)`
  background: rgba(50, 50, 70, 0.9);
  padding: 15px;
  border-radius: 10px;
  min-width: 80px;
  text-align: center;
  border: 2px solid rgba(255, 64, 129, 0.4);
  box-shadow: 0 0 10px rgba(255, 64, 129, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: scale(1.1) rotate(2deg);
    box-shadow: 0 0 20px rgba(255, 64, 129, 0.5);
  }
  
  span {
    display: block;
    font-family: 'Orbitron', sans-serif;
    font-size: clamp(1.5em, 3vw, 2.5em);
    color: #ff4081;
    font-weight: 700;
    text-shadow: 0 0 5px rgba(255, 64, 129, 0.5);
    
    &.animate {
      animation: countdownFlip 0.3s ease-out;
    }
  }
  
  label {
    font-family: 'Roboto', sans-serif;
    font-size: clamp(0.9em, 1.8vw, 1.1em);
    color: #e0e0e0;
    font-weight: 600;
    text-transform: uppercase;
  }
`;

const FeaturesGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  margin-bottom: 60px;
`;

const FeatureItem = styled(motion.div)`
  background: rgba(40, 40, 60, 0.9);
  padding: 25px;
  border-radius: 12px;
  border: 2px solid rgba(255, 64, 129, 0.4);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 0 15px rgba(255, 64, 129, 0.1);
  
  &:hover {
    transform: scale(1.05) rotate(2deg);
    box-shadow: 0 0 25px rgba(255, 64, 129, 0.6);
  }
  
  i {
    font-size: clamp(2.5em, 5vw, 3.5em);
    color: #ff4081;
    margin-bottom: 20px;
    text-shadow: 0 0 10px rgba(255, 64, 129, 0.3);
    transition: transform 0.3s ease;
  }
  
  &:hover i {
    transform: translateY(-5px) scale(1.1);
  }
  
  h3 {
    font-family: 'Roboto', sans-serif;
    font-size: clamp(1.3em, 3vw, 1.6em);
    color: #ff4081;
    margin-bottom: 15px;
    text-transform: uppercase;
    font-weight: 600;
  }
  
  p {
    font-size: clamp(1em, 2vw, 1.2em);
    color: #e0e0e0;
    font-weight: 500;
  }
`;

const ReleaseSection = styled(motion.div)`
  text-align: center;
  padding: 60px 20px;
  background: linear-gradient(45deg, rgba(30, 30, 50, 0.95), rgba(50, 50, 70, 0.95));
  border-radius: 15px;
  margin-bottom: 20px;
  border: 1px solid #ff4081;
  box-shadow: 0 0 30px rgba(255, 64, 129, 0.3);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -100%;
    left: -50%;
    width: 200%;
    height: 300%;
    background: radial-gradient(circle, rgba(255, 64, 129, 0.3) 0%, transparent 70%);
    z-index: -1;
  }
  
  h2 {
    font-family: 'Press Start 2P', cursive;
    font-size: clamp(1.8em, 4.5vw, 2.5em);
    color: #ff4081;
    margin-bottom: 10px;
    text-shadow: 0 0 15px rgba(255, 64, 129, 0.7);
    text-transform: uppercase;
  }
  
  .date {
    font-family: 'Press Start 2P', cursive;
    font-size: clamp(1.8em, 4vw, 2.5em);
    color: #ff4081;
    margin-bottom: 20px;
    text-shadow: 0 0 15px rgba(255, 64, 129, 0.7);
  }
  
  p {
    font-size: clamp(1em, 2.5vw, 1.2em);
    color: #b0b0c0;
    margin-bottom: 30px;
    font-weight: 600;
  }
`;

const DiscordButton = styled(motion.a)`
  padding: 15px 40px;
  background: rgba(255, 64, 129, 0.5);
  color: #fff;
  border: 2px solid #ff4081;
  border-radius: 25px;
  font-family: 'Roboto', sans-serif;
  font-size: clamp(1em, 2vw, 1.2em);
  font-weight: 700;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 0 15px rgba(255, 64, 129, 0.5);
  transition: all 0.3s ease;
  
  &:hover {
    background: #ff4081;
    transform: scale(1.1);
    box-shadow: 0 0 25px rgba(255, 64, 129, 0.9);
  }
  
  i.fa-discord {
    font-size: 1.4em;
  }
  
  i.fa-arrow-right {
    font-size: 1em;
    animation: arrowBounce 1.5s infinite;
  }
`;

const Countdown = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set target date to April 4th, 2025
    const targetDate = new Date('2025-04-04T00:00:00').getTime();
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: 'fas fa-gavel',
      title: 'Mine Ores',
      description: 'Dig into the depths—gather resources like coal and gems to kickstart your adventure.'
    },
    {
      icon: 'fas fa-spider',
      title: 'Fight Mobs',
      description: 'Take on vicious creatures lurking in every floor—slay them for rare drops.'
    },
    {
      icon: 'fas fa-users',
      title: 'Team Up',
      description: 'Form guilds with friends—share loot and plan your conquest together.'
    },
    {
      icon: 'fas fa-dragon',
      title: 'Face Bosses',
      description: 'Challenge towering overlords—epic battles yield the best rewards.'
    },
    {
      icon: 'fas fa-arrow-up',
      title: 'Grind Levels',
      description: 'Climb to level 100 - each rank unlocks greater power.'
    },
    {
      icon: 'fas fa-magic',
      title: 'Enchant Gear',
      description: 'Boost your weapons with energy—add fiery strikes or other deadly effects.'
    }
  ];

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <CountdownContainer
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <Container>
        <HeroSection variants={itemVariants}>
          <HeroTitle>JOIN THE JOURNEY</HeroTitle>
          <HeroDescription>
            Prepare for an MMORPG adventure with towering floors, fierce mobs, and epic loot.
          </HeroDescription>
          <CountdownDisplay>
            <CountdownItem variants={itemVariants}>
              <span>{String(timeLeft.days).padStart(2, '0')}</span>
              <label>Days</label>
            </CountdownItem>
            <CountdownItem variants={itemVariants}>
              <span>{String(timeLeft.hours).padStart(2, '0')}</span>
              <label>Hours</label>
            </CountdownItem>
            <CountdownItem variants={itemVariants}>
              <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
              <label>Minutes</label>
            </CountdownItem>
            <CountdownItem variants={itemVariants}>
              <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
              <label>Seconds</label>
            </CountdownItem>
          </CountdownDisplay>
        </HeroSection>

        <FeaturesGrid>
          {features.map((feature, index) => (
            <FeatureItem
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                rotate: 2,
                transition: { duration: 0.3 }
              }}
            >
              <i className={feature.icon}></i>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </FeatureItem>
          ))}
        </FeaturesGrid>

        <ReleaseSection variants={itemVariants}>
          <h2>Release Date</h2>
          <div className="date">April 4th, 2025</div>
          <p>Join our Discord community to stay updated and be the first to know when the server launches!</p>
          <DiscordButton
            href="#"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <i className="fab fa-discord"></i>
            Join Discord
            <i className="fas fa-arrow-right"></i>
          </DiscordButton>
        </ReleaseSection>
      </Container>
    </CountdownContainer>
  );
};

export default Countdown;