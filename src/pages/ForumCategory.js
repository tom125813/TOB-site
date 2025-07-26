import React from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const CategoryContainer = styled(motion.div)`
  min-height: 100vh;
  padding: 180px 20px 60px;
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMjHxIGmVAAAAMElEQVQYV2NgoBJwcnJyanJycvL///8/AQwMTEwsLCwsLCwsLCwsLCwsLCwsLCwsDI4GAV8HAFrpV3gAAAAASUVORK5CYII=') repeat;
  background-size: 16px 16px;
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 clamp(20px, 5vw, 50px);
`;

const ContentLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 30px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const MainContent = styled.div`
  min-width: 0;
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  
  @media (max-width: 1024px) {
    order: -1;
  }
`;

const SidebarCard = styled(motion.div)`
  background: rgba(40, 40, 60, 0.9);
  border: 1px solid rgba(255, 64, 129, 0.3);
  border-radius: 12px;
  padding: 20px;
  backdrop-filter: blur(10px);
  
  h3 {
    font-family: 'Press Start 2P', cursive;
    font-size: 0.9em;
    color: #ff4081;
    margin-bottom: 15px;
    text-transform: uppercase;
  }
  
  .category-link {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    margin-bottom: 8px;
    border-radius: 8px;
    text-decoration: none;
    color: #e0e0e0;
    transition: all 0.3s ease;
    
    &:hover {
      background: rgba(255, 64, 129, 0.1);
      color: #ff4081;
      transform: translateX(5px);
    }
    
    i {
      font-size: 1.1em;
      color: #ff4081;
      width: 20px;
      text-align: center;
    }
    
    .category-name {
      font-family: 'Roboto', sans-serif;
      font-size: 0.9em;
      font-weight: 500;
    }
    
    .thread-count {
      margin-left: auto;
      font-size: 0.8em;
      color: #b0b0c0;
    }
  }
  
  .quick-link {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 10px;
    margin-bottom: 5px;
    border-radius: 6px;
    text-decoration: none;
    color: #b0b0c0;
    font-family: 'Roboto', sans-serif;
    font-size: 0.9em;
    transition: all 0.3s ease;
    
    &:hover {
      background: rgba(255, 64, 129, 0.1);
      color: #ff4081;
    }
    
    i {
      font-size: 1em;
      color: #ff4081;
      width: 16px;
      text-align: center;
    }
  }
`;

const Breadcrumb = styled(motion.div)`
  margin-bottom: 20px;
  font-family: 'Roboto', sans-serif;
  font-size: clamp(0.9em, 2vw, 1em);
  
  a {
    color: #b0b0c0;
    text-decoration: none;
    transition: color 0.3s ease;
    
    &:hover {
      color: #ff4081;
    }
  }
  
  .separator {
    margin: 0 10px;
    color: #ff4081;
  }
  
  .current {
    color: #ff4081;
    font-weight: 600;
  }
`;

const CategoryHeader = styled(motion.div)`
  background: linear-gradient(135deg, rgba(40, 40, 60, 0.9), rgba(50, 50, 70, 0.9));
  border: 2px solid rgba(255, 64, 129, 0.3);
  border-radius: 15px;
  padding: 30px;
  margin-bottom: 30px;
  backdrop-filter: blur(10px);
  
  .header-content {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    
    i {
      font-size: 2.5em;
      color: #ff4081;
      margin-right: 20px;
      text-shadow: 0 0 15px rgba(255, 64, 129, 0.5);
    }
    
    h1 {
      font-family: 'Press Start 2P', cursive;
      font-size: clamp(1.5em, 4vw, 2.2em);
      color: #ff4081;
      margin: 0;
      text-transform: uppercase;
    }
  }
  
  .description {
    font-size: clamp(1em, 2.5vw, 1.2em);
    color: #b0b0c0;
    margin-bottom: 20px;
    line-height: 1.6;
  }
  
  .stats {
    display: flex;
    gap: 30px;
    font-family: 'Roboto', sans-serif;
    
    .stat {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #e0e0e0;
      font-weight: 600;
      
      i {
        font-size: 1.2em;
        color: #ff4081;
        margin: 0;
      }
    }
  }
`;

