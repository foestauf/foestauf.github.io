import { useState } from 'react';
import { useDesktopStore } from '@/state/useDesktopStore';
import { getAppById } from '@/registry/appRegistry';

const fileTypes: Record<string, string> = {
  about: 'System Information',
  projects: 'File Folder',
  resume: 'Text Document',
  terminal: 'MS-DOS Application',
  trash: 'Recycle Bin',
  game: 'DOS Executable',
};

const fileSizes: Record<string, string> = {
  about: '42.0 KB',
  projects: '1.21 MB',
  resume: '8.3 KB',
  terminal: '128 KB',
  trash: '0 bytes',
  game: '640 KB',
};

const tabs = ['General'] as const;

export default function PropertiesApp({ windowId }: { windowId: string }) {
  const win = useDesktopStore((s) => s.windows.find((w) => w.id === windowId));
  const closeWindow = useDesktopStore((s) => s.closeWindow);
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>('General');

  const appId = (win?.payload as string) ?? 'about';
  const app = getAppById(appId);

  if (!app) return null;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        background: '#c0c0c0',
        margin: -4,
        padding: 8,
      }}
    >
      {/* Tabs */}
      <div style={{ display: 'flex', gap: 0, marginBottom: -1, paddingLeft: 4 }}>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '3px 12px',
              fontSize: 12,
              cursor: 'pointer',
              background: activeTab === tab ? 'var(--win95-bg)' : '#b0b0b0',
              border: 'none',
              borderTop: '2px solid var(--win95-border-light)',
              borderLeft: '2px solid var(--win95-border-light)',
              borderRight: '2px solid var(--win95-border-dark)',
              borderBottom:
                activeTab === tab ? '2px solid var(--win95-bg)' : '2px solid var(--win95-border-dark)',
              position: 'relative',
              zIndex: activeTab === tab ? 2 : 1,
              marginBottom: activeTab === tab ? -2 : 0,
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content panel */}
      <div
        style={{
          flex: 1,
          overflow: 'auto',
          borderTop: '2px solid var(--win95-border-light)',
          borderLeft: '2px solid var(--win95-border-light)',
          borderBottom: '2px solid var(--win95-border-dark)',
          borderRight: '2px solid var(--win95-border-dark)',
          padding: 12,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {activeTab === 'General' && (
          <div>
            {/* Icon + filename */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                paddingBottom: 8,
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', width: 32, height: 32 }}>{app.icon}</span>
              <span style={{ fontSize: 13, fontWeight: 'bold' }}>{app.title}</span>
            </div>

            <div className="win95-separator" />

            {/* Properties table */}
            <table style={{ fontSize: 12, borderCollapse: 'collapse', width: '100%' }}>
              <tbody>
                <Row label="Type" value={fileTypes[appId] ?? 'Application'} />
                <Row label="Location" value="C:\WINDOWS\Desktop" />
                <Row label="Size" value={fileSizes[appId] ?? '0 bytes'} />
                <Row label="Size on disk" value={fileSizes[appId] ?? '0 bytes'} />
              </tbody>
            </table>

            <div className="win95-separator" />

            <table style={{ fontSize: 12, borderCollapse: 'collapse', width: '100%' }}>
              <tbody>
                <Row label="Created" value="Tuesday, 10 March 2026, 09:41:00" />
                <Row label="Modified" value="Tuesday, 10 March 2026, 09:41:00" />
                <Row label="Accessed" value="Tuesday, 10 March 2026, 09:41:00" />
              </tbody>
            </table>

            <div className="win95-separator" />

            {/* Attributes */}
            <div style={{ fontSize: 12, marginTop: 4 }}>
              <span style={{ fontWeight: 'bold', marginRight: 12 }}>Attributes:</span>
              <label style={{ marginRight: 12, cursor: 'default' }}>
                <input type="checkbox" disabled style={{ marginRight: 3 }} />
                Read-only
              </label>
              <label style={{ marginRight: 12, cursor: 'default' }}>
                <input type="checkbox" disabled style={{ marginRight: 3 }} />
                Hidden
              </label>
              <label style={{ cursor: 'default' }}>
                <input type="checkbox" disabled checked style={{ marginRight: 3 }} />
                Archive
              </label>
            </div>
          </div>
        )}
      </div>

      {/* OK / Cancel buttons */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 6,
          paddingTop: 8,
        }}
      >
        <button
          className="win95-outset"
          style={{ padding: '2px 20px', fontSize: 12, cursor: 'pointer' }}
          onClick={() => closeWindow(windowId)}
        >
          OK
        </button>
        <button
          className="win95-outset"
          style={{ padding: '2px 20px', fontSize: 12, cursor: 'pointer' }}
          onClick={() => closeWindow(windowId)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <tr>
      <td
        style={{
          padding: '3px 12px 3px 0',
          fontWeight: 'bold',
          whiteSpace: 'nowrap',
          verticalAlign: 'top',
          color: 'var(--win95-text)',
        }}
      >
        {label}:
      </td>
      <td style={{ padding: '3px 0', color: 'var(--win95-text)' }}>{value}</td>
    </tr>
  );
}
