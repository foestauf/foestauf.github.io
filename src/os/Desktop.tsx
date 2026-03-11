import DesktopIcon from '@/components/DesktopIcon';
import WindowLayer from '@/os/WindowLayer';
import Taskbar from '@/os/Taskbar';
import { appRegistry } from '@/registry/appRegistry';

const DESKTOP_APP_IDS = ['about', 'projects', 'resume', 'terminal', 'trash'];

const desktopApps = appRegistry.filter((app) => DESKTOP_APP_IDS.includes(app.id));

export default function Desktop() {
  return (
    <div className="win95-desktop">
      {/* Icon grid */}
      <div
        style={{
          position: 'absolute',
          top: 8,
          left: 8,
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
          gap: 4,
          maxHeight: 'calc(100vh - 48px - 32px)',
          zIndex: 0,
        }}
      >
        {desktopApps.map((app) => (
          <DesktopIcon key={app.id} appId={app.id} icon={app.icon} title={app.title} />
        ))}
      </div>

      <WindowLayer />
      <Taskbar />

      {/* CRT scanline overlay */}
      <div className="crt-overlay" />
    </div>
  );
}
