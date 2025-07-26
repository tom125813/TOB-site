import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useApp } from '../context/AppContext';

const ProfileContainer = styled(motion.div)`
  min-height: 100vh;
  padding: 180px 20px 60px;
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMjHxIGmVAAAAMElEQVQYV2NgoBJwcnJyanJycvL///8/AQwMTEwsLCwsLCwsLCwsLCwsLCwsLCwsDI4GAV8HAFrpV3gAAAAASUVORK5CYII=') repeat;
  background-size: 16px 16px;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 clamp(20px, 5vw, 50px);
`;

const ProfileHeader = styled(motion.div)`
  background: linear-gradient(135deg, rgba(40, 40, 60, 0.95), rgba(50, 50, 70, 0.95));
  border: 2px solid rgba(255, 64, 129, 0.4);
  border-radius: 20px;
  padding: 30px;
  margin-bottom: 30px;
  backdrop-filter: blur(20px);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(255, 64, 129, 0.1), transparent);
    z-index: -1;
  }
  
  .profile-main {
    display: flex;
    align-items: center;
    gap: 30px;
    margin-bottom: 25px;
    
    @media (max-width: 768px) {
      flex-direction: column;
      text-align: center;
      gap: 20px;
    }
  }
  
  .avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: linear-gradient(135deg, #ff4081, #e03570);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3em;
    color: white;
    font-weight: 700;
    border: 4px solid rgba(255, 64, 129, 0.5);
    box-shadow: 0 0 30px rgba(255, 64, 129, 0.3);
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      inset: -4px;
      border-radius: 50%;
      background: linear-gradient(45deg, #ff4081, #e03570, #ff4081);
      z-index: -1;
      animation: rotate 3s linear infinite;
    }
    
    @keyframes rotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  }
  
  .profile-info {
    flex: 1;
    
    h1 {
      font-family: 'Press Start 2P', cursive;
      font-size: clamp(1.5em, 4vw, 2.2em);
      color: #ff4081;
      margin-bottom: 10px;
      text-transform: uppercase;
      text-shadow: 0 0 10px rgba(255, 64, 129, 0.5);
    }
    
    .rank {
      font-family: 'Roboto', sans-serif;
      font-size: clamp(1em, 2.5vw, 1.2em);
      color: #e0e0e0;
      font-weight: 600;
      margin-bottom: 15px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    
    .joined-date {
      font-family: 'Montserrat', sans-serif;
      font-size: clamp(0.9em, 2vw, 1em);
      color: #b0b0c0;
    }
  }
  
  .profile-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 20px;
    
    .stat {
      background: rgba(60, 60, 80, 0.9);
      border: 1px solid rgba(255, 64, 129, 0.3);
      border-radius: 15px;
      padding: 20px;
      text-align: center;
      transition: all 0.3s ease;
      
      &:hover {
        border-color: rgba(255, 64, 129, 0.6);
        transform: translateY(-2px);
      }
      
      .stat-value {
        font-family: 'Orbitron', sans-serif;
        font-size: clamp(1.5em, 3vw, 2em);
        color: #ff4081;
        font-weight: 700;
        margin-bottom: 5px;
        text-shadow: 0 0 10px rgba(255, 64, 129, 0.3);
      }
      
      .stat-label {
        font-family: 'Roboto', sans-serif;
        font-size: clamp(0.8em, 2vw, 0.9em);
        color: #b0b0c0;
        text-transform: uppercase;
        font-weight: 600;
        letter-spacing: 1px;
      }
    }
  }
`;

const ProfileContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 30px;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const ContentCard = styled(motion.div)`
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

const RecentActivity = styled.div`
  .activity-item {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 15px 0;
    border-bottom: 1px solid rgba(255, 64, 129, 0.2);
    
    &:last-child {
      border-bottom: none;
    }
    
    .activity-icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: rgba(255, 64, 129, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ff4081;
      font-size: 1.2em;
    }
    
    .activity-content {
      flex: 1;
      
      .activity-text {
        font-family: 'Montserrat', sans-serif;
        font-size: 0.9em;
        color: #e0e0e0;
        margin-bottom: 3px;
      }
      
      .activity-time {
        font-size: 0.8em;
        color: #b0b0c0;
      }
    }
  }
