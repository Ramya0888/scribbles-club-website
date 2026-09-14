import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '../../components/Navbar';
import './Blog.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://scribbles-club-website.onrender.com';
const CATEGORIES = ['All', 'Painting', 'Poetry', 'Digital Art', 'Journaling', 'Tutorials'];
const VALID_CATEGORIES = new Set(CATEGORIES.filter(c => c !== 'All'));

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    author_name: '',
    category: 'Painting',
    content: '',
    image_url: ''
  });

  const [visibleCount, setVisibleCount] = useState(9);
  const fetchPosts = useCallback(async (category) => {
    setIsLoading(true);
    setError('');
    try {
      const url = category && category !== 'All'
        ? `${API_BASE_URL}/api/posts?category=${encodeURIComponent(category)}&limit=50`
        : `${API_BASE_URL}/api/posts?limit=50`;
      const controller = new AbortController();
      const t = setTimeout(() => controller.abort(), 8000);
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(t);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      if (Array.isArray(data)) setPosts(data);
      else setPosts([]);
      setVisibleCount(9);
    } catch (err) {
      setError(err.name === 'AbortError' ? 'Request timed out. Please retry.' : 'Failed to load posts. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts(selectedCategory);
  }, [fetchPosts, selectedCategory]);

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 4 * 1024 * 1024) {
      alert('Image must be under 4MB');
      e.target.value = '';
      return;
    }
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxWidth = 600;
        const scale = maxWidth / img.width;
        const width = img.width > maxWidth ? maxWidth : img.width;
        const height = img.width > maxWidth ? img.height * scale : img.height;
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.5);
        setFormData(prev => ({ ...prev, image_url: compressedBase64 }));
      };
      img.onerror = () => alert('Failed to process image');
      img.src = event.target.result;
    };
    reader.onerror = () => alert('Failed to read file');
    reader.readAsDataURL(file);
  };

  const validateForm = () => {
    if (formData.title.trim().length < 2 || formData.title.trim().length > 200) {
      alert('Title must be 2-200 characters');
      return false;
    }
    if (formData.author_name.trim().length < 2 || formData.author_name.trim().length > 100) {
      alert('Author name must be 2-100 characters');
      return false;
    }
    if (!VALID_CATEGORIES.has(formData.category)) {
      alert('Invalid category');
      return false;
    }
    if (formData.content.trim().length < 10 || formData.content.trim().length > 10000) {
      alert('Content must be 10-10000 characters');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setSubmitting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title.trim(),
          author_name: formData.author_name.trim(),
          category: formData.category,
          content: formData.content.trim(),
          image_url: formData.image_url
        })
      });
      const data = await response.json();
      if (response.ok) {
        setIsModalOpen(false);
        setFormData({ title: '', author_name: '', category: 'Painting', content: '', image_url: '' });
        fetchPosts(selectedCategory);
      } else {
        alert(data.error || 'Failed to create post');
      }
    } catch (err) {
      alert(`Network error: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (!isModalOpen && !selectedImage) return;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
        setSelectedImage(null);
      }
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isModalOpen, selectedImage]);

  return (
    <div className="blog-page">
      <Navbar />
      <div className="blog-container">
        <div className="blog-header">
          <div className="blog-title-group">
            <h1>Blog & Creative Journal</h1>
            <p>Explore original poetry, artwork, tutorials, and digital experiments created by our members.</p>
          </div>
          <button className="btn-create-post" onClick={() => setIsModalOpen(true)}>
            + Create Post
          </button>
        </div>

        <div className="blog-categories" role="tablist" aria-label="Filter by category">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              role="tab"
              aria-selected={selectedCategory === cat}
              className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => handleCategoryChange(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="blog-loader" role="status" aria-live="polite">
            <div className="spinner" />
            <p>Loading posts...</p>
          </div>
        ) : error ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
            <p>{error}</p>
            <button className="btn primary" onClick={() => fetchPosts(selectedCategory)} style={{ marginTop: 12 }}>Retry</button>
          </div>
        ) : posts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
            <p>No posts yet in {selectedCategory}. Be the first to create one!</p>
          </div>
        ) : (
          <>
            <div className="blog-grid">
              {posts.slice(0, visibleCount).map(post => (
                <article key={post.id} className="blog-card">
                  {post.image_url && (
                    <img
                      src={post.image_url}
                      alt={post.title}
                      className="blog-card-image"
                      onClick={() => setSelectedImage(post.image_url)}
                      style={{ cursor: 'pointer' }}
                      loading="lazy"
                      decoding="async"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                  )}
                  <div className="blog-card-body">
                    <span className="blog-card-tag">{post.category}</span>
                    <h3 className="blog-card-title">{post.title}</h3>
                    <p className="blog-card-author">By {post.author_name}</p>
                    <p className="blog-card-content">{post.content}</p>
                  </div>
                </article>
              ))}
            </div>
            {visibleCount < posts.length && (
              <div style={{ textAlign: 'center', marginTop: 32 }}>
                <button className="btn primary" onClick={() => setVisibleCount(v => v + 9)}>Load more ({posts.length - visibleCount} remaining)</button>
              </div>
            )}
          </>
        )}
      </div>

      {isModalOpen && (
        <div className="blog-modal-backdrop" onClick={closeModal}>
          <div className="blog-modal-card" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Create new post">
            <h2>Create New Post</h2>
            <form onSubmit={handleSubmit} className="blog-form" noValidate>
              <input
                type="text"
                placeholder="Title (2-200 chars)"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                required
                maxLength={200}
              />
              <input
                type="text"
                placeholder="Author Name"
                value={formData.author_name}
                onChange={e => setFormData({ ...formData, author_name: e.target.value })}
                required
                maxLength={100}
              />
              <select
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
                aria-label="Category"
              >
                {Array.from(VALID_CATEGORIES).map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                aria-label="Upload image"
              />
              {formData.image_url && (
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Image attached ✓ (compressed)</div>
              )}
              <textarea
                placeholder="Write your story, poem, or content here..."
                rows="5"
                value={formData.content}
                onChange={e => setFormData({ ...formData, content: e.target.value })}
                required
                maxLength={10000}
              />
              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit" disabled={submitting}>
                  {submitting ? 'Publishing...' : 'Publish Post'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedImage && (
        <div className="blog-modal-backdrop" onClick={() => setSelectedImage(null)}>
          <div className="blog-modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: '90vw', width: 'auto', padding: '16px', textAlign: 'center' }}>
            <img
              src={selectedImage}
              alt="Expanded view"
              style={{ maxWidth: '100%', maxHeight: '80vh', borderRadius: '12px', objectFit: 'contain' }}
            />
            <div style={{ marginTop: '12px' }}>
              <button className="btn-cancel" onClick={() => setSelectedImage(null)}>
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
