import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import TeamMemberCard from '../About/TeamMemberCard';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import NiraAnnouncement from '../../components/NiraAnnouncement';

/*
{
  title: 'Downcast',
  artist: 'Venkatramanan R',
  blurb: 'Graphite portrait where the softest shading carries the weight of the expression.',
  tag: 'Graphite',
  image: '/artworks/downcast.webp',
},
{
  title: 'Devotion',
  artist: 'Venkatramanan R',
  blurb: 'Acrylic on canvas — the bond between Shiva and his vahana, rendered in devotional blues and gold.',
  tag: 'Acrylic',
},
{
  title: 'Gold Hour',
  artist: 'Venkatramanan R',
  blurb: 'Coloured pencil portrait — warm sepia and gold catch the jewellery and the light along her jaw.',
  tag: 'Coloured Pencil',
},
*/

const officeBearers = [
  { name: 'Siddharth M', role: 'President', dept: 'Mechanical Engineering', image: '/OBs/Heads/IMG-20250114-WA0317(2)~2 - SIDDHARTH M.jpg', instagram: 'https://www.instagram.com/siddharth_chandran /', linkedin: 'https://www.linkedin.com/in/siddharth-chandran-0624ba367', quote: 'Somewhere between order and chaos 🙃' },
  { name: 'Praveena Rajendiran', role: 'President', dept: 'IT', image: '/OBs/Heads/Praveena_Rajendiran_ President - Praveena Rajendiran.jpg', instagram: 'https://www.instagram.com/_._praveena_._/', linkedin: 'https://www.linkedin.com/in/praveena-rajendiran-a8a3762a0', quote: 'I connect with warmth and lead with heart !' },
  { name: 'Thamizhmani S S', role: 'Secretary', dept: 'CSE', image: '/OBs/Heads/Secretary - Thamizhmani S.S..jpg', instagram: '', linkedin: 'https://www.linkedin.com/in/thamizhmani-s-s-b1763031a', quote: 'A little difficult to predict, slightly obsessed with figuring things out, and somehow always in the middle of something.' },
  { name: 'Raees Ahamed', role: 'Secretary', dept: 'Mechanical Engineering', image: '/OBs/Heads/IMG_5953 - Raees Ahamed.JPG', instagram: 'https://www.instagram.com/beastboy0210official/', linkedin: 'https://www.linkedin.com/in/raees-ahamed-74289a28b', quote: 'So Goated that leading is in your Blood' },
  { name: 'DEVIKA S', role: 'TREASURER', dept: 'ECE', image: '/OBs/Heads/Treasure - Devika S.jpg', instagram: 'https://www.instagram.com/_dev._.55_/', linkedin: 'linkedin.com/in/devika-s', quote: 'Trust the flow of life' },
  { name: 'Joshika Shree V', role: 'Creatives', dept: 'CSE', image: '/OBs/Heads/head_of_creatives - Joshika Shree.jpg', instagram: 'https://www.instagram.com/joshika20_/', linkedin: 'https://www.linkedin.com/in/joshika-shree-v-1909b5321', quote: 'Just a soul full of artzz' },
  { name: 'POOJA P', role: 'Creatives & Events', dept: 'GI', image: '/OBs/Heads/Head_of_CREATIVES&EVENTS_POOJA - Pooja Pandiyan.jpeg', instagram: 'https://www.instagram.com/_liorie._/', linkedin: 'https://www.linkedin.com/in/pooja2027', quote: 'Keeping a little WONDER 🤞🏼✨...' },
  { name: 'Santhakumar S', role: 'Events', dept: 'CSE', image: '/OBs/Heads/IMG-20260812-WA0005 - santhakumar s.jpg', instagram: 'https://www.instagram.com/sk07santhakumar /', linkedin: '', quote: 'Keep smiling......' },
  { name: 'Poojana S', role: 'Events', dept: 'CSE', image: '/OBs/Heads/Poojana.jpg', instagram: 'https://www.instagram.com/glitter_smile_4/', linkedin: '', quote: 'A curious learner who loves creativity' },
  { name: 'Ramya S', role: 'Web&Tech', dept: 'CSE', image: '/OBs/Heads/head_of_web&tech - Ramya Saravanan.jpg', instagram: 'https://www.instagram.com/ramya.__.08/', linkedin: 'https://www.linkedin.com/in/ramyalnkdn?utm_source=share_via&utm_content=profile&utm_medium=member_android', quote: 'I believe great design is just another form of art — I just happen to paint with code.' },
  { name: 'Santoshi Loganathan', role: 'Marketing', dept: 'CSE', image: '/OBs/Heads/IMG_20260711_102118 - Santoshi Loganathan.jpg', instagram: 'https://www.instagram.com/silver_moon_1269/', linkedin: 'https://www.linkedin.com/in/santoshi-loganathan-70659b336', quote: 'Just being me' },
  { name: 'Mounica S', role: 'Marketing', dept: 'GI', image: '/OBs/Heads/Mounica.jpg', instagram: 'https://www.instagram.com/me_lanica', linkedin: '', quote: 'Somewhere between the lines' },
  { name: 'Sabidha S', role: 'Social Media & Contents', dept: 'IT', image: '/OBs/Heads/head_of_contents - Sabidha.jpeg', instagram: 'https://www.instagram.com/sabidha_sakthivel/', linkedin: 'https://www.linkedin.com/in/sabidha-s-3b639b294/', quote: 'Calm inside chaos within' },  
  { name: 'Lohitt Aswin V', role: 'Contents', dept: 'EEE', image: '/OBs/Heads/Lohitt_image_1.jpeg', instagram: 'https://www.instagram.com/eco.nyx', linkedin: 'https://www.linkedin.com/in/lohitt-aswin-2268ab243', quote: 'Curious enough to explore, ambitious enough to build, and determined enough to never stop growing' },
  { name: 'Dharunkumar G', role: 'Logistics', dept: 'Printing and Packaging Technology', image: '/OBs/Heads/Dharunkumar.jpg', instagram: 'https://www.instagram.com/dharun_7664/', linkedin: '', quote: 'Roots grow in silence' },
  { name: 'Abdullah S', role: 'ER PR', dept: 'IT', image: '/OBs/Heads/Abdullah.jpg', instagram: 'https://www.instagram.com/abdullahsansen', linkedin: 'https://www.linkedin.com/in/abdullah-s-baa383287', quote: 'Jack of all trades master of none, but often times better than master of one' }
  ];

