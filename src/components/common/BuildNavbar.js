import React, { useState, useEffect } from "react";
import Logo from "../../assets/images/logoBuild.png";
import Avatar from 'react-avatar';
import { Link, useLocation } from "react-router-dom";
import { useCredit } from '../../context/CreditContext';

const BuildNavbar = () => {
  const location = useLocation();
  const isDashboardActive = location.pathname === "/dashboard";
  const { selectedCard } = location.state || {};
  const cardTitle = selectedCard ? selectedCard.title.toLowerCase() : "nodejs";
  const { credit } = useCredit();

 
  const [animatedCredit, setAnimatedCredit] = useState(0);

 
  useEffect(() => {
    const animationDuration = 1000;
    const framesPerSecond = 60;
    const increment = credit / (animationDuration / 1000) / framesPerSecond;
    let currentCredit = 0;
    const interval = setInterval(() => {
      currentCredit += increment;
      if (currentCredit >= credit) {
        currentCredit = credit;
        clearInterval(interval);
      }
      setAnimatedCredit(currentCredit);
    }, 1000 / framesPerSecond);

    
    return () => clearInterval(interval);
  }, [credit]); 

  return (
    <div className="bg-background border-b border-line-color">
      <div className="px-2 max-md:px-3 container mx-auto flex justify-between items-center py-[18.5px]">
        <a className="flex gap-5" href="/build">
          <img className="w-[29px] h-[28px]" src={Logo} alt="Logo" />
          <p className="text-lg leading-[24px] text-white font-thin max-md:hidden">sasdeployer / {cardTitle} / production</p>
        </a>
        <div className="flex gap-6 items-center">
          <Link 
            to="/dashboard" 
            className={`font-normal text-lg ${isDashboardActive ? 'text-white' : 'text-description-color'} xs:block cursor-pointer hover:text-opacity-75 transition-all`}
          >
            Dashboard
          </Link>
          <p className="font-normal text-lg text-description-color max-md:hidden">Feedback</p>
          <p className="font-normal text-lg border rounded-lg py-1 px-3 border-dark-blue bg-medium-gray text-dark-blue max-md:hidden">
            NexLayer Credit <span className="text-xl font-thin">|</span> ${animatedCredit.toFixed(0)} {/* Display animated credit value */}
          </p>
          <Avatar facebookId="10000" size="40" round={true} />
        </div>
      </div>
    </div>
  );
};

export default BuildNavbar;
