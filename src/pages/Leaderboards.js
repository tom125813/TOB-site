import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const LeaderboardsContainer = styled(motion.div)`
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
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 clamp(20px, 5vw, 50px);
`;

const PageHeader = styled(motion.div)`
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
    margin: 0 auto;
    line-height: 1.6;
  }
  
  @keyframes gradientShift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
`;

const CategoryTabs = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 40px;
  flex-wrap: wrap;
  
  button {
    display: flex;
    align-items: center;
    gap: 10px;
    background: linear-gradient(135deg, rgba(25, 25, 40, 0.9), rgba(35, 35, 55, 0.9));
    border: 1px solid rgba(255, 64, 129, 0.2);
    border-radius: 12px;
    padding: 15px 25px;
    color: #e0e0e0;
    font-family: 'Roboto', sans-serif;
    font-weight: 600;
    font-size: 0.95em;
    cursor: pointer;
    transition: all 0.4s ease;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    backdrop-filter: blur(10px);
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 64, 129, 0.2), transparent);
      transition: left 0.5s ease;
    }
    
    &:hover::before {
      left: 100%;
    }
    
    &:hover {
      border-color: rgba(255, 64, 129, 0.5);
      background: linear-gradient(135deg, rgba(35, 35, 55, 0.9), rgba(45, 45, 65, 0.9));
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(255, 64, 129, 0.2);
    }
    
    &.active {
      background: linear-gradient(135deg, #ff4081, #e03570);
      border-color: #ff4081;
      color: white;
      box-shadow: 0 0 25px rgba(255, 64, 129, 0.5);
      transform: translateY(-2px);
    }
    
    i {
      font-size: 1.1em;
    }
  }
`;

const LeaderboardCard = styled(motion.div)`
  background: linear-gradient(135deg, rgba(25, 25, 40, 0.95), rgba(35, 35, 55, 0.95));
  border: 1px solid rgba(255, 64, 129, 0.2);
  border-radius: 20px;
  overflow: hidden;
  backdrop-filter: blur(15px);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
