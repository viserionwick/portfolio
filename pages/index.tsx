// Essentials
import { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { atom } from 'jotai'
import { useAtom } from 'jotai/react'

// Components
import Hero from '../components/sections/page.home/Hero'
import Projects from '../components/sections/page.home/Projects'
import Skills from '../components/sections/page.home/Skills'
import Contact from '../components/sections/page.home/Contact'

// GraphQL
import { AllProps } from './_app'
import { getProjects, getSpotlightProject } from '../utils/services/projects'
import { getSkills } from '../utils/services/skills'


// GLOBAL STATES
export const sectionInView_atom = atom("");

const Home: NextPage<AllProps> = ({ spotlightProject, projects, skills }) => {

  const [sectionInView, setSectionInView] = useAtom(sectionInView_atom);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          setSectionInView(entry.target.id);
        } else {
          entry.target.classList.remove("show");
        }
      })
    })

    const hiddenElements = document.querySelectorAll(".p-home--section");
    hiddenElements.forEach((el) => observer.observe(el))

    return () => {
      // Cleanup function to disconnect the observer
      setSectionInView("");
      hiddenElements.forEach((el) => observer.unobserve(el));
    };
    
  }, []);

  

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