import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home/Home.jsx';
import NewsletterPage from './pages/Newsletter/Newsletter.jsx';
import GalleryPage from './pages/Gallery/Gallery.jsx';
import TestimonialsPage from './pages/Testimonials/Testimonials.jsx';
import VideoPage from './pages/Video/Video.jsx';
import Contact from "./pages/Contact/Contact";
import Events from "./pages/Events/Events";
import ArtGallery from './pages/ArtGallery';
import CreativeJournal from './pages/CreativeJournal';
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
        <Route path="/contact" element={<Contact />} />
        <Route path="/events" element={<Events />} />
        <Route path="/art-gallery" element={<ArtGallery />} />
        <Route path="/journal" element={<CreativeJournal />} />
      </Routes>
    </BrowserRouter>
  );
}