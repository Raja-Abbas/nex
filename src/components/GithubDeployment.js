import React, { useMemo } from "react";
import { MultiStepLoader } from "./aceternityComponents/multi-step-loader";
import { steps } from "../constants/Framework";

const GithubDeployment = ({ toggleBuildPageDetails, selectedCard }) => {
  const updatedSteps = useMemo(() => {
    // Create a set to keep track of processed step IDs
    const processedStepIds = new Set();

    return steps
      .map((step) => {
        if (selectedCard && !processedStepIds.has(step.id)) {
          processedStepIds.add(step.id); // Mark step as processed

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
      })
      .filter((step, index, self) => self.findIndex((s) => s.id === step.id) === index); // Ensure unique steps
  }, [selectedCard]);

  return (
    <div className={`lg:w-[600px] 2xl:w-[700px] max-lg:mx-auto lg:ml-auto pt-[56px]`}>
      <MultiStepLoader
        steps={updatedSteps}
        loading={true}
        duration={2500}
        toggleBuildPageDetails={toggleBuildPageDetails}
        selectedCard={selectedCard}
      />
    </div>
  );
};

export default React.memo(GithubDeployment);