const founders = [
  { name: 'Venkatraman', dept: 'Manufacturing', image: '/OBs/Founders/Venkatraman.jpeg' },
  { name: 'Sowmya', dept: 'IT', image: '/OBs/Founders/Sowmya.jpeg' },
];

const deputyHeads = [
  { name: 'Lishaa Bharathi M S', role: 'Creatives', dept: 'Mechanical Engineering', image: '/OBs/Deputy_Heads/creative_head - Lishaa Bharathi.jpg', instagram: '', linkedin: 'https://www.linkedin.com/in/lishaa-bharathi-341786328?utm_source=share_via&utm_content=profile&utm_medium=member_android', quote: 'Be the change what you expect the world to be' },
  { name: 'Sashika Chellam.S.S', role: 'Creatives', dept: 'Civil', image: '/OBs/Deputy_Heads/Deputy head of creatives - Sashika.jpg', instagram: 'https://www.instagram.com/chellam._.12/', linkedin: 'https://www.linkedin.com/in/sashika-chellam-99bb94334', quote: '“Creative enough to lead, chaotic enough to keep it fun💃"' },
  { name: 'JEEVITHA N', role: 'Creatives', dept: 'ECE', image: '/OBs/Deputy_Heads/Jeevitha.jpeg', instagram: 'https://www.instagram.com/jeevithaa_narravula/', linkedin: 'https://www.linkedin.com/in/jeevitha-narravula07/', quote: 'A curious mind with big dreams and a heart that cares deeply.' },
  { name: 'Karam Santh N', role: 'Design', dept: 'CSE', image: '/OBs/Deputy_Heads/KaramSanth.jpeg', instagram: 'https://www.instagram.com/karamsanth13/', linkedin: 'www.linkedin.com/in/karamsanth', quote: 'Ellam Nanmaikkey...' },
  { name: 'Nithila', role: 'Design', dept: 'Printing and Packaging Technology', image: '/OBs/Deputy_Heads/IMG-20250728-WA0014 - Nithila Palanivel.jpg', instagram: 'https://www.instagram.com/nithilapalani_17/', linkedin: 'https://www.linkedin.com/in/nithila-palanivel-343952326', quote: 'Kind to be' },
  { name: 'Nithya L', role: 'Design', dept: 'IT', image: '/OBs/Deputy_Heads/Nithya L - Nithya.jpeg', instagram: 'https://www.instagram.com/nithya___2428/', linkedin: 'www.linkedin.com/in/nithya-l-ab4601378', quote: '“A little chaos, a lot of creativity.”' },
  { name: 'SIVAMANI R', role: 'Design', dept: 'CSE', image: '/OBs/Deputy_Heads/IMG_20250228_180257 - Siva Mani.jpg', instagram: 'https://www.instagram.com/sivamani__07/', linkedin: 'www.linkedin.com/in/siva-mani-499b29339', quote: 'Trust your crazy idea' },
  { name: 'Krishna Shree B', role: 'Events', dept: 'IT', image: '/OBs/Deputy_Heads/Deputy head of events - Krishna Shree B.jpg', instagram: 'https://www.instagram.com/_krishna_2k7/', linkedin: 'https://www.linkedin.com/in/krishna-shree-b-8876683a4?utm_source=share_via&utm_content=profile&utm_medium=member_android', quote: 'Edhachi podunga 😂' },
  { name: 'Nila PR', role: 'Events', dept: 'IT', image: '/OBs/Deputy_Heads/deputyhead_of_events - Nila Pandisvaran.jpg', instagram: 'https://www.instagram.com/nila._.07/', linkedin: 'https://www.linkedin.com/in/nila-pr-932a863a7', quote: 'Who cares?' },
  { name: 'Shaliha Fathima.A', role: 'Events', dept: 'IT', image: '/OBs/Deputy_Heads/Deputy_head_of_events - Shaliha Fathima A.jpg', instagram: 'https://www.instagram.com//', linkedin: 'https://www.linkedin.com/in/shaliha-fathima-a-64434534a?utm_source=share_via&utm_content=profile&utm_medium=member_android', quote: '"I postpone assignments, not deadlines."' },
  { name: 'Swadheen Nayak', role: 'Events', dept: 'BME', image: '/OBs/Deputy_Heads/Deputy Head of Events - Swadheen Nayak.png', instagram: 'https://www.instagram.com/gaming_worm_999/', linkedin: 'Swadheen Nayak', quote: 'A restless mind with a stubborn heart 👀' },
  { name: 'VISHVA R', role: 'Events', dept: 'BME', image: '/OBs/Deputy_Heads/IMG-20260809-WA0090 - Vishva R.jpg', instagram: 'https://www.instagram.com/s_m_a_r_t__b_o_y__v__28_r/', linkedin: 'https://www.linkedin.com/in/vishva-r-83a750356', quote: '“Still figuring life out, but never giving up on it.”' },
  { name: 'Magesh B', role: 'Logistics', dept: 'Mining', image: '/OBs/Deputy_Heads/IMG_20260427_093607 - Magesh.jpg', instagram: 'https://www.instagram.com/just._sleepy._/', linkedin: 'magesh27', quote: 'Not a writer, Not a critic - Just a reader who listens to the whispers of ink.' },
  { name: 'SRI PAVITHRA S', role: 'Logistics', dept: 'BME', image: '/OBs/Deputy_Heads/IMG-20260607-WA0134 - Sri pavithra sankar.jpg', instagram: 'https://www.instagram.com/sripavithra_s/', linkedin: 'https://www.linkedin.com/in/sri-pavithra-sankar-709597301?utm_source=share_via&utm_content=profile&utm_medium=member_android', quote: 'Just out here collecting hobbies and skills like trading cards 😎✨' },
  { name: 'Dhinesh Kumar R', role: 'Logistics', dept: 'ECE', image: '/OBs/Deputy_Heads/Dhinesh_Deputy_head_of_logistics - Dhinesh Kumar.png', instagram: 'https://www.instagram.com/__whaay_rdk_/', linkedin: 'Dhinesh Kumar R', quote: 'The Journey is the Reward!' },
  { name: 'Gunavathy K S', role: 'Logistics', dept: 'ECE', image: '/OBs/Deputy_Heads/IMG-20260812-WA0118 - Gunavathy.K.S(1).jpg', instagram: 'https://www.instagram.com/gunavathy_06/', linkedin: 'Gunavathy ks', quote: 'Blooming in the noise' },
  { name: 'Shafiulla S', role: 'Marketing', dept: 'ECE', image: '/OBs/Deputy_Heads/IMG_20260607_111016 - Mohammed Shafi.jpg', instagram: 'https://www.instagram.com/shafi3434/', linkedin: 'Shafiulla S', quote: 'Simple' },
  { name: 'S.Ramana', role: 'Marketing', dept: 'ECE', image: '/OBs/Deputy_Heads/Deputy Head_Of_Marketing - Ramana S.jpg', instagram: 'https://www.instagram.com/ramana_senthilkumar/', linkedin: 'Ramana S', quote: '"The future belongs to those who believe in the beauty of their dreams"' },
  { name: 'Rohith A', role: 'Marketing', dept: 'Mechanical', image: '/OBs/Deputy_Heads/deputy head_of_Marketin & ER  - Rohith Arun.jpg', instagram: 'https://www.instagram.com/its_rohith_007/', linkedin: 'https://www.linkedin.com/in/rohith-a-211600378?utm_source=share_via&utm_content=profile&utm_medium=member_android', quote: "It's not over until I win" },
  { name: 'BHAVANI S', role: 'Marketing', dept: 'MECHANICAL TM', image: '/OBs/Deputy_Heads/IMG_20260208_015401 - BHAVANI S.jpg', instagram: 'https://www.instagram.com/e_m_a_bhavani_05/', linkedin: 'www.linkedin.com/in/bhavani-05-s', quote: 'your wish(ningalee nalladhaa podungaa)' },
  { name: 'PRAVEEN M', role: 'Overall Coordinator', dept: 'Mechanical engineering', image: '/OBs/Deputy_Heads/Overall_coordinator_of_deputy_heads - Praveen Murugan.jpg', instagram: 'https://www.instagram.com/_praveen__murugan_06/', linkedin: 'https://www.linkedin.com/in/praveen-m-23b038379', quote: 'யாதுமாகி வாழ்' },
  { name: 'Mariammal M', role: 'Overall Coordinator', dept: 'ECE', image: '/OBs/Deputy_Heads/overall coordinator-Mariammal - Mariammal M.jpg', instagram: 'https://www.instagram.com/m_manjuvicky24/', linkedin: 'https://www.linkedin.com/in/mariammal088', quote: 'Be kind with the world✨' },
  { name: 'K.Gokul', role: 'Social Media and Contents', dept: 'IT', image: '/OBs/Deputy_Heads/gokul - gokul811.jpeg', instagram: 'https://www.instagram.com/_simply.gokul_/', linkedin: 'k-gokul-742332427', quote: 'Creating the Vibe , shaping the narrative.' },
  { name: 'Meenachi M', role: 'Social Media and Contents', dept: 'ECE', image: '/OBs/Deputy_Heads/deputy head_of_contents_deputy head_of_logistic&operations - Meenachi M.jpeg', instagram: 'https://www.instagram.com/_meenz._.27/', linkedin: 'https://www.linkedin.com/in/meenachi-m-b792a6339/', quote: '"Clouds tangled, sky unbothered"' },
  { name: 'Subakshan S', role: 'Social Media and Contents', dept: 'CSE', image: '/OBs/Deputy_Heads/IMG-20260814-WA0013 - Subakshan Sivakumar.jpg', instagram: 'https://www.instagram.com/Subakshan_01/', linkedin: 'https://www.linkedin.com/in/subakshan-sivakumar-68950236b?utm_source=share_via&utm_content=profile&utm_medium=member_android', quote: "Hard work is worthless for those that don't believe in themselves" },
  { name: 'PRAVEEN R', role: 'External Relations', dept: 'CSE', image: '/OBs/Deputy_Heads/Deputy_Head_of_ER_PR - Praveen.jpeg', instagram: 'https://www.instagram.com/praveenravikumar07/', linkedin: 'praveen-ravikumar', quote: 'Quiet confidence. Loud impact' },
  { name: 'SUMEDHAA V J', role: 'External Relations', dept: 'CSE', image: '/OBs/Deputy_Heads/Photo from Sumedhaa - Sumedhaa.jpg', instagram: 'https://www.instagram.com/sumedhaa07/', linkedin: 'www.linkedin.com/in/sumedhaa-v-j', quote: '“A little chaos, a lot of creativity.”' },
  { name: 'Pavithra P', role: 'External Relations', dept: 'GI', image: '/OBs/Deputy_Heads/Pavithra1.jpg', instagram: 'https://www.instagram.com//', linkedin: 'Pavithra P', quote: 'Creative at heart, curious by nature, unstoppable by choice.' },
  { name: 'Senthil Raja R', role: 'Web and Tech', dept: 'IT', image: '/OBs/Deputy_Heads/deputy head_of_web_and_tech - Senthil raja .R.jpg', instagram: 'https://www.instagram.com/l._.lawliet___/', linkedin: 'https://www.linkedin.com/in/senthil-raja-r', quote: 'Sometimes, the questions are complicated - and the answers are simple.' },
  { name: 'Shanmugavel M', role: 'Web and Tech', dept: 'IST', image: '/OBs/Deputy_Heads/Dpyheadof_WebandTech - Shanmugavel.M.jpg', instagram: 'https://www.instagram.com/Currently not using/', linkedin: 'https://www.linkedin.com/in/shanmugavel-m-755735326', quote: 'Passion and Practice matters the most...' },
  { name: 'Thrisha K', role: 'Web and Tech', dept: 'CSE', image: '/OBs/Deputy_Heads/ThrishaK2 - Thrisha K.jpg', instagram: 'https://www.instagram.com/thrisha_karthek/', linkedin: 'https://www.linkedin.com/in/thrishakarthek', quote: 'Yaadhumaagi Vaazh !' }
];

