import React, { useEffect, useState } from "react";
import Waitlist from '../WaitlistComponent';
import TemplateWaitlistModal from "../TemplateWaitlistModal";
import DeploymentAlert from "./DeploymentAlert"
import ModalAlert from "./ModalAlert"
import StepComponent from "./StepComponent"
import { Step } from "./StepComponent"
import ModalAfterWaitlist from "./ModalAfterWaitlist";


interface MultiStepLoaderProps {
  steps: Step[];
  loading: boolean;
  duration: number;
  toggleBuildPageDetails: () => void;
  selectedCard?: any;
}

export const MultiStepLoader: React.FC<MultiStepLoaderProps> = ({
  steps,
  loading,
  duration,
  toggleBuildPageDetails,
  selectedCard,
}) => {
  const [visibleSteps, setVisibleSteps] = useState<Step[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalAfterWaitlist, setShowModalAfterWaitlist] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
  const [showModalAlert, setShowModalAlert] = useState<boolean>(false);
  const [hasModalAlertShown, setHasModalAlertShown] = useState<boolean>(false);

  useEffect(() => {
    if (loading) {
      setIsAlertOpen(false);
      setShowModalAlert(false);
      setHasModalAlertShown(false);

      let index = 0;
      const interval = setInterval(() => {
        if (index < steps.length) {
          setVisibleSteps((prevSteps) => [...prevSteps, steps[index]]);
          index++;
        } else {
          clearInterval(interval);
          setTimeout(() => setShowModal(true), 2000);
        }
      }, duration);

      setTimeout(() => setIsAlertOpen(true), 2000);

      return () => clearInterval(interval);
    }
  }, [loading, duration, steps]);

  useEffect(() => {
    if (loading) {
      setCurrentStep(0);
      const interval = setInterval(() => {
        setCurrentStep((prevStep) => prevStep + 1);
      }, duration);

      return () => clearInterval(interval);
    } else {
      setCurrentStep(0);
    }
  }, [loading, duration]);

  useEffect(() => {
    if (currentStep >= steps.length && !hasModalAlertShown) {
      setTimeout(() => {
        setShowModalAlert(true);
      }, 2000);
    }
  }, [currentStep, steps.length, hasModalAlertShown]);

  if (!loading) return null;

  const closeDeploymentAlert = () => {
    setIsAlertOpen(false);
  };

  const closeModalAlert = () => {
    setShowModalAlert(false);
  };

  const closeSelectedCardModal = () => {
    setShowModal(false);
    setShowModalAfterWaitlist(true); // Open the ModalAfterWaitlist
  };

  const closeModalAfterWaitlist = () => {
    setShowModalAfterWaitlist(false);
  };

  return (
    <div>
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
        <TemplateWaitlistModal isOpen={showModal} onClose={closeSelectedCardModal} selectedCard={selectedCard}/>
      ) : (
        <Waitlist isOpen={showModal} onClose={closeSelectedCardModal} />
      )}
      <ModalAfterWaitlist isOpen={showModalAfterWaitlist} onClose={closeModalAfterWaitlist} />
    </div>
  );
};