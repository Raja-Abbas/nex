import React from "react";
import { detailsData } from "../constants/Framework";
import NodeJs from "../assets/svgs/node.svg";

export default function DetailsTabSidebar({ selectedCard }) {
  const defaultCard = {
    logo: NodeJs,
    title: "Node.js",
  };

  const cardToDisplay = selectedCard || defaultCard;

  return (
    <div className="max-w-[100%] max-h-[calc(100vh-462px)] max-lg:max-h-screen xl:max-w-[100%] 2xl:max-w-[100%] p-5 overflow-y-auto scrollbar">
      <p className="font-400 text-lg text-white">Deployed via Container Image</p>
      <div className="mt-[15px] px-2 py-[8.5px] flex gap-[10px] items-center rounded-[7px] bg-card-color">
        <div className="flex justify-center items-center rounded-[7px] p-2 w-[38px] h-[38px] bg-background">
          <img src={cardToDisplay.logo} alt="Details Logo" />
        </div>
        <div>
          <p className="font-normal text-base text-white">
            nexlayer-templates/{cardToDisplay.title.toLowerCase()}
          </p>
          <p className="font-normal text-tiny text-description-color">
            {detailsData.logoDescription}
          </p>
        </div>
      </div>
      <p className="pt-[50px] font-normal text-lg text-white">
        Configuration Details
      </p>
      <hr className="mt-5 border-line-color" />

      <p className="pt-5 font-normal text-base text-white">Deploy</p>
      <p className="pt-[5px] font-normal text-tiny text-description-color">
        Region
      </p>
      <p className="pt-[5px] font-normal text-tiny text-white">
        United States Multi-Region
      </p>
      <hr className="mt-5 border-line-color" />

      <p className="pt-5 font-normal text-tiny text-description-color">
        Number of Replicas
      </p>
      <p className="pt-[5px] font-normal text-tiny text-white">
        1 replica with self-healing
      </p>
      <hr className="mt-5 border-line-color" />

      <p className="pt-5 font-normal text-tiny text-description-color">
        Restart Policy
      </p>
      <p className="pt-[5px] font-normal text-tiny text-white">
        Smart recovery on failure
      </p>
      <hr className="mt-5 border-line-color" />

      <p className="pt-5 font-normal text-tiny text-description-color">
        Restart Policy Max Retries
      </p>
      <p className="pt-[5px] font-normal text-tiny text-white">
        10
      </p>
    </div>
  );
}
