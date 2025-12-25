// ============================================
// FILE: backend/routes/artworks.js - WITH IP TRACKING
// LOCATION: backend/routes/artworks.js
// ============================================
const express = require('express');
const router = express.Router();
const Artwork = require('../models/Artwork');
const Artist = require('../models/Artist');

// ============================================
// CLOUDINARY CLEANUP HELPERS
// ============================================

// Extract Cloudinary public ID from URL or object
const getCloudinaryPublicId = (imageData) => {
  // If it's already an object with publicId
  if (imageData && typeof imageData === 'object' && imageData.publicId) {
    return imageData.publicId;
  }
  
  // If it's a URL string
  const url = typeof imageData === 'string' ? imageData : imageData?.url;
  if (!url || !url.includes('cloudinary.com')) return null;
  
  try {
    const parts = url.split('/');
    const uploadIndex = parts.indexOf('upload');
    if (uploadIndex === -1) return null;
    
    let pathParts = parts.slice(uploadIndex + 1);
    
    if (pathParts[0] && pathParts[0].match(/^v\d+$/)) {
      pathParts = pathParts.slice(1);
    }
    
    const fullPath = pathParts.join('/');
    const publicId = fullPath.replace(/\.[^/.]+$/, '');
    
    return publicId;
  } catch (err) {
    console.error('Error extracting public ID:', err);
    return null;
  }
};

// Delete image from Cloudinary
const deleteCloudinaryImage = async (imageData) => {
  const publicId = getCloudinaryPublicId(imageData);
  
  if (!publicId) {
    console.log('⏭️  No valid public ID, skipping deletion');
    return { success: true, skipped: true };
  }

  try {
    const cloudinary = require('cloudinary').v2;
    
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    });

    const result = await cloudinary.uploader.destroy(publicId);
    
    if (result.result === 'ok') {
      console.log(`✅ Deleted image from Cloudinary: ${publicId}`);
      return { success: true, publicId, result: result.result };
    } else {
      console.log(`⚠️  Cloudinary deletion result: ${result.result} for ${publicId}`);
      return { success: false, result: result.result };
    }
  } catch (err) {
    console.error('❌ Error deleting from Cloudinary:', err.message);
    return { success: false, error: err.message };
  }
};

// Update artist stats after artwork changes
const updateArtistStats = async (artistName) => {
  try {
    const artworks = await Artwork.find({ artist: artistName });
    
    const totalArtworks = artworks.length;
    const totalLikes = artworks.reduce((sum, art) => sum + (art.likes || 0), 0);
    const totalViews = artworks.reduce((sum, art) => sum + (art.views || 0), 0);
    
    const latestArtwork = artworks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
    
    await Artist.findOneAndUpdate(
      { name: artistName },
      {
        totalArtworks,
        totalLikes,
        totalViews,
        profileImage: latestArtwork?.profileImage,
        instagram: latestArtwork?.instagram,
        lastActive: new Date()
      },
      { upsert: true, new: true }
    );
    
    console.log(`✅ Updated artist stats: ${artistName} (${totalArtworks} artworks, ${totalLikes} likes)`);
  } catch (err) {
    console.error('Error updating artist stats:', err);
  }
};

// ============================================
// ROUTES
// ============================================

