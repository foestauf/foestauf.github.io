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
    links: [{ label: 'GitHub', url: 'https://github.com/foestauf/homelab-infra' }],
    category: 'DevOps',
  },
  {
    name: 'Whale Street',
    summary: 'Full-stack application with a proper deployment pipeline. The crown jewel of over-engineering.',
    stack: ['TypeScript', 'React', 'Node.js', 'PostgreSQL'],
    links: [{ label: 'GitHub', url: 'https://github.com/foestauf/whale-street' }],
    category: 'Web',
  },
  {
    name: 'CLI Tool',
    summary: 'A command-line utility that does useful things. Or at least it did before I refactored it into oblivion.',
    stack: ['Go', 'Cobra', 'Docker'],
    links: [],
    category: 'Tools',
  },
  {
    name: 'K8s Monitoring Stack',
    summary: 'Prometheus, Grafana, and Loki deployed via Helm. Because what\'s a homelab without dashboards nobody checks?',
    stack: ['Prometheus', 'Grafana', 'Loki', 'Helm'],
    links: [],
    category: 'DevOps',
  },
  {
    name: 'Bot Framework',
    summary: 'A framework for building chat bots. Mostly used to annoy friends in Discord.',
    stack: ['TypeScript', 'Discord.js', 'Node.js'],
    links: [],
    category: 'Tools',
  },
];

export function getCategories(): string[] {
  const cats = new Set(projects.map((p) => p.category));
  return ['All', ...Array.from(cats).sort()];
}
