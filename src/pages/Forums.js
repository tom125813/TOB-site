import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ForumsContainer = styled(motion.div)`
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

const ForumHeader = styled(motion.div)`
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

const ForumStats = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 50px;
  
  .stat-card {
    background: linear-gradient(135deg, rgba(25, 25, 40, 0.9), rgba(35, 35, 55, 0.9));
    border: 1px solid rgba(255, 64, 129, 0.2);
    border-radius: 12px;
    padding: 20px;
    text-align: center;
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
    
    &:hover {
      border-color: rgba(255, 64, 129, 0.4);
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(255, 64, 129, 0.15);
    }
    
    .stat-icon {
      font-size: 2em;
      color: #ff4081;
      margin-bottom: 10px;
      text-shadow: 0 0 15px rgba(255, 64, 129, 0.4);
    }
    
    .stat-number {
      font-family: 'Orbitron', sans-serif;
      font-size: 1.8em;
      color: #ff4081;
      font-weight: 700;
      margin-bottom: 5px;
    }
    
    .stat-label {
      font-size: 0.9em;
      color: #b0b0c0;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
  }
`;

const CategoriesGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 25px;
  margin-bottom: 50px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CategoryCard = styled(motion.div)`
  background: linear-gradient(135deg, rgba(25, 25, 40, 0.95), rgba(35, 35, 55, 0.95));
  border: 1px solid rgba(255, 64, 129, 0.2);
  border-radius: 16px;
  padding: 30px;
  transition: all 0.4s ease;
  cursor: pointer;
  backdrop-filter: blur(15px);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 64, 129, 0.1), transparent);
    transition: left 0.6s ease;
  }
  
  &:hover::before {
    left: 100%;
  }
  
  &:hover {
    transform: translateY(-8px);
    border-color: rgba(255, 64, 129, 0.5);
    box-shadow: 0 15px 40px rgba(255, 64, 129, 0.2);
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

const RecentActivity = styled(motion.div)`
  background: linear-gradient(135deg, rgba(25, 25, 40, 0.95), rgba(35, 35, 55, 0.95));
  border: 1px solid rgba(255, 64, 129, 0.2);
  border-radius: 16px;
  padding: 30px;
  backdrop-filter: blur(15px);
  
  .activity-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 25px;
    
    h2 {
      font-family: 'Press Start 2P', cursive;
      font-size: 1.4em;
      color: #ff4081;
      margin: 0;
      text-transform: uppercase;
    }
    
    .view-all {
      color: #b0b0c0;
      text-decoration: none;
      font-size: 0.9em;
      transition: color 0.3s ease;
      
      &:hover {
        color: #ff4081;
      }
    }
  }
`;

const ActivityItem = styled(motion.div)`
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
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const forumStats = [
    { icon: 'fas fa-comments', number: '1,234', label: 'Total Threads' },
    { icon: 'fas fa-reply', number: '15,678', label: 'Total Posts' },
    { icon: 'fas fa-users', number: '2,456', label: 'Members' },
    { icon: 'fas fa-clock', number: '24/7', label: 'Active' }
  ];

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  return (
    <ForumsContainer
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <Container>
        <ForumHeader variants={itemVariants}>
          <div className="header-icon">
            <i className="fas fa-comments"></i>
          </div>
          <h1>Community Forums</h1>
          <p>Connect with fellow adventurers, share strategies, and discuss everything Tower of Bedrock</p>
        </ForumHeader>

        <ForumStats variants={itemVariants}>
          {forumStats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon">
                <i className={stat.icon}></i>
              </div>
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </ForumStats>
        
        <CategoriesGrid>
          {forumCategories.map((category, index) => (
            <CategoryCard
              key={category.id}
              variants={itemVariants}
              as={Link}
              to={`/forums/${category.id}`}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3 }
              }}
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

        <RecentActivity variants={itemVariants}>
          <div className="activity-header">
            <h2>Recent Activity</h2>
            <Link to="/forums/recent" className="view-all">View All →</Link>
          </div>
          {recentActivity.map((activity, index) => (
            <ActivityItem
              key={index}
              variants={itemVariants}
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