`;

const LeaderboardHeader = styled.div`
  background: linear-gradient(135deg, rgba(35, 35, 55, 0.9), rgba(45, 45, 65, 0.9));
  padding: 25px;
  border-bottom: 1px solid rgba(255, 64, 129, 0.3);
  text-align: center;
  
  h2 {
    font-family: 'Press Start 2P', cursive;
    font-size: clamp(1.2em, 3vw, 1.6em);
    color: #ff4081;
    margin: 0;
    text-transform: uppercase;
    text-shadow: 0 0 15px rgba(255, 64, 129, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    
    i {
      font-size: 1.2em;
    }
  }
`;

const TopThree = styled.div`
  padding: 30px 20px;
  background: linear-gradient(135deg, rgba(25, 25, 40, 0.9), rgba(35, 35, 55, 0.9));
`;

const TopPlayerCard = styled(motion.div)`
  display: flex;
  align-items: center;
  padding: 20px;
  margin-bottom: 15px;
  background: ${props => {
        if (props.rank === 1) return 'linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 215, 0, 0.1))';
        if (props.rank === 2) return 'linear-gradient(135deg, rgba(192, 192, 192, 0.2), rgba(192, 192, 192, 0.1))';
        if (props.rank === 3) return 'linear-gradient(135deg, rgba(205, 127, 50, 0.2), rgba(205, 127, 50, 0.1))';
        return 'rgba(50, 50, 70, 0.5)';
    }};
  border: 2px solid ${props => {
        if (props.rank === 1) return '#ffd700';
        if (props.rank === 2) return '#c0c0c0';
        if (props.rank === 3) return '#cd7f32';
        return 'rgba(255, 64, 129, 0.3)';
    }};
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px ${props => {
        if (props.rank === 1) return 'rgba(255, 215, 0, 0.3)';
        if (props.rank === 2) return 'rgba(192, 192, 192, 0.3)';
        if (props.rank === 3) return 'rgba(205, 127, 50, 0.3)';
        return 'rgba(255, 64, 129, 0.3)';
    }};
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: left 0.5s ease;
  }
  
  &:hover::before {
    left: 100%;
  }
  
  .rank-badge {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: ${props => {
        if (props.rank === 1) return 'linear-gradient(135deg, #ffd700, #ffed4e)';
        if (props.rank === 2) return 'linear-gradient(135deg, #c0c0c0, #e8e8e8)';
        if (props.rank === 3) return 'linear-gradient(135deg, #cd7f32, #daa520)';
        return 'linear-gradient(135deg, #ff4081, #e03570)';
    }};
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Roboto', sans-serif;
    font-size: 1.5em;
    font-weight: 700;
    color: white;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    margin-right: 20px;
    position: relative;
    
    ${props => props.rank === 1 && `
      &::after {
        content: '👑';
        position: absolute;
        top: -10px;
        right: -5px;
        font-size: 0.8em;
      }
    `}
  }
  
  .avatar {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background: linear-gradient(135deg, #ff4081, #e03570);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.8em;
    font-weight: 700;
    margin-right: 20px;
    border: 3px solid ${props => {
        if (props.rank === 1) return '#ffd700';
        if (props.rank === 2) return '#c0c0c0';
        if (props.rank === 3) return '#cd7f32';
        return 'rgba(255, 64, 129, 0.5)';
    }};
  }
  
  .player-info {
    flex: 1;
    
    .username {
      font-family: 'Roboto', sans-serif;
      font-size: 1.4em;
      color: #e0e0e0;
      font-weight: 700;
      margin-bottom: 5px;
    }
    
    .guild {
      font-size: 1em;
      color: #b0b0c0;
      font-weight: 500;
    }
  }
  
  .score-info {
    text-align: right;
    
    .score {
      font-family: 'Roboto', sans-serif;
      font-size: 1.8em;
      color: ${props => {
        if (props.rank === 1) return '#ffd700';
        if (props.rank === 2) return '#c0c0c0';
        if (props.rank === 3) return '#cd7f32';
        return '#ff4081';
    }};
      font-weight: 700;
      margin-bottom: 3px;
    }
    
    .score-label {
      font-size: 0.9em;
      color: #b0b0c0;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
  }
  
  .change {
    margin-left: 20px;
    font-size: 0.9em;
    min-width: 60px;
    text-align: center;
    
    &.up {
      color: #4caf50;
    }
    
    &.down {
      color: #f44336;
    }
    
    &.same {
      color: #b0b0c0;
    }
    
    i {
      margin-right: 3px;
    }
  }
`;

const LeaderboardList = styled.div`
  padding: 0;
`;

const LeaderboardItem = styled(motion.div)`
  display: flex;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid rgba(255, 64, 129, 0.2);
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    background: rgba(50, 50, 70, 0.5);
    transform: translateX(5px);
  }
  
  &:last-child {
    border-bottom: none;
  }
  
  .rank {
    font-family: 'Orbitron', sans-serif;
    font-size: 1.3em;
    color: #ff4081;
    font-weight: 700;
    min-width: 50px;
    text-align: center;
  }
  
  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #ff4081, #e03570);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 600;
    font-size: 1.3em;
    margin: 0 20px;
  }
  
  .player-info {
    flex: 1;
    
    .username {
      font-family: 'Roboto', sans-serif;
      font-size: 1.1em;
      color: #e0e0e0;
      font-weight: 600;
      margin-bottom: 5px;
    }
    
    .guild {
      font-size: 0.9em;
      color: #b0b0c0;
    }
  }
  
  .score {
    font-family: 'Orbitron', sans-serif;
    font-size: 1.2em;
    color: #ff4081;
    font-weight: 700;
    text-align: right;
    min-width: 80px;
  }
  
  .change {
    font-size: 0.8em;
    margin-left: 15px;
    min-width: 60px;
    text-align: center;
    
    &.up {
      color: #4caf50;
    }
    
    &.down {
      color: #f44336;
    }
    
    &.same {
      color: #b0b0c0;
    }
    
    i {
      margin-right: 3px;
    }
  }
