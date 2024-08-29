import React from "react";
import WhiteStarChatbotImage from "../../assets/svgs/StarImage.svg";
import DropDownAngle from "../../assets/svgs/dropDownAngle.svg";
import EditIcon from "../../assets/svgs/editIcon.svg";
import CrossIcon from "../../assets/svgs/crossIcon.svg";

const Header = ({ handleToggle, handleEditClick, onClose, isOpen, toggleCategories }) => {
  return (
    <div className="flex justify-between items-center mb-[30px]">
      <div className="flex gap-2 cursor-pointer" onClick={toggleCategories}>
        <img src={WhiteStarChatbotImage} alt="WhiteStarChatbot" />
        <div className="text-white flex gap-2 items-center">
          <span>Ask Liz</span>
          <img
            className={`transform w-4 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
            src={DropDownAngle}
            alt="Drop Down Angle"
          />
        </div>
      </div>
      <div className="flex gap-[10px]">
        <p className="p-2 px-3 bg-[#333636] bg-opacity-50 text-white text-opacity-70 text-base rounded-[7px]">
          Liz Alpha
        </p>
        <img
          src={EditIcon}
          alt="Edit Icon"
          onClick={handleEditClick}
          className="cursor-pointer p-[6px] min-h-[37px] bg-[#1B1C1C] hover:bg-[#333636] transition-all border-2 border-[#333636] bg-opacity-50 text-white text-opacity-70 text-base rounded-[7px]"
        />
        <img
          src={CrossIcon}
          alt="Close Icon"
          className="cursor-pointer p-1 w-[37px] h-[37px] bg-[#333636] hover:bg-[#1B1C1C] transition-all bg-opacity-50 border-2 border-[#333636] text-white text-opacity-70 text-base rounded-[7px]"
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export default Header;
