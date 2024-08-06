// components/GithubDeployment.js
import React, { useState, useMemo, useEffect } from "react";
import { MultiStepLoader } from "./aceternityComponents/multi-step-loader";
import { steps } from "../constants/Framework";
import { useDeploymentContext } from "../context/DeploymentContext";

const GithubDeployment = ({ toggleBuildPageDetails, selectedCard }) => {
  const { namespace, setNamespace, message, setMessage } = useDeploymentContext();
  const [responseData, setResponseData] = useState(null);

  const authToken = "QW4gZWxlZ2FudCBzd2VldCBwb3RhdG8gbWUgZ29vZA==";
  useEffect(() => {
    if (selectedCard) {
      handleCardSelect(selectedCard);
    }
  }, [selectedCard]);

  const handleCardSelect = async (item) => {
    try {
      const response = await fetch(
        "https://service.api.nexlayer.ai/startdeployment/0001",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify({
            templateID: "0001",
          }),
        }
      );

      const responseText = await response.text();

      if (response.headers.get('Content-Type')?.includes('application/json')) {
        const data = JSON.parse(responseText);
        setResponseData(data);
        setNamespace(data.namespace);
        setMessage(data.message);
      } else {
        throw new Error(`HTTP error! Status: ${response.status} Response: ${responseText}`);
      }
    } catch (error) {
      console.error("Error making POST request:", error.message);
    }
  };

  const updatedSteps = useMemo(() => {
    const processedStepIds = new Set();

    return steps
      .map((step) => {
        if (selectedCard && !processedStepIds.has(step.id)) {
          processedStepIds.add(step.id);

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
      .filter((step, index, self) => self.findIndex((s) => s.id === step.id) === index);
  }, [selectedCard]);

  return (
    <div className={`w-full lg:w-[450px] xl:w-[600px] 2xl:w-[700px] max-lg:mx-auto lg:ml-auto pt-[56px]`}>
      <p className="text-white mb-2">Name: {namespace}</p>
      <p className="text-white mb-10">Message: {message}</p>
      {namespace && message && (
        <MultiStepLoader
          steps={updatedSteps}
          loading={true}
          duration={2000}
          toggleBuildPageDetails={toggleBuildPageDetails}
          selectedCard={selectedCard}
        />
      )}
    </div>
  );
};

export default React.memo(GithubDeployment);