const ThreadsContainer = styled(motion.div)`
  background: rgba(40, 40, 60, 0.9);
  border: 1px solid rgba(255, 64, 129, 0.3);
  border-radius: 15px;
  overflow: hidden;
  backdrop-filter: blur(10px);
`;

const ThreadsHeader = styled.div`
  background: rgba(50, 50, 70, 0.9);
  padding: 15px 20px;
  border-bottom: 1px solid rgba(255, 64, 129, 0.3);
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  h2 {
    font-family: 'Roboto', sans-serif;
    font-size: clamp(1.1em, 2.5vw, 1.3em);
    color: #ff4081;
    margin: 0;
    font-weight: 600;
    text-transform: uppercase;
  }
  
  .sort-options {
    display: flex;
    gap: 15px;
    font-size: clamp(0.8em, 2vw, 0.9em);
    
    button {
      background: none;
      border: none;
      color: #b0b0c0;
      cursor: pointer;
      transition: color 0.3s ease;
      font-family: 'Roboto', sans-serif;
      
      &:hover, &.active {
        color: #ff4081;
      }
    }
  }
`;

const ThreadItem = styled(motion.div)`
  display: flex;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid rgba(255, 64, 129, 0.2);
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    background: rgba(50, 50, 70, 0.9);
    transform: translateX(5px);
    box-shadow: inset 5px 0 0 rgba(255, 64, 129, 0.5);
  }
  
  &:last-child {
    border-bottom: none;
  }
  
  .thread-icon {
    font-size: 1.5em;
    color: #ff4081;
    margin-right: 15px;
    min-width: 30px;
    text-align: center;
  }
  
  .thread-content {
    flex: 1;
    
    .thread-title {
      font-family: 'Roboto', sans-serif;
      font-size: clamp(1em, 2.5vw, 1.2em);
      color: #ff4081;
      margin-bottom: 5px;
      font-weight: 600;
      text-decoration: none;
      
      &:hover {
        text-decoration: underline;
      }
    }
    
    .thread-meta {
      font-size: clamp(0.8em, 2vw, 0.9em);
      color: #b0b0c0;
      
      .author {
        color: #ff4081;
        font-weight: 500;
        text-decoration: none;
        
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
  
  .thread-stats {
    display: flex;
    gap: 20px;
    text-align: center;
    font-family: 'Roboto', sans-serif;
    font-size: clamp(0.8em, 2vw, 0.9em);
    
    .stat {
      display: flex;
      flex-direction: column;
      
      .number {
        color: #ff4081;
        font-weight: 600;
        font-size: 1.1em;
      }
      
      .label {
        color: #b0b0c0;
        font-size: 0.8em;
        text-transform: uppercase;
      }
    }
  }
  
  .last-post {
    text-align: right;
    font-size: clamp(0.8em, 2vw, 0.9em);
    color: #e0e0e0;
    min-width: 120px;
    
    .time {
      color: #b0b0c0;
      display: block;
      margin-top: 2px;
    }
  }
`;

const CreateThreadButton = styled(motion.button)`
  position: fixed;
  bottom: 30px;
  right: 30px;
  background: linear-gradient(135deg, #ff4081, #e03570);
  border: none;
  border-radius: 50px;
  padding: 15px 25px;
  color: white;
  font-family: 'Roboto', sans-serif;
  font-weight: 600;
  font-size: 1em;
  cursor: pointer;
  box-shadow: 0 5px 20px rgba(255, 64, 129, 0.4);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 10px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 64, 129, 0.6);
  }
  
  i {
    font-size: 1.2em;
  }
`;

