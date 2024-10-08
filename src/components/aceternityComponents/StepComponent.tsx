import React, { useEffect, useState } from "react";
import BlueSvg from "../../assets/svgs/blueSvg.svg";
import Loading from "../common/spinner/Spinner";
import SourceLoadingState from "../../assets/svgs/sourceLoadingState.svg";
import BuildLoadingState from "../../assets/svgs/buildLoadingState.svg";
import PackageLoadingState from "../../assets/svgs/packageLoadingState.svg";
import DeployLoadingState from "../../assets/svgs/deployLoadingState.svg";
import GithubLogoCard from "../../assets/svgs/githubLogoCard.svg";
import ProjectXBox from "../../assets/svgs/projectXBox.svg";
import NodejsTemplate from "../../assets/svgs/nodejsTemplate.svg";
import Node from "../../assets/svgs/node.svg";
import Route from "../common/deploymenturl/deploymentUrl";
import { useSelector } from "react-redux";

const images = {
  SourceLoadingState,
  BuildLoadingState,
  PackageLoadingState,
  DeployLoadingState,
  GithubLogoCard,
  ProjectXBox,
  NodejsTemplate,
  Node,
};

type ImageKey = keyof typeof images;

interface Detail {
  label: string;
  value: string;
  url?: string;
  image?: ImageKey;
  text: string;
}

export interface Step {
  id: number;
  type: string;
  heading: string;
  subheading?: string;
  builder?: string;
  subtext?: string;
  subtextvalue?: string;
  namepacetext?: string;
  namespacetextvalue?: string;
  description?: string;
  image: ImageKey;
  text: string;
  buttons?: Array<{ label: string; action: string; image?: ImageKey }>;
  details?: Detail[];
  isSidebarVisible: boolean;
  duration: number;
}

