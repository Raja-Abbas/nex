import React from "react";
import { starsCardData } from "../constants/Framework";
import StarSVG from "../assets/svgs/starSVG.svg";
import Send from "../assets/svgs/send.svg";

export default function ChatbotTabSidebar() {
  return (
    <div className="max-w-[100%] xl:max-w-[100%] 2xl:max-w-[100%] p-5">
      <div className="bg-background rounded-[7px] py-20">
        <p className="font-normal text-custom-size text-center text-white">
          Check-In your Code, Let <span className="text-dark-blue">Liz</span>{" "}
          Handle the Rest!
        </p>
        <a className="my-6 flex justify-center" href="/">
          <button className="px-[30px] py-[10px] font-normal text-xl rounded-full bg-medium-gray text-white">
            Coming Soon
          </button>
        </a>
        <p className="pb-9 font-semibold text-xl text-center text-dark-blue">
          What can Liz do?
        </p>

        <div>
          {starsCardData.map((card, index) => (
            <div className="pb-10 px-5 flex" key={index}>
              <img className="w-4 h-4" src={StarSVG} alt="Star Svg" />
              <p className="pl-2 font-normal text-base text-dark-blue">Liz</p>
              <p className="pl-4 font-normal text-base text-description-color">
                {card.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mx-5 flex justify-between items-center border border-[#2e2e2e] bg-dark-gray rounded-[7px]">
          <input
            type="text"
            placeholder="How can I help you?"
            className="py-[12px] pl-[15px] font-normal text-tiny border-none w-full  outline-none focus:border-none focus:outline-none text-description-color bg-dark-gray"
          />
          <img
            className="pr-[15px] cursor-pointer"
            src={Send}
            alt="Send Icon"
          />
        </div>
      </div>
    </div>
  );
}