`;

const Leaderboards = () => {
    const [activeCategory, setActiveCategory] = useState('level');
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    const categories = [
        { id: 'level', name: 'Level', icon: 'fas fa-star' },
        { id: 'kills', name: 'Kills', icon: 'fas fa-sword' },
        { id: 'guild', name: 'Guild Power', icon: 'fas fa-shield-alt' },
        { id: 'playtime', name: 'Playtime', icon: 'fas fa-clock' },
        { id: 'floors', name: 'Floors Cleared', icon: 'fas fa-building' }
    ];

    const leaderboardData = {
        level: [
            { rank: 1, username: 'DragonSlayer99', guild: 'The Ascendants', score: 98, change: 'same' },
            { rank: 2, username: 'ShadowMaster', guild: 'Dark Knights', score: 95, change: 'up' },
            { rank: 3, username: 'FlameWarden', guild: 'Fire Legion', score: 92, change: 'down' },
            { rank: 4, username: 'IceQueen', guild: 'Frost Guardians', score: 89, change: 'up' },
            { rank: 5, username: 'StormBringer', guild: 'Thunder Clan', score: 87, change: 'same' },
            { rank: 6, username: 'VoidWalker', guild: 'Shadow Realm', score: 85, change: 'up' },
            { rank: 7, username: 'LightBearer', guild: 'Holy Order', score: 83, change: 'down' },
            { rank: 8, username: 'EarthShaker', guild: 'Stone Giants', score: 81, change: 'up' },
            { rank: 9, username: 'WindRider', guild: 'Sky Warriors', score: 79, change: 'same' },
            { rank: 10, username: 'BloodHunter', guild: 'Crimson Wolves', score: 77, change: 'down' }
        ],
        kills: [
            { rank: 1, username: 'BloodHunter', guild: 'Crimson Wolves', score: 3456, change: 'up' },
            { rank: 2, username: 'DragonSlayer99', guild: 'The Ascendants', score: 3234, change: 'down' },
            { rank: 3, username: 'ShadowMaster', guild: 'Dark Knights', score: 2987, change: 'same' }
        ],
        guild: [
            { rank: 1, username: 'The Ascendants', guild: '45 Members', score: 15678, change: 'same' },
            { rank: 2, username: 'Dark Knights', guild: '38 Members', score: 14234, change: 'up' },
            { rank: 3, username: 'Fire Legion', guild: '42 Members', score: 13567, change: 'down' }
        ]
    };

    const currentData = leaderboardData[activeCategory] || leaderboardData.level;
    const topThree = currentData.slice(0, 3);
    const remaining = currentData.slice(3);

    const getScoreLabel = (category) => {
        switch (category) {
            case 'level': return 'Level';
            case 'kills': return 'Kills';
            case 'guild': return 'Power';
            case 'playtime': return 'Hours';
            case 'floors': return 'Floors';
            default: return 'Score';
        }
    };

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
        <LeaderboardsContainer
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
        >
            <Container>
                <PageHeader variants={itemVariants}>
                    <div className="header-icon">
                        <i className="fas fa-trophy"></i>
                    </div>
                    <h1>Leaderboards</h1>
                    <p>Compete with the best players in Tower of Bedrock</p>
                </PageHeader>

                <CategoryTabs variants={itemVariants}>
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            className={activeCategory === category.id ? 'active' : ''}
                            onClick={() => setActiveCategory(category.id)}
                        >
                            <i className={category.icon}></i>
                            {category.name}
                        </button>
                    ))}
                </CategoryTabs>

                <LeaderboardCard variants={itemVariants}>
                    <LeaderboardHeader>
                        <h2>{categories.find(c => c.id === activeCategory)?.name} Leaderboard</h2>
                    </LeaderboardHeader>

                    <TopThree>
                        {topThree.map((player) => (
                            <TopPlayerCard
                                key={player.username}
                                rank={player.rank}
                                as={Link}
                                to={`/profile/${player.username}`}
                                whileHover={{ y: -3 }}
                            >
                                <div className="rank-badge">#{player.rank}</div>
                                <div className="avatar">
                                    {player.username.charAt(0).toUpperCase()}
                                </div>
                                <div className="player-info">
                                    <div className="username">{player.username}</div>
                                    <div className="guild">{player.guild}</div>
                                </div>
                                <div className="score-info">
                                    <div className="score">{player.score.toLocaleString()}</div>
                                    <div className="score-label">{getScoreLabel(activeCategory)}</div>
                                </div>
                                <div className={`change ${player.change}`}>
                                    {player.change === 'up' && <i className="fas fa-arrow-up"></i>}
                                    {player.change === 'down' && <i className="fas fa-arrow-down"></i>}
                                    {player.change === 'same' && <i className="fas fa-minus"></i>}
                                    {player.change === 'up' ? '+1' : player.change === 'down' ? '-1' : '0'}
                                </div>
                            </TopPlayerCard>
                        ))}
                    </TopThree>

                    <LeaderboardList>
                        {remaining.map((player, index) => (
                            <LeaderboardItem
                                key={player.username}
                                variants={itemVariants}
                                as={Link}
                                to={`/profile/${player.username}`}
                                whileHover={{ x: 5 }}
                            >
                                <div className="rank">#{player.rank}</div>
                                <div className="avatar">
                                    {player.username.charAt(0).toUpperCase()}
                                </div>
                                <div className="player-info">
                                    <div className="username">{player.username}</div>
                                    <div className="guild">{player.guild}</div>
                                </div>
                                <div className="score">
                                    {player.score.toLocaleString()}
                                    <div style={{ fontSize: '0.7em', color: '#b0b0c0', marginTop: '2px' }}>
                                        {getScoreLabel(activeCategory)}
                                    </div>
                                </div>
                                <div className={`change ${player.change}`}>
                                    {player.change === 'up' && <i className="fas fa-arrow-up"></i>}
                                    {player.change === 'down' && <i className="fas fa-arrow-down"></i>}
                                    {player.change === 'same' && <i className="fas fa-minus"></i>}
                                    {player.change === 'up' ? '+1' : player.change === 'down' ? '-1' : '0'}
                                </div>
                            </LeaderboardItem>
                        ))}
                    </LeaderboardList>
                </LeaderboardCard>
            </Container>
        </LeaderboardsContainer>
    );
};

export default Leaderboards;