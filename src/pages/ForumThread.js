import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ThreadContainer = styled(motion.div)`
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
  position: sticky;
  top: 160px;
  height: fit-content;
  
  @media (max-width: 1024px) {
    position: static;
    order: 1;
  }
`;

const SidebarCard = styled(motion.div)`
  background: linear-gradient(135deg, rgba(25, 25, 40, 0.95), rgba(35, 35, 55, 0.95));
  border: 1px solid rgba(255, 64, 129, 0.2);
  border-radius: 12px;
  padding: 20px;
  backdrop-filter: blur(15px);
  
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

const ThreadHeader = styled(motion.div)`
  background: linear-gradient(135deg, rgba(40, 40, 60, 0.9), rgba(50, 50, 70, 0.9));
  border: 2px solid rgba(255, 64, 129, 0.3);
  border-radius: 15px;
  padding: 25px;
  margin-bottom: 20px;
  backdrop-filter: blur(10px);
  
  h1 {
    font-family: 'Roboto', sans-serif;
    font-size: clamp(1.3em, 3vw, 1.8em);
    color: #ff4081;
    margin-bottom: 15px;
    font-weight: 600;
    line-height: 1.3;
  }
  
  .thread-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 15px;
    font-family: 'Roboto', sans-serif;
    font-size: clamp(0.9em, 2vw, 1em);
    color: #b0b0c0;
    
    .author-info {
      display: flex;
      align-items: center;
      gap: 10px;
      
      .author {
        color: #ff4081;
        font-weight: 600;
      }
    }
    
    .thread-stats {
      display: flex;
      gap: 20px;
      
      .stat {
        display: flex;
        align-items: center;
        gap: 5px;
        
        i {
          color: #ff4081;
        }
      }
    }
  }
`;

const PostsContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 30px;
`;

const PostItem = styled(motion.div)`
  background: rgba(40, 40, 60, 0.9);
  border: 1px solid rgba(255, 64, 129, 0.3);
  border-radius: 15px;
  overflow: hidden;
  backdrop-filter: blur(10px);
`;

const PostHeader = styled.div`
  background: rgba(50, 50, 70, 0.9);
  padding: 15px 20px;
  border-bottom: 1px solid rgba(255, 64, 129, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  .user-info {
    display: flex;
    align-items: center;
    gap: 15px;
    
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
      font-size: 1.2em;
    }
    
    .user-details {
      .username {
        font-family: 'Roboto', sans-serif;
        font-size: 1.1em;
        color: #ff4081;
        font-weight: 600;
        margin-bottom: 2px;
        text-decoration: none;
        
        &:hover {
          text-decoration: underline;
        }
      }
      
      .user-rank {
        font-size: 0.8em;
        color: #b0b0c0;
        text-transform: uppercase;
      }
    }
  }
  
  .post-meta {
    text-align: right;
    font-size: 0.9em;
    color: #b0b0c0;
    
    .post-number {
      color: #ff4081;
      font-weight: 600;
    }
  }
`;

const PostContent = styled.div`
  padding: 20px;
  
  .post-text {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(0.9em, 2vw, 1em);
    color: #e0e0e0;
    line-height: 1.6;
    margin-bottom: 15px;
    
    p {
      margin-bottom: 15px;
      
      &:last-child {
        margin-bottom: 0;
      }
    }
    
    blockquote {
      background: rgba(255, 64, 129, 0.1);
      border-left: 4px solid #ff4081;
      padding: 10px 15px;
      margin: 15px 0;
      font-style: italic;
      color: #b0b0c0;
    }
    
    code {
      background: rgba(0, 0, 0, 0.3);
      padding: 2px 6px;
      border-radius: 4px;
      font-family: 'Courier New', monospace;
      color: #ff4081;
    }
  }
  
  .post-actions {
    display: flex;
    gap: 15px;
    padding-top: 15px;
    border-top: 1px solid rgba(255, 64, 129, 0.2);
    
    button {
      background: none;
      border: none;
      color: #b0b0c0;
      cursor: pointer;
      font-family: 'Roboto', sans-serif;
      font-size: 0.9em;
      display: flex;
      align-items: center;
      gap: 5px;
      transition: color 0.3s ease;
      
      &:hover {
        color: #ff4081;
      }
      
      i {
        font-size: 1em;
      }
    }
  }
`;

