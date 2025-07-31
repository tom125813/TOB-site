import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ForumsContainer = styled.div`
  min-height: 100vh;
  padding: 160px 20px 60px;
  background: #1e232d;
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
    opacity: 0.02;
    z-index: -1;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 20% 80%, rgba(255, 64, 129, 0.05) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(255, 64, 129, 0.03) 0%, transparent 50%);
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

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 25px;
  margin-bottom: 50px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CategoryCard = styled.div`
  background: linear-gradient(135deg, rgba(30, 35, 45, 0.9) 0%, rgba(40, 45, 60, 0.9) 100%);
  border: 2px solid rgba(255, 64, 129, 0.4);
  border-radius: 20px;
  padding: 30px;
  transition: all 0.3s ease;
  cursor: pointer;
  backdrop-filter: blur(20px);
  position: relative;
  overflow: hidden;
  box-shadow: 0 15px 50px rgba(255, 64, 129, 0.2);
  
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
  
  .category-header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    
    .category-icon {
      width: 60px;
      height: 60px;
      background: linear-gradient(135deg, #ff4081, #e03570);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 20px;
      box-shadow: 0 0 20px rgba(255, 64, 129, 0.4);
      
      i {
        font-size: 1.8em;
        color: white;
      }
    }
    
    .category-info {
      flex: 1;
      
      h3 {
        font-family: 'Roboto', sans-serif;
        font-size: 1.4em;
        color: #ff4081;
        margin: 0 0 5px 0;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      
      .category-subtitle {
        font-size: 0.9em;
        color: #b0b0c0;
        margin: 0;
      }
    }
  }
  
  .category-description {
    font-size: 1em;
    color: #e0e0e0;
    margin-bottom: 25px;
    line-height: 1.6;
  }
  
  .category-stats {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 20px;
    border-top: 1px solid rgba(255, 64, 129, 0.2);
    
    .stats-left {
      display: flex;
      gap: 25px;
      
      .stat {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 0.9em;
        color: #b0b0c0;
        
        i {
          color: #ff4081;
          font-size: 1.1em;
        }
        
        .stat-number {
          color: #ff4081;
          font-weight: 600;
        }
      }
    }
    
    .last-activity {
      font-size: 0.85em;
      color: #888;
      
      .time {
        color: #ff4081;
        font-weight: 500;
      }
    }
  }
`;

const RecentActivity = styled.div`
  background: linear-gradient(135deg, rgba(30, 35, 45, 0.9) 0%, rgba(40, 45, 60, 0.9) 100%);
  border: 2px solid rgba(255, 64, 129, 0.4);
  border-radius: 20px;
  padding: 30px;
  backdrop-filter: blur(20px);
  position: relative;
  overflow: hidden;
  box-shadow: 0 15px 50px rgba(255, 64, 129, 0.2);
  transition: all 0.3s ease;
  
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
    box-shadow: 0 20px 60px rgba(255, 64, 129, 0.3);
    border-color: rgba(255, 64, 129, 0.6);
  }
  
  .activity-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 25px;
    
    h2 {
      font-family: 'Press Start 2P', cursive;
      font-size: clamp(1.2em, 3vw, 1.6em);
      color: #ff4081;
      margin: 0;
      text-transform: uppercase;
      text-shadow: 0 0 15px rgba(255, 64, 129, 0.5);
    }
    
    .view-all {
      color: #e0e0e0;
      text-decoration: none;
      font-size: 0.9em;
      font-weight: 600;
      transition: all 0.3s ease;
      padding: 8px 15px;
      border-radius: 8px;
      border: 1px solid rgba(255, 64, 129, 0.3);
      
      &:hover {
        color: #ff4081;
        background: rgba(255, 64, 129, 0.1);
        border-color: rgba(255, 64, 129, 0.5);
        transform: translateX(3px);
      }
    }
  }
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid rgba(255, 64, 129, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:last-child {
    border-bottom: none;
  }
  
  .activity-avatar {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background: linear-gradient(135deg, #ff4081, #e03570);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 600;
    margin-right: 15px;
    font-size: 1.1em;
  }
  
  .activity-content {
    flex: 1;
    
    .activity-title {
      font-family: 'Roboto', sans-serif;
      font-size: 1.1em;
      color: #ff4081;
      margin-bottom: 5px;
      font-weight: 600;
      text-decoration: none;
      
      &:hover {
        text-decoration: underline;
      }
    }
    
    .activity-meta {
      font-size: 0.9em;
      color: #b0b0c0;
      
      .author {
        color: #ff4081;
        font-weight: 500;
        text-decoration: none;
        
        &:hover {
          text-decoration: underline;
        }
      }
      
      .category {
        color: #ff4081;
        font-weight: 500;
      }
    }
  }
  
  .activity-time {
    font-size: 0.85em;
    color: #888;
    text-align: right;
    min-width: 80px;
  }
`;

const Forums = () => {
  const forumCategories = [
    {
      id: 'announcements',
      icon: 'fas fa-bullhorn',
      title: 'Announcements',
      subtitle: 'Official News',
      description: 'Official server news, updates, and important information from the Tower of Bedrock team.',
      threads: 15,
      posts: 234,
      lastPost: '2 hours ago'
    },
    {
      id: 'general',
      icon: 'fas fa-comments',
      title: 'General Discussion',
      subtitle: 'Community Chat',
      description: 'General chat about Tower of Bedrock, Minecraft, and community discussions.',
      threads: 456,
      posts: 2341,
      lastPost: '5 minutes ago'
    },
    {
      id: 'guides',
      icon: 'fas fa-book-open',
      title: 'Guides & Tutorials',
      subtitle: 'Learn & Share',
      description: 'Player-created guides, tutorials, and helpful tips for Tower of Bedrock.',
      threads: 89,
      posts: 567,
      lastPost: '1 hour ago'
    },
    {
      id: 'guild-recruitment',
      icon: 'fas fa-users',
      title: 'Guild Recruitment',
      subtitle: 'Find Your Team',
      description: 'Find a guild or recruit new members for your adventures in the tower.',
      threads: 123,
      posts: 890,
      lastPost: '30 minutes ago'
    },
    {
      id: 'suggestions',
      icon: 'fas fa-lightbulb',
      title: 'Suggestions',
      subtitle: 'Share Ideas',
      description: 'Share your ideas to improve the server and help shape the future of Tower of Bedrock.',
      threads: 67,
      posts: 345,
      lastPost: '3 hours ago'
    },
    {
      id: 'bug-reports',
      icon: 'fas fa-bug',
      title: 'Bug Reports',
      subtitle: 'Report Issues',
      description: 'Report bugs and technical issues to help us improve the server experience.',
      threads: 34,
      posts: 156,
      lastPost: '6 hours ago'
    }
  ];

  const recentActivity = [
    {
      title: 'New Floor 8 Boss Strategy Guide',
      author: 'DragonSlayer99',
      category: 'Guides & Tutorials',
      time: '5 min ago'
    },
    {
      title: 'The Ascendants - Recruiting Active Players',
      author: 'GuildMaster',
      category: 'Guild Recruitment',
      time: '15 min ago'
    },
    {
      title: 'Suggestion: Add More PvP Areas',
      author: 'PvPKing',
      category: 'Suggestions',
      time: '30 min ago'
    },
    {
      title: 'Energy System Bug Fix - Patch 1.3.1',
      author: 'Admin',
      category: 'Announcements',
      time: '1 hour ago'
    },
    {
      title: 'Floor 7 Completion Celebration!',
      author: 'FlameWarden',
      category: 'General Discussion',
      time: '2 hours ago'
    }
  ];

  return (
    <ForumsContainer>
      <Container>
        <CategoriesGrid>
          {forumCategories.map((category, index) => (
            <CategoryCard
              key={category.id}
              as={Link}
              to={`/forums/${category.id}`}
            >
              <div className="category-header">
                <div className="category-icon">
                  <i className={category.icon}></i>
                </div>
                <div className="category-info">
                  <h3>{category.title}</h3>
                  <p className="category-subtitle">{category.subtitle}</p>
                </div>
              </div>
              <p className="category-description">{category.description}</p>
              <div className="category-stats">
                <div className="stats-left">
                  <div className="stat">
                    <i className="fas fa-comments"></i>
                    <span className="stat-number">{category.threads}</span> threads
                  </div>
                  <div className="stat">
                    <i className="fas fa-reply"></i>
                    <span className="stat-number">{category.posts}</span> posts
                  </div>
                </div>
                <div className="last-activity">
                  Last: <span className="time">{category.lastPost}</span>
                </div>
              </div>
            </CategoryCard>
          ))}
        </CategoriesGrid>

        <RecentActivity>
          <div className="activity-header">
            <h2>Recent Activity</h2>
            <Link to="/forums/recent" className="view-all">View All →</Link>
          </div>
          {recentActivity.map((activity, index) => (
            <ActivityItem
              key={index}
              as={Link}
              to={`/forums/thread/${activity.title.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <div className="activity-avatar">
                {activity.author.charAt(0).toUpperCase()}
              </div>
              <div className="activity-content">
                <div className="activity-title">{activity.title}</div>
                <div className="activity-meta">
                  by <Link to={`/profile/${activity.author}`} className="author">{activity.author}</Link> in <span className="category">{activity.category}</span>
                </div>
              </div>
              <div className="activity-time">{activity.time}</div>
            </ActivityItem>
          ))}
        </RecentActivity>
      </Container>
    </ForumsContainer>
  );
};

export default Forums;