function TeamSection({ title, members, scrollerId, showArrows = true, centered = false, cardSize = 'default', mobileStack = false }) {
  return (
    <div style={{ marginBottom: '3rem' }}>
      {title && <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>{title}</h3>}
      <div style={{ width: '100%', overflow: 'hidden', position: 'relative' }} id={scrollerId}>
        <div
          className={`no-scrollbar ${mobileStack ? 'founders-scroller' : ''}`}
          style={{
            display: 'flex',
            gap: centered ? '8rem' : '1rem',
            overflowX: 'auto',
            scrollBehavior: 'smooth',
            paddingBottom: '1rem',
            justifyContent: centered ? 'center' : 'flex-start',
            ...(centered ? { width: 'fit-content', maxWidth: '100%', margin: '0 auto' } : {}),
          }}
        >
          {members.map((m, i) => (
            <div key={i} style={{ flex: '0 0 auto' }}>
              <TeamMemberCard {...m} size={cardSize} />
            </div>
          ))}
        </div>

        {showArrows && <button
          className="scroll-arrow"
          onClick={() =>
            document.querySelector(`#${scrollerId} .no-scrollbar`)?.scrollBy({ left: -280, behavior: 'smooth' })
          }
          style={{
            position: 'absolute',
            left: 0,
            top: '45%',
            transform: 'translateY(-50%)',
            width: 50,
            height: 50,
            borderRadius: '50%',
            border: '2px solid rgba(0,0,0,0.1)',
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(10px)',
            cursor: 'pointer',
            fontSize: '28px',
            color: '#333',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,1)';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.95)';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
          }}
        >
          ‹
        </button>}

        {showArrows && <button
          className="scroll-arrow"
          onClick={() =>
            document.querySelector(`#${scrollerId} .no-scrollbar`)?.scrollBy({ left: 280, behavior: 'smooth' })
          }
          style={{
            position: 'absolute',
            right: 0,
            top: '45%',
            transform: 'translateY(-50%)',
            width: 50,
            height: 50,
            borderRadius: '50%',
            border: '2px solid rgba(0,0,0,0.1)',
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(10px)',
            cursor: 'pointer',
            fontSize: '28px',
            color: '#333',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,1)';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.95)';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
          }}
        >
          ›
        </button>}
      </div>
    </div>
  );
}