const ReplyForm = styled(motion.div)`
  background: rgba(40, 40, 60, 0.9);
  border: 2px solid rgba(255, 64, 129, 0.3);
  border-radius: 15px;
  padding: 25px;
  backdrop-filter: blur(10px);
  
  h3 {
    font-family: 'Roboto', sans-serif;
    font-size: 1.3em;
    color: #ff4081;
    margin-bottom: 20px;
    font-weight: 600;
  }
  
  .form-group {
    margin-bottom: 20px;
    
    textarea {
      width: 100%;
      min-height: 120px;
      background: rgba(50, 50, 70, 0.9);
      border: 1px solid rgba(255, 64, 129, 0.3);
      border-radius: 10px;
      padding: 15px;
      color: #e0e0e0;
      font-family: 'Montserrat', sans-serif;
      font-size: 1em;
      resize: vertical;
      transition: border-color 0.3s ease;
      
      &:focus {
        outline: none;
        border-color: rgba(255, 64, 129, 0.6);
      }
      
      &::placeholder {
        color: #b0b0c0;
      }
    }
  }
  
  .form-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    .formatting-help {
      font-size: 0.9em;
      color: #b0b0c0;
      
      a {
        color: #ff4081;
        text-decoration: none;
        
        &:hover {
          text-decoration: underline;
        }
      }
    }
    
    button {
      background: linear-gradient(135deg, #ff4081, #e03570);
      border: none;
      border-radius: 25px;
      padding: 12px 25px;
      color: white;
      font-family: 'Roboto', sans-serif;
      font-weight: 600;
      font-size: 1em;
      cursor: pointer;
      transition: all 0.3s ease;
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(255, 64, 129, 0.4);
      }
      
      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none;
        box-shadow: none;
      }
    }
  }
`;

