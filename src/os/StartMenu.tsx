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
      onMouseDown={(e) => e.stopPropagation()}
      style={{
        position: 'fixed',
        bottom: 48,
        left: 0,
        width: 200,
        zIndex: 10001,
        background: '#c0c0c0',
        borderTop: '2px solid #ffffff',
        borderLeft: '2px solid #ffffff',
        borderBottom: '2px solid #808080',
        borderRight: '2px solid #808080',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      {/* Sidebar stripe */}
      <div
        style={{
          width: 30,
          background: '#000080',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          paddingBottom: 8,
        }}
      >
        <span
          style={{
            color: '#c0c0c0',
            fontSize: 13,
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
        {appRegistry.map((app) => (
          <button
            key={app.id}
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
              padding: '6px 12px',
              border: 'none',
              background: hoveredId === app.id ? '#000080' : 'transparent',
              color: hoveredId === app.id ? '#fff' : '#000',
              fontSize: 13,
              cursor: 'pointer',
              textAlign: 'left',
              width: '100%',
            }}
          >
            <span style={{ fontSize: 20 }}>{app.icon}</span>
            <span>{app.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
