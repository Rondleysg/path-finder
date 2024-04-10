import { Dispatch, SetStateAction } from "react";
import "./index.css";
import { Tabs } from "../../types/types";

interface TabNavigationProps {
  currentTab: Tabs;
  setCurrentTab: Dispatch<SetStateAction<Tabs>>;
}

const TabNavigation = ({ currentTab, setCurrentTab }: TabNavigationProps) => {
  const handleTabChange = (tab: Tabs) => {
    setCurrentTab(tab);
  };

  const tabIsActive = (tab: Tabs) => {
    return currentTab === tab;
  };

  return (
    <div className="tab-navigator">
      <label onClick={() => handleTabChange("form")}>
        <input type="radio" name="value-radio" checked={tabIsActive("form")} />
        <span>Form</span>
      </label>
      <label onClick={() => handleTabChange("address-list")}>
        <input type="radio" name="value-radio" checked={tabIsActive("address-list")} />
        <span>Address list</span>
      </label>
      <span className="selection" />
    </div>
  );
};

export default TabNavigation;
