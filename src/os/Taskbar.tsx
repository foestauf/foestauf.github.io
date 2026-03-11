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
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: 48,
          zIndex: 10000,
          background: '#c0c0c0',
          borderTop: '2px solid #ffffff',
          display: 'flex',
          alignItems: 'center',
          padding: '0 4px',
          gap: 4,
        }}
      >
        {/* Start button */}
        <button
          onMouseDown={(e) => {
            e.stopPropagation();
            setStartMenuOpen((prev) => !prev);
          }}
          style={{
            height: 36,
            padding: '0 10px',
            fontWeight: 'bold',
            fontSize: 13,
            cursor: 'pointer',
            background: '#c0c0c0',
            ...(startMenuOpen
              ? {
                  borderTop: '2px solid #808080',
                  borderLeft: '2px solid #808080',
                  borderBottom: '2px solid #ffffff',
                  borderRight: '2px solid #ffffff',
                }
              : {
                  borderTop: '2px solid #ffffff',
                  borderLeft: '2px solid #ffffff',
                  borderBottom: '2px solid #808080',
                  borderRight: '2px solid #808080',
                }),
          }}
        >
          🪟 Start
        </button>

        {/* Separator */}
        <div
          style={{
            width: 2,
            height: 32,
            borderLeft: '1px solid #808080',
            borderRight: '1px solid #ffffff',
          }}
        />

        {/* Window buttons */}
        <div style={{ flex: 1, display: 'flex', gap: 3, overflow: 'hidden' }}>
          {windows.map((win) => {
            const app = getAppById(win.appId);
            const isFocused = win.zIndex === maxZ && !win.minimized;
            return (
              <button
                key={win.id}
                onClick={() => handleWindowButtonClick(win.id)}
                style={{
                  height: 32,
                  maxWidth: 150,
                  padding: '0 8px',
                  fontSize: 12,
                  cursor: 'pointer',
                  background: '#c0c0c0',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  ...(isFocused
                    ? {
                        borderTop: '2px solid #808080',
                        borderLeft: '2px solid #808080',
                        borderBottom: '2px solid #ffffff',
                        borderRight: '2px solid #ffffff',
                      }
                    : {
                        borderTop: '2px solid #ffffff',
                        borderLeft: '2px solid #ffffff',
                        borderBottom: '2px solid #808080',
                        borderRight: '2px solid #808080',
                      }),
                }}
              >
                <span>{app?.icon}</span>
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{win.title}</span>
              </button>
            );
          })}
        </div>

        {/* Clock */}
        <div
          style={{
            height: 32,
            padding: '0 12px',
            display: 'flex',
            alignItems: 'center',
            fontSize: 12,
            borderTop: '2px solid #808080',
            borderLeft: '2px solid #808080',
            borderBottom: '2px solid #ffffff',
            borderRight: '2px solid #ffffff',
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