const ForumThread = () => {
  const { categoryId, threadId } = useParams();
  const [replyText, setReplyText] = useState('');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Mock data - would come from API
  const threadData = {
    title: 'Floor 7 Strategy Discussion - Share Your Tips!',
    author: 'DragonSlayer99',
    createdAt: '2 days ago',
    replies: 23,
    views: 567,
    isLocked: false,
    isPinned: false
  };

  const posts = [
    {
      id: 1,
      author: 'DragonSlayer99',
      rank: 'Veteran Player',
      avatar: 'D',
      content: `Hey everyone! I've been working on Floor 7 for weeks now and finally found some strategies that work consistently. 

The Nether Wraiths are definitely the toughest enemies we've faced so far, but here's what I've learned:

**Key Tips:**
- Always bring Fire Resistance potions
- Use weapons with Ice enchantments to slow them down  
- Stay mobile - their fire attacks have a 3-second charge time
- Work in teams of 3-4 for best results

What strategies have you all been using? I'd love to hear your experiences!`,
      timestamp: '2 days ago',
      postNumber: '#1'
    },
    {
      id: 2,
      author: 'GuildMaster',
      rank: 'Guild Leader',
      avatar: 'G',
      content: `Great tips @DragonSlayer99! Our guild has been using a similar approach but we also found that having a dedicated healer makes a huge difference.

We've been running with this composition:
- 2 DPS with Ice weapons
- 1 Tank with high Fire Protection
- 1 Support/Healer

The key is coordination - when the Wraiths start their fire attack, everyone needs to spread out immediately.`,
      timestamp: '1 day ago',
      postNumber: '#2'
    },
    {
      id: 3,
      author: 'PvPKing',
      rank: 'Elite Fighter',
      avatar: 'P',
      content: `I've been soloing Floor 7 and it's definitely possible but requires perfect timing. 

The trick is to use the environment - there are ice crystals scattered around that you can break to create temporary safe zones. Also, the Blaze Strike enchantment actually works against you here since it gives them fire resistance!

Anyone know if the drop rates are better when soloing vs group play?`,
      timestamp: '18 hours ago',
      postNumber: '#3'
    }
  ];

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (replyText.trim()) {
      // Handle reply submission
      console.log('Reply submitted:', replyText);
      setReplyText('');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.2 }
    }
  };

  return (
    <ThreadContainer
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <Container>
        <Breadcrumb variants={itemVariants}>
          <Link to="/forums">Forums</Link>
          <span className="separator">›</span>
          <Link to={`/forums/${categoryId}`}>General Discussion</Link>
          <span className="separator">›</span>
          <span className="current">{threadData.title}</span>
        </Breadcrumb>

        <ContentLayout>
          <MainContent>
            <ThreadHeader variants={itemVariants}>
              <h1>{threadData.title}</h1>
              <div className="thread-meta">
                <div className="author-info">
                  Started by <Link to={`/profile/${threadData.author}`} className="author">{threadData.author}</Link> • {threadData.createdAt}
                </div>
                <div className="thread-stats">
                  <div className="stat">
                    <i className="fas fa-reply"></i>
                    <span>{threadData.replies} replies</span>
                  </div>
                  <div className="stat">
                    <i className="fas fa-eye"></i>
                    <span>{threadData.views} views</span>
                  </div>
                </div>
              </div>
            </ThreadHeader>

            <PostsContainer>
              {posts.map((post, index) => (
                <PostItem
                  key={post.id}
                  variants={itemVariants}
                >
              <PostHeader>
                <div className="user-info">
                  <div className="avatar">{post.avatar}</div>
                  <div className="user-details">
                    <Link to={`/profile/${post.author}`} className="username">{post.author}</Link>
                    <div className="user-rank">{post.rank}</div>
                  </div>
                </div>
                <div className="post-meta">
                  <div className="post-number">{post.postNumber}</div>
                  <div>{post.timestamp}</div>
                </div>
              </PostHeader>
              
              <PostContent>
                <div className="post-text">
                  {post.content.split('\n').map((paragraph, i) => {
                    if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                      return <h4 key={i} style={{color: '#ff4081', margin: '15px 0 10px'}}>{paragraph.slice(2, -2)}</h4>;
                    }
                    if (paragraph.startsWith('- ')) {
                      return <li key={i} style={{marginLeft: '20px', marginBottom: '5px'}}>{paragraph.slice(2)}</li>;
                    }
                    return paragraph ? <p key={i}>{paragraph}</p> : <br key={i} />;
                  })}
                </div>
                
                <div className="post-actions">
                  <button>
                    <i className="fas fa-thumbs-up"></i>
                    Like
                  </button>
                  <button>
                    <i className="fas fa-reply"></i>
                    Quote
                  </button>
                  <button>
                    <i className="fas fa-flag"></i>
                    Report
                  </button>
                </div>
              </PostContent>
            </PostItem>
          ))}
        </PostsContainer>

        {!threadData.isLocked && (
          <ReplyForm variants={itemVariants}>
            <h3>Post a Reply</h3>
            <form onSubmit={handleReplySubmit}>
              <div className="form-group">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Share your thoughts, strategies, or ask questions..."
                  required
                />
              </div>
              <div className="form-actions">
                <div className="formatting-help">
                  <a href="#">Formatting help</a>
                </div>
                <button type="submit" disabled={!replyText.trim()}>
                  Post Reply
                </button>
              </div>
            </form>
          </ReplyForm>
        )}
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
            </SidebarCard>

            <SidebarCard variants={itemVariants}>
              <h3>Thread Stats</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9em' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#b0b0c0' }}>
                  <span>Replies:</span>
                  <span style={{ color: '#ff4081', fontWeight: '600' }}>{threadData.replies}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#b0b0c0' }}>
                  <span>Views:</span>
                  <span style={{ color: '#ff4081', fontWeight: '600' }}>{threadData.views}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#b0b0c0' }}>
                  <span>Created:</span>
                  <span style={{ color: '#ff4081', fontWeight: '600' }}>{threadData.createdAt}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#b0b0c0' }}>
                  <span>Status:</span>
                  <span style={{ color: threadData.isLocked ? '#f44336' : '#4caf50', fontWeight: '600' }}>
                    {threadData.isLocked ? 'Locked' : 'Active'}
                  </span>
                </div>
              </div>
            </SidebarCard>
          </Sidebar>
        </ContentLayout>
      </Container>
    </ThreadContainer>
  );
};

export default ForumThread;