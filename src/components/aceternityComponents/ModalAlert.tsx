import React, { useEffect, useState } from "react";
import TickBlueSvg from "../../assets/svgs/tick-circle-blue.svg";

interface ModalAlertProps {
  isOpen: boolean;
  message: string;
  time: string;
  onClose: () => void;
  selectedCard?: any;
}

const ModalAlert: React.FC<ModalAlertProps> = ({
  isOpen,
  message,
  time,
  onClose,
  selectedCard,
}) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isOpen) {
      setShowModal(true);
      timer = setTimeout(() => {
        setShowModal(false);
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
      className={`fixed max-md:top-[84px] md:top-[84px] right-1 z-[1000] inset-0 flex h-fit justify-end ${
        showModal ? "animation-toastSlideIn" : "hidden"
      }`}
    >
      <div className="bg-card-color flex items-start gap-[10px] w-[346px] border border-dark-blue border-opacity-50 relative rounded-[7px] px-[15px] pt-[10px] pb-[10px] shadow-xl">
        <img
          src={TickBlueSvg}
          alt="TickBlueSvg"
          className="mt-[3px] w-[19px] h-[19px]"
        />
        <div className="text-start flex flex-col">
          <p className="text-lg text-white mb-[4px] tracking-0">
            {selectedCard ? selectedCard.title : "Node.js"}
          </p>
          <p className="text-base text-description-color mb-[4px] leading-[24px]">
            {message}
          </p>
          <p className="text-tiny text-description-color leading-[24px]">
            {time}
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

export default ModalAlert;
