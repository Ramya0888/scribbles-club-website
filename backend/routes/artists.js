// ============================================
// FILE: backend/routes/artists.js - COMPLETE WITH AGGREGATION
// ============================================
const express = require('express');
const router = express.Router();
const Artist = require('../models/Artist');
const Artwork = require('../models/Artwork');

// Helper: Get current month string
const getCurrentMonth = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
};

// GET all artists with aggregated stats
router.get('/', async (req, res) => {
  try {
    const artists = await Artist.find().sort({ totalArtworks: -1 });
    
    // Aggregate stats from artworks for each artist
    const artistsWithStats = await Promise.all(artists.map(async (artist) => {
      // Get all artworks by this artist (matching by name)
      const artworks = await Artwork.find({ artist: artist.name });
      
      // Calculate totals
      const totalArtworks = artworks.length;
      const totalLikes = artworks.reduce((sum, art) => sum + (art.likes || 0), 0);
      const totalViews = artworks.reduce((sum, art) => sum + (art.views || 0), 0);
      
      // Update artist document if stats changed
      if (artist.totalArtworks !== totalArtworks || 
          artist.totalLikes !== totalLikes || 
          artist.totalViews !== totalViews) {
        artist.totalArtworks = totalArtworks;
        artist.totalLikes = totalLikes;
        artist.totalViews = totalViews;
        await artist.save();
      }
      
      return {
        ...artist.toObject(),
        totalArtworks,
        totalLikes,
        totalViews
      };
    }));
    
    res.json({ 
      success: true, 
      data: artistsWithStats.sort((a, b) => b.totalArtworks - a.totalArtworks)
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET artist by ID
router.get('/:id', async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);
    if (!artist) {
      return res.status(404).json({ success: false, error: 'Artist not found' });
    }
    
    // Get aggregated stats
    const artworks = await Artwork.find({ artist: artist.name });
    const totalArtworks = artworks.length;
    const totalLikes = artworks.reduce((sum, art) => sum + (art.likes || 0), 0);
    const totalViews = artworks.reduce((sum, art) => sum + (art.views || 0), 0);
    
    res.json({ 
      success: true, 
      data: {
        ...artist.toObject(),
        totalArtworks,
        totalLikes,
        totalViews
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST create new artist
router.post('/', async (req, res) => {
  try {
    const artist = new Artist(req.body);
    await artist.save();
    
    res.status(201).json({ success: true, data: artist });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// PUT update artist
router.put('/:id', async (req, res) => {
  try {
    const artist = await Artist.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!artist) {
      return res.status(404).json({ success: false, error: 'Artist not found' });
    }
    
    res.json({ success: true, data: artist });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// DELETE artist
router.delete('/:id', async (req, res) => {
  try {
    const artist = await Artist.findByIdAndDelete(req.params.id);
    if (!artist) {
      return res.status(404).json({ success: false, error: 'Artist not found' });
    }
    
    res.json({ success: true, message: 'Artist deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST - Create or update artist when artwork is submitted
router.post('/create-or-update', async (req, res) => {
  try {
    const { name, instagram, profileImage } = req.body;
    
    // Find existing artist by name or create new
    let artist = await Artist.findOne({ name: name });
    
    if (artist) {
      // Update existing artist
      if (instagram) artist.instagram = instagram;
      if (profileImage) artist.profileImage = profileImage;
      artist.lastActive = new Date();
      await artist.save();
    } else {
      // Create new artist
      artist = new Artist({
        name,
        email: `${name.toLowerCase().replace(/\s+/g, '')}@temp.com`, // Temporary email
        instagram,
        profileImage,
        totalArtworks: 0,
        totalLikes: 0,
        totalViews: 0
      });
      await artist.save();
    }
    
    // Recalculate stats
    const artworks = await Artwork.find({ artist: name });
    artist.totalArtworks = artworks.length;
    artist.totalLikes = artworks.reduce((sum, art) => sum + (art.likes || 0), 0);
    artist.totalViews = artworks.reduce((sum, art) => sum + (art.views || 0), 0);
    await artist.save();
    
    res.json({ success: true, data: artist });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;