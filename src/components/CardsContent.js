// src/components/CardsContent.js
import React from "react";
import { cardsData } from "../constants/Framework";
import NexLayer from "../assets/svgs/nexLayer.svg";

export default function CardsContent({ selectedMenu, onCardSelect }) {
  const filteredData =
    selectedMenu === "All"
      ? cardsData
      : cardsData.filter((item) => item.category === selectedMenu);

  return (
    <div className="px-0 md:px-5 py-5 grid gap-[14px] max-[470px]:grid-cols-1 grid-cols-2 lg:grid-cols-3">
      {filteredData.map((item, index) => (
        <div
          key={index}
          className="px-[27.5px] py-5 rounded-[5px] bg-light-black"
        >
          <div>
            <img className="min-h-[40px]" src={item.logo} alt={item.logo} />
            <p className="pt-3 font-normal text-xl text-white">{item.title}</p>
            <p className="min-h-[80px] pt-[5px] font-normal text-tiny text-description-color">
              {item.description}
            </p>
            <div className="border-t border-[#4F4F4F]"></div>
            <div className="pt-[10px] flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <img src={NexLayer} alt="NexLayer Logo" />
                <p className="font-medium text-xs text-white">
                  <span className="font-normal text-description-color">
                    By{" "}
                  </span>
                  {item.provider}
                </p>
              </div>
              <button
                onClick={() => onCardSelect(item)}
                className="px-[10px] py-[4.5px] font-normal text-sm rounded-full bg-light-blue text-[black]"
              >
                Deploy
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
