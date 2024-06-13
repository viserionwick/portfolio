// Essentials
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAtom } from 'jotai/react'

// Components
import jump from "jump.js";

// Hooks
import useWindowSize from "../../hooks/useWindowSize";
import useHash from "../../hooks/useHash";

// States
import { sectionInView_atom } from "../../pages";

// Svgs
import { Logo } from "../assets/exportSvgs";
import { useSettingsContext } from "../../contexts/settingsContext";
import { useRouter } from "next/router";


const Header: React.FC = () => {

  const settings = useSettingsContext();
  const { isMobile } = useWindowSize();
  const router = useRouter();
  /* const { hash } = useHash();
  const { push: goTo } = useRouter(); */

  const [sectionInView] = useAtom(sectionInView_atom);
  
  

  const scrollTo = (to: string, duration: number = 300, offset: number = 0) => {
    if (!isMobile && router.pathname === "/") {
      /* jump(to, {duration, offset}) */
      /* goTo(`/${to}`); */
    }
  }
  const workStatus: boolean | undefined = settings?.work?.status;


  // Toggle Menu
  const [isMenu, setIsMenu] = useState<boolean>(false);

  const toggleMenu = (state?: boolean) => {
    if (state === true) {
      setIsMenu(true);
    } else if (state === false) {
      setIsMenu(false);
    } else {
      setIsMenu(isMenu ? false : true);
    }
  }
  
  

  return (
    <>
    <div className={`
      l-header
      ${sectionInView === "hero" ?
        "hide"
        :
        ""
      }
    `}>
      <div className={`l-header__menu ${isMenu ? "on" : "off"}`}>
        <div className="l-header__menu--burger terButton" onClick={() => toggleMenu()}>
          <i className={`fa-solid ${isMenu ? "fa-angle-left" : "fa-ellipsis"}`}></i>
        </div>
        <div className={`l-header__menu--wrapper ${isMenu ? "on" : "off"}`}>
          <Link
            onClick={() => {toggleMenu(false); scrollTo("#projects")}}
            href="/#projects"
            className={`
              l-header__menu--anchor
              ${
                 sectionInView === "projects" ?
                "active"
                :
                ""
              }
              ${!isMobile ? "terButton":""}`
            }
          >
            projects.
          </Link>
          <Link
            onClick={() => {toggleMenu(false); scrollTo("#skills")}}
            href="/#skills"
            className={`
              l-header__menu--anchor
              ${
                sectionInView === "skills" ?
                "active"
                :
                ""
              }
              ${!isMobile ? "terButton":""}`
            }
          >
            skills.
          </Link>
          <Link
            onClick={() => {toggleMenu(false); scrollTo("#contact")}}
            href="/#contact"
            className={`
              l-header__menu--anchor
              ${
                 sectionInView === "contact" ?
                "active"
                :
                ""
              }
              ${!isMobile ? "terButton":""}`
            }
          >
            contact.
          </Link>
          {
            !workStatus &&
            <span className="l-header__menu--afwBlob" />
          }
          {
            isMobile &&
            <div className="l-header__otherMenu">
              <Link
                href="/admin"
                className="l-header__dashboard"
                onClick={() => toggleMenu(false)}
              >
                dashboard
              </Link>
            </div>
          }
        </div>
        {
          !workStatus &&
          <span className={`l-header__menu--afw ${isMenu ? "on" : "off"}`}>(available for work)</span>
        }
      </div>
      <div className={`l-header__logo ${isMenu ? "off" : "on"}`}>
        {
          !isMobile &&
          <Link
            href="/admin"
            className="l-header__dashboard terButton"
            onClick={() => toggleMenu(false)}
          >
            dashboard
          </Link>
        }
        <Link href="/" className="l-header__logo--anchor terButton">
          <Logo className="l-header__logo--svg"/>
        </Link>
      </div>
    </div>
    <span className={`l-header--background ${isMenu ? "on" : "off"}`} onClick={() => toggleMenu(false)}/>
    </>
  )
}

export default Header