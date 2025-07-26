import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const FooterContainer = styled(motion.footer)`
  background: linear-gradient(135deg, rgba(20, 20, 35, 0.98), rgba(30, 30, 50, 0.98));
  border-top: 3px solid #ff4081;
  position: relative;
  z-index: 1;
  backdrop-filter: blur(15px);
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMjHxIGmVAAAAMElEQVQYV2NgoBJwcnJyanJycvL///8/AQwMTEwsLCwsLCwsLCwsLCwsLCwsLCwsDI4GAV8HAFrpV3gAAAAASUVORK5CYII=') repeat;
    background-size: 16px 16px;
    opacity: 0.1;
    z-index: -1;
  }
`;

const FooterContent = styled.div`
  padding: 30px 40px 15px;
  
  @media (max-width: 768px) {
    padding: 30px 20px 15px;
  }
`;

const FooterTop = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 40px;
  margin-bottom: 30px;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 25px;
  }
`;

const FooterSection = styled(motion.div)`
  h3 {
    font-family: 'Press Start 2P', cursive;
    font-size: clamp(0.9em, 2vw, 1.1em);
    color: #ff4081;
    text-transform: uppercase;
    margin-bottom: 20px;
    text-shadow: 0 0 10px rgba(255, 64, 129, 0.3);
  }
  
  p {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(0.9em, 2vw, 1em);
    color: #b0b0c0;
    line-height: 1.6;
    margin-bottom: 15px;
  }
  
  ul {
    list-style: none;
    padding: 0;
    
    li {
      margin-bottom: 12px;
      
      a {
        color: #e0e0e0;
        text-decoration: none;
        font-family: 'Roboto', sans-serif;
        font-size: clamp(0.9em, 2vw, 1em);
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 8px;
        
        &:hover {
          color: #ff4081;
          transform: translateX(5px);
        }
        
        i {
          font-size: 0.9em;
          width: 16px;
        }
      }
    }
  }
