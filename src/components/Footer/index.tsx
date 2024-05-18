import { GitHubSVG } from "../../assets/svg/GitHubSVG";
import { LinkedinSVG } from "../../assets/svg/LinkedinSVG";
import "./index.css";

const Footer = () => {
  const handleGitHubClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    window.open("https://github.com/Rondleysg", "_blank");
  };

  const handleLinkedInClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    window.open("https://www.linkedin.com/in/rondleysg", "_blank");
  };

  return (
    <footer>
      <button className="btn-footer github" onClick={handleGitHubClick}>
        <span className="svgContainer">
          <GitHubSVG />
        </span>
        <span className="BG" />
      </button>
      <button className="btn-footer linkdin" onClick={handleLinkedInClick}>
        <span className="svgContainer">
          <LinkedinSVG />
        </span>
        <span className="BG" />
      </button>
    </footer>
  );
};

export default Footer;
