import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const StatsContainer = styled(motion.div)`
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

const StatsHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: 50px;
  
  .header-icon {
    font-size: 4em;
    color: #ff4081;
    margin-bottom: 20px;
    text-shadow: 0 0 30px rgba(255, 64, 129, 0.6);
    animation: pulse 3s ease-in-out infinite;
  }
  
  h1 {
    font-family: 'Press Start 2P', cursive;
    font-size: clamp(2em, 6vw, 3.5em);
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
    font-size: clamp(1.1em, 2.5vw, 1.4em);
    color: #b0b0c0;
    font-weight: 500;
    max-width: 600px;
    margin: 0 auto 20px;
    line-height: 1.6;
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

const StatsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
  margin-bottom: 40px;
`;

const StatCard = styled(motion.div)`
  background: linear-gradient(135deg, rgba(40, 40, 60, 0.9), rgba(50, 50, 70, 0.9));
  border: 2px solid rgba(255, 64, 129, 0.3);
  border-radius: 15px;
  padding: 25px;
  text-align: center;
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: rgba(255, 64, 129, 0.6);
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(255, 64, 129, 0.3);
  }
  
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
  
  .stat-icon {
    font-size: 2.5em;
    color: #ff4081;
    margin-bottom: 15px;
    text-shadow: 0 0 15px rgba(255, 64, 129, 0.5);
  }
  
  .stat-value {
    font-family: 'Orbitron', sans-serif;
    font-size: clamp(2em, 4vw, 2.5em);
    color: #ff4081;
    font-weight: 700;
    margin-bottom: 10px;
    text-shadow: 0 0 10px rgba(255, 64, 129, 0.3);
    
    &.animated {
      animation: countUp 2s ease-out forwards;
    }
  }
  
  .stat-label {
    font-family: 'Roboto', sans-serif;
    font-size: clamp(1em, 2.5vw, 1.1em);
    color: #e0e0e0;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  
  .stat-change {
    font-size: 0.9em;
    margin-top: 8px;
    
    &.positive {
      color: #4caf50;
    }
    
    &.negative {
      color: #f44336;
    }
    
    i {
      margin-right: 5px;
    }
  }
  
  @keyframes countUp {
    from { transform: scale(0.8); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
`;

const ChartsSection = styled(motion.div)`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 30px;
  margin-bottom: 40px;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const ChartCard = styled(motion.div)`
  background: rgba(40, 40, 60, 0.9);
  border: 1px solid rgba(255, 64, 129, 0.3);
  border-radius: 15px;
  padding: 25px;
  backdrop-filter: blur(10px);
  
  h2 {
    font-family: 'Press Start 2P', cursive;
    font-size: clamp(1.1em, 2.5vw, 1.4em);
    color: #ff4081;
    margin-bottom: 20px;
    text-transform: uppercase;
  }
