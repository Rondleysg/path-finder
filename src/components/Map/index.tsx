import { useEffect, useState } from "react";
import "./index.scss";

interface MapProps {
  hidden: boolean;
  mapId: string;
  totalDistance: number;
  linkMap: string;
}

const Map = ({ hidden, mapId, totalDistance, linkMap }: MapProps) => {
  const [divButtonsFound, setDivButtonsFound] = useState(false);
  const [divBorderFound, setDivBorderFound] = useState(false);

  useEffect(() => {
    if (!divButtonsFound) {
      const intervalId = setInterval(() => {
        const elements = document.querySelectorAll("div");
        elements.forEach((div) => {
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
        const elements = document.querySelectorAll("div");
        elements.forEach((div) => {
          const style = div.getAttribute("style");
          if (style) {
            const hasBorder = style.includes("border: 2px solid rgb(26, 115, 232);");

            if (hasBorder) {
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

  useEffect(() => {
    setDivButtonsFound(false);
    setDivBorderFound(false);
  }, [hidden]);
  
  return (
    <>
      {!hidden && (
        <>
          <a id="link-map" href={linkMap} target="_blank" rel="noopener noreferrer">
            Link to Google Maps
          </a>
          <p id="map-dist">Total route distance: {totalDistance}m</p>
        </>
      )}
      <div className={`map-box${hidden ? " invisible" : ""}`}>
        <div id={mapId} className="map-div"></div>
      </div>
    </>
  );  
};

export default Map;
