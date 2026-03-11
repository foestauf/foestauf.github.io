import { useState, useRef, useEffect, useCallback } from 'react';
import { useDesktopStore } from '@/state/useDesktopStore';
import { executeCommand } from './commands';

const WELCOME = [
  'FoestaufOS [Version 1.0]',
  '(C) Copyright Foestauf 1995-2026.',
  '',
  'Type "help" for available commands.',
  '',
];

const PROMPT = 'C:\\FOESTAUF>';

export default function TerminalApp({ windowId: _windowId }: { windowId: string }) {
  const openApp = useDesktopStore((s) => s.openApp);
  const [history, setHistory] = useState<string[]>(WELCOME);
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [busy, setBusy] = useState(false);

  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [history, scrollToBottom]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!busy) {
      inputRef.current?.focus();
    }
  }, [busy]);

  const handleSubmit = () => {
    const trimmed = input.trim();
    const newLines = [`${PROMPT} ${input}`];

    if (trimmed) {
      setCommandHistory((prev) => [...prev, trimmed]);

      // Handle github command with side effect
      if (trimmed.toLowerCase() === 'github') {
        window.open('https://github.com/foestauf', '_blank');
      }

      const result = executeCommand(trimmed);

      if (result.action === 'clear') {
        setHistory([]);
        setInput('');
        setHistoryIndex(-1);
        return;
      }

      if (result.action === 'open-app' && result.appId) {
        openApp(result.appId);
      }

      if (result.lineDelay && result.output.length > 0) {
        // Drip-feed lines with a delay
        setHistory((prev) => [...prev, ...newLines]);
        setInput('');
        setHistoryIndex(-1);
        setBusy(true);

        const lines = result.output;
        lines.forEach((line, i) => {
          setTimeout(() => {
            setHistory((prev) => [...prev, line]);
            if (i === lines.length - 1) setBusy(false);
          }, result.lineDelay! * (i + 1));
        });
        return;
      }

      newLines.push(...result.output);
    }

    setHistory((prev) => [...prev, ...newLines]);
    setInput('');
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (busy) return;
      handleSubmit();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const newIndex = historyIndex === -1
        ? commandHistory.length - 1
        : Math.max(0, historyIndex - 1);
      setHistoryIndex(newIndex);
      setInput(commandHistory[newIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const newIndex = historyIndex + 1;
      if (newIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setInput('');
      } else {
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        margin: -4,
        background: '#000',
        padding: 4,
        cursor: 'text',
      }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Output area */}
      <div
        ref={outputRef}
        className="font-mono-retro"
        style={{
          flex: 1,
          overflow: 'auto',
          color: '#c0c0c0',
          fontSize: 13,
          lineHeight: 1.3,
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-all',
        }}
      >
        {history.map((line, i) => (
          <div key={i}>{line || '\u00A0'}</div>
        ))}

        {/* Current input line */}
        <div style={{ display: busy ? 'none' : 'flex', whiteSpace: 'nowrap', wordBreak: 'normal' }}>
          <span style={{ flexShrink: 0 }}>{PROMPT} </span>
          <input
            ref={inputRef}
            className="terminal-input font-mono-retro"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  );
}
