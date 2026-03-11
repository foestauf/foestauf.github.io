import type { AppDefinition } from '@/types/os';
import AboutApp from '@/apps/about/AboutApp';
import ProjectsApp from '@/apps/projects/ProjectsApp';
import ResumeApp from '@/apps/resume/ResumeApp';
import TerminalApp from '@/apps/terminal/TerminalApp';
import TrashApp from '@/apps/trash/TrashApp';
import MiniGameApp from '@/apps/game/MiniGameApp';

export const appRegistry: AppDefinition[] = [
  { id: 'about',    title: 'About',         icon: '💻', defaultSize: { width: 500, height: 400 }, defaultPosition: { x: 100, y: 80 },  singleInstance: true,  component: AboutApp },
  { id: 'projects', title: 'Projects',      icon: '📁', defaultSize: { width: 600, height: 450 }, defaultPosition: { x: 150, y: 100 }, singleInstance: true,  component: ProjectsApp },
  { id: 'resume',   title: 'Resume.txt',    icon: '📄', defaultSize: { width: 550, height: 500 }, defaultPosition: { x: 200, y: 60 },  singleInstance: true,  component: ResumeApp },
  { id: 'terminal', title: 'Terminal',       icon: '🖥️', defaultSize: { width: 600, height: 400 }, defaultPosition: { x: 120, y: 120 }, singleInstance: false, component: TerminalApp },
  { id: 'trash',    title: 'Trash',          icon: '🗑️', defaultSize: { width: 400, height: 350 }, defaultPosition: { x: 250, y: 130 }, singleInstance: true,  component: TrashApp },
  { id: 'game',     title: 'Mystery Game',   icon: '🎮', defaultSize: { width: 480, height: 400 }, defaultPosition: { x: 180, y: 90 },  singleInstance: true,  component: MiniGameApp },
];

export function getAppById(id: string): AppDefinition | undefined {
  return appRegistry.find((app) => app.id === id);
}
