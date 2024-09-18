import React from "react";
import { useNavigate } from "react-router-dom";
import { useCardTitle } from "../context/CardTitleContext";
import { useCredit } from "../context/CreditContext";
import ChatBotIcon from "../components/ChatBotIcon";
import Route from "../components/common/deploymenturl/deploymentUrl";

function DashboardPage({ selectedCard }) {
  const { cardTitle } = useCardTitle();
  const { credit } = useCredit();
  const navigate = useNavigate();

  const cardToDisplay = selectedCard || {
    title: cardTitle.charAt(0).toUpperCase() + cardTitle.slice(1),
  };

  const handleReferFriend = () => {
    navigate("/dashboard/refer-a-friend");
  };

  return (
    <div className="grid max-lg:px-4 w-full scrollbar overflow-x-hidden gap-10 justify-center max-lg:grid-cols-1 max-lg:grid-rows-2 pt-20">
      <div className="max-w-[1200px] flex flex-col gap-10">
        <div className="relative w-full lg:py-3 xl:h-[56px] flex items-center max-md:px-2 md:px-6 bg-[black] text-white border border-[#3D3F40] rounded-[7px]">
          <p className="font-normal max-md:px-1 max-md:text-base md:text-lg rounded-lg py-1 md:px-3 text-dark-blue">
            Exclusive NexLayer credits{" "}
            <span className="max-md:text-[10px] md:text-xl font-thin mx-5">
              {" "}
              |{" "}
            </span>{" "}
            ${credit.toFixed(0)}
          </p>
          <button
            onClick={handleReferFriend}
            className="z-20 text-black absolute end-1 bg-light-blue hover:bg-opacity-50 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md max-md:text-xs md:text-lg px-4 lg:py-3 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Tell a Friend
          </button>
        </div>
        <div className="grid max-md:grid-cols-1 max-lg:grid-cols-2 lg:grid-cols-3 lg:grid-rows-1 pb-10">
          <div className="bg-card-color flex flex-col justify-center items-start gap-3 text-nowrap max-md:w-[280px] border border-[#32474C] relative rounded-lg py-4 size-fit max-md:px-2 md:px-6 shadow-xl">
            <div className="flex w-full justify-between">
              <div className="text-lg text-white tracking-0 font-[300]">
                {cardToDisplay.title} Application
              </div>
              <div>
                <a
                  href="/#/build"
                  className="px-[10px] py-[4.5px] font-normal text-sm rounded-full bg-light-blue text-[black]"
                >
                  Redeploy
                </a>
              </div>
            </div>
            <Route />
            <p className="text-base text-white leading-[24px]">1 service </p>
          </div>
        </div>
      </div>
      <ChatBotIcon />
    </div>
  );
}

export default DashboardPage;
