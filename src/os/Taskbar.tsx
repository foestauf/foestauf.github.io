import { useState, useEffect, useCallback } from 'react';
import { useDesktopStore } from '@/state/useDesktopStore';
import { getAppById } from '@/registry/appRegistry';
import StartMenu from '@/os/StartMenu';

export default function Taskbar() {
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [clock, setClock] = useState(formatTime());

  const windows = useDesktopStore((s) => s.windows);
  const focusWindow = useDesktopStore((s) => s.focusWindow);
  const minimizeWindow = useDesktopStore((s) => s.minimizeWindow);
  const restoreWindow = useDesktopStore((s) => s.restoreWindow);

  // Clock tick
  useEffect(() => {
    const id = setInterval(() => setClock(formatTime()), 15_000);
    return () => clearInterval(id);
  }, []);

  // Click-outside-to-close start menu
  const handleDocumentMouseDown = useCallback(() => {
    setStartMenuOpen(false);
  }, []);

  useEffect(() => {
    if (startMenuOpen) {
      document.addEventListener('mousedown', handleDocumentMouseDown);
      return () => document.removeEventListener('mousedown', handleDocumentMouseDown);
    }
  }, [startMenuOpen, handleDocumentMouseDown]);

  const maxZ = windows.length > 0 ? Math.max(...windows.map((w) => w.zIndex)) : -1;

  function handleWindowButtonClick(windowId: string) {
    const win = windows.find((w) => w.id === windowId);
    if (!win) return;

    if (win.minimized) {
      restoreWindow(windowId);
    } else if (win.zIndex === maxZ) {
      minimizeWindow(windowId);
    } else {
      focusWindow(windowId);
    }
  }

  return (
    <>
      {startMenuOpen && <StartMenu onClose={() => setStartMenuOpen(false)} />}

      <div
        className="win95-outset"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: 40,
          zIndex: 10000,
          display: 'flex',
          alignItems: 'center',
          padding: '2px 3px',
          gap: 3,
        }}
      >
        {/* Start button */}
        <button
          className={startMenuOpen ? 'win95-inset' : 'win95-outset'}
          aria-label="Start menu"
          aria-expanded={startMenuOpen}
          aria-haspopup="true"
          onMouseDown={(e) => {
            e.stopPropagation();
            setStartMenuOpen((prev) => !prev);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              e.stopPropagation();
              setStartMenuOpen((prev) => !prev);
            }
          }}
          style={{
            height: 32,
            padding: '0 8px',
            fontWeight: 'bold',
            fontSize: 12,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <span style={{ fontSize: 16 }}>🪟</span>
          <span>Start</span>
        </button>

        {/* Separator */}
        <div
          style={{
            width: 2,
            height: 28,
            borderLeft: '1px solid var(--win95-border-dark)',
            borderRight: '1px solid var(--win95-border-light)',
            flexShrink: 0,
          }}
        />

        {/* Window buttons */}
        <div style={{ flex: 1, display: 'flex', gap: 2, overflow: 'hidden' }}>
          {windows.map((win) => {
            const app = getAppById(win.appId);
            const isFocused = win.zIndex === maxZ && !win.minimized;
            return (
              <button
                key={win.id}
                className={isFocused ? 'win95-inset' : 'win95-outset'}
                onClick={() => handleWindowButtonClick(win.id)}
                style={{
                  height: 28,
                  maxWidth: 150,
                  minWidth: 80,
                  padding: '0 6px',
                  fontSize: 11,
                  cursor: 'pointer',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  fontWeight: isFocused ? 'bold' : 'normal',
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0, width: 14, height: 14 }}>{typeof app?.icon === 'string' ? app.icon : <span style={{ transform: 'scale(0.44)', transformOrigin: 'top left' }}>{app?.icon}</span>}</span>
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{win.title}</span>
              </button>
            );
          })}
        </div>

        {/* Separator */}
        <div
          style={{
            width: 2,
            height: 28,
            borderLeft: '1px solid var(--win95-border-dark)',
            borderRight: '1px solid var(--win95-border-light)',
            flexShrink: 0,
          }}
        />

        {/* Clock */}
        <div
          className="win95-inset"
          style={{
            height: 28,
            padding: '0 10px',
            display: 'flex',
            alignItems: 'center',
            fontSize: 11,
            flexShrink: 0,
          }}
        >
          {clock}
        </div>
      </div>
    </>
  );
}

function formatTime(): string {
  return new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}
