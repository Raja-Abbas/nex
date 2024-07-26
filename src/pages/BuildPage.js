import React, { useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import GithubDeployment from "../components/GithubDeployment";
import DeploymentDetailsLayout from "../components/layouts/DeploymentDetailsLayout";
import ChatBotIcon from "../components/ChatBotIcon";

export default function BuildPage() {
  const [showDeploymentDetails, setShowDeploymentDetails] = useState(false);
  const location = useLocation();
  const { selectedCard } = location.state || {};

  const toggleBuildPageDetails = useCallback(() => {
    setShowDeploymentDetails(true);
  }, []);

  const toggleBuildPageDetailsHide = useCallback(() => {
    setShowDeploymentDetails(false);
  }, []);

  return (
    <div
      className={`grid max-lg:px-4 w-full scrollbar overflow-x-hidden gap-4 sm:gap-[50px] justify-center ${
        showDeploymentDetails
          ? "lg:grid-cols-2 max-lg:grid-cols-1 max-lg:grid-rows-2 max-lg:h-full lg:h-fit"
          : "max-lg:grid-cols-1 max-lg:grid-rows-2 h-auto"
      }`}
    >
      {!showDeploymentDetails && <ChatBotIcon />}
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
