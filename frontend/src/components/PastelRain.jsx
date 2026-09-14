import { useMemo } from 'react';

export default function PastelRain({ count = 28, variant = 'default' }) {
  const effectiveCount = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches ? Math.min(count, 14) : count;
  const drops = useMemo(() => Array.from({ length: effectiveCount }).map(() => ({
    left: Math.random() * 100,
    duration: 9 + Math.random() * 8,
    delay: Math.random() * 5,
    opacity: 0.3 + Math.random() * 0.4,
    size: 4 + Math.random() * 6,
    hue: Math.floor(180 + Math.random() * 180),
  })), [effectiveCount]);

  const layerClass = variant === 'contact' ? 'contact-pastel-rain-layer' : variant === 'events' ? 'pastel-rain-events' : 'pastel-rain-layer';
  const dropClass = variant === 'contact' ? 'contact-pastel-drop' : variant === 'events' ? 'pastel-drop-events' : 'pastel-drop';

  return (
    <div className={layerClass} aria-hidden="true">
      {drops.map((d, i) => (
        <span key={i} className={dropClass} style={{ left: `${d.left}%`, animationDuration: `${d.duration}s`, animationDelay: `${d.delay}s`, opacity: d.opacity, width: `${d.size}px`, height: `${d.size}px`, '--hue': d.hue }} />
      ))}
    </div>
  );
}
