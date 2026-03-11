export interface Project {
  name: string;
  summary: string;
  stack: string[];
  links: { label: string; url: string }[];
  category: string;
}

export const projects: Project[] = [
  {
    name: 'Retro Portfolio',
    summary: 'A Windows 95-themed portfolio site built with React and TypeScript. You\'re looking at it right now, you absolute legend.',
    stack: ['React', 'TypeScript', 'Zustand', 'Vite'],
    links: [{ label: 'GitHub', url: 'https://github.com/foestauf/foestauf.github.io' }],
    category: 'Web',
  },
  {
    name: 'Homelab Infrastructure',
    summary: 'GitOps-managed Kubernetes homelab running on bare metal. ArgoCD, Flux, and far too many YAML files.',
    stack: ['Kubernetes', 'ArgoCD', 'Terraform', 'Helm'],
    links: [],
    category: 'DevOps',
  },
  {
    name: 'Whale Street',
    summary: 'Full-stack application with a proper deployment pipeline. The crown jewel of over-engineering.',
    stack: ['TypeScript', 'React', 'Node.js', 'PostgreSQL'],
    links: [{ label: 'Website', url: 'https://whale-street.com' }],
    category: 'Web',
  },
  {
    name: 'Test Lens CLI',
    summary: 'The CLI companion for Test Lens — uploads coverage reports and integrates with CI pipelines. Written in Go because speed matters when your build is already taking the piss.',
    stack: ['Go', 'Cobra', 'Docker'],
    links: [],
    category: 'Tools',
  },
  {
    name: 'Test Lens',
    summary: 'A code coverage reporting tool in the vein of Codecov and Coveralls. Still a work in progress, but getting there.',
    stack: ['TypeScript', 'Node.js'],
    links: [],
    category: 'Tools',
  },
  {
    name: 'React Native',
    summary: 'Contributed a refactor to extract float prop emission into a dedicated helper function in the React Native renderer.',
    stack: ['Flow', 'TypeScript', 'React Native'],
    links: [{ label: 'Commit', url: 'https://github.com/facebook/react-native/commit/1a1e3994666e1f8b2abf2c5040ac3a44149ddca0' }],
    category: 'Open Source',
  },
  {
    name: 'Authorizer',
    summary: 'Added Discord as an OAuth identity provider to this open-source auth solution.',
    stack: ['Go', 'OAuth', 'Discord'],
    links: [{ label: 'Commit', url: 'https://github.com/authorizerdev/authorizer/commit/751933d40e4791e9d1df617a6bb1951e46fa9f3b' }],
    category: 'Open Source',
  },
];

export function getCategories(): string[] {
  const cats = new Set(projects.map((p) => p.category));
  return ['All', ...Array.from(cats).sort()];
}
