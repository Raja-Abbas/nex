import React from 'react';
import Globe from "../assets/svgs/globe.svg";
import { deploymentData } from "../constants/Framework";
import NodeJs from "../assets/svgs/node.svg";

const DeploymentDetails = ({ handleMenuClick, toggleBuildPageDetailsHide, selectedCard }) => {
  const [activeMenu, setActiveMenu] = React.useState("Details");

  const menuItems = [
    { key: "Details", text: "Details" },
    { key: "Build", text: "Build" },
    { key: "Deploy", text: "Deploy" },
  ];

  const toggleDetailsVisibility = () => {
    toggleBuildPageDetailsHide();
  };

 
  const defaultCard = {
    logo: NodeJs, 
    title: "Node.js",
  };

  const cardToDisplay = selectedCard || defaultCard;

  return (
    <aside
      id="logo-DeploymentDetails"
      className={`lg:block z-40 h-full flex gap-3 md:gap-8 font-[500] text-lg leading-[30px] flex-col items-start px-5`}
      aria-label="DeploymentDetails"
    >
      <div className="max-lg:w-full">
        <div className="flex justify-between items-center">
          <div className="flex gap-[10px] items-center">
            <img
              width={30}
              height={30}
              src={cardToDisplay.logo}
              alt="Node Icon"
              className="w-auto h-auto"
            />
            <p className="font-normal text-xl text-white">
              {cardToDisplay.title}
            </p>
          </div>
          <p
            className="font-light text-base text-description-color hover:text-[#94949489]  cursor-pointer hover:scale-110 transition-all"
            onClick={toggleDetailsVisibility}
          >
            &#10005;
          </p>
        </div>
        <div className="pt-[15px] flex gap-x-14 items-center">
          <div>
            <label className="font-normal text-tiny text text-light-grey-color">
              Feedback
            </label>
            <p className="w-[53px] py-[1px] font-medium text-base text-center border rounded-full bg-dark-gray border-dark-blue text-dark-blue">
              {deploymentData.feedback}
            </p>
          </div>
          <div>
            <label className="font-normal text-tiny text-light-grey-color">
              Environment
            </label>
            <p className="font-normal text-lg text-white">
              {deploymentData.environment}
            </p>
          </div>
          {/* <div>
            <label className="font-normal text-tiny text-light-grey-color">
              Cluster
            </label>
            <p className="font-normal text-lg text-white">
              {deploymentData.cluster}
            </p>
          </div> */}
        </div>
        <a href={deploymentData.url} target='_blank' rel="noreferrer" className="pt-[15px] w-fit flex gap-[10px] items-center">
          <img src={Globe} alt="Globe Icon" />
          <p className="font-normal text-base text-dark-blue cursor-pointer">
            https://{cardToDisplay.title.toLowerCase()}-3hp0.ondeployx.com
          </p>
        </a>
      </div>

      <div className="flex justify-between items-center">
        <div className="pt-5 flex flex-row items-center pb-3">
          {menuItems.map((item) => (
            <button
              key={item.key}
              className={`px-[15px] py-[5px] mt-0 lg:mt-1 ${
                activeMenu === item.key
                  ? "bg-custom-color text-base h-10 rounded-[5px] text-white"
                  : "bg-transparent "
              }`}
              onClick={() => {
                setActiveMenu(item.key);
                handleMenuClick(item.key);
              }}
            >
              <p
                className={`font-normal text-white ${
                  activeMenu === item.key ? "text-base" : "text-base"
                }`}
              >
                {item.text}
              </p>
            </button>
          ))}
        </div>
        {/* <div onClick={() => {
          setActiveMenu("Star");
          handleMenuClick("Star");
        }}>
          <img
            src={StarSVG}
            alt="Star Icon"
            className={`px-[15px] py-2 mt-4 cursor-pointer
              ${activeMenu === "Star"
                ? "bg-custom-color text-base rounded-[5px] text-white"
                : "bg-transparent "
              }`}
          />
        </div> */}
      </div>
    </aside>
  );
};

export default DeploymentDetails;
