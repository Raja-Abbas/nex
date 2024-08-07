import React, { useMemo, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { MultiStepLoader } from "./aceternityComponents/multi-step-loader";
import { steps } from "../constants/Framework";
import { fetchDeploymentData } from "../redux/deploymentSlice";

const GithubDeployment = ({ toggleBuildPageDetails, selectedCard }) => {
  const dispatch = useDispatch();
  const { namespace, message } = useSelector((state) => state.deployment);
  const hasTriggered = useRef(false);

  useEffect(() => {
    if (selectedCard && !hasTriggered.current) {
      dispatch(fetchDeploymentData("0001"));
      hasTriggered.current = true;
    }
  }, [selectedCard, dispatch]);

  // Debugging logs
  useEffect(() => {
    console.log("Namespace:", namespace);
    console.log("Message:", message);
  }, [namespace, message]);

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
      <p className="text-white mb-2">Name: {namespace || "Loading..."}</p>
      <p className="text-white mb-10">Message: {message || "Loading..."}</p>
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
