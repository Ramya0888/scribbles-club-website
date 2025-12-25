const Artwork = require('../models/Artwork');
const Migration = require('../models/Migration');

// ---------- helper ----------
const extractPublicId = (url) => {
  if (!url || !url.includes('cloudinary.com')) return null;

  const parts = url.split('/');
  const uploadIndex = parts.indexOf('upload');
  if (uploadIndex === -1) return null;

  let pathParts = parts.slice(uploadIndex + 1);

  if (pathParts[0]?.match(/^v\d+$/)) {
    pathParts = pathParts.slice(1);
  }

  return pathParts.join('/').replace(/\.[^/.]+$/, '');
};

// ---------- migration ----------
module.exports = async function migrateArtworkImages() {
  const MIGRATION_NAME = 'artwork-image-cloudinary-structure';

  const alreadyRan = await Migration.findOne({ name: MIGRATION_NAME });
  if (alreadyRan) {
    console.log('⏭️  Artwork image migration already executed');
    return;
  }

  console.log('🚀 Running artwork image migration...');

  const artworks = await Artwork.find({
    image: { $exists: false },
    imageUrl: { $exists: true }
  });

  let migrated = 0;

  for (const artwork of artworks) {
    const publicId = extractPublicId(artwork.imageUrl);
    if (!publicId) continue;

    artwork.image = {
      url: artwork.imageUrl,
      publicId
    };

    artwork.imageUrl = undefined;
    await artwork.save();
    migrated++;
  }

  await Migration.create({ name: MIGRATION_NAME });

  console.log(`✅ Artwork migration completed (${migrated} migrated)`);
};
