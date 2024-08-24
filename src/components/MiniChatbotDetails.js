import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import StarChatbotImage from "../assets/svgs/StarChatbot.svg";
import WhiteStarChatbotImage from "../assets/svgs/StarImage.svg";
import Send from "../assets/svgs/send.svg";
import DropDownAngle from "../assets/svgs/dropDownAngle.svg";
import EditIcon from "../assets/svgs/editIcon.svg";
import CrossIcon from "../assets/svgs/crossIcon.svg";
import CommentIcon from "../assets/svgs/commentIcon.svg";
import Avatar from "../assets/images/avatar.png";
import PaperClipIcon from "../assets/svgs/paperclip.svg";
import ThinkingIcon from "../assets/svgs/thinking";
import Trash from "../assets/svgs/trash.svg";
import { addMessage, resetMessages, toggleTyping, setCategory, deleteCategory, fetchMessages } from "../redux/chatActions";
import { useCardTitle } from '../context/CardTitleContext';

const getTimeCategory = (timestamp) => {
  const now = new Date();
  const messageDate = new Date(timestamp);
  const diffDays = Math.floor((now - messageDate) / (1000 * 60 * 60 * 24));

  if (diffDays < 1) return "Today";
  if (diffDays < 7) return "Last Week";
  if (diffDays < 30) return "Past 30 Days";
  return "Older";
};

const MiniChatbotDetails = ({ onClose }) => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const isTyping = useSelector((state) => state.chat.isTyping);
  const selectedCategory = useSelector((state) => state.chat.selectedCategory);
  const categories = useSelector((state) => state.chat.categories);
  const namespace = useSelector((state) => state.deployment.namespace);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [showList, setShowList] = useState(false);
  const { cardTitle, setCardTitle } = useCardTitle();
  const messagesEndRef = useRef(null);

  const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;

    return `${hours}:${minutes} ${ampm}`;
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(formatTime(now));
    };
    updateTime();
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      const newMessage = {
        sender: "User",
        text: input,
        timestamp: new Date().toISOString(),
      };
      dispatch(addMessage(newMessage));
      setInput("");
      dispatch(toggleTyping(true));
      dispatch(fetchMessages(input, namespace, cardTitle));
      setTimeout(() => {
        dispatch(toggleTyping(false));
      }, 1500);
    }
  };


  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
    setShowList(!showList);
  };

  const handleCategoryClick = (category) => {
    dispatch(setCategory(category));
    setShowList(false);
  };

  const filteredMessages = messages.filter(
    (message) => getTimeCategory(message.timestamp) === selectedCategory
  );

  const handleEditClick = () => {
    dispatch(resetMessages());
    setInput("");
  };

  const handleDeleteCategory = (id) => {
    dispatch(deleteCategory(id));
  };

  return (
    <div className="fixed max-md:bottom-[125px] md:bottom-[105px] lg:right-10 right-2 max-md:w-[340px] md:w-[483px] pt-[18px] bg-background border-2 border-[#333636] p-4 rounded-lg shadow-lg z-[10000]">
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
        <div className="flex flex-col items-start gap-[30px]">
          <input
            type="text"
            placeholder="Search or start new chat"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="py-[12px] text-white pl-[15px] font-normal border-2 border-[#333636] rounded-[7px] text-tiny w-full outline-none focus:outline-none placeholder:text-description-color bg-[#1b1c1c]"
          />
          <div className="flex flex-col gap-[30px] max-h-[300px] w-full overflow-y-auto">
            {categories.map((category) => (
              <div
                key={category.name}
                className="flex justify-between items-center"
                onClick={() => handleCategoryClick(category.name)}
              >
                <button className="p-1 w-full text-left">
                  <span className="text-white text-opacity-40 text-base">
                    {category.name}
                  </span>
                  {category.messages.map((msg, index) => (
                    <div
                      key={index}
                      className="flex justify-between mt-[11px] pr-2"
                    >
                      <div
                        className="flex gap-[9.5px]"
                      >
                        <img src={CommentIcon} alt="Comment Icon" />
                        <div className="flex flex-col gap-1">
                          <div className="flex gap-[10px] items-start">
                            <p className="text-white text-lg">Greeting Liz</p>
                            <p className="text-white text-opacity-40 text-base">
                              {msg.time}
                            </p>
                          </div>
                          <p className="text-white text-opacity-70 text-base">
                            {msg.text}
                          </p>
                        </div>
                      </div>
                      <img
                        src={Trash}
                        alt="Trash"
                        className="hover:opacity-50 transition-all cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteCategory(category.id);
                        }}
                      />
                    </div>
                  ))}
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="mb-[30px] text-white text-base text-center text-opacity-40">
            Today {currentTime}
          </div>
          <div className="text-white text-base text-center mb-[10px]"></div>
          <div className="p-2">
          <div className="flex flex-col gap-2 justify-start text-base rounded-[7px] max-h-[300px] max-w-max overflow-y-auto">
              {filteredMessages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.sender === "User" ? "justify-end" : "justify-start"} pr-8`}
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
                      className={`${message.sender === "User" ? "hidden" : "w-[18px] h-[18px]"}`}
                      
                    />
                     <img
                      src={Avatar}
                      alt="Avatar"
                      className={`${message.sender === "User" ? "w-[30px] h-[30px] mr-[4.5px]" : "hidden"}`}
                      
                    />
                    <p className="text-base">{message.text}</p>
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
                  <ThinkingIcon/>
                </div>
              )}
            </div>
            <div className="mt-[30px] overflow-hidden border-2 border-[#333636] flex justify-between items-center bg-[#1b1c1c] rounded-[7px]">
              <input
                type="text"
                placeholder="How can I help you?"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="py-[12px] text-white pl-[15px] font-normal text-tiny border-none w-full outline-none focus:border-none focus:outline-none placeholder:text-description-color bg-[#1b1c1c]"
              />
              <img
                className="pr-[15px] cursor-pointer"
                src={Send}
                alt="Send Icon"
                onClick={handleSend}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MiniChatbotDetails;
