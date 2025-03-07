import { SOCIAL_LINKS } from "../../configs/constants";
import "./index.scss";
import SocialButton from "./SocialButton";

const Footer = () => {
  const handleOpenSourceClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, link: string) => {
    e.preventDefault();
    window.open(link, "_blank");
  };

  return (
    <footer>
      <SocialButton socialName="github" onClick={(e) => handleOpenSourceClick(e, SOCIAL_LINKS.github)} />
      <SocialButton socialName="linkedin" onClick={(e) => handleOpenSourceClick(e, SOCIAL_LINKS.linkedin)} />
    </footer>
  );
};

export default Footer;
