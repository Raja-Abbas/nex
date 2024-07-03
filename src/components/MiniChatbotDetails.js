import React, { useState } from "react";
import StarChatbotImage from "../assets/svgs/StarChatbot.svg";
import WHiteStarChatbotImage from "../assets/svgs/StarImage.svg";
import Send from "../assets/svgs/send.svg";

const MiniChatbotDetails = ({ onClose }) => {
  const [messages, setMessages] = useState([
    {
      sender: "Liz",
      text: "I'm Liz, your AI assistant. Congratulations on successfully deploying your project and joining our private alpha! You've earned $100 in credits to explore our platform. As we're in the early stages, I'm here to help you make the most of your credits and experience.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { sender: "User", text: input }]);
      setInput("");
      setIsTyping(true);

      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: "Liz",
            text: "I'm Liz, your AI assistant. I'm here to assist you with any queries you have.",
          },
        ]);
        setIsTyping(false);
      }, 2000);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-[105px] lg:right-10 right-0 max-md:w-auto md:w-[483px] pt-[50px] bg-background border border-[#333636] p-4 rounded-lg shadow-lg z-[1000]">
      <div className="flex justify-center items-center mb-2">
        <img src={StarChatbotImage} alt="StarChatbotImage" />
      </div>
      <div className="p-2">
        <p className="text-[20px] leading-[30px] text-white text-center my-[30px]">
          Welcome to NexLayer!
        </p>
        <div className="lg:flex gap-2 text-white"></div>
        <div className="flex flex-col gap-2 rounded-[7px] max-h-[300px] overflow-y-auto">
          {messages.map((message, index) => (
            <div key={index} className="flex gap-2">
              <div className="lg:flex">
                <img
                  src={WHiteStarChatbotImage}
                  alt="StarChatbotImage"
                  className="w-[16px] h-[16px] mt-1"
                />
                <p
                  className={`text-${
                    message.sender === "Liz" ? "light-blue" : "light-blue"
                  }`}
                >
                  {message.sender}:
                </p>
              </div>
              <p className="md:w-[388px] pr-11 text-base text-white">
                {message.text}
              </p>
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-2">
              <div className="flex">
                <img
                  src={WHiteStarChatbotImage}
                  alt="StarChatbotImage"
                  className="w-[16px] h-[16px] mt-1"
                />
                <p className="text-light-blue">Liz:</p>
              </div>
              <p className="rounded-full bg-light-blue h-4 w-4  animate-bounce   text-base text-white"></p>
            </div>
          )}
        </div>
        <div className="mt-[30px] border border-[#333636] flex justify-between items-center bg-dark-gray rounded-[7px]">
          <input
            type="text"
            placeholder="How can I help you?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="py-[12px] text-white pl-[15px] font-normal text-tiny border-none w-full outline-none focus:border-none focus:outline-none text-description-color bg-dark-gray"
          />
          <img
            className="pr-[15px] cursor-pointer"
            src={Send}
            alt="Send Icon"
            onClick={handleSend}
          />
        </div>
      </div>
    </div>
  );
};

export default MiniChatbotDetails;
