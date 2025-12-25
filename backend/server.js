const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cloudinary = require('cloudinary').v2;

// 🔹 Import migration
const runArtworkMigration = require('./migrations/artworkImageMigration');

// Load environment variables
dotenv.config();

const app = express();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

console.log('✅ Cloudinary configured:', process.env.CLOUDINARY_CLOUD_NAME);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection + Migration
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected Successfully');

    // 🚀 Run migration (runs only once due to lock)
    await runArtworkMigration();

  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

// Routes
app.use('/api/artworks', require('./routes/artworks'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/artists', require('./routes/artists'));

// Health check route
app.get('/', (req, res) => {
  res.json({
    message: 'Scribbles API is running!',
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development'
      ? err.message
      : 'Internal server error'
  });
});

const PORT = process.env.PORT || 5000;

// 🔥 Start server AFTER DB + migration
const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  });
};

startServer();
