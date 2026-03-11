import { useDesktopStore } from '@/state/useDesktopStore';
import { appRegistry } from '@/registry/appRegistry';
import { useState } from 'react';

interface StartMenuProps {
  onClose: () => void;
}

export default function StartMenu({ onClose }: StartMenuProps) {
  const openApp = useDesktopStore((s) => s.openApp);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div
      className="win95-outset"
      onMouseDown={(e) => e.stopPropagation()}
      style={{
        position: 'fixed',
        bottom: 40,
        left: 0,
        width: 200,
        zIndex: 10001,
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      {/* Sidebar stripe */}
      <div
        style={{
          width: 28,
          background: 'linear-gradient(to top, #000080 0%, #1084d0 100%)',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          paddingBottom: 8,
          flexShrink: 0,
        }}
      >
        <span
          style={{
            color: '#c0c0c0',
            fontSize: 12,
            fontWeight: 'bold',
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
            letterSpacing: 2,
          }}
        >
          FoestaufOS
        </span>
      </div>

      {/* Menu items */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '2px 0' }}>
        {appRegistry.map((app, i) => (
          <div key={app.id}>
            <button
              onClick={() => {
                openApp(app.id);
                onClose();
              }}
              onMouseEnter={() => setHoveredId(app.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '5px 10px',
                border: 'none',
                background: hoveredId === app.id ? 'var(--win95-highlight)' : 'transparent',
                color: hoveredId === app.id ? 'var(--win95-highlight-text)' : 'var(--win95-text)',
                fontSize: 12,
                cursor: 'pointer',
                textAlign: 'left',
                width: '100%',
              }}
            >
              <span style={{ fontSize: 18, width: 24, textAlign: 'center', flexShrink: 0 }}>
                {app.icon}
              </span>
              <span>{app.title}</span>
            </button>
            {/* Separator after the main apps, before the game */}
            {i === appRegistry.length - 2 && (
              <div
                style={{
                  margin: '2px 4px',
                  borderTop: '1px solid var(--win95-border-dark)',
                  borderBottom: '1px solid var(--win95-border-light)',
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
