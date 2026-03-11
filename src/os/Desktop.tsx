import { useState, useCallback } from 'react';
import DesktopIcon from '@/components/DesktopIcon';
import ContextMenu, { type ContextMenuItem } from '@/components/ContextMenu';
import WindowLayer from '@/os/WindowLayer';
import Taskbar from '@/os/Taskbar';
import { appRegistry } from '@/registry/appRegistry';
import { useDesktopStore } from '@/state/useDesktopStore';

const DESKTOP_APP_IDS = ['about', 'projects', 'resume', 'terminal', 'trash'];
const ICON_WIDTH = 75;
const ICON_HEIGHT = 75;
const GRID_GAP = 4;
const GRID_PADDING = 8;

const desktopApps = appRegistry.filter((app) => DESKTOP_APP_IDS.includes(app.id));

function getDefaultPosition(index: number) {
  const col = Math.floor(index / 5);
  const row = index % 5;
  return {
    x: GRID_PADDING + col * (ICON_WIDTH + GRID_GAP),
    y: GRID_PADDING + row * (ICON_HEIGHT + GRID_GAP),
  };
}

export default function Desktop() {
  const iconPositions = useDesktopStore((s) => s.iconPositions);
  const updateIconPosition = useDesktopStore((s) => s.updateIconPosition);

  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  }, []);

  const closeContextMenu = useCallback(() => {
    setContextMenu(null);
  }, []);

  const arrangeIcons = useCallback(() => {
    desktopApps.forEach((app, index) => {
      updateIconPosition(app.id, getDefaultPosition(index));
    });
  }, [updateIconPosition]);

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

  return (
    <div className="win95-desktop" onContextMenu={handleContextMenu}>
      {desktopApps.map((app, index) => {
        const pos = iconPositions[app.id] ?? getDefaultPosition(index);
        return (
          <DesktopIcon
            key={app.id}
            appId={app.id}
            icon={app.icon}
            title={app.title}
            position={pos}
          />
        );
      })}

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
