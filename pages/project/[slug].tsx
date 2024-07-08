// Essentials
import { NextPage } from "next";
import { NextSeo } from "next-seo";

// Hooks
import useWindowSize from "../../hooks/useWindowSize";

// Components
import Responsive_full from "./responsive.full";
import Responsive_break from "./responsive.break";
import Project_OtherProjects from "./components/project.otherProjects.comp";

// GraphQL
import { AllProps } from "../_app";
import { getProject, getProjects } from "../../utils/services/projects";

// Svgs
import { Logo } from "../../components/assets/exportSvgs";

const Project: NextPage<AllProps> = ({ project, projects }) => {
  const { windowSize } = useWindowSize();

  return (
    <>{
      project &&
      <div className="p-project">
        <NextSeo
          title={`${ project.title } | Viserion Wick`}
          description={ project.description.text }
          openGraph={{
            type: 'article',
            url: `${process.env.WEBSITE_URL}/project/${project.slug}`,
            title: `${ project.title } | Viserion Wick`,
            description: project.description.text,
            article: {
              publishedTime: project.createdAt,
              tags: project.tags.length >= 1 ? project.tags : undefined, 
            },
          }}
        />

        { windowSize.width >= 1234 ?
          <Responsive_full project={project} />
          :
          <Responsive_break project={project}/>
        }

        <div className="p-project--outro">
          <div className="p-project__logo">
            <Logo />
          </div>
          <Project_OtherProjects projects={ projects } />
        </div>
      </div>
    }</>
  );
};

export const getServerSideProps = async (context: any) => {
  const { slug } = context.query;

  const project = await getProject(slug);
  const projects = await getProjects(3, false, slug);
  
  if (!project) {
    return {
      notFound: true,
    };
  } else {
    return {
      props: {
        project,
        projects,
      },
    };
  }
};

export default Project;
