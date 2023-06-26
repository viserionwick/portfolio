// Essentials
import { NextPage } from 'next'
import Head from 'next/head'

// Components
import Hero from '../components/sections/page.home/Hero'
import Projects from '../components/sections/page.home/Projects'
import Skills from '../components/sections/page.home/Skills'
import Contact from '../components/sections/page.home/Contact'

// GraphQL
import { AllProps } from './_app'
import { getProjects, getSpotlightProject } from '../utils/services/projects'
import { getSkills } from '../utils/services/skills'

const Home: NextPage<AllProps> = ({ spotlightProject, projects, skills }) => {  

  return (
    <div className="p-home">
      <Head>
        <title>Viserion Wick</title>
        <meta name="description" content="Official Viserion Wick Portfolio." />
      </Head>
      <Hero />
      <Projects spotlightProject={spotlightProject} projects={projects} />
      <Skills skills={skills} />
      <Contact />
    </div>
  )
}

export const getServerSideProps = async () => {

  const spotlightProject = await getSpotlightProject();
  const projects = await getProjects(6 + 1);
  const skills = await getSkills();
  
  return {
    props: {
      spotlightProject,
      projects,
      skills,
    },
  };
};

export default Home