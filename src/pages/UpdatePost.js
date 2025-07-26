import React from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const UpdateContainer = styled(motion.div)`
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
  
  .update-link {
    display: block;
    padding: 10px;
    margin-bottom: 8px;
    border-radius: 8px;
    text-decoration: none;
    color: #e0e0e0;
    transition: all 0.3s ease;
    font-family: 'Roboto', sans-serif;
    font-size: 0.9em;
    
    &:hover {
      background: rgba(255, 64, 129, 0.1);
      color: #ff4081;
      transform: translateX(5px);
    }
    
    .update-title {
      font-weight: 600;
      margin-bottom: 3px;
    }
    
    .update-date {
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

const UpdateHeader = styled(motion.div)`
  background: linear-gradient(135deg, rgba(40, 40, 60, 0.95), rgba(50, 50, 70, 0.95));
  border: 2px solid rgba(255, 64, 129, 0.4);
  border-radius: 20px;
  padding: 40px;
  margin-bottom: 30px;
  backdrop-filter: blur(20px);
  text-align: center;
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
  
  .update-badge {
    display: inline-block;
    background: linear-gradient(135deg, #ff4081, #e03570);
    color: white;
    padding: 8px 20px;
    border-radius: 20px;
    font-family: 'Roboto', sans-serif;
    font-size: 0.9em;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 20px;
    box-shadow: 0 0 15px rgba(255, 64, 129, 0.4);
  }
  
  h1 {
    font-family: 'Press Start 2P', cursive;
    font-size: clamp(1.5em, 4vw, 2.5em);
    color: #ff4081;
    margin-bottom: 20px;
    text-transform: uppercase;
    text-shadow: 0 0 10px rgba(255, 64, 129, 0.5);
    line-height: 1.3;
  }
  
  .update-meta {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
    flex-wrap: wrap;
    font-family: 'Roboto', sans-serif;
    font-size: clamp(0.9em, 2vw, 1em);
    color: #b0b0c0;
    
    .meta-item {
      display: flex;
      align-items: center;
      gap: 8px;
      
      i {
        color: #ff4081;
      }
    }
  }
`;

const UpdateContent = styled(motion.div)`
  background: rgba(40, 40, 60, 0.9);
  border: 1px solid rgba(255, 64, 129, 0.3);
  border-radius: 15px;
  padding: 40px;
  backdrop-filter: blur(10px);
  margin-bottom: 30px;
  
  .content-text {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(1em, 2.5vw, 1.1em);
    color: #e0e0e0;
    line-height: 1.8;
    
    h2 {
      font-family: 'Press Start 2P', cursive;
      font-size: clamp(1.2em, 3vw, 1.6em);
      color: #ff4081;
      margin: 30px 0 20px 0;
      text-transform: uppercase;
      
      &:first-child {
        margin-top: 0;
      }
    }
    
    h3 {
      font-family: 'Roboto', sans-serif;
      font-size: clamp(1.1em, 2.5vw, 1.3em);
      color: #ff4081;
      margin: 25px 0 15px 0;
      font-weight: 600;
    }
    
    p {
      margin-bottom: 20px;
      
      &:last-child {
        margin-bottom: 0;
      }
    }
    
    ul, ol {
      margin: 20px 0;
      padding-left: 30px;
      
      li {
        margin-bottom: 10px;
        color: #e0e0e0;
        
        &::marker {
          color: #ff4081;
        }
      }
    }
    
    blockquote {
      background: rgba(255, 64, 129, 0.1);
      border-left: 4px solid #ff4081;
      padding: 20px;
      margin: 25px 0;
      border-radius: 0 10px 10px 0;
      font-style: italic;
      color: #b0b0c0;
    }
    
    code {
      background: rgba(0, 0, 0, 0.3);
      padding: 3px 8px;
      border-radius: 5px;
      font-family: 'Courier New', monospace;
      color: #ff4081;
      font-size: 0.9em;
    }
    
    .highlight-box {
      background: linear-gradient(135deg, rgba(255, 64, 129, 0.2), rgba(255, 64, 129, 0.1));
      border: 1px solid rgba(255, 64, 129, 0.4);
      border-radius: 10px;
      padding: 20px;
      margin: 25px 0;
      
      .highlight-title {
        font-family: 'Roboto', sans-serif;
        font-size: 1.1em;
        color: #ff4081;
        font-weight: 600;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        gap: 8px;
        
        i {
          font-size: 1.2em;
        }
      }
    }
  }
`;

const ChangelogSection = styled.div`
  margin: 30px 0;
  
  .changelog-category {
    background: rgba(50, 50, 70, 0.5);
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 20px;
    
    .category-header {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 15px;
      
      i {
        font-size: 1.3em;
        color: #ff4081;
      }
      
      h4 {
        font-family: 'Roboto', sans-serif;
        font-size: 1.2em;
        color: #ff4081;
        margin: 0;
        font-weight: 600;
        text-transform: uppercase;
      }
    }
    
    ul {
      margin: 0;
      padding-left: 20px;
      
      li {
        margin-bottom: 8px;
        color: #e0e0e0;
        
        &.new {
          color: #4caf50;
          
          &::before {
            content: '+ ';
            font-weight: bold;
          }
        }
        
        &.improved {
          color: #2196f3;
          
          &::before {
            content: '~ ';
            font-weight: bold;
          }
        }
        
        &.fixed {
          color: #ff9800;
          
          &::before {
            content: '✓ ';
            font-weight: bold;
          }
        }
        
        &.removed {
          color: #f44336;
          text-decoration: line-through;
          
          &::before {
            content: '- ';
            font-weight: bold;
          }
        }
      }
    }
  }
`;

const UpdateFooter = styled(motion.div)`
  background: rgba(40, 40, 60, 0.9);
  border: 1px solid rgba(255, 64, 129, 0.3);
  border-radius: 15px;
  padding: 25px;
  backdrop-filter: blur(10px);
  text-align: center;
  
  .footer-text {
    font-family: 'Montserrat', sans-serif;
    font-size: 1em;
    color: #b0b0c0;
    margin-bottom: 20px;
  }
  
  .social-share {
    display: flex;
    justify-content: center;
    gap: 15px;
    
    button {
      background: rgba(255, 64, 129, 0.3);
      border: 1px solid rgba(255, 64, 129, 0.5);
      border-radius: 50%;
      width: 45px;
      height: 45px;
      color: #ff4081;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      
      &:hover {
        background: rgba(255, 64, 129, 0.5);
        transform: scale(1.1);
      }
      
      i {
        font-size: 1.2em;
      }
    }
  }
`;

const UpdatePost = () => {
  const { updateId } = useParams();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Mock update data - would come from API
  const updateData = {
    id: updateId,
    title: 'Patch 1.3 - "Floor 7 Unleashed"',
    version: '1.3.0',
    date: 'February 27, 2025',
    author: 'Tower of Bedrock Team',
    readTime: '5 min read',
    content: `
      We're excited to announce the release of Patch 1.3, bringing you the highly anticipated Floor 7 along with numerous improvements and bug fixes!
      
      ## 🔥 New Content
      
      ### Floor 7: The Nether Depths
      Venture into the most challenging floor yet! Floor 7 introduces a completely new biome with unique mechanics and terrifying enemies.
      
      **New Enemies:**
      - **Nether Wraiths** - Ghostly beings that phase through walls and deal fire damage
      - **Magma Golems** - Massive creatures that leave trails of lava
      - **Soul Reapers** - Fast-moving enemies that drain your energy on hit
      
      **New Boss: The Infernal Lord**
      A massive demon that commands the power of fire and shadow. This boss requires perfect coordination and timing to defeat.
      
      ### New Enchantments
      
      **Blaze Strike** - Your weapons ignite enemies, dealing fire damage over time
      - Level I: 2 fire damage per second for 3 seconds
      - Level II: 3 fire damage per second for 4 seconds  
      - Level III: 4 fire damage per second for 5 seconds
      
      **Frost Guard** - Reduces fire damage taken and slows nearby enemies
      - Level I: 25% fire resistance, 10% slow in 3 block radius
      - Level II: 40% fire resistance, 15% slow in 4 block radius
      - Level III: 60% fire resistance, 20% slow in 5 block radius
      
      ## ⚡ Improvements
      
      ### Combat System
      - Improved hit detection for better PvP experience
      - Reduced weapon swing delay by 0.1 seconds across all weapon types
      - Added visual feedback for critical hits
      - Balanced damage scaling for levels 80-100
      
      ### Guild System
      - Guild vaults now support up to 10 pages of items
      - Added guild activity logs to track member contributions
      - Guild leaders can now set custom ranks with specific permissions
      - Improved guild war matchmaking algorithm
      
      ### Quality of Life
      - Added quick-craft buttons for common items
      - Improved inventory sorting with custom categories
      - Added sound effects for enchanting and crafting
      - Enhanced particle effects for spell casting
      
      ## 🐛 Bug Fixes
      
      - Fixed issue where players could get stuck in Floor 6 boss room
      - Resolved energy regeneration not working properly after death
      - Fixed guild chat messages not displaying for some members
      - Corrected enchantment tooltips showing incorrect damage values
      - Fixed rare crash when opening large guild vaults
      - Resolved issue with PvP damage not calculating armor properly
      
      ## 🎯 Balance Changes
      
      ### Weapons
      - **Swords**: Increased base damage by 5% for levels 70+
      - **Axes**: Reduced swing speed by 0.05 seconds but increased damage by 8%
      - **Bows**: Improved arrow velocity and reduced drop-off at long range
      - **Staffs**: Increased mana efficiency by 15% for all spells
      
      ### Armor
      - **Heavy Armor**: Increased protection but reduced movement speed by 5%
      - **Light Armor**: Reduced protection by 3% but increased movement speed by 8%
      - **Robes**: Increased mana regeneration by 20% but reduced physical protection
      
      ## 🏆 Events
      
      To celebrate the release of Floor 7, we're hosting special events:
      
      **Double EXP Weekend** (March 1-3)
      - All experience gains doubled
      - Bonus rewards for Floor 7 completion
      
      **Nether Conquest Event** (March 5-12)  
      - Special achievements for Floor 7 milestones
      - Exclusive cosmetic rewards
      - Leaderboard competition with unique titles
      
      ## 🔮 What's Next?
      
      We're already working on the next major update which will include:
      - Floor 8: The Crystal Caverns
      - New crafting system with advanced recipes
      - Player housing and customization
      - Cross-server guild wars
      
      Thank you for your continued support and feedback. See you in the tower!
    `
  };

  const changelogData = [
    {
      category: 'New Features',
      icon: 'fas fa-plus',
      items: [
        { text: 'Floor 7: The Nether Depths with 3 new enemy types', type: 'new' },
        { text: 'New boss: The Infernal Lord', type: 'new' },
        { text: 'Blaze Strike enchantment for fire damage over time', type: 'new' },
        { text: 'Frost Guard enchantment for fire resistance', type: 'new' }
      ]
    },
    {
      category: 'Improvements',
      icon: 'fas fa-arrow-up',
      items: [
        { text: 'Enhanced hit detection system for PvP', type: 'improved' },
        { text: 'Reduced weapon swing delay by 0.1 seconds', type: 'improved' },
        { text: 'Guild vaults now support 10 pages of items', type: 'improved' },
        { text: 'Added visual feedback for critical hits', type: 'improved' }
      ]
    },
    {
      category: 'Bug Fixes',
      icon: 'fas fa-wrench',
      items: [
        { text: 'Fixed players getting stuck in Floor 6 boss room', type: 'fixed' },
        { text: 'Resolved energy regeneration issues after death', type: 'fixed' },
        { text: 'Fixed guild chat message display problems', type: 'fixed' },
        { text: 'Corrected enchantment tooltip damage values', type: 'fixed' }
      ]
    }
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
    <UpdateContainer
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <Container>
        <Breadcrumb variants={itemVariants}>
          <Link to="/">Home</Link>
          <span className="separator">›</span>
          <span className="current">{updateData.title}</span>
        </Breadcrumb>

        <ContentLayout>
          <MainContent>
            <UpdateHeader variants={itemVariants}>
              <div className="update-badge">Game Update</div>
              <h1>{updateData.title}</h1>
              <div className="update-meta">
                <div className="meta-item">
                  <i className="fas fa-calendar"></i>
                  <span>{updateData.date}</span>
                </div>
                <div className="meta-item">
                  <i className="fas fa-user"></i>
                  <span>{updateData.author}</span>
                </div>
                <div className="meta-item">
                  <i className="fas fa-clock"></i>
                  <span>{updateData.readTime}</span>
                </div>
                <div className="meta-item">
                  <i className="fas fa-tag"></i>
                  <span>Version {updateData.version}</span>
                </div>
              </div>
            </UpdateHeader>

            <UpdateContent variants={itemVariants}>
          <div className="content-text">
            {updateData.content.split('\n').map((paragraph, index) => {
              if (!paragraph.trim()) return <br key={index} />;
              
              if (paragraph.startsWith('## ')) {
                return <h2 key={index}>{paragraph.slice(3)}</h2>;
              }
              
              if (paragraph.startsWith('### ')) {
                return <h3 key={index}>{paragraph.slice(4)}</h3>;
              }
              
              if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                return (
                  <div key={index} className="highlight-box">
                    <div className="highlight-title">
                      <i className="fas fa-star"></i>
                      {paragraph.slice(2, -2)}
                    </div>
                  </div>
                );
              }
              
              if (paragraph.startsWith('- **') && paragraph.includes('** - ')) {
                const parts = paragraph.split('** - ');
                const boldText = parts[0].slice(4); // Remove '- **'
                const normalText = parts[1];
                return (
                  <li key={index}>
                    <strong style={{ color: '#ff4081' }}>{boldText}</strong> - {normalText}
                  </li>
                );
              }
              
              if (paragraph.startsWith('- ')) {
                return <li key={index}>{paragraph.slice(2)}</li>;
              }
              
              // Handle inline bold text
              if (paragraph.includes('**')) {
                const parts = paragraph.split(/(\*\*[^*]+\*\*)/g);
                return (
                  <p key={index}>
                    {parts.map((part, partIndex) => {
                      if (part.startsWith('**') && part.endsWith('**')) {
                        return <strong key={partIndex} style={{ color: '#ff4081' }}>{part.slice(2, -2)}</strong>;
                      }
                      return part;
                    })}
                  </p>
                );
              }
              
              return <p key={index}>{paragraph}</p>;
            })}
          </div>

          <ChangelogSection>
            {changelogData.map((section, index) => (
              <div key={index} className="changelog-category">
                <div className="category-header">
                  <i className={section.icon}></i>
                  <h4>{section.category}</h4>
                </div>
                <ul>
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className={item.type}>
                      {item.text}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </ChangelogSection>
        </UpdateContent>

            <UpdateFooter variants={itemVariants}>
              <div className="footer-text">
                Share this update with your guild members and friends!
              </div>
              <div className="social-share">
                <button title="Share on Discord">
                  <i className="fab fa-discord"></i>
                </button>
                <button title="Share on Twitter">
                  <i className="fab fa-twitter"></i>
                </button>
                <button title="Share on Reddit">
                  <i className="fab fa-reddit"></i>
                </button>
                <button title="Copy Link">
                  <i className="fas fa-link"></i>
                </button>
              </div>
            </UpdateFooter>
          </MainContent>

          <Sidebar>
            <SidebarCard variants={itemVariants}>
              <h3>Recent Updates</h3>
              <Link to="/updates/patch-1-3" className="update-link">
                <div className="update-title">Patch 1.3 - Floor 7 Unleashed</div>
                <div className="update-date">Feb 27, 2025</div>
              </Link>
              <Link to="/updates/patch-1-2" className="update-link">
                <div className="update-title">Patch 1.2 - Guild Wars</div>
                <div className="update-date">Feb 15, 2025</div>
              </Link>
              <Link to="/updates/patch-1-1" className="update-link">
                <div className="update-title">Patch 1.1 - Combat Overhaul</div>
                <div className="update-date">Feb 1, 2025</div>
              </Link>
              <Link to="/updates/patch-1-0" className="update-link">
                <div className="update-title">Patch 1.0 - Launch Day</div>
                <div className="update-date">Jan 15, 2025</div>
              </Link>
            </SidebarCard>

            <SidebarCard variants={itemVariants}>
              <h3>Quick Links</h3>
              <Link to="/forums" className="quick-link">
                <i className="fas fa-comments"></i>
                Discuss Update
              </Link>
              <Link to="/wiki" className="quick-link">
                <i className="fas fa-book"></i>
                Game Guide
              </Link>
              <Link to="/forums/bug-reports" className="quick-link">
                <i className="fas fa-bug"></i>
                Report Bugs
              </Link>
              <Link to="/forums/suggestions" className="quick-link">
                <i className="fas fa-lightbulb"></i>
                Suggestions
              </Link>
            </SidebarCard>

            <SidebarCard variants={itemVariants}>
              <h3>Update Stats</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9em' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#b0b0c0' }}>
                  <span>Version:</span>
                  <span style={{ color: '#ff4081', fontWeight: '600' }}>{updateData.version}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#b0b0c0' }}>
                  <span>Release Date:</span>
                  <span style={{ color: '#ff4081', fontWeight: '600' }}>{updateData.date}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#b0b0c0' }}>
                  <span>Read Time:</span>
                  <span style={{ color: '#ff4081', fontWeight: '600' }}>{updateData.readTime}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#b0b0c0' }}>
                  <span>Type:</span>
                  <span style={{ color: '#4caf50', fontWeight: '600' }}>Major Update</span>
                </div>
              </div>
            </SidebarCard>
          </Sidebar>
        </ContentLayout>
      </Container>
    </UpdateContainer>
  );
};

export default UpdatePost;