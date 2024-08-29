import React, { useState, useEffect } from "react";
import Logo from "../../../assets/images/logo.png";
import Avatar from "react-avatar";
import { Link, useLocation } from "react-router-dom";
import { useCredit } from "../../../context/CreditContext";
import { useCardTitle } from "../../../context/CardTitleContext";

const DetailsSlugNavbar = () => {
  const location = useLocation();
  const isDashboardActive = location.pathname === "/details/";
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
    const { slug } = location.state || {};
    if (slug && slug.toLowerCase() !== cardTitle) {
      setCardTitle(slug.toLowerCase());
    }
  }, [location.state, cardTitle, setCardTitle]);

  return (
    <div className="bg-background border-b border-line-color">
      <div className="px-2 max-md:px-3 container mx-auto flex justify-between items-center py-[18.5px]">
        <a className="flex max-md:gap-[2px] md:gap-5" href="/">
          <img
            className="max-sm:ml-[10px] w-[106px] h-[19px]"
            src={Logo}
            alt="Logo"
          />
          {/* <p className="text-lg leading-[24px] text-white font-thin max-md:hidden">
            {isMarketplacePage ? "Nexlayer" : `Nexlayer`}
          </p> */}
        </a>
        <div className="flex gap-6 items-center">
          <Link
            to="/dashboard"
            className={`font-normal max-md:text-base md:text-lg ${isDashboardActive ? "text-white" : "text-description-color"} xs:block cursor-pointer hover:text-opacity-75 transition-all`}
          >
            Dashboard
          </Link>
          <a href="https://feedback.nexlayer.io" rel="noreferrer" target="_blank" className="font-normal text-lg text-description-color max-md:hidden">
            Feedback
          </a>
          <p className="font-normal max-md:text-base md:text-lg border rounded-lg py-1 px-3 border-dark-blue bg-medium-gray text-dark-blue">
            NexLayer Credit <span className="text-xl font-thin">|</span> $
            {animatedCredit.toFixed(0)}
          </p>
          <Avatar facebookId="10000" size="40" round={true} />
        </div>
      </div>

      {/* {isModalOpen && <ModalAfterWaitlist isOpen={isModalOpen} onClose={closeModal} />} */}
    </div>
  );
};

export default DetailsSlugNavbar;
