 // src/components/ChatBot.js
import React from "react";
import StarChatbotImage from '../assets/svgs/StarChatbot.svg';
import WHiteStarChatbotImage from '../assets/svgs/StarImage.svg';
import Send from "../assets/svgs/send.svg";


const ChatBot = ({ onClose }) => {
  return (
    <div className="fixed bottom-[105px] right-10 max-md:w-auto md:w-[483px] pt-[50px] bg-background border border-[#333636] p-4 rounded-lg shadow-lg z-[1000]">
      <div className="flex justify-center items-center mb-2">
        <img src={StarChatbotImage} alt="StarChatbotImage"/>
      </div>
      <div className="p-2">
        <p className="text-[20px] leading-[30px] text-white text-center my-[30px]">Welcome to NexLayer!</p>
        <div className="flex gap-2 text-white">
          <div className="flex ">
           <img src={WHiteStarChatbotImage} alt="StarChatbotImage"className="w-[16px] h-[16px]  mt-1"/>
            <p className="text-light-blue">Liz:</p>
          </div>
          <p className="md:w-[388px] text-base">I'm Liz, your AI assistant. Congratulations on successfully<br/>
             deploying your project and joining our private alpha! <br className="max-md:hidden"/>
              You've earned $100 in credits to explore our platform. <br className="max-md:hidden"/>
              As we're in the early stages, I'm here to help you make the <br className="max-md:hidden"/>
              most of your credits and experience. </p>
        </div>
        <div className="mt-[30px] border border-[#333636] flex justify-between items-center bg-dark-gray rounded-[7px]">
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
};

export default ChatBot;
