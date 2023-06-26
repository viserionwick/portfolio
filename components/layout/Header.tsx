// Essentials
import { useState } from "react";
import Link from "next/link";

// Svgs
import { Logo } from "../assets/exportSvgs";
import { useSettingsContext } from "../../contexts/settingsContext";

const Header: React.FC = () => {

  const settings = useSettingsContext();
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
    <div className="l-header">
      <div className="l-header__menu">
        <div className="l-header__menu--burger terButton" onClick={() => toggleMenu()}>
          <i className={`fa-solid ${isMenu ? "fa-angle-left" : "fa-ellipsis"}`}></i>
        </div>
        <div className={`l-header__menu--wrapper ${isMenu ? "on" : "off"}`}>
          <Link onClick={() => toggleMenu(false)} href="/#projects" className="l-header__menu--anchor active terButton" >projects.</Link>
          <Link onClick={() => toggleMenu(false)} href="/#skills" className="l-header__menu--anchor terButton" >skills.</Link>
          <Link onClick={() => toggleMenu(false)} href="/#contact" className="l-header__menu--anchor terButton" >contact.</Link>
          {
            !workStatus &&
            <span className="l-header__menu--afwBlob" />
          }
        </div>
        {
          !workStatus &&
          <span className={`l-header__menu--afw ${isMenu ? "on" : "off"}`}>(available for work)</span>
        }
      </div>
      <div className={`l-header__logo ${isMenu ? "off" : "on"}`}>
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