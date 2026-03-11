export interface AboutInfo {
  name: string;
  tagline: string;
  bio: string[];
  currentFocus: string[];
  system: { label: string; value: string }[];
}

export const aboutInfo: AboutInfo = {
  name: 'Foestauf',
  tagline: 'Full-Stack Developer & Homelab Enthusiast',
  bio: [
    'Software engineer with a passion for building things that work — and occasionally things that don\'t, but look impressive while failing.',
    'I spend my days writing TypeScript, wrangling Kubernetes clusters, and pretending my homelab is "production-grade infrastructure" rather than a stack of mini PCs held together by hope and YAML.',
    'When I\'m not coding, you can find me over-engineering solutions to problems that could be solved with a spreadsheet, or convincing myself that this time the side project will actually get finished.',
  ],
  currentFocus: [
    'Building cool stuff with React & TypeScript',
    'Kubernetes & GitOps homelab infrastructure',
    'Pretending this portfolio site counts as productivity',
  ],
  system: [
    { label: 'OS', value: 'FoestaufOS 95 (Build 2026)' },
    { label: 'Processor', value: 'Caffeine-Powered Neuron v3.2' },
    { label: 'RAM', value: '640K ought to be enough' },
    { label: 'Uptime', value: 'Since mass !== energy (debatable)' },
    { label: 'Disk Space', value: '∞ node_modules' },
  ],
};
