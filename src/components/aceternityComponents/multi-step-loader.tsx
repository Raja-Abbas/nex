import React, { useEffect, useState } from "react";
import Waitlist from '../WaitlistComponent';
import TemplateWaitlistModal from "../TemplateWaitlistModal";
import DeploymentAlert from "./DeploymentAlert";
import ModalAlert from "./ModalAlert";
import StepComponent, { Step } from "./StepComponent";

interface MultiStepLoaderProps {
  steps: Step[];
  loading: boolean;
  toggleBuildPageDetails: () => void;
  selectedCard?: any;
}

export const MultiStepLoader: React.FC<MultiStepLoaderProps> = ({
  steps,
  loading,
  toggleBuildPageDetails,
  selectedCard,
}) => {
  const [visibleSteps, setVisibleSteps] = useState<Step[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
  const [showModalAlert, setShowModalAlert] = useState<boolean>(false);
  const [hasModalAlertShown, setHasModalAlertShown] = useState<boolean>(false);

  useEffect(() => {
    if (loading) {
      setIsAlertOpen(false);
      setShowModalAlert(false);
      setHasModalAlertShown(false);
      setVisibleSteps([]);

      let index = 0;
      const showNextStep = () => {
        if (index < steps.length) {
          setVisibleSteps((prevSteps) => {
            if (steps[index] && !prevSteps.some(step => step?.id === steps[index]?.id)) {
              return [...prevSteps, steps[index]];
            }
            return prevSteps;
          });

          const stepDuration = (steps[index].id === 2 || steps[index].id === 4) ? 10000 : steps[index].duration || 1500;
          setTimeout(() => {
            index++;
            showNextStep();
          }, stepDuration);
        } else {
          setTimeout(() => setShowModal(true), 2000);
        }
      };

      showNextStep();

      setTimeout(() => setIsAlertOpen(true), 2000);
    }
  }, [loading, steps]);

  useEffect(() => {
    if (visibleSteps.length === steps.length && !hasModalAlertShown) {
      setTimeout(() => {
        setShowModalAlert(true);
        setHasModalAlertShown(true);
      }, 2000);
    }
  }, [visibleSteps, steps.length, hasModalAlertShown]);

  if (!loading) return null;

  const closeDeploymentAlert = () => {
    setIsAlertOpen(false);
  };

  const closeModalAlert = () => {
    setShowModalAlert(false);
  };

  const closeSelectedCardModal = () => {
    setShowModal(false);
  };

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
            />
          </div>
        </div>
      ))}
      {showModalAlert && (
        <ModalAlert
          isOpen={showModalAlert}
          message="Deployment Successful"
          time="2 min ago"
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
      {selectedCard ? (
        <TemplateWaitlistModal isOpen={showModal} onClose={closeSelectedCardModal} selectedCard={selectedCard} />
      ) : (
        <Waitlist isOpen={showModal} onClose={closeSelectedCardModal} />
      )}
    </div>
  );
};
