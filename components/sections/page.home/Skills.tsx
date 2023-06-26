// Essentials
import React from "react";

// GraphQL
import { AllProps } from "../../../pages/_app";

// Components
import { DownloadResume, H1 } from "../../index"
import Marquee from "react-fast-marquee";

const Skills: React.FunctionComponent<AllProps> = ({ skills }) => {

  const skillSet = skills?.skillSet;
  
  return (
    <section id="skills" className="s-skills">
        <H1>skills</H1>
        <div className="s-skills--marquees">
          <Marquee className="s-skills__marquee" direction="left" gradient={false} speed={30}>
            {
              skillSet?.row1.map((skill, i) => (
                <React.Fragment key={i}>
                  {`${skill}. `}
                </React.Fragment>
              ))
            }
          </Marquee>
          <Marquee className="s-skills__marquee" direction="right" gradient={false} speed={30}>
            {
              skillSet?.row2.map((skill, i) => (
                <React.Fragment key={i}>
                  {`${skill}. `}
                </React.Fragment>
              ))
            }
          </Marquee>
          <Marquee className="s-skills__marquee" direction="left" gradient={false} speed={30}>
            {
              skillSet?.row3.map((skill, i) => (
                <React.Fragment key={i}>
                  {`${skill}. `}
                </React.Fragment>
              ))
            }
          </Marquee>
          <Marquee className="s-skills__marquee" direction="right" gradient={false} speed={30}>
            {
              skillSet?.row4.map((skill, i) => (
                <React.Fragment key={i}>
                  {`${skill}. `}
                </React.Fragment>
              ))
            }
          </Marquee>
        </div>

        <DownloadResume className="s-skills__resume priButton"/>
    </section>
  )
}

export default Skills