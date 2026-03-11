import { useDesktopStore } from '@/state/useDesktopStore';
import { appRegistry } from '@/registry/appRegistry';
import { useState, useEffect, useRef } from 'react';

interface StartMenuProps {
  onClose: () => void;
}

export default function StartMenu({ onClose }: StartMenuProps) {
  const openApp = useDesktopStore((s) => s.openApp);
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const hoveredId = appRegistry[focusedIndex]?.id ?? null;
  const menuRef = useRef<HTMLDivElement>(null);

  // Focus the menu on mount and handle keyboard nav
  useEffect(() => {
    menuRef.current?.focus();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex((i) => (i <= 0 ? appRegistry.length - 1 : i - 1));
        break;
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex((i) => (i >= appRegistry.length - 1 ? 0 : i + 1));
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (appRegistry[focusedIndex]) {
          openApp(appRegistry[focusedIndex].id);
          onClose();
        }
        break;
      case 'Escape':
        e.preventDefault();
        onClose();
        break;
    }
  };

  return (
    <div
      ref={menuRef}
      className="win95-outset"
      role="menu"
      tabIndex={0}
      onMouseDown={(e) => e.stopPropagation()}
      onKeyDown={handleKeyDown}
      style={{
        position: 'fixed',
        bottom: 40,
        left: 0,
        width: 200,
        zIndex: 10001,
        display: 'flex',
        flexDirection: 'row',
        outline: 'none',
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
              role="menuitem"
              onClick={() => {
                openApp(app.id);
                onClose();
              }}
              onMouseEnter={() => setFocusedIndex(i)}
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
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 24, height: 18, flexShrink: 0 }}>
                {typeof app.icon === 'string' ? app.icon : <span style={{ transform: 'scale(0.56)', transformOrigin: 'center' }}>{app.icon}</span>}
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
