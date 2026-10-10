import { CSSProperties } from 'react'

import { useAppSelector } from '../../hooks'
import { SplitHeading } from './SplitHeading'
import { formatYearLabel } from './format'
import { PROJECTS_SECTION_EYEBROW, PROJECTS_SECTION_INTRO } from './constants'

// The project catalogue rendered as the reference's "writing" rows: project
// name on the left, its date span on the right, each row linking out to the
// repository. It keeps the `#writing` anchor so navigation is unchanged.
export function ProjectsSection() {
  const projects = useAppSelector((state) => state.information.projects) ?? []

  return (
    <section id="writing" style={{ background: 'var(--surface-muted)' }}>
      <div className="container">
        <div className="eyebrow reveal">{PROJECTS_SECTION_EYEBROW}</div>

        <SplitHeading
          as="h2"
          segments={[{ text: "What I've" }, { text: 'crafted.', em: true }]}
        />

        <p
          className="section-intro reveal"
          style={{ '--delay': '100ms' } as CSSProperties}
        >
          {PROJECTS_SECTION_INTRO}
        </p>

        <div>
          {projects.map((project) => (
            <a
              key={project.projectName}
              className="project-row reveal"
              href={project.projectRepositoryUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3>{project.projectName}</h3>
              <div className="project-meta">
                <span className="project-period">
                  {formatYearLabel(project.startDate, project.endDate)}
                </span>
              </div>
              {project.summaries?.[0] && (
                <p className="project-summary">{project.summaries[0]}</p>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
