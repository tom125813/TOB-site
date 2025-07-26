import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useApp } from '../context/AppContext';

const RegisterContainer = styled(motion.div)`
  min-height: 100vh;
  padding: 180px 20px 60px;
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMjHxIGmVAAAAMElEQVQYV2NgoBJwcnJyanJycvL///8/AQwMTEwsLCwsLCwsLCwsLCwsLCwsLCwsDI4GAV8HAFrpV3gAAAAASUVORK5CYII=') repeat;
  background-size: 16px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RegisterCard = styled(motion.div)`
  background: linear-gradient(135deg, rgba(40, 40, 60, 0.95), rgba(50, 50, 70, 0.95));
  border: 2px solid rgba(255, 64, 129, 0.4);
  border-radius: 20px;
  padding: 40px;
  width: 100%;
  max-width: 500px;
  backdrop-filter: blur(20px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(255, 64, 129, 0.1), transparent);
    border-radius: 20px;
    z-index: -1;
  }
`;

const RegisterHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;
  
  h1 {
    font-family: 'Press Start 2P', cursive;
    font-size: clamp(1.5em, 4vw, 2em);
    color: #ff4081;
    margin-bottom: 10px;
    text-transform: uppercase;
    text-shadow: 0 0 10px rgba(255, 64, 129, 0.5);
  }
  
  p {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(0.9em, 2vw, 1em);
    color: #b0b0c0;
    font-weight: 500;
  }
`;

const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
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
    
    &.error {
      border-color: #f44336;
    }
    
    &.success {
      border-color: #4caf50;
    }
  }
  
  .error {
    color: #f44336;
    font-size: 0.8em;
    margin-top: 5px;
  }
  
  .success {
    color: #4caf50;
    font-size: 0.8em;
    margin-top: 5px;
  }
  
  .help-text {
    color: #b0b0c0;
    font-size: 0.8em;
    margin-top: 5px;
  }
`;

const PasswordStrength = styled.div`
  margin-top: 8px;
  
  .strength-bar {
    height: 4px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
    overflow: hidden;
    margin-bottom: 5px;
    
    .strength-fill {
      height: 100%;
      transition: all 0.3s ease;
      border-radius: 2px;
      
      &.weak {
        width: 25%;
        background: #f44336;
      }
      
      &.fair {
        width: 50%;
        background: #ff9800;
      }
      
      &.good {
        width: 75%;
        background: #2196f3;
      }
      
      &.strong {
        width: 100%;
        background: #4caf50;
      }
    }
  }
  
  .strength-text {
    font-size: 0.8em;
    font-weight: 600;
    
    &.weak { color: #f44336; }
    &.fair { color: #ff9800; }
    &.good { color: #2196f3; }
    &.strong { color: #4caf50; }
  }
`;

const MinecraftUsername = styled.div`
  background: rgba(60, 60, 80, 0.9);
  border: 1px solid rgba(255, 64, 129, 0.3);
  border-radius: 10px;
  padding: 15px;
  margin: 10px 0;
  
  .minecraft-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
    
    i {
      color: #ff4081;
      font-size: 1.2em;
    }
    
    h4 {
      color: #ff4081;
      font-family: 'Roboto', sans-serif;
      font-size: 1em;
      margin: 0;
      font-weight: 600;
    }
  }
  
  .minecraft-info {
    font-size: 0.9em;
    color: #b0b0c0;
    margin-bottom: 15px;
    line-height: 1.4;
  }
  
  input {
    width: 100%;
    background: rgba(50, 50, 70, 0.9);
    border: 1px solid rgba(255, 64, 129, 0.3);
    border-radius: 8px;
    padding: 12px;
    color: #e0e0e0;
    font-family: 'Montserrat', sans-serif;
    
    &::placeholder {
      color: #888;
    }
  }
`;

const TermsCheckbox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin: 20px 0;
  
  input[type="checkbox"] {
    margin-top: 3px;
    width: auto;
  }
  
  label {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.9em;
    color: #e0e0e0;
    line-height: 1.4;
    text-transform: none;
    letter-spacing: normal;
    font-weight: normal;
    
    a {
      color: #ff4081;
      text-decoration: none;
      
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const RegisterButton = styled(motion.button)`
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

const RegisterFooter = styled.div`
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

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    minecraftUsername: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { actions } = useApp();
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3
  });

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 'weak', score: 0 };
    
    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    
    const strengths = ['weak', 'weak', 'fair', 'good', 'strong'];
    return { strength: strengths[score], score };
  };

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
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
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
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      actions.addNotification({
        type: 'success',
        title: 'Account Created',
        message: 'Welcome to Tower of Bedrock! Please check your email to verify your account.'
      });
      
      // Redirect to login or verification page
      
    } catch (error) {
      actions.addNotification({
        type: 'error',
        title: 'Registration Failed',
        message: 'Something went wrong. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <RegisterContainer
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
    >
      <RegisterCard
        initial={{ y: 50, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <RegisterHeader>
          <h1>Join the Tower</h1>
          <p>Create your Tower of Bedrock account</p>
        </RegisterHeader>

        <RegisterForm onSubmit={handleSubmit}>
          <FormGroup>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Choose a username"
              disabled={isLoading}
              className={errors.username ? 'error' : ''}
            />
            {errors.username && <div className="error">{errors.username}</div>}
          </FormGroup>

          <FormGroup>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="your@email.com"
              disabled={isLoading}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <div className="error">{errors.email}</div>}
          </FormGroup>

          <FormGroup>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Create a strong password"
              disabled={isLoading}
              className={errors.password ? 'error' : ''}
            />
            {formData.password && (
              <PasswordStrength>
                <div className="strength-bar">
                  <div className={`strength-fill ${passwordStrength.strength}`}></div>
                </div>
                <div className={`strength-text ${passwordStrength.strength}`}>
                  Password strength: {passwordStrength.strength}
                </div>
              </PasswordStrength>
            )}
            {errors.password && <div className="error">{errors.password}</div>}
          </FormGroup>

          <FormGroup>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm your password"
              disabled={isLoading}
              className={errors.confirmPassword ? 'error' : ''}
            />
            {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
          </FormGroup>

          <MinecraftUsername>
            <div className="minecraft-header">
              <i className="fas fa-cube"></i>
              <h4>Minecraft Username (Optional)</h4>
            </div>
            <div className="minecraft-info">
              Link your Minecraft account to sync your in-game progress and stats.
            </div>
            <input
              type="text"
              name="minecraftUsername"
              value={formData.minecraftUsername}
              onChange={handleInputChange}
              placeholder="Your Minecraft username"
              disabled={isLoading}
            />
          </MinecraftUsername>

          <TermsCheckbox>
            <input
              type="checkbox"
              id="agreeToTerms"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleInputChange}
              disabled={isLoading}
            />
            <label htmlFor="agreeToTerms">
              I agree to the <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link>
            </label>
          </TermsCheckbox>
          {errors.agreeToTerms && <div className="error">{errors.agreeToTerms}</div>}

          <RegisterButton
            type="submit"
            disabled={isLoading || !formData.agreeToTerms}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </RegisterButton>
        </RegisterForm>

        <RegisterFooter>
          <p>Already have an account?</p>
          <Link to="/login">Sign In</Link>
        </RegisterFooter>
      </RegisterCard>
    </RegisterContainer>
  );
};

export default Register;