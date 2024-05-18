import { Dispatch, SetStateAction } from "react";
import "./index.css";
import { TabsInfo, TabsMap } from "../../types/types";

interface TabNavigationProps {
  currentTabsInfo?: TabsInfo;
  currentTabsMap?: TabsMap;
  setCurrentTabsInfo?: Dispatch<SetStateAction<TabsInfo>>;
  setCurrentTabsMap?: Dispatch<SetStateAction<TabsMap>>;
}

const TabNavigation = ({
  currentTabsInfo,
  currentTabsMap,
  setCurrentTabsInfo,
  setCurrentTabsMap,
}: TabNavigationProps) => {
  const handleTabChange = (tab: TabsInfo | TabsMap) => {
    if (currentTabsInfo) {
      setCurrentTabsInfo!(tab as TabsInfo);
      return;
    }

    if (currentTabsMap) {
      setCurrentTabsMap!(tab as TabsMap);
    }
  };

  const tabIsActive = (tab: TabsInfo | TabsMap, tabType: "info" | "map") => {
    if (tabType === "info" && currentTabsInfo) {
      return currentTabsInfo === tab;
    }

    if (tabType === "map" && currentTabsMap) {
      return currentTabsMap === tab;
    }

    return false;
  };

  return (
    <div className={`tab-navigator-${currentTabsInfo ? "info" : "map"}`}>
      {currentTabsInfo && (
        <>
          <label className="label-info" onClick={() => handleTabChange("form")}>
            <input type="radio" name="info-radio" checked={tabIsActive("form", "info")} />
            <span>Form</span>
          </label>
          <label className="label-info" onClick={() => handleTabChange("address-list")}>
            <input type="radio" name="info-radio" checked={tabIsActive("address-list", "info")} />
            <span>Address list</span>
          </label>
          <span className="selection-info" />
        </>
      )}
      {currentTabsMap && (
        <>
          <label className="label-map" onClick={() => handleTabChange("a-star")}>
            <input type="radio" name="map-radio" checked={tabIsActive("a-star", "map")} />
            <span>A* route</span>
          </label>
          <label className="label-map" onClick={() => handleTabChange("nearest-neighbors")}>
            <input type="radio" name="map-radio" checked={tabIsActive("nearest-neighbors", "map")} />
            <span>Nearest neighbors</span>
          </label>
          <span className="selection-map" />
        </>
      )}
    </div>
  );
};

export default TabNavigation;
