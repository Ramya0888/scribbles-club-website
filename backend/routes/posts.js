// ============================================
// FILE: backend/routes/posts.js - FIXED CLOUDINARY TIMESTAMP
// LOCATION: backend/routes/posts.js
// ============================================
const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const cloudinary = require('cloudinary').v2;

// ============================================
// CLOUDINARY CLEANUP HELPERS
// ============================================

// Extract Cloudinary public ID from image data
const getCloudinaryPublicId = (imageData) => {
  // If it's already an object with publicId
  if (imageData && typeof imageData === 'object' && imageData.publicId) {
    return imageData.publicId;
  }
  
  // If it's a URL string (old format)
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

// Delete image from Cloudinary - FIXED FOR TIMESTAMP ISSUE
const deleteCloudinaryImage = async (imageData) => {
  const publicId = getCloudinaryPublicId(imageData);
  
  if (!publicId) {
    console.log('⏭️  No valid public ID, skipping deletion');
    return { success: true, skipped: true };
  }

  try {
    console.log(`🗑️  Attempting to delete: ${publicId}`);
    
    // Create a fresh cloudinary instance for this request
    // This ensures we're using the current timestamp
    const crypto = require('crypto');
    const timestamp = Math.round(Date.now() / 1000);
    
    // Generate signature manually to avoid stale timestamp
    const api_secret = process.env.CLOUDINARY_API_SECRET;
    const stringToSign = `public_id=${publicId}&timestamp=${timestamp}${api_secret}`;
    const signature = crypto
      .createHash('sha1')
      .update(stringToSign)
      .digest('hex');

    // Make direct API call to Cloudinary
    const https = require('https');
    const querystring = require('querystring');
    
    const postData = querystring.stringify({
      public_id: publicId,
      timestamp: timestamp,
      api_key: process.env.CLOUDINARY_API_KEY,
      signature: signature,
      invalidate: true
    });

    const options = {
      hostname: 'api.cloudinary.com',
      port: 443,
      path: `/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/destroy`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    return new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          try {
            const result = JSON.parse(data);
            
            if (result.result === 'ok') {
              console.log(`✅ Deleted image from Cloudinary: ${publicId}`);
              resolve({ success: true, publicId, result: result.result });
            } else if (result.result === 'not found') {
              console.log(`⚠️  Image not found in Cloudinary: ${publicId} (may have been deleted already)`);
              resolve({ success: true, publicId, result: result.result });
            } else {
              console.log(`⚠️  Cloudinary deletion result: ${result.result} for ${publicId}`);
              resolve({ success: false, result: result.result });
            }
          } catch (parseErr) {
            console.error('❌ Error parsing Cloudinary response:', parseErr);
            resolve({ success: false, error: parseErr.message });
          }
        });
      });

      req.on('error', (err) => {
        console.error('❌ Error deleting from Cloudinary:', err.message);
        resolve({ success: false, error: err.message });
      });

      req.write(postData);
      req.end();
    });
    
  } catch (err) {
    console.error('❌ Error deleting from Cloudinary:', err.message);
    return { success: false, error: err.message };
  }
};

// ============================================
// ROUTES
// ============================================

// GET all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json({ success: true, data: posts });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET single post (IP-based view tracking)
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, error: 'Post not found' });
    }

    // Get user IP
    const userIP = req.ip || 
                   req.headers['x-forwarded-for']?.split(',')[0] || 
                   req.connection.remoteAddress || 
                   'unknown';

    console.log(`👁️  View request from IP: ${userIP}`);

    // Initialize viewedBy if doesn't exist
    if (!post.viewedBy) {
      post.viewedBy = [];
    }

    // Only increment if this IP hasn't viewed before
    if (!post.viewedBy.includes(userIP)) {
      post.views = (post.views || 0) + 1;
      post.viewedBy.push(userIP);
      
      // Save without validation
      await post.save({ validateBeforeSave: false });
      
      console.log(`✅ New view. Total: ${post.views}`);
    } else {
      console.log(`⏭️  Already viewed by this IP`);
    }

    res.json({ success: true, data: post });
  } catch (err) {
    console.error('❌ Error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST create new post
router.post('/', async (req, res) => {
  try {
    const post = new Post({
      ...req.body,
      likes: 0,
      views: 0,
      likedBy: [],
      viewedBy: [],
      featured: false
    });
    
    await post.save();
    res.status(201).json({ success: true, data: post });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// PUT update post - FIXED VERSION
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { image, ...otherData } = req.body;

    // Get old post to compare
    const oldPost = await Post.findById(id);
    if (!oldPost) {
      return res.status(404).json({ success: false, error: 'Post not found' });
    }

    console.log('🔄 Updating post:', id);

    // Check if image changed
    const oldImageUrl = oldPost.image?.url || oldPost.image;
    const newImageUrl = image?.url || image;
    
    // Delete old image if it exists and new image is different
    if (oldPost.image && newImageUrl && newImageUrl !== oldImageUrl) {
      console.log('🖼️  Post image changed, deleting old...');
      
      // Delete old image asynchronously, don't wait for it
      deleteCloudinaryImage(oldPost.image).catch(err => {
        console.warn('⚠️  Could not delete old image:', err.message);
      });
    } else if (newImageUrl === oldImageUrl) {
      console.log('ℹ️  Image URL unchanged, no deletion needed');
    }

    // Update post
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { 
        ...otherData, 
        image: image || oldPost.image
      },
      { new: true, runValidators: true }
    );

    console.log('✅ Post updated successfully');

    res.json({ success: true, data: updatedPost });
  } catch (err) {
    console.error('❌ Update error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE post
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, error: 'Post not found' });
    }

    console.log('🗑️  Deleting post:', post.title);

    // Delete image from Cloudinary asynchronously
    if (post.image) {
      console.log('🖼️  Deleting post image from Cloudinary...');
      deleteCloudinaryImage(post.image).catch(err => {
        console.warn('⚠️  Could not delete image from Cloudinary:', err.message);
      });
    }

    // Delete post from database immediately
    await Post.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: 'Post deleted successfully' });
  } catch (err) {
    console.error('❌ Delete error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT like/unlike post (IP-based)
router.put('/:id/like', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, error: 'Post not found' });
    }

    // Get user IP
    const userIP = req.ip || 
                   req.headers['x-forwarded-for']?.split(',')[0] || 
                   req.connection.remoteAddress || 
                   'unknown';

    console.log(`💖 Like request from IP: ${userIP}`);

    // Initialize likedBy if needed
    if (!post.likedBy) {
      post.likedBy = [];
    }

    // Check if already liked
    const alreadyLiked = post.likedBy.includes(userIP);

    if (alreadyLiked) {
      // Unlike
      post.likes = Math.max(0, (post.likes || 1) - 1);
      post.likedBy = post.likedBy.filter(ip => ip !== userIP);
      console.log(`💔 Unliked. New count: ${post.likes}`);
    } else {
      // Like
      post.likes = (post.likes || 0) + 1;
      post.likedBy.push(userIP);
      console.log(`❤️  Liked. New count: ${post.likes}`);
    }

    // Save without validation
    await post.save({ validateBeforeSave: false });

    res.json({ 
      success: true, 
      liked: !alreadyLiked,
      totalLikes: post.likes 
    });
  } catch (err) {
    console.error('❌ Error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;