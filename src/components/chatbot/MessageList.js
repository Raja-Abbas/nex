import React, { useState, useEffect } from "react";
import StarChatbotImage from "../../assets/svgs/StarChatbot.svg";
import ThinkingIcon from "../../assets/svgs/thinking";
import { highlightURLs } from "../../utils/chatUtils";
import { useSlug } from "../../context/SlugContext";
import { useSelector } from "react-redux";

const typingSpeed = 25;

const MessageList = ({ filteredMessages, isTyping, messagesEndRef }) => {
  const [displayedMessages, setDisplayedMessages] = useState([]);
  const [messageIndex, setMessageIndex] = useState(0);
  const [completedTyping, setCompletedTyping] = useState(false);
  const { namespace } = useSelector((state) => state.deployment);
  const { slug } = useSlug();

  useEffect(() => {
    const storedMessages =
      JSON.parse(localStorage.getItem("displayedMessages")) || [];
    setDisplayedMessages(storedMessages);
    const storedIndex = localStorage.getItem("messageIndex") || 0;
    setMessageIndex(Number(storedIndex));
  }, []);

  useEffect(() => {
    setDisplayedMessages([]);
    setMessageIndex(0);
    localStorage.removeItem("displayedMessages");
    localStorage.removeItem("messageIndex");
  }, [namespace, slug]);

  useEffect(() => {
    const typeMessage = (message) => {
      setCompletedTyping(false);

      let i = 0;
      const stringResponse = message.text;

      const intervalId = setInterval(() => {
        setDisplayedMessages((prevMessages) => {
          const updatedMessages = [...prevMessages];
          updatedMessages[updatedMessages.length - 1].text =
            stringResponse.slice(0, i);
          return updatedMessages;
        });

        i++;

        if (i > stringResponse.length) {
          clearInterval(intervalId);
          setCompletedTyping(true);
        }
      }, typingSpeed);
    };

    const typeMessages = async () => {
      if (filteredMessages.length === 0) return;

      setCompletedTyping(false);

      for (let i = messageIndex; i < filteredMessages.length; i++) {
        const message = filteredMessages[i];

        if (!message.text.trim()) continue;

        const isDuplicate = displayedMessages.some(
          (msg) => msg.text === message.text && msg.sender === message.sender
        );

        if (!isDuplicate) {
          setDisplayedMessages((prevMessages) => [
            ...prevMessages,
            { ...message },
          ]);

          typeMessage(message);
          setMessageIndex(i + 1);

          localStorage.setItem(
            "displayedMessages",
            JSON.stringify([...displayedMessages, { ...message }])
          );
          localStorage.setItem("messageIndex", i + 1);

          while (!completedTyping) {
            await new Promise((resolve) => setTimeout(resolve, typingSpeed));
          }
        }
      }
    };

    typeMessages();

    return () => clearInterval(typingSpeed);
  }, [filteredMessages, messageIndex, completedTyping, displayedMessages]);

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
            <p className="pr-0 text-base text-white">Thinking</p>
          </div>
          <ThinkingIcon />
        </div>
      )}
    </div>
  );
};

export default MessageList;
