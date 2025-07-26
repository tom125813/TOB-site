import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const WikiContainer = styled(motion.div)`
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

const WikiHeader = styled(motion.div)`
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
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
`;

const ContentLayout = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 30px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: sticky;
  top: 120px;
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
`;

const CategoryItem = styled.div`
  margin-bottom: 8px;
  
  .category-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    background: ${props => props.expanded ? 'rgba(255, 64, 129, 0.1)' : 'transparent'};
    
    &:hover {
      background: rgba(255, 64, 129, 0.1);
      transform: translateX(5px);
    }
    
    .category-info {
      display: flex;
      align-items: center;
      gap: 10px;
      
      i {
        font-size: 1.1em;
        color: #ff4081;
        width: 20px;
        text-align: center;
      }
      
      .category-name {
        font-family: 'Roboto', sans-serif;
        font-size: 0.9em;
        color: #e0e0e0;
        font-weight: 500;
      }
    }
    
    .expand-icon {
      color: #ff4081;
      font-size: 0.8em;
      transition: transform 0.3s ease;
      transform: ${props => props.expanded ? 'rotate(90deg)' : 'rotate(0deg)'};
    }
  }
  
  .subcategories {
    margin-left: 30px;
    margin-top: 8px;
    
    .subcategory-link {
      display: block;
      padding: 6px 10px;
      margin-bottom: 4px;
      border-radius: 6px;
      text-decoration: none;
      color: #b0b0c0;
      font-family: 'Roboto', sans-serif;
      font-size: 0.85em;
      transition: all 0.3s ease;
      
      &:hover {
        background: rgba(255, 64, 129, 0.1);
        color: #ff4081;
        transform: translateX(5px);
      }
    }
  }
`;

const MainContent = styled.div`
  min-width: 0;
`;

const WikiGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 25px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const WikiItem = styled(motion.div)`
  background: rgba(40, 40, 60, 0.9);
  padding: 20px;
  border-radius: 10px;
  border: 1px solid rgba(255, 64, 129, 0.3);
  transition: all 0.3s ease;
  cursor: pointer;
  text-align: center;
  aspect-ratio: 1 / 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(10px);
  
  &:hover {
    transform: translateY(-5px);
    background: rgba(50, 50, 70, 0.9);
    box-shadow: 0 10px 30px rgba(255, 64, 129, 0.3);
  }
  
  i {
    font-size: clamp(2em, 10vw, 3em);
    color: #ff4081;
    margin-bottom: 15px;
    transition: transform 0.3s ease;
  }
  
  &:hover i {
    transform: scale(1.1) rotate(10deg);
  }
  
  h3 {
    font-family: 'Roboto', sans-serif;
    font-size: clamp(1em, 2.5vw, 1.2em);
    color: #ff4081;
    margin-bottom: 10px;
    font-weight: 600;
  }
  
  p {
    font-size: clamp(0.8em, 2vw, 0.9em);
    color: #b0b0c0;
    margin: 0;
  }
`;

const SubWikiContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const SubWikiContent = styled(motion.div)`
  background: rgba(40, 40, 60, 0.95);
  padding: 40px;
  border-radius: 15px;
  border: 2px solid rgba(255, 64, 129, 0.4);
  max-width: 800px;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  backdrop-filter: blur(20px);
  
  .close-btn {
    position: absolute;
    top: 15px;
    right: 20px;
    background: none;
    border: none;
    color: #ff4081;
    font-size: 1.5em;
    cursor: pointer;
    transition: transform 0.3s ease;
    
    &:hover {
      transform: scale(1.2);
    }
  }
  
  h3 {
    font-family: 'Press Start 2P', cursive;
    font-size: clamp(1.2em, 3vw, 1.6em);
    color: #ff4081;
    margin-bottom: 20px;
    text-transform: uppercase;
  }
  
  p {
    font-size: clamp(0.9em, 2vw, 1.1em);
    color: #e0e0e0;
    margin-bottom: 15px;
    line-height: 1.6;
  }
  
  ul {
    margin-left: 20px;
    margin-bottom: 15px;
    
    li {
      color: #b0b0c0;
      margin-bottom: 8px;
      font-size: clamp(0.9em, 2vw, 1em);
    }
  }
`;

const BackButton = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: rgba(255, 64, 129, 0.3);
  border-radius: 20px;
  border: 1px solid rgba(255, 64, 129, 0.5);
  color: #ff4081;
  font-family: 'Roboto', sans-serif;
  font-size: clamp(0.9em, 2vw, 1em);
  cursor: pointer;
  margin-bottom: 20px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 64, 129, 0.5);
    transform: scale(1.05);
  }
  
  i {
    font-size: clamp(1em, 2vw, 1.2em);
  }
