// Essentials
import { NextPage } from 'next';
import Link from 'next/link';

// Components
import { ProjectCard } from "../../../../components/index";

// GraphQL
import { AllProps } from '../../../_app';
import { getProjects, getSpotlightProject } from '../../../../utils/services/projects';

import { useEffect, useState } from 'react';
/* import { checkUserPermissions } from '../../../../utils/helpers/checkUser'; */

const Admin_Projects: NextPage<AllProps> = ({ projects, spotlightProject }) => {
  const [isProjects, setIsProjects] = useState<boolean>(false);

  useEffect(() => {
    if(projects || spotlightProject) {
      setIsProjects(true)
    } else setIsProjects(false)
    
  }, [projects, spotlightProject]);
  

  return (
    <div className="p-admin-projects">
      <Link href="/admin/dashboard/projects/new" className='priButton p-admin-projects__newButton'>create new</Link>
      <br/>
      {
        isProjects ?
        <p>choose a project to edit</p>
        :
        <p>there are no projects.</p>
      }

      <div className="p-admin-projects__list">
        {
          spotlightProject &&
          <ProjectCard
            className="p-admin-projects__list--spotlightProject"

            name={ spotlightProject.title }

            stack={ spotlightProject.stack }

            banner={ spotlightProject.banner }

            href={ `/admin/dashboard/projects/new?project=${spotlightProject.slug}` }
          />
        }

        {
          projects && projects.map((project, index) => (
            <ProjectCard
              key={ index }

              className="p-admin-projects__list--project"

              name={ project.title }

              stack={ project.stack }

              banner={ project.banner }

              href={ `/admin/dashboard/projects/new?project=${project.slug}` }
            />
          ))
        }
      </div>
    </div>
  )
}

export default Admin_Projects


export const getServerSideProps = async () => {

  const spotlightProject = await getSpotlightProject();
  const projects = await getProjects(10 + 1);  

  return {
    props: {
      spotlightProject,
      projects,
    },
  };
};