const StepComponent: React.FC<{
  step: Step;
  index: number;
  toggleBuildPageDetails: () => void;
  disableLoading?: boolean;
  url?: string;
  namespaceStepper?: string;
}> = ({
  step,
  index,
  toggleBuildPageDetails,
  disableLoading = false,
  url,
  namespaceStepper,
}) => {
  const [isLoading, setIsLoading] = useState(!disableLoading);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [, setShowInProgress] = useState(false);
  const [buildTimer, setBuildTimer] = useState<number>(0);
  const [showDetails, setShowDetails] = useState(false);
  const [deploymentSuccessful, setDeploymentSuccessful] =
    useState<boolean>(false);
  const deploymentMessage = useSelector(
    (state: any) => state.deployment.message,
  );
  const [buildStatus, setBuildStatus] = useState<string>("");

  useEffect(() => {
    if (step.details) {
      const detailsTimeout = setTimeout(() => {
        setShowDetails(true);
      }, 0);

      return () => clearTimeout(detailsTimeout);
    }
  }, [step.details]);

  useEffect(() => {
    if (index !== 0 && !disableLoading) {
      const timeout = setTimeout(() => {
        setIsLoading(false);
        setShowInProgress(true);
        setTimeout(() => {
          setShowInProgress(false);
          startElapsedTime();
        }, 10000);
      }, 1000);

      return () => clearTimeout(timeout);
    } else {
      setIsLoading(false);
    }
  }, [index, disableLoading]);
  useEffect(() => {
    if (step.id === 2) {
      setBuildStatus("Building");
      const countdown = setInterval(() => {
        setBuildTimer((prev) => prev + 1);
      }, 1000);

      setTimeout(() => {
        clearInterval(countdown);
        setBuildStatus("Build Successful");
      }, 3000);

      return () => clearInterval(countdown);
    }
  }, [step.id]);

  useEffect(() => {
    if (step.id === 3) {
      if (!deploymentMessage) {
        const countdown = setInterval(() => {
          setBuildTimer((prev) => prev + 1);
        }, 1000);

        return () => clearInterval(countdown);
      } else {
        setDeploymentSuccessful(true);
      }
    }
  }, [step.id, deploymentMessage]);

  const formatBuildTimer = (buildTimer: number): string => {
    if (buildTimer < 60) {
      return `0:${buildTimer < 10 ? `0${buildTimer}` : buildTimer}`;
    } else if (buildTimer < 3600) {
      const minutes = Math.floor(buildTimer / 60);
      const seconds = buildTimer % 60;
      return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    } else {
      const minutes = Math.floor((buildTimer % 3600) / 60);
      return `${minutes < 10 ? `0${minutes}` : minutes}`;
    }
  };

  useEffect(() => {
    if (deploymentMessage && step.id === 3) {
      setDeploymentSuccessful(true);
    }
  }, [deploymentMessage, step.id]);

  const startElapsedTime = () => {
    const timer = setInterval(() => {
      setTimeElapsed((prevTime) => prevTime + 5);
    }, 5000);

    return () => clearInterval(timer);
  };

  const formatTimeAgo = (timeElapsed: number): string => {
    if (timeElapsed < 60) {
      return `${timeElapsed} seconds ago`;
    } else {
      const minutes = Math.floor(timeElapsed / 60);
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    }
  };

  if (!step || !step.image || !images[step.image]) {
    return null;
  }

  const Image = images[step.image];
  const isDeploymentSuccessful =
    deploymentMessage && step.id === 3 && deploymentSuccessful;
  if (step.id === 4 && !deploymentMessage) {
    return null;
  }
  return (
    <div className="flex gap-[12px] pb-[45px]">
      {index !== 0 && isLoading ? (
        <div className="p-1 bg-medium-grey-color z-[100] border rounded-full border-custom-color w-[30px] h-[30px] flex items-center justify-center">
          <Loading />
        </div>
      ) : (
        <img
          src={Image}
          alt={step.heading}
          className="p-1 bg-medium-grey-color z-[100] border rounded-full border-custom-color w-[30px] h-[30px]"
        />
      )}
      {!isLoading && (
        <div
          className={`transition-all duration-1000 animate-fade-in ${
            step ? "opacity-100" : "opacity-0"
          }`}
        >
          <p
            className={`font-medium max-w-max leading-[150%] ${
              step.id === 4
                ? "text-white type4 text-2xl"
                : "text-description-color type text-xl"
            }`}
          >
            {step.heading}
          </p>
          {step.subtext && (
            <p className="mt-1 flex text-base text-description-color max-w-max type2 font-normal leading-[150%]">
              {step.subtext}
              <span className="ml-2 text-white">{step.subtextvalue}</span>
            </p>
          )}
          {step.namepacetext && (
            <p className="mt-1 flex text-base text-description-color max-w-max type3 font-normal leading-[150%]">
              {step.namepacetext}
              <span className="ml-2 text-white">{namespaceStepper}</span>
            </p>
          )}
          {step.description && (
            <p className="mt-1 text-base max-w-max text-white font-[450]">
              Status:{" "}
              <span className="text-green ml-[8px]">
                {step.id === 2
                  ? buildStatus === "Building"
                    ? `Building (0:${formatBuildTimer(buildTimer)})`
                    : `Build Successful (${formatBuildTimer(buildTimer)})`
                  : step.id === 3
                    ? isDeploymentSuccessful
                      ? "Deployment Successful"
                      : "Deployment in Progress"
                    : step.description}
              </span>
            </p>
          )}
          {step.builder && (
            <p className="mt-[20px] max-w-max text-base text-white font-[450] leading-[150%]">
              {step.builder}
            </p>
          )}
          {showDetails && step.details && (
            <div
              className={`max-md:w-auto fade-in ${
                step.id === 4 ? "flex flex-col" : "grid grid-cols-2 grid-rows-2"
              } sm:w-[600px] lg:w-[500px] xl:w-[600px] md:min-h-[77px] gap-y-[8px] border border-[#363838] hover:shadow-xl cardDetails cursor-pointer ${
                disableLoading
                  ? "sm:w-[100vw-0px] lg:w-[700px] max-sm:w-[100vw-50px] 2xl:w-[900px]"
                  : "2xl:w-[700px]"
              } bg-medium-grey-color bg-opacity/50 max-md:ml-[-50px] md:ml-[-50px] z-[10] mt-[10px] md:py-[15px] md:px-[50px] max-md:p-3 max-md:py-8 rounded-lg relative`}
              onClick={toggleBuildPageDetails}
            >
              <img
                src={BlueSvg}
                alt="BlueSvg"
                className="absolute max-md:top-[10px] max-md:right-[10px] md:top-[15px] md:right-[15px] rounded-full bluesvg p-1 border border-medium-grey-color transition-all"
              />
              {step.details.map((detail, index) => (
                <div
                  key={index}
                  className={`text-description-color flex max-md:gap-[4px] md:gap-[12px] items-center mb-0 ${
                    step.id === 4 && detail.label ? "hidden" : ""
                  }`}
                >
                  {detail.image && (
                    <img
                      src={detail.image}
                      alt={detail.label}
                      className={`ml-[0px] ${
                        step.id === 4 ? "w-auto h-10" : "w-5 h-5"
                      }`}
                    />
                  )}
                  {detail.label && detail.label !== "Time" && (
                    <span
                      className={`${
                        detail.text === "white"
                          ? "text-white max-md:text-tiny md:text-base font-semibold"
                          : "text-description-color max-md:text-tiny md:text-base font-semibold"
                      }`}
                    >
                      {detail.label}:
                    </span>
                  )}
                  {detail.label === "Time" && (
                    <span className="text-description-color max-md:text-tiny md:text-base font-normal">
                      {step.id === 2 && buildTimer > 0
                        ? formatTimeAgo(timeElapsed)
                        : step.id === 3
                          ? isDeploymentSuccessful
                            ? formatTimeAgo(timeElapsed)
                            : "Deployment in Progress"
                          : formatTimeAgo(timeElapsed)}
                    </span>
                  )}
                  {detail.label === "Deploying" && (
                    <div className="text-white max-md:text-tiny md:text-base font-normal">
                      {step.id === 3
                        ? buildTimer > 0
                          ? `(0:${formatBuildTimer(buildTimer)})`
                          : "Successful"
                        : step.description}
                    </div>
                  )}
                  <span
                    className={`${
                      detail.text === "white"
                        ? "text-white max-md:text-tiny md:text-base font-normal"
                        : "text-description-color max-md:text-tiny md:text-base font-normal"
                    }`}
                  >
                    {detail.value}
                  </span>
                </div>
              ))}
              {step.id === 4 && (
                <div className="flex flex-row mt-[8px] max-md:gap-[10px] md:gap-[26px]">
                  {step.details.some((detail) => detail.label === "Status") && (
                    <div className="mr-4">
                      <p className="text-description-color text-center text-tiny leading-[24px]">
                        Status
                      </p>
                      <p className="border mt-[1px] text-base leading-[24px] rounded-full text-center border-dark-blue bg-medium-grey-color text-dark-blue py-[1px] px-[14px]">
                        {
                          step.details.find(
                            (detail) => detail.label === "Status",
                          )?.value
                        }
                      </p>
                    </div>
                  )}
                  {step.details.some(
                    (detail) => detail.label === "Environment",
                  ) && (
                    <div className="mr-4">
                      <p className="text-description-color text-center text-tiny leading-[24px]">
                        Environment
                      </p>
                      <p className="text-white mt-[1px] leading-[24px] text-lg rounded-full py-[1px]">
                        {
                          step.details.find(
                            (detail) => detail.label === "Environment",
                          )?.value
                        }
                      </p>
                    </div>
                  )}
                  {step.details.some(
                    (detail) => detail.label === "Cluster",
                  ) && (
                    <div>
                      <p className="text-description-color text-tiny leading-[24px]">
                        Cluster
                      </p>
                      <p className="text-white mt-[1px] leading-[24px] text-lg rounded-full py-[1px]">
                        {
                          step.details.find(
                            (detail) => detail.label === "Cluster",
                          )?.value
                        }
                      </p>
                    </div>
                  )}
                </div>
              )}
              {step.details.some((detail) => detail.label === "Link") && (
                <div className="mt-4 flex gap-0 items-center w-fit">
                  <Route />
                </div>
              )}
              {step.details.some((detail) => detail.label === "Docker") && (
                <div className="mt-2 flex gap-0 items-center">
                  {step.details.some((detail) => detail.label === "Docker") && (
                    <img
                      src={
                        step.details.find((detail) => detail.label === "Docker")
                          ?.image
                      }
                      alt={
                        step.details.find((detail) => detail.label === "Docker")
                          ?.label
                      }
                      className={`mr-2 ${
                        step.id === 4 ? "w-4 h-4" : "w-4 h-4"
                      }`}
                    />
                  )}
                  <p className="text-description-color text-base">
                    {
                      step.details.find((detail) => detail.label === "Docker")
                        ?.value
                    }
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StepComponent;
