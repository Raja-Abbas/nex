import React, { useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import GithubDeployment from "../components/GithubDeployment";
import DeploymentDetailsLayout from "../components/layouts/DeploymentDetailsLayout";
import DeploymentStatusPolling from "../components/DeploymentStatusPolling";

export default function BuildPage() {
  const [showDeploymentDetails, setShowDeploymentDetails] = useState(false);
  const [, setCurrentStep] = useState(1);
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
      className={`grid max-lg:px-4 scrollbar overflow-y-auto w-full gap-4 max-lg:gap-[50px] justify-center ${
        showDeploymentDetails
          ? "lg:grid-cols-2 max-lg:grid-cols-1 max-lg:h-auto lg:h-fit"
          : "max-lg:grid-cols-1 max-lg:grid-rows-2 h-auto"
      }`}
    >
      <DeploymentStatusPolling />
      <div
        className={`${
          showDeploymentDetails
            ? "lg:overflow-y-auto lg:overflow-x-hidden lg:h-[calc(100vh-140px)] scrollbar lg:px-[20px]"
            : ""
        }`}
      >
        <GithubDeployment
          toggleBuildPageDetails={toggleBuildPageDetails}
          selectedCard={selectedCard}
          setCurrentStep={setCurrentStep}
        />
      </div>
      {showDeploymentDetails && (
        <div className="shadow-2xl animation-toastSlideIn overflow-hidden bg-medium-grey-color max-lg:block max-lg:h-[150vh] lg:h-auto lg:fixed lg:w-1/2 lg:right-0 z-[100]">
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
