// src/components/TemplateWaitlistModal.js
import React from "react";
import Modal from "./Modal"; // Reuse the Modal component
import githubIcon from "../assets/svgs/github.svg";
const TemplateWaitlistModal = ({ isOpen, onClose, selectedCard }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center justify-center p-8 bg-dark-background rounded-lg shadow-lg text-center">
        <img
          src={selectedCard.logo}
          alt={selectedCard.title}
          className="w-[130px] h-[130px] mb-[15px]"
        />
        <h1 className="text-[30px] text-white font-bold mb-2">
          {selectedCard.title}
        </h1>
        <p className="text-[16px] text-white mb-[45px]">
          This template includes 2 services
        </p>
        <div className="bg-[#202020] px-[30px] py-[20px]">
          <p className="w-full px-4 py-2 bg-blue-600 text-white rounded mb-4 flex items-center justify-center gap-2 text-[18px] ">
            Sign in with GitHub to Claim this project
          </p>
          <div className="flex justify-center">
            <button
              className="text-gray-500 hover:text-gray-300 bg-white flex items-center gap-[10px] justify-center p-[8px] rounded-[5px]"
              onClick={onClose}
            >
              <img
                src={githubIcon}
                alt="Github logo"
                className="w-[16px] h-[16px]"
              />
              Github
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TemplateWaitlistModal;
