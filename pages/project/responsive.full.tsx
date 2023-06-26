// Essentials
import { FunctionComponent } from "react";

// Components
import Project_Info_Component from "./components/project.info.comp";
import Project_Description_Component from "./components/project.description.comp";
import Project_Tab_Component from "./components/project.tab.comp";
import Project_Desktop_Images from "./components/project.desktop.images.comp";

// GraphQL
import { AllProps } from "../_app";

const Responsive_full: FunctionComponent<AllProps> = ({ project }) => {

  return (
    <>
    {
      project &&
      <div className="p-project--content">
        <div className="p-project__leftColumn">
          <Project_Info_Component project={project} />
          <div className="p-project__tabs">
            <Project_Description_Component project={project} />

            <Project_Tab_Component
              project_tab_title={project.tab1.title}
              project_tab_text={project.tab1.text}
            />
            
            <Project_Tab_Component
              project_tab_title={project.tab2.title}
              project_tab_text={project.tab2.text}
            />

            <Project_Tab_Component
              project_tab_title={project.tab3.title}
              project_tab_text={project.tab3.text}
            />
          </div>
        </div>
        <div className="p-project__rightColumn">
          <Project_Desktop_Images project={project} />
        </div>
      </div>
    }
    </>
  )
}

export default Responsive_full