const featuredArtworks = [
  {
    title: 'Downcast',
    artist: 'Venkatramanan R',
    blurb: 'Graphite portrait where the softest shading carries the weight of the expression.',
    tag: 'Graphite',
    image: '/ArtWork/Downcast.jpeg',
  },
  {
    title: 'Devotion',
    artist: 'Venkatramanan R',
    blurb: 'Acrylic on canvas — the bond between Shiva and his vahana, rendered in devotional blues and gold.',
    tag: 'Acrylic',
    image: '/ArtWork/Devotion.jpeg',
  },
  {
    title: 'Gold Hour',
    artist: 'Venkatramanan R',
    blurb: 'Coloured pencil portrait — warm sepia and gold catch the jewellery and the light along her jaw.',
    tag: 'Coloured Pencil',
    image: '/ArtWork/Gold Hour.jpeg',
  },
];

function Hero() {
  return (
    <header className="hero" id="top">
      <div className="hero-logo-circle">
        <img src="/logo.png" alt="Scribbles Art Club logo" />
      </div>
      <div className="hero-text">
        <p className="eyebrow">Scribbles Art Club</p>
        <h1>Where ideas stay sketchy, soft, and bold.</h1>
        <p className="muted">
          Weekly prompts, featured drops, critique circles, and events to help you keep drawing. Built for curious illustrators and makers.
        </p>
      </div>
    </header>
  );
}

