import { useState, useEffect, useRef, useCallback } from 'react';

interface BootScreenProps {
  onBootComplete: () => void;
}

// BIOS POST line definitions with delays
const BIOS_HEADER = [
  { text: 'Award Modular BIOS v4.51PG, An Energy Star Ally', color: '#ffffff' },
  { text: 'Copyright (C) 1984-98, Award Software, Inc.', color: '#aaaaaa' },
  { text: '' },
  { text: 'ASUS P2B-F ACPI BIOS Revision 1013', color: '#ffffff' },
  { text: 'Intel 440BX/ZX AGPset', color: '#ffff00' },
  { text: '' },
  { text: 'Intel Pentium II 233MHz Processor', color: '#ffffff' },
];

const PNP_LINES = [
  { text: '' },
  { text: 'Award Plug and Play BIOS Extension v1.0A', color: '#ffffff' },
  { text: 'Initializing Plug and Play Cards...', color: '#aaaaaa' },
  { text: 'PnP Init Completed', color: '#aaaaaa' },
];

const IDE_LINES = [
  { text: '' },
  { text: 'Detecting IDE Primary Master   ... QUANTUM FIREBALL SE4.3A', color: '#aaaaaa' },
  { text: 'Detecting IDE Primary Slave    ... None', color: '#aaaaaa' },
  { text: 'Detecting IDE Secondary Master ... CREATIVE CD5233E 40X', color: '#aaaaaa' },
  { text: 'Detecting IDE Secondary Slave  ... None', color: '#aaaaaa' },
];

const PCI_HEADER = [
  { text: '' },
  { text: 'PCI device listing...', color: '#ffffff' },
  { text: 'Bus No.  Device No.  Func No.  Vendor ID  Device ID  Device Class    IRQ', color: '#ffffff' },
];

const PCI_ROWS = [
  '  0         0          0         8086       7190      Host Bridge       -',
  '  0         1          0         8086       7191      PCI-to-PCI Bridge -',
  '  0         4          0         8086       7110      ISA Bridge        -',
  '  0         4          1         8086       7111      IDE Controller   14',
  '  0         4          2         8086       7112      USB Controller   11',
  '  0         4          3         8086       7113      Bridge Device     9',
  '  0        13          0         10EC       8139      Ethernet Ctrl     5',
  '  1         0          0         10DE       0028      VGA Controller   11',
];

const FOOTER_LINE = '03/10/1998-i440BX-W977-2A69KA1CC-00';

