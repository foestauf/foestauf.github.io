export interface Project {
  name: string;
  summary: string;
  stack: string[];
  links: { label: string; url: string }[];
  category: string;
}

export const projects: Project[] = [];
