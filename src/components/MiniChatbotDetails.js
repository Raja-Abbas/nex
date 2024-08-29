import React, { useState, useRef, useCallback, useEffect } from "react";
import Header from "./chatbot/Header";
import { useSelector, useDispatch } from "react-redux";
import { useSlug } from "../context/SlugContext";
import { useCardTitle } from "../context/CardTitleContext";
import ChatBotComponentImage from "../assets/images/ChatbotImage.png";
import Send from "../assets/svgs/send.svg";
import StarChatbotImage from "../assets/svgs/StarChatbot.svg";
import ThinkingIcon from "../assets/svgs/thinking";
import {
  addMessage,
  resetMessages,
  toggleTyping,
  setCategory,
  deleteCategory,
  fetchMessages,
} from "../redux/chatActions";

function Chatbot({ onClose, isTyping }) {
  const [messages, setMessages] = useState(
    () => JSON.parse(localStorage.getItem("chatMessages")) || []
  );
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const dispatch = useDispatch();
  const { namespace } = useSelector((state) => state.deployment);
  const messagesEndRef = useRef(null);
  const [showList, setShowList] = useState(false);

  const toggleChat = useCallback(() => {
    setIsOpen(!isOpen);
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [isOpen, messages]);

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  const handleMessageSubmit = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "User" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(
        `http://34.111.99.46/chat?prompt=${encodeURIComponent(
          input
        )}&namespace=yourNamespace&deploymentName=yourDeploymentName`
      );
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let finalResult = "";

      while (true) {
        const { done, value } = await reader.read();
        finalResult += decoder.decode(value, { stream: true });
        if (done) {
          break;
        }
      }

      let typingIndex = 0;
      let typingMessage = { text: "", sender: "Bot", typing: true };
      const typeMessage = () => {
        if (typingIndex < finalResult.length) {
          typingMessage.text += finalResult.charAt(typingIndex);
          setMessages((prevMessages) => {
            return prevMessages.map((msg) =>
              msg.typing ? typingMessage : msg
            );
          });
          typingIndex++;
          setTimeout(typeMessage, 50);
        } else {
          setMessages((prevMessages) =>
            prevMessages.map((msg) =>
              msg.typing ? { ...msg, typing: false } : msg
            )
          );
          setIsLoading(false);
        }
      };

      setMessages((prevMessages) => [...prevMessages, typingMessage]);
      typeMessage();
    } catch (error) {
      console.error("Failed to fetch messages:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Error fetching response", sender: "Bot" },
      ]);
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return <button onClick={toggleChat}>Open Chat</button>;
  }
  const handleToggle = () => {
    setIsOpen((prev) => !prev);
    setShowList((prev) => !prev);
  };

  const handleEditClick = () => {
    dispatch(resetMessages());
    setInput("");
  };

  return (
    <div className="fixed max-md:bottom-[125px] md:bottom-[105px] lg:right-10 right-2 max-md:w-[340px] md:w-[483px] pt-[18px] bg-background border-2 border-[#333636] p-4 rounded-lg shadow-lg z-[100]">
      <Header
        isOpen={isOpen}
        handleToggle={handleToggle}
        handleEditClick={handleEditClick}
        onClose={onClose}
      />
      <div className="flex flex-col gap-2 justify-start overflow-hidden text-base rounded-[7px] max-h-[300px] max-w-max overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex fade-in md:w-[447px] ${
              msg.sender === "User" ? "justify-end" : "justify-start"
            } pr-8`}
          >
            <div
              className={`flex gap-2 max-w-full p-2 rounded-[7px] ${
                msg.sender === "User"
                  ? "bg-[#333636] text-white items-center"
                  : "text-white flex"
              }`}
            >
              <img
                src={StarChatbotImage}
                alt="StarChatbotImage"
                className={`${
                  msg.sender === "User" ? "hidden" : "w-[18px] h-[18px]"
                }`}
              />
              <p className="text-base">{msg.text}</p>
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
      <div className="p-2 border-t border-gray-200 flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="py-[12px] text-white pl-[15px] font-normal text-tiny border-none w-full outline-none focus:border-none focus:outline-none placeholder:text-description-color bg-[#1b1c1c]"
        />
        <img
          src={Send}
          alt="Send Icon"
          className={`pr-[15px] cursor-pointer ${
            isLoading ? "opacity-50" : ""
          }`}
          onClick={handleMessageSubmit}
          disabled={isLoading}
        />
      </div>
    </div>
  );
}

export default Chatbot;
