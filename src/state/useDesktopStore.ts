import { create } from 'zustand';
import type { WindowState } from '@/types/os';
import { getAppById } from '@/registry/appRegistry';

interface DesktopStore {
  windows: WindowState[];
  nextZIndex: number;

  openApp: (appId: string, payload?: unknown) => void;
  closeWindow: (windowId: string) => void;
  focusWindow: (windowId: string) => void;
  minimizeWindow: (windowId: string) => void;
  restoreWindow: (windowId: string) => void;
  updateWindowPosition: (windowId: string, position: { x: number; y: number }) => void;
  updateWindowSize: (windowId: string, size: { width: number; height: number }) => void;
  toggleMaximize: (windowId: string) => void;
}

// Store pre-maximize geometry outside of Zustand to avoid polluting WindowState
const preMaximizeGeometry = new Map<
  string,
  { position: { x: number; y: number }; size: { width: number; height: number } }
>();

export const useDesktopStore = create<DesktopStore>()((set, get) => ({
  windows: [],
  nextZIndex: 1,

  openApp: (appId, payload) => {
    const app = getAppById(appId);
    if (!app) return;

    const { windows, nextZIndex } = get();

    // Single-instance: focus existing window instead of opening a new one
    if (app.singleInstance) {
      const existing = windows.find((w) => w.appId === appId);
      if (existing) {
        get().focusWindow(existing.id);
        return;
      }
    }

    const newWindow: WindowState = {
      id: crypto.randomUUID(),
      appId,
      title: app.title,
      position: { ...app.defaultPosition },
      size: { ...app.defaultSize },
      zIndex: nextZIndex,
      minimized: false,
      maximized: false,
      payload,
    };

    set({
      windows: [...windows, newWindow],
      nextZIndex: nextZIndex + 1,
    });
  },

  closeWindow: (windowId) => {
    preMaximizeGeometry.delete(windowId);
    set((state) => ({
      windows: state.windows.filter((w) => w.id !== windowId),
    }));
  },

  focusWindow: (windowId) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === windowId
          ? { ...w, zIndex: state.nextZIndex, minimized: false }
          : w,
      ),
      nextZIndex: state.nextZIndex + 1,
    }));
  },

  minimizeWindow: (windowId) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === windowId ? { ...w, minimized: true } : w,
      ),
    }));
  },

  restoreWindow: (windowId) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === windowId
          ? { ...w, minimized: false, zIndex: state.nextZIndex }
          : w,
      ),
      nextZIndex: state.nextZIndex + 1,
    }));
  },

  updateWindowPosition: (windowId, position) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === windowId ? { ...w, position } : w,
      ),
    }));
  },

  updateWindowSize: (windowId, size) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === windowId ? { ...w, size } : w,
      ),
    }));
  },

  toggleMaximize: (windowId) => {
    set((state) => ({
      windows: state.windows.map((w) => {
        if (w.id !== windowId) return w;

        if (w.maximized) {
          // Restore pre-maximize geometry
          const saved = preMaximizeGeometry.get(windowId);
          preMaximizeGeometry.delete(windowId);
          return {
            ...w,
            maximized: false,
            position: saved?.position ?? w.position,
            size: saved?.size ?? w.size,
          };
        }

        // Save current geometry and maximize
        preMaximizeGeometry.set(windowId, {
          position: { ...w.position },
          size: { ...w.size },
        });
        return {
          ...w,
          maximized: true,
          position: { x: 0, y: 0 },
          size: { width: window.innerWidth, height: window.innerHeight - 48 },
        };
      }),
    }));
  },
}));
