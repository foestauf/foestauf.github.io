import { useDesktopStore } from '@/state/useDesktopStore';
import { aboutInfo } from '@/data/about';
import { ComputerIcon } from '@/components/icons/Win95Icons';

export default function AboutApp({ windowId }: { windowId: string }) {
  const closeWindow = useDesktopStore((s) => s.closeWindow);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#c0c0c0', margin: -4, padding: 8 }}>
      <div style={{ flex: 1, overflow: 'auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', padding: '8px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}><ComputerIcon size={48} /></div>
          <div style={{ fontSize: 16, fontWeight: 'bold', marginTop: 4 }}>{aboutInfo.name}</div>
          <div style={{ fontSize: 12, color: '#808080' }}>{aboutInfo.tagline}</div>
        </div>

        <div className="win95-separator" />

        {/* Bio */}
        <div style={{ padding: '4px 0' }}>
          {aboutInfo.bio.map((paragraph, i) => (
            <p key={i} style={{ margin: '4px 0', fontSize: 12, lineHeight: 1.4 }}>{paragraph}</p>
          ))}
        </div>

        <div className="win95-separator" />

        {/* System Properties */}
        <div style={{ padding: '4px 0' }}>
          <div style={{ fontWeight: 'bold', fontSize: 12, marginBottom: 4 }}>System Properties:</div>
          <table style={{ width: '100%', fontSize: 12, borderCollapse: 'collapse' }}>
            <tbody>
              {aboutInfo.system.map((prop) => (
                <tr key={prop.label}>
                  <td style={{ padding: '2px 8px 2px 0', fontWeight: 'bold', whiteSpace: 'nowrap', verticalAlign: 'top' }}>{prop.label}:</td>
                  <td style={{ padding: '2px 0' }}>{prop.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="win95-separator" />

        {/* Current Focus */}
        <div style={{ padding: '4px 0' }}>
          <div style={{ fontWeight: 'bold', fontSize: 12, marginBottom: 4 }}>Currently Working On:</div>
          <ul style={{ margin: 0, paddingLeft: 20, fontSize: 12 }}>
            {aboutInfo.currentFocus.map((item, i) => (
              <li key={i} style={{ marginBottom: 2 }}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* OK Button */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0 4px' }}>
        <button
          className="win95-outset"
          style={{ padding: '2px 24px', fontSize: 12, cursor: 'pointer' }}
          onClick={() => closeWindow(windowId)}
        >
          OK
        </button>
      </div>
    </div>
  );
}
