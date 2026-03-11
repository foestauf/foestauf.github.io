import { useDesktopStore } from '@/state/useDesktopStore';

interface DesktopIconProps {
  appId: string;
  icon: string;
  title: string;
}

export default function DesktopIcon({ appId, icon, title }: DesktopIconProps) {
  const openApp = useDesktopStore((s) => s.openApp);

  return (
    <div
      onDoubleClick={() => openApp(appId)}
      style={{
        width: 75,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        padding: '8px 4px',
        cursor: 'default',
        userSelect: 'none',
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
  );
}
