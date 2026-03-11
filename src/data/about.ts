export interface AboutInfo {
  name: string;
  tagline: string;
  bio: string[];
  currentFocus: string[];
  system: { label: string; value: string }[];
}

export const aboutInfo: AboutInfo = {
  name: 'Rob McKee',
  tagline: 'Senior Software Engineer & Army Veteran',
  bio: [
    'I\'m a Senior Software Engineer and Army veteran who enjoys solving complex problems, improving systems, and helping teams build software that lasts. My primary focus is backend architecture, distributed systems, and designing services that remain reliable as they scale.',
    'My background in the U.S. Army, where I later served as an instructor, strongly shaped how I approach engineering. I value ownership, clear communication, and mentorship, and I naturally gravitate toward roles where I can help raise engineering standards, guide technical decisions, and support the growth of other engineers.',
    'Over time I\'ve found myself operating at the intersection of hands-on development and technical leadership — contributing to architecture decisions, improving development practices, and helping teams balance speed with long-term maintainability. I enjoy thinking in systems: how services interact, how teams collaborate, and how good technical decisions compound over time.',
    'Outside of my professional work, I\'m a builder at heart. I spend time developing simulation games, exploring SaaS ideas, and experimenting with new technologies. I\'m particularly interested in projects that combine engineering, product thinking, and business strategy.',
    'Long term, I\'m interested in continuing to grow into roles with greater technical ownership and organizational impact, whether that\'s as a staff engineer or in engineering leadership. I enjoy helping shape not just the software, but the direction behind it.',
  ],
  currentFocus: [
    'Backend architecture & distributed systems',
    'Kubernetes & GitOps homelab infrastructure',
    'Simulation games & SaaS experiments',
    'Technical leadership & mentorship',
  ],
  system: [
    { label: 'OS', value: 'FoestaufOS 95 (Build 2026)' },
    { label: 'Processor', value: 'Caffeine-Powered Neuron v3.2' },
    { label: 'RAM', value: '640K ought to be enough' },
    { label: 'Uptime', value: 'Since mass !== energy (debatable)' },
    { label: 'Disk Space', value: '∞ node_modules' },
  ],
};
