// Components
import { H1, ProjectCard } from '../../../components'
import { FunctionComponent } from 'react'
import Link from 'next/link'

// GraphQL
import { AllProps } from "../../_app";

const Project_OtherProjects: FunctionComponent<AllProps> = ({ projects }) => {
  return (
    <div className="p-project__otherProjects">
        <H1>other projects</H1>
        <div className="p-project--otherProjectsContent">
          {
            projects && projects.map((project, index) => (
              <ProjectCard
                key={ index }
                name={ project.title }
                stack={ project.stack }
                banner={ project.banner }
                slug={ project.slug }
              />
            ))
          }
        </div>
        <Link href="/#projects" className="p-project__moreButton priButton">
            see projects
        </Link>
    </div>
  )
}

export default Project_OtherProjects