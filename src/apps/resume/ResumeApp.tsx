import { resumeText } from '@/data/resume';

export default function ResumeApp({ windowId: _windowId }: { windowId: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', margin: -4 }}>
      {/* Faux menu bar */}
      <div style={{
        background: '#c0c0c0',
        padding: '2px 0',
        fontSize: 12,
        borderBottom: '1px solid #808080',
        userSelect: 'none',
      }}>
        <span style={{ padding: '0 6px' }}>
          <span style={{ textDecoration: 'underline' }}>F</span>ile
        </span>
        <span style={{ padding: '0 6px' }}>
          <span style={{ textDecoration: 'underline' }}>E</span>dit
        </span>
        <span style={{ padding: '0 6px' }}>
          <span style={{ textDecoration: 'underline' }}>H</span>elp
        </span>
      </div>

      {/* Content */}
      <div style={{
        flex: 1,
        overflow: 'auto',
        padding: 8,
        background: '#ffffff',
      }}>
        <pre className="font-mono-retro" style={{
          whiteSpace: 'pre-wrap',
          margin: 0,
          fontSize: 12,
          lineHeight: 1.4,
          color: '#000',
        }}>
          {resumeText}
        </pre>
      </div>
    </div>
  );
}