const ForumCategory = () => {
  const { categoryId } = useParams();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Mock data - would come from API
  const categoryData = {
    'announcements': {
      icon: 'fas fa-bullhorn',
      title: 'Announcements',
      description: 'Official server news, updates, and important information from the Tower of Bedrock team.',
      threads: 15,
      posts: 234,
      followers: 1250
    },
    'general': {
      icon: 'fas fa-comments',
      title: 'General Discussion',
      description: 'General chat about Tower of Bedrock, Minecraft, and community discussions.',
      threads: 456,
      posts: 2341,
      followers: 890
    },
    'guides': {
      icon: 'fas fa-book',
      title: 'Guides & Tutorials',
      description: 'Player-created guides, tutorials, and helpful tips for Tower of Bedrock.',
      threads: 89,
      posts: 567,
      followers: 445
    }
  };

  const threads = [
    {
      id: 1,
      title: 'Welcome to Tower of Bedrock - Read This First!',
      author: 'Admin',
      replies: 45,
      views: 1250,
      lastPost: 'Admin',
      lastPostTime: '2 hours ago',
      isPinned: true,
      isLocked: false
    },
    {
      id: 2,
      title: 'Server Rules and Guidelines - Updated Feb 2025',
      author: 'Moderator',
      replies: 12,
      views: 890,
      lastPost: 'PlayerName',
      lastPostTime: '5 hours ago',
      isPinned: true,
      isLocked: true
    },
    {
      id: 3,
      title: 'Floor 7 Strategy Discussion - Share Your Tips!',
      author: 'DragonSlayer99',
      replies: 23,
      views: 567,
      lastPost: 'GuildMaster',
      lastPostTime: '1 hour ago',
      isPinned: false,
      isLocked: false
    },
    {
      id: 4,
      title: 'Best Enchantments for PvP Combat',
      author: 'PvPKing',
      replies: 67,
      views: 2100,
      lastPost: 'WarriorX',
      lastPostTime: '3 hours ago',
      isPinned: false,
      isLocked: false
    },
    {
      id: 5,
      title: 'Guild Wars Event - This Weekend!',
      author: 'EventManager',
      replies: 34,
      views: 1567,
      lastPost: 'GuildLeader',
      lastPostTime: '30 minutes ago',
      isPinned: false,
      isLocked: false
    }
  ];

  const category = categoryData[categoryId] || categoryData['general'];

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
    <CategoryContainer
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <Container>
        <Breadcrumb variants={itemVariants}>
          <Link to="/forums">Forums</Link>
          <span className="separator">›</span>
          <span className="current">{category.title}</span>
        </Breadcrumb>

        <ContentLayout>
          <MainContent>
            <CategoryHeader variants={itemVariants}>
              <div className="header-content">
                <i className={category.icon}></i>
                <h1>{category.title}</h1>
              </div>
              <p className="description">{category.description}</p>
              <div className="stats">
                <div className="stat">
                  <i className="fas fa-comments"></i>
                  <span>{category.threads} threads</span>
                </div>
                <div className="stat">
                  <i className="fas fa-reply"></i>
                  <span>{category.posts} posts</span>
                </div>
                <div className="stat">
                  <i className="fas fa-users"></i>
                  <span>{category.followers} followers</span>
                </div>
              </div>
            </CategoryHeader>

            <ThreadsContainer variants={itemVariants}>
              <ThreadsHeader>
                <h2>Threads</h2>
                <div className="sort-options">
                  <button className="active">Latest</button>
                  <button>Popular</button>
                  <button>Most Replies</button>
                </div>
              </ThreadsHeader>

              {threads.map((thread, index) => (
                <ThreadItem
                  key={thread.id}
                  variants={itemVariants}
                  as={Link}
                  to={`/forums/${categoryId}/${thread.id}`}
                  whileHover={{ 
                    x: 5,
                    transition: { duration: 0.2 }
                  }}
                >
                  <div className="thread-icon">
                    {thread.isPinned ? (
                      <i className="fas fa-thumbtack"></i>
                    ) : thread.isLocked ? (
                      <i className="fas fa-lock"></i>
                    ) : (
                      <i className="fas fa-comment"></i>
                    )}
                  </div>
                  
                  <div className="thread-content">
                    <div className="thread-title">{thread.title}</div>
                    <div className="thread-meta">
                      Started by <Link to={`/profile/${thread.author}`} className="author">{thread.author}</Link>
                    </div>
                  </div>
                  
                  <div className="thread-stats">
                    <div className="stat">
                      <span className="number">{thread.replies}</span>
                      <span className="label">Replies</span>
                    </div>
                    <div className="stat">
                      <span className="number">{thread.views}</span>
                      <span className="label">Views</span>
                    </div>
                  </div>
                  
                  <div className="last-post">
                    <Link to={`/profile/${thread.lastPost}`}>{thread.lastPost}</Link>
                    <span className="time">{thread.lastPostTime}</span>
                  </div>
                </ThreadItem>
              ))}
            </ThreadsContainer>
          </MainContent>

          <Sidebar>
            <SidebarCard variants={itemVariants}>
              <h3>Categories</h3>
              <Link to="/forums/announcements" className="category-link">
                <i className="fas fa-bullhorn"></i>
                <span className="category-name">Announcements</span>
                <span className="thread-count">15</span>
              </Link>
              <Link to="/forums/general" className="category-link">
                <i className="fas fa-comments"></i>
                <span className="category-name">General Discussion</span>
                <span className="thread-count">456</span>
              </Link>
              <Link to="/forums/guides" className="category-link">
                <i className="fas fa-book-open"></i>
                <span className="category-name">Guides & Tutorials</span>
                <span className="thread-count">89</span>
              </Link>
              <Link to="/forums/guild-recruitment" className="category-link">
                <i className="fas fa-users"></i>
                <span className="category-name">Guild Recruitment</span>
                <span className="thread-count">123</span>
              </Link>
              <Link to="/forums/suggestions" className="category-link">
                <i className="fas fa-lightbulb"></i>
                <span className="category-name">Suggestions</span>
                <span className="thread-count">67</span>
              </Link>
              <Link to="/forums/bug-reports" className="category-link">
                <i className="fas fa-bug"></i>
                <span className="category-name">Bug Reports</span>
                <span className="thread-count">34</span>
              </Link>
            </SidebarCard>

            <SidebarCard variants={itemVariants}>
              <h3>Quick Links</h3>
              <Link to="/forums/recent" className="quick-link">
                <i className="fas fa-clock"></i>
                Recent Activity
              </Link>
              <Link to="/forums/popular" className="quick-link">
                <i className="fas fa-fire"></i>
                Popular Threads
              </Link>
              <Link to="/forums/unanswered" className="quick-link">
                <i className="fas fa-question-circle"></i>
                Unanswered
              </Link>
              <Link to="/forums/search" className="quick-link">
                <i className="fas fa-search"></i>
                Search Forums
              </Link>
              <Link to="/profile" className="quick-link">
                <i className="fas fa-user"></i>
                My Profile
              </Link>
              <Link to="/forums/subscriptions" className="quick-link">
                <i className="fas fa-bell"></i>
                Subscriptions
              </Link>
            </SidebarCard>

            <SidebarCard variants={itemVariants}>
              <h3>Forum Stats</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9em' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#b0b0c0' }}>
                  <span>Total Threads:</span>
                  <span style={{ color: '#ff4081', fontWeight: '600' }}>1,234</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#b0b0c0' }}>
                  <span>Total Posts:</span>
                  <span style={{ color: '#ff4081', fontWeight: '600' }}>15,678</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#b0b0c0' }}>
                  <span>Members:</span>
                  <span style={{ color: '#ff4081', fontWeight: '600' }}>2,456</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#b0b0c0' }}>
                  <span>Online Now:</span>
                  <span style={{ color: '#4caf50', fontWeight: '600' }}>87</span>
                </div>
              </div>
            </SidebarCard>
          </Sidebar>
        </ContentLayout>
      </Container>

      <CreateThreadButton
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <i className="fas fa-plus"></i>
        New Thread
      </CreateThreadButton>
    </CategoryContainer>
  );
};

export default ForumCategory;