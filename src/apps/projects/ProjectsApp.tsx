import { useState } from 'react';
import { projects, getCategories } from '@/data/projects';
import type { Project } from '@/data/projects';

export default function ProjectsApp({ windowId: _windowId }: { windowId: string }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const categories = getCategories();

  const filtered = selectedCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  if (selectedProject) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', margin: -4, background: '#c0c0c0' }}>
        {/* Address bar */}
        <div className="win95-inset" style={{ margin: '2px 2px 0', padding: '2px 4px', fontSize: 12 }}>
          C:\Projects\{selectedProject.category}\{selectedProject.name}
        </div>

        {/* Detail view */}
        <div style={{ flex: 1, overflow: 'auto', margin: 2, background: '#ffffff', padding: 12 }}>
          <div style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 8 }}>
            📁 {selectedProject.name}
          </div>
          <p style={{ fontSize: 12, lineHeight: 1.5, margin: '0 0 12px' }}>
            {selectedProject.summary}
          </p>
          <div style={{ fontSize: 12, marginBottom: 8 }}>
            <strong>Stack:</strong>{' '}
            {selectedProject.stack.map((tech, i) => (
              <span
                key={i}
                className="win95-outset"
                style={{ display: 'inline-block', padding: '1px 6px', margin: '2px 2px', fontSize: 11 }}
              >
                {tech}
              </span>
            ))}
          </div>
          {selectedProject.links.length > 0 && (
            <div style={{ fontSize: 12 }}>
              <strong>Links:</strong>{' '}
              {selectedProject.links.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#000080', marginRight: 8 }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Bottom bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '2px 4px', flexShrink: 0 }}>
          <button
            className="win95-outset"
            style={{ padding: '2px 12px', fontSize: 12, cursor: 'pointer' }}
            onClick={() => setSelectedProject(null)}
          >
            ← Back
          </button>
          <div className="win95-inset" style={{ flex: 1, padding: '2px 6px', fontSize: 11 }}>
            {selectedProject.category} / {selectedProject.name}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', margin: -4, background: '#c0c0c0' }}>
      {/* Address bar */}
      <div className="win95-inset" style={{ margin: '2px 2px 0', padding: '2px 4px', fontSize: 12 }}>
        C:\Projects\{selectedCategory === 'All' ? '' : selectedCategory}
      </div>

      {/* Main area: sidebar + list */}
      <div style={{ flex: 1, display: 'flex', margin: 2, overflow: 'hidden' }}>
        {/* Sidebar */}
        <div className="win95-well" style={{ width: 120, flexShrink: 0, overflow: 'auto', padding: 2 }}>
          {categories.map((cat) => (
            <div
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '3px 4px',
                fontSize: 12,
                cursor: 'pointer',
                background: cat === selectedCategory ? '#000080' : 'transparent',
                color: cat === selectedCategory ? '#fff' : '#000',
                whiteSpace: 'nowrap',
              }}
            >
              📁 {cat}
            </div>
          ))}
        </div>

        {/* Project list */}
        <div style={{ flex: 1, overflow: 'auto', background: '#ffffff', borderLeft: '1px solid #808080' }}>
          {filtered.map((project, i) => (
            <div
              key={i}
              onClick={() => setSelectedProject(project)}
              style={{
                padding: '4px 8px',
                fontSize: 12,
                cursor: 'pointer',
                borderBottom: '1px solid #e0e0e0',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#000080'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#000'; }}
            >
              <span>📁</span>
              <span style={{ flex: 1 }}>{project.name}</span>
              <span style={{ fontSize: 10, color: 'inherit', opacity: 0.7 }}>
                {project.stack.slice(0, 3).join(', ')}
              </span>
            </div>
          ))}
          {filtered.length === 0 && (
            <div style={{ padding: 16, fontSize: 12, color: '#808080', textAlign: 'center' }}>
              No projects in this category. Bugger.
            </div>
          )}
        </div>
      </div>

      {/* Status bar */}
      <div className="win95-inset" style={{ padding: '2px 6px', fontSize: 11, flexShrink: 0 }}>
        {filtered.length} object(s)
      </div>
    </div>
  );
}
