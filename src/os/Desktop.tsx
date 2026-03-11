import { useState, useCallback, useRef, useEffect } from 'react';
import DesktopIcon from '@/components/DesktopIcon';
import ContextMenu, { type ContextMenuItem } from '@/components/ContextMenu';
import WindowLayer from '@/os/WindowLayer';
import Taskbar from '@/os/Taskbar';
import { appRegistry } from '@/registry/appRegistry';
import { useDesktopStore } from '@/state/useDesktopStore';
import { TrashEmptyIcon, TrashFullIcon } from '@/components/icons/Win95Icons';

const DESKTOP_APP_IDS = ['about', 'projects', 'resume', 'terminal', 'trash'];
const ICON_WIDTH = 75;
const ICON_HEIGHT = 75;
const GRID_GAP = 4;
const GRID_PADDING = 8;

const desktopApps = appRegistry.filter((app) => DESKTOP_APP_IDS.includes(app.id));

export function getDefaultPosition(index: number) {
  const col = Math.floor(index / 5);
  const row = index % 5;
  return {
    x: GRID_PADDING + col * (ICON_WIDTH + GRID_GAP),
    y: GRID_PADDING + row * (ICON_HEIGHT + GRID_GAP),
  };
}

interface SelectionRect {
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
}

function rectFromSelection(sel: SelectionRect) {
  return {
    left: Math.min(sel.startX, sel.currentX),
    top: Math.min(sel.startY, sel.currentY),
    right: Math.max(sel.startX, sel.currentX),
    bottom: Math.max(sel.startY, sel.currentY),
  };
}

function rectsIntersect(
  a: { left: number; top: number; right: number; bottom: number },
  b: { left: number; top: number; right: number; bottom: number },
) {
  return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
}

export default function Desktop() {
  const iconPositions = useDesktopStore((s) => s.iconPositions);
  const updateIconPosition = useDesktopStore((s) => s.updateIconPosition);
  const selectIcons = useDesktopStore((s) => s.selectIcons);
  const clearSelection = useDesktopStore((s) => s.clearSelection);
  const trashedIcons = useDesktopStore((s) => s.trashedIcons);
  const closeWindow = useDesktopStore((s) => s.closeWindow);
  const windows = useDesktopStore((s) => s.windows);

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape closes the topmost window
      if (e.key === 'Escape') {
        const visibleWindows = windows.filter((w) => !w.minimized);
        if (visibleWindows.length === 0) return;
        const topWindow = visibleWindows.reduce((a, b) => (a.zIndex > b.zIndex ? a : b));
        closeWindow(topWindow.id);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [windows, closeWindow]);

  const trashedIds = new Set(trashedIcons.map((t) => t.appId));
  const visibleApps = desktopApps.filter((app) => !trashedIds.has(app.id));
  const trashHasItems = trashedIcons.length > 0;

  // Seed default positions into the store so group dragging works for all icons
  useEffect(() => {
    desktopApps.forEach((app, index) => {
      if (!iconPositions[app.id]) {
        updateIconPosition(app.id, getDefaultPosition(index));
      }
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const [selection, setSelection] = useState<SelectionRect | null>(null);
  const isSelecting = useRef(false);

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  }, []);

  const closeContextMenu = useCallback(() => {
    setContextMenu(null);
  }, []);

  const arrangeIcons = useCallback(() => {
    // Re-arrange only visible (non-trashed) icons
    const visible = desktopApps.filter((app) => !useDesktopStore.getState().trashedIcons.some((t) => t.appId === app.id));
    visible.forEach((app, index) => {
      updateIconPosition(app.id, getDefaultPosition(index));
    });
  }, [updateIconPosition]);

  // Compute which icons intersect with the selection rectangle
  const updateSelection = useCallback(
    (sel: SelectionRect) => {
      const selRect = rectFromSelection(sel);
      const selected: string[] = [];
      visibleApps.forEach((app) => {
        const pos = iconPositions[app.id];
        if (!pos) return;
        const iconRect = {
          left: pos.x,
          top: pos.y,
          right: pos.x + ICON_WIDTH,
          bottom: pos.y + ICON_HEIGHT,
        };
        if (rectsIntersect(selRect, iconRect)) {
          selected.push(app.id);
        }
      });
      selectIcons(selected);
    },
    [iconPositions, selectIcons, visibleApps],
  );

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      // Only start selection on left-click directly on the desktop
      if (e.button !== 0) return;
      if (e.target !== e.currentTarget) return;

      e.currentTarget.setPointerCapture(e.pointerId);
      clearSelection();
      const sel: SelectionRect = {
        startX: e.clientX,
        startY: e.clientY,
        currentX: e.clientX,
        currentY: e.clientY,
      };
      setSelection(sel);
      isSelecting.current = true;
    },
    [clearSelection],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isSelecting.current) return;
      const sel: SelectionRect = {
        startX: selection!.startX,
        startY: selection!.startY,
        currentX: e.clientX,
        currentY: e.clientY,
      };
      setSelection(sel);
      updateSelection(sel);
    },
    [selection, updateSelection],
  );

  const onPointerUp = useCallback(() => {
    isSelecting.current = false;
    setSelection(null);
  }, []);

  const menuItems: ContextMenuItem[] = [
    {
      label: 'Arrange Icons',
      onClick: arrangeIcons,
    },
    { label: 'Line up Icons', disabled: true, separator: false },
    { label: '', separator: true },
    { label: 'Refresh', onClick: () => window.location.reload() },
    { label: '', separator: true },
    { label: 'New', disabled: true },
    { label: '', separator: true },
    { label: 'Properties', disabled: true },
  ];

  const selRect = selection ? rectFromSelection(selection) : null;

  return (
    <div
      className="win95-desktop"
      onContextMenu={handleContextMenu}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      {visibleApps.map((app) => {
        const pos = iconPositions[app.id] ?? { x: 0, y: 0 };
        // Swap trash icon based on whether it has items
        const icon = app.id === 'trash'
          ? (trashHasItems ? TrashFullIcon() : TrashEmptyIcon())
          : app.icon;
        return (
          <DesktopIcon
            key={app.id}
            appId={app.id}
            icon={icon}
            title={app.id === 'trash' && trashHasItems ? 'Trash (full)' : app.title}
            position={pos}
          />
        );
      })}

      {/* Selection marquee */}
      {selRect && (
        <div
          style={{
            position: 'fixed',
            left: selRect.left,
            top: selRect.top,
            width: selRect.right - selRect.left,
            height: selRect.bottom - selRect.top,
            border: '1px dotted #000',
            background: 'rgba(0, 0, 128, 0.15)',
            pointerEvents: 'none',
            zIndex: 50,
          }}
        />
      )}

      <WindowLayer />
      <Taskbar />

      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          items={menuItems}
          onClose={closeContextMenu}
        />
      )}
    </div>
  );
}
