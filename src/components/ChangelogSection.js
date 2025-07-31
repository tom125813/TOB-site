import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ChangelogContainer = styled(motion.div)`
  background: linear-gradient(135deg, rgba(30, 35, 45, 0.9) 0%, rgba(40, 45, 60, 0.9) 100%);
  padding: 50px;
  border-radius: 20px;
  border: 2px solid rgba(255, 64, 129, 0.4);
  margin-bottom: 60px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 15px 50px rgba(255, 64, 129, 0.2);
  backdrop-filter: blur(20px);
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    padding: 30px 20px;
    margin-bottom: 40px;
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
    background: radial-gradient(circle, rgba(255, 64, 129, 0.1) 0%, transparent 70%);
    z-index: -1;
    animation: pulse 6s ease-in-out infinite;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 64, 129, 0.08), transparent);
    animation: shimmer 4s ease-in-out infinite;
  }
  
  @keyframes shimmer {
    0% { left: -100%; }
    50% { left: 100%; }
    100% { left: 100%; }
  }
`;

const ChangelogHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: 50px;
  
  .header-icon {
    font-size: 4em;
    color: #ff4081;
    margin-bottom: 20px;
    text-shadow: 0 0 30px rgba(255, 64, 129, 0.6);
    animation: pulse 3s ease-in-out infinite;
  }
  
  h2 {
    font-family: 'Press Start 2P', cursive;
    font-size: clamp(1.5em, 4.5vw, 2.5em);
    color: #ff4081;
    text-transform: uppercase;
    text-shadow: 0 0 20px rgba(255, 64, 129, 0.5);
    margin-bottom: 20px;
    background: linear-gradient(45deg, #ff4081, #e03570, #ff4081);
    background-size: 200% 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: gradientShift 3s ease infinite;
  }
  
  p {
    font-size: clamp(1em, 2.8vw, 1.6em);
    color: #e0e0e0;
    font-weight: 500;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }
  
  @keyframes gradientShift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
`;

const ChangelogGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const ChangelogCard = styled(motion.div)`
  background: linear-gradient(135deg, rgba(30, 35, 45, 0.9) 0%, rgba(40, 45, 60, 0.9) 100%);
  border: 2px solid rgba(255, 64, 129, 0.4);
  border-radius: 20px;
  padding: 30px;
  transition: all 0.4s ease;
  cursor: pointer;
  backdrop-filter: blur(20px);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-shadow: 0 15px 50px rgba(255, 64, 129, 0.2);
  
  @media (max-width: 768px) {
    padding: 25px 20px;
    border-radius: 15px;
    margin-bottom: 0;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 64, 129, 0.1) 0%, transparent 70%);
    z-index: -1;
    animation: pulse 6s ease-in-out infinite;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 64, 129, 0.08), transparent);
    animation: shimmer 4s ease-in-out infinite;
  }
  
  @keyframes shimmer {
    0% { left: -100%; }
    50% { left: 100%; }
    100% { left: 100%; }
  }
  
  &:hover {
    transform: translateY(-5px);
    border-color: rgba(255, 64, 129, 0.6);
    box-shadow: 0 20px 60px rgba(255, 64, 129, 0.3);
  }
  
  .patch-badge {
    display: inline-block;
    background: linear-gradient(135deg, #ff4081, #e03570);
    color: white;
    padding: 8px 16px;
    border-radius: 20px;
    font-family: 'Roboto', sans-serif;
    font-size: 0.8em;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 20px;
    box-shadow: 0 0 15px rgba(255, 64, 129, 0.4);
    align-self: flex-start;
  }
  
  .patch-title {
    font-family: 'Press Start 2P', cursive;
    font-size: 1.2em;
    color: #ff4081;
    margin-bottom: 15px;
    text-transform: uppercase;
    line-height: 1.3;
    text-shadow: 0 0 10px rgba(255, 64, 129, 0.5);
  }
  
  .patch-date {
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: 'Roboto', sans-serif;
    font-size: 0.9em;
    color: #e0e0e0;
    margin-bottom: 20px;
    
    i {
      color: #ff4081;
    }
  }
  
  .patch-highlights {
    margin-bottom: auto;
    flex-grow: 1;
    
    .highlight-item {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      margin-bottom: 12px;
      font-family: 'Roboto', sans-serif;
      font-size: 0.95em;
      color: #e0e0e0;
      line-height: 1.5;
      
      i {
        color: #ff4081;
        font-size: 0.8em;
        margin-top: 6px;
        min-width: 12px;
      }
    }
  }
  
  .read-more-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: linear-gradient(135deg, rgba(255, 64, 129, 0.2), rgba(255, 64, 129, 0.3));
    border: 2px solid rgba(255, 64, 129, 0.4);
    border-radius: 10px;
    padding: 12px 20px;
    color: #ff4081;
    font-family: 'Roboto', sans-serif;
    font-size: 0.9em;
    font-weight: 700;
    text-decoration: none;
    transition: all 0.3s ease;
    margin-top: 20px;
    align-self: flex-start;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    
    &:hover {
      background: linear-gradient(135deg, rgba(255, 64, 129, 0.3), rgba(255, 64, 129, 0.4));
      transform: translateY(-2px) scale(1.05);
      box-shadow: 0 8px 25px rgba(255, 64, 129, 0.4);
      border-color: rgba(255, 64, 129, 0.6);
    }
    
    i {
      font-size: 0.9em;
      transition: transform 0.2s ease;
    }
    
    &:hover i {
      transform: translateX(3px);
    }
  }
`;

const ChangelogSection = () => {
  const changelogs = [
    {
      title: 'Patch 1.3 - "Floor 7 Unleashed"',
      date: 'Feb 27, 2025',
      changes: [
        'Introduced Floor 7 with "Nether Wraith" mobs.',
        'Added "Blaze Strike" enchantment.',
        'Fixed various bugs and improved performance.'
      ]
    },
    {
      title: 'Patch 1.2 - "Guild Wars"',
      date: 'Feb 20, 2025',
      changes: [
        'Guild overhaul with shared vaults.',
        'Outposts added for rare drops.',
        'New guild ranking system implemented.'
      ]
    }
  ];

  return (
    <ChangelogContainer>
      <ChangelogHeader>
        <h2>Latest Updates</h2>
        <p>Stay up to date with the newest features, fixes, and improvements</p>
      </ChangelogHeader>
      
      <ChangelogGrid>
        {changelogs.map((changelog, index) => (
          <ChangelogCard
            key={index}
            as={Link}
            to={`/updates/patch-${index + 1}-${index + 2}`}
            whileHover={{ 
              y: -8,
              transition: { duration: 0.3 }
            }}
          >
            <div className="patch-badge">Game Update</div>
            <div className="patch-title">{changelog.title}</div>
            <div className="patch-date">
              <i className="fas fa-calendar"></i>
              {changelog.date}
            </div>
            <div className="patch-highlights">
              {changelog.changes.map((change, changeIndex) => (
                <div key={changeIndex} className="highlight-item">
                  <i className="fas fa-chevron-right"></i>
                  {change}
                </div>
              ))}
            </div>
            <div className="read-more-btn">
              Read Full Patch Notes
              <i className="fas fa-arrow-right"></i>
            </div>
          </ChangelogCard>
        ))}
      </ChangelogGrid>
    </ChangelogContainer>
  );
};

export default ChangelogSection;