const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Artwork = require('./models/Artwork');
const Post = require('./models/Post');
const Artist = require('./models/Artist');

dotenv.config();

// Sample data
const artists = [
  {
    name: "Priya Kumar",
    email: "priya@scribbles.com",
    bio: "Contemporary artist specializing in acrylic paintings",
    instagram: "@priya.art",
    specialization: ["painting"]
  },
  {
    name: "Arjun Mehta",
    email: "arjun@scribbles.com",
    bio: "Digital artist and illustrator",
    instagram: "@arjun_creates",
    specialization: ["digital"]
  },
  {
    name: "Meera Nair",
    email: "meera@scribbles.com",
    bio: "Photographer capturing urban landscapes",
    instagram: "@meera_lens",
    specialization: ["photography"]
  }
];

const artworks = [
  {
    title: "Sunset Dreams",
    artist: "Priya Kumar",
    category: "painting",
    description: "Acrylic on canvas capturing the essence of twilight",
    imageUrl: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800",
    featured: true,
    instagram: "@priya.art",
    likes: 42,
    views: 156
  },
  {
    title: "Digital Bloom",
    artist: "Arjun Mehta",
    category: "digital",
    description: "Digital illustration exploring nature's patterns",
    imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800",
    featured: false,
    instagram: "@arjun_creates",
    likes: 38,
    views: 124
  },
  {
    title: "Urban Reflections",
    artist: "Meera Nair",
    category: "photography",
    description: "City lights dancing on water surfaces",
    imageUrl: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=800",
    featured: false,
    instagram: "@meera_lens",
    likes: 65,
    views: 203
  },
  {
    title: "Abstract Emotions",
    artist: "Priya Kumar",
    category: "painting",
    description: "Bold strokes expressing inner feelings",
    imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800",
    featured: false,
    instagram: "@priya.art",
    likes: 51,
    views: 189
  },
  {
    title: "Cyber Garden",
    artist: "Arjun Mehta",
    category: "digital",
    description: "Futuristic botanical digital art",
    imageUrl: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800",
    featured: false,
    instagram: "@arjun_creates",
    likes: 73,
    views: 245
  },
  {
    title: "Morning Serenity",
    artist: "Meera Nair",
    category: "photography",
    description: "Golden hour capturing peaceful moments",
    imageUrl: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800",
    featured: false,
    instagram: "@meera_lens",
    likes: 88,
    views: 312
  }
];

const posts = [
  {
    title: "Finding Your Artistic Voice",
    author: "Meera Nair",
    category: "tutorial",
    excerpt: "Discovering your unique style is a journey, not a destination. Learn how to embrace your creative identity.",
    content: `Every artist struggles with finding their voice. Through experimentation and patience, you'll discover what makes your work uniquely yours.

Start by studying artists you admire, but don't copy them. Instead, understand what draws you to their work. Is it the color palette? The subject matter? The technique?

Try different mediums and styles without judgment. Keep a sketchbook where you can experiment freely. Some days will feel inspired, others won't - and that's perfectly normal.

Remember: Your artistic voice evolves over time. What feels authentic today might change tomorrow, and that's part of the beautiful journey of being an artist.`,
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800",
    tags: ["art", "tutorial", "inspiration"],
    likes: 42,
    comments: 8,
    featured: true
  },
  {
    title: "The Poetry of Colors",
    author: "Priya Kumar",
    category: "poetry",
    excerpt: "A reflection on how colors speak to our souls and paint emotions we cannot express in words.",
    content: `Red whispers passion in the morning light,
Blue hums serenity through the quiet night,
Yellow dances joy across the canvas wide,
Green breathes life where memories reside.

Every stroke a word unspoken,
Every shade a heart's soft token,
In the silence of creation's flow,
Colors teach us what we know.

Paint not just what eyes can see,
But the emotions longing to be free.`,
    image: "https://images.unsplash.com/photo-1496337589254-7e19d01cec44?w=800",
    tags: ["poetry", "colors", "inspiration"],
    likes: 67,
    comments: 15,
    featured: false
  },
  {
    title: "Digital Art for Beginners",
    author: "Arjun Mehta",
    category: "digital",
    excerpt: "Essential tips and tools to start your digital art journey, from choosing software to mastering layers.",
    content: `Starting with digital art can feel overwhelming, but it doesn't have to be! Here's what you need to know:

**Software Options:**
- Procreate (iPad) - Great for beginners
- Photoshop - Industry standard
- Krita - Free and powerful

**Essential Skills:**
1. Learn layers - they're your best friend
2. Master the brush tool
3. Understand color theory
4. Practice daily, even if just for 15 minutes

**Pro Tips:**
- Start with simple subjects
- Watch tutorial videos
- Join online communities
- Don't be afraid to experiment

Remember, every digital artist started as a beginner. Your journey is unique!`,
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800",
    tags: ["digital-art", "tutorial", "beginner"],
    likes: 93,
    comments: 22,
    featured: false
  },
  {
    title: "The Art of Journaling",
    author: "Meera Nair",
    category: "journaling",
    excerpt: "Combining visual art with written reflection creates a powerful tool for self-expression and growth.",
    content: `Art journaling is more than just keeping a diary - it's a way to process emotions, document life, and explore creativity without pressure.

**Getting Started:**
- Choose any notebook that feels right
- Mix writing with sketches, collages, or paintings
- No rules - it's YOUR journal
- Use it as a safe space for expression

**Benefits:**
- Reduces stress and anxiety
- Tracks personal growth
- Improves creativity
- Preserves memories uniquely

Your art journal doesn't need to be perfect or Instagram-worthy. It just needs to be honest and yours.`,
    image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=800",
    tags: ["journaling", "creativity", "mindfulness"],
    likes: 55,
    comments: 11,
    featured: false
  }
];

// Connect and seed
const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');
    
    // Clear existing data
    await Artist.deleteMany();
    await Artwork.deleteMany();
    await Post.deleteMany();
    console.log('🗑️  Cleared existing data');
    
    // Insert new data
    await Artist.insertMany(artists);
    console.log('✅ Artists seeded');
    
    await Artwork.insertMany(artworks);
    console.log('✅ Artworks seeded');
    
    await Post.insertMany(posts);
    console.log('✅ Posts seeded');
    
    console.log('🎉 Database seeded successfully!');
    console.log(`📊 Summary:`);
    console.log(`   - ${artists.length} Artists`);
    console.log(`   - ${artworks.length} Artworks`);
    console.log(`   - ${posts.length} Posts`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();