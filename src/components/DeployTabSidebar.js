import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLogsCompleted } from "../redux/chatActions"; // Import the action
import DropDownAngle from "../assets/svgs/dropDownAngle.svg";
import LiveLogsLogo from "../assets/svgs/liveLogsLogo.svg";
import ClockIcon from "../assets/svgs/clockIcon.svg";
import Tick from "../assets/svgs/tick.svg";
import DoubleArrow from "../assets/svgs/doubleArrow.svg";
import { PuffLoader } from "react-spinners";
import Highlighter from "react-highlight-words";

const colors = {
  dateInfo: "#7FB7D9",
  plusInfo: "#FFFFBC",
  default: "#FFBDFF",
};

export default function DeployTabSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Live Logs");
  const [displayedData, setDisplayedData] = useState([]);
  const [, setExistingLines] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [activeSearchIndex, setActiveSearchIndex] = useState(0);
  const logsData = useSelector((state) => state.deployment.logsData);
  const error = useSelector((state) => state.deployment.error);
  const loading = useSelector((state) => state.deployment.loading);
  const logsCompleted = useSelector((state) => state.chat.logsCompleted);
  const dispatch = useDispatch();
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
    if (logsData) {
      const lines = Array.isArray(logsData) ? logsData : logsData.split("\n");
      setDisplayedData(lines);
      setExistingLines(new Set(lines));

      if (lines.some((line) => line.includes("Deployment Complete"))) {
        dispatch(setLogsCompleted(true));
      } else {
        dispatch(setLogsCompleted(false));
      }
    }
  }, [logsData, dispatch]);

  useEffect(() => {
    if (endOfLogRef.current) {
      endOfLogRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [displayedData]);

  useEffect(() => {
    if (searchTerm) {
      const results = displayedData
        .map((line, index) =>
          line.toLowerCase().includes(searchTerm.toLowerCase()) ? index : -1
        )
        .filter((index) => index !== -1);
      setSearchResults(results);
      if (results.length > 0) {
        setActiveSearchIndex(0);
        scrollToActiveSearchResult();
      }
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, displayedData]);

  useEffect(() => {
    if (searchResults.length > 0) {
      scrollToActiveSearchResult();
    }
  }, [activeSearchIndex, searchResults]);

  const scrollToActiveSearchResult = () => {
    if (searchResults.length > 0 && searchRef.current) {
      searchRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    }
  };

  if (error) {
    return <p className="p-10 text-white">Error: {error}</p>;
  }

  const getLineColor = (line) => {
    const dateRegex = /^\d{1,4}[\/\-]\d{1,2}[\/\-]\d{1,4}/;
    if (dateRegex.test(line)) {
      return colors.dateInfo;
    } else if (line.startsWith("[+]")) {
      return colors.plusInfo;
    } else {
      return colors.default;
    }
  };

  const handleSearchNavigation = (direction) => {
    if (searchResults.length === 0) return;

    let newIndex = activeSearchIndex + direction;
    if (newIndex < 0) {
      newIndex = searchResults.length - 1;
    } else if (newIndex >= searchResults.length) {
      newIndex = 0;
    }
    setActiveSearchIndex(newIndex);
  };

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
                  } ${
                    selectedOption === option &&
                    "bg-[#1a393d] rounded-[7px] mx-[2px]"
                  }`}
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
            <PuffLoader color="#00aeff" />
          </div>
        ) : (
          <>
            <div>
              {displayedData.map((line, index) => (
                <div
                  key={index}
                  ref={index === activeSearchIndex ? searchRef : null}
                  className={`whitespace-pre-line text-[10px] md:text-xs lg:text-sm text-white leading-relaxed ${
                    index === activeSearchIndex ? "bg-[#00aeff]" : ""
                  }`}
                  style={{ color: getLineColor(line) }}
                >
                  <Highlighter
                    highlightClassName="highlight"
                    searchWords={[searchTerm]}
                    autoEscape={true}
                    textToHighlight={line}
                  />
                </div>
              ))}
              <div ref={endOfLogRef} />
            </div>
          </>
        )}
      </div>

      {logsCompleted && (
        <div className="bg-[#1e1e1e] mt-5 text-[#40a348] font-normal text-[10px] md:text-xs lg:text-sm border-[#40a348] border-2 px-[10px] py-2 rounded-md">
          Congratulations! Deployment Completed Successfully.
        </div>
      )}
    </div>
  );
}
