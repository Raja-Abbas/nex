// src/pages/BuildPage.js
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import GithubDeployment from "../components/GithubDeployment";
import DeploymentDetailsLayout from "../components/DeploymentDetailsLayout";
import ChatBotComponent from "../components/ChatBotComponent";

export default function BuildPage() {
  const [showDeploymentDetails, setShowDeploymentDetails] = useState(false);
  const location = useLocation();
  const { selectedCard } = location.state || {};

  const toggleBuildPageDetails = () => {
    setShowDeploymentDetails(true);
  };

  const toggleBuildPageDetailsHide = () => {
    setShowDeploymentDetails(false);
  };

  return (
    <div
      className={`grid max-lg:px-4 w-full max-lg:h-full lg:h-auto scrollbar overflow-x-hidden gap-[50px] justify-center ${
        showDeploymentDetails
          ? "lg:grid-cols-2 max-lg:grid-cols-1 max-lg:grid-rows-2"
          : "max-lg:grid-cols-1 max-lg:grid-rows-2"
      }`}
    >
      <ChatBotComponent/>
      <GithubDeployment
        toggleBuildPageDetails={toggleBuildPageDetails}
        selectedCard={selectedCard}
      />
      {showDeploymentDetails && (
        <div className="shadow-2xl animation-toastSlideIn bg-medium-grey-color">
          <DeploymentDetailsLayout
            handleMenuClick={() => {}}
            hideLayout={() => setShowDeploymentDetails(false)}
            toggleBuildPageDetailsHide={toggleBuildPageDetailsHide}
            selectedCard={selectedCard}
          />
        </div>
      )}
    </div>
  );
}
