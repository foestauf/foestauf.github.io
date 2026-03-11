import { useDesktopStore } from '@/state/useDesktopStore';
import Window from '@/components/Window';

export default function WindowLayer() {
  const windows = useDesktopStore((s) => s.windows);
  return (
    <>
      {windows.map((w) => (
        <Window key={w.id} windowId={w.id} />
      ))}
    </>
  );
}
