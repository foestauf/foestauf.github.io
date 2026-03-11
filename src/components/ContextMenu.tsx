import { useEffect, useRef } from 'react';

export interface ContextMenuItem {
  label: string;
  disabled?: boolean;
  separator?: boolean;
  onClick?: () => void;
}

interface ContextMenuProps {
  x: number;
  y: number;
  items: ContextMenuItem[];
  onClose: () => void;
}

export default function ContextMenu({ x, y, items, onClose }: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on any click outside or Escape
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  // Keep menu within viewport
  const clampedX = Math.min(x, window.innerWidth - 180);
  const clampedY = Math.min(y, window.innerHeight - items.length * 24 - 8);

  return (
    <div
      ref={menuRef}
      style={{
        position: 'fixed',
        left: clampedX,
        top: clampedY,
        zIndex: 100000,
        minWidth: 170,
        padding: '2px',
        background: 'var(--win95-bg)',
        borderTop: '2px solid var(--win95-border-light)',
        borderLeft: '2px solid var(--win95-border-light)',
        borderBottom: '2px solid var(--win95-border-darkest)',
        borderRight: '2px solid var(--win95-border-darkest)',
        fontFamily: "'Segoe UI', Tahoma, Geneva, 'MS Sans Serif', Arial, sans-serif",
        fontSize: 12,
      }}
    >
      {items.map((item, i) =>
        item.separator ? (
          <div
            key={i}
            style={{
              borderTop: '1px solid var(--win95-border-dark)',
              borderBottom: '1px solid var(--win95-border-light)',
              margin: '3px 2px',
            }}
          />
        ) : (
          <div
            key={i}
            onClick={() => {
              if (item.disabled) return;
              item.onClick?.();
              onClose();
            }}
            style={{
              padding: '3px 20px 3px 24px',
              cursor: item.disabled ? 'default' : 'pointer',
              color: item.disabled ? 'var(--win95-text-disabled)' : 'var(--win95-text)',
              userSelect: 'none',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              if (!item.disabled) {
                e.currentTarget.style.background = 'var(--win95-highlight)';
                e.currentTarget.style.color = 'var(--win95-highlight-text)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '';
              e.currentTarget.style.color = item.disabled
                ? 'var(--win95-text-disabled)'
                : 'var(--win95-text)';
            }}
          >
            {item.label}
          </div>
        ),
      )}
    </div>
  );
}
