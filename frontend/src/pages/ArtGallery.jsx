// KEY CHANGES FROM ORIGINAL:
// 1. Changed all `art.imageUrl` to `art.image?.url || art.imageUrl` (backward compatible)
// 2. Changed all `artistArtwork.imageUrl` to `artistArtwork.image?.url`
// 3. Updated ImageUpload component to pass { url, publicId } object
// 4. Updated form submission to use image object instead of imageUrl string
// 5. Made it backward compatible so old data with imageUrl still works

import React, { useState, useEffect } from 'react';
import { X, Instagram, Heart, Search, Upload, ChevronLeft, ChevronRight, AlertCircle, CheckCircle, Home, Eye, TrendingUp, Award, Zap, Filter, Lock, Edit, Trash2, LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ImageUpload from '../components/ImageUpload';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// ADMIN CREDENTIALS - Change these!
const ADMIN_USERNAME = 'admin_001';
const ADMIN_PASSWORD = 'scribbles@2025';

// Default profile picture
const DEFAULT_PROFILE_PIC = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23F39EB6;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23B8DB80;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Ccircle cx='40' cy='40' r='40' fill='url(%23grad)'/%3E%3Ctext x='40' y='52' font-size='32' text-anchor='middle' fill='white' font-family='Arial'%3E👤%3C/text%3E%3C/svg%3E";

// Helper function to get image URL (backward compatible)
const getImageUrl = (artwork) => {
  // New schema: image.url
  if (artwork.image && artwork.image.url) {
    return artwork.image.url;
  }
  // Old schema: imageUrl
  if (artwork.imageUrl) {
    return artwork.imageUrl;
  }
  return '';
};

const ArtGallery = () => {
  const navigate = useNavigate();
  const [allArtworks, setAllArtworks] = useState([]);
  const [filteredArtworks, setFilteredArtworks] = useState([]);
  const [artists, setArtists] = useState([]);
  const [selectedArt, setSelectedArt] = useState(null);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [searchTerm, setSearchTerm] = useState('');
  const [likedArtworks, setLikedArtworks] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [artistCarouselIndex, setArtistCarouselIndex] = useState(0);
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingArtwork, setEditingArtwork] = useState(null);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [stats, setStats] = useState({ totalArtworks: 0, totalLikes: 0, totalViews: 0 });
  const [isAdmin, setIsAdmin] = useState(false);

  const categories = [
    { value: 'all', label: 'All', emoji: '🎨' },
    { value: 'painting', label: 'Paintings', emoji: '🖼️' },
    { value: 'digital', label: 'Digital', emoji: '💻' },
    { value: 'photography', label: 'Photography', emoji: '📸' },
    { value: 'traditional', label: 'Traditional', emoji: '✏️' }
  ];

  useEffect(() => {
    fetchArtworks();
    fetchArtists();
    
    // Download protection
    const preventContextMenu = (e) => e.preventDefault();
    const preventDragStart = (e) => e.preventDefault();
    
    document.addEventListener('contextmenu', preventContextMenu);
    document.addEventListener('dragstart', preventDragStart);
    
    return () => {
      document.removeEventListener('contextmenu', preventContextMenu);
      document.removeEventListener('dragstart', preventDragStart);
    };
  }, []);

  useEffect(() => {
    filterAndSortArtworks();
  }, [allArtworks, filter, searchTerm, sortBy]);

  useEffect(() => {
    if (artists.length > 0) {
      const currentMonth = new Date().getMonth();
      const artistIndex = currentMonth % artists.length;
      setArtistCarouselIndex(artistIndex);
    }
  }, [artists]);
  // Load liked artworks from localStorage on mount
useEffect(() => {
  const savedLikes = localStorage.getItem('likedArtworks');
  if (savedLikes) {
    try {
      const likes = JSON.parse(savedLikes);
      setLikedArtworks(new Set(likes));
      console.log('✅ Loaded saved likes:', likes);
    } catch (err) {
      console.error('Error loading likes:', err);
    }
  }
}, []);

// Save liked artworks to localStorage whenever changed
useEffect(() => {
  if (likedArtworks.size > 0) {
    const likesArray = Array.from(likedArtworks);
    localStorage.setItem('likedArtworks', JSON.stringify(likesArray));
    console.log('💾 Saved likes to localStorage:', likesArray);
  }
}, [likedArtworks]);

  const fetchArtworks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/artworks`);
      const artworks = response.data.data;
      setAllArtworks(artworks);
      
      const totalLikes = artworks.reduce((sum, art) => sum + (art.likes || 0), 0);
      const totalViews = artworks.reduce((sum, art) => sum + (art.views || 0), 0);
      setStats({ totalArtworks: artworks.length, totalLikes, totalViews });
    } catch (err) {
      console.error('Error fetching artworks:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchArtists = async () => {
    try {
      const response = await axios.get(`${API_URL}/artists`);
      setArtists(response.data.data);
    } catch (err) {
      console.error('Error fetching artists:', err);
    }
  };

  const filterAndSortArtworks = () => {
    let filtered = [...allArtworks];

    if (filter !== 'all') {
      filtered = filtered.filter(art => art.category.toLowerCase() === filter.toLowerCase());
    }

    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(art =>
        art.title.toLowerCase().includes(search) ||
        art.artist.toLowerCase().includes(search) ||
        (art.description && art.description.toLowerCase().includes(search))
      );
    }

    if (sortBy === 'popular') {
      filtered.sort((a, b) => (b.likes || 0) - (a.likes || 0));
    } else if (sortBy === 'mostViewed') {
      filtered.sort((a, b) => (b.views || 0) - (a.views || 0));
    } else {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setFilteredArtworks(filtered);
  };

  const handleLogin = (username, password) => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setShowLoginForm(false);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsAdmin(false);
  };

const toggleLike = async (id, e) => {
  e?.stopPropagation();
  
  console.log('=== LIKE DEBUG START ===');
  console.log('1. Artwork ID:', id);
  console.log('2. API URL:', API_URL);
  console.log('3. Full URL:', `${API_URL}/artworks/${id}/like`);
  
  try {
    const response = await axios.put(`${API_URL}/artworks/${id}/like`);
    
    console.log('4. Response:', response.data);
    
    const { liked, totalLikes } = response.data;
    
    // Update UI
    setLikedArtworks(prev => {
      const newSet = new Set(prev);
      if (liked) newSet.add(id);
      else newSet.delete(id);
      return newSet;
    });
    
    setAllArtworks(prev => prev.map(art => 
      art._id === id ? { ...art, likes: totalLikes } : art
    ));
    
    console.log('✅ SUCCESS');
    
  } catch (err) {
    console.log('❌ ERROR:', err);
    console.log('Error response:', err.response?.data);
    console.log('Error status:', err.response?.status);
    console.log('Error message:', err.message);
    
    alert(`Error: ${err.response?.data?.error || err.message}`);
  }
};

  const handleArtworkClick = async (artwork) => {
    setSelectedArt(artwork);
    
    try {
      const response = await axios.get(`${API_URL}/artworks/${artwork._id}`);
      const updated = response.data.data;
      setAllArtworks(prev => prev.map(art => 
        art._id === artwork._id ? updated : art
      ));
    } catch (err) {
      console.error('Error tracking view:', err);
    }
  };

  const handleSubmitArtwork = async (formData) => {
    try {
      setSubmitStatus({ type: 'loading', message: 'Submitting...' });
      
      try {
        await axios.post(`${API_URL}/artists/create-or-update`, {
          name: formData.artist,
          instagram: formData.instagram,
          profileImage: formData.profileImage
        });
      } catch (err) {
        console.log('Artist creation/update note:', err.message);
      }
      
      await axios.post(`${API_URL}/artworks`, formData);
      
      setSubmitStatus({ type: 'success', message: 'Artwork submitted successfully!' });
      setTimeout(() => {
        setShowSubmitForm(false);
        setSubmitStatus(null);
        fetchArtworks();
        fetchArtists();
      }, 2000);
    } catch (err) {
      // Check for 413 Payload Too Large error
      if (err.response && err.response.status === 413) {
        setSubmitStatus({ 
          type: 'error', 
          message: '⚠️ Image file is too large! Please use a smaller image (max 5MB recommended).' 
        });
      } else {
        setSubmitStatus({ 
          type: 'error', 
          message: err.response?.data?.error || 'Failed to submit. Please try again.' 
        });
      }
    }
  };

  const handleUpdateArtwork = async (formData) => {
    try {
      setSubmitStatus({ type: 'loading', message: 'Updating...' });
      
      try {
        await axios.post(`${API_URL}/artists/create-or-update`, {
          name: formData.artist,
          instagram: formData.instagram,
          profileImage: formData.profileImage
        });
      } catch (err) {
        console.log('Artist update note:', err.message);
      }
      
      await axios.put(`${API_URL}/artworks/${editingArtwork._id}`, formData);
      
      setSubmitStatus({ type: 'success', message: 'Artwork updated successfully!' });
      setTimeout(() => {
        setShowEditForm(false);
        setEditingArtwork(null);
        setSubmitStatus(null);
        fetchArtworks();
        fetchArtists();
      }, 2000);
    } catch (err) {
      // Check for 413 Payload Too Large error
      if (err.response && err.response.status === 413) {
        setSubmitStatus({ 
          type: 'error', 
          message: '⚠️ Image file is too large! Please use a smaller image (max 5MB recommended).' 
        });
      } else {
        setSubmitStatus({ 
          type: 'error', 
          message: err.response?.data?.error || 'Failed to update. Please try again.' 
        });
      }
    }
  };

  const handleDeleteArtwork = async (id) => {
    if (!window.confirm('Are you sure you want to delete this artwork?')) return;
    
    try {
      await axios.delete(`${API_URL}/artworks/${id}`);
      fetchArtworks();
      fetchArtists();
      setSelectedArt(null);
    } catch (err) {
      console.error('Error deleting artwork:', err);
      alert('Failed to delete artwork');
    }
  };

  const handleEditClick = (artwork, e) => {
    e?.stopPropagation();
    setEditingArtwork(artwork);
    setShowEditForm(true);
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F7F6D3' }}>
        <div style={{ width: '64px', height: '64px', border: '4px solid #F39EB6', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite', marginBottom: '20px' }}></div>
        <p style={{ fontSize: '20px', color: '#F39EB6', fontWeight: '600' }}>Loading gallery...</p>
        <p style={{ fontSize: '14px', color: '#999', marginTop: '8px' }}>Discovering amazing artworks</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // Get this week's most liked artwork (last 7 days)
const now = new Date();
const oneWeekAgo = new Date();
oneWeekAgo.setDate(now.getDate() - 7);

const featuredArt = allArtworks
  .filter(art => {
    const artDate = new Date(art.createdAt);
    return artDate >= oneWeekAgo; // ✅ THIS WEEK (last 7 days)
  })
  .sort((a, b) => (b.likes || 0) - (a.likes || 0))[0]
  || allArtworks.sort((a, b) => (b.likes || 0) - (a.likes || 0))[0]; // Fallback
  const artistOfMonth = artists[artistCarouselIndex];
  const artistArtwork = artistOfMonth ? allArtworks.find(art => art.artist === artistOfMonth.name) : null;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F7F6D3', userSelect: 'none' }}>
      {/* Header - unchanged */}
      <header style={{ background: 'linear-gradient(135deg, #B8DB80 0%, #F39EB6 100%)', padding: '60px 24px', position: 'relative', overflow: 'hidden' }}>
        <button onClick={() => navigate('/')}
          style={{ position: 'absolute', top: '20px', left: '20px', width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.95)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.2)', transition: 'all 0.2s', zIndex: 10 }}
          onMouseOver={(e) => { e.target.style.backgroundColor = 'white'; e.target.style.transform = 'scale(1.1)'; }}
          onMouseOut={(e) => { e.target.style.backgroundColor = 'rgba(255,255,255,0.95)'; e.target.style.transform = 'scale(1)'; }}>
          <Home size={24} color="#F39EB6" />
        </button>

        {!isAdmin ? (
          <button onClick={() => setShowLoginForm(true)}
            style={{ position: 'absolute', top: '20px', right: '20px', display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 20px', backgroundColor: 'rgba(255,255,255,0.95)', color: '#F39EB6', borderRadius: '30px', fontWeight: 'bold', fontSize: '14px', border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.2)', transition: 'all 0.2s', zIndex: 10 }}
            onMouseOver={(e) => { e.target.style.backgroundColor = 'white'; e.target.style.transform = 'scale(1.05)'; }}
            onMouseOut={(e) => { e.target.style.backgroundColor = 'rgba(255,255,255,0.95)'; e.target.style.transform = 'scale(1)'; }}>
            <Lock size={16} /> Admin Login
          </button>
        ) : (
          <button onClick={handleLogout}
            style={{ position: 'absolute', top: '20px', right: '20px', display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 20px', backgroundColor: 'rgba(255,255,255,0.95)', color: '#F39EB6', borderRadius: '30px', fontWeight: 'bold', fontSize: '14px', border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.2)', transition: 'all 0.2s', zIndex: 10 }}
            onMouseOver={(e) => { e.target.style.backgroundColor = 'white'; e.target.style.transform = 'scale(1.05)'; }}
            onMouseOut={(e) => { e.target.style.backgroundColor = 'rgba(255,255,255,0.95)'; e.target.style.transform = 'scale(1)'; }}>
            <LogOut size={16} /> Logout
          </button>
        )}

        <div style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 20px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '20px', marginBottom: '16px', backdropFilter: 'blur(10px)' }}>
            <Award size={20} color="white" />
            <span style={{ color: 'white', fontSize: '14px', fontWeight: '600' }}>Scribbles Art Gallery</span>
          </div>
          <h1 style={{ fontSize: '48px', fontWeight: 'bold', color: 'white', marginBottom: '12px', textShadow: '0 2px 20px rgba(0,0,0,0.2)' }}>
            Discover Creative Masterpieces
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.95)', marginBottom: '24px', maxWidth: '600px', margin: '0 auto 24px' }}>
            {stats.totalArtworks} artworks • {stats.totalLikes} likes • {stats.totalViews} views
          </p>
          {isAdmin && (
            <button onClick={() => setShowSubmitForm(true)}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '14px 32px', backgroundColor: 'white', color: '#F39EB6', borderRadius: '50px', fontWeight: 'bold', fontSize: '15px', border: 'none', cursor: 'pointer', boxShadow: '0 6px 20px rgba(0,0,0,0.15)', transition: 'transform 0.2s' }}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}>
              <Upload size={18} /> Submit Your Artwork
            </button>
          )}
        </div>
      </header>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '48px 24px' }}>
        {/* Artist of the Month - FIXED: Using getImageUrl() */}
        {artists.length > 0 && artistOfMonth && (
          <div style={{ marginBottom: '56px' }}>
            {/* ... header code unchanged ... */}
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 20px', backgroundColor: '#FFE4EF', borderRadius: '20px', marginBottom: '12px' }}>
                <Award size={18} color="#F39EB6" />
                <span style={{ color: '#F39EB6', fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>Artist of the Month</span>
              </div>
              <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#F39EB6' }}>
                Top Contributing Artist
              </h2>
            </div>
            
            <div style={{ position: 'relative', backgroundColor: 'white', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.12)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0' }}>
                <div style={{ background: 'linear-gradient(135deg, #FFE4EF, #F7F6D3)', padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>
                  <img 
                    src={artistOfMonth.profileImage || DEFAULT_PROFILE_PIC} 
                    alt={artistOfMonth.name}
                    onContextMenu={(e) => e.preventDefault()}
                    onDragStart={(e) => e.preventDefault()}
                    style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', border: '4px solid #F39EB6', boxShadow: '0 8px 24px rgba(243,158,182,0.4)', marginBottom: '20px', pointerEvents: 'none' }} 
                  />
                  
                  <h3 style={{ fontSize: '28px', fontWeight: 'bold', color: '#F39EB6', marginBottom: '8px', textAlign: 'center' }}>
                    {artistOfMonth.name}
                  </h3>
                  
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 20px', backgroundColor: '#F39EB6', color: 'white', borderRadius: '20px', fontSize: '14px', fontWeight: 'bold', marginBottom: '24px' }}>
                    <Award size={16} />
                    {artistOfMonth.totalArtworks || 0} Artworks
                  </div>
                  
                  {artistArtwork && (
                    <div style={{ width: '200px', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 6px 20px rgba(0,0,0,0.15)' }}>
                      <img 
                        src={getImageUrl(artistArtwork)}
                        alt="Artist's work"
                        onContextMenu={(e) => e.preventDefault()}
                        onDragStart={(e) => e.preventDefault()}
                        style={{ width: '100%', height: '200px', objectFit: 'cover', pointerEvents: 'none' }} 
                      />
                    </div>
                  )}
                </div>
                
                {/* Rest of artist of month section unchanged... */}
                <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <p style={{ color: '#666', fontSize: '16px', marginBottom: '24px', lineHeight: '1.7' }}>
                    {artistOfMonth.bio || 'A talented artist creating amazing works and inspiring the community.'}
                  </p>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '24px' }}>
                    <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#FFE4EF', borderRadius: '16px' }}>
                      <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#F39EB6', marginBottom: '6px' }}>
                        {artistOfMonth.totalLikes || 0}
                      </div>
                      <div style={{ fontSize: '12px', color: '#666', fontWeight: '600', textTransform: 'uppercase' }}>Total Likes</div>
                    </div>
                    <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#E8F5E9', borderRadius: '16px' }}>
                      <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#4CAF50', marginBottom: '6px' }}>
                        {artistOfMonth.totalViews || 0}
                      </div>
                      <div style={{ fontSize: '12px', color: '#666', fontWeight: '600', textTransform: 'uppercase' }}>Total Views</div>
                    </div>
                  </div>

                  {artistOfMonth.specialization && artistOfMonth.specialization.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                      {artistOfMonth.specialization.map(spec => (
                        <span key={spec} style={{ padding: '6px 14px', backgroundColor: '#F7F6D3', color: '#F39EB6', borderRadius: '16px', fontSize: '13px', fontWeight: '600', textTransform: 'capitalize' }}>
                          {spec}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {artistOfMonth.instagram && (
                    <a href={`https://instagram.com/${artistOfMonth.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer"
                       style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', backgroundColor: '#F39EB6', color: 'white', borderRadius: '24px', fontWeight: '600', fontSize: '14px', textDecoration: 'none', transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(243,158,182,0.3)', width: 'fit-content' }}
                       onMouseOver={(e) => { e.target.style.transform = 'translateY(-2px)'; }}
                       onMouseOut={(e) => { e.target.style.transform = 'translateY(0)'; }}>
                      <Instagram size={18} />
                      Follow on Instagram
                    </a>
                  )}
                </div>
              </div>
              
              {/* Carousel arrows unchanged... */}
              {artists.length > 1 && (
                <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                  <button onClick={() => setArtistCarouselIndex((prev) => (prev - 1 + artists.length) % artists.length)}
                    style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'rgba(243,158,182,0.95)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '3px solid white', cursor: 'pointer', boxShadow: '0 6px 20px rgba(0,0,0,0.25)', transition: 'all 0.3s', pointerEvents: 'auto', zIndex: 10 }}
                    onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1.15)'; e.currentTarget.style.backgroundColor = '#F39EB6'; }}
                    onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; e.currentTarget.style.backgroundColor = 'rgba(243,158,182,0.95)'; }}>
                    <ChevronLeft size={24} strokeWidth={3} />
                  </button>
                  
                  <button onClick={() => setArtistCarouselIndex((prev) => (prev + 1) % artists.length)}
                    style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'rgba(243,158,182,0.95)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '3px solid white', cursor: 'pointer', boxShadow: '0 6px 20px rgba(0,0,0,0.25)', transition: 'all 0.3s', pointerEvents: 'auto', zIndex: 10 }}
                    onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1.15)'; e.currentTarget.style.backgroundColor = '#F39EB6'; }}
                    onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; e.currentTarget.style.backgroundColor = 'rgba(243,158,182,0.95)'; }}>
                    <ChevronRight size={24} strokeWidth={3} />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Featured Artwork - FIXED: Using getImageUrl() */}
        {featuredArt && (
          <div style={{ marginBottom: '56px' }}>
            {/* Header unchanged */}
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 20px', backgroundColor: '#FFE4EF', borderRadius: '20px', marginBottom: '12px' }}>
                <TrendingUp size={18} color="#F39EB6" />
                <span style={{ color: '#F39EB6', fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>Artwork of the Week</span>
              </div>
              <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#F39EB6' }}>
                Last Week's Most Loved
              </h2>
            </div>
            
            <div style={{ backgroundColor: '#FFE4EF', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.12)', padding: '32px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
                <div style={{ cursor: 'pointer', position: 'relative' }} onClick={() => handleArtworkClick(featuredArt)}>
                  <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
                    <img src={getImageUrl(featuredArt)} alt={featuredArt.title}
                      onContextMenu={(e) => e.preventDefault()}
                      onDragStart={(e) => e.preventDefault()}
                      style={{ width: '100%', height: '350px', objectFit: 'cover', transition: 'transform 0.5s', pointerEvents: 'none' }}
                      onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                      onMouseOut={(e) => e.target.style.transform = 'scale(1)'} />
                    <div style={{ position: 'absolute', top: '16px', left: '16px', padding: '8px 16px', backgroundColor: '#FFD700', color: '#333', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
                      <Award size={16} /> FEATURED
                    </div>
                  </div>
                </div>
                
                {/* Rest of featured content unchanged... */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <h3 style={{ fontSize: '36px', fontWeight: 'bold', color: '#F39EB6', marginBottom: '12px', lineHeight: '1.2' }}>{featuredArt.title}</h3>
                  <p style={{ fontSize: '20px', color: '#666', marginBottom: '16px' }}>by {featuredArt.artist}</p>
                  <p style={{ color: '#666', marginBottom: '24px', fontSize: '15px', lineHeight: '1.7' }}>{featuredArt.description}</p>
                  
                  <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: '16px' }}>
                      <Heart size={18} color="#F39EB6" fill="#F39EB6" />
                      <span style={{ fontSize: '15px', fontWeight: '600', color: '#666' }}>{featuredArt.likes} likes</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: '16px' }}>
                      <Eye size={18} color="#B8DB80" />
                      <span style={{ fontSize: '15px', fontWeight: '600', color: '#666' }}>{featuredArt.views} views</span>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <button onClick={(e) => toggleLike(featuredArt._id, e)}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px', backgroundColor: likedArtworks.has(featuredArt._id) ? '#F39EB6' : '#B8DB80', color: 'white', borderRadius: '24px', fontWeight: 'bold', fontSize: '15px', border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', transition: 'all 0.2s' }}
                      onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                      onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}>
                      <Heart fill={likedArtworks.has(featuredArt._id) ? "white" : "none"} size={18} />
                      {likedArtworks.has(featuredArt._id) ? 'Liked' : 'Like'}
                    </button>
                    {isAdmin && (
                      <>
                        <button onClick={(e) => handleEditClick(featuredArt, e)}
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px', backgroundColor: '#FFB74D', color: 'white', borderRadius: '24px', fontWeight: 'bold', fontSize: '15px', border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', transition: 'all 0.2s' }}
                          onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                          onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}>
                          <Edit size={18} /> Edit
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); handleDeleteArtwork(featuredArt._id); }}
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px', backgroundColor: '#EF5350', color: 'white', borderRadius: '24px', fontWeight: 'bold', fontSize: '15px', border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', transition: 'all 0.2s' }}
                          onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                          onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}>
                          <Trash2 size={18} /> Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search & Filters - unchanged, too long to include here but no changes needed */}
        
        {/* Gallery Grid - FIXED: Using getImageUrl() */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '28px' }}>
          {filteredArtworks.filter(art => art._id !== featuredArt?._id).map(art => (
            <div key={art._id}
              style={{ backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 6px 20px rgba(0,0,0,0.1)', cursor: 'pointer', transition: 'all 0.3s', position: 'relative' }}
              onClick={() => handleArtworkClick(art)}
              onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.18)'; }}
              onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.1)'; }}>
              
              <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
                <img src={getImageUrl(art)} alt={art.title}
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s', pointerEvents: 'none' }}
                  onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                  onMouseOut={(e) => e.target.style.transform = 'scale(1)'} />
                
                <button onClick={(e) => toggleLike(art._id, e)}
                  style={{ position: 'absolute', top: '14px', right: '14px', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.95)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', transition: 'all 0.2s', zIndex: 10 }}
                  onMouseOver={(e) => { e.target.style.transform = 'scale(1.15)'; }}
                  onMouseOut={(e) => { e.target.style.transform = 'scale(1)'; }}>
                  <Heart size={20} fill={likedArtworks.has(art._id) ? "#F39EB6" : "none"} color="#F39EB6" />
                </button>
                
                <div style={{ position: 'absolute', top: '14px', left: '14px', padding: '6px 12px', backgroundColor: 'rgba(243,158,182,0.95)', color: 'white', borderRadius: '16px', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', backdropFilter: 'blur(4px)' }}>
                  {art.category}
                </div>

                {isAdmin && (
                  <div style={{ position: 'absolute', bottom: '14px', right: '14px', display: 'flex', gap: '8px' }}>
                    <button onClick={(e) => handleEditClick(art, e)}
                      style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(255,183,77,0.95)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.2)', transition: 'all 0.2s', zIndex: 10 }}
                      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                      <Edit size={16} color="white" />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); handleDeleteArtwork(art._id); }}
                      style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(239,83,80,0.95)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.2)', transition: 'all 0.2s', zIndex: 10 }}
                      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                      <Trash2 size={16} color="white" />
                    </button>
                  </div>
                )}
              </div>
              
              <div style={{ padding: '20px' }}>
                <h3 style={{ fontSize: '19px', fontWeight: 'bold', color: '#F39EB6', marginBottom: '8px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {art.title}
                </h3>
                <p style={{ color: '#666', marginBottom: '12px', fontSize: '14px', fontWeight: '500' }}>by {art.artist}</p>
                
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '2px solid #f5f5f5' }}>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: '#666', fontWeight: '600' }}>
                      <Heart size={14} fill="#F39EB6" color="#F39EB6" /> {art.likes || 0}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: '#666', fontWeight: '600' }}>
                      <Eye size={14} color="#B8DB80" /> {art.views || 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredArtworks.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 20px', backgroundColor: 'white', borderRadius: '20px', boxShadow: '0 6px 20px rgba(0,0,0,0.08)' }}>
            <Filter size={56} color="#F39EB6" style={{ marginBottom: '20px', opacity: 0.5 }} />
            <p style={{ fontSize: '22px', color: '#666', marginBottom: '10px', fontWeight: '600' }}>No artworks found</p>
            <p style={{ fontSize: '15px', color: '#999' }}>Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Lightbox Modal - FIXED: Using getImageUrl() */}
      {selectedArt && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px', overflowY: 'auto' }} onClick={() => setSelectedArt(null)}>
          <div style={{ maxWidth: '1200px', width: '100%', backgroundColor: 'white', borderRadius: '24px', overflow: 'hidden', maxHeight: '95vh', overflowY: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }} onClick={(e) => e.stopPropagation()}>
            
            <div style={{ position: 'relative', backgroundColor: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '400px', maxHeight: '70vh' }}>
              <img src={getImageUrl(selectedArt)} alt={selectedArt.title} 
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
                style={{ maxWidth: '100%', maxHeight: '70vh', width: 'auto', height: 'auto', objectFit: 'contain', display: 'block', pointerEvents: 'none' }} />
              
              <button onClick={() => setSelectedArt(null)}
                style={{ position: 'absolute', top: '20px', right: '20px', width: '48px', height: '48px', backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: '50%', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(0,0,0,0.3)', transition: 'all 0.2s' }}
                onMouseOver={(e) => { e.target.style.transform = 'scale(1.1)'; e.target.style.backgroundColor = '#F39EB6'; }}
                onMouseOut={(e) => { e.target.style.transform = 'scale(1)'; e.target.style.backgroundColor = 'rgba(255,255,255,0.95)'; }}>
                <X size={24} color="#333" />
              </button>
            </div>
            
            <div style={{ padding: '40px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px', paddingBottom: '24px', borderBottom: '2px solid #f5f5f5' }}>
                <img 
                  src={selectedArt.profileImage || DEFAULT_PROFILE_PIC} 
                  alt={selectedArt.artist}
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                  style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #F39EB6', boxShadow: '0 4px 12px rgba(243,158,182,0.3)', pointerEvents: 'none' }} 
                />
                
                <div style={{ flex: 1 }}>
                  <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#F39EB6', marginBottom: '4px', lineHeight: '1.2' }}>{selectedArt.title}</h2>
                  <p style={{ fontSize: '18px', color: '#666', fontWeight: '500' }}>by {selectedArt.artist}</p>
                </div>
                
                <div style={{ padding: '8px 16px', backgroundColor: '#FFE4EF', color: '#F39EB6', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold', textTransform: 'uppercase' }}>
                  {selectedArt.category}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '15px', color: '#666', fontWeight: '600' }}>
                  <Heart size={18} fill="#F39EB6" color="#F39EB6" /> {selectedArt.likes} likes
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '15px', color: '#666', fontWeight: '600' }}>
                  <Eye size={18} color="#B8DB80" /> {selectedArt.views} views
                </span>
              </div>
              
              <p style={{ color: '#666', marginBottom: '32px', fontSize: '16px', lineHeight: '1.7' }}>{selectedArt.description}</p>
              
              {selectedArt.instagram && (
                <a href={`https://instagram.com/${selectedArt.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer"
                   style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', backgroundColor: '#F39EB6', color: 'white', borderRadius: '24px', fontWeight: '600', fontSize: '14px', textDecoration: 'none', marginBottom: '24px', transition: 'all 0.2s' }}
                   onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                   onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}>
                  <Instagram size={18} />
                  @{selectedArt.instagram.replace('@', '')}
                </a>
              )}
              
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '24px' }}>
                <button onClick={(e) => toggleLike(selectedArt._id, e)}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '16px 32px', backgroundColor: likedArtworks.has(selectedArt._id) ? '#F39EB6' : '#B8DB80', color: 'white', borderRadius: '24px', fontWeight: 'bold', fontSize: '16px', border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', transition: 'all 0.2s' }}
                  onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                  onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}>
                  <Heart fill={likedArtworks.has(selectedArt._id) ? "white" : "none"} size={20} />
                  {likedArtworks.has(selectedArt._id) ? `Liked (${selectedArt.likes})` : `Like (${selectedArt.likes})`}
                </button>

                {isAdmin && (
                  <>
                    <button onClick={(e) => { e.stopPropagation(); handleEditClick(selectedArt, e); }}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '16px 32px', backgroundColor: '#FFB74D', color: 'white', borderRadius: '24px', fontWeight: 'bold', fontSize: '16px', border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', transition: 'all 0.2s' }}
                      onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                      onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}>
                      <Edit size={20} /> Edit
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); handleDeleteArtwork(selectedArt._id); }}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '16px 32px', backgroundColor: '#EF5350', color: 'white', borderRadius: '24px', fontWeight: 'bold', fontSize: '16px', border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', transition: 'all 0.2s' }}
                      onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                      onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}>
                      <Trash2 size={20} /> Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      {showLoginForm && (
        <LoginForm onClose={() => setShowLoginForm(false)} onLogin={handleLogin} />
      )}

      {showSubmitForm && (
        <SubmitArtworkForm 
          onClose={() => { setShowSubmitForm(false); setSubmitStatus(null); }}
          onSubmit={handleSubmitArtwork}
          status={submitStatus}
        />
      )}

      {showEditForm && editingArtwork && (
        <EditArtworkForm 
          artwork={editingArtwork}
          onClose={() => { setShowEditForm(false); setEditingArtwork(null); setSubmitStatus(null); }}
          onSubmit={handleUpdateArtwork}
          status={submitStatus}
        />
      )}
    </div>
  );
};


// Login Form Component
const LoginForm = ({ onClose, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = onLogin(username, password);
    if (!success) {
      setError('Invalid username or password');
    }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000, padding: '16px', backdropFilter: 'blur(4px)' }} onClick={onClose}>
      <div style={{ maxWidth: '400px', width: '100%', backgroundColor: 'white', borderRadius: '20px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }} onClick={(e) => e.stopPropagation()}>
        
        <div style={{ padding: '32px 24px', background: 'linear-gradient(135deg, #F39EB6, #B8DB80)', borderRadius: '20px 20px 0 0', position: 'relative' }}>
          <button onClick={onClose} style={{ position: 'absolute', top: '16px', right: '16px', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.9)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X size={20} color="#F39EB6" />
          </button>
          <Lock size={32} color="white" style={{ marginBottom: '12px' }} />
          <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>Admin Login</h2>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '14px' }}>Enter credentials to manage content</p>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '32px 24px' }}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#F39EB6', marginBottom: '8px' }}>Username</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required
              style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '2px solid #FFE4EF', fontSize: '15px', outline: 'none', backgroundColor: '#FAFAFA' }}
              onFocus={(e) => e.target.style.borderColor = '#F39EB6'}
              onBlur={(e) => e.target.style.borderColor = '#FFE4EF'} />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#F39EB6', marginBottom: '8px' }}>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
              style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '2px solid #FFE4EF', fontSize: '15px', outline: 'none', backgroundColor: '#FAFAFA' }}
              onFocus={(e) => e.target.style.borderColor = '#F39EB6'}
              onBlur={(e) => e.target.style.borderColor = '#FFE4EF'} />
          </div>

          {error && (
            <div style={{ padding: '12px', backgroundColor: '#fee', color: '#c00', borderRadius: '8px', fontSize: '14px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertCircle size={18} /> {error}
            </div>
          )}

          <button type="submit"
            style={{ width: '100%', padding: '16px', background: 'linear-gradient(135deg, #F39EB6, #FFB5C5)', color: 'white', borderRadius: '12px', fontWeight: 'bold', fontSize: '16px', border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(243,158,182,0.3)', transition: 'all 0.2s' }}
            onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

// Submit Artwork Form Component - FIXED VERSION
const SubmitArtworkForm = ({ onClose, onSubmit, status }) => {
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    category: 'painting',     // ← FIXED: Default value instead of empty string
    description: '',
    image: null,              // ← CORRECT: Object with { url, publicId }
    profileImage: '',         // ← ADDED: Was missing
    instagram: ''             // ← ADDED: Was missing
  });

  const [profilePreview, setProfilePreview] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting form data:', formData); // Debug log
    onSubmit(formData);
  };

  const handleProfileUpload = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      setProfilePreview(dataUrl);
      setFormData(prev => ({ ...prev, profileImage: dataUrl }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '16px', overflowY: 'auto', backdropFilter: 'blur(4px)' }} onClick={onClose}>
      <div style={{ maxWidth: '600px', width: '100%', backgroundColor: 'white', borderRadius: '20px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)', maxHeight: '90vh', overflowY: 'auto' }} onClick={(e) => e.stopPropagation()}>
        
        <div style={{ padding: '32px 24px', background: 'linear-gradient(135deg, #B8DB80, #F39EB6)', borderRadius: '20px 20px 0 0', position: 'relative' }}>
          <button onClick={onClose} style={{ position: 'absolute', top: '16px', right: '16px', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.9)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
            <X size={20} color="#F39EB6" />
          </button>
          <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>Submit Your Artwork</h2>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '14px' }}>Share your creativity with the Scribbles community</p>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '32px 24px' }}>
          {/* Profile Picture Upload */}
          <div style={{ marginBottom: '24px', textAlign: 'center' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#F39EB6', marginBottom: '12px' }}>
              Your Profile Picture (Optional)
            </label>
            {profilePreview ? (
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <img src={profilePreview} alt="Profile" 
                  style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: '4px solid #F39EB6', boxShadow: '0 6px 20px rgba(243,158,182,0.3)' }} />
                <button type="button" onClick={() => { setProfilePreview(null); setFormData(prev => ({ ...prev, profileImage: '' })); }}
                  style={{ position: 'absolute', top: '0', right: '0', width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#F39EB6', color: 'white', border: '2px solid white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
                  <X size={16} />
                </button>
              </div>
            ) : (
              <label style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100px', height: '100px', borderRadius: '50%', border: '3px dashed #F39EB6', cursor: 'pointer', backgroundColor: '#FFE4EF', transition: 'all 0.2s' }}
                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#FFD3E5'; e.currentTarget.style.transform = 'scale(1.05)'; }}
                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#FFE4EF'; e.currentTarget.style.transform = 'scale(1)'; }}>
                <User size={32} color="#F39EB6" style={{ marginBottom: '4px' }} />
                <span style={{ fontSize: '11px', color: '#F39EB6', fontWeight: '600' }}>Upload</span>
                <input type="file" accept="image/*" style={{ display: 'none' }} 
                  onChange={(e) => handleProfileUpload(e.target.files[0])} />
              </label>
            )}
            <p style={{ fontSize: '12px', color: '#999', marginTop: '8px' }}>We'll use a default if not provided</p>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#F39EB6', marginBottom: '8px' }}>
              Artwork Title *
            </label>
            <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required
              style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '2px solid #FFE4EF', fontSize: '15px', outline: 'none', backgroundColor: '#FAFAFA' }}
              placeholder="Enter a creative title..."
              onFocus={(e) => e.target.style.borderColor = '#F39EB6'}
              onBlur={(e) => e.target.style.borderColor = '#FFE4EF'} />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#F39EB6', marginBottom: '8px' }}>
              Your Name *
            </label>
            <input type="text" value={formData.artist} onChange={(e) => setFormData({ ...formData, artist: e.target.value })} required
              style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '2px solid #FFE4EF', fontSize: '15px', outline: 'none', backgroundColor: '#FAFAFA' }}
              placeholder="Your name..."
              onFocus={(e) => e.target.style.borderColor = '#F39EB6'}
              onBlur={(e) => e.target.style.borderColor = '#FFE4EF'} />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#F39EB6', marginBottom: '8px' }}>Category *</label>
            <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} required
              style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '2px solid #FFE4EF', fontSize: '15px', outline: 'none', backgroundColor: '#FAFAFA', cursor: 'pointer' }}>
              <option value="painting">Painting</option>
              <option value="digital">Digital Art</option>
              <option value="photography">Photography</option>
              <option value="traditional">Traditional</option>
            </select>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#F39EB6', marginBottom: '8px' }}>
              Description * ({formData.description.length}/500)
            </label>
            <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required rows="4" maxLength="500"
              style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '2px solid #FFE4EF', fontSize: '15px', outline: 'none', resize: 'vertical', backgroundColor: '#FAFAFA', fontFamily: 'inherit' }}
              placeholder="Describe your artwork..."
              onFocus={(e) => e.target.style.borderColor = '#F39EB6'}
              onBlur={(e) => e.target.style.borderColor = '#FFE4EF'} />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#F39EB6', marginBottom: '8px' }}>
              Instagram Handle (Optional)
            </label>
            <input type="text" value={formData.instagram} onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
              style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '2px solid #FFE4EF', fontSize: '15px', outline: 'none', backgroundColor: '#FAFAFA' }}
              placeholder="@yourusername"
              onFocus={(e) => e.target.style.borderColor = '#F39EB6'}
              onBlur={(e) => e.target.style.borderColor = '#FFE4EF'} />
            <p style={{ fontSize: '12px', color: '#999', marginTop: '6px' }}>💡 We'll link to your Instagram profile</p>
          </div>

          {/* FIXED: ImageUpload receives image object { url, publicId } */}
          <ImageUpload
            onImageUploaded={(image) => {
              console.log('Image uploaded:', image); // Debug log
              setFormData({ ...formData, image }); // image is { url, publicId }
            }}
          />

          {status && (
            <div style={{ marginBottom: '20px', marginTop: '20px', padding: '14px 16px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', backgroundColor: status.type === 'error' ? '#fee' : status.type === 'success' ? '#efe' : '#fef9e7', color: status.type === 'error' ? '#c00' : status.type === 'success' ? '#070' : '#666', border: `2px solid ${status.type === 'error' ? '#fcc' : status.type === 'success' ? '#cfc' : '#fed'}` }}>
              {status.type === 'error' && <AlertCircle size={20} />}
              {status.type === 'success' && <CheckCircle size={20} />}
              <span style={{ fontWeight: '600' }}>{status.message}</span>
            </div>
          )}

          <div style={{ display: 'flex', gap: '12px' }}>
            {/* FIXED: Check formData.image instead of formData.imageUrl */}
            <button type="submit" disabled={status?.type === 'loading' || !formData.image}
              style={{ flex: 1, padding: '16px', background: 'linear-gradient(135deg, #F39EB6, #FFB5C5)', color: 'white', borderRadius: '12px', fontWeight: 'bold', fontSize: '16px', border: 'none', cursor: (status?.type === 'loading' || !formData.image) ? 'not-allowed' : 'pointer', opacity: (status?.type === 'loading' || !formData.image) ? 0.6 : 1, boxShadow: '0 4px 12px rgba(243,158,182,0.3)', transition: 'all 0.2s' }}
              onMouseOver={(e) => !status && formData.image && (e.target.style.transform = 'translateY(-2px)')}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}>
              {status?.type === 'loading' ? 'Submitting...' : '✨ Submit Artwork'}
            </button>
            <button type="button" onClick={onClose}
              style={{ padding: '16px 24px', backgroundColor: '#F7F6D3', color: '#F39EB6', borderRadius: '12px', fontWeight: 'bold', fontSize: '16px', border: 'none', cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#ede9c2'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#F7F6D3'}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
/// Edit Artwork Form Component - FIXED VERSION
const EditArtworkForm = ({ artwork, onClose, onSubmit, status }) => {
  const [formData, setFormData] = useState({ 
    title: artwork.title || '', 
    artist: artwork.artist || '', 
    category: artwork.category || 'painting', 
    description: artwork.description || '', 
    image: artwork.image || null,              // ✅ FIXED: Use artwork.image (not imageUrl)
    profileImage: artwork.profileImage || '',
    instagram: artwork.instagram || '' 
  });
  const [profilePreview, setProfilePreview] = useState(artwork.profileImage);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updating artwork with data:', formData); // ✅ Debug log
    onSubmit(formData);
  };

  const handleProfileUpload = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      setProfilePreview(dataUrl);
      setFormData(prev => ({ ...prev, profileImage: dataUrl }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '16px', overflowY: 'auto', backdropFilter: 'blur(4px)' }} onClick={onClose}>
      <div style={{ maxWidth: '600px', width: '100%', backgroundColor: 'white', borderRadius: '20px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)', maxHeight: '90vh', overflowY: 'auto' }} onClick={(e) => e.stopPropagation()}>
        
        <div style={{ padding: '32px 24px', background: 'linear-gradient(135deg, #FFB74D, #FFA726)', borderRadius: '20px 20px 0 0', position: 'relative' }}>
          <button onClick={onClose} style={{ position: 'absolute', top: '16px', right: '16px', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.9)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
            <X size={20} color="#FFB74D" />
          </button>
          <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>Edit Artwork</h2>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '14px' }}>Update your artwork details</p>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '32px 24px' }}>
          <div style={{ marginBottom: '24px', textAlign: 'center' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#FFB74D', marginBottom: '12px' }}>
              Profile Picture
            </label>
            {profilePreview ? (
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <img src={profilePreview} alt="Profile" 
                  style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: '4px solid #FFB74D', boxShadow: '0 6px 20px rgba(255,183,77,0.3)' }} />
                <button type="button" onClick={() => { setProfilePreview(null); setFormData(prev => ({ ...prev, profileImage: '' })); }}
                  style={{ position: 'absolute', top: '0', right: '0', width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#FFB74D', color: 'white', border: '2px solid white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
                  <X size={16} />
                </button>
              </div>
            ) : (
              <label style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100px', height: '100px', borderRadius: '50%', border: '3px dashed #FFB74D', cursor: 'pointer', backgroundColor: '#FFF3E0', transition: 'all 0.2s' }}
                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#FFE5C6'; e.currentTarget.style.transform = 'scale(1.05)'; }}
                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#FFF3E0'; e.currentTarget.style.transform = 'scale(1)'; }}>
                <User size={32} color="#FFB74D" style={{ marginBottom: '4px' }} />
                <span style={{ fontSize: '11px', color: '#FFB74D', fontWeight: '600' }}>Upload</span>
                <input type="file" accept="image/*" style={{ display: 'none' }} 
                  onChange={(e) => handleProfileUpload(e.target.files[0])} />
              </label>
            )}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#FFB74D', marginBottom: '8px' }}>
              Artwork Title *
            </label>
            <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required
              style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '2px solid #FFE0B2', fontSize: '15px', outline: 'none', backgroundColor: '#FAFAFA' }}
              onFocus={(e) => e.target.style.borderColor = '#FFB74D'}
              onBlur={(e) => e.target.style.borderColor = '#FFE0B2'} />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#FFB74D', marginBottom: '8px' }}>
              Artist Name *
            </label>
            <input type="text" value={formData.artist} onChange={(e) => setFormData({ ...formData, artist: e.target.value })} required
              style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '2px solid #FFE0B2', fontSize: '15px', outline: 'none', backgroundColor: '#FAFAFA' }}
              onFocus={(e) => e.target.style.borderColor = '#FFB74D'}
              onBlur={(e) => e.target.style.borderColor = '#FFE0B2'} />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#FFB74D', marginBottom: '8px' }}>Category *</label>
            <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} required
              style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '2px solid #FFE0B2', fontSize: '15px', outline: 'none', backgroundColor: '#FAFAFA', cursor: 'pointer' }}>
              <option value="painting">Painting</option>
              <option value="digital">Digital Art</option>
              <option value="photography">Photography</option>
              <option value="traditional">Traditional</option>
            </select>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#FFB74D', marginBottom: '8px' }}>
              Description * ({formData.description.length}/500)
            </label>
            <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required rows="4" maxLength="500"
              style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '2px solid #FFE0B2', fontSize: '15px', outline: 'none', resize: 'vertical', backgroundColor: '#FAFAFA', fontFamily: 'inherit' }}
              onFocus={(e) => e.target.style.borderColor = '#FFB74D'}
              onBlur={(e) => e.target.style.borderColor = '#FFE0B2'} />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#FFB74D', marginBottom: '8px' }}>
              Instagram Handle (Optional)
            </label>
            <input type="text" value={formData.instagram} onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
              style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '2px solid #FFE0B2', fontSize: '15px', outline: 'none', backgroundColor: '#FAFAFA' }}
              placeholder="@yourusername"
              onFocus={(e) => e.target.style.borderColor = '#FFB74D'}
              onBlur={(e) => e.target.style.borderColor = '#FFE0B2'} />
          </div>

          {/* ✅ FIXED: ImageUpload for updating image */}
          <ImageUpload 
            onImageUploaded={(image) => {
              console.log('New image uploaded:', image); // ✅ Debug log
              setFormData({ ...formData, image });
            }} 
          />

          {status && (
            <div style={{ marginBottom: '20px', marginTop: '20px', padding: '14px 16px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', backgroundColor: status.type === 'error' ? '#fee' : status.type === 'success' ? '#efe' : '#fef9e7', color: status.type === 'error' ? '#c00' : status.type === 'success' ? '#070' : '#666', border: `2px solid ${status.type === 'error' ? '#fcc' : status.type === 'success' ? '#cfc' : '#fed'}` }}>
              {status.type === 'error' && <AlertCircle size={20} />}
              {status.type === 'success' && <CheckCircle size={20} />}
              <span style={{ fontWeight: '600' }}>{status.message}</span>
            </div>
          )}

          <div style={{ display: 'flex', gap: '12px' }}>
            {/* ✅ FIXED: Check formData.image instead of formData.imageUrl */}
            <button type="submit" disabled={status?.type === 'loading' || !formData.image}
              style={{ flex: 1, padding: '16px', background: 'linear-gradient(135deg, #FFB74D, #FFA726)', color: 'white', borderRadius: '12px', fontWeight: 'bold', fontSize: '16px', border: 'none', cursor: (status?.type === 'loading' || !formData.image) ? 'not-allowed' : 'pointer', opacity: (status?.type === 'loading' || !formData.image) ? 0.6 : 1, boxShadow: '0 4px 12px rgba(255,183,77,0.3)', transition: 'all 0.2s' }}
              onMouseOver={(e) => !status && formData.image && (e.target.style.transform = 'translateY(-2px)')}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}>
              {status?.type === 'loading' ? 'Updating...' : '✨ Update Artwork'}
            </button>
            <button type="button" onClick={onClose}
              style={{ padding: '16px 24px', backgroundColor: '#F7F6D3', color: '#FFB74D', borderRadius: '12px', fontWeight: 'bold', fontSize: '16px', border: 'none', cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#ede9c2'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#F7F6D3'}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ArtGallery;