// GET all artworks
router.get('/', async (req, res) => {
  try {
    const artworks = await Artwork.find().sort({ createdAt: -1 });
    res.json({ success: true, data: artworks });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET single artwork (IP-based view tracking)
router.get('/:id', async (req, res) => {
  try {
    const artwork = await Artwork.findById(req.params.id);
    if (!artwork) {
      return res.status(404).json({ success: false, error: 'Artwork not found' });
    }

    // Get user IP
    const userIP = req.ip || 
                   req.headers['x-forwarded-for']?.split(',')[0] || 
                   req.connection.remoteAddress || 
                   'unknown';

    console.log(`👁️  View request from IP: ${userIP}`);

    // Initialize viewedBy if doesn't exist
    if (!artwork.viewedBy) {
      artwork.viewedBy = [];
    }

    // Only increment if this IP hasn't viewed before
    if (!artwork.viewedBy.includes(userIP)) {
      artwork.views = (artwork.views || 0) + 1;
      artwork.viewedBy.push(userIP);
      
      // Save without validation
      await artwork.save({ validateBeforeSave: false });
      
      console.log(`✅ New view. Total: ${artwork.views}`);
      
      // Update artist stats
      await updateArtistStats(artwork.artist);
    } else {
      console.log(`⏭️  Already viewed by this IP`);
    }

    res.json({ success: true, data: artwork });
  } catch (err) {
    console.error('❌ Error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST create new artwork
router.post('/', async (req, res) => {
  try {
    const artwork = new Artwork({
      ...req.body,
      likes: 0,
      views: 0,
      likedBy: [],
      viewedBy: [],
      featured: false
    });
    
    await artwork.save();
    await updateArtistStats(artwork.artist);

    res.status(201).json({ success: true, data: artwork });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// PUT update artwork
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { image, profileImage, ...otherData } = req.body;

    const oldArtwork = await Artwork.findById(id);
    if (!oldArtwork) {
      return res.status(404).json({ success: false, error: 'Artwork not found' });
    }

    console.log('🔄 Updating artwork:', id);

    // Check if artwork image changed
    const oldImageUrl = oldArtwork.image?.url || oldArtwork.imageUrl;
    const newImageUrl = image?.url;
    
    if (newImageUrl && newImageUrl !== oldImageUrl) {
      console.log('🖼️  Artwork image changed, deleting old...');
      await deleteCloudinaryImage(oldArtwork.image || oldImageUrl);
    }

    // Check if profile image changed
    if (profileImage && profileImage !== oldArtwork.profileImage) {
      console.log('👤 Profile image changed, deleting old...');
      await deleteCloudinaryImage(oldArtwork.profileImage);
    }

    // Update artwork
    const updatedArtwork = await Artwork.findByIdAndUpdate(
      id,
      { 
        ...otherData, 
        image: image || oldArtwork.image,
        profileImage: profileImage || oldArtwork.profileImage
      },
      { new: true, runValidators: true }
    );

    await updateArtistStats(updatedArtwork.artist);
    
    // If artist name changed
    if (oldArtwork.artist !== updatedArtwork.artist) {
      await updateArtistStats(oldArtwork.artist);
      
      const oldArtistArtworks = await Artwork.find({ artist: oldArtwork.artist });
      if (oldArtistArtworks.length === 0) {
        await Artist.findOneAndDelete({ name: oldArtwork.artist });
        console.log(`🗑️  Deleted artist: ${oldArtwork.artist}`);
      }
    }

    res.json({ success: true, data: updatedArtwork });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE artwork
router.delete('/:id', async (req, res) => {
  try {
    const artwork = await Artwork.findById(req.params.id);
    if (!artwork) {
      return res.status(404).json({ success: false, error: 'Artwork not found' });
    }

    console.log('🗑️  Deleting artwork:', artwork.title);

    // Delete images from Cloudinary
    if (artwork.image) {
      await deleteCloudinaryImage(artwork.image);
    }
    if (artwork.profileImage) {
      await deleteCloudinaryImage(artwork.profileImage);
    }

    await Artwork.findByIdAndDelete(req.params.id);

    const remainingArtworks = await Artwork.find({ artist: artwork.artist });

    if (remainingArtworks.length === 0) {
      await Artist.findOneAndDelete({ name: artwork.artist });
      console.log(`✅ Deleted artist: ${artwork.artist}`);
    } else {
      await updateArtistStats(artwork.artist);
    }

    res.json({ success: true, message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT like/unlike artwork (IP-based tracking)
router.put('/:id/like', async (req, res) => {
  try {
    const artwork = await Artwork.findById(req.params.id);
    if (!artwork) {
      return res.status(404).json({ success: false, error: 'Artwork not found' });
    }

    // Get user IP
    const userIP = req.ip || 
                   req.headers['x-forwarded-for']?.split(',')[0] || 
                   req.connection.remoteAddress || 
                   'unknown';

    console.log(`💖 Like request from IP: ${userIP}`);

    // Initialize likedBy if doesn't exist
    if (!artwork.likedBy) {
      artwork.likedBy = [];
    }

    const alreadyLiked = artwork.likedBy.includes(userIP);

    if (alreadyLiked) {
      // Unlike
      artwork.likes = Math.max(0, (artwork.likes || 1) - 1);
      artwork.likedBy = artwork.likedBy.filter(ip => ip !== userIP);
      console.log(`💔 Unliked. New count: ${artwork.likes}`);
    } else {
      // Like
      artwork.likes = (artwork.likes || 0) + 1;
      artwork.likedBy.push(userIP);
      console.log(`❤️  Liked. New count: ${artwork.likes}`);
    }

    // Save without validation
    await artwork.save({ validateBeforeSave: false });

    // Update artist stats
    await updateArtistStats(artwork.artist);

    res.json({ 
      success: true, 
      liked: !alreadyLiked,
      totalLikes: artwork.likes 
    });
  } catch (err) {
    console.error('❌ Error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;