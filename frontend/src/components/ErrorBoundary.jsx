import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(p) { super(p); this.state = { hasError: false }; }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(err, info) { console.error(err, info); }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: '60vh', display: 'grid', placeItems: 'center', textAlign: 'center', padding: '2rem', background: 'var(--soft-cream)' }}>
          <div>
            <h2 style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>Something went wrong</h2>
            <p className="muted" style={{ marginBottom: '1rem' }}>Please refresh the page or go back home.</p>
            <a href="/" className="btn primary" style={{ display: 'inline-block', textDecoration: 'none' }}>Go Home</a>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
