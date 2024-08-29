import React from "react";
import Modal from "./common/Modal";
import githubIcon from "../assets/svgs/github.svg";

const MarketplaceTemplateWaitlistModal = ({ isOpen, onClose, cardData }) => {
  const handleShareIdeasClick = () => {
    // setCredit(100);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="background-svg md:w-[489px] md:mx-auto flex flex-col items-center justify-center p-8 bg-dark-background rounded-lg shadow-lg text-center">
        <img
          src={cardData.logo}
          alt={cardData.title}
          className="w-[130px] mb-[15px]"
        />
        <h1 className="text-[30px] text-white font-bold mb-2">
          {cardData.title}
        </h1>
        <p className="text-[16px] text-white mb-[45px]">
          This template includes 2 services
        </p>
        <div className="bg-[#202020] px-[30px] py-[20px] rounded-[10px]">
          <p className="w-full px-4 py-2 bg-blue-600 text-white rounded mb-4 flex items-center justify-center gap-2 text-[18px] ">
            Sign in with GitHub to Claim this project
          </p>
          <div className="flex justify-center items-center">
            <button
              className="text-gray-500 font-bold hover:text-gray-300 bg-white flex items-center gap-[10px] justify-center p-[8px] px-[20px] pr-[30px] rounded-[5px]"
              onClick={handleShareIdeasClick}
            >
              <img src={githubIcon} alt="Github logo" className="w-[22px]" />
              Sign in with Github
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MarketplaceTemplateWaitlistModal;
