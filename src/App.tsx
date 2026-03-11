import { useState, useCallback } from 'react';
import Desktop from '@/os/Desktop';
import BootScreen from '@/os/BootScreen';
import MobileGate from '@/components/MobileGate';

export default function App() {
  const [booted, setBooted] = useState(() => !!sessionStorage.getItem('booted'));

  const handleBootComplete = useCallback(() => {
    sessionStorage.setItem('booted', '1');
    setBooted(true);
  }, []);

  return (
    <MobileGate>
      {booted ? <Desktop /> : <BootScreen onBootComplete={handleBootComplete} />}
      {/* CRT scanline overlay — covers both boot and desktop */}
      <div className="crt-overlay" />
    </MobileGate>
  );
}
