import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const StoreContainer = styled(motion.div)`
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

const StoreHeader = styled(motion.div)`
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

const StoreGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StoreItem = styled(motion.div)`
  background: rgba(40, 40, 60, 0.9);
  padding: 25px;
  border-radius: 15px;
  border: 2px solid rgba(255, 64, 129, 0.4);
  text-align: center;
  position: relative;
  overflow: hidden;
  min-height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(255, 64, 129, 0.3);
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
  
  i.fa-gem {
    font-size: clamp(2.5em, 6vw, 3.5em);
    color: #ff4081;
    margin-bottom: 10px;
    transition: transform 0.3s ease;
    text-shadow: 0 0 15px rgba(255, 64, 129, 0.5);
  }
  
  &:hover i.fa-gem {
    transform: rotate(10deg) scale(1.1);
  }
  
  h3 {
    font-family: 'Roboto', sans-serif;
    font-size: clamp(1.2em, 3vw, 1.4em);
    color: #ff4081;
    margin-bottom: 10px;
    font-weight: 600;
    text-transform: uppercase;
  }
  
  p {
    font-size: clamp(0.9em, 2vw, 1em);
    color: #b0b0c0;
    margin-bottom: 15px;
    line-height: 1.5;
  }
  
  .price {
    font-family: 'Roboto', sans-serif;
    font-size: clamp(1.4em, 3vw, 1.8em);
    color: #e0e0e0;
    font-weight: 700;
    margin-bottom: 15px;
    text-shadow: 0 0 5px rgba(255, 64, 129, 0.3);
  }
  
  .original-price {
    text-decoration: line-through;
    color: #888;
    font-size: 0.8em;
    margin-right: 10px;
  }
  
  .sale-badge {
    position: absolute;
    top: 15px;
    right: 15px;
    background: #ff4081;
    color: white;
    padding: 5px 10px;
    border-radius: 15px;
    font-size: 0.8em;
    font-weight: 600;
    text-transform: uppercase;
  }
`;

const PurchaseButton = styled(motion.button)`
  padding: clamp(10px, 2vw, 12px) clamp(25px, 4vw, 30px);
  background: rgba(255, 64, 129, 0.3);
  color: #ff4081;
  border: 1px solid rgba(255, 64, 129, 0.5);
  border-radius: 20px;
  font-family: 'Roboto', sans-serif;
  font-size: clamp(1em, 2.5vw, 1.2em);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  
  &:hover {
    background: rgba(255, 64, 129, 0.5);
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(255, 64, 129, 0.4);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const ComingSoon = styled(motion.div)`
  background: rgba(40, 40, 60, 0.9);
  padding: 40px;
  border-radius: 15px;
  border: 2px solid rgba(255, 64, 129, 0.4);
  text-align: center;
  margin-top: 40px;
  backdrop-filter: blur(10px);
  
  h2 {
    font-family: 'Press Start 2P', cursive;
    font-size: clamp(1.2em, 3vw, 1.6em);
    color: #ff4081;
    margin-bottom: 20px;
    text-transform: uppercase;
  }
  
  p {
    font-size: clamp(1em, 2.5vw, 1.2em);
    color: #b0b0c0;
    font-weight: 500;
  }
`;

const Store = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const storeItems = [
    {
      title: 'Starter Pack',
      description: 'Perfect for new players! Includes basic gear, 500 coins, and 7 days of premium benefits.',
      price: '$4.99',
      originalPrice: null,
      onSale: false
    },
    {
      title: 'Gem Bundle',
      description: 'Get 1000 gems to purchase premium items, enchantments, and exclusive cosmetics.',
      price: '$9.99',
      originalPrice: '$12.99',
      onSale: true
    },
    {
      title: 'Premium Rank',
      description: 'Unlock exclusive areas, double XP, priority queue, and special chat colors.',
      price: '$19.99',
      originalPrice: null,
      onSale: false
    },
    {
      title: 'Legendary Weapon',
      description: 'Pre-enchanted legendary sword with unique abilities and glowing effects.',
      price: '$14.99',
      originalPrice: '$19.99',
      onSale: true
    },
    {
      title: 'Guild Boost',
      description: 'Boost your entire guild with 2x resources, faster energy regeneration for 30 days.',
      price: '$24.99',
      originalPrice: null,
      onSale: false
    },
    {
      title: 'Ultimate Pack',
      description: 'Everything you need! Premium rank, 2000 gems, legendary gear, and exclusive cosmetics.',
      price: '$39.99',
      originalPrice: '$59.99',
      onSale: true
    },
    {
      title: 'VIP Membership',
      description: 'Monthly subscription with exclusive perks, daily rewards, and priority support access.',
      price: '$9.99/month',
      originalPrice: null,
      onSale: false
    },
    {
      title: 'Cosmetic Bundle',
      description: 'Exclusive skins, particle effects, and custom titles to make your character stand out.',
      price: '$7.99',
      originalPrice: '$12.99',
      onSale: true
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
    <StoreContainer
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <Container>
        <StoreHeader variants={itemVariants}>
          <div className="header-icon">
            <i className="fas fa-shopping-cart"></i>
          </div>
          <h1>Tower Store</h1>
          <p>Support the server and enhance your adventure with premium items!</p>
        </StoreHeader>

        <StoreGrid>
          {storeItems.map((item, index) => (
            <StoreItem
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
            >
              {item.onSale && <div className="sale-badge">Sale!</div>}
              <i className="fas fa-gem"></i>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className="price">
                {item.originalPrice && (
                  <span className="original-price">{item.originalPrice}</span>
                )}
                {item.price}
              </div>
              <PurchaseButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Purchase Now
              </PurchaseButton>
            </StoreItem>
          ))}
        </StoreGrid>


      </Container>
    </StoreContainer>
  );
};

export default Store;