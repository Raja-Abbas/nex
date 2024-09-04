import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import DropDownAngle from "../assets/svgs/dropDownAngle.svg";
import LiveLogsLogo from "../assets/svgs/liveLogsLogo.svg";
import ClockIcon from "../assets/svgs/clockIcon.svg";
import Tick from "../assets/svgs/tick.svg";
import DoubleArrow from "../assets/svgs/doubleArrow.svg";
import { PuffLoader } from "react-spinners";
import Highlighter from "react-highlight-words";
import { useCardTitle } from "../context/CardTitleContext";

const colors = {
  dateInfo: "#7FB7D9",
  plusInfo: "#FFFFBC",
  default: "#FFBDFF",
};

const getCurrentTime = () => {
  const now = new Date();
  const utcDate = now.toISOString(); // Get UTC time in ISO 8601 format
  const formattedDate = utcDate.replace('T', ' ').slice(0, 19); // Format: YYYY-MM-DD HH:MM:SS
  return `${formattedDate} UTC info :`;
};

export default function BuildTabSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Live Logs");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [activeSearchIndex, setActiveSearchIndex] = useState(0);
  const { cardTitle } = useCardTitle();
  const deploymentName = cardTitle;
  const logsData = useSelector((state) => state.deployment.logsData);
  const error = useSelector((state) => state.deployment.error);
  const loading = useSelector((state) => state.deployment.loading);

  const endOfLogRef = useRef(null);
  const searchRef = useRef(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option, index) => {
    if (index <= 1) {
      setSelectedOption(option);
      setIsOpen(false);
    }
  };

  const options = [
    "Live Logs",
    "Last hour",
    "Last 4 hours",
    "Last 24 hours",
    "Last 2 days",
    "Last 7 days",
    "Last 14 days",
    "Last 30 days",
    "Custom",
  ];
  useEffect(() => {
    if (endOfLogRef.current) {
      endOfLogRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [endOfLogRef]);

  const scrollToActiveSearchResult = useCallback(() => {
    if (searchResults.length > 0 && searchRef.current) {
      searchRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    }
  }, [searchResults.length, searchRef]);

  useEffect(() => {
    if (searchTerm) {
      const results = logsData
        .map((line, index) => (line.toLowerCase().includes(searchTerm.toLowerCase()) ? index : -1))
        .filter(index => index !== -1);
      setSearchResults(results);
      if (results.length > 0) {
        setActiveSearchIndex(0);
        scrollToActiveSearchResult();
      }
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, logsData, scrollToActiveSearchResult]);

  useEffect(() => {
    if (searchResults.length > 0) {
      scrollToActiveSearchResult();
    }
  }, [activeSearchIndex, searchResults, scrollToActiveSearchResult]);

  if (error) {
    return <p className="p-10 text-white">Error: {error}</p>;
  }



  const logMessages = [
    `${getCurrentTime()} Retrieving template ${deploymentName}...`,
    `${getCurrentTime()} Template retrieved`,
  ];

  return (
    <div className="max-w-[100%] max-h-[calc(100vh-462px)] max-lg:max-h-screen xl:max-w-[100%] 2xl:max-w-[100%] p-5 overflow-y-auto scrollbar">
      <div className="flex gap-2 items-center sticky top-[-20px] bg-medium-grey-color h-[3rem]">
        <input
          className="w-full h-8 p-[10px] py-[6.5px] text-white font-normal text-tiny border-[2px] rounded-[7px] border-dark-gray bg-background"
          type="search"
          placeholder="Natural language search....."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="relative max-[440px]:w-[270px] w-60 xl:w-56">
          <div
            className="px-1 sm:px-[10px] h-8 bg-gray-800 text-white cursor-pointer flex justify-between items-center border-[2px] rounded-[7px] border-dark-gray bg-background"
            onClick={handleToggle}
          >
            <div className="flex gap-1 sm:gap-3 items-center">
              <img src={LiveLogsLogo} alt="Live Logs" />
              <span className="font-normal text-tiny">{selectedOption}</span>
            </div>
            <img
              className={`transform transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
              src={DropDownAngle}
              alt="Drop Down Angle"
            />
          </div>
          {isOpen && (
            <div className="absolute z-10 w-full border-[2px] border-dark-gray bg-background rounded-[7px] mt-[2px] shadow-lg">
              {options.map((option, index) => (
                <div
                  key={index}
                  className={`mt-[2px] p-[4px] flex justify-between items-center rounded-[7px] mx-[2px] ${
                    index > 1
                      ? "cursor-not-allowed opacity-50"
                      : "cursor-pointer hover:bg-[#1a393d]"
                  } ${selectedOption === option && "bg-[#1a393d] rounded-[7px] mx-[2px]"}`}
                  onClick={() => handleOptionClick(option, index)}
                >
                  <div className="flex gap-2">
                    <img
                      className="w-[17px] h-[17px]"
                      src={ClockIcon}
                      alt="Clock Icon"
                    />
                    <p className="font-normal text-sm text-white opacity-90">
                      {option}
                    </p>
                  </div>
                  {selectedOption === option && (
                    <img
                      className="pb-1 w-[16px] h-[16px]"
                      src={Tick}
                      alt="Tick"
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="px-4 py-[10px] sm:py-[6.5px] border-[2px] rounded-[7px] border-dark-gray bg-background cursor-pointer">
          <img src={DoubleArrow} alt="Double Arrow" />
        </div>
      </div>

      <div className={`pt-[30px] bg-gray-900 font-mono`}>
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <PuffLoader color="#00aeff" size={60} />
          </div>
        ) : (
          <pre className="text-white">
            {logMessages.length > 0 ? (
              logMessages.map((message, index) => (
                <div
                  key={index}
                  ref={
                    searchResults.includes(index) &&
                    index === searchResults[activeSearchIndex]
                      ? searchRef
                      : null
                  }
                  className="text-wrap py-1 text-[14px]"
                  style={{ color: colors.default }}
                >
                  <Highlighter
                    highlightClassName="bg-yellow-500"
                    searchWords={[searchTerm]}
                    autoEscape={true}
                    textToHighlight={message}
                  />
                </div>
              ))
            ) : (
              <div className="text-gray-500">No logs to display.</div>
            )}
            <div ref={endOfLogRef} />
          </pre>
        )}
      </div>
    </div>
  );
}
