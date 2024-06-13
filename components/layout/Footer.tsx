// Contexts
import Link from "next/link";
import { useSettingsContext } from "../../contexts/settingsContext";

const Footer: React.FC = () => {
  const settings = useSettingsContext();
  
  const socialMedia = settings?.socialMedia;

    return (
      <div className="l-footer">
        <div className="l-footer--wrapper">
          <div className="l-footer__links">
            {
              socialMedia?.map(link => (
                <a key={ link.name } href={ link.href } target={ link.name !== "email" ? "_blank" : "" } rel="noreferrer" className="l-footer__links--anchor">
                  { link.name }.
                </a>
              ))
            }
          </div>
          <div className="l-footer__copyright">
            <Link href="/legal/terms" className="l-footer__copyright--anchor">Terms.</Link>
            <Link href="/legal/privacy" className="l-footer__copyright--anchor">Privacy.</Link>
            © {new Date().getFullYear()}
          </div>
        </div>
      </div>
    )
  }
  
  export default Footer