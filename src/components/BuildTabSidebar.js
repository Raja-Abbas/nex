import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import DropDownAngle from "../assets/svgs/dropDownAngle.svg";
import LiveLogsLogo from "../assets/svgs/liveLogsLogo.svg";
import ClockIcon from "../assets/svgs/clockIcon.svg";
import Tick from "../assets/svgs/tick.svg";
import DoubleArrow from "../assets/svgs/doubleArrow.svg";
import { fetchLogsData } from "../redux/deploymentSlice";

const colors = {
  dateInfo: "#7FB7D9",
  plusInfo: "#FFFFBC",
  default: "#FFBDFF"
};

export default function BuildTabSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Live Logs");
  const [displayedData, setDisplayedData] = useState([]);
  const [delayedLines, setDelayedLines] = useState(new Set());

  const namespace = useSelector((state) => state.deployment.namespace);
  const templateID = useSelector((state) => state.deployment.templateID);
  const logsData = useSelector((state) => state.deployment.logsData);
  const isLogsFetched = useSelector((state) => state.deployment.isLogsFetched);
  const error = useSelector((state) => state.deployment.error);

  const dispatch = useDispatch();
  const logsProcessed = useRef(false);
  const dataFetched = useRef(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const options = [
    "Live tail",
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
    if (namespace && templateID && !isLogsFetched[namespace] && !dataFetched.current) {
      dispatch(fetchLogsData({ namespace, templateID }));
      dataFetched.current = true;  // Set the flag to true after dispatch
    }
  }, [namespace, templateID, dispatch, isLogsFetched, dataFetched]);

  useEffect(() => {
    if (logsData) {
      const lines = Array.isArray(logsData) ? logsData : logsData.split("\n");

      if (!logsProcessed.current) {
        let delay = 0;
        lines.forEach((line, index) => {
          if (!delayedLines.has(line)) {
            setTimeout(() => {
              setDisplayedData((prevDisplayedData) => [
                ...prevDisplayedData,
                line,
              ]);
              if (index === lines.length - 1) {
                logsProcessed.current = true;
              }
              setDelayedLines((prev) => new Set(prev.add(line)));
            }, delay);
            delay += 0;
          } else {
            setDisplayedData((prevDisplayedData) => [
              ...prevDisplayedData,
              line,
            ]);
          }
        });
      } else {
        setDisplayedData((prevDisplayedData) => [
          ...prevDisplayedData,
          ...lines.filter((line) => !prevDisplayedData.includes(line)),
        ]);
      }
    }
  }, [logsData]);

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

  return (
    <div className="max-w-[100%] xl:max-w-[100%] 2xl:max-w-[100%] p-5 overflow-y-auto scrollbar">
      <div className="flex gap-2 items-center">
        <input
          className="w-full h-8 p-[10px] py-[6.5px] text-white font-normal text-tiny border-[2px] rounded-[7px] border-dark-gray bg-background"
          type="search"
          placeholder="Natural language search....."
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
                  className={`mt-[2px] p-2 flex justify-between items-center rounded-[7px] mx-[2px] cursor-pointer hover:bg-[#1a393d] ${
                    selectedOption === option
                      ? "bg-[#1a393d] rounded-[7px] mx-[2px]"
                      : ""
                  }`}
                  onClick={() => handleOptionClick(option)}
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

      <div className={`pt-[30px] bg-gray-900 font-mono overflow-y-auto h-screen scrollbar`}>
        <pre className="text-white">
          {displayedData.map((line, index) => (
            <div
              key={index}
              className="flex gap-0 text-wrap py-1 text-[14px]"
              style={{ color: getLineColor(line) }}
            >
              <span className="min-w-[30px] text-light-gray mr-2">
                {`${index + 1}.`}
              </span>
              <span>{line}</span>
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}
