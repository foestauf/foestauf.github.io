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

## Phase 4: Retro Styling ✅

Make it look like a beige box from 1998.

- [x] Retro CSS system — CSS custom properties for Win95 palette, `.win95-outset`/`.win95-inset`/`.win95-window-frame`/`.win95-well` utility classes, inline styles migrated to classes
- [x] System fonts — MS Sans Serif-approximating font stack (`Segoe UI`, Tahoma, Geneva), `.font-mono-retro` for terminal contexts, anti-aliasing disabled for pixel crispness
- [x] Nostalgic wallpaper — classic teal `#008080` with subtle crosshatch dot pattern via CSS radial gradients
- [x] Subtle CRT effects — faint scanline overlay (repeating-linear-gradient), soft teal screen glow (inset box-shadow), pointer-events-none at z-index 99999
- [x] Win95-style title bar buttons — proper 16×14px buttons with pixel-art minimize line, maximize box, restore overlapping boxes, and ✕ close; `:active` press state; active/inactive title bar gradient (`#000080` → `#1084d0`)
- [x] Retro scrollbars — Win95 chunky scrollbar track, thumb, and buttons via `::-webkit-scrollbar`
- [x] Window chrome — outer frame with darkest edge, inner content well with white background, icon in title bar
- [x] Start menu — gradient sidebar stripe, separator line before game entry
- [x] Taskbar — tighter proportions (40px), bevelled separators, bold label for focused window

## Phase 5: Boot Sequence

First impressions matter.

- [x] BootScreen (`os/BootScreen.tsx`) — fake POST/startup text sequence
- [x] Timed transitions with staged loading messages
- [x] Transition animation into the desktop

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
