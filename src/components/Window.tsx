import { Rnd } from 'react-rnd';
import { useDesktopStore } from '@/state/useDesktopStore';
import { getAppById } from '@/registry/appRegistry';

export default function Window({ windowId }: { windowId: string }) {
  const win = useDesktopStore((s) => s.windows.find((w) => w.id === windowId));
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

  return (
    <Rnd
      style={{
        display: win.minimized ? 'none' : 'flex',
        flexDirection: 'column',
        zIndex: win.zIndex,
        border: '2px solid #888',
        background: '#c0c0c0',
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
        className="window-title-bar"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '2px 4px',
          background: '#000080',
          color: '#fff',
          fontSize: '13px',
          fontWeight: 'bold',
          userSelect: 'none',
          cursor: 'default',
        }}
      >
        <span>{win.title}</span>
        <div style={{ display: 'flex', gap: '2px' }}>
          <button
            onClick={(e) => { e.stopPropagation(); minimizeWindow(windowId); }}
            style={{ width: 20, height: 20, fontSize: 12, cursor: 'pointer' }}
          >
            _
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); toggleMaximize(windowId); }}
            style={{ width: 20, height: 20, fontSize: 12, cursor: 'pointer' }}
          >
            □
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); closeWindow(windowId); }}
            style={{ width: 20, height: 20, fontSize: 12, cursor: 'pointer' }}
          >
            ✕
          </button>
        </div>
      </div>

      {/* App content */}
      <div style={{ flex: 1, overflow: 'auto', padding: 4 }}>
        <AppComponent windowId={windowId} />
      </div>
    </Rnd>
  );
}
