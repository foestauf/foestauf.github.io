import type { ReactNode } from 'react';
import { trashItems } from '@/data/trash';
import { useDesktopStore } from '@/state/useDesktopStore';
import { getAppById } from '@/registry/appRegistry';
import { DocumentIcon } from '@/components/icons/Win95Icons';

interface TrashListItem {
  icon: ReactNode;
  name: string;
  reason: string;
  date: string;
}

export default function TrashApp({ windowId: _windowId }: { windowId: string }) {
  const trashedIcons = useDesktopStore((s) => s.trashedIcons);
  const emptyTrash = useDesktopStore((s) => s.emptyTrash);

  const allItems: TrashListItem[] = [
    ...trashedIcons.map((t) => {
      const app = getAppById(t.appId);
      return {
        icon: app?.icon ?? DocumentIcon({ size: 16 }),
        name: t.title,
        reason: 'Deleted from desktop',
        date: t.deletedAt,
      };
    }),
    ...trashItems.map((t) => ({
      icon: DocumentIcon({ size: 16 }) as ReactNode,
      name: t.name,
      reason: t.reason,
      date: t.date,
    })),
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', margin: -4, background: '#c0c0c0' }}>
      {/* Toolbar */}
      {trashedIcons.length > 0 && (
        <div style={{ padding: '2px 4px', flexShrink: 0 }}>
          <button
            className="win95-outset"
            style={{ padding: '2px 8px', fontSize: 11, cursor: 'pointer' }}
            onClick={emptyTrash}
          >
            Empty Recycle Bin
          </button>
        </div>
      )}

      {/* Column headers */}
      <div style={{ display: 'flex', flexShrink: 0 }}>
        <div className="win95-outset" style={{ flex: 3, padding: '2px 4px', fontSize: 12, fontWeight: 'bold', cursor: 'default' }}>
          Name
        </div>
        <div className="win95-outset" style={{ flex: 3, padding: '2px 4px', fontSize: 12, fontWeight: 'bold', cursor: 'default' }}>
          Reason
        </div>
        <div className="win95-outset" style={{ flex: 1.5, padding: '2px 4px', fontSize: 12, fontWeight: 'bold', cursor: 'default' }}>
          Date Deleted
        </div>
      </div>

      {/* List */}
      <div style={{ flex: 1, overflow: 'auto', background: '#ffffff' }}>
        {allItems.map((item, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '2px 4px',
              fontSize: 12,
              borderBottom: '1px solid #e0e0e0',
              cursor: 'default',
            }}
          >
            <div style={{ flex: 3, display: 'flex', alignItems: 'center', gap: 4, overflow: 'hidden' }}>
              <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0, width: 16, height: 16 }}>
                {typeof item.icon === 'string' ? item.icon : <span style={{ transform: 'scale(0.5)', transformOrigin: 'top left' }}>{item.icon}</span>}
              </span>
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</span>
            </div>
            <div style={{ flex: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#404040' }}>
              {item.reason}
            </div>
            <div style={{ flex: 1.5, whiteSpace: 'nowrap' }}>
              {item.date}
            </div>
          </div>
        ))}
      </div>

      {/* Status bar */}
      <div className="win95-inset" style={{ padding: '2px 6px', fontSize: 11, flexShrink: 0 }}>
        {allItems.length} abandoned object(s)
      </div>
    </div>
  );
}
