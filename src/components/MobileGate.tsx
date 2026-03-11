import { useState, useEffect, type ReactNode } from 'react';

const MIN_WIDTH = 768;

export default function MobileGate({ children }: { children: ReactNode }) {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < MIN_WIDTH);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < MIN_WIDTH);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  if (!isMobile) return <>{children}</>;

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        background: '#008080',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
    >
      <div
        className="win95-window-frame"
        style={{
          maxWidth: 380,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Title bar */}
        <div className="win95-title-bar">
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span>⚠️</span>
            <span>Display Properties</span>
          </span>
        </div>

        {/* Content */}
        <div style={{ padding: 16, margin: 2 }}>
          <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
            <span style={{ fontSize: 32, flexShrink: 0 }}>🖥️</span>
            <div style={{ fontSize: 12, lineHeight: 1.5 }}>
              <p style={{ margin: '0 0 8px' }}>
                This site requires a proper monitor, mate.
              </p>
              <p style={{ margin: '0 0 8px' }}>
                FoestaufOS needs at least 768px of horizontal real estate to
                render all the nostalgic bits properly. Your current viewport is
                a tad cramped for a full desktop experience.
              </p>
              <p style={{ margin: 0, color: 'var(--win95-text-disabled)' }}>
                Try rotating your device to landscape, or better yet — grab a
                real computer.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              className="win95-outset"
              onClick={() => setIsMobile(false)}
              style={{
                padding: '4px 24px',
                fontSize: 12,
                cursor: 'pointer',
              }}
            >
              Sod it, show me anyway
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
