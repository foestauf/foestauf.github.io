Create a React + TypeScript portfolio site that feels like a retro desktop operating system with a strong late-90s / early-2000s vibe. The site should be visually memorable, playful, and interactive, but still usable as a real personal portfolio.

Tech stack:

- React
- TypeScript
- Vite
- Zustand for state management
- react-rnd for draggable/resizable windows
- Tailwind CSS is allowed, but the UI should feel handcrafted and retro rather than like a generic modern SaaS app

Goal:
Build a personal site that looks like a fake desktop OS. It should include a boot sequence, desktop icons, draggable app windows, a taskbar, a start menu, a retro terminal, and a hidden mini game. The architecture should be clean and extensible so more apps can be added later.

Visual direction:

- Inspired by Windows 95 / Windows XP / old beige PCs / CRT monitors
- Use pixel-friendly or system-like fonts where appropriate
- Include subtle retro styling such as:
  - beveled buttons
  - inset panels
  - old-school title bars
  - chunky borders
  - low-fi gradients
  - nostalgic wallpaper
- Optional subtle CRT-inspired effects:
  - faint scanlines
  - slight screen glow
  - subtle flicker on boot screen only
- Do not overdo visual effects to the point that readability suffers
- Keep the site functional and pleasant to use

Core experience:

1. Boot screen

- Show a brief fake startup sequence on first load
- Example boot text:
  - Initializing system...
  - Mounting portfolio...
  - Loading terminal...
  - Launching desktop shell...
- After a short delay, transition into the desktop

2. Desktop

- Full-screen desktop layout with wallpaper
- Desktop icons arranged on the screen
- Double-clicking an icon opens an app window
- Include a taskbar at the bottom with:
  - Start button
  - open window buttons
  - system clock

3. Window manager

- Windows must be draggable and resizable
- Support:
  - open
  - close
  - focus
  - minimize
  - restore
  - z-index ordering
- Clicking a window brings it to front
- Minimized windows appear in taskbar
- Use Zustand for window state

4. Start menu

- Clicking Start opens a retro menu
- Menu should include shortcuts to the main apps

Architecture requirements:
Implement a clean app registry pattern.

Each app definition should include:

- id
- title
- icon
- defaultSize
- defaultPosition
- singleInstance flag
- component

Implement a Zustand desktop/window store.

Window model should include:

- id
- appId
- title
- position
- size
- zIndex
- minimized
- payload

Store actions should include:

- openApp
- closeWindow
- focusWindow
- minimizeWindow
- restoreWindow
- updateWindowPosition
- updateWindowSize

Initial apps to implement:

1. AboutApp

- Simple retro window introducing the developer
- Include short bio, current focus, and a little personality
- Make it feel like an “About this system” window

2. ProjectsApp

- Display projects in a file explorer style interface
- Projects should appear more like files/folders than modern cards
- Selecting a project should open a ProjectDetails window
- Include sample project data with:
  - name
  - summary
  - stack
  - links
  - category

3. ResumeApp

- Show resume content in a text-viewer / notepad style window
- Make it look like an old document viewer or text editor

4. TerminalApp

- Retro command-line interface with command history
- Allow typed commands with a fake shell prompt
- Implement commands:
  - help
  - about
  - projects
  - resume
  - github
  - contact
  - clear
  - game
  - brew
  - sudo hire-me
- Some commands should open windows via the window manager
- Add a few playful responses for joke commands like:
  - rm -rf /
  - coffee
  - exit

5. TrashApp

- Trash window containing a funny list of abandoned or half-baked project ideas
- This should feel like an easter egg but still fit the desktop theme

6. MiniGameApp

- Create a hidden mini game window
- It can be a placeholder for now, but it should exist and be launchable
- Trigger it via:
  - terminal command `game`
  - or a hidden desktop interaction
- Make it easy to swap in a real mini game later

Desktop icons:

- About
- Projects
- Terminal
- Resume.txt
- Trash

Implementation notes:

- Prioritize architecture and component structure first
- Keep styling cohesive and retro
- Avoid overengineering
- Make the codebase easy to extend with more desktop apps later
- Use reusable components for:
  - Window
  - DesktopIcon
  - Taskbar
  - StartMenu
  - BootScreen

Suggested folder structure:

src/
os/
Desktop.tsx
Taskbar.tsx
StartMenu.tsx
BootScreen.tsx
WindowLayer.tsx
apps/
about/
projects/
resume/
terminal/
trash/
game/
components/
Window.tsx
DesktopIcon.tsx
state/
useDesktopStore.ts
registry/
appRegistry.ts
data/
projects.ts
types/
os.ts

Deliverables:

- Working starter project
- Clean architecture
- Basic retro styling
- Functional desktop shell
- Functional window manager
- Terminal with command handling
- Placeholder hidden mini game
- Enough seeded content to make the portfolio feel alive immediately

Important:
Do not generate a giant monolithic file. Split the project into sensible files and components. Favor maintainability and extensibility. The end result should feel like a real retro desktop portfolio shell, not a generic dashboard.
