export interface CommandResult {
  output: string[];
  action?: 'clear' | 'open-app';
  appId?: string;
  lineDelay?: number;
}

export type CommandHandler = (args: string[]) => CommandResult;

const commands: Record<string, CommandHandler> = {
  help: () => ({
    output: [
      'Available commands:',
      '',
      '  help       - Show this help message',
      '  about      - Open About window',
      '  projects   - Open Projects explorer',
      '  resume     - Open Resume',
      '  game       - Launch Mystery Game',
      '  github     - Open GitHub profile',
      '  contact    - Show contact info',
      '  clear      - Clear terminal',
      '  brew       - Brew a cuppa',
      '  coffee     - Attempt caffeine intake',
      '  exit       - Try to leave',
      '',
      '  sudo hire-me  - ???',
      '  rm -rf /      - Don\'t do it',
    ],
  }),

  about: () => ({
    output: ['Opening About...'],
    action: 'open-app',
    appId: 'about',
  }),

  projects: () => ({
    output: ['Opening Projects...'],
    action: 'open-app',
    appId: 'projects',
  }),

  resume: () => ({
    output: ['Opening Resume.txt...'],
    action: 'open-app',
    appId: 'resume',
  }),

  game: () => ({
    output: ['Launching Mystery Game...'],
    action: 'open-app',
    appId: 'game',
  }),

  github: () => ({
    output: ['Opening GitHub profile...'],
  }),

  contact: () => ({
    output: [
      '+--------------------------------+',
      '|         CONTACT INFO           |',
      '+--------------------------------+',
      '|  GitHub:  github.com/foestauf  |',
      '|  Web:     foestauf.github.io   |',
      '+--------------------------------+',
    ],
  }),

  clear: () => ({
    output: [],
    action: 'clear',
  }),

  brew: () => ({
    output: [
      '',
      '        ( ( (',
      '         ) ) )',
      '      .........',
      '      |       |]',
      '      \\       /',
      '       `-----\'',
      '',
      '  Brewing a proper cuppa...',
      '  ☕ Done. Bloody lovely.',
      '',
    ],
  }),

  coffee: () => ({
    output: [
      'ERROR: coffee.exe has encountered a problem.',
      'Reason: This is a British machine. Try "brew" instead.',
    ],
  }),

  exit: () => ({
    output: [
      'Nice try. You\'re trapped here now.',
      'Might as well look at my projects while you\'re stuck.',
    ],
  }),
};

// Special compound commands
const specialCommands: Record<string, CommandHandler> = {
  'sudo hire-me': () => ({
    output: [
      '',
      '+-------------------------------------------+',
      '|  ACCESS GRANTED                           |',
      '+-------------------------------------------+',
      '|                                           |',
      '|  You\'ve found the secret command!         |',
      '|                                           |',
      '|  I\'m a full-stack developer who:          |',
      '|  - Builds scalable web applications       |',
      '|  - Runs Kubernetes like it owes me money  |',
      '|  - Over-engineers things with great flair |',
      '|                                           |',
      '|  Let\'s chat: github.com/foestauf          |',
      '|                                           |',
      '+-------------------------------------------+',
      '',
    ],
  }),
  'rm -rf /': () => ({
    output: [
      'Deleting system32...',
      'Deleting node_modules... (this may take 3-5 business days)',
      'Deleting your browser history... 👀',
      '',
      'Just kidding. I\'m not that daft.',
    ],
    lineDelay: 800,
  }),
};

export function executeCommand(rawInput: string): CommandResult {
  const trimmed = rawInput.trim().toLowerCase();

  if (!trimmed) {
    return { output: [] };
  }

  // Check special (compound) commands first
  for (const [key, handler] of Object.entries(specialCommands)) {
    if (trimmed === key) {
      return handler([]);
    }
  }

  const parts = trimmed.split(/\s+/);
  const cmd = parts[0];
  const args = parts.slice(1);

  const handler = commands[cmd];
  if (handler) {
    return handler(args);
  }

  return {
    output: [
      `'${rawInput.trim()}' is not recognized as an internal or external command,`,
      'operable program or batch file.',
      '',
      'Type "help" for available commands.',
    ],
  };
}
