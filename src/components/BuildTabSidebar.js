import React, { useState, useEffect } from "react";
import { BuildlogsData } from "../constants/Framework";
import DropDownAngle from "../assets/svgs/dropDownAngle.svg";
import LiveLogsLogo from "../assets/svgs/liveLogsLogo.svg";
import ClockIcon from "../assets/svgs/clockIcon.svg";
import Tick from "../assets/svgs/tick.svg";
import DoubleArrow from "../assets/svgs/doubleArrow.svg";

export default function BuildTabSidebar({ logs }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Live Logs");
  const [currentIndex, setCurrentIndex] = useState(0);

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
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const newIndex = prevIndex + 1;
        if (newIndex <= BuildlogsData.length) {
          return newIndex;
        } else {
          clearInterval(interval);
          return prevIndex;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [logs]);

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
                      alt="CLock Icon"
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

      <div
        className={`pt-[30px] bg-gray-900 font-mono overflow-y-auto h-screen scrollbar`}
      >
        {BuildlogsData.slice(0, currentIndex).map((log, index) => (
          <div
            key={index}
            className="font-medium text-base leading-7 flex"
            style={{
              color:
                log.type === "error"
                  ? "#FFBDFF"
                  : log.type === "success"
                  ? "#7FB7D9"
                  : log.type === "warning"
                  ? "#FFFFBC"
                  : "7FB7D9",
            }}
          >
            <span className="w-[35px] text-light-gray">{`${index + 1}.`}</span>
            <div className="overflow-x-auto scrollbar lg:w-[600px]">
            {log.timestamp ? `${log.timestamp} - ` : ""}
            {log.message}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
