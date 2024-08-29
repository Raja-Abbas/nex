import React, { useState, useRef, useCallback, useEffect } from "react";
import Header from "./chatbot/Header";
import { useSelector, useDispatch } from "react-redux";
import { useSlug } from "../context/SlugContext";
import Send from "../assets/svgs/send.svg";
import StarChatbotImage from "../assets/svgs/StarChatbot.svg";
import ThinkingIcon from "../assets/svgs/thinking";
import { useCardTitle } from '../context/CardTitleContext';
import CategoryList from "./chatbot/CategoryList";

import WhiteStarChatbotImage from "../assets/svgs/StarImage.svg";
import DropDownAngle from "../assets/svgs/dropDownAngle.svg";
import EditIcon from "../assets/svgs/editIcon.svg";
import CrossIcon from "../assets/svgs/crossIcon.svg";
import {
  addMessage,
  resetMessages,
  toggleTyping,
  deleteCategory,
  setCategory,  
} from "../redux/chatActions";
export const highlightURLs = (text) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.split(urlRegex).map((part, index) =>
    urlRegex.test(part) ? (
      <a
        key={index}
        href={part}
        className="text-dark-blue underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {part}
      </a>
    ) : (
      part
    )
  );
};
function Chatbot({ onClose }) {
  const [messages, setMessages] = useState(
    () => JSON.parse(localStorage.getItem("chatMessages")) || []
  );
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const dispatch = useDispatch();
  const { cardTitle, setCardTitle } = useCardTitle();
  const { namespace } = useSelector((state) => state.deployment);
  const messagesEndRef = useRef(null);
  const [showList, setShowList] = useState(false);
  const [isSecondMessageShown, setIsSecondMessageShown] = useState(false);
  const [activeConversation, setActiveConversation] = useState(false);
  const isTyping = useSelector((state) => state.chat.isTyping);
  const logsCompleted = useSelector((state) => state.deployment.logsCompleted);
  const categories = useSelector((state) => state.chat.categories);
  useEffect(() => {
    if (logsCompleted && !isSecondMessageShown) {
      showSecondMessage();
    }
  }, [logsCompleted, isSecondMessageShown]);
  
  const { slug } = useSlug();
  const toggleChat = useCallback(() => {
    // Set all messages' typing to false before closing
    const finalMessages = messages.map((msg) =>
      msg.typing ? { ...msg, typing: false } : msg
    );
    setMessages(finalMessages);
    setIsOpen(!isOpen);
    localStorage.setItem("chatMessages", JSON.stringify(finalMessages));
  }, [isOpen, messages]);
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);
  const showSecondMessage = useCallback(() => {
    if (!isSecondMessageShown && !activeConversation) {
      const secondMessage = {
        sender: "Liz",
        text: `Boom! Your app is live now https://${namespace}.${slug}.alpha.nexlayer.ai`,
        timestamp: new Date().toISOString(),
      };
      
      dispatch(toggleTyping(true));

      setTimeout(() => {
        dispatch(addMessage(secondMessage));
        dispatch(toggleTyping(false));
        setIsSecondMessageShown(true);
      }, 2500);
    }
  }, [isSecondMessageShown, dispatch, namespace, slug, activeConversation]);
  const handleMessageSubmit = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "User" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate typing before displaying the bot's message
    dispatch(toggleTyping(true));
    setTimeout(async () => {
        try {
            const response = await fetch(`http://34.111.99.46/chat?prompt=${input}&namespace=${namespace}&deploymentName=${cardTitle}`);
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

            // Add typing effect by updating the message one character at a time
            const typeMessage = () => {
                if (typingIndex < finalResult.length) {
                    typingMessage.text += finalResult.charAt(typingIndex);
                    setMessages((prevMessages) => {
                        return prevMessages.map((msg) =>
                            msg.typing ? typingMessage : msg
                        );
                    });
                    typingIndex++;
                    setTimeout(typeMessage, 25);
                } else {
                    // End typing and display the complete message
                    setMessages((prevMessages) =>
                        prevMessages.map((msg) =>
                            msg.typing ? { ...msg, typing: false } : msg
                        )
                    );
                    setIsLoading(false);
                }
            };

            // Start typing the message after a delay
            setMessages((prevMessages) => [...prevMessages, typingMessage]);
            typeMessage();
        } catch (error) {
            console.error("Failed to fetch messages:", error);
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: "Error fetching response", sender: "Bot" }
            ]);
            setIsLoading(false);
        }
        // Turn off typing indicator after the message is ready to be typed out
        dispatch(toggleTyping(false));
    }, 2000); // Wait 2 seconds before showing the bot's message
};


  const handleToggle = () => {
    setIsOpen((prev) => !prev);
    setShowList((prev) => !prev);
  };

  const handleEditClick = () => {
    dispatch(resetMessages());
    setMessages([]);
    localStorage.removeItem("chatMessages");
    setInput("");
  };
  
  const handleCategoryClick =
    (category) => {
      dispatch(setCategory(category));
      setShowList(false);
    }
    

  const handleDeleteCategory = 
    (id) => {
      dispatch(deleteCategory(id));
    }
    const handleKeyDown =
      (e) => {
        if (e.key === "Enter") {
          handleMessageSubmit();
        }
      }
      

  return (
    <div className="fixed max-md:bottom-[125px] md:bottom-[105px] lg:right-10 right-2 max-md:w-[340px] md:w-[483px] pt-[18px] bg-background border-2 border-[#333636] p-4 rounded-lg shadow-lg z-[100]">
        <div className="flex justify-between items-center mb-[30px]">
      <div className="flex gap-2 cursor-pointer" onClick={handleToggle}>
        <img src={WhiteStarChatbotImage} alt="WhiteStarChatbot" />
        <div className="text-white flex gap-2 items-center">
          <span>Ask Liz</span>
          <img
            className={`transform w-4 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
            src={DropDownAngle}
            alt="Drop Down Angle"
          />
        </div>
      </div>
      <div className="flex gap-[10px]">
        <p className="p-2 px-3 bg-[#333636] bg-opacity-50 text-white text-opacity-70 text-base rounded-[7px]">
          Liz Alpha
        </p>
        <img
          src={EditIcon}
          alt="Edit Icon"
          onClick={handleEditClick}
          className="cursor-pointer p-[6px] min-h-[37px] bg-[#1B1C1C] hover:bg-[#333636] transition-all border-2 border-[#333636] bg-opacity-50 text-white text-opacity-70 text-base rounded-[7px]"
        />
        <img
          src={CrossIcon}
          alt="Close Icon"
          className="cursor-pointer p-1 w-[37px] h-[37px] bg-[#333636] hover:bg-[#1B1C1C] transition-all bg-opacity-50 border-2 border-[#333636] text-white text-opacity-70 text-base rounded-[7px]"
          onClick={onClose}
        />
      </div>
    </div>
      {showList ? (
        <CategoryList
          categories={categories}
          handleCategoryClick={handleCategoryClick}
          handleDeleteCategory={handleDeleteCategory}
          input={input}
          setInput={setInput}
          handleKeyDown={handleKeyDown}
        />
      ) : (
        <>
         <div className="flex flex-col gap-2 pb-2 justify-start overflow-hidden text-base rounded-[7px] max-h-[300px] max-w-max overflow-y-auto">
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
              <p className="text-base">{highlightURLs(msg.text)}</p>
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
      <div className="mt-[30px] overflow-hidden border-2 border-[#333636] flex justify-between items-center bg-[#1b1c1c] rounded-[7px]">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleMessageSubmit();
            }
          }}
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
      </div></>
     )}
    </div>
  );
}

export default Chatbot;