`;

const AchievementGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 15px;
  
  .achievement {
    aspect-ratio: 1;
    background: rgba(60, 60, 80, 0.9);
    border: 2px solid rgba(255, 64, 129, 0.3);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    
    &:hover {
      border-color: rgba(255, 64, 129, 0.6);
      transform: scale(1.05);
    }
    
    &.unlocked {
      border-color: #ff4081;
      background: rgba(255, 64, 129, 0.2);
      box-shadow: 0 0 15px rgba(255, 64, 129, 0.3);
    }
    
    i {
      font-size: 1.5em;
      color: #ff4081;
      margin-bottom: 5px;
      text-shadow: 0 0 10px rgba(255, 64, 129, 0.5);
    }
    
    .achievement-name {
      font-size: 0.7em;
      color: #e0e0e0;
      text-align: center;
      font-weight: 600;
      margin-bottom: 3px;
    }
    
    .achievement-date {
      font-size: 0.6em;
      color: #ff4081;
      text-align: center;
      font-weight: 500;
    }
    
    .tooltip {
      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(0, 0, 0, 0.9);
      color: white;
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 0.8em;
      white-space: nowrap;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease;
      z-index: 10;
    }
    
    &:hover .tooltip {
      opacity: 1;
    }
  }
`;

const GuildInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 20px;
  background: rgba(60, 60, 80, 0.9);
  border: 1px solid rgba(255, 64, 129, 0.3);
  border-radius: 10px;
  
  .guild-icon {
    width: 50px;
    height: 50px;
    border-radius: 10px;
    background: linear-gradient(135deg, #ff4081, #e03570);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.5em;
    font-weight: 700;
  }
  
  .guild-details {
    flex: 1;
    
    .guild-name {
      font-family: 'Roboto', sans-serif;
      font-size: 1.1em;
      color: #ff4081;
      font-weight: 600;
      margin-bottom: 3px;
    }
    
    .guild-rank {
      font-size: 0.9em;
      color: #b0b0c0;
    }
  }
`;

const EditButton = styled(motion.button)`
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 64, 129, 0.3);
  border: 1px solid rgba(255, 64, 129, 0.5);
  border-radius: 20px;
  padding: 8px 15px;
  color: #ff4081;
  font-family: 'Roboto', sans-serif;
  font-size: 0.9em;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 64, 129, 0.5);
    transform: scale(1.05);
  }
