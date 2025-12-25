// ============================================
// FILE: backend/models/Artist.js - ENHANCED
// ============================================
const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  bio: { type: String, maxlength: 500 },
  instagram: { type: String, trim: true },
  portfolio: { type: String, trim: true },
  linkedin: { type: String, trim: true },
  behance: { type: String, trim: true },
  specialization: [{
    type: String,
    enum: ['painting', 'digital', 'photography', 'traditional', 'sculpture', 'mixed-media']
  }],
  profileImage: { type: String },
  
  // Statistics
  totalArtworks: { type: Number, default: 0 },
  totalLikes: { type: Number, default: 0 },
  totalViews: { type: Number, default: 0 },
  
  // Monthly tracking
  monthlyUploads: [{
    month: String, // Format: "2024-12"
    count: Number
  }],
  
  // Featured artist tracking
  isArtistOfMonth: { type: Boolean, default: false },
  artistOfMonthDate: { type: Date },
  monthlyScore: { type: Number, default: 0 }, // For artist of the month selection
  
  // Metadata
  memberSince: { type: Date, default: Date.now },
  lastActive: { type: Date, default: Date.now }
}, { timestamps: true });

// Calculate monthly score (uploads + engagement)
artistSchema.methods.calculateMonthlyScore = function(currentMonth) {
  const monthData = this.monthlyUploads.find(m => m.month === currentMonth);
  const uploads = monthData ? monthData.count : 0;
  
  // Score = uploads * 10 + total likes + (total views / 10)
  this.monthlyScore = (uploads * 10) + this.totalLikes + Math.floor(this.totalViews / 10);
  return this.monthlyScore;
};

module.exports = mongoose.model('Artist', artistSchema);