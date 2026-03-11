import type { ComponentType } from 'react';

export interface WindowState {
  id: string;
  appId: string;
  title: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  minimized: boolean;
  maximized: boolean;
  payload?: unknown;
}

export interface AppDefinition {
  id: string;
  title: string;
  icon: string;
  defaultSize: { width: number; height: number };
  defaultPosition: { x: number; y: number };
  singleInstance: boolean;
  component: ComponentType<{ windowId: string }>;
}
