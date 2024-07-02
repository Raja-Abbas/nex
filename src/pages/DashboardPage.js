import React from "react";
import Globe from "../assets/svgs/globe.svg";
import { deploymentData } from "../constants/Framework";
import { useCardTitle } from '../context/CardTitleContext';
import { useCredit } from '../context/CreditContext';

function DashboardPage({ selectedCard }) {
  const { cardTitle } = useCardTitle();
  const { credit } = useCredit();

  const defaultCard = {
    title: "Node.js",
  };

  const cardToDisplay = selectedCard || { title: cardTitle.charAt(0).toUpperCase() + cardTitle.slice(1) };

  return (
    <div className="max-md:w-[300px] max-lg:w-[550px] lg:max-w-[1200px] pt-20 w-full flex flex-col gap-10">
      <div className="relative w-full lg:py-3 min-[1300px]:py-0 min-[1300px]:h-[56px] flex items-center max-md:px-2 md:px-6 bg-[black] text-white border border-[#3D3F40] rounded-[7px]">
        <p className="font-normal max-md:px-1 max-md:text-base md:text-lg rounded-lg py-1 md:px-3 text-dark-blue">
          Exclusive nexlayer credits{" "}
          <span className="max-md:text-[10px] md:text-xl font-thin mx-5">
            |
          </span>{" "}
          ${credit.toFixed(0)}
        </p>
        <button
          type="submit"
          className="z-20 text-black absolute end-1 bg-light-blue hover:bg-opacity-50 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md max-md:text-xs md:text-lg px-4 lg:py-3 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Refer a Friend
        </button>
      </div>
      <div className="grid max-md:gris-cols-1 max-lg:grid-cols-2 lg:grid-cols-3 lg:grid-rows-3 pb-10">
        <div className="bg-card-color flex flex-col justify-center items-start gap-3 max-md:text-nowrap max-md:w-[280px] md:w-[380px] border border-[#32474C] relative rounded-lg py-4 max-md:px-2 md:px-6 shadow-xl">
          <div className="flex w-full justify-between">
            <div className="text-lg text-white tracking-0 font-[300]">
              {cardToDisplay.title} Application
            </div>
            <div>
              <a href="/build" className="text-white text-lg text-white tracking-0 font-[300] text-lg z-20 lg:mx-5 text-black absolute end-1 bg-light-blue hover:bg-opacity-50 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md max-md:text-xs md:text-lg px-4 py-[1px] dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Redeploy
              </a>
            </div>
          </div>
          <a
            href={deploymentData.url}
            className="flex gap-2 items-center"
            target="_blank"
            rel="noreferrer"
          >
            <img src={Globe} alt="Globe" className="w-4 h-5" />
            <p className="text-base text-dark-blue leading-[24px] font-normal">
              https://{cardToDisplay.title.toLowerCase()}-3hp0.ondeployx.com
            </p>
          </a>
          <p className="text-base text-white leading-[24px]">1 service </p>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
