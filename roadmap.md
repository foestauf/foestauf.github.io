# Portfolio Redesign Roadmap

Retro desktop OS portfolio site — migration from Gatsby to Vite + React + TypeScript.

---

## Phase 1: Foundation & Migration ✅

Rip out Gatsby, stand up Vite + React + TypeScript.

- [x] Initialise new Vite + React + TypeScript project in-place
- [x] Set up Tailwind CSS v4 (with `@tailwindcss/vite` plugin)
- [x] Install core dependencies: `zustand`, `react-rnd`
- [x] Set up folder structure per retro spec
- [x] Configure GitHub Pages deployment (updated GH Actions for Vite + pnpm + Node 24)
- [x] Preserve CNAME for `foestauf.me` (moved to `public/`)
- [x] Migrate existing assets (avatar, images) into new structure
- [x] Switch from npm to pnpm
- [x] Create placeholder components for all OS shell and app files
- [x] Define `WindowState` and `AppDefinition` interfaces in `types/os.ts`
- [x] Create empty Zustand store skeleton

## Phase 2: Core OS Shell ✅

The skeleton that everything hangs on.

- [x] Type definitions (`types/os.ts`) — `WindowState` (incl. `maximized`), `AppDefinition` interfaces
- [x] Zustand store (`state/useDesktopStore.ts`) — `openApp`, `closeWindow`, `focusWindow`, `minimizeWindow`, `restoreWindow`, `updateWindowPosition`, `updateWindowSize`, `toggleMaximize`, z-index counter, single-instance enforcement
- [x] App registry (`registry/appRegistry.ts`) — all 6 apps wired up with defaults + `getAppById` helper
- [x] App placeholders updated — all accept `{ windowId: string }` prop
- [x] Window component (`components/Window.tsx`) — draggable/resizable via `react-rnd`, title bar with minimize/maximize/close, focus-on-click, hidden when minimized, full viewport when maximized
- [x] WindowLayer (`os/WindowLayer.tsx`) — renders all open windows from the store
- [x] Test harness in `App.tsx` — temporary buttons to open each app for verification

## Phase 3: Desktop Chrome ✅

Taskbar, Start Menu, Desktop Icons — the proper retro OS look.

- [x] DesktopIcon (`components/DesktopIcon.tsx`) — double-click to open app, white text with dark shadow, 75px grid cells
- [x] StartMenu (`os/StartMenu.tsx`) — flyout menu listing all 6 apps, Win95 dark blue sidebar stripe with rotated "FoestaufOS" text, hover highlights
- [x] Taskbar (`os/Taskbar.tsx`) — Start button (pressed/outset states), window buttons with smart toggle (focus/minimize/restore), live clock, click-outside-to-close via `mousedown` listener
- [x] Desktop (`os/Desktop.tsx`) — full viewport with teal wallpaper, icon grid (5 apps, game hidden), WindowLayer + Taskbar layering
- [x] App.tsx — swapped test harness for `<Desktop />`

## Phase 4: Retro Styling

Make it look like a beige box from 1998.

- [ ] Retro CSS system — beveled buttons, inset panels, chunky borders, low-fi gradients
- [ ] System fonts (pixel/monospace where appropriate)
- [ ] Nostalgic wallpaper (tiled or classic gradient)
- [ ] Subtle CRT effects — faint scanlines overlay, slight glow (CSS only)
- [ ] Win95-style title bar buttons (close, minimize, maximize)

## Phase 5: Boot Sequence

First impressions matter.

- [ ] BootScreen (`os/BootScreen.tsx`) — fake POST/startup text sequence
- [ ] Timed transitions with staged loading messages
- [ ] Transition animation into the desktop

## Phase 6: Apps

The actual content.

### AboutApp
- [ ] "About This System" dialog with bio, current focus, personality

### ResumeApp
- [ ] Notepad-style text viewer with resume content

### ProjectsApp
- [ ] File explorer-style project browser
- [ ] Project detail sub-windows on selection
- [ ] Seed with project data (name, summary, stack, links, category)

### TerminalApp
- [ ] Retro CLI with command history and fake shell prompt
- [ ] Core commands: `help`, `about`, `projects`, `resume`, `github`, `contact`, `clear`
- [ ] Fun commands: `game`, `brew`, `sudo hire-me`
- [ ] Joke responses: `rm -rf /`, `coffee`, `exit`
- [ ] Commands that open windows via the window manager

### TrashApp
- [ ] Easter egg window with abandoned/half-baked project ideas

### MiniGameApp
- [ ] Placeholder game window
- [ ] Launchable via terminal `game` command or hidden desktop interaction
- [ ] Structured so a real game can be swapped in later

## Phase 7: Polish & Deploy

Ship it.

- [ ] Mobile strategy — simplified fallback or cheeky "requires a larger monitor" message
- [ ] Accessibility basics — keyboard nav, focus management
- [ ] Seed with real content (actual projects, bio, resume)
- [ ] Update GitHub Actions workflow for Vite build
- [ ] Test deployment to GitHub Pages
- [ ] Clean up old Gatsby files and configs
