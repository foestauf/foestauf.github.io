import type { CSSProperties } from 'react';

interface IconProps {
  size?: number;
  style?: CSSProperties;
}

export function ComputerIcon({ size = 32, style }: IconProps = {}) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" style={{ imageRendering: 'pixelated', ...style }}>
      {/* Monitor body */}
      <rect x="4" y="2" width="24" height="18" fill="#c0c0c0" stroke="#808080" strokeWidth="1" />
      <rect x="5" y="3" width="22" height="16" fill="#000080" />
      {/* Screen highlight */}
      <rect x="4" y="2" width="24" height="1" fill="#fff" />
      <rect x="4" y="2" width="1" height="18" fill="#fff" />
      {/* Screen content - pixel text */}
      <rect x="7" y="6" width="8" height="1" fill="#c0c0c0" />
      <rect x="7" y="9" width="12" height="1" fill="#00ff00" />
      <rect x="7" y="12" width="6" height="1" fill="#00ff00" />
      {/* Power LED */}
      <rect x="25" y="17" width="2" height="2" fill="#00ff00" />
      {/* Monitor stand */}
      <rect x="12" y="20" width="8" height="2" fill="#808080" />
      <rect x="10" y="22" width="12" height="2" fill="#c0c0c0" />
      <rect x="10" y="22" width="12" height="1" fill="#fff" />
      {/* Keyboard */}
      <rect x="2" y="25" width="28" height="5" fill="#c0c0c0" />
      <rect x="2" y="25" width="28" height="1" fill="#fff" />
      <rect x="2" y="25" width="1" height="5" fill="#fff" />
      <rect x="29" y="25" width="1" height="5" fill="#808080" />
      <rect x="2" y="29" width="28" height="1" fill="#808080" />
      {/* Keyboard keys */}
      <rect x="4" y="26" width="2" height="1" fill="#808080" />
      <rect x="7" y="26" width="2" height="1" fill="#808080" />
      <rect x="10" y="26" width="2" height="1" fill="#808080" />
      <rect x="13" y="26" width="2" height="1" fill="#808080" />
      <rect x="16" y="26" width="2" height="1" fill="#808080" />
      <rect x="19" y="26" width="2" height="1" fill="#808080" />
      <rect x="22" y="26" width="2" height="1" fill="#808080" />
      <rect x="25" y="26" width="2" height="1" fill="#808080" />
      <rect x="6" y="28" width="18" height="1" fill="#808080" />
    </svg>
  );
}

export function FolderIcon({ size = 32, style }: IconProps = {}) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" style={{ imageRendering: 'pixelated', ...style }}>
      {/* Folder tab */}
      <rect x="2" y="6" width="12" height="4" fill="#ffff00" />
      <rect x="2" y="6" width="12" height="1" fill="#ffffaa" />
      <rect x="2" y="6" width="1" height="4" fill="#ffffaa" />
      {/* Folder body */}
      <rect x="2" y="10" width="28" height="18" fill="#ffff00" />
      {/* Highlights */}
      <rect x="2" y="10" width="28" height="1" fill="#ffffaa" />
      <rect x="2" y="10" width="1" height="18" fill="#ffffaa" />
      {/* Shadows */}
      <rect x="29" y="10" width="1" height="18" fill="#808000" />
      <rect x="2" y="27" width="28" height="1" fill="#808000" />
      {/* Inner shadow */}
      <rect x="28" y="11" width="1" height="16" fill="#cccc00" />
      <rect x="3" y="26" width="26" height="1" fill="#cccc00" />
      {/* Documents peeking out */}
      <rect x="6" y="12" width="16" height="1" fill="#fff" />
      <rect x="6" y="14" width="12" height="1" fill="#fff" />
    </svg>
  );
}

export function DocumentIcon({ size = 32, style }: IconProps = {}) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" style={{ imageRendering: 'pixelated', ...style }}>
      {/* Page */}
      <rect x="6" y="2" width="18" height="28" fill="#fff" />
      {/* Dog-ear fold */}
      <polygon points="18,2 24,8 18,8" fill="#c0c0c0" />
      <line x1="18" y1="2" x2="24" y2="8" stroke="#808080" strokeWidth="1" />
      {/* Border */}
      <rect x="6" y="2" width="18" height="1" fill="#808080" />
      <rect x="6" y="2" width="1" height="28" fill="#808080" />
      <rect x="6" y="29" width="18" height="1" fill="#808080" />
      <rect x="23" y="8" width="1" height="22" fill="#808080" />
      {/* Highlight */}
      <rect x="6" y="2" width="12" height="1" fill="#fff" />
      <rect x="6" y="2" width="1" height="28" fill="#fff" />
      {/* Text lines */}
      <rect x="9" y="11" width="12" height="1" fill="#000" />
      <rect x="9" y="14" width="10" height="1" fill="#000" />
      <rect x="9" y="17" width="12" height="1" fill="#000" />
      <rect x="9" y="20" width="8" height="1" fill="#000" />
      <rect x="9" y="23" width="11" height="1" fill="#000" />
      <rect x="9" y="26" width="6" height="1" fill="#808080" />
    </svg>
  );
}

