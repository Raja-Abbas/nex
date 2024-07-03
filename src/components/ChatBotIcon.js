import React, { useState } from "react";
import ChatBotComponentImage from '../assets/images/ChatbotImage.png';
import MiniChatbotDetails from './MiniChatbotDetails';

export default function ChatBotIcon() {
  const [isChatBotVisible, setIsChatBotVisible] = useState(false);

  const toggleChatBot = () => {
    setIsChatBotVisible(!isChatBotVisible);
  };

  return (
    <div className="absolute bottom-1 right-1 z-[1000]">
      <img
        src={ChatBotComponentImage}
        alt="ChatBotComponentImage"
        className="w-[60px] h-[60px] cursor-pointer z-[1000] hover:scale-110 transition-all"
        onClick={toggleChatBot}
      />
      {isChatBotVisible && <MiniChatbotDetails onClose={toggleChatBot} />}
    </div>
  );
}
