import React, { useState } from "react";
import Tick from "../../assets/svgs/tick.svg";
import TemplateLogo from "../../assets/svgs/templateLogo.svg";

const TemplateLeftSidebar = ({ handleMenuClick }) => {
  const [activeMenu, setActiveMenu] = useState("All");
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const handleButtonClick = (menu) => {
    setActiveMenu(menu);
    handleMenuClick(menu);
    setIsSidebarVisible(false);
  };

  const menuItems = [
    { key: "All", text: "All" },
    { key: "Popular", text: "Popular" },
    { key: "Latest", text: "Latest" },
    { key: "News", text: "News" },
  ];

  return (
    <div className="">
      <aside
        id="logo-sidebar"
        className={`${
          isSidebarVisible ? "block" : "block"
        } lg:block z-40 h-full flex gap-3 md:gap-8 font-[500] text-lg leading-[30px] flex-col items-start px-0 md:px-5`}
        aria-label="Sidebar"
      >
        <div className="px-5 sm:px-6 md:px-0">
          <div className="pt-6 flex gap-[10px] items-center">
            <img src={TemplateLogo} alt="Template SVG" />
            <p className="font-normal text-base text-white">
              Start with a Template
            </p>
          </div>
          <p className="pt-3 md:pt-[30px] pb-0 md:pb-6 font-normal text-tiny text-description-color">
            Category
          </p>
        </div>

        <div className="w-[100%] flex flex-row md:flex-col gap-0 sm:gap-0 items-center px-2 md:px-0 pb-3">
          {menuItems.map((item) => (
            <button
              key={item.key}
              className={`md:w-[100%] max-[470px]:px-3 px-5 md:px-3 py-2 mt-0 lg:mt-1 ${
                activeMenu === item.key
                  ? "bg-custom-color text-base h-10 rounded-[5px] text-white flex gap-2 items-center"
                  : "bg-transparent "
              }`}
              onClick={() => handleButtonClick(item.key)}
            >
              {activeMenu === item.key && (
                <img className="pb-1 hidden md:block" src={Tick} alt="Tick SVG" />
              )}
              <p
                className={`text-left font-medium text-base text-description-color ${
                  activeMenu === item.key
                    ? "text-lg text-white"
                    : "text-black pl-0 md:pl-[22px]"
                }`}
              >
                {item.text}
              </p>
            </button>
          ))}
        </div>
      </aside>
    </div>
  );
};

export default TemplateLeftSidebar;
