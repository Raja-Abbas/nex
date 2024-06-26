// src/components/ChatBotComponent.js
import React, { useState } from "react";
import ChatBotComponentImage from '../assets/images/ChatbotImage.png';
import ChatBot from './Chatbot';

export default function ChatBotComponent() {
  const [isChatBotVisible, setIsChatBotVisible] = useState(false);

  const toggleChatBot = () => {
    setIsChatBotVisible(!isChatBotVisible);
  };

  return (
    <div className="absolute bottom-1 right-1">
      <img
        src={ChatBotComponentImage}
        alt="ChatBotComponentImage"
        className="w-[60px] h-[60px] cursor-pointer z-[1000]"
        onClick={toggleChatBot}
      />
      {isChatBotVisible && <ChatBot onClose={toggleChatBot} />}
    </div>
  );
}
