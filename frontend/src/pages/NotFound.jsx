import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
export default function NotFound() {
  return (
    <>
      <Navbar />
      <div className="page" style={{ minHeight: '60vh', display: 'grid', placeItems: 'center', textAlign: 'center', paddingTop: 'var(--page-pt)' }}>
        <div>
          <h1 style={{ fontSize: 'clamp(3rem, 10vw, 6rem)', margin: 0, color: 'var(--warm-pink)' }}>404</h1>
          <p style={{ fontSize: '1.2rem', margin: '0.5rem 0 1.5rem' }} className="muted">Page not found — let's get you back to the gallery.</p>
          <Link to="/" className="btn primary" style={{ textDecoration: 'none' }}>Go Home</Link>
        </div>
      </div>
    </>
  );
}