export function TerminalIcon({ size = 32, style }: IconProps = {}) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" style={{ imageRendering: 'pixelated', ...style }}>
      {/* Window frame */}
      <rect x="2" y="2" width="28" height="28" fill="#000" />
      {/* Title bar */}
      <rect x="2" y="2" width="28" height="4" fill="#000080" />
      <rect x="2" y="2" width="28" height="1" fill="#0000cc" />
      {/* Title text */}
      <rect x="4" y="3" width="2" height="2" fill="#fff" />
      <rect x="7" y="3" width="2" height="2" fill="#fff" />
      <rect x="10" y="3" width="2" height="2" fill="#fff" />
      {/* Close button */}
      <rect x="26" y="3" width="3" height="2" fill="#c0c0c0" />
      {/* Screen content */}
      <rect x="4" y="8" width="8" height="1" fill="#c0c0c0" />
      {/* C:\> prompt */}
      <rect x="4" y="11" width="2" height="1" fill="#c0c0c0" />
      <rect x="7" y="11" width="1" height="1" fill="#c0c0c0" />
      <rect x="9" y="11" width="1" height="1" fill="#c0c0c0" />
      {/* Typed text */}
      <rect x="11" y="11" width="6" height="1" fill="#00ff00" />
      {/* Previous output */}
      <rect x="4" y="14" width="14" height="1" fill="#c0c0c0" />
      <rect x="4" y="17" width="10" height="1" fill="#c0c0c0" />
      {/* Cursor */}
      <rect x="4" y="20" width="2" height="1" fill="#c0c0c0" />
      <rect x="7" y="20" width="1" height="1" fill="#c0c0c0" />
      <rect x="9" y="20" width="1" height="1" fill="#c0c0c0" />
      <rect x="11" y="20" width="2" height="2" fill="#fff" />
      {/* Border highlights */}
      <rect x="2" y="2" width="1" height="28" fill="#404040" />
      <rect x="29" y="2" width="1" height="28" fill="#fff" />
      <rect x="2" y="29" width="28" height="1" fill="#fff" />
    </svg>
  );
}

export function TrashEmptyIcon({ size = 32, style }: IconProps = {}) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" style={{ imageRendering: 'pixelated', ...style }}>
      {/* Lid */}
      <rect x="6" y="4" width="20" height="3" fill="#c0c0c0" />
      <rect x="6" y="4" width="20" height="1" fill="#fff" />
      <rect x="6" y="4" width="1" height="3" fill="#fff" />
      <rect x="25" y="4" width="1" height="3" fill="#808080" />
      <rect x="6" y="6" width="20" height="1" fill="#808080" />
      {/* Lid handle */}
      <rect x="13" y="2" width="6" height="2" fill="#c0c0c0" />
      <rect x="13" y="2" width="6" height="1" fill="#fff" />
      <rect x="13" y="2" width="1" height="2" fill="#fff" />
      <rect x="18" y="2" width="1" height="2" fill="#808080" />
      {/* Bin body */}
      <rect x="7" y="7" width="18" height="21" fill="#c0c0c0" />
      {/* Body highlights & shadows */}
      <rect x="7" y="7" width="1" height="21" fill="#fff" />
      <rect x="24" y="7" width="1" height="21" fill="#808080" />
      <rect x="7" y="27" width="18" height="1" fill="#808080" />
      {/* Vertical ridges */}
      <rect x="11" y="9" width="1" height="17" fill="#808080" />
      <rect x="12" y="9" width="1" height="17" fill="#fff" />
      <rect x="16" y="9" width="1" height="17" fill="#808080" />
      <rect x="17" y="9" width="1" height="17" fill="#fff" />
      <rect x="21" y="9" width="1" height="17" fill="#808080" />
      <rect x="22" y="9" width="1" height="17" fill="#fff" />
    </svg>
  );
}