`;

const Wiki = () => {
  const [selectedWiki, setSelectedWiki] = useState(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const wikiItems = [
    {
      icon: 'fas fa-play',
      title: 'Getting Started',
      description: 'New player guide',
      content: {
        title: 'Getting Started Guide',
        sections: [
          'Welcome to Tower of Bedrock! This guide will help you begin your journey.',
          'First, join the server using: play.towerofbedrock.com',
          'Key starting tips:',
          '• Start mining on Floor 1 to gather basic resources',
          '• Craft your first weapon and armor',
          '• Join a guild for protection and shared resources',
          '• Complete daily quests for bonus experience',
          '• Save up energy for enchanting your gear'
        ]
      }
    },
    {
      icon: 'fas fa-building',
      title: 'Floor Guide',
      description: 'All floor layouts',
      content: {
        title: 'Floor Guide',
        sections: [
          'Tower of Bedrock features 10+ unique floors, each with increasing difficulty.',
          'Floor 1-3: Basic mobs, coal and iron resources',
          'Floor 4-6: Stronger enemies, gold and diamond drops',
          'Floor 7-9: Elite mobs, rare enchanting materials',
          'Floor 10+: Boss floors with legendary loot',
          'Each floor requires a minimum level to access safely.'
        ]
      }
    },
    {
      icon: 'fas fa-fist-raised',
      title: 'Combat System',
      description: 'PvP & PvE mechanics',
      content: {
        title: 'Combat System',
        sections: [
          'Tower of Bedrock features both PvE and PvP combat.',
          'PvE Combat:',
          '• Fight mobs on each floor for loot and experience',
          '• Use different weapon types for various advantages',
          '• Learn mob attack patterns to avoid damage',
          'PvP Combat:',
          '• Challenge other players in designated areas',
          '• Guild wars and outpost battles',
          '• Ranking system based on PvP performance'
        ]
      }
    },
    {
      icon: 'fas fa-magic',
      title: 'Enchanting',
      description: 'Weapon & armor upgrades',
      content: {
        title: 'Enchanting System',
        sections: [
          'Enhance your gear with powerful enchantments using Energy.',
          'Common Enchantments:',
          '• Sharpness - Increases weapon damage',
          '• Protection - Reduces incoming damage',
          '• Efficiency - Faster mining speed',
          'Rare Enchantments:',
          '• Blaze Strike - Fire damage on hit',
          '• Frost Bite - Slows enemies',
          '• Energy costs increase with enchantment level'
        ]
      }
    },
    {
      icon: 'fas fa-users',
      title: 'Guild System',
      description: 'Teams & cooperation',
      content: {
        title: 'Guild System',
        sections: [
          'Join forces with other players in powerful guilds.',
          'Guild Benefits:',
          '• Shared vault for resources',
          '• Group raids and expeditions',
          '• Guild-only areas and bonuses',
          '• Protection from enemy players',
          'Guild Activities:',
          '• Weekly guild wars',
          '• Outpost conquests',
          '• Collaborative building projects'
        ]
      }
    },
    {
      icon: 'fas fa-coins',
      title: 'Economy',
      description: 'Trading & marketplace',
      content: {
        title: 'Economy Guide',
        sections: [
          'Tower of Bedrock features a player-driven economy.',
          'Currency Types:',
          '• Coins - Earned from quests and mob kills',
          '• Gems - Premium currency for special items',
          '• Energy - Used for enchanting and crafting',
          'Trading:',
          '• Player-to-player trading',
          '• Auction house for rare items',
          '• Guild marketplace for members'
        ]
      }
    },
    {
      icon: 'fas fa-hammer',
      title: 'Crafting',
      description: 'Item creation guide',
      content: {
        title: 'Crafting System',
        sections: [
          'Create powerful items using gathered resources.',
          'Crafting Stations:',
          '• Forge - Create weapons and armor',
          '• Enchanting Table - Add magical properties',
          '• Alchemy Lab - Brew potions and elixirs',
          'Advanced Crafting:',
          '• Combine rare materials for legendary items',
          '• Guild crafting for exclusive recipes',
          '• Seasonal crafting events with unique rewards'
        ]
      }
    },
    {
      icon: 'fas fa-trophy',
      title: 'Achievements',
      description: 'Goals & rewards',
      content: {
        title: 'Achievement System',
        sections: [
          'Complete challenges to earn rewards and recognition.',
          'Achievement Categories:',
          '• Combat - Defeat enemies and bosses',
          '• Exploration - Discover new areas',
          '• Social - Guild and community activities',
          '• Collection - Gather rare items and resources',
          'Rewards include experience, coins, titles, and exclusive items.'
        ]
      }
    },
    {
      icon: 'fas fa-shield-alt',
      title: 'PvP System',
      description: 'Player vs Player combat',
      content: {
        title: 'PvP Combat System',
        sections: [
          'Engage in thrilling player vs player combat across designated areas.',
          'PvP Zones:',
          '• Arena - Structured 1v1 and team battles',
          '• Open World - Free-for-all combat areas',
          '• Guild Wars - Large scale guild battles',
          'PvP Features:',
          '• Ranking system with seasonal rewards',
          '• Special PvP-only enchantments and gear',
          '• Tournament events with exclusive prizes'
        ]
      }
    },
    {
      icon: 'fas fa-map',
      title: 'World Map',
      description: 'Explore the tower',
      content: {
        title: 'Tower Navigation',
        sections: [
          'Navigate through the massive Tower of Bedrock with multiple floors and areas.',
          'Floor Types:',
          '• Combat Floors - Battle monsters and bosses',
          '• Safe Zones - Rest areas with shops and NPCs',
          '• Special Events - Limited-time challenge floors',
          'Navigation Tips:',
          '• Use waypoints to mark important locations',
          '• Floor teleporters for quick travel',
          '• Mini-map shows nearby players and objectives'
        ]
      }
    },
    {
      icon: 'fas fa-bolt',
      title: 'Energy System',
      description: 'Power & regeneration',
      content: {
        title: 'Energy Management',
        sections: [
          'Energy is the core resource used for enchanting, crafting, and special abilities.',
          'Energy Sources:',
          '• Natural regeneration over time',
          '• Energy potions and consumables',
          '• Guild bonuses and premium benefits',
          'Energy Uses:',
          '• Enchanting weapons and armor',
          '• Crafting advanced items',
          '• Activating special abilities and spells'
        ]
      }
    },
    {
      icon: 'fas fa-calendar-alt',
      title: 'Events',
      description: 'Special activities',
      content: {
        title: 'Server Events',
        sections: [
          'Participate in exciting server-wide events for exclusive rewards.',
          'Event Types:',
          '• Double XP Weekends - Increased experience gains',
          '• Boss Rush Events - Face multiple bosses in succession',
          '• Guild Competitions - Compete with other guilds',
          '• Seasonal Events - Holiday-themed activities',
          'Event Rewards:',
          '• Exclusive cosmetic items and titles',
          '• Rare enchanting materials',
          '• Limited-time achievements'
        ]
      }
    },
    {
      icon: 'fas fa-cog',
      title: 'Settings',
      description: 'Game configuration',
      content: {
        title: 'Game Settings',
        sections: [
          'Customize your Tower of Bedrock experience with various settings.',
          'Display Settings:',
          '• UI scale and positioning',
          '• Chat and notification preferences',
          '• Performance optimization options',
          'Gameplay Settings:',
          '• Auto-pickup and sorting options',
          '• Combat assistance features',
          '• Social and privacy controls'
        ]
      }
    },
    {
      icon: 'fas fa-map',
      title: 'World Map',
      description: 'Explore the tower',
      content: {
        title: 'Tower Navigation',
        sections: [
          'Navigate through the massive Tower of Bedrock with our comprehensive map system.',
          'Floor Types:',
          '• Mining Floors - Rich in resources and ores',
          '• Combat Floors - Filled with dangerous enemies',
          '• Puzzle Floors - Require strategy and teamwork',
          '• Boss Floors - Epic encounters with powerful foes',
          'Each floor has unique mechanics, secrets, and rewards to discover.'
        ]
      }
    },
    {
      icon: 'fas fa-cog',
      title: 'Game Settings',
      description: 'Customize your experience',
      content: {
        title: 'Game Configuration',
        sections: [
          'Customize your Tower of Bedrock experience with various settings.',
          'Available Options:',
          '• Graphics settings for optimal performance',
          '• Audio controls for music and sound effects',
          '• Keybind customization for better gameplay',
          '• UI scaling and interface preferences',
          '• Notification settings for guild and game events',
          'Access settings through the main menu or use /settings command.'
        ]
      }
    },

  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
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

  const [expandedCategories, setExpandedCategories] = useState({});

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const wikiCategories = [
    {
      id: 'getting-started',
      name: 'Getting Started',
      icon: 'fas fa-play',
      subcategories: [
        { name: 'First Steps', link: '/wiki/getting-started/first-steps' },
        { name: 'Server Rules', link: '/wiki/getting-started/rules' },
        { name: 'Basic Commands', link: '/wiki/getting-started/commands' }
      ]
    },
    {
      id: 'gameplay',
      name: 'Gameplay',
      icon: 'fas fa-gamepad',
      subcategories: [
        { name: 'Floor Guide', link: '/wiki/gameplay/floors' },
        { name: 'Combat System', link: '/wiki/gameplay/combat' },
        { name: 'Leveling Guide', link: '/wiki/gameplay/leveling' }
      ]
    },
    {
      id: 'systems',
      name: 'Game Systems',
      icon: 'fas fa-cogs',
      subcategories: [
        { name: 'Enchanting', link: '/wiki/systems/enchanting' },
        { name: 'Crafting', link: '/wiki/systems/crafting' },
        { name: 'Economy', link: '/wiki/systems/economy' }
      ]
    },
    {
      id: 'guilds',
      name: 'Guilds',
      icon: 'fas fa-users',
      subcategories: [
        { name: 'Creating a Guild', link: '/wiki/guilds/creating' },
        { name: 'Guild Wars', link: '/wiki/guilds/wars' },
        { name: 'Guild Benefits', link: '/wiki/guilds/benefits' }
      ]
    },
    {
      id: 'items',
      name: 'Items & Equipment',
      icon: 'fas fa-shield-alt',
      subcategories: [
        { name: 'Weapons', link: '/wiki/items/weapons' },
        { name: 'Armor', link: '/wiki/items/armor' },
        { name: 'Rare Items', link: '/wiki/items/rare' }
      ]
    }
  ];

  return (
    <WikiContainer
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <Container>
        <WikiHeader variants={itemVariants}>
          <div className="header-icon">
            <i className="fas fa-book"></i>
          </div>
          <h1>Knowledge Base</h1>
          <p>Everything you need to know about Tower of Bedrock</p>
        </WikiHeader>

        <ContentLayout>
          <Sidebar>
            <SidebarCard variants={itemVariants}>
              <h3>Categories</h3>
              {wikiCategories.map((category) => (
                <CategoryItem key={category.id} expanded={expandedCategories[category.id]}>
                  <div 
                    className="category-header"
                    onClick={() => toggleCategory(category.id)}
                  >
                    <div className="category-info">
                      <i className={category.icon}></i>
                      <span className="category-name">{category.name}</span>
                    </div>
                    <i className="fas fa-chevron-right expand-icon"></i>
                  </div>
                  <AnimatePresence>
                    {expandedCategories[category.id] && (
                      <motion.div
                        className="subcategories"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {category.subcategories.map((sub, index) => (
                          <Link key={index} to={sub.link} className="subcategory-link">
                            {sub.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CategoryItem>
              ))}
            </SidebarCard>

            <SidebarCard variants={itemVariants}>
              <h3>Quick Links</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Link to="/wiki/search" style={{ color: '#b0b0c0', textDecoration: 'none', padding: '8px 10px', borderRadius: '6px', transition: 'all 0.3s ease' }}>
                  <i className="fas fa-search" style={{ marginRight: '8px', color: '#ff4081' }}></i>
                  Search Wiki
                </Link>
                <Link to="/wiki/recent" style={{ color: '#b0b0c0', textDecoration: 'none', padding: '8px 10px', borderRadius: '6px', transition: 'all 0.3s ease' }}>
                  <i className="fas fa-clock" style={{ marginRight: '8px', color: '#ff4081' }}></i>
                  Recent Updates
                </Link>
                <Link to="/wiki/popular" style={{ color: '#b0b0c0', textDecoration: 'none', padding: '8px 10px', borderRadius: '6px', transition: 'all 0.3s ease' }}>
                  <i className="fas fa-fire" style={{ marginRight: '8px', color: '#ff4081' }}></i>
                  Popular Pages
                </Link>
              </div>
            </SidebarCard>
          </Sidebar>

          <MainContent>
            <WikiGrid variants={itemVariants}>
              {wikiItems.map((item, index) => (
                <WikiItem
                  key={index}
                  variants={itemVariants}
                  onClick={() => setSelectedWiki(item)}
                  whileHover={{ 
                    y: -5,
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className={item.icon}></i>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </WikiItem>
              ))}
            </WikiGrid>
          </MainContent>
        </ContentLayout>
      </Container>

      <AnimatePresence>
        {selectedWiki && (
          <SubWikiContainer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setSelectedWiki(null);
              }
            }}
          >
            <SubWikiContent
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button 
                className="close-btn"
                onClick={() => setSelectedWiki(null)}
              >
                <i className="fas fa-times"></i>
              </button>
              
              <h3>{selectedWiki.content.title}</h3>
              {selectedWiki.content.sections.map((section, index) => {
                if (section.startsWith('•')) {
                  return (
                    <ul key={index}>
                      <li>{section.substring(2)}</li>
                    </ul>
                  );
                }
                return <p key={index}>{section}</p>;
              })}
            </SubWikiContent>
          </SubWikiContainer>
        )}
      </AnimatePresence>
    </WikiContainer>
  );
};

export default Wiki;