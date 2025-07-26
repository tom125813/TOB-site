import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useApp } from '../context/AppContext';

const LoginContainer = styled(motion.div)`
  min-height: 100vh;
  padding: 140px 20px 60px;
  background: linear-gradient(135deg, #0f0f19 0%, #1a1a2e 100%);
  display: flex;
  align-items: center;
  justify-content: center;
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

const LoginCard = styled(motion.div)`
  background: linear-gradient(135deg, rgba(25, 25, 40, 0.98), rgba(35, 35, 55, 0.98));
  border: 1px solid rgba(255, 64, 129, 0.3);
  border-radius: 24px;
  padding: 50px;
  width: 100%;
  max-width: 480px;
  backdrop-filter: blur(25px);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(255, 64, 129, 0.05), transparent);
    border-radius: 24px;
    z-index: -1;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, #ff4081, #e03570, #ff4081);
    border-radius: 26px;
    z-index: -2;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::after {
    opacity: 0.3;
    animation: rotate 3s linear infinite;
  }
  
  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const LoginHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
  
  .login-icon {
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, #ff4081, #e03570);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 25px;
    box-shadow: 0 0 30px rgba(255, 64, 129, 0.4);
    
    i {
      font-size: 2.2em;
      color: white;
    }
  }
  
  h1 {
    font-family: 'Press Start 2P', cursive;
    font-size: clamp(1.4em, 4vw, 1.8em);
    color: #ff4081;
    margin-bottom: 15px;
    text-transform: uppercase;
    text-shadow: 0 0 15px rgba(255, 64, 129, 0.5);
    background: linear-gradient(45deg, #ff4081, #e03570, #ff4081);
    background-size: 200% 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: gradientShift 3s ease infinite;
  }
  
  p {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(1em, 2vw, 1.1em);
    color: #b0b0c0;
    font-weight: 500;
    line-height: 1.5;
  }
  
  @keyframes gradientShift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  
  label {
    font-family: 'Roboto', sans-serif;
    font-size: 0.9em;
    color: #e0e0e0;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  
  input {
    background: rgba(50, 50, 70, 0.9);
    border: 1px solid rgba(255, 64, 129, 0.3);
    border-radius: 10px;
    padding: 15px;
    color: #e0e0e0;
    font-family: 'Montserrat', sans-serif;
    font-size: 1em;
    transition: all 0.3s ease;
    
    &:focus {
      outline: none;
      border-color: rgba(255, 64, 129, 0.6);
      box-shadow: 0 0 10px rgba(255, 64, 129, 0.3);
    }
    
    &::placeholder {
      color: #b0b0c0;
    }
  }
  
  .error {
    color: #f44336;
    font-size: 0.8em;
    margin-top: 5px;
  }
`;

const LoginButton = styled(motion.button)`
  background: linear-gradient(135deg, #ff4081, #e03570);
  border: none;
  border-radius: 25px;
  padding: 15px;
  color: white;
  font-family: 'Roboto', sans-serif;
  font-weight: 600;
  font-size: 1.1em;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: 10px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 64, 129, 0.4);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const SocialLogin = styled.div`
  margin: 30px 0;
  
  .divider {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    
    &::before,
    &::after {
      content: '';
      flex: 1;
      height: 1px;
      background: rgba(255, 64, 129, 0.3);
    }
    
    span {
      margin: 0 15px;
      color: #b0b0c0;
      font-size: 0.9em;
      text-transform: uppercase;
      font-weight: 600;
    }
  }
  
  .social-buttons {
    display: flex;
    gap: 15px;
    
    button {
      flex: 1;
      background: rgba(50, 50, 70, 0.9);
      border: 1px solid rgba(255, 64, 129, 0.3);
      border-radius: 10px;
      padding: 12px;
      color: #e0e0e0;
      font-family: 'Roboto', sans-serif;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      
      &:hover {
        border-color: rgba(255, 64, 129, 0.6);
        background: rgba(60, 60, 80, 0.9);
      }
      
      i {
        font-size: 1.2em;
      }
      
      &.discord {
        color: #5865f2;
      }
      
      &.google {
        color: #ea4335;
      }
    }
  }
`;

const LoginFooter = styled.div`
  text-align: center;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 64, 129, 0.3);
  
  p {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.9em;
    color: #b0b0c0;
    margin-bottom: 10px;
  }
  
  a {
    color: #ff4081;
    text-decoration: none;
    font-weight: 600;
    transition: color 0.3s ease;
    
    &:hover {
      color: #e03570;
      text-decoration: underline;
    }
  }
`;

const RememberMe = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
  
  label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: 'Montserrat', sans-serif;
    font-size: 0.9em;
    color: #e0e0e0;
    cursor: pointer;
    text-transform: none;
    letter-spacing: normal;
    
    input[type="checkbox"] {
      width: auto;
      margin: 0;
    }
  }
  
  a {
    color: #ff4081;
    text-decoration: none;
    font-size: 0.9em;
    transition: color 0.3s ease;
    
    &:hover {
      color: #e03570;
      text-decoration: underline;
    }
  }
`;

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { actions } = useApp();
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful login
      actions.setUser({
        id: 1,
        username: formData.username,
        email: 'user@example.com',
        rank: 'Player',
        level: 45,
        guild: 'The Ascendants'
      });
      
      actions.addNotification({
        type: 'success',
        title: 'Login Successful',
        message: `Welcome back, ${formData.username}!`
      });
      
      // Redirect would happen here
      
    } catch (error) {
      actions.addNotification({
        type: 'error',
        title: 'Login Failed',
        message: 'Invalid username or password'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    actions.addNotification({
      type: 'info',
      title: 'Coming Soon',
      message: `${provider} login will be available soon!`
    });
  };

  return (
    <LoginContainer
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
    >
      <LoginCard
        initial={{ y: 50, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <LoginHeader>
          <div className="login-icon">
            <i className="fas fa-sign-in-alt"></i>
          </div>
          <h1>Welcome Back</h1>
          <p>Sign in to your Tower of Bedrock account</p>
        </LoginHeader>

        <LoginForm onSubmit={handleSubmit}>
          <FormGroup>
            <label htmlFor="username">Username or Email</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Enter your username or email"
              disabled={isLoading}
            />
            {errors.username && <div className="error">{errors.username}</div>}
          </FormGroup>

          <FormGroup>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              disabled={isLoading}
            />
            {errors.password && <div className="error">{errors.password}</div>}
          </FormGroup>

          <RememberMe>
            <label>
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                disabled={isLoading}
              />
              Remember me
            </label>
            <Link to="/forgot-password">Forgot password?</Link>
          </RememberMe>

          <LoginButton
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </LoginButton>
        </LoginForm>

        <SocialLogin>
          <div className="divider">
            <span>Or continue with</span>
          </div>
          <div className="social-buttons">
            <button 
              type="button" 
              className="discord"
              onClick={() => handleSocialLogin('Discord')}
            >
              <i className="fab fa-discord"></i>
              Discord
            </button>
            <button 
              type="button" 
              className="google"
              onClick={() => handleSocialLogin('Google')}
            >
              <i className="fab fa-google"></i>
              Google
            </button>
          </div>
        </SocialLogin>

        <LoginFooter>
          <p>Don't have an account?</p>
          <Link to="/register">Create Account</Link>
        </LoginFooter>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;