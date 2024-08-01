// src/components/StartYourProject.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TemplateSideLayout from "./layouts/TemplateSideLayout";
import HomeSvg from "../assets/svgs/homeSvg.svg";
import GithubSvg from "../assets/svgs/githubLogo.svg";
import GridSvg from "../assets/svgs/gridLogo.svg";
import ArrowRightSvg from "../assets/svgs/arrowRight.svg";
import Modal from "./common/Modal";
import ModalGithubDeployment from "./GithubDeploymentModal";

const StartProject = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const navigate = useNavigate();

  const handleTemplateClick = (content) => {
    setModalContent(content);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalContent(null);
  };

  const handleCardSelect = (card) => {
    navigate("/build", { state: { selectedCard: card } });
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-900 text-white h-full w-full">
      <div className="text-center mb-[30px]">
        <div className="flex justify-center mb-[10px]">
          <div className="bg-blue-600 p-4 rounded-full">
            <img src={HomeSvg} alt="HomeSvg" className="w-[80px] h-[80px]" />
          </div>
        </div>
        <h1 className="text-4xl leading-[150%] font-bold">
          Start your project
        </h1>
        <p className="mt-[30px] text-xl text-description-color leading-[24px]">
          Deploy an app to join the waitlist and get $100 innovator credits!
        </p>
      </div>
      <div className="flex max-lg:flex-col max-lg:space-y-4 lg:space-x-4">
        <button
          className="flex items-center justify-between px-2 py-2 md:min-w-[304px] bg-medium-gray hover:bg-blue-700 border border-light-grey-color rounded-[7px]"
          onClick={() => handleTemplateClick("github")}
        >
          <div className="flex text-base gap-2 items-center">
            <img
              src={GithubSvg}
              alt="GithubSvg"
              className="w-[24px] h-[24px]"
            />
            Deploy a public GitHub project
          </div>
          <img
            src={ArrowRightSvg}
            alt="ArrowRightSvg"
            className="w-[24px] h-[24px]"
          />
        </button>
        <button
          className="flex gap-2 items-center justify-between px-2 py-2 md:min-w-[304px] bg-medium-gray hover:bg-blue-700 border border-light-grey-color rounded-[7px]"
          onClick={() => handleTemplateClick("template")}
        >
          <div className="flex text-base gap-2 items-center">
            <img src={GridSvg} alt="GridSvg" />
            Start with a Template
          </div>
          <img src={ArrowRightSvg} alt="ArrowRightSvg" />
        </button>
      </div>

      <Modal isOpen={showModal} onClose={handleCloseModal}>
        {modalContent === "github" ? (
          <div>
            <ModalGithubDeployment />
          </div>
        ) : (
          <div className="lg:w-[80vw] lg:h-[80vh]">
            <div>
              <TemplateSideLayout onCardSelect={handleCardSelect} />
            </div>
          </div>
        )}
      </Modal>
      {/* <ChatBotIcon/> */}
    </div>
  );
};

export default StartProject;
