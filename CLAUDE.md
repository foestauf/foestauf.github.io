# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio site for Rob McKee (foestauf.me), built as a **Windows 95 desktop simulator**. The entire UI mimics Win95 — draggable/resizable windows, a taskbar with a Start menu, desktop icons, right-click context menus, a CRT scanline overlay, and a boot sequence.

Deployed to GitHub Pages from the `gh-pages` branch.

## Commands

- **Dev server:** `pnpm dev`
- **Build:** `pnpm build` (runs `tsc && vite build`)
- **Preview production build:** `pnpm preview`
- **Format:** `pnpm format` (Prettier)

No test framework is configured.

## Tech Stack

- React 19, TypeScript, Vite 6, Tailwind CSS v4 (via `@tailwindcss/vite`)
- **State:** Zustand (single store in `src/state/useDesktopStore.ts`)
- **Window drag/resize:** `react-rnd`
- **Package manager:** pnpm
- **Path alias:** `@/` → `src/` (configured in both `vite.config.ts` and `tsconfig.json`)

## Architecture

### OS layer (`src/os/`)
- `Desktop.tsx` — root desktop surface; renders icons, selection marquee, context menu, WindowLayer, and Taskbar
- `Taskbar.tsx` — bottom taskbar with Start button, window buttons, and clock
- `StartMenu.tsx` — Start menu popup listing available apps
- `WindowLayer.tsx` — renders all open windows from the store
- `BootScreen.tsx` — BIOS-style boot animation shown on first load (skipped via sessionStorage)

### App system
- **Types:** `src/types/os.ts` defines `WindowState` and `AppDefinition`
- **Registry:** `src/registry/appRegistry.ts` — array of `AppDefinition` entries. Each app declares its id, title, icon, default size/position, single-instance flag, and component. To add a new app: create its component in `src/apps/<name>/`, add an entry here, and optionally add its id to `DESKTOP_APP_IDS` in `Desktop.tsx` to show it on the desktop
- **Apps live in** `src/apps/<appId>/` — About, Projects, Resume, Terminal, Trash, MiniGame, Properties

### State (`src/state/useDesktopStore.ts`)
Single Zustand store managing: open windows (position, size, z-index, minimized/maximized state), desktop icon positions, icon selection, and trashed icons. Pre-maximize geometry is tracked outside the store in a module-level Map.

### Styling
All Win95 chrome is implemented via CSS utility classes in `src/index.css` (`.win95-outset`, `.win95-inset`, `.win95-window-frame`, `.win95-well`, `.win95-title-bar`, etc.) plus CSS custom properties for the Win95 colour palette. Tailwind is available for layout but the retro border/panel system uses these custom classes.

### Icons (`src/components/icons/Win95Icons.tsx`)
SVG-based Win95-style icons rendered as React elements. Used in the registry, desktop, and taskbar.