function FeaturedSlider() {
  const [index, setIndex] = useState(0);
  const [sparkle, setSparkle] = useState(false);
  const count = featuredArtworks.length;

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % count);
    }, 5200);
    return () => clearInterval(id);
  }, [count]);

  const current = useMemo(() => featuredArtworks[index], [index]);

  const handleAppreciate = () => {
    setSparkle(true);
    setTimeout(() => setSparkle(false), 900);
  };

  return (
    <section id="featured" className="card section">
      <div className="section-header">
        <div>
          <p className="eyebrow">Weekly Featured</p>
          <h2>Artworks Slider</h2>
        </div>
        <div className="dots" aria-label="slider dots">
          {featuredArtworks.map((_, i) => (
            <span
              key={i}
              className={`dot ${i === index ? 'active' : ''}`}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
      <div className="slider">
        <div className="slide image-card">
          <div className="slide-image">
            <img src={current.image} alt={`${current.title} by ${current.artist}`} />
            <div className="badge badge-overlay">{current.tag}</div>
          </div>
          <div className="slide-body">
            <h3>{current.title}</h3>
            <p className="muted">by {current.artist}</p>
            <p className="blurb">{current.blurb}</p>
          </div>
          <div className={`sparkle ${sparkle ? 'show' : ''}`}>✨</div>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  const handleMeetTeam = () => {
    document.getElementById('team-section')?.scrollIntoView({ behavior: 'smooth' });
  };
  const handleStoryClick = () => {
    document.getElementById('story-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="about-section" className="section" style={{ paddingTop: '6rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>About Scribbles</h2>
        <p className="muted" style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>
          Scribbles Art Club is a creative collective built on curiosity, expression, and community. 
          We sketch, paint, explore, and grow together through weekly prompts, featured drops, 
          critique circles, and events. Built for curious illustrators and makers who love to create.
        </p>
        <div style={{ marginTop: '2rem', display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={handleMeetTeam} className="btn primary">Meet Our Team</button>
          <button onClick={handleStoryClick} className="btn ghost story-btn">The Scribbles Story</button>
        </div>
      </div>
    </section>
  );
}

// ===== THE SCRIBBLES STORY TIMELINE =====
const milestones = [
  { 
    date: '14 OCT 2025', 
    text: 'PENCIL SKETCH TUTORIALS - Learn the fundamentals of pencil sketching with professional artists.' 
  },
  { 
    date: '20 OCT 2025', 
    text: 'ART WITHOUT LIMITS - A creative workshop exploring art beyond traditional boundaries.' 
  },
  { 
    date: '23 DEC 2025', 
    text: 'ART UNPLUGGED - Disconnect from technology and reconnect with traditional art forms.' 
  },
  { 
    date: '23-24 JAN 2026', 
    text: 'FACE PAINTING - Two-day workshop on creative face painting techniques and designs.' 
  },
  { 
    date: '23 JAN 2026', 
    text: 'CHAOTIC CANVASS - Embrace the chaos and create spontaneous, expressive artworks.' 
  },
  { 
    date: '12 FEB 2026', 
    text: 'PENCIL SKETCH TUTORIAL - Advanced pencil sketching techniques for all skill levels.' 
  },
  { 
    date: '20 FEB 2026', 
    text: 'THOORIGA PRE EVENTS: Doodle Arts – Collective Canvass, Blindfold Guide Drawing Challenge, Colour Recall Challenge, Musical Sketch Challenge, No Hands Painting Challenge, Sketch and Guess Challenge.' 
  },
  { 
    date: '21 FEB 2026', 
    text: 'THOORIGA WORKSHOPS: Resin Keychain Workshop, Tote Bag Painting Workshop.' 
  },
  { 
    date: '21 FEB 2026', 
    text: 'THOORIGA EVENTS: Art Without Hands, Pass the Canvass, Mandala / Zentangle, Run and Draw, Mystery Box Craft, Sell the Scribble.' 
  },
  { 
    date: '21 FEB 2026', 
    text: 'THOORIGA SIGNATURE EVENTS: Paintball, Speed Art Battle - The ultimate creative competitions.' 
  },
  { 
    date: '27 FEB 2026', 
    text: 'TECHOFESS EVENTS: Brush Drop Beat Drop - Where art meets music and rhythm.' 
  },
  { 
    date: '28 FEB 2026', 
    text: 'TECHOFESS EVENTS: Art Mayhem - High-energy collaborative art challenges.' 
  },
  { 
    date: '13 MAR 2026', 
    text: 'TECHOFESS EVENTS: Acrylic Painting Workshop - Master acrylic painting techniques.' 
  },
  { 
    date: '14 MAR 2026', 
    text: 'TECHOFESS EVENTS: Resin Keychain Workshop - Create stunning resin accessories.' 
  },
  { 
    date: '15 MAR 2026', 
    text: 'TECHOFESS EVENTS: Clay Article Keyholder Workshop - Handcraft unique clay keyholders.' 
  },
];;

function StorySection() {
  return (
    <section id="story-section" className="section" style={{ paddingTop: '2rem' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div className="section-header">
          <h2 style={{ fontSize: '2.2rem' }}>The Scribbles Story</h2>
        </div>
        <div className="timeline">
          {milestones.map((m, i) => (
            <div key={i} className="timeline-item">
              <span className="timeline-dot" style={{ '--dot-hue': 180 + (i % 6) * 40 }} />
              <h4 style={{ margin: 0, fontSize: '1.4rem' }}><strong>{m.date}</strong></h4>
              <p className="muted" style={{ marginTop: '8px', fontSize: '1.1rem', lineHeight: 1.8 }}>{m.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const location = useLocation();

  const handleAboutClick = () => {
    document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Scroll to a section when arriving from another page (e.g. navbar "About Us")
  useEffect(() => {
    if (location.state?.scrollTo) {
      document.getElementById(location.state.scrollTo)?.scrollIntoView({ behavior: 'smooth' });
      window.history.replaceState({}, '');
    }
  }, [location.state]);

  return (
  <div className="page" style={{ position: "relative", overflow: "hidden" }}>
    <Navbar onAboutClick={handleAboutClick} />
    <NiraAnnouncement />

    <Hero />
    <FeaturedSlider />
    <AboutSection />
    <StorySection />
    
    {/* ===== TEAM SECTIONS ===== */}
    <section className="section">
      <h2 style={{ fontSize: '2.2rem', marginBottom: '2rem', textAlign: 'center' }}>Founders</h2>
      <TeamSection title="" members={founders} scrollerId="founders-scroll" showArrows={false} centered cardSize="large" mobileStack />
    </section>

    <section className="section" id="team-section" style={{ paddingTop: '4rem' }}>
      <h2 style={{ fontSize: '2.2rem', marginBottom: '2rem', textAlign: 'center' }}>Office Bearers</h2>
      <TeamSection title="" members={officeBearers} scrollerId="office-bearers-scroll" />
    </section>

    <section className="section">
      <h2 style={{ fontSize: '2.2rem', marginBottom: '2rem', textAlign: 'center' }}>Deputy Heads</h2>
      <TeamSection title="" members={deputyHeads} scrollerId="deputy-heads-scroll" />
    </section>

    <Footer />
  </div>
);

}