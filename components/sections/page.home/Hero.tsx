// Essentials
import React from "react";

// Contexts
import { useSettingsContext } from "../../../contexts/settingsContext";

// Components
import { DownloadResume } from "../..";
import jump from "jump.js";

// Svgs
import { Icon } from "../../../components/assets/exportSvgs";
import Link from "next/link";

const Hero: React.FunctionComponent = () => {

  const scrollTo = (to: string, duration: number = 300, offset: number = 0) => {
    jump(to, {duration, offset})
  }

  const settings = useSettingsContext();
  const socialMedia = settings?.socialMedia;
  const description = settings?.heroDescription;
  
  
  
  return (
    <section className="p-home--section s-hero" id="hero">
      <div className="s-hero--wrapper">
        <Icon className="s-hero__icon" />
        <div className="s-hero__rightSide">
          <span className="s-hero__logoText">ViserionWick</span>
          <div className="s-hero__info">
            <span className="s-hero__description">
            {
              description && description
            }
            </span>
            <div className="s-hero__links">
              <div className="s-hero__social">
                {
                  socialMedia?.map(link => (
                    <Link key={ link.name } href={ link.href } target={ link.name !== "email" ? "_blank" : "" } rel="noreferrer" className="s-hero__social--anchor">
                      <i className={ link.icon } />
                    </Link>
                  ))
                }
              </div>
              <DownloadResume className="s-hero__resume secButton"/>
            </div>
          </div>
          <div className="s-hero__menu">
            <Link onClick={() => scrollTo("#projects")} href="/#projects" className="s-hero__menu--anchor">projects.</Link>
            <Link onClick={() => scrollTo("#skills")} href="/#skills" className="s-hero__menu--anchor">skills.</Link>
            <Link onClick={() => scrollTo("#contact")} href="/#contact" className="s-hero__menu--anchor">contact.</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero