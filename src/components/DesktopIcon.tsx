import { useRef, useCallback, useState } from 'react';
import { useDesktopStore } from '@/state/useDesktopStore';
import ContextMenu, { type ContextMenuItem } from '@/components/ContextMenu';

interface DesktopIconProps {
  appId: string;
  icon: string;
  title: string;
  position: { x: number; y: number };
}

export default function DesktopIcon({ appId, icon, title, position }: DesktopIconProps) {
  const openApp = useDesktopStore((s) => s.openApp);
  const updateIconPosition = useDesktopStore((s) => s.updateIconPosition);
  const dragRef = useRef<{ startX: number; startY: number; iconX: number; iconY: number } | null>(null);
  const hasDragged = useRef(false);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (e.button === 2) return; // don't drag on right-click
      e.currentTarget.setPointerCapture(e.pointerId);
      dragRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        iconX: position.x,
        iconY: position.y,
      };
      hasDragged.current = false;
    },
    [position],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragRef.current) return;
      const dx = e.clientX - dragRef.current.startX;
      const dy = e.clientY - dragRef.current.startY;
      if (!hasDragged.current && Math.abs(dx) < 4 && Math.abs(dy) < 4) return;
      hasDragged.current = true;
      updateIconPosition(appId, {
        x: dragRef.current.iconX + dx,
        y: dragRef.current.iconY + dy,
      });
    },
    [appId, updateIconPosition],
  );

  const onPointerUp = useCallback(() => {
    dragRef.current = null;
  }, []);

  const handleContextMenu = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation(); // prevent desktop context menu
      setContextMenu({ x: e.clientX, y: e.clientY });
    },
    [],
  );

  const menuItems: ContextMenuItem[] = [
    { label: 'Open', onClick: () => openApp(appId) },
    { label: '', separator: true },
    {
      label: 'Properties',
      onClick: () => openApp('properties', appId),
    },
  ];

  return (
    <>
      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onContextMenu={handleContextMenu}
        onDoubleClick={() => {
          if (!hasDragged.current) openApp(appId);
        }}
        style={{
          position: 'absolute',
          left: position.x,
          top: position.y,
          width: 75,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          padding: '8px 4px',
          cursor: 'default',
          userSelect: 'none',
          touchAction: 'none',
        }}
      >
        <span
          style={{
            fontSize: 32,
            lineHeight: 1,
            filter: 'drop-shadow(1px 1px 0 rgba(0,0,0,0.3))',
          }}
        >
          {icon}
        </span>
        <span
          style={{
            fontSize: 11,
            color: '#fff',
            textShadow:
              '1px 0 1px #000, -1px 0 1px #000, 0 1px 1px #000, 0 -1px 1px #000',
            textAlign: 'center',
            wordBreak: 'break-word',
            lineHeight: 1.2,
          }}
        >
          {title}
        </span>
      </div>

      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          items={menuItems}
          onClose={() => setContextMenu(null)}
        />
      )}
    </>
  );
}
