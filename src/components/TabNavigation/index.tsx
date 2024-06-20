import { Dispatch, SetStateAction } from "react";
import "./index.css";
import { TabsAll, TabsInfo, TabsMap } from "../../types/types";

interface TabNavigationProps {
  currentTabsInfo?: TabsInfo;
  currentTabsMap?: TabsMap;
  currentTabsAll?: TabsAll;
  setCurrentTabsInfo?: Dispatch<SetStateAction<TabsInfo>>;
  setCurrentTabsMap?: Dispatch<SetStateAction<TabsMap>>;
  setCurrentTabsAll?: Dispatch<SetStateAction<TabsAll>>;
}

const TabNavigation = ({
  currentTabsInfo,
  currentTabsMap,
  currentTabsAll,
  setCurrentTabsInfo,
  setCurrentTabsMap,
  setCurrentTabsAll,
}: TabNavigationProps) => {
  const classNameTabs = currentTabsAll ? "all" : currentTabsInfo ? "info" : "map";
  const currentWidth = window.innerWidth;

  const handleTabChange = (tab: TabsInfo | TabsMap) => {
    if (currentTabsInfo) {
      setCurrentTabsInfo!(tab as TabsInfo);
      return;
    }

    if (currentTabsMap) {
      setCurrentTabsMap!(tab as TabsMap);
      return;
    }

    setCurrentTabsAll!(tab as TabsAll);
  };

  const tabIsActive = (tab: TabsInfo | TabsMap, tabType: "info" | "map" | "all") => {
    if (tabType === "info" && currentTabsInfo) {
      return currentTabsInfo === tab;
    }

    if (tabType === "map" && currentTabsMap) {
      return currentTabsMap === tab;
    }

    if (tabType === "all" && currentTabsAll) {
      return currentTabsAll === tab;
    }

    return false;
  };

  const renderTabs = () => {
    if (currentTabsMap) {
      return (
        <>
          <label className="label-map" onClick={() => handleTabChange("a-star")}>
            <input type="radio" name="map-radio" checked={tabIsActive("a-star", "map")} readOnly />
            <span>A* route</span>
          </label>
          <label className="label-map" onClick={() => handleTabChange("nearest-neighbors")}>
            <input type="radio" name="map-radio" checked={tabIsActive("nearest-neighbors", "map")} readOnly />
            <span>Nearest neighbors</span>
          </label>
          <span className="selection-map" />
        </>
      );
    }

    if (currentTabsInfo) {
      return (
        <>
          <label className="label-info" onClick={() => handleTabChange("form")}>
            <input type="radio" name="info-radio" checked={tabIsActive("form", "info")} readOnly />
            <span>Form</span>
          </label>
          <label className="label-info" onClick={() => handleTabChange("address-list")}>
            <input type="radio" name="info-radio" checked={tabIsActive("address-list", "info")} readOnly />
            <span>Address list</span>
          </label>
          <span className="selection-info" />
        </>
      );
    }

    return (
      <>
        <label className="label-all" onClick={() => handleTabChange("form")}>
          <input type="radio" name="all-radio" checked={tabIsActive("form", "all")} readOnly />
          <span>Form</span>
        </label>
        <label className="label-all" onClick={() => handleTabChange("address-list")}>
          <input type="radio" name="all-radio" checked={tabIsActive("address-list", "all")} readOnly />
          <span>Address list</span>
        </label>
        <label className="label-all" onClick={() => handleTabChange("a-star")}>
          <input type="radio" name="all-radio" checked={tabIsActive("a-star", "all")} readOnly />
          <span>A* route</span>
        </label>
        <label className="label-all" onClick={() => handleTabChange("nearest-neighbors")}>
          <input type="radio" name="all-radio" checked={tabIsActive("nearest-neighbors", "all")} readOnly />
          <span>Nearest neighbors</span>
        </label>
        <span className="selection-all" />
      </>
    );
  };

  const style = {
    "--container_width": `${currentWidth - 64}px`,
  } as React.CSSProperties;

  return (
    <div className={`tab-navigator-${classNameTabs}`} style={currentTabsAll && style}>
      {renderTabs()}
    </div>
  );
};

export default TabNavigation;
