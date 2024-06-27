import React, { useEffect, useState } from "react";
import SourceLoadingState from "../../assets/svgs/sourceLoadingState.svg";
import BuildLoadingState from "../../assets/svgs/buildLoadingState.svg";
import PackageLoadingState from "../../assets/svgs/packageLoadingState.svg";
import DeployLoadingState from "../../assets/svgs/deployLoadingState.svg";
import GithubLogoCard from "../../assets/svgs/githubLogoCard.svg";
import ProjectXBox from "../../assets/svgs/projectXBox.svg";
import NodejsTemplate from "../../assets/svgs/nodejsTemplate.svg";
import Node from "../../assets/svgs/node.svg";
import BlueSvg from "../../assets/svgs/blueSvg.svg";
import TickBlueSvg from "../../assets/svgs/tick-circle-blue.svg";
import Loading from '../spinner';
import Waitlist from '../WaitlistComponent';

interface DeploymentAlertProps {
  isOpen: boolean;
  heading: string;
  message: string;
  onClose: () => void;
}

const DeploymentAlert: React.FC<DeploymentAlertProps> = ({
  isOpen,
  heading,
  message,
  onClose,
}) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isOpen) {
      setShowModal(true);
      timer = setTimeout(() => {
        setShowModal(false);
        onClose();
      }, 5000);
    } else {
      setShowModal(false);
    }

    return () => clearTimeout(timer);
  }, [isOpen]);

  const closeModal = () => {
    setShowModal(false);
    onClose();
  };
  return (
    <div
      className={`fixed max-md:top-[84px] md:top-[84px] right-1 z-[100] inset-0 flex h-fit justify-end ${showModal ? "animation-toastSlideIn" : "hidden"
        }`}
    >
      <div className="bg-card-color flex items-start gap-[10px] w-[346px] border border-dark-blue border-opacity-50 relative rounded-[7px] px-[15px] pt-[15px] pb-[11px] shadow-xl">
        <img src={TickBlueSvg} alt="TickBlueSvg" className="mt-[3px] w-[19px] h-[19px]" />
        <div className="text-start flex flex-col">
          <p className="text-lg text-white mb-[4px] tracking-0">
            {heading}
          </p>
          <p className="text-base text-description-color leading-[24px]">
            {message}
          </p>
          <button
            className="absolute top-[8px] right-[8px] text-description-color hover:text-[#94949489] rounded-lg text-base font-semibold"
            onClick={closeModal}
          >
            &#10005;
          </button>
        </div>
      </div>
    </div>
  );
};


interface ModalAlertProps {
  isOpen: boolean;
  heading: string;
  message: string;
  time: string;
  onClose: () => void;
}

const ModalAlert: React.FC<ModalAlertProps> = ({
  isOpen,
  heading,
  message,
  time,
  onClose,
}) => {
    const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isOpen) {
      setShowModal(true);
      timer = setTimeout(() => {
        setShowModal(false);
        onClose();
      }, 5000); 
    } else {
      setShowModal(false);
    }

    return () => clearTimeout(timer);
  }, [isOpen]);

  const closeModal = () => {
    setShowModal(false);
    onClose();
  };

  return (
    <div
      className={`fixed max-md:top-[84px] md:top-[84px] right-1 z-[100] inset-0 flex h-fit justify-end ${showModal ? "animation-toastSlideIn" : "hidden"
        }`}
    >
      <div className="bg-card-color flex items-start gap-[10px] w-[346px] border border-dark-blue border-opacity-50 relative rounded-[7px] px-[15px] pt-[10px] pb-[10px] shadow-xl">
        <img src={TickBlueSvg} alt="TickBlueSvg" className="mt-[3px] w-[19px] h-[19px]" />
        <div className="text-start flex flex-col">
          <p className="text-lg text-white mb-[4px] tracking-0">{heading}</p>
          <p className="text-base text-description-color mb-[4px] leading-[24px]">{message}</p>
          <p className="text-tiny text-description-color leading-[24px]">{time}</p>
          <button
            className="absolute top-[8px] right-[8px] text-description-color hover:text-[#94949489] rounded-lg text-base font-semibold"
            onClick={closeModal}
          >
            &#10005;
          </button>
        </div>
      </div>
    </div>
  );
};

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

interface Step {
  id: number;
  type: string;
  heading: string;
  subheading?: string;
  builder?: string;
  description?: string;
  image: ImageKey;
  text: string;
  buttons?: Array<{ label: string; action: string; image?: ImageKey }>;
  details?: Detail[];
  isSidebarVisible: boolean;
  duration: number;
}