export default function BootScreen({ onBootComplete }: BootScreenProps) {
  const [phase, setPhase] = useState<'bios' | 'splash'>('bios');
  const [biosLines, setBiosLines] = useState<Array<{ text: string; color?: string }>>([]);
  const [memoryCount, setMemoryCount] = useState<number | null>(null);
  const [showSkipHint, setShowSkipHint] = useState(false);
  const [dmiDots, setDmiDots] = useState('');
  const [showBootLine, setShowBootLine] = useState(false);
  const [showFooter, setShowFooter] = useState(false);
  const [splashProgress, setSplashProgress] = useState(0);

  const completedRef = useRef(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const intervalsRef = useRef<ReturnType<typeof setInterval>[]>([]);

  const addTimer = useCallback((fn: () => void, delay: number) => {
    const id = setTimeout(fn, delay);
    timersRef.current.push(id);
    return id;
  }, []);

  const addInterval = useCallback((fn: () => void, delay: number) => {
    const id = setInterval(fn, delay);
    intervalsRef.current.push(id);
    return id;
  }, []);

  const complete = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    // Clean up all timers
    timersRef.current.forEach(clearTimeout);
    intervalsRef.current.forEach(clearInterval);
    onBootComplete();
  }, [onBootComplete]);

  // Skip hint after 1.5s
  useEffect(() => {
    const id = setTimeout(() => setShowSkipHint(true), 1500);
    return () => clearTimeout(id);
  }, []);

  // Skip handlers
  useEffect(() => {
    const handleKey = () => complete();
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [complete]);

  // BIOS POST sequence
  useEffect(() => {
    let elapsed = 0;

    // Phase 1: Header lines (instant)
    setBiosLines([...BIOS_HEADER]);
    elapsed += 50;

    // Memory counter starts
    addTimer(() => {
      setMemoryCount(0);
      let count = 0;
      const memInterval = addInterval(() => {
        count += 4096;
        if (count >= 65536) {
          count = 65536;
          setMemoryCount(65536);
          clearInterval(memInterval);
        } else {
          setMemoryCount(count);
        }
      }, 50);
    }, elapsed);

    elapsed += 850; // memory test duration

    // PnP lines
    PNP_LINES.forEach((line, i) => {
      addTimer(() => {
        setBiosLines((prev) => [...prev, line]);
      }, elapsed + i * 300);
    });
    elapsed += PNP_LINES.length * 300;

    // IDE lines with probe delays
    IDE_LINES.forEach((line, i) => {
      addTimer(() => {
        setBiosLines((prev) => [...prev, line]);
      }, elapsed + i * 400);
    });
    elapsed += IDE_LINES.length * 400;

    // PCI header
    addTimer(() => {
      setBiosLines((prev) => [...prev, ...PCI_HEADER]);
    }, elapsed);
    elapsed += 200;

    // PCI rows (rapid fire — the satisfying bit)
    PCI_ROWS.forEach((row, i) => {
      addTimer(() => {
        setBiosLines((prev) => [...prev, { text: row, color: '#bbbbbb' }]);
      }, elapsed + i * 80);
    });
    elapsed += PCI_ROWS.length * 80;
    elapsed += 200;

    // DMI Pool verification with dots
    addTimer(() => {
      setBiosLines((prev) => [...prev, { text: '' }]);
    }, elapsed);
    elapsed += 100;

    const dmiDotCount = 10;
    for (let i = 1; i <= dmiDotCount; i++) {
      addTimer(() => {
        setDmiDots('.'.repeat(i));
      }, elapsed + i * 150);
    }
    elapsed += dmiDotCount * 150 + 300;

    // Boot from Hard Disk
    addTimer(() => {
      setShowBootLine(true);
    }, elapsed);
    elapsed += 300;

    // Footer
    addTimer(() => {
      setShowFooter(true);
    }, elapsed);
    elapsed += 400;

    // Transition to splash
    addTimer(() => {
      setPhase('splash');
    }, elapsed);
    elapsed += 100;

    // Splash progress animation (~3.5s)
    const splashStart = elapsed;
    const splashSteps = 20;
    for (let i = 1; i <= splashSteps; i++) {
      addTimer(() => {
        setSplashProgress(i / splashSteps * 100);
      }, splashStart + i * 150);
    }
    elapsed = splashStart + splashSteps * 150 + 200;

    // Boot complete — hard cut
    addTimer(() => {
      complete();
    }, elapsed);

    return () => {
      timersRef.current.forEach(clearTimeout);
      intervalsRef.current.forEach(clearInterval);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (phase === 'splash') {
    return (
      <div
        className="fixed inset-0 bg-black z-[9999] cursor-pointer select-none flex flex-col items-center justify-center"
        onClick={complete}
      >
        <div className="text-center">
          <div
            className="font-mono-retro text-white text-4xl font-bold mb-2"
            style={{ letterSpacing: '0.15em' }}
          >
            foestauf OS
          </div>
          <div className="font-mono-retro text-gray-400 text-sm mb-8">
            Starting foestauf OS...
          </div>
          {/* Progress bar */}
          <div
            className="win95-inset mx-auto"
            style={{ width: 220, height: 20, padding: 2, background: '#c0c0c0' }}
          >
            <div
              className="boot-progress-fill"
              style={{ width: `${splashProgress}%`, height: '100%' }}
            />
          </div>
        </div>

        {showSkipHint && (
          <div className="fixed bottom-4 right-4 font-mono-retro text-xs text-white opacity-50">
            Press any key to skip
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 bg-black text-white font-mono-retro z-[9999] cursor-pointer select-none overflow-hidden"
      onClick={complete}
      style={{ fontSize: 13, lineHeight: '18px', padding: '8px 12px' }}
    >
      {biosLines.map((line, i) => (
        <div key={i} style={{ color: line.color || '#aaaaaa', minHeight: 18 }}>
          {line.text}
        </div>
      ))}

      {/* Memory test line — rendered separately so it updates in place */}
      {memoryCount !== null && (
        <div style={{ color: '#ffffff' }}>
          Memory Test : {String(memoryCount).padStart(7, ' ')}K OK
        </div>
      )}

      {/* DMI verification */}
      {dmiDots && (
        <div style={{ color: '#ffffff' }}>
          Verifying DMI Pool Data {dmiDots}
        </div>
      )}

      {showBootLine && (
        <div style={{ color: '#ffffff' }}>Boot from Hard Disk...</div>
      )}

      {showFooter && (
        <>
          <div style={{ minHeight: 18 }} />
          <div style={{ color: '#aaaaaa' }}>{FOOTER_LINE}</div>
        </>
      )}

      {/* Blinking cursor */}
      <span className="bios-cursor">&#9608;</span>

      {showSkipHint && (
        <div className="fixed bottom-4 right-4 text-xs text-white opacity-50">
          Press any key to skip
        </div>
      )}
    </div>
  );
}
