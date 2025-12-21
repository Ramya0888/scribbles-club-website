import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home/Home.jsx';
import NewsletterPage from './pages/Newsletter/Newsletter.jsx';
import GalleryPage from './pages/Gallery/Gallery.jsx';
import TestimonialsPage from './pages/Testimonials/Testimonials.jsx';
import VideoPage from './pages/Video/Video.jsx';
import "./styles/pastelRain.css";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/newsletter" element={<NewsletterPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/testimonials" element={<TestimonialsPage />} />
        <Route path="/video" element={<VideoPage />} />
      </Routes>
    </BrowserRouter>
  );
}
