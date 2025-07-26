import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  /* Animations */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes bannerSlide {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  @keyframes pulse {
    0%, 100% { opacity: 0.8; }
    50% { opacity: 1; }
  }

  @keyframes glowPulse {
    0% { box-shadow: 0 0 10px rgba(255, 64, 129, 0.5); }
    50% { box-shadow: 0 0 25px rgba(255, 64, 129, 0.9); }
    100% { box-shadow: 0 0 10px rgba(255, 64, 129, 0.5); }
  }

  @keyframes countdownFlip {
    0% { transform: perspective(400px) rotateX(0deg); }
    49% { transform: perspective(400px) rotateX(90deg); }
    50% { transform: perspective(400px) rotateX(270deg); }
    100% { transform: perspective(400px) rotateX(360deg); }
  }

  @keyframes arrowBounce {
    0%, 100% { transform: translateX(0); }
    50% { transform: translateX(5px); }
  }

  /* Remove all text decorations globally */
  a {
    text-decoration: none !important;
  }

  /* Utility Classes */
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 clamp(20px, 5vw, 50px);
  }

  .section-padding {
    padding: 180px 20px 60px;
  }

  .text-center {
    text-align: center;
  }

  .pixel-font {
    font-family: 'Press Start 2P', cursive;
  }

  .primary-color {
    color: #ff4081;
  }

  .secondary-color {
    color: #e0e0e0;
  }

  .muted-color {
    color: #b0b0c0;
  }

  /* Background Pattern */
  .bg-pattern {
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMjHxIGmVAAAAMElEQVQYV2NgoBJwcnJyanJycvL///8/AQwMTEwsLCwsLCwsLCwsLCwsLCwsLCwsDI4GAV8HAFrpV3gAAAAASUVORK5CYII=') repeat;
    background-size: 16px 16px;
  }
`;

export default GlobalStyle;