interface MultiStepLoaderProps {
  steps: Step[];
  loading: boolean;
  duration: number;
  toggleBuildPageDetails: () => void;
}

const StepComponent: React.FC<{
  step: Step;
  index: number;
  toggleBuildPageDetails: () => void;
}> = ({ step, index, toggleBuildPageDetails }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (index !== 0) {
      const timeout = setTimeout(() => {
        setIsLoading(false);
      }, 2000);

      return () => clearTimeout(timeout);
    } else {
      setIsLoading(false);
    }
  }, [index]);

  if (!step || !step.image || !images[step.image]) {
    return null;
  }

  const Image = images[step.image];

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
        <div className={`transition-all duration-1000 animate-fade-in ${step ? "opacity-100" : "opacity-0"}`}>
          <p
            className={`font-medium leading-[150%] ${step.id === 5 ? "text-white text-2xl" : "text-description-color text-xl"
              }`}
          >
            {step.heading}
          </p>
          {step.subheading && (
            <p className="mt-1 text-base text-description-color font-normal leading-[150%]">
              {step.subheading}
            </p>
          )}
          {step.description && (
            <p className="mt-1 text-base text-white font-[450]">
              Status:{" "}
              <span className="text-green ml-[8px]">{step.description}</span>
            </p>
          )}
          {step.builder && (
            <p className="mt-[20px] text-base text-white font-[450] leading-[150%]">{step.builder}</p>
          )}
          {step.buttons && (
            <div className="flex items-center gap-2 mt-2">
              {step.buttons.map((button: any, index) => (
                <button
                  key={index}
                  className="flex gap-2 items-center justify-center border rounded-lg border-dark-blue bg-medium-grey-color text-dark-blue py-1 px-3 cursor-pointer hover:shadow-2xl hover:border-opacity-50 transition-all"
                >
                  {button.image && <img src={button.image} alt="Button" />}
                  <p className="text-tiny">{button.label}</p>
                </button>
              ))}
            </div>
          )}
          {step.details && (
            <div
              className={`max-lg:w-auto ${step.id === 5 ? "flex flex-col" : "grid grid-cols-2 grid-rows-2"
                } md:w-[600px] md:min-h-[77px] gap-y-[8px] border border-[#363838] hover:shadow-xl cardDetails cursor-pointer 2xl:w-[700px] bg-medium-grey-color bg-opacity/50 max-md:ml-[-50px] md:ml-[-50px] z-[1000] mt-[10px] md:py-[15px] md:px-[50px] max-md:p-4 max-md:py-8 rounded-lg relative`}
              onClick={toggleBuildPageDetails}
            >
              <img
                src={BlueSvg}
                alt="BlueSvg"
                className="absolute top-[15px] right-[15px] rounded-full bluesvg p-1 border border-medium-grey-color transition-all"
              />
              {step.details.map((detail, index) => (
                <div
                  key={index}
                  className={`text-description-color flex gap-[12px] items-center mb-0 ${step.id === 5 && detail.label ? "hidden" : ""
                    }`}
                >
                  {detail.image && (
                    <img
                      src={detail.image}
                      alt={detail.label}
                      className={`mr-[-4px] ${step.id === 5 ? "w-[30px] h-[30px]" : "w-5 h-5"
                        }`}
                    />
                  )}
                  {detail.label && <span className={`${detail.label === "Time" ? "hidden" : ""} ${detail.text === "white" ? "text-white text-base font-semibold" : "text-description-color text-base font-semibold"}`} >{detail.label}:</span>}
                  <span
                    className={` ${detail.text === "white" ? "text-white text-base font-normal" : "text-description-color text-base font-normal"
                      }`}
                  >
                    {detail.value}
                  </span>
                </div>
              ))}
              {step.id === 5 && (
                <div className="flex flex-row mt-[8px] gap-[56px]">
                  {step.details.some((detail) => detail.label === "Feedback") && (
                    <div className="mr-4">
                      <p className="text-description-color text-base leading-[24px]">
                        Feedback
                      </p>
                      <p className="border mt-[1px] text-base leading-[24px] rounded-full text-center border-dark-blue bg-medium-grey-color text-dark-blue py-[1px] px-[14px]">
                        {
                          step.details.find(
                            (detail) => detail.label === "Feedback"
                          )?.value
                        }
                      </p>
                    </div>
                  )}
                  {step.details.some(
                    (detail) => detail.label === "Environment"
                  ) && (
                      <div className="mr-4">
                        <p className="text-description-color text-base leading-[24px]">
                          Environment
                        </p>
                        <p className="text-white mt-[1px] leading-[24px] text-base rounded-full py-[1px]">
                          {
                            step.details.find(
                              (detail) => detail.label === "Environment"
                            )?.value
                          }
                        </p>
                      </div>
                    )}
                  {step.details.some((detail) => detail.label === "Cluster") && (
                    <div>
                      <p className="text-description-color text-base leading-[24px]">
                        Cluster
                      </p>
                      <p className="text-white mt-[1px] leading-[24px] text-base rounded-full py-[1px]">
                        {
                          step.details.find((detail) => detail.label === "Cluster")
                            ?.value
                        }
                      </p>
                    </div>
                  )}
                </div>
              )}
              {step.details.some((detail) => detail.label === "Link") && (
                <a href={step.details[4].url} target="_blank" rel="noopener noreferrer" className="mt-4 flex gap-0 items-center w-fit">
                  {step.details.some((detail) => detail.label === "Link") && (
                    <img
                      src={step.details[4].image}
                      alt={step.details[4].label}
                      className={`mr-2 ${step.id === 5 ? "w-4 h-4" : "w-4 h-4"}`}
                    />
                  )}
                  <p className="text-dark-blue text-base">
                    {step.details[4].url}
                  </p>
                </a>
              )}
              {step.details.some((detail) => detail.label === "Docker") && (
                <div className="mt-2 flex gap-0 items-center">
                  {step.details.some((detail) => detail.label === "Docker") && (
                    <img
                      src={step.details[5].image}
                      alt={step.details[5].label}
                      className={`mr-2 ${step.id === 5 ? "w-4 h-4" : "w-4 h-4"}`}
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

export const MultiStepLoader: React.FC<MultiStepLoaderProps> = ({
  steps,
  loading,
  duration,
  toggleBuildPageDetails,
}) => {
  const [visibleSteps, setVisibleSteps] = useState<Step[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(true);

  useEffect(() => {
    if (loading) {
      let index = 0;
      const interval = setInterval(() => {
        if (index < steps.length) {
          setVisibleSteps((prevSteps) => [...prevSteps, steps[index]]);
          index++;
        } else {
          clearInterval(interval);
          setShowModal(true);
        }
      }, duration);

      return () => clearInterval(interval);
    }
  }, [loading, duration, steps]);

  useEffect(() => {
    if (loading) {
      setIsAlertOpen(true);
      const interval = setInterval(() => {
        setCurrentStep((prevStep) => prevStep + 1);
      }, duration);

      return () => clearInterval(interval);
    } else {
      setCurrentStep(0);
    }
  }, [loading, duration]);

  useEffect(() => {
    if (currentStep >= steps.length) {
      setIsAlertOpen(false);
    }
  }, [currentStep, steps.length]);

  if (!loading) return null;

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <DeploymentAlert
        isOpen={isAlertOpen}
        heading="Deployment started"
        message="The build for your new project has started."
        onClose={closeModal}
      />
      {visibleSteps.map((step, index) => (
        <div key={index} className="relative flex gap-4 items-center">
          {index < visibleSteps.length - 1 && (
            <div className={`z-10 absolute left-[15px] top-0 bottom-0 border border-custom-color animate-fill transition-all duration-[500ms] ${visibleSteps.length - 1 ? 'bottom-0' : ''}`}></div>
          )}
          <div className={`z-20 min-h-full transition-all opacity-100 transform animate-fade-in ${visibleSteps ? "opacity-100" : "opacity-0"}`}>
            <StepComponent
              step={step}
              index={index}
              toggleBuildPageDetails={toggleBuildPageDetails}
            />
          </div>
        </div>
      ))}
      <style>{`
          @keyframes fill {
            from {
              height: 0;
              top:0;
            }
            to {
              height: 100%;
              bottom:0;
            }
          }
  
          .animate-fill {
            animation: fill 0.5s forwards;
          }
  
          @keyframes fade-in {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
  
          .animate-fade-in {
            animation: fade-in 2s forwards;
          }
        `}</style>
      <Waitlist isOpen={showModal} onClose={closeModal} />
      <ModalAlert
        isOpen={showModal}
        heading="NodeJs"
        message="Deployment Succesful"
        time="2 min ago"
        onClose={closeModal}
      />
    </div>
  );
};