export function TrashFullIcon({ size = 32, style }: IconProps = {}) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" style={{ imageRendering: 'pixelated', ...style }}>
      {/* Papers sticking out */}
      <rect x="9" y="1" width="8" height="5" fill="#fff" stroke="#808080" strokeWidth="0.5" />
      <rect x="11" y="2" width="4" height="1" fill="#000" />
      <rect x="11" y="4" width="3" height="1" fill="#808080" />
      <rect x="17" y="2" width="6" height="4" fill="#ffffaa" stroke="#808080" strokeWidth="0.5" />
      {/* Lid — slightly askew */}
      <rect x="5" y="5" width="21" height="3" fill="#c0c0c0" transform="rotate(-3, 16, 6)" />
      <rect x="5" y="5" width="21" height="1" fill="#fff" transform="rotate(-3, 16, 6)" />
      <rect x="5" y="5" width="1" height="3" fill="#fff" transform="rotate(-3, 16, 6)" />
      <rect x="25" y="5" width="1" height="3" fill="#808080" transform="rotate(-3, 16, 6)" />
      {/* Lid handle */}
      <rect x="12" y="3" width="6" height="2" fill="#c0c0c0" transform="rotate(-3, 16, 6)" />
      {/* Bin body */}
      <rect x="7" y="8" width="18" height="20" fill="#c0c0c0" />
      {/* Body highlights & shadows */}
      <rect x="7" y="8" width="1" height="20" fill="#fff" />
      <rect x="24" y="8" width="1" height="20" fill="#808080" />
      <rect x="7" y="27" width="18" height="1" fill="#808080" />
      {/* Vertical ridges */}
      <rect x="11" y="10" width="1" height="16" fill="#808080" />
      <rect x="12" y="10" width="1" height="16" fill="#fff" />
      <rect x="16" y="10" width="1" height="16" fill="#808080" />
      <rect x="17" y="10" width="1" height="16" fill="#fff" />
      <rect x="21" y="10" width="1" height="16" fill="#808080" />
      <rect x="22" y="10" width="1" height="16" fill="#fff" />
    </svg>
  );
}

export function GameIcon({ size = 32, style }: IconProps = {}) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" style={{ imageRendering: 'pixelated', ...style }}>
      {/* Controller body */}
      <rect x="4" y="10" width="24" height="14" rx="3" fill="#404040" />
      <rect x="4" y="10" width="24" height="1" fill="#606060" />
      <rect x="4" y="10" width="1" height="14" fill="#606060" />
      {/* D-pad */}
      <rect x="8" y="14" width="3" height="7" fill="#222" />
      <rect x="7" y="16" width="5" height="3" fill="#222" />
      {/* D-pad highlight */}
      <rect x="9" y="15" width="1" height="5" fill="#333" />
      <rect x="8" y="17" width="3" height="1" fill="#333" />
      {/* Buttons */}
      <circle cx="22" cy="15" r="2" fill="#cc0000" />
      <circle cx="26" cy="15" r="2" fill="#0000cc" />
      <circle cx="22" cy="19" r="2" fill="#00cc00" />
      <circle cx="26" cy="19" r="2" fill="#cccc00" />
      {/* Button highlights */}
      <circle cx="21.5" cy="14.5" r="0.8" fill="#ff4444" />
      <circle cx="25.5" cy="14.5" r="0.8" fill="#4444ff" />
      {/* Start/Select */}
      <rect x="14" y="19" width="4" height="1.5" rx="0.5" fill="#606060" />
      {/* Wire */}
      <rect x="15" y="4" width="2" height="6" fill="#404040" />
      <rect x="15" y="4" width="2" height="1" fill="#606060" />
    </svg>
  );
}

export function PropertiesIcon({ size = 32, style }: IconProps = {}) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" style={{ imageRendering: 'pixelated', ...style }}>
      {/* Clipboard body */}
      <rect x="6" y="4" width="20" height="26" fill="#ffffcc" />
      <rect x="6" y="4" width="20" height="1" fill="#fff" />
      <rect x="6" y="4" width="1" height="26" fill="#fff" />
      <rect x="25" y="4" width="1" height="26" fill="#808080" />
      <rect x="6" y="29" width="20" height="1" fill="#808080" />
      {/* Clip at top */}
      <rect x="11" y="2" width="10" height="5" fill="#808080" />
      <rect x="11" y="2" width="10" height="1" fill="#c0c0c0" />
      <rect x="13" y="3" width="6" height="3" fill="#c0c0c0" />
      {/* Checkmark lines */}
      <rect x="9" y="10" width="2" height="2" fill="#808080" />
      <rect x="13" y="10" width="10" height="1" fill="#000" />
      <rect x="9" y="15" width="2" height="2" fill="#808080" />
      <rect x="13" y="15" width="8" height="1" fill="#000" />
      <rect x="9" y="20" width="2" height="2" fill="#808080" />
      <rect x="13" y="20" width="11" height="1" fill="#000" />
      <rect x="9" y="25" width="2" height="2" fill="#808080" />
      <rect x="13" y="25" width="6" height="1" fill="#000" />
    </svg>
  );
}
