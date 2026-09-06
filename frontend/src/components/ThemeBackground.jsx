import React, { useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

export default function ThemeBackground() {
  const { theme } = useTheme();

  const lightDrops = useMemo(
    () =>
      Array.from({ length: 60 }, (_, i) => ({
        id: i,
        left: `${randomBetween(0, 100).toFixed(4)}%`,
        hue: Math.floor(180 + Math.random() * 360),
        size: `${randomBetween(4, 10).toFixed(2)}px`,
        opacity: (0.3 + Math.random() * 0.5).toFixed(2),
        duration: `${randomBetween(9, 17).toFixed(2)}s`,
        delay: `${randomBetween(0, 5).toFixed(2)}s`,
      })),
    []
  );

  return (
    <div className="theme-background" aria-hidden="true">
      {/* Render pastel rain in both themes so the visual rain effect remains identical */}
      <div className="pastel-rain-layer theme-background__rain">
        {lightDrops.map((drop) => (
          <span
            key={drop.id}
            className="pastel-drop"
            style={{
              left: drop.left,
              '--hue': drop.hue,
              '--size': drop.size,
              '--opacity': drop.opacity,
              animationDuration: drop.duration,
              animationDelay: drop.delay,
            }}
          />
        ))}
      </div>

      {theme === 'light' && (
        <>
          <div className="theme-background__light" />
        </>
      )}

      {theme === 'dark' && (
        <>
          <div className="theme-background__dark" />
        </>
      )}
    </div>
  );
}
