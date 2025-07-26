import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AppProvider } from './context/AppContext';
import GlobalStyle from './styles/GlobalStyle';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import Footer from './components/Footer';
import NotificationSystem from './components/NotificationSystem';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Countdown from './pages/Countdown';
import Forums from './pages/Forums';
import ForumCategory from './pages/ForumCategory';
import ForumThread from './pages/ForumThread';
import Wiki from './pages/Wiki';
import Store from './pages/Store';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Stats from './pages/Stats';
import Leaderboards from './pages/Leaderboards';
import UpdatePost from './pages/UpdatePost';
import NotFound from './pages/NotFound';

function App() {
  return (
    <AppProvider>
      <GlobalStyle />
      <ScrollToTop />
      <Banner />
      <Navbar />
      <NotificationSystem />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/countdown" element={<Countdown />} />
          <Route path="/forums" element={<Forums />} />
          <Route path="/forums/:categoryId" element={<ForumCategory />} />
          <Route path="/forums/:categoryId/:threadId" element={<ForumThread />} />
          <Route path="/wiki" element={<Wiki />} />
          <Route path="/store" element={<Store />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile/:username?" element={<Profile />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/leaderboards" element={<Leaderboards />} />
          <Route path="/updates/:updateId" element={<UpdatePost />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </AppProvider>
  );
}

export default App;