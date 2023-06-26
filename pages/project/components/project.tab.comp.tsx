// Essentials
import { H1 } from "../../../components";

const Project_Tab_Component = ({ project_tab_title, project_tab_text } : { project_tab_title: string, project_tab_text: string }) => {
  return (
    <div className="p-project__tab">
        <H1>{ project_tab_title }</H1>
        <p>{ project_tab_text }</p>
    </div>
  )
}

export default Project_Tab_Component