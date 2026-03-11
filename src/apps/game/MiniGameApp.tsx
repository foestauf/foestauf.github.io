import { useState } from 'react';

interface GameState {
  status: 'idle' | 'playing' | 'won' | 'lost';
  score: number;
}

export default function MiniGameApp({ windowId: _windowId }: { windowId: string }) {
  const [_gameState] = useState<GameState>({ status: 'idle', score: 0 });

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      gap: 12,
      background: '#c0c0c0',
      margin: -4,
      padding: 16,
    }}>
      <div style={{ fontSize: 48 }}>🎮</div>
      <div style={{ fontSize: 18, fontWeight: 'bold' }}>Coming Soon!</div>
      <p style={{ fontSize: 12, textAlign: 'center', color: '#404040', maxWidth: 280, lineHeight: 1.4 }}>
        A mystery game is being developed in a secret underground lab.
        Check back later — or don't, I'm not your mum.
      </p>
      <button
        className="win95-outset win95-btn-disabled"
        style={{ padding: '4px 16px', fontSize: 12 }}
        disabled
      >
        New Game
      </button>
      <div style={{ fontSize: 11, color: '#808080' }}>
        Score: 0 | Status: Waiting for developer motivation
      </div>
    </div>
  );
}