`;

const Profile = () => {
  const { username } = useParams();
  const { state } = useApp();
  const [profileData, setProfileData] = useState(null);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    // Mock profile data - would come from API
    const mockProfile = {
      username: username || 'DragonSlayer99',
      rank: 'Veteran Player',
      level: 87,
      guild: 'The Ascendants',
      guildRank: 'Officer',
      joinedDate: 'January 2024',
      stats: {
        level: 87,
        kills: 2456,
        deaths: 234,
        playtime: '156h',
        floorsCleared: 8,
        guildRank: 3
      },
      recentActivity: [
        {
          icon: 'fas fa-trophy',
          text: 'Defeated Floor 8 Boss',
          time: '2 hours ago'
        },
        {
          icon: 'fas fa-star',
          text: 'Reached Level 87',
          time: '1 day ago'
        },
        {
          icon: 'fas fa-users',
          text: 'Joined guild raid',
          time: '2 days ago'
        },
        {
          icon: 'fas fa-gem',
          text: 'Found legendary weapon',
          time: '3 days ago'
        }
      ],
      achievements: [
        { id: 1, name: 'First Kill', icon: 'fas fa-sword', unlocked: true, unlockedDate: 'Jan 15, 2024' },
        { id: 2, name: 'Floor Master', icon: 'fas fa-building', unlocked: true, unlockedDate: 'Jan 20, 2024' },
        { id: 3, name: 'Guild Leader', icon: 'fas fa-crown', unlocked: false, unlockedDate: null },
        { id: 4, name: 'Legendary', icon: 'fas fa-star', unlocked: true, unlockedDate: 'Feb 5, 2024' },
        { id: 5, name: 'PvP Master', icon: 'fas fa-fist-raised', unlocked: false, unlockedDate: null },
        { id: 6, name: 'Collector', icon: 'fas fa-gem', unlocked: true, unlockedDate: 'Feb 10, 2024' }
      ]
    };
    
    setProfileData(mockProfile);
    setIsOwnProfile(!username || username === state.user?.username);
  }, [username, state.user]);

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

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <ProfileContainer
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <Container>
        <ProfileHeader variants={itemVariants}>
          {isOwnProfile && (
            <EditButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className="fas fa-edit"></i> Edit Profile
            </EditButton>
          )}
          
          <div className="profile-main">
            <div className="avatar">
              {profileData.username.charAt(0).toUpperCase()}
            </div>
            <div className="profile-info">
              <h1>{profileData.username}</h1>
              <div className="rank">{profileData.rank}</div>
              <div className="joined-date">Joined {profileData.joinedDate}</div>
            </div>
          </div>
          
          <div className="profile-stats">
            <div className="stat">
              <div className="stat-value">{profileData.stats.level}</div>
              <div className="stat-label">Level</div>
            </div>
            <div className="stat">
              <div className="stat-value">{profileData.stats.kills}</div>
              <div className="stat-label">Kills</div>
            </div>
            <div className="stat">
              <div className="stat-value">{profileData.stats.floorsCleared}</div>
              <div className="stat-label">Floors</div>
            </div>
            <div className="stat">
              <div className="stat-value">{profileData.stats.playtime}</div>
              <div className="stat-label">Playtime</div>
            </div>
          </div>
        </ProfileHeader>

        <ProfileContent>
          <MainContent>
            <ContentCard variants={itemVariants}>
              <h2>Recent Activity</h2>
              <RecentActivity>
                {profileData.recentActivity.map((activity, index) => (
                  <div key={index} className="activity-item">
                    <div className="activity-icon">
                      <i className={activity.icon}></i>
                    </div>
                    <div className="activity-content">
                      <div className="activity-text">{activity.text}</div>
                      <div className="activity-time">{activity.time}</div>
                    </div>
                  </div>
                ))}
              </RecentActivity>
            </ContentCard>

            <ContentCard variants={itemVariants}>
              <h2>Achievements</h2>
              <AchievementGrid>
                {profileData.achievements.filter(achievement => achievement.unlocked).map((achievement) => (
                  <div 
                    key={achievement.id} 
                    className="achievement unlocked"
                  >
                    <i className={achievement.icon}></i>
                    <div className="achievement-name">{achievement.name}</div>
                    <div className="achievement-date">{achievement.unlockedDate}</div>
                    <div className="tooltip">
                      Unlocked on {achievement.unlockedDate}
                    </div>
                  </div>
                ))}
              </AchievementGrid>
            </ContentCard>
          </MainContent>

          <Sidebar>
            <ContentCard variants={itemVariants}>
              <h2>Rank</h2>
              <GuildInfo>
                <div className="guild-icon">
                  <i className="fas fa-star"></i>
                </div>
                <div className="guild-details">
                  <div className="guild-name">{profileData.rank}</div>
                  <div className="guild-rank">Level {profileData.level}</div>
                </div>
              </GuildInfo>
            </ContentCard>

            <ContentCard variants={itemVariants}>
              <h2>Guild</h2>
              <GuildInfo>
                <div className="guild-icon">T</div>
                <div className="guild-details">
                  <div className="guild-name">{profileData.guild}</div>
                  <div className="guild-rank">{profileData.guildRank}</div>
                </div>
              </GuildInfo>
            </ContentCard>

            <ContentCard variants={itemVariants}>
              <h2>Combat Stats</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#b0b0c0' }}>K/D Ratio:</span>
                  <span style={{ color: '#ff4081', fontWeight: '600' }}>
                    {(profileData.stats.kills / profileData.stats.deaths).toFixed(2)}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#b0b0c0' }}>Total Kills:</span>
                  <span style={{ color: '#ff4081', fontWeight: '600' }}>{profileData.stats.kills}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#b0b0c0' }}>Deaths:</span>
                  <span style={{ color: '#ff4081', fontWeight: '600' }}>{profileData.stats.deaths}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#b0b0c0' }}>Guild Rank:</span>
                  <span style={{ color: '#ff4081', fontWeight: '600' }}>#{profileData.stats.guildRank}</span>
                </div>
              </div>
            </ContentCard>
          </Sidebar>
        </ProfileContent>
      </Container>
    </ProfileContainer>
  );
};

export default Profile;