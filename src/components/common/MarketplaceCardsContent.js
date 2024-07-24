/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { useNavigate } from "react-router-dom";
import { cardsData, templatesData } from "../../constants/Framework";
import NexLayer from "../../assets/svgs/nexLayer.svg";
import Download from "../../assets/svgs/download.svg";

export default function CardsContent({ selectedMenu, onCardSelect }) {
  const navigate = useNavigate();
  const filteredData =
    selectedMenu === "All"
      ? cardsData
      : cardsData.filter((item) =>  item.category === selectedMenu);

  const handleLinkClick = (slug) => {
    navigate(`/details/${slug}`);
  };



  return (
    <div className="px-0 md:px-5 py-5 grid gap-[16px] max-[470px]:grid-cols-1 grid-cols-2 xl:grid-cols-3">
      {filteredData.map((item, index) => (
        <div
          key={index}
          className="relative px-8 pr-6 font-semibold py-5 rounded-[5px] shadow-2xl border border-light-gray border-opacity-20 bg-[#031113]"
        >
          <div>
            <img className="min-h-[40px] max-h-[40px]" src={item.logo} alt={item.logo} />
            <p className="pt-3 font-normal max-w-[310px] text-2xl text-white">{item.title}</p>
            <p className="min-h-[90px] max-w-[310px] pt-[5px] font-normal text-xl text-description-color">
              {item.description}
            </p>
            <div className="border-t border-[#4F4F4F] border-opacity-20"></div>
            <div className="pt-[10px] flex justify-between items-center">
            <div className="flex gap-2 items-center">
                <img src={NexLayer} alt="NexLayer Logo" />
                <p className="font-medium text-xs text-white">
                  <span className="font-normal text-description-color">
                    By{" "}
                  </span>
                  Nexlayer
                </p>
              </div>
              <div className="flex gap-4 items-center">
                <div className="flex gap-2">
                  <img src={Download} alt="Download" className="w-4" />
                  <p className="text-description-color text-base font-semibold">{item.Downloads}</p>
                </div>
                <button
                onClick={() => handleLinkClick(item.slug)}
                className="px-[10px] py-[4.5px] font-normal text-sm rounded-full bg-light-blue text-[black]"
                >
                Deploy
              </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
