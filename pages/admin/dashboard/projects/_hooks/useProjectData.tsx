// Essentials
import { useEffect, useState } from "react";

// Types
import { defaultTech } from "../addTech.comp";

// Models
import { IProject } from "../../../../../utils/models/project";
import { TechType } from "../../../../../utils/models/settings";

const useProjectData = () => {
  const [autoSlug, setAutoSlug] = useState<boolean>(true);
  const [currentStack, setCurrentStack] = useState<TechType[]>([
    {
      title: "",
      logo: "",
    },
  ]);
  const [currentTags, setCurrentTags] = useState<string>("");
  const [currentBanner, setCurrentBanner] = useState<File[]>([]);
  const [currentMobileImages, setCurrentMobileImages] = useState<File[]>([]);
  const [currentDesktopImages, setCurrentDesktopImages] = useState<File[]>([]);
  

  const [project, setProject] = useState<IProject>({
    slug: "",
    dates: {
      start: "",
      end: "",
    },
    title:  "",
    stack: [""],
    description: {
      text: "",
      webLink: "",
      repLink: "",
    },
    tab1: {
      title: "",
      text: "",
    },
    tab2: {
      title: "",
      text: "",
    },
    tab3: {
      title: "",
      text: "",
    },
    banner: "",
    desktopImages: [],
    mobileImages: [],
    author: {
      authorID: "",
      authorName: "",
      authorUsername: "",
    },
    createdAt: new Date().toISOString(),
    updatedTimes: [],
    tags: [],
    spotlight: false,
  });


  
  const removeTech = (tech: TechType) => {
    const newStack = currentStack.filter((item: any) => item !== tech);    

    newStack.length === 0
      ? setCurrentStack( [defaultTech] )
      : setCurrentStack( newStack );
  };

  const handleChange = (e: any, from?: string) => {
    const [name, value] = e && e.target ? [e.target.name, e.target.value] : [from, e];

    switch (name) {
      case "title":
        setProject({
          ...project,
          title: value.replace(/\s+/g, " ").replace(/[^a-zA-Z0-9 -]/g, ''),
          slug: autoSlug
            ? value.toLowerCase().replace(/\s+/g, " ").replace(/[^a-zA-Z0-9 -]/g, '').replace(/ /g, "-")
            : project.slug,
        });
        break;

      case "slug":
        setAutoSlug(false);
        setProject({
          ...project,
          slug: value.replace(" ", "-"),
        });
        break;

      case "startDate":
        console.log(value);
        
        setProject({
          ...project,
          dates: {
            start: value || "",
            end: value ? project.dates.end : "",
          },
        });
        break;

      case "endDate":
        setProject({
          ...project,
          dates: {
            start: project.dates.start,
            end: project.dates.start ? value || "" : "",
          },
        });
        break;

      case "stack":
        setCurrentStack(value);
        break;

      case "description":
        setProject({
          ...project,
          description: {
            ...project.description,
            text: value,
          },
        });
        break;

      case "webLink":
        setProject({
          ...project,
          description: {
            ...project.description,
            webLink: value,
          },
        });
        break;

      case "repLink":
        setProject({
          ...project,
          description: {
            ...project.description,
            repLink: value,
          },
        });
        break;


      // Tabs
      case "tab1Title":
        setProject({
          ...project,
          tab1: {
            title: value,
            text: project.tab1.text,
          },
        });
        break;

      case "tab1Text":
        setProject({
          ...project,
          tab1: {
            title: project.tab1.title,
            text: value,
          },
        });
        break;

      case "tab2Title":
        setProject({
          ...project,
          tab2: {
            title: value,
            text: project.tab2.text,
          },
        });
        break;

      case "tab2Text":
        setProject({
          ...project,
          tab2: {
            title: project.tab2.title,
            text: value,
          },
        });
        break;

      case "tab3Title":
        setProject({
          ...project,
          tab3: {
            title: value,
            text: project.tab3.text,
          },
        });
        break;

      case "tab3Text":
        setProject({
          ...project,
          tab3: {
            title: project.tab3.title,
            text: value,
          },
        });
        break;


      case "banner":
        setProject({
          ...project,
          banner: value,
        });
        break;

      case "desktopImages":
        setProject({
          ...project,
          desktopImages: [...value],
        });
        break;

      case "mobileImages":
        setProject({
          ...project,
          mobileImages: [...value],
        });
        break;


      case "spotlight":
        setProject({
          ...project,
          spotlight: value,
        });
        break;


      case "tags":
        setCurrentTags(value);
        break;

      default:
        break;        
    }
  };

  return {
    // Funcs
    handleChange,
    removeTech,

    // States
    project, setProject,
    autoSlug, setAutoSlug,
    currentStack, setCurrentStack,
    currentTags, setCurrentTags,
    currentBanner, setCurrentBanner,
    currentMobileImages, setCurrentMobileImages,
    currentDesktopImages, setCurrentDesktopImages
  }
}

export default useProjectData