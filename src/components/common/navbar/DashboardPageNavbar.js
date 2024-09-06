import React, { useState, useEffect } from "react";
import Logo from "../../../assets/images/logoBuild.png";
import LinearAvatar from "../../../assets/svgs/linearAvatar.svg";
import { Link, useLocation } from "react-router-dom";
import { useCredit } from "../../../context/CreditContext";
import { useCardTitle } from "../../../context/CardTitleContext";

const DashboardPageNavbar = () => {
  const location = useLocation();
  const isDashboardActive = location.pathname === "/dashboard";
  const { cardTitle, setCardTitle } = useCardTitle();
  const { credit } = useCredit();

  const [animatedCredit, setAnimatedCredit] = useState(0);
  const [, setIsModalOpen] = useState(false);

  useEffect(() => {
    const animationDuration = 3000;
    const framesPerSecond = 60;
    const increment = credit / (animationDuration / 3000) / framesPerSecond;
    let currentCredit = 0;

    const interval = setInterval(() => {
      currentCredit += increment;
      setAnimatedCredit(currentCredit);

      if (currentCredit > credit) {
        clearInterval(interval);
        setIsModalOpen(true);
      }
    }, 3000 / framesPerSecond);

    return () => clearInterval(interval);
  }, [credit]);

  useEffect(() => {
    const { selectedCard } = location.state || {};
    if (selectedCard && selectedCard.title.toLowerCase() !== cardTitle) {
      setCardTitle(selectedCard.title.toLowerCase());
    }
  }, [location.state, cardTitle, setCardTitle]);

  return (
    <div className="bg-background border-b border-line-color">
      <div className="px-2 max-md:px-3 container mx-auto flex justify-between items-center py-[18.5px]">
        <div className="flex max-md:gap-[2px] md:gap-5">
          <img className="w-[29px] h-[28px]" src={Logo} alt="Logo" />
          <p className="text-lg leading-[24px] text-white font-thin max-md:hidden">
            Dashboard / Refer a Friend
          </p>
        </div>
        <div className="flex gap-6 items-center">
          <Link
            to="/dashboard"
            className={`font-normal text-base ${isDashboardActive ? "text-white" : "text-[#A1A0AB]"} xs:block cursor-pointer hover:text-opacity-75 transition-all`}
          >
            Dashboard
          </Link>
          <a href="https://feedback.nexlayer.io" rel="noreferrer" target="_blank" className="font-normal text-base cursor-pointer hover:text-opacity-75 text-[#A1A0AB] max-md:hidden">
            Feedback
          </a>
          <p className="font-normal text-base border rounded-lg py-1 px-3 border-dark-blue bg-medium-gray text-dark-blue">
            NexLayer Credit <span className="text-xl font-thin">|</span> $
            {animatedCredit.toFixed(0)}
          </p>
          <img src={LinearAvatar} alt="LinearAvatar" className="rounded-full p-1.5 border border-dark-blue" />
        </div>
      </div>

      {/* {isModalOpen && <ModalAfterWaitlist isOpen={isModalOpen} onClose={closeModal} />} */}
    </div>
  );
};

export default DashboardPageNavbar;
