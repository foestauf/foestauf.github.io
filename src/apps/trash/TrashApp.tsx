import { trashItems } from '@/data/trash';

export default function TrashApp({ windowId: _windowId }: { windowId: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', margin: -4, background: '#c0c0c0' }}>
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
        {trashItems.map((item, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              padding: '2px 4px',
              fontSize: 12,
              borderBottom: '1px solid #e0e0e0',
              cursor: 'default',
            }}
          >
            <div style={{ flex: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              📄 {item.name}
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
        {trashItems.length} abandoned object(s)
      </div>
    </div>
  );
}
