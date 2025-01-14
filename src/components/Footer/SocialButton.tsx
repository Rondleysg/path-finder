import { GitHubSVG } from "../../assets/svg/GitHubSVG";
import { LinkedinSVG } from "../../assets/svg/LinkedinSVG";

interface SocialButtonProps {
  socialName: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const SocialButton = ({ socialName, onClick }: SocialButtonProps) => {
  const svg: { [key: string]: JSX.Element } = {
    github: <GitHubSVG />,
    linkedin: <LinkedinSVG />,
  };
  return (
    <button className={`btn-footer ${socialName}`} onClick={(e) => onClick(e)}>
      <span className="svgContainer">{svg[socialName]}</span>
      <span className="BG" />
    </button>
  );
};

export default SocialButton;
