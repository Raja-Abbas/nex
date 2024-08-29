import React, { useState, useEffect } from "react";
import StarChatbotImage from "../../assets/svgs/StarChatbot.svg";
import ThinkingIcon from "../../assets/svgs/thinking";
import { highlightURLs } from "../../utils/chatUtils";
import { useSlug } from "../../context/SlugContext";
import { useSelector } from "react-redux";

const MessageList = ({ filteredMessages, isTyping, messagesEndRef, showSecondMessage, isSecondMessageShown }) => {
  const [displayedMessages, setDisplayedMessages] = useState([]);
  const { namespace } = useSelector((state) => state.deployment);
  const { slug } = useSlug();

  useEffect(() => {
    const storedMessages =
      JSON.parse(localStorage.getItem("displayedMessages")) || [];
    setDisplayedMessages(storedMessages);
  }, []);

  useEffect(() => {
    setDisplayedMessages([]);
    localStorage.removeItem("displayedMessages");
  }, [namespace, slug]);

  useEffect(() => {
    const updateMessages = () => {
      if (filteredMessages.length === 0) return;

      const newMessages = filteredMessages.filter(message =>
        !displayedMessages.some(
          (msg) => msg.text === message.text && msg.sender === message.sender
        )
      );

      setDisplayedMessages((prevMessages) => [
        ...prevMessages,
        ...newMessages
      ]);

      localStorage.setItem(
        "displayedMessages",
        JSON.stringify([...displayedMessages, ...newMessages])
      );

      // Dispatch the second message if not shown
      if (!isSecondMessageShown) {
        showSecondMessage();
      }
    };

    updateMessages();
  }, [filteredMessages, displayedMessages, showSecondMessage, isSecondMessageShown]);

  return (
    <div className="flex flex-col gap-2 justify-start text-base rounded-[7px] max-h-[300px] max-w-max overflow-y-auto">
      {displayedMessages.map((message, index) => (
        <div
          key={index}
          className={`flex fade-in ${
            message.sender === "User" ? "justify-end" : "justify-start"
          } pr-8`}
        >
          <div
            className={`flex gap-2 max-w-full p-2 rounded-[7px] ${
              message.sender === "User"
                ? "bg-[#333636] text-white items-center"
                : "text-white flex"
            }`}
          >
            <img
              src={StarChatbotImage}
              alt="StarChatbotImage"
              className={`${
                message.sender === "User" ? "hidden" : "w-[18px] h-[18px]"
              }`}
            />
            <p className="text-base">{highlightURLs(message.text)}</p>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
      {isTyping && (
        <div className="flex gap-2 pl-1 mt-1">
          <div className="flex gap-2">
            <img
              src={StarChatbotImage}
              alt="StarChatbotImage"
              className="w-[18px] h-[18px] mt-1"
            />
            <p className="pr-0 text-base text-white type">Thinking</p>
          </div>
          <ThinkingIcon />
        </div>
      )}
    </div>
  );
};

export default MessageList;
