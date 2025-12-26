// ============================================
// FILE: backend/models/Post.js - FIXED
// LOCATION: backend/models/Post.js
// ============================================
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  author: {
    type: String,
    required: [true, 'Author name is required'],
    trim: true,
    maxlength: [100, 'Author name cannot exceed 100 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['poetry', 'tutorial', 'digital', 'painting', 'journaling'],
    lowercase: true
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    maxlength: [5000, 'Content cannot exceed 5000 characters']
  },
  excerpt: {
    type: String,
    required: [true, 'Excerpt is required'],
    maxlength: [300, 'Excerpt cannot exceed 300 characters']
  },
  image: {
    url: {
      type: String,
      required: false
    },
    publicId: {
      type: String,
      required: false
      // REMOVED: index: true - This was causing the duplicate index warning
    }
  },
  tags: [{
    type: String,
    trim: true
  }],
  likes: {
    type: Number,
    default: 0,
    min: 0
  },
  views: {
    type: Number,
    default: 0,
    min: 0
  },
  likedBy: [{
    type: String
  }],
  viewedBy: [{
    type: String
  }],
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// REMOVED: postSchema.index({ 'image.publicId': 1 }); 
// This was causing the duplicate index warning when combined with index: true above

// Add index for queries
postSchema.index({ createdAt: -1 });
postSchema.index({ category: 1 });
postSchema.index({ featured: 1 });

// Virtual for formatted date
postSchema.virtual('formattedDate').get(function() {
  return this.createdAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

// Method to check if IP has liked
postSchema.methods.hasLiked = function(ip) {
  return this.likedBy && this.likedBy.includes(ip);
};

// Method to check if IP has viewed
postSchema.methods.hasViewed = function(ip) {
  return this.viewedBy && this.viewedBy.includes(ip);
};

module.exports = mongoose.model('Post', postSchema);