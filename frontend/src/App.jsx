import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import Splash from './components/Splash';
import HomePage from './pages/Home/Home.jsx';
import NewsletterPage from './pages/Newsletter/Newsletter.jsx';
import GalleryPage from './pages/Gallery/Gallery.jsx';
import TestimonialsPage from './pages/Testimonials/Testimonials.jsx';
import VideoPage from './pages/Video/Video.jsx';
import Contact from "./pages/Contact/Contact";
import Events from "./pages/Events/Events";


import "./styles/pastelRain.css";

function AnimatedRoutes() {
  const location = useLocation();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
        animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
        transition={{ duration: reduceMotion ? 0 : 0.25, ease: 'easeOut' }}
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/newsletter" element={<NewsletterPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/video" element={<VideoPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/events" element={<Events />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Splash />
      <AnimatedRoutes />
    </BrowserRouter>
  );
}