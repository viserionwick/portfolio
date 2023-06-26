// Essentials
import { FunctionComponent } from "react";

// Components
import { LaptopVector, PhoneVector } from "../../../components";
import Project_Description_Component from "./project.description.comp";
import Project_Tab_Component from "./project.tab.comp";

// GraphQL
import { AllProps } from "../../_app";

const Project_Mobile_Images_With_Tabs: FunctionComponent<AllProps> = ({ project }) => {
  return (
    <>
      {
        project &&
        <>
          <LaptopVector
            image={project.desktopImages[0]}
            direction="right"
            id="_1"
          />

          <Project_Description_Component project={project} />

          <LaptopVector
            image={project.desktopImages[1]}
            direction="left"
            id="_2"
          />

          <Project_Tab_Component
            project_tab_title={project.tab1.title}
            project_tab_text={project.tab1.text}
          />

          <PhoneVector
            image={project.mobileImages[0]}
            direction="left"
            id="_1"
          />

          <Project_Tab_Component
            project_tab_title={project.tab2.title}
            project_tab_text={project.tab2.text}
          />

          <PhoneVector
            image={project.mobileImages[1]}
            direction="right"
            id="_2"
          />

          <Project_Tab_Component
            project_tab_title={project.tab3.title}
            project_tab_text={project.tab3.text}
          />
        </>
      }
    </>
  );
};

export default Project_Mobile_Images_With_Tabs;
