/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { useNavigate } from "react-router-dom";
import { templatesData } from "../../constants/Framework";
import Link from "../../assets/svgs/Link.svg";
import LoginAccount from "../../assets/svgs/login_account.svg";
import Download from "../../assets/svgs/download.svg";

export default function CardsContent({ selectedMenu, onCardSelect }) {
  const navigate = useNavigate();
  const filteredData =
    selectedMenu === "All"
      ? templatesData
      : templatesData.filter((item) => item.Marketplacecategory === selectedMenu);

  const handleLinkClick = (slug) => {
    navigate(`/page/${slug}`);
  };

  const handleDeployClick = () => {
    navigate(-1);
  };

  return (
    <div className="px-0 md:px-5 py-5 grid gap-[14px] max-[470px]:grid-cols-1 grid-cols-2 lg:grid-cols-3">
      {filteredData.map((item, index) => (
        <div
          key={index}
          className="relative px-5 py-5 rounded-[5px] shadow-2xl border border-light-gray border-opacity-25 bg-[#171621]"
        >
          <div>
            {item.title === "AnythingLLM" && (
              <img
                src={Link}
                alt="Link"
                className="absolute right-2 top-2 w-[17px] h-[15px] cursor-pointer"
                onClick={() => handleLinkClick(item.title)}
              />
            )}
            <img className="min-h-[40px] max-h-[40px]" src={item.logo} alt={item.logo} />
            <p className="pt-3 font-normal text-2xl text-white">{item.title}</p>
            <p className="min-h-[80px] pt-[5px] font-normal text-lg text-description-color">
              {item.description}
            </p>
            <div className="border-t border-[#4F4F4F]"></div>
            <div className="pt-[10px] flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <img src={LoginAccount} alt="Item Image" className="w-4" />
                <p className="font-medium text-base text-description-color">
                  {item.provider}
                </p>
              </div>
              <div className="flex gap-4 items-center">
                <div className="flex gap-2">
                  <img src={Download} alt="Download" className="w-4" />
                  <p className="text-description-color text-base">{item.Downloads}</p>
                </div>
                <button
                  className="px-[15px] rounded-lg border border-light-grey-color py-[5px] font-normal text-base bg-[#20202c] text-description-color"
                  onClick={handleDeployClick}
                >
                  Deploy
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
