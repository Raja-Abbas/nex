import React, { useState } from "react";
import TemplateLeftSidebar from "../components/common/MarketplaceTemplateSidebar";
import CardsContent from "../components/common/MarketplaceCardsContent";

const MarketPlace = ({ onCardSelect }) => {
  const [selectedMenu, setSelectedMenu] = useState("AI/ML");
  const [, setActiveMenu] = useState("AI/ML");

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
    setSelectedMenu(menu);
  };

  return (
    <div className="max-md:bg-[#13121c] w-[100%] flex gap-4 md:gap-0 flex-col md:flex-row rounded-[10px] max-md:h-full overflow-y-auto overflow-hidden scrollbar">
      <div className="w-full md:w-[25%] sticky top-0 z-10 bg-[#13121c] overflow-y-auto overflow-hidden scrollbar sm:max-h-[80vh] md:h-[80vh]">
        <TemplateLeftSidebar handleMenuClick={handleMenuClick} />
      </div>
      <div className="bg-[#13121c] max-xl:px-4 mt-22 max-md:max-h-[66vh] max-h-[80vh] md:h-[80vh] w-full md:w-[75%]">
        <CardsContent selectedMenu={selectedMenu} onCardSelect={onCardSelect} />
      </div>
    </div>
  );
};

export default MarketPlace;
