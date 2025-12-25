// ============================================
// FILE: backend/models/Artwork.js - UPDATED SCHEMA
// LOCATION: backend/models/Artwork.js
// ============================================
const mongoose = require('mongoose');

const artworkSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  artist: { 
    type: String, 
    required: true 
  },
  category: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  image: {
    url: { type: String, required: true },
    publicId: { type: String, required: true }
  },
  profileImage: String,
  instagram: String,
  
  // Stats
  likes: { 
    type: Number, 
    default: 0 
  },
  views: { 
    type: Number, 
    default: 0 
  },
  featured: { 
    type: Boolean, 
    default: false 
  },
  
  // IP Tracking Arrays - ADD THESE
  likedBy: [String],    // Array of IPs who liked
  viewedBy: [String]    // Array of IPs who viewed
  
}, { timestamps: true });

// Indexes for better performance
artworkSchema.index({ 'image.publicId': 1 });
artworkSchema.index({ artist: 1 });
artworkSchema.index({ createdAt: -1 });
artworkSchema.index({ likes: -1 });

module.exports = mongoose.model('Artwork', artworkSchema);