import React, { useState } from "react";
import Tick from "../../assets/svgs/tick-marketplace.svg";

const MarketPlaceTemplateSidebar = ({ handleMenuClick }) => {
  const [activeMenu, setActiveMenu] = useState("AI/ML");
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const handleButtonClick = (menu) => {
    setActiveMenu(menu);
    handleMenuClick(menu);
    setIsSidebarVisible(false);
  };

  const menuItems = [
    { key: "All", text: "All" },
    { key: "AI/ML", text: "AI/ML" },
    { key: "Analytics", text: "Analytics" },
    { key: "Authentication", text: "Authentication" },
    { key: "Automation", text: "Automation" },
    { key: "Blogs", text: "Blogs" },
    { key: "Bots", text: "Bots" },
    { key: "CMS", text: "CMS" },
    { key: "Observability", text: "Observability" },
    { key: "Other", text: "Other" },
    { key: "Starters", text: "Starters" },
    { key: "Storage", text: "Storage" },
    { key: "Queues", text: "Queues" },
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
          <p className="pt-3 capitalize md:pt-[30px] pb-0 md:pb-6 font-bold text-lg text-description-color">
            CATEGORY
          </p>
        </div>

        <div className="w-[100%] flex flex-row md:flex-col gap-0 sm:gap-0 items-center px-2 md:px-0 pb-3 max-md:w-full max-md:overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.key}
              className={`md:w-[100%] max-[470px]:px-3 px-5 md:px-3 py-2 mt-0 lg:mt-1 ${
                activeMenu === item.key
                  ? "bg-[#261a37] text-base h-10 ml-3 rounded-[5px] text-white flex gap-3 items-center"
                  : "bg-transparent "
              }`}
              onClick={() => handleButtonClick(item.key)}
            >
              {activeMenu === item.key && (
                <img className="pb-1 hidden md:block w-4" src={Tick} alt="Tick SVG" />
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

export default MarketPlaceTemplateSidebar;
