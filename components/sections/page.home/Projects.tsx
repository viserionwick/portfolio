// Essentials
import { useEffect, useState } from "react";

// Components
import { H1, SpotlightProjectCard, ProjectCard } from "../../index";

// GraphQL
import { AllProps } from "../../../pages/_app";
import { IProject } from "../../../utils/models/project";
import { getProjects } from "../../../utils/services/projects";


const Projects: React.FunctionComponent<AllProps> = ({ spotlightProject, projects: initialProjects }) => {

  const fetchLimit: number = 6;

  const [projects, setProjects] = useState<IProject[]>([]);
  const [offset, setOffset] = useState<number>(fetchLimit);
  const [hasMore, setHasMore] = useState<boolean>(false);

  const [initFetch, setInitFetch] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  

  const handleProjects = (newProjects: IProject[]) => {
    if (newProjects) {
      if (newProjects.length > fetchLimit) {
        setHasMore(true);
        
        const clearProjects = newProjects.slice(0, fetchLimit);

        if(initFetch) {
          setProjects(clearProjects);
        } else {
          setProjects((prevProjects) => [...prevProjects, ...clearProjects]);
          setOffset((prevOffset) => prevOffset + fetchLimit);
        }
        
        setInitFetch(false);
        
      } else {
        setHasMore(false);
        if(initFetch) {
          setProjects(newProjects);
        } else {
          setProjects((prevProjects) => [...prevProjects, ...newProjects]);
        }
      }
    }
  }

  useEffect(() => {
    setLoading(true);
    initialProjects && handleProjects(initialProjects);
    setLoading(false);
  }, [initialProjects]);

  const handleSeeMore = async () => {
    setLoading(true);
    const addProjects = await getProjects(fetchLimit + 1, undefined, undefined, offset);
    handleProjects(addProjects);
    setLoading(false);
  };

  return (
    <section id="projects" className="p-home--section s-projects">
      <H1>projects</H1>
      {
        spotlightProject &&
        <SpotlightProjectCard
          name={ spotlightProject.title }
          description={ spotlightProject.description.text }

          stack={ spotlightProject.stack }

          banner={ spotlightProject.banner }

          slug={ spotlightProject.slug }
          website={ spotlightProject.description.webLink }
          repository={ spotlightProject.description.repLink }
        />
      }
      

      <div className="s-projects__other">
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

      {
        hasMore &&
        <button
          onClick={ handleSeeMore }
          className={
                      loading 
                      ? "s-projects__moreButton priButton loading"
                      : "s-projects__moreButton priButton"
                    }
          disabled={ loading }>
          see more
        </button>
      }
        
    </section>
  )
}

export default Projects