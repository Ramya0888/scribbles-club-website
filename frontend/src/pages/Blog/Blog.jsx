import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import './Blog.css';

const CATEGORIES = ['All', 'Painting', 'Poetry', 'Digital Art', 'Journaling', 'Tutorials'];

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    author_name: '',
    category: 'Painting',
    content: '',
    image_url: ''
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/posts');
      const data = await response.json();
      if (Array.isArray(data)) setPosts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

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
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        setIsModalOpen(false);
        setFormData({ title: '', author_name: '', category: 'Painting', content: '', image_url: '' });
        fetchPosts();
      } else {
        alert(`Error: ${data.error || 'Failed to create post'}`);
      }
    } catch (err) {
      alert(`Network error: ${err.message}`);
    }
  };

  const filteredPosts = posts.filter((post) => {
    if (selectedCategory === 'All') return true;
    return post.category?.trim().toLowerCase() === selectedCategory.trim().toLowerCase();
  });

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

        <div className="blog-categories">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="blog-loader">
            <div className="spinner"></div>
            <p>Loading posts...</p>
          </div>
        ) : (
          <div className="blog-grid">
            {filteredPosts.map(post => (
              <div key={post.id} className="blog-card">
                {post.image_url && (
                  <img 
                    src={post.image_url} 
                    alt={post.title} 
                    className="blog-card-image" 
                    onClick={() => setSelectedImage(post.image_url)}
                    style={{ cursor: 'pointer' }}
                    loading="lazy"
                  />
                )}
                <div className="blog-card-body">
                  <span className="blog-card-tag">{post.category}</span>
                  <h3 className="blog-card-title">{post.title}</h3>
                  <p className="blog-card-author">By {post.author_name}</p>
                  <p className="blog-card-content">{post.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="blog-modal-backdrop">
          <div className="blog-modal-card">
            <h2>Create New Post</h2>
            <form onSubmit={handleSubmit} className="blog-form">
              <input 
                type="text" 
                placeholder="Title" 
                value={formData.title} 
                onChange={e => setFormData({ ...formData, title: e.target.value })} 
                required 
              />
              <input 
                type="text" 
                placeholder="Author Name" 
                value={formData.author_name} 
                onChange={e => setFormData({ ...formData, author_name: e.target.value })} 
                required 
              />
              <select 
                value={formData.category} 
                onChange={e => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="Painting">Painting</option>
                <option value="Poetry">Poetry</option>
                <option value="Digital Art">Digital Art</option>
                <option value="Journaling">Journaling</option>
                <option value="Tutorials">Tutorials</option>
              </select>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange} 
              />
              <textarea 
                placeholder="Write your story, poem, or content here..." 
                rows="5" 
                value={formData.content} 
                onChange={e => setFormData({ ...formData, content: e.target.value })} 
                required 
              />
              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  Publish Post
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