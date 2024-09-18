import React, { useState } from "react";
import Logo from "../../../assets/images/logo.png";
import SignupModal from "../../signup/signupModal";
const HomeNavbar = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const handleDeployClick = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  return (
    <div className="bg-background border-b border-line-color">
      <div className="px-2 max-md:px-0 container mx-auto flex justify-between items-center py-[22.5px]">
        <a className="" href="/">
          <img
            className="max-sm:ml-[10px] w-[106px] h-[19px]"
            src={Logo}
            alt="Logo"
          />
        </a>
        <div className="flex gap-6 items-center">
          <p className="font-normal text-xl text-dark-blue hidden sm:block">
            Currently in stealth mode 🔒—alpha preview active! Expect wild
            glitches ⚠️ and surprises ahead 🎢🤪.
          </p>
          <p
            className="max-sm:mr-[10px] font-normal text-xl text-description-color cursor-pointer"
            onClick={() => handleDeployClick()}
          >
            Signup
          </p>
        </div>
      </div>
      {isModalVisible && (
        <div
          className="fixed inset-0 bg-opacity-75 bg-[#070707] flex justify-center md:items-center z-[10000]"
          onClick={handleOverlayClick}
        >
          <div className="bg-background max-md:mx-6 max-md:w-full max-md:h-fit max-md:my-10 text-black rounded-[10px] relative z-50">
            <SignupModal isOpen={isModalVisible} onClose={handleCloseModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeNavbar;
