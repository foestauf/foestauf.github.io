import { useRef, useCallback, useState, type ReactNode } from 'react';
import { useDesktopStore } from '@/state/useDesktopStore';
import ContextMenu, { type ContextMenuItem } from '@/components/ContextMenu';

const ICON_SIZE = 75;

interface DesktopIconProps {
  appId: string;
  icon: ReactNode;
  title: string;
  position: { x: number; y: number };
}

function isOverTrash(x: number, y: number): boolean {
  const state = useDesktopStore.getState();
  const trashPos = state.iconPositions['trash'];
  if (!trashPos) return false;
  return (
    x > trashPos.x &&
    x < trashPos.x + ICON_SIZE &&
    y > trashPos.y &&
    y < trashPos.y + ICON_SIZE
  );
}

export default function DesktopIcon({ appId, icon, title, position }: DesktopIconProps) {
  const openApp = useDesktopStore((s) => s.openApp);
  const updateIconPosition = useDesktopStore((s) => s.updateIconPosition);
  const isSelected = useDesktopStore((s) => s.selectedIcons.includes(appId));
  const selectIcons = useDesktopStore((s) => s.selectIcons);
  const trashIcons = useDesktopStore((s) => s.trashIcons);
  const dragRef = useRef<{
    startX: number;
    startY: number;
    iconX: number;
    iconY: number;
    groupOffsets: { appId: string; x: number; y: number }[];
  } | null>(null);
  const hasDragged = useRef(false);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (e.button === 2) return; // don't drag on right-click
      e.stopPropagation(); // prevent desktop marquee from starting
      e.currentTarget.setPointerCapture(e.pointerId);

      // Click to select this icon
      if (e.ctrlKey || e.metaKey) {
        // Toggle selection with Ctrl
        if (isSelected) {
          selectIcons(useDesktopStore.getState().selectedIcons.filter((id) => id !== appId));
        } else {
          selectIcons([...useDesktopStore.getState().selectedIcons, appId]);
        }
      } else if (!isSelected) {
        selectIcons([appId]);
      }

      // Snapshot positions of all selected icons for group dragging
      const state = useDesktopStore.getState();
      const selected = state.selectedIcons.includes(appId)
        ? state.selectedIcons
        : [appId];
      const groupOffsets = selected
        .filter((id) => id !== appId)
        .map((id) => {
          const pos = state.iconPositions[id];
          return pos ? { appId: id, x: pos.x, y: pos.y } : null;
        })
        .filter((v): v is { appId: string; x: number; y: number } => v !== null);

      dragRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        iconX: position.x,
        iconY: position.y,
        groupOffsets,
      };
      hasDragged.current = false;
    },
    [position, appId, isSelected, selectIcons],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragRef.current) return;
      const dx = e.clientX - dragRef.current.startX;
      const dy = e.clientY - dragRef.current.startY;
      if (!hasDragged.current && Math.abs(dx) < 4 && Math.abs(dy) < 4) return;
      hasDragged.current = true;

      // Move the dragged icon
      updateIconPosition(appId, {
        x: dragRef.current.iconX + dx,
        y: dragRef.current.iconY + dy,
      });

      // Move all other selected icons by the same delta
      for (const ico of dragRef.current.groupOffsets) {
        updateIconPosition(ico.appId, {
          x: ico.x + dx,
          y: ico.y + dy,
        });
      }
    },
    [appId, updateIconPosition],
  );

  const onPointerUp = useCallback(() => {
    if (!dragRef.current) return;
    const didDrag = hasDragged.current;
    dragRef.current = null;

    // Check if dropped on the Trash icon
    if (didDrag && appId !== 'trash') {
      const state = useDesktopStore.getState();
      const myPos = state.iconPositions[appId];
      if (myPos && isOverTrash(myPos.x + ICON_SIZE / 2, myPos.y + ICON_SIZE / 2)) {
        // Trash this icon and any other selected icons
        const toTrash = state.selectedIcons.includes(appId)
          ? state.selectedIcons.filter((id) => id !== 'trash')
          : [appId];
        trashIcons(toTrash);
      }
    }
  }, [appId, trashIcons]);

  const handleContextMenu = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation(); // prevent desktop context menu
      setContextMenu({ x: e.clientX, y: e.clientY });
    },
    [],
  );

  const handleDelete = useCallback(() => {
    const state = useDesktopStore.getState();
    const toTrash = state.selectedIcons.length > 0
      ? state.selectedIcons.filter((id) => id !== 'trash')
      : appId !== 'trash' ? [appId] : [];
    if (toTrash.length > 0) trashIcons(toTrash);
  }, [appId, trashIcons]);

  const menuItems: ContextMenuItem[] = [
    { label: 'Open', onClick: () => openApp(appId) },
    { label: '', separator: true },
    ...(appId !== 'trash'
      ? [{ label: 'Delete', onClick: handleDelete }]
      : []),
    {
      label: 'Properties',
      onClick: () => openApp('properties', appId),
    },
  ];

  return (
    <>
      <div
        tabIndex={0}
        role="button"
        aria-label={`${title} — press Enter to open`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onContextMenu={handleContextMenu}
        onDoubleClick={() => {
          if (!hasDragged.current) openApp(appId);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openApp(appId);
          } else if (e.key === 'Delete' && appId !== 'trash') {
            e.preventDefault();
            handleDelete();
          }
        }}
        onFocus={() => {
          if (!isSelected) selectIcons([appId]);
        }}
        style={{
          position: 'absolute',
          left: position.x,
          top: position.y,
          width: ICON_SIZE,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          padding: '8px 4px',
          cursor: 'default',
          userSelect: 'none',
          touchAction: 'none',
          outline: 'none',
        }}
      >
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 32,
            height: 32,
            filter: isSelected
              ? 'drop-shadow(1px 1px 0 rgba(0,0,0,0.3)) brightness(0.7) sepia(1) hue-rotate(180deg) saturate(3)'
              : 'drop-shadow(1px 1px 0 rgba(0,0,0,0.3))',
          }}
        >
          {icon}
        </span>
        <span
          style={{
            fontSize: 11,
            textAlign: 'center',
            wordBreak: 'break-word',
            lineHeight: 1.2,
            padding: '1px 2px',
            ...(isSelected
              ? {
                  color: '#fff',
                  background: 'var(--win95-highlight)',
                  textShadow: 'none',
                }
              : {
                  color: '#fff',
                  background: 'transparent',
                  textShadow:
                    '1px 0 1px #000, -1px 0 1px #000, 0 1px 1px #000, 0 -1px 1px #000',
                }),
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
