import React from "react";
import WoohooImage from "../../assets/images/WoohooImage.png";

interface ModalAfterWaitlistProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalAfterWaitlist: React.FC<ModalAfterWaitlistProps> = ({ isOpen, onClose }) => {

  if (!isOpen) return null;

  const handleShareIdeasClick = () => {
    onClose();
  };

  return (
    <div className="fixed w-full h-full bg-[#070707] bg-opacity-75 inset-0 z-[1000] flex items-center justify-center">
      <div className="bg-background relative text-center bg-opacity-100 z-[1000] p-[26px] pt-[48px] rounded-md shadow-xl my-[45px] mx-[55px] max-md:w-full md:w-auto h-full md:h-auto md:max-h-[80vh] overflow-y-auto scrollbar">
        <img src={WoohooImage} alt="WoohooImage" className="w-auto h-[100px] mx-auto" />
        <p className="text-4xl font-bold text-white mt-[10px]">Woohoo!</p>
        <div className="mt-[45px] text-white">
          <p className="text-[26px] font-medium">Welcome to our exclusive private alpha!</p>
          <p className="text-lg font-normal mt-[20px] opacity-80">
            Hey there! I'm Liz, your NexLayer guide. You've just unlocked $100 in credits! As we
            <br className="max-md:hidden"/>
            gear up for our beta launch this fall, your early claim powers your projects and puts
            <br className="max-md:hidden"/>
            you at the forefront of shaping NexLayer's future. How cool is that? 🌟
          </p>
        </div>
        <div className="mt-[45px] text-white">
          <p className="text-[26px] font-medium">Here's What You've Scored</p>
          <p className="text-lg font-normal mt-[20px] opacity-80">
            <span className="text-white font-bold">$100 NexLayer Credits:</span> Use 'em to boost your tech game.
            <br className="max-md:hidden"/>
            <span className="text-white font-bold">Early Access Pass:</span> Be the first to explore our platform.
            <br className="max-md:hidden"/>
            <span className="text-white font-bold">Game-Changing Opportunity:</span> Your ideas will shape NexLayer's features
          </p>
        </div>
        <p className="mt-[45px] opacity-80 text-white text-xl">Ready to crush it? Let's build and make waves together! 🚀🖥️</p>
        <p className="mt-[45px] text-white text-xl">Hurry, Shape NexLayer's Future!</p>
        <button
          onClick={handleShareIdeasClick}
          className="text-black mt-[15px] w-full bg-light-blue hover:bg-opacity-50 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-[5px] text-base px-4 py-[16px] dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Share your ideas
        </button>
      </div>
    </div>
  );
};

export default ModalAfterWaitlist;
