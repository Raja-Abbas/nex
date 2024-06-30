import React, { useState } from "react";
import Sidebar from "./LeftSidebar";
import CardsContent from "../components/CardsContent";

const SideLayout = ({ onCardSelect }) => {
  const [selectedMenu, setSelectedMenu] = useState("All");
  const [, setActiveMenu] = useState("All");

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
    setSelectedMenu(menu);
  };

  return (
    <div className="max-md:bg-background w-[100%] flex gap-4 md:gap-0 flex-col md:flex-row overflow-hidden rounded-[10px]">
      <div className="w-full md:w-[25%] bg-light-black overflow-y-auto overflow-hidden scrollbar sm:max-h-[80vh] md:h-[80vh]">
        <Sidebar handleMenuClick={handleMenuClick} />
      </div>
      <div className="bg-background max-h-[80vh] xl:h-[80vh] w-full md:w-[75%] overflow-y-auto overflow-hidden scrollbar">
        <CardsContent selectedMenu={selectedMenu} onCardSelect={onCardSelect} />
      </div>
    </div>
  );
};

export default SideLayout;
