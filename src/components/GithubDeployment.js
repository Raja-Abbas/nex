import React from "react";
import { MultiStepLoader } from "./aceternityComponents/multi-step-loader";
import { steps } from "../constants/Framework";

export default function GithubDeployment({
  toggleBuildPageDetails,
  selectedCard,
}) {
  const updatedSteps = steps.map((step) => {
    if (selectedCard) {
      if (step.id === 2) {
       
        return {
          ...step,
          details: step.details.map((detail) => {
            if (detail.label === "Project Name") {
              return { ...detail, value: selectedCard.title };
            } else if (detail.value === "nodejs-template-patch-1") {
              return {
                ...detail,
                value: `${selectedCard.title.toLowerCase()}-template-patch-1`,
              };
            }
            return detail;
          }),
        };
      } else if (step.id === 4) {
       
        return {
          ...step,
          details: step.details.map((detail) => {
            if (detail.value === "sasdeployer /ndejs:latest") {
              return {
                ...detail,
                value: `sasdeployer /${selectedCard.title.toLowerCase()}:latest`,
              };
            }
            return detail;
          }),
        };
      } else if (step.id === 5) {
        
        return {
          ...step,
          details: step.details.map((detail) => {
            if (detail.label === "") {
              return {
                ...detail,
                value: selectedCard.title,
                image: selectedCard.logo,
              };
            } else if (detail.label === "Link") {
              return {
                ...detail,
                url: `https://${selectedCard.title.toLowerCase()}-3hp0.ondeployx.com`,
              };
            }
            return detail;
          }),
        };
      }
    }
    return step;
  });

  return (
    <div
      className={`lg:w-[600px] 2xl:w-[700px] max-lg:mx-auto lg:ml-auto pt-[56px]`}
    >
      <MultiStepLoader
        steps={updatedSteps}
        loading={true}
        duration={2500}
        toggleBuildPageDetails={toggleBuildPageDetails}
        selectedCard={selectedCard}
      />
    </div>
  );
}
