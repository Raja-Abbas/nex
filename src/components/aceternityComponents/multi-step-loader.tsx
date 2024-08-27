import React, { useEffect, useState } from "react";
import DeploymentAlert from "./DeploymentAlert";
import ModalAlert from "./ModalAlert";
import StepComponent, { Step } from "./StepComponent";
import { useSelector } from "react-redux";
import NodeJs from "../../assets/svgs/node.svg";
import ChatBotIcon from '../ChatBotIcon';

interface MultiStepLoaderProps {
  steps: Step[];
  loading: boolean;
  toggleBuildPageDetails: () => void;
  selectedCard?: any;
}

interface DeploymentState {
  namespace: string;
}

interface RootState {
  deployment: DeploymentState;
}

export const MultiStepLoader: React.FC<MultiStepLoaderProps> = ({
  steps,
  loading,
  toggleBuildPageDetails,
  selectedCard,
}) => {
  const [visibleSteps, setVisibleSteps] = useState<Step[]>([]);
  const [, setShowModal] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
  const [showModalAlert, setShowModalAlert] = useState<boolean>(false);
  const [hasModalAlertShown, setHasModalAlertShown] = useState<boolean>(false);
  const [step4EndTime, setStep4EndTime] = useState<number | null>(null);
  const [modalAlertTime, setModalAlertTime] = useState<string>("");
  const [showChatBotIcon, setShowChatBotIcon] = useState<boolean>(false);
  const { namespace } = useSelector((state: RootState) => state.deployment);

  const isStep5Visible = visibleSteps.some(step => step.id === 4);

  useEffect(() => {
    if (loading) {
      setIsAlertOpen(false);
      setShowModalAlert(false);
      setHasModalAlertShown(false);
      setVisibleSteps([]);
      setStep4EndTime(null);
      setShowChatBotIcon(false);

      let index = 0;
      const showNextStep = () => {
        if (index < steps.length) {
          setVisibleSteps((prevSteps) => {
            if (steps[index] && !prevSteps.some(step => step?.id === steps[index]?.id)) {
              return [...prevSteps, steps[index]];
            }
            return prevSteps;
          });

          const stepDuration = (steps[index].id === 2 || steps[index].id === 3) ? 10000 : steps[index].duration || 4000;
          setTimeout(() => {
            if (steps[index].id === 3) {
              setStep4EndTime(Date.now());
            }
            index++;
            showNextStep();
          }, stepDuration);
        } else {
          //setTimeout(() => setShowModal(true), 8000);
        }
      };

      showNextStep();

      setTimeout(() => setIsAlertOpen(true));
    }
  }, [loading, steps]);

  useEffect(() => {
    if (visibleSteps.length === steps.length && !hasModalAlertShown) {
      setTimeout(() => {
        if (step4EndTime) {
          const timeElapsed = Math.floor((Date.now() - step4EndTime) / 1000);
          setModalAlertTime(`${timeElapsed} seconds ago`);
        }
        setShowModalAlert(true);
        setHasModalAlertShown(true);
      }, 5000);
    }
  }, [visibleSteps, steps.length, hasModalAlertShown, step4EndTime]);

  useEffect(() => {
    const chatBotTimeout = setTimeout(() => {
      setShowChatBotIcon(true);
    }, 3000);

    return () => clearTimeout(chatBotTimeout);
  }, []);

  if (!loading) return null;

  const closeDeploymentAlert = () => {
    setIsAlertOpen(false);
  };

  const closeModalAlert = () => {
    setShowModalAlert(false);
  };

  const defaultCard = {
    logo: NodeJs,
    title: "Node.js",
    slug: "default-slug",  
  };
  const cardToDisplay = selectedCard || defaultCard;
  const url = `https://${namespace}.${cardToDisplay.slug}.alpha.nexlayer.ai`;

  return (
    <div className="max-lg:ml-7">
      {isAlertOpen && (
        <DeploymentAlert
          isOpen={isAlertOpen}
          heading="Deployment started"
          message="The build for your new project has started."
          onClose={closeDeploymentAlert}
        />
      )}
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
              url={url} 
              namespaceStepper={namespace}
            />
          </div>
        </div>
      ))}
      {showModalAlert && (
        <ModalAlert
          isOpen={showModalAlert}
          message="Deployment Successful"
          time={modalAlertTime}
          onClose={closeModalAlert}
          selectedCard={selectedCard}
        />
      )}
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
          animation: fade-in 0.5s forwards;
        }
      `}</style>
      {/* {selectedCard ? (
        <TemplateWaitlistModal isOpen={showModal} onClose={closeSelectedCardModal} selectedCard={selectedCard} />
      ) : (
        <Waitlist isOpen={showModal} onClose={closeSelectedCardModal} />
      )} */}
      {showChatBotIcon && <ChatBotIcon isStep5Visible={isStep5Visible} />}
    </div>
  );
};
