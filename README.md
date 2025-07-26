# Tower of Bedrock - React Website

A modern, beautiful React website for the Tower of Bedrock Minecraft MMORPG server. This project converts the original HTML/CSS/JS website into a fully-featured React application with enhanced animations, better performance, and backend preparation.

## 🚀 Features

### ✨ Enhanced Design
- **Modern React Architecture** - Component-based structure with hooks and context
- **Smooth Animations** - Framer Motion animations throughout the site
- **Responsive Design** - Mobile-first approach with beautiful breakpoints
- **Interactive Elements** - Hover effects, transitions, and micro-interactions
- **Styled Components** - CSS-in-JS for better maintainability

### 🎮 Gaming Features
- **Live Countdown Timer** - Real-time countdown to server launch
- **Event System** - Dynamic event displays with countdowns
- **Server Status** - Real-time server information display
- **Interactive Wiki** - Modal-based wiki system with search
- **Forums Integration** - Ready for backend forum implementation
- **Store System** - Complete e-commerce ready store

### 🛠 Technical Features
- **Context API** - Global state management
- **API Ready** - Complete API integration setup
- **Notification System** - Toast notifications for user feedback
- **Error Handling** - Comprehensive error boundaries and handling
- **Performance Optimized** - Lazy loading and optimized renders
- **SEO Ready** - Meta tags and semantic HTML structure

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup
1. Clone the repository:
```bash
git clone <repository-url>
cd tower-of-bedrock
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 🏗 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Banner.js       # Top banner with announcements
│   ├── Navbar.js       # Navigation component
│   ├── Footer.js       # Footer component
│   ├── HeroSection.js  # Hero section for home page
│   ├── EventsSection.js # Events display component
│   ├── ChangelogSection.js # Changelog display
│   └── NotificationSystem.js # Toast notifications
├── pages/              # Page components
│   ├── Home.js         # Main landing page
│   ├── Countdown.js    # Countdown page
│   ├── Forums.js       # Forums page
│   ├── Wiki.js         # Wiki page
│   └── Store.js        # Store page
├── context/            # React Context for state management
│   └── AppContext.js   # Global app state
├── styles/             # Styled components and global styles
│   └── GlobalStyle.js  # Global CSS styles
├── utils/              # Utility functions and constants
│   ├── api.js          # API integration setup
│   └── constants.js    # App constants and configuration
├── App.js              # Main app component
├── index.js            # App entry point
└── index.css           # Base CSS styles
```

## 🎨 Design Improvements

### Visual Enhancements
- **Glassmorphism Effects** - Modern glass-like UI elements
- **Gradient Backgrounds** - Beautiful gradient overlays
- **Particle Effects** - Subtle background animations
- **Improved Typography** - Better font hierarchy and readability
- **Color Consistency** - Unified color scheme throughout

### User Experience
- **Smooth Scrolling** - Enhanced scroll behavior
- **Loading States** - Beautiful loading animations
- **Error States** - User-friendly error messages
- **Success Feedback** - Confirmation animations and messages
- **Accessibility** - ARIA labels and keyboard navigation

## 🔧 Backend Integration

The application is prepared for backend integration with:

### API Endpoints Ready
- Authentication (login, register, logout)
- User management (profile, preferences)
- Server status and player count
- Forums (threads, posts, categories)
- Wiki (pages, search, categories)
- Store (items, purchases, transactions)
- Events (active events, participation)
- Changelogs (recent updates)
- Statistics (leaderboards, player stats)

### Environment Configuration
Create a `.env` file in the root directory:
```env
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_SERVER_IP=play.towerofbedrock.com
REACT_APP_DISCORD_INVITE=https://discord.gg/towerofbedrock
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
# or
yarn build
```

### Deploy to Netlify/Vercel
The build folder can be deployed to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront

### Environment Variables for Production
Set these in your hosting platform:
- `REACT_APP_API_URL` - Your production API URL
- `REACT_APP_SERVER_IP` - Your Minecraft server IP
- `REACT_APP_DISCORD_INVITE` - Your Discord server invite

## 🎮 Minecraft Server Integration

### Server Status API
The app expects a server status endpoint that returns:
```json
{
  "online": true,
  "playerCount": 45,
  "maxPlayers": 100,
  "version": "1.20.1",
  "motd": "Welcome to Tower of Bedrock!"
}
```

### Player Statistics
For leaderboards and stats, the API should provide:
```json
{
  "topPlayers": [
    {
      "username": "PlayerName",
      "level": 85,
      "guild": "The Ascendants",
      "kills": 1250
    }
  ]
}
```

## 🔮 Future Enhancements

### Planned Features
- **User Authentication** - Login/register system
- **Player Profiles** - Individual player statistics
- **Guild Management** - Guild creation and management
- **Live Chat** - Real-time chat integration
- **Admin Panel** - Server administration interface
- **Mobile App** - React Native companion app

### Technical Improvements
- **PWA Support** - Progressive Web App features
- **Offline Mode** - Cached content for offline viewing
- **Push Notifications** - Server event notifications
- **Real-time Updates** - WebSocket integration
- **Advanced Analytics** - User behavior tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🎯 Support

For support and questions:
- Discord: [Tower of Bedrock Discord](https://discord.gg/towerofbedrock)
- Email: support@towerofbedrock.com
- GitHub Issues: [Create an issue](https://github.com/towerofbedrock/website/issues)

---

**Built with ❤️ for the Tower of Bedrock community**