`;

const PlayerActivityChart = styled.div`
  height: 320px;
  background: linear-gradient(135deg, rgba(25, 25, 40, 0.8), rgba(35, 35, 55, 0.8));
  border-radius: 12px;
  display: flex;
  align-items: end;
  justify-content: space-around;
  padding: 30px 20px 40px 20px;
  gap: 8px;
  position: relative;
  border: 1px solid rgba(255, 64, 129, 0.2);
  
  &::before {
    content: '';
    position: absolute;
    bottom: 40px;
    left: 20px;
    right: 20px;
    height: 1px;
    background: rgba(255, 64, 129, 0.2);
  }
  
  .bar {
    background: linear-gradient(to top, #ff4081, #e03570, #ff6b9d);
    border-radius: 6px 6px 0 0;
    min-width: 35px;
    position: relative;
    transition: all 0.4s ease;
    box-shadow: 0 0 10px rgba(255, 64, 129, 0.3);
    
    &:hover {
      transform: scaleY(1.05) scaleX(1.1);
      box-shadow: 0 0 20px rgba(255, 64, 129, 0.6);
      background: linear-gradient(to top, #ff4081, #e03570, #ff6b9d, #ffb3d1);
    }
    
    .bar-label {
      position: absolute;
      bottom: -35px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 0.85em;
      color: #b0b0c0;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .bar-value {
      position: absolute;
      top: -30px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 0.9em;
      color: #ff4081;
      font-weight: 700;
      font-family: 'Orbitron', sans-serif;
      opacity: 0;
      transition: all 0.3s ease;
      background: rgba(25, 25, 40, 0.9);
      padding: 4px 8px;
      border-radius: 4px;
      border: 1px solid rgba(255, 64, 129, 0.3);
      backdrop-filter: blur(10px);
    }
    
    &:hover .bar-value {
      opacity: 1;
      transform: translateX(-50%) translateY(-5px);
    }
  }
`;

const TopPlayersSection = styled(motion.div)`
  background: rgba(40, 40, 60, 0.9);
  border: 1px solid rgba(255, 64, 129, 0.3);
  border-radius: 15px;
  padding: 25px;
  backdrop-filter: blur(10px);
  
  h2 {
    font-family: 'Press Start 2P', cursive;
    font-size: clamp(1.1em, 2.5vw, 1.4em);
    color: #ff4081;
    margin-bottom: 20px;
    text-transform: uppercase;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    .view-all {
      font-family: 'Roboto', sans-serif;
      font-size: 0.6em;
      color: #b0b0c0;
      text-transform: none;
      text-decoration: none;
      transition: color 0.3s ease;
      
      &:hover {
        color: #ff4081;
      }
    }
  }
`;

const PlayerList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const PlayerItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  background: rgba(50, 50, 70, 0.5);
  border-radius: 10px;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    background: rgba(60, 60, 80, 0.7);
    transform: translateX(5px);
  }
  
  .rank {
    font-family: 'Orbitron', sans-serif;
    font-size: 1.2em;
    color: #ff4081;
    font-weight: 700;
    min-width: 30px;
    text-align: center;
    
    &.first { color: #ffd700; }
    &.second { color: #c0c0c0; }
    &.third { color: #cd7f32; }
  }
  
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: linear-gradient(135deg, #ff4081, #e03570);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 600;
    font-size: 1.1em;
  }
  
  .player-info {
    flex: 1;
    
    .username {
      font-family: 'Roboto', sans-serif;
      font-size: 1em;
      color: #e0e0e0;
      font-weight: 600;
      margin-bottom: 3px;
    }
    
    .guild {
      font-size: 0.8em;
      color: #b0b0c0;
    }
  }
  
  .level {
    font-family: 'Orbitron', sans-serif;
    font-size: 1.1em;
    color: #ff4081;
    font-weight: 700;
  }
`;

const ServerStatus = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: rgba(25, 25, 40, 0.8);
  border: 1px solid rgba(76, 175, 80, 0.3);
  border-radius: 25px;
  padding: 12px 20px;
  backdrop-filter: blur(10px);
  margin: 0 auto;
  max-width: fit-content;
  
  .status-indicator {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #4caf50;
    box-shadow: 0 0 15px rgba(76, 175, 80, 0.6);
    animation: statusPulse 2s infinite;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      inset: -3px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(76, 175, 80, 0.3), transparent);
      animation: statusPulse 2s infinite;
    }
  }
  
  .status-text {
    font-family: 'Roboto', sans-serif;
    font-size: 1.1em;
    color: #4caf50;
    font-weight: 600;
    text-shadow: 0 0 10px rgba(76, 175, 80, 0.3);
  }
  
  @keyframes statusPulse {
    0% { 
      box-shadow: 0 0 15px rgba(76, 175, 80, 0.6);
      transform: scale(1);
    }
    50% { 
      box-shadow: 0 0 25px rgba(76, 175, 80, 0.8);
      transform: scale(1.1);
    }
    100% { 
      box-shadow: 0 0 15px rgba(76, 175, 80, 0.6);
      transform: scale(1);
    }
  }
