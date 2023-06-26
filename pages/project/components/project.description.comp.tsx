// Essentials
import { FunctionComponent } from "react";

// Components
import { H1 } from "../../../components";

// GraphQL
import { AllProps } from "../../_app";

const Project_Description_Component: FunctionComponent<AllProps> = ({ project }) => {
  return (
      <div className="p-project__tab description">
        {
          project &&
          <>
            <H1>Description</H1>
            <p>{ project.description.text }</p>
            {
              project.description.webLink || project.description.repLink ?
              <div className="p-project__buttons">
                  {
                  project.description.webLink &&
                  <a className="priButton" target="_blank" href={project.description.webLink} rel="noreferrer">visit website <i className="fa-solid fa-earth-americas" /></a>
                  }
                  {
                  project.description.repLink &&
                  <a className="priButton inverted" target="_blank" href={project.description.repLink} rel="noreferrer">visit repository <i className="fa-brands fa-github" /></a>
                  }
              </div>
              :
              <></>
            }
          </>
        }
    </div>
  )
}

export default Project_Description_Component