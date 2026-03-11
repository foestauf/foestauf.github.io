import { Rnd } from 'react-rnd';
import { useDesktopStore } from '@/state/useDesktopStore';
import { getAppById } from '@/registry/appRegistry';

export default function Window({ windowId }: { windowId: string }) {
  const win = useDesktopStore((s) => s.windows.find((w) => w.id === windowId));
  const windows = useDesktopStore((s) => s.windows);
  const focusWindow = useDesktopStore((s) => s.focusWindow);
  const closeWindow = useDesktopStore((s) => s.closeWindow);
  const minimizeWindow = useDesktopStore((s) => s.minimizeWindow);
  const toggleMaximize = useDesktopStore((s) => s.toggleMaximize);
  const updateWindowPosition = useDesktopStore((s) => s.updateWindowPosition);
  const updateWindowSize = useDesktopStore((s) => s.updateWindowSize);

  if (!win) return null;

  const app = getAppById(win.appId);
  if (!app) return null;

  const AppComponent = app.component;
  const maxZ = Math.max(...windows.map((w) => w.zIndex));
  const isActive = win.zIndex === maxZ;

  return (
    <Rnd
      className="win95-window-frame"
      style={{
        display: win.minimized ? 'none' : 'flex',
        flexDirection: 'column',
        zIndex: win.zIndex,
      }}
      size={win.size}
      position={win.position}
      disableDragging={win.maximized}
      enableResizing={!win.maximized}
      dragHandleClassName="window-title-bar"
      onMouseDown={() => focusWindow(windowId)}
      onDragStop={(_e, d) => {
        updateWindowPosition(windowId, { x: d.x, y: d.y });
      }}
      onResizeStop={(_e, _dir, ref, _delta, position) => {
        updateWindowSize(windowId, {
          width: ref.offsetWidth,
          height: ref.offsetHeight,
        });
        updateWindowPosition(windowId, position);
      }}
      minWidth={200}
      minHeight={150}
    >
      {/* Title bar */}
      <div
        className={`window-title-bar ${isActive ? 'win95-title-bar' : 'win95-title-bar inactive'}`}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: 4, overflow: 'hidden' }}>
          <span style={{ display: 'flex', alignItems: 'center', width: 14, height: 14 }}>{typeof app.icon === 'string' ? app.icon : <span style={{ transform: 'scale(0.44)', transformOrigin: 'top left' }}>{app.icon}</span>}</span>
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {win.title}
          </span>
        </span>
        <div style={{ display: 'flex', gap: 2, flexShrink: 0 }}>
          <button
            className="win95-title-btn"
            onClick={(e) => { e.stopPropagation(); minimizeWindow(windowId); }}
            aria-label="Minimize"
          >
            <span style={{ borderBottom: '2px solid #000', width: 6, height: 0, marginTop: 4 }} />
          </button>
          <button
            className="win95-title-btn"
            onClick={(e) => { e.stopPropagation(); toggleMaximize(windowId); }}
            aria-label={win.maximized ? 'Restore' : 'Maximize'}
          >
            {win.maximized ? (
              <span style={{
                width: 7, height: 7, position: 'relative',
              }}>
                <span style={{
                  position: 'absolute', top: 0, right: 0,
                  width: 6, height: 5,
                  border: '1px solid #000', borderTop: '2px solid #000',
                }} />
                <span style={{
                  position: 'absolute', bottom: 0, left: 0,
                  width: 6, height: 5,
                  border: '1px solid #000', borderTop: '2px solid #000',
                  background: 'var(--win95-bg)',
                }} />
              </span>
            ) : (
              <span style={{
                width: 8, height: 6,
                border: '1px solid #000', borderTop: '2px solid #000',
              }} />
            )}
          </button>
          <button
            className="win95-title-btn"
            onClick={(e) => { e.stopPropagation(); closeWindow(windowId); }}
            aria-label="Close"
            style={{ marginLeft: 2 }}
          >
            ✕
          </button>
        </div>
      </div>

      {/* Inner bevel — 1px inset inside the window frame */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        margin: '2px',
        overflow: 'hidden',
      }}>
        {/* App content area — inset well */}
        <div
          className="win95-well"
          style={{ flex: 1, overflow: 'auto', padding: 4 }}
        >
          <AppComponent windowId={windowId} />
        </div>
      </div>
    </Rnd>
  );
}
