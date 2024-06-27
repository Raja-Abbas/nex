import React from 'react';
import StarChatBotImage from "../assets/images/StarImageChatbot.png";

  const ChatbotMiniComponent = () =>  {
	return (
	  <div className="absolute bottom-1 right-1">
		<img src={StarChatBotImage} alt="StarChatBotImage" className="w-[39px] h-[39px]" />
	  </div>
	);
  }
  
  export default ChatbotMiniComponent;
  