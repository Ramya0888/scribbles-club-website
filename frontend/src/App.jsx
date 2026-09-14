import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import Splash from './components/Splash';
import Cursor from './components/Cursor';
import ErrorBoundary from './components/ErrorBoundary';
import ThemeBackground from './components/ThemeBackground';
import "./styles/pastelRain.css";

const HomePage = lazy(() => import('./pages/Home/Home.jsx'));
const NewsletterPage = lazy(() => import('./pages/Newsletter/Newsletter.jsx'));
const GalleryPage = lazy(() => import('./pages/Gallery/Gallery.jsx'));
const TestimonialsPage = lazy(() => import('./pages/Testimonials/Testimonials.jsx'));
const VideoPage = lazy(() => import('./pages/Video/Video.jsx'));
const Contact = lazy(() => import("./pages/Contact/Contact"));
const Events = lazy(() => import("./pages/Events/Events"));
const Blog = lazy(() => import("./pages/Blog/Blog"));
const NotFound = lazy(() => import("./pages/NotFound"));

function PageLoader() {
  return <div style={{ minHeight: "50vh", display: "grid", placeItems: "center", color: "var(--text-muted)" }} role="status" aria-label="Loading page"><div style={{ width: 28, height: 28, borderRadius: "50%", border: "2px solid rgba(0,0,0,0.08)", borderTopColor: "var(--warm-pink)", animation: "spin 0.7s linear infinite" }} /></div>;
}

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
        <Suspense fallback={<PageLoader />}>
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/newsletter" element={<NewsletterPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
            <Route path="/video" element={<VideoPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/events" element={<Events />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ThemeBackground />
        <Cursor />
        <Splash />
        <AnimatedRoutes />
      </ErrorBoundary>
    </BrowserRouter>
  );
}
