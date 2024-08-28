import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import ChatBotComponentImage from '../assets/images/ChatbotImage.png';
import MiniChatbotDetails from './MiniChatbotDetails';

export default function ChatBotIcon({ isStep5Visible }) {
  const [isChatBotVisible, setIsChatBotVisible] = useState(false);
  const location = useLocation();

  const toggleChatBot = () => {
    setIsChatBotVisible(!isChatBotVisible);
  };

  // useEffect(() => {
  //   if (isStep5Visible) {
  //     setIsChatBotVisible(false);
  //   }
  // }, [isStep5Visible]);

  const isDashboard = location.pathname === '/dashboard';

  return (
    <div className="absolute fade-in bottom-1 right-1">
      {!isChatBotVisible && !isStep5Visible && !isDashboard && (
        <div className="relative bg-medium-grey-color text-white mr-4 max-w-[230px] text-center border-2 border-[#333636] rounded-full text-tiny overflow-hidden card example-2">
          <div className="inner py-4 px-2 rounded-full">
            <span className="text-dark-blue">Hi, I'm Liz.</span> I'm starting the deployment now. Just sit back - I've got it covered
          </div>
        </div>
      )}
      <img
        src={ChatBotComponentImage}
        alt="ChatBotComponentImage"
        className="w-[60px] h-[60px] ml-auto cursor-pointer z-[1000] hover:scale-110 transition-all"
        onClick={toggleChatBot}
      />
      {isChatBotVisible && <MiniChatbotDetails onClose={toggleChatBot} />}
    </div>
  );
}