`;

const Stats = () => {
  const [stats, setStats] = useState({
    onlinePlayers: 0,
    totalPlayers: 0,
    guilds: 0,
    floorsCleared: 0
  });
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    // Simulate loading stats with animation
    const targetStats = {
      onlinePlayers: 87,
      totalPlayers: 2456,
      guilds: 45,
      floorsCleared: 12847
    };

    const animateStats = () => {
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;
      
      let currentStep = 0;
      
      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        setStats({
          onlinePlayers: Math.floor(targetStats.onlinePlayers * progress),
          totalPlayers: Math.floor(targetStats.totalPlayers * progress),
          guilds: Math.floor(targetStats.guilds * progress),
          floorsCleared: Math.floor(targetStats.floorsCleared * progress)
        });
        
        if (currentStep >= steps) {
          clearInterval(interval);
          setStats(targetStats);
        }
      }, stepDuration);
    };

    if (inView) {
      setTimeout(animateStats, 500);
    }
  }, [inView]);

  const playerActivityData = [
    { day: 'Mon', players: 65 },
    { day: 'Tue', players: 78 },
    { day: 'Wed', players: 82 },
    { day: 'Thu', players: 91 },
    { day: 'Fri', players: 95 },
    { day: 'Sat', players: 87 },
    { day: 'Sun', players: 73 }
  ];

  const topPlayers = [
    { rank: 1, username: 'DragonSlayer99', guild: 'The Ascendants', level: 98 },
    { rank: 2, username: 'ShadowMaster', guild: 'Dark Knights', level: 95 },
    { rank: 3, username: 'FlameWarden', guild: 'Fire Legion', level: 92 },
    { rank: 4, username: 'IceQueen', guild: 'Frost Guardians', level: 89 },
    { rank: 5, username: 'StormBringer', guild: 'Thunder Clan', level: 87 }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  return (
    <StatsContainer
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <Container>
        <StatsHeader variants={itemVariants}>
          <div className="header-icon">
            <i className="fas fa-chart-bar"></i>
          </div>
          <h1>Server Statistics</h1>
          <p>Real-time data from the Tower of Bedrock server</p>
          <ServerStatus>
            <div className="status-indicator"></div>
            <span className="status-text">Server Online</span>
          </ServerStatus>
        </StatsHeader>

        <StatsGrid>
          <StatCard variants={itemVariants}>
            <div className="stat-icon">
              <i className="fas fa-users"></i>
            </div>
            <div className="stat-value animated">{stats.onlinePlayers}</div>
            <div className="stat-label">Online Players</div>
            <div className="stat-change positive">
              <i className="fas fa-arrow-up"></i>
              +12 from yesterday
            </div>
          </StatCard>

          <StatCard variants={itemVariants}>
            <div className="stat-icon">
              <i className="fas fa-user-friends"></i>
            </div>
            <div className="stat-value animated">{stats.totalPlayers.toLocaleString()}</div>
            <div className="stat-label">Total Players</div>
            <div className="stat-change positive">
              <i className="fas fa-arrow-up"></i>
              +156 this week
            </div>
          </StatCard>

          <StatCard variants={itemVariants}>
            <div className="stat-icon">
              <i className="fas fa-shield-alt"></i>
            </div>
            <div className="stat-value animated">{stats.guilds}</div>
            <div className="stat-label">Active Guilds</div>
            <div className="stat-change positive">
              <i className="fas fa-arrow-up"></i>
              +3 this month
            </div>
          </StatCard>

          <StatCard variants={itemVariants}>
            <div className="stat-icon">
              <i className="fas fa-building"></i>
            </div>
            <div className="stat-value animated">{stats.floorsCleared.toLocaleString()}</div>
            <div className="stat-label">Floors Cleared</div>
            <div className="stat-change positive">
              <i className="fas fa-arrow-up"></i>
              +234 today
            </div>
          </StatCard>
        </StatsGrid>

        <ChartsSection>
          <ChartCard variants={itemVariants}>
            <h2>Player Activity (7 Days)</h2>
            <PlayerActivityChart>
              {playerActivityData.map((data, index) => (
                <div
                  key={data.day}
                  className="bar"
                  style={{ height: `${(data.players / 100) * 100}%` }}
                >
                  <div className="bar-value">{data.players}</div>
                  <div className="bar-label">{data.day}</div>
                </div>
              ))}
            </PlayerActivityChart>
            
            <div style={{ marginTop: '30px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
              <div style={{ background: 'rgba(25, 25, 40, 0.8)', padding: '15px', borderRadius: '10px', border: '1px solid rgba(255, 64, 129, 0.2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <i className="fas fa-server" style={{ color: '#ff4081', fontSize: '1.2em' }}></i>
                  <span style={{ color: '#e0e0e0', fontWeight: '600' }}>Server Uptime</span>
                </div>
                <div style={{ color: '#ff4081', fontSize: '1.5em', fontWeight: '700' }}>99.8%</div>
              </div>
              
              <div style={{ background: 'rgba(25, 25, 40, 0.8)', padding: '15px', borderRadius: '10px', border: '1px solid rgba(255, 64, 129, 0.2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <i className="fas fa-clock" style={{ color: '#ff4081', fontSize: '1.2em' }}></i>
                  <span style={{ color: '#e0e0e0', fontWeight: '600' }}>Avg Response</span>
                </div>
                <div style={{ color: '#ff4081', fontSize: '1.5em', fontWeight: '700' }}>12ms</div>
              </div>
            </div>
          </ChartCard>

          <TopPlayersSection variants={itemVariants}>
            <h2>
              Top Players
              <Link to="/leaderboards" className="view-all">View All →</Link>
            </h2>
            <PlayerList>
              {topPlayers.map((player, index) => (
                <PlayerItem
                  key={player.username}
                  variants={itemVariants}
                  as={Link}
                  to={`/profile/${player.username}`}
                  whileHover={{ x: 5 }}
                >
                  <div className={`rank ${
                    player.rank === 1 ? 'first' : 
                    player.rank === 2 ? 'second' : 
                    player.rank === 3 ? 'third' : ''
                  }`}>
                    #{player.rank}
                  </div>
                  <div className="avatar">
                    {player.username.charAt(0).toUpperCase()}
                  </div>
                  <div className="player-info">
                    <div className="username">{player.username}</div>
                    <div className="guild">{player.guild}</div>
                  </div>
                  <div className="level">Lv.{player.level}</div>
                </PlayerItem>
              ))}
            </PlayerList>
          </TopPlayersSection>
        </ChartsSection>
      </Container>
    </StatsContainer>
  );
};

export default Stats;