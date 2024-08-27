import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addMessage,
  resetMessages,
  toggleTyping,
  setCategory,
  deleteCategory,
  fetchMessages,
  setLogsCompleted // Import the action
} from "../redux/chatActions";
import { useCardTitle } from "../context/CardTitleContext";
import Header from "./chatbot/Header";
import MessageList from "./chatbot/MessageList";
import InputArea from "./chatbot/InputArea";
import CategoryList from "./chatbot/CategoryList";
import { getTimeCategory, removeDuplicateMessages } from "../utils/chatUtils";
import { useSlug } from "../context/SlugContext";

const MiniChatbotDetails = ({ onClose }) => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const isTyping = useSelector((state) => state.chat.isTyping);
  const selectedCategory = useSelector((state) => state.chat.selectedCategory);
  const categories = useSelector((state) => state.chat.categories);
  const logsCompleted = useSelector((state) => state.chat.logsCompleted);
  const { namespace } = useSelector((state) => state.deployment);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [showList, setShowList] = useState(false);
  const { cardTitle } = useCardTitle();
  const messagesEndRef = useRef(null);
  const [initialGreeting, setInitialGreeting] = useState(false);
  const [dispatchedMessages, setDispatchedMessages] = useState(new Set());
  const { slug } = useSlug();

  const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? 12 : hours;
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

  useEffect(() => {
    if (initialGreeting) return;

    const greetAndAskForURL = async () => {
      dispatch(toggleTyping(true));

      const greetingMessage = {
        sender: "Liz",
        text: "Hey there, I'm Liz",
        timestamp: new Date().toISOString(),
      };

      // Add the first message
      if (!messages.some((msg) => msg.text === greetingMessage.text)) {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        dispatch(addMessage(greetingMessage));
        setInitialGreeting(true);
        dispatch(toggleTyping(false));
      }
    };

    greetAndAskForURL();
  }, [initialGreeting, dispatch, namespace, cardTitle]);

  useEffect(() => {
    if (logsCompleted) {
      const secondMessage = {
        sender: "Liz",
        text: `Boom! Your app is live now https://${namespace}.${slug}.alpha.nexlayer.ai`,
        timestamp: new Date().toISOString(),
      };

      // Check if the second message is not already in the messages
      if (!messages.some((msg) => msg.text === secondMessage.text)) {
        dispatch(addMessage(secondMessage));
      }
      dispatch(toggleTyping(false));
    }
  }, [logsCompleted, dispatch, namespace, slug, messages]);

  useEffect(() => {
    if (isOpen && logsCompleted) {
      const secondMessage = {
        sender: "Liz",
        text: `Boom! Your app is live now https://${namespace}.${slug}.alpha.nexlayer.ai`,
        timestamp: new Date().toISOString(),
      };

      if (!messages.some((msg) => msg.text === secondMessage.text)) {
        dispatch(addMessage(secondMessage));
      }
    }
  }, [isOpen, logsCompleted, dispatch, namespace, slug, messages]);

  const handleSend = useCallback(() => {
    if (input.trim()) {
      const newMessage = {
        sender: "User",
        text: input,
        timestamp: new Date().toISOString(),
      };

      dispatch(addMessage(newMessage));
      setDispatchedMessages((prev) => new Set(prev).add(input));
      setInput("");
      dispatch(toggleTyping(true));
      dispatch(fetchMessages(input, namespace, cardTitle));
      setTimeout(() => {
        dispatch(toggleTyping(false));
      }, 2500);
    }
  }, [input, namespace, cardTitle, dispatch]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") {
        handleSend();
      }
    },
    [handleSend]
  );

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
    setShowList((prev) => !prev);
  }, []);

  const handleCategoryClick = useCallback(
    (category) => {
      dispatch(setCategory(category));
      setShowList(false);
    },
    [dispatch]
  );

  const filteredMessages = useMemo(
    () =>
      removeDuplicateMessages(messages).filter(
        (message) => getTimeCategory(message.timestamp) === selectedCategory
      ),
    [messages, selectedCategory]
  );

  const handleEditClick = useCallback(() => {
    dispatch(resetMessages());
    setInput("");
  }, [dispatch]);

  const handleDeleteCategory = useCallback(
    (id) => {
      dispatch(deleteCategory(id));
    },
    [dispatch]
  );

  return (
    <div className="fixed max-md:bottom-[125px] md:bottom-[105px] lg:right-10 right-2 max-md:w-[340px] md:w-[483px] pt-[18px] bg-background border-2 border-[#333636] p-4 rounded-lg shadow-lg z-[100]">
      <Header
        isOpen={isOpen}
        handleToggle={handleToggle}
        handleEditClick={handleEditClick}
        onClose={onClose}
      />
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
          <div className="mb-[30px] text-white text-base text-center text-opacity-40">
            Today {currentTime}
          </div>
          <MessageList
            filteredMessages={filteredMessages}
            isTyping={isTyping}
            messagesEndRef={messagesEndRef}
          />
          <InputArea
            input={input}
            setInput={setInput}
            handleSend={handleSend}
            handleKeyDown={handleKeyDown}
          />
        </>
      )}
    </div>
  );
};

export default React.memo(MiniChatbotDetails);
