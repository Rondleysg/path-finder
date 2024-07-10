import { useEffect, useState } from "react";
import "./index.css";

interface MapProps {
  hidden: boolean;
  mapId: string;
}

const Map = ({ hidden, mapId }: MapProps) => {
  const [divButtonsFound, setDivButtonsFound] = useState(false);
  const [divBorderFound, setDivBorderFound] = useState(false);

  useEffect(() => {
    if (!divButtonsFound) {
      const intervalId = setInterval(() => {
        const divs = document.querySelectorAll("div");
        divs.forEach((div) => {
          const style = div.getAttribute("style");
          if (style) {
            const hasInlineFlex = style.includes("display: inline-flex;");
            const hasAbsolute = style.includes("position: absolute;");
            const hasRight = style.includes("right: 0px;");
            const hasBottom = style.includes("bottom: 0px;");

            if (hasInlineFlex && hasAbsolute && hasRight && hasBottom) {
              div.classList.add("d-none");
              setDivButtonsFound(true);
              clearInterval(intervalId);
            }
          }
        });
      }, 1000);

      return () => clearInterval(intervalId);
    }

    if (!divBorderFound) {
      const intervalId = setInterval(() => {
        const divs = document.querySelectorAll("div");
        divs.forEach((div) => {
          const style = div.getAttribute("style");
          if (style) {
            const hasBorder = style.includes("border: 2px solid rgb(26, 115, 232);");

            if (hasBorder) {
              //remove border
              div.setAttribute("style", style.replace("border: 2px solid rgb(26, 115, 232);", ""));
              setDivBorderFound(true);
              clearInterval(intervalId);
            }
          }
        });
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [divButtonsFound, divBorderFound]);

  return (
    <div className={`map-box${hidden ? " invisible" : ""}`}>
      <div id={mapId} className="map-div"></div>
    </div>
  );
};

export default Map;