`;

const ServerInfo = styled.div`
  background: rgba(50, 50, 70, 0.8);
  padding: 20px;
  border-radius: 10px;
  border: 1px solid rgba(255, 64, 129, 0.3);
  margin-bottom: 20px;
  
  .server-ip {
    display: flex;
    align-items: center;
    gap: 10px;
    background: rgba(255, 64, 129, 0.2);
    padding: 10px 15px;
    border-radius: 8px;
    margin-bottom: 15px;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      background: rgba(255, 64, 129, 0.3);
      transform: scale(1.02);
    }
    
    span {
      font-family: 'Orbitron', sans-serif;
      color: #ff4081;
      font-weight: 600;
      font-size: clamp(0.9em, 2vw, 1em);
    }
    
    i {
      color: #ff4081;
      cursor: pointer;
    }
  }
  
  .server-stats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    font-size: 0.9em;
    
    .stat {
      display: flex;
      justify-content: space-between;
      color: #b0b0c0;
      
      .value {
        color: #ff4081;
        font-weight: 600;
      }
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 45px;
    height: 45px;
    background: rgba(255, 64, 129, 0.2);
    border: 1px solid rgba(255, 64, 129, 0.4);
    border-radius: 50%;
    color: #ff4081;
    font-size: 1.3em;
    transition: all 0.3s ease;
    
    &:hover {
      background: rgba(255, 64, 129, 0.4);
      transform: scale(1.1) rotate(5deg);
      box-shadow: 0 0 20px rgba(255, 64, 129, 0.5);
    }
    
    &.discord:hover { color: #7289da; }
    &.twitter:hover { color: #1da1f2; }
    &.youtube:hover { color: #ff0000; }
    &.reddit:hover { color: #ff4500; }
    &.instagram:hover { color: #e4405f; }
    &.tiktok:hover { color: #000000; }
  }
`;

const Newsletter = styled.div`
  background: rgba(255, 64, 129, 0.1);
  padding: 20px;
  border-radius: 10px;
  border: 1px solid rgba(255, 64, 129, 0.3);
  margin-bottom: 20px;
  
  .newsletter-form {
    display: flex;
    gap: 10px;
    margin-top: 15px;
    
    input {
      flex: 1;
      padding: 12px 15px;
      background: rgba(40, 40, 60, 0.9);
      border: 1px solid rgba(255, 64, 129, 0.3);
      border-radius: 8px;
      color: #e0e0e0;
      font-family: 'Roboto', sans-serif;
      font-size: 0.9em;
      
      &::placeholder {
        color: #b0b0c0;
      }
      
      &:focus {
        outline: none;
        border-color: #ff4081;
        box-shadow: 0 0 10px rgba(255, 64, 129, 0.3);
      }
    }
    
    button {
      padding: 12px 20px;
      background: linear-gradient(135deg, #ff4081, #e03570);
      border: none;
      border-radius: 8px;
      color: white;
      font-family: 'Roboto', sans-serif;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      white-space: nowrap;
      min-width: fit-content;
      
      &:hover {
        transform: scale(1.05);
        box-shadow: 0 0 15px rgba(255, 64, 129, 0.5);
      }
    }
    
    @media (max-width: 480px) {
      flex-direction: column;
    }
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid rgba(255, 64, 129, 0.3);
  padding-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Copyright = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: clamp(0.8em, 2vw, 0.9em);
  color: #b0b0c0;
  
  .tagline {
    display: block;
    margin-top: 5px;
    font-style: italic;
    color: #ff4081;
    font-weight: 600;
  }
`;

const LegalLinks = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  
  a {
    color: #b0b0c0;
    text-decoration: none;
    font-family: 'Roboto', sans-serif;
    font-size: 0.9em;
    transition: color 0.3s ease;
    
    &:hover {
      color: #ff4081;
    }
  }
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const Footer = () => {
  const copyServerIP = () => {
    navigator.clipboard.writeText('play.towerofbedrock.com');
    // You could add a notification here
  };

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

  return (
    <FooterContainer
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <FooterContent>
        <FooterTop>
          <FooterSection variants={itemVariants}>
            <h3>Tower of Bedrock</h3>
            <p>
              The ultimate Minecraft MMORPG experience. Climb the tower, forge legendary gear, 
              and become a legend in the most immersive Minecraft server ever created.
            </p>
            <ServerInfo>
              <div className="server-ip" onClick={copyServerIP}>
                <span>play.towerofbedrock.com</span>
                <i className="fas fa-copy"></i>
              </div>
              <div className="server-stats">
                <div className="stat">
                  <span>Status:</span>
                  <span className="value">Online</span>
                </div>
                <div className="stat">
                  <span>Players:</span>
                  <span className="value">87/100</span>
                </div>
                <div className="stat">
                  <span>Version:</span>
                  <span className="value">1.20.1</span>
                </div>
                <div className="stat">
                  <span>Uptime:</span>
                  <span className="value">99.9%</span>
                </div>
              </div>
            </ServerInfo>
          </FooterSection>

          <FooterSection variants={itemVariants}>
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/"><i className="fas fa-home"></i> Home</Link></li>
              <li><Link to="/forums"><i className="fas fa-comments"></i> Forums</Link></li>
              <li><Link to="/wiki"><i className="fas fa-book"></i> Wiki</Link></li>
              <li><Link to="/store"><i className="fas fa-shopping-cart"></i> Store</Link></li>
              <li><Link to="/leaderboards"><i className="fas fa-trophy"></i> Leaderboards</Link></li>
              <li><Link to="/stats"><i className="fas fa-chart-bar"></i> Statistics</Link></li>
            </ul>
          </FooterSection>

          <FooterSection variants={itemVariants}>
            <h3>Game Features</h3>
            <ul>
              <li><a href="#"><i className="fas fa-layer-group"></i> 10+ Unique Floors</a></li>
              <li><a href="#"><i className="fas fa-users"></i> Guild System</a></li>
              <li><a href="#"><i className="fas fa-magic"></i> Custom Enchantments</a></li>
              <li><a href="#"><i className="fas fa-sword"></i> PvP & PvE Combat</a></li>
              <li><a href="#"><i className="fas fa-dragon"></i> Epic Boss Fights</a></li>
              <li><a href="#"><i className="fas fa-gem"></i> Rare Loot System</a></li>
            </ul>
          </FooterSection>

          <FooterSection variants={itemVariants}>
            <h3>Community</h3>
            <SocialLinks>
              <a href="#" className="discord" aria-label="Discord">
                <i className="fab fa-discord"></i>
              </a>
              <a href="#" className="twitter" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="youtube" aria-label="YouTube">
                <i className="fab fa-youtube"></i>
              </a>

              <a href="#" className="instagram" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="tiktok" aria-label="TikTok">
                <i className="fab fa-tiktok"></i>
              </a>
            </SocialLinks>
            
            <div style={{ marginTop: '25px' }}>
              <Newsletter>
                <p><strong>Stay Updated</strong></p>
                <p>Get the latest news, updates, and exclusive content delivered to your inbox.</p>
                <div className="newsletter-form">
                  <input type="email" placeholder="Enter your email..." />
                  <button type="submit">Subscribe</button>
                </div>
              </Newsletter>
            </div>
          </FooterSection>
        </FooterTop>

        <FooterBottom>
          <Copyright>
            © 2025 Tower of Bedrock. All rights reserved.
            <span className="tagline">Forge your legend. Conquer the tower.</span>
          </Copyright>
          
          <LegalLinks>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">EULA</a>
            <a href="#">Support</a>
            <a href="#">Contact</a>
          </LegalLinks>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;