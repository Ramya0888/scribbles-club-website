import React, { useState, useEffect } from 'react';
import { X, Calendar, User, Search, Plus, Eye, Tag, BookOpen, Sparkles, Home, Filter, Zap, Lock, Edit, Trash2, LogOut, AlertCircle, CheckCircle, Upload, Image as ImageIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// ADMIN CREDENTIALS - Change these!
const ADMIN_USERNAME = 'admin_001';
const ADMIN_PASSWORD = 'scribbles@2025';

// Helper function to get image URL
const getImageUrl = (post) => {
  if (post.image && post.image.url) return post.image.url;
  if (post.image) return post.image;
  return '';
};

const CreativeJournal = () => {
  const navigate = useNavigate();
  const [allPosts, setAllPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [sortBy, setSortBy] = useState('recent');
  const [stats, setStats] = useState({ totalPosts: 0, totalViews: 0 });
  const [isAdmin, setIsAdmin] = useState(false);

  const categories = [
    { name: 'All', icon: '🎨', color: '#F39EB6' },
    { name: 'Poetry', icon: '✍️', color: '#FFB5C5' },
    { name: 'Tutorial', icon: '📚', color: '#B8DB80' },
    { name: 'Digital', icon: '💻', color: '#A8E6CF' },
    { name: 'Painting', icon: '🖌️', color: '#FFD3B6' },
    { name: 'Journaling', icon: '📖', color: '#FFAAA5' }
  ];

  useEffect(() => {
    fetchPosts();
    
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
    filterAndSortPosts();
  }, [allPosts, selectedCategory, searchTerm, sortBy]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/posts`);
      const posts = response.data.data;
      setAllPosts(posts);
      
      const totalViews = posts.reduce((sum, post) => sum + (post.views || 0), 0);
      setStats({ totalPosts: posts.length, totalViews });
    } catch (err) {
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortPosts = () => {
    let filtered = [...allPosts];

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => 
        post.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(search) ||
        post.content.toLowerCase().includes(search) ||
        (post.excerpt && post.excerpt.toLowerCase().includes(search)) ||
        post.author.toLowerCase().includes(search) ||
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(search)))
      );
    }

    if (sortBy === 'mostViewed') {
      filtered.sort((a, b) => (b.views || 0) - (a.views || 0));
    } else {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setFilteredPosts(filtered);
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

  const handlePostClick = async (post) => {
    setSelectedPost(post);
    
    try {
      const response = await axios.get(`${API_URL}/posts/${post._id}`);
      const updated = response.data.data;
      setAllPosts(prev => prev.map(p => 
        p._id === post._id ? updated : p
      ));
    } catch (err) {
      console.error('Error tracking view:', err);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      setSubmitStatus({ type: 'loading', message: 'Submitting...' });
      await axios.post(`${API_URL}/posts`, formData);
      setSubmitStatus({ type: 'success', message: 'Story submitted successfully!' });
      setTimeout(() => {
        setShowSubmitForm(false);
        setSubmitStatus(null);
        fetchPosts();
      }, 2000);
    } catch (err) {
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

  const handleUpdatePost = async (formData) => {
    try {
      setSubmitStatus({ type: 'loading', message: 'Updating...' });
      await axios.put(`${API_URL}/posts/${editingPost._id}`, formData);
      setSubmitStatus({ type: 'success', message: 'Story updated successfully!' });
      setTimeout(() => {
        setShowEditForm(false);
        setEditingPost(null);
        setSubmitStatus(null);
        fetchPosts();
      }, 2000);
    } catch (err) {
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

  const handleDeletePost = async (id) => {
    if (!window.confirm('Are you sure you want to delete this story?')) return;
    
    try {
      await axios.delete(`${API_URL}/posts/${id}`);
      fetchPosts();
      setSelectedPost(null);
    } catch (err) {
      console.error('Error deleting post:', err);
      alert('Failed to delete story');
    }
  };

  const handleEditClick = (post, e) => {
    e?.stopPropagation();
    setEditingPost(post);
    setShowEditForm(true);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#F7F6D3' }}>
        <div style={{ width: '64px', height: '64px', border: '4px solid #FFE4EF', borderTopColor: '#F39EB6', borderRadius: '50%', animation: 'spin 0.8s linear infinite', marginBottom: '20px' }}></div>
        <p style={{ color: '#F39EB6', fontSize: '20px', fontWeight: '600' }}>Loading stories...</p>
        <p style={{ fontSize: '14px', color: '#999', marginTop: '8px' }}>Discovering creative journeys</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  };

  // Featured post is the most viewed one
  const featuredPost = filteredPosts.length > 0 
    ? filteredPosts.reduce((max, post) => (post.views > max.views ? post : max), filteredPosts[0])
    : null;
  const regularPosts = filteredPosts.filter(p => p._id !== featuredPost?._id);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F7F6D3', userSelect: 'none' }}>
      {/* Header */}
      <header style={{ background: 'linear-gradient(135deg, #F39EB6 0%, #FFE4EF 50%, #B8DB80 100%)', position: 'relative', overflow: 'hidden' }}>
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

        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '48px 24px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '8px 20px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '20px', marginBottom: '16px', backdropFilter: 'blur(10px)' }}>
            <BookOpen size={18} color="white" />
            <span style={{ color: 'white', fontSize: '13px', fontWeight: '600' }}>Creative Community</span>
          </div>
          <h1 style={{ fontSize: '48px', fontWeight: 'bold', color: 'white', marginBottom: '12px', textShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>Creative Journal</h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.95)', marginBottom: '20px', maxWidth: '600px', margin: '0 auto 20px' }}>
            {stats.totalPosts} stories • {stats.totalViews} views
          </p>
          {isAdmin && (
            <button onClick={() => setShowSubmitForm(true)} 
              style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '14px 32px', backgroundColor: 'white', color: '#F39EB6', borderRadius: '30px', fontWeight: 'bold', fontSize: '16px', border: 'none', cursor: 'pointer', boxShadow: '0 4px 16px rgba(0,0,0,0.15)', transition: 'all 0.2s' }}
              onMouseOver={(e) => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.2)'; }}
              onMouseOut={(e) => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)'; }}>
              <Plus size={20} strokeWidth={2.5} /> Share Your Story
            </button>
          )}
        </div>
      </header>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '48px 24px' }}>
        {/* Search & Filters */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
          <div style={{ position: 'relative', maxWidth: '600px', margin: '0 auto', width: '100%' }}>
            <Search style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: '#F39EB6' }} size={20} />
            <input type="text" placeholder="Search stories, tutorials, poems..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '16px 24px 16px 56px', borderRadius: '30px', border: '2px solid white', backgroundColor: 'white', fontSize: '15px', outline: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', transition: 'all 0.2s' }}
              onFocus={(e) => { e.target.style.borderColor = '#F39EB6'; e.target.style.boxShadow = '0 6px 20px rgba(243,158,182,0.15)'; }}
              onBlur={(e) => { e.target.style.borderColor = 'white'; e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'; }} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              {[
                { value: 'recent', label: 'Recent', icon: Zap },
                { value: 'mostViewed', label: 'Most Viewed', icon: Eye }
              ].map(sort => {
                const Icon = sort.icon;
                return (
                  <button key={sort.value} onClick={() => setSortBy(sort.value)}
                    style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 20px', borderRadius: '20px', border: '2px solid ' + (sortBy === sort.value ? '#F39EB6' : 'white'), backgroundColor: sortBy === sort.value ? '#F39EB6' : 'white', color: sortBy === sort.value ? 'white' : '#666', fontSize: '14px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s', boxShadow: sortBy === sort.value ? '0 4px 12px rgba(243,158,182,0.3)' : 'none' }}>
                    <Icon size={16} /> {sort.label}
                  </button>
                );
              })}
            </div>
            <span style={{ fontSize: '14px', color: '#666', fontWeight: '500' }}>
              {filteredPosts.length} {filteredPosts.length === 1 ? 'story' : 'stories'}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px', marginBottom: '48px' }}>
          {categories.map(cat => (
            <button key={cat.name} onClick={() => setSelectedCategory(cat.name.toLowerCase())}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '24px', fontWeight: '600', fontSize: '14px', border: '2px solid white', cursor: 'pointer', backgroundColor: selectedCategory === cat.name.toLowerCase() ? 'white' : 'transparent', color: selectedCategory === cat.name.toLowerCase() ? cat.color : '#666', boxShadow: selectedCategory === cat.name.toLowerCase() ? '0 4px 12px rgba(0,0,0,0.08)' : 'none', transition: 'all 0.2s' }}
              onMouseOver={(e) => { if (selectedCategory !== cat.name.toLowerCase()) { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'; }}}
              onMouseOut={(e) => { if (selectedCategory !== cat.name.toLowerCase()) { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.boxShadow = 'none'; }}}>
              <span style={{ fontSize: '18px' }}>{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        {featuredPost && selectedCategory === 'all' && !searchTerm && (
          <div style={{ marginBottom: '56px' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 20px', backgroundColor: '#FFE4EF', borderRadius: '20px', marginBottom: '12px' }}>
                <Sparkles size={18} color="#F39EB6" />
                <span style={{ color: '#F39EB6', fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>Featured Story</span>
              </div>
              <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#F39EB6' }}>Most Popular Story</h2>
            </div>

            <div style={{ backgroundColor: 'white', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.12)', cursor: 'pointer' }} onClick={() => handlePostClick(featuredPost)}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '0' }}>
                <div style={{ position: 'relative', minHeight: '350px' }}>
                  <img src={getImageUrl(featuredPost)} alt={featuredPost.title} 
                    onContextMenu={(e) => e.preventDefault()}
                    onDragStart={(e) => e.preventDefault()}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: '350px', pointerEvents: 'none' }} />
                  <div style={{ position: 'absolute', top: '16px', left: '16px', padding: '8px 16px', backgroundColor: '#FFD700', color: '#333', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
                    <Sparkles size={14} /> FEATURED
                  </div>
                  {isAdmin && (
                    <div style={{ position: 'absolute', bottom: '16px', right: '16px', display: 'flex', gap: '8px' }}>
                      <button onClick={(e) => handleEditClick(featuredPost, e)}
                        style={{ padding: '10px 20px', backgroundColor: 'rgba(255,183,77,0.95)', color: 'white', borderRadius: '20px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold', fontSize: '14px', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
                        <Edit size={16} /> Edit
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); handleDeletePost(featuredPost._id); }}
                        style={{ padding: '10px 20px', backgroundColor: 'rgba(239,83,80,0.95)', color: 'white', borderRadius: '20px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold', fontSize: '14px', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
                        <Trash2 size={16} /> Delete
                      </button>
                    </div>
                  )}
                </div>
                <div style={{ padding: '40px' }}>
                  <div style={{ display: 'inline-block', padding: '6px 16px', backgroundColor: '#F39EB6', color: 'white', borderRadius: '16px', fontSize: '12px', fontWeight: 'bold', marginBottom: '16px', textTransform: 'capitalize' }}>
                    {featuredPost.category}
                  </div>
                  <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#F39EB6', marginBottom: '16px', lineHeight: '1.2' }}>{featuredPost.title}</h2>
                  <p style={{ color: '#666', fontSize: '16px', lineHeight: '1.7', marginBottom: '20px' }}>{featuredPost.excerpt}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px', paddingTop: '20px', borderTop: '2px solid #f5f5f5', flexWrap: 'wrap' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#666', fontSize: '14px', fontWeight: '500' }}>
                      <User size={16} /> {featuredPost.author}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#666', fontSize: '14px' }}>
                      <Eye size={16} color="#B8DB80" /> {featuredPost.views} views
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Regular Posts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {regularPosts.map(post => (
            <article key={post._id} onClick={() => handlePostClick(post)}
              style={{ backgroundColor: 'white', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', cursor: 'pointer', transition: 'all 0.3s', position: 'relative' }}
              onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.18)'; }}
              onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)'; }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '0' }}>
                <div style={{ position: 'relative', minHeight: '300px' }}>
                  <img src={getImageUrl(post)} alt={post.title} 
                    onContextMenu={(e) => e.preventDefault()}
                    onDragStart={(e) => e.preventDefault()}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: '300px', pointerEvents: 'none' }} />
                  <div style={{ position: 'absolute', top: '16px', right: '16px', padding: '6px 14px', backgroundColor: 'rgba(243,158,182,0.95)', color: 'white', borderRadius: '16px', fontSize: '12px', fontWeight: 'bold', backdropFilter: 'blur(4px)', textTransform: 'capitalize' }}>
                    {post.category}
                  </div>

                  {isAdmin && (
                    <div style={{ position: 'absolute', bottom: '16px', right: '16px', display: 'flex', gap: '8px' }}>
                      <button onClick={(e) => handleEditClick(post, e)}
                        style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(255,183,77,0.95)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.2)', transition: 'all 0.2s', zIndex: 10 }}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                        <Edit size={16} color="white" />
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); handleDeletePost(post._id); }}
                        style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(239,83,80,0.95)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.2)', transition: 'all 0.2s', zIndex: 10 }}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                        <Trash2 size={16} color="white" />
                      </button>
                    </div>
                  )}
                </div>

                <div style={{ padding: '32px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', fontSize: '13px', color: '#999' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '500' }}>
                      <User size={14} /> {post.author}
                    </span>
                    <span>•</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={14} />
                      {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  
                  <h3 style={{ fontSize: '28px', fontWeight: 'bold', color: '#333', marginBottom: '16px', lineHeight: '1.3' }}>
                    {post.title}
                  </h3>
                  
                  <p style={{ color: '#666', fontSize: '15px', marginBottom: '20px', lineHeight: '1.7' }}>
                    {post.excerpt}
                  </p>
                  
                  {post.tags && post.tags.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                      {post.tags.slice(0, 3).map(tag => (
                        <span key={tag} style={{ padding: '6px 14px', backgroundColor: '#F7F6D3', color: '#666', borderRadius: '14px', fontSize: '12px', fontWeight: '600' }}>
                          #{tag}
                        </span>
                      ))}
                      {post.tags.length > 3 && (
                        <span style={{ padding: '6px 14px', backgroundColor: '#F7F6D3', color: '#666', borderRadius: '14px', fontSize: '12px', fontWeight: '600' }}>
                          +{post.tags.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px', paddingTop: '20px', borderTop: '2px solid #f5f5f5' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#666', fontWeight: '500', fontSize: '14px' }}>
                      <Eye size={16} color="#B8DB80" /> {post.views} views
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 20px', backgroundColor: 'white', borderRadius: '20px', boxShadow: '0 6px 20px rgba(0,0,0,0.08)' }}>
            <Filter size={56} color="#F39EB6" style={{ marginBottom: '20px', opacity: 0.5 }} />
            <p style={{ fontSize: '22px', color: '#666', marginBottom: '10px', fontWeight: '600' }}>No stories found</p>
            <p style={{ fontSize: '15px', color: '#999' }}>Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedPost && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px', overflowY: 'auto', backdropFilter: 'blur(8px)' }} onClick={() => setSelectedPost(null)}>
          <div style={{ maxWidth: '1100px', width: '100%', backgroundColor: 'white', borderRadius: '24px', overflow: 'hidden', margin: '40px 0', maxHeight: '95vh', overflowY: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }} onClick={(e) => e.stopPropagation()}>
            
            <div style={{ position: 'relative', backgroundColor: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '300px', maxHeight: '60vh' }}>
              <img src={getImageUrl(selectedPost)} alt={selectedPost.title} 
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
                style={{ maxWidth: '100%', maxHeight: '60vh', width: 'auto', height: 'auto', objectFit: 'contain', display: 'block', pointerEvents: 'none' }} />
              
              <button onClick={() => setSelectedPost(null)}
                style={{ position: 'absolute', top: '24px', right: '24px', width: '48px', height: '48px', backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: '50%', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)', boxShadow: '0 4px 16px rgba(0,0,0,0.3)', transition: 'all 0.2s' }}
                onMouseOver={(e) => { e.target.style.transform = 'scale(1.1)'; e.target.style.backgroundColor = '#F39EB6'; }}
                onMouseOut={(e) => { e.target.style.transform = 'scale(1)'; e.target.style.backgroundColor = 'rgba(255,255,255,0.95)'; }}>
                <X size={24} color="#333" />
              </button>
              
              <div style={{ position: 'absolute', bottom: '20px', left: '24px', padding: '8px 20px', backgroundColor: 'rgba(243,158,182,0.95)', color: 'white', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold', backdropFilter: 'blur(10px)', textTransform: 'capitalize' }}>
                {selectedPost.category}
              </div>
            </div>

            <div style={{ padding: '48px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px', fontSize: '14px', color: '#999', flexWrap: 'wrap' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <User size={18} color="#F39EB6" /> 
                  <span style={{ fontWeight: '600', color: '#666' }}>{selectedPost.author}</span>
                </span>
                <span>•</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Calendar size={18} color="#B8DB80" />
                  {new Date(selectedPost.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
                <span>•</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Eye size={18} color="#666" />
                  {selectedPost.views} views
                </span>
              </div>

              <h1 style={{ fontSize: '38px', fontWeight: 'bold', color: '#333', marginBottom: '24px', lineHeight: '1.2' }}>{selectedPost.title}</h1>
              <p style={{ color: '#666', fontSize: '18px', lineHeight: '1.8', marginBottom: '32px', whiteSpace: 'pre-line', fontWeight: '400' }}>{selectedPost.content}</p>

              {selectedPost.tags && selectedPost.tags.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '32px', paddingBottom: '32px', borderBottom: '2px solid #f0f0f0' }}>
                  {selectedPost.tags.map(tag => (
                    <span key={tag} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 18px', backgroundColor: '#F7F6D3', color: '#666', borderRadius: '20px', fontSize: '14px', fontWeight: '600' }}>
                      <Tag size={14} /> {tag}
                    </span>
                  ))}
                </div>
              )}

              {isAdmin && (
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <button onClick={(e) => { e.stopPropagation(); handleEditClick(selectedPost, e); }}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '16px 32px', backgroundColor: '#FFB74D', color: 'white', borderRadius: '30px', fontWeight: 'bold', fontSize: '15px', border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', transition: 'all 0.2s' }}
                    onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                    onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}>
                    <Edit size={18} /> Edit
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); handleDeletePost(selectedPost._id); }}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '16px 32px', backgroundColor: '#EF5350', color: 'white', borderRadius: '30px', fontWeight: 'bold', fontSize: '15px', border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', transition: 'all 0.2s' }}
                    onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                    onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}>
                    <Trash2 size={18} /> Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      {showLoginForm && (
        <LoginForm onClose={() => setShowLoginForm(false)} onLogin={handleLogin} />
      )}

      {showSubmitForm && (
        <SubmitForm 
          onClose={() => { setShowSubmitForm(false); setSubmitStatus(null); }} 
          onSubmit={handleSubmit} 
          status={submitStatus}
        />
      )}

      {showEditForm && editingPost && (
        <EditForm 
          post={editingPost}
          onClose={() => { setShowEditForm(false); setEditingPost(null); setSubmitStatus(null); }}
          onSubmit={handleUpdatePost}
          status={submitStatus}
        />
      )}
    </div>
  );
};

// ==========================================
// IMAGE UPLOAD COMPONENT - ENHANCED
// ==========================================
const ImageUpload = ({ onImageUploaded, currentImage = null }) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentImage?.url || null);
  const [uploadedImage, setUploadedImage] = useState(currentImage);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB');
      return;
    }

    try {
      setUploading(true);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData
        }
      );

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      
      const imageData = {
        url: data.secure_url,
        publicId: data.public_id
      };

      setUploadedImage(imageData);
      onImageUploaded(imageData);
      
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image. Please try again.');
      setPreview(currentImage?.url || null);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    setUploadedImage(null);
    onImageUploaded(null);
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <label style={{ 
        display: 'block', 
        fontSize: '13px', 
        fontWeight: '600', 
        color: '#F39EB6', 
        marginBottom: '8px' 
      }}>
        Featured Image * {uploadedImage && currentImage && uploadedImage.url !== currentImage.url && '(Changed ✨)'}
      </label>

      {preview ? (
        <div style={{ 
          position: 'relative', 
          borderRadius: '12px', 
          overflow: 'hidden',
          border: '2px solid #FFE4EF'
        }}>
          <img 
            src={preview} 
            alt="Preview" 
            style={{ 
              width: '100%', 
              height: '200px', 
              objectFit: 'cover',
              display: 'block'
            }} 
          />
          <button
            type="button"
            onClick={handleRemove}
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'rgba(239,83,80,0.95)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <X size={18} color="white" />
          </button>
          
          <label
            style={{
              position: 'absolute',
              bottom: '12px',
              left: '12px',
              padding: '10px 20px',
              backgroundColor: 'rgba(243,158,182,0.95)',
              color: 'white',
              borderRadius: '20px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: 'bold',
              fontSize: '14px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <ImageIcon size={16} />
            Change Image
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
              disabled={uploading}
            />
          </label>
        </div>
      ) : (
        <label
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 20px',
            border: '2px dashed #FFE4EF',
            borderRadius: '12px',
            cursor: uploading ? 'not-allowed' : 'pointer',
            backgroundColor: '#FAFAFA',
            transition: 'all 0.2s',
            opacity: uploading ? 0.6 : 1
          }}
          onMouseOver={(e) => !uploading && (e.currentTarget.style.borderColor = '#F39EB6')}
          onMouseOut={(e) => !uploading && (e.currentTarget.style.borderColor = '#FFE4EF')}
        >
          <Upload size={40} color="#F39EB6" style={{ marginBottom: '12px' }} />
          <span style={{ 
            color: '#F39EB6', 
            fontWeight: '600', 
            fontSize: '15px', 
            marginBottom: '4px' 
          }}>
            {uploading ? 'Uploading...' : 'Click to upload image'}
          </span>
          <span style={{ color: '#999', fontSize: '13px' }}>
            PNG, JPG, WEBP up to 5MB
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
            disabled={uploading}
          />
        </label>
      )}
    </div>
  );
};

// ==========================================
// LOGIN FORM COMPONENT
// ==========================================
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

// ==========================================
// SUBMIT FORM COMPONENT
// ==========================================
const SubmitForm = ({ onClose, onSubmit, status }) => {
  const [formData, setFormData] = useState({ 
    title: '', 
    author: '', 
    category: 'poetry', 
    content: '', 
    excerpt: '', 
    image: null,
    tags: '' 
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean), featured: false, likes: 0, views: 0 });
  };

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '16px', backdropFilter: 'blur(4px)', overflowY: 'auto' }} onClick={onClose}>
      <div style={{ backgroundColor: 'white', borderRadius: '20px', maxWidth: '600px', width: '100%', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.3)', margin: '20px 0' }} onClick={(e) => e.stopPropagation()}>
        <div style={{ background: 'linear-gradient(135deg, #F39EB6 0%, #FFE4EF 50%, #B8DB80 100%)', padding: '32px 24px', borderRadius: '20px 20px 0 0', position: 'relative' }}>
          <button onClick={onClose} style={{ position: 'absolute', top: '16px', right: '16px', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.9)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <X size={20} color="#F39EB6" />
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <Sparkles size={28} color="white" />
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: 'white', margin: 0 }}>Share Your Story</h2>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '14px', margin: 0 }}>Join our creative community and inspire others</p>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '32px 24px' }}>
          {['title', 'author'].map(field => (
            <div key={field} style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#F39EB6', marginBottom: '8px' }}>
                {field === 'title' ? 'Title *' : 'Your Name *'}
              </label>
              <input type="text" placeholder={field === 'title' ? 'Give your story a captivating title' : 'How should we credit you?'} required
                value={formData[field]} onChange={(e) => setFormData({...formData, [field]: e.target.value})}
                style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '2px solid #FFE4EF', fontSize: '15px', outline: 'none', transition: 'all 0.2s', backgroundColor: '#FAFAFA' }}
                onFocus={(e) => e.target.style.borderColor = '#F39EB6'}
                onBlur={(e) => e.target.style.borderColor = '#FFE4EF'} />
            </div>
          ))}

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#F39EB6', marginBottom: '8px' }}>Category *</label>
            <select required value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}
              style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '2px solid #FFE4EF', fontSize: '15px', outline: 'none', backgroundColor: '#FAFAFA', cursor: 'pointer' }}>
              <option value="poetry">✍️ Poetry</option>
              <option value="tutorial">📚 Tutorial</option>
              <option value="digital">💻 Digital Art</option>
              <option value="painting">🖌️ Painting</option>
              <option value="journaling">📖 Journaling</option>
            </select>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#F39EB6', marginBottom: '8px' }}>
              Short Excerpt * ({formData.excerpt.length}/200)
            </label>
            <textarea placeholder="A brief preview that hooks readers..." required maxLength={200} value={formData.excerpt} 
              onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
              style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '2px solid #FFE4EF', fontSize: '15px', outline: 'none', minHeight: '80px', resize: 'vertical', backgroundColor: '#FAFAFA', fontFamily: 'inherit' }}
              onFocus={(e) => e.target.style.borderColor = '#F39EB6'}
              onBlur={(e) => e.target.style.borderColor = '#FFE4EF'} />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#F39EB6', marginBottom: '8px' }}>
              Full Story * ({formData.content.length}/2000)
            </label>
            <textarea placeholder="Pour your heart out... share your creative journey" required maxLength={2000} value={formData.content} 
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '2px solid #FFE4EF', fontSize: '15px', outline: 'none', minHeight: '180px', resize: 'vertical', backgroundColor: '#FAFAFA', fontFamily: 'inherit', lineHeight: '1.6' }}
              onFocus={(e) => e.target.style.borderColor = '#F39EB6'}
              onBlur={(e) => e.target.style.borderColor = '#FFE4EF'} />
          </div>

          <ImageUpload onImageUploaded={(image) => setFormData({...formData, image})} />

          <div style={{ marginBottom: '28px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#F39EB6', marginBottom: '8px' }}>Tags (comma-separated)</label>
            <input type="text" placeholder="art, creativity, inspiration, tutorial" value={formData.tags} 
              onChange={(e) => setFormData({...formData, tags: e.target.value})}
              style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '2px solid #FFE4EF', fontSize: '15px', outline: 'none', backgroundColor: '#FAFAFA' }}
              onFocus={(e) => e.target.style.borderColor = '#F39EB6'}
              onBlur={(e) => e.target.style.borderColor = '#FFE4EF'} />
          </div>

          {status && (
            <div style={{ marginBottom: '20px', padding: '14px 16px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', backgroundColor: status.type === 'error' ? '#fee' : status.type === 'success' ? '#efe' : '#fef9e7', color: status.type === 'error' ? '#c00' : status.type === 'success' ? '#070' : '#666', border: `2px solid ${status.type === 'error' ? '#fcc' : status.type === 'success' ? '#cfc' : '#fed'}` }}>
              {status.type === 'error' && <AlertCircle size={20} />}
              {status.type === 'success' && <CheckCircle size={20} />}
              <span style={{ fontWeight: '600' }}>{status.message}</span>
            </div>
          )}

          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="submit" disabled={status?.type === 'loading' || !formData.image}
              style={{ flex: 1, padding: '16px', background: 'linear-gradient(135deg, #F39EB6 0%, #FFB5C5 100%)', color: 'white', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: 'bold', cursor: (status?.type === 'loading' || !formData.image) ? 'not-allowed' : 'pointer', opacity: (status?.type === 'loading' || !formData.image) ? 0.6 : 1, boxShadow: '0 4px 12px rgba(243,158,182,0.3)', transition: 'all 0.2s' }}
              onMouseOver={(e) => !status && formData.image && (e.target.style.transform = 'translateY(-2px)')}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}>
              {status?.type === 'loading' ? 'Submitting...' : 'Submit Story ✨'}
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

// ==========================================
// EDIT FORM COMPONENT
// ==========================================
const EditForm = ({ post, onClose, onSubmit, status }) => {
  const [formData, setFormData] = useState({ 
    title: post.title || '', 
    author: post.author || '', 
    category: post.category || 'poetry', 
    content: post.content || '', 
    excerpt: post.excerpt || '', 
    image: post.image || null, 
    tags: post.tags ? post.tags.join(', ') : '' 
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean) });
  };

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '16px', backdropFilter: 'blur(4px)', overflowY: 'auto' }} onClick={onClose}>
      <div style={{ backgroundColor: 'white', borderRadius: '20px', maxWidth: '600px', width: '100%', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.3)', margin: '20px 0' }} onClick={(e) => e.stopPropagation()}>
        <div style={{ background: 'linear-gradient(135deg, #FFB74D, #FFA726)', padding: '32px 24px', borderRadius: '20px 20px 0 0', position: 'relative' }}>
          <button onClick={onClose} style={{ position: 'absolute', top: '16px', right: '16px', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.9)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <X size={20} color="#FFB74D" />
          </button>
          <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>Edit Story</h2>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '14px' }}>Update your creative story</p>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '32px 24px' }}>
          {['title', 'author'].map(field => (
            <div key={field} style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#FFB74D', marginBottom: '8px' }}>
                {field === 'title' ? 'Title *' : 'Your Name *'}
              </label>
              <input type="text" required value={formData[field]} onChange={(e) => setFormData({...formData, [field]: e.target.value})}
                style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '2px solid #FFE0B2', fontSize: '15px', outline: 'none', transition: 'all 0.2s', backgroundColor: '#FAFAFA' }}
                onFocus={(e) => e.target.style.borderColor = '#FFB74D'}
                onBlur={(e) => e.target.style.borderColor = '#FFE0B2'} />
            </div>
          ))}

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#FFB74D', marginBottom: '8px' }}>Category *</label>
            <select required value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}
              style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '2px solid #FFE0B2', fontSize: '15px', outline: 'none', backgroundColor: '#FAFAFA', cursor: 'pointer' }}>
              <option value="poetry">✍️ Poetry</option>
              <option value="tutorial">📚 Tutorial</option>
              <option value="digital">💻 Digital Art</option>
              <option value="painting">🖌️ Painting</option>
              <option value="journaling">📖 Journaling</option>
            </select>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#FFB74D', marginBottom: '8px' }}>
              Short Excerpt * ({formData.excerpt.length}/200)
            </label>
            <textarea required maxLength={200} value={formData.excerpt} 
              onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
              style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '2px solid #FFE0B2', fontSize: '15px', outline: 'none', minHeight: '80px', resize: 'vertical', backgroundColor: '#FAFAFA', fontFamily: 'inherit' }}
              onFocus={(e) => e.target.style.borderColor = '#FFB74D'}
              onBlur={(e) => e.target.style.borderColor = '#FFE0B2'} />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#FFB74D', marginBottom: '8px' }}>
              Full Story * ({formData.content.length}/2000)
            </label>
            <textarea required maxLength={2000} value={formData.content} 
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '2px solid #FFE0B2', fontSize: '15px', outline: 'none', minHeight: '180px', resize: 'vertical', backgroundColor: '#FAFAFA', fontFamily: 'inherit', lineHeight: '1.6' }}
              onFocus={(e) => e.target.style.borderColor = '#FFB74D'}
              onBlur={(e) => e.target.style.borderColor = '#FFE0B2'} />
          </div>

          <ImageUpload 
            currentImage={post.image}
            onImageUploaded={(image) => setFormData({...formData, image})} 
          />

          <div style={{ marginBottom: '28px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#FFB74D', marginBottom: '8px' }}>Tags (comma-separated)</label>
            <input type="text" value={formData.tags} 
              onChange={(e) => setFormData({...formData, tags: e.target.value})}
              style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '2px solid #FFE0B2', fontSize: '15px', outline: 'none', backgroundColor: '#FAFAFA' }}
              onFocus={(e) => e.target.style.borderColor = '#FFB74D'}
              onBlur={(e) => e.target.style.borderColor = '#FFE0B2'} />
          </div>

          {status && (
            <div style={{ marginBottom: '20px', padding: '14px 16px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', backgroundColor: status.type === 'error' ? '#fee' : status.type === 'success' ? '#efe' : '#fef9e7', color: status.type === 'error' ? '#c00' : status.type === 'success' ? '#070' : '#666', border: `2px solid ${status.type === 'error' ? '#fcc' : status.type === 'success' ? '#cfc' : '#fed'}` }}>
              {status.type === 'error' && <AlertCircle size={20} />}
              {status.type === 'success' && <CheckCircle size={20} />}
              <span style={{ fontWeight: '600' }}>{status.message}</span>
            </div>
          )}

          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="submit" disabled={status?.type === 'loading' || !formData.image}
              style={{ flex: 1, padding: '16px', background: 'linear-gradient(135deg, #FFB74D, #FFA726)', color: 'white', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: 'bold', cursor: (status?.type === 'loading' || !formData.image) ? 'not-allowed' : 'pointer', opacity: (status?.type === 'loading' || !formData.image) ? 0.6 : 1, boxShadow: '0 4px 12px rgba(255,183,77,0.3)', transition: 'all 0.2s' }}
              onMouseOver={(e) => !status && formData.image && (e.target.style.transform = 'translateY(-2px)')}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}>
              {status?.type === 'loading' ? 'Updating...' : 'Update Story ✨'}
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

export default CreativeJournal;