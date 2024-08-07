import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { fetchDeploymentData } from "../../redux/deploymentSlice";
import { cardsData } from "../../constants/Framework";
import NexLayer from "../../assets/svgs/nexLayer.svg";
import Link from "../../assets/svgs/Link.svg";

export default function CardsContent({ selectedMenu, onCardSelect }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const filteredData =
    selectedMenu === "All"
      ? cardsData
      : cardsData.filter((item) => item.category === selectedMenu);

  const handleLinkClick = (slug) => {
    navigate(`/details/${slug}`);
  };

  const handleDeployClick = (item) => {
    localStorage.removeItem('deploymentData');
    
    dispatch(fetchDeploymentData(item.templateID));
    if (onCardSelect) onCardSelect(item);
  };

  return (
    <div className="px-0 md:px-5 py-5 grid gap-[14px] max-[470px]:grid-cols-1 grid-cols-2 lg:grid-cols-3">
      {filteredData.map((item, index) => (
        <div
          key={index}
          className="relative px-5 py-5 rounded-[5px] bg-light-black"
        >
          <div>
            {item.title === "AnythingLLM" && (
              <img
                src={Link}
                alt="Link"
                className="absolute right-2 top-2 w-[17px] h-[15px] cursor-pointer"
                onClick={() => handleLinkClick(item.slug)}
              />
            )}
            <img className="min-h-[40px]" src={item.logo} alt={item.logo} />
            <p className="pt-3 font-normal text-xl text-white">{item.title}</p>
            <p className="min-h-[80px] pt-[5px] font-normal text-tiny text-description-color">
              {item.description}
            </p>
            <div className="border-t border-[#4F4F4F]"></div>
            <div className="pt-[10px] flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <img src={NexLayer} alt="NexLayer Logo" />
                <p className="font-medium text-xs text-white">
                  <span className="font-normal text-description-color">
                    By{" "}
                  </span>
                  {item.provider}
                </p>
              </div>
              <button
                onClick={() => handleDeployClick(item)}
                className="px-[10px] py-[4.5px] font-normal text-sm rounded-full bg-light-blue text-[black]"
              >
                Deploy
              </button> 
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
