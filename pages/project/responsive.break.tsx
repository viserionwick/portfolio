// Essentials
import { FunctionComponent } from "react";

// Components
import Project_Info_Component from "./components/project.info.comp";
import Project_Mobile_Images_With_Tabs from "./components/project.mobile.images.tabs.comp";

// GraphQL
import { AllProps } from "../_app";

const Responsive_break: FunctionComponent<AllProps> = ({ project }) => {

  return (
    <>
    {
      project &&
      <div className="p-project--content">
        <Project_Info_Component project={project} />
        <div className="p-project__tabs">
          <Project_Mobile_Images_With_Tabs project={project} />
        </div>
    </div>
    }
    </>
  )
}

export default Responsive_break