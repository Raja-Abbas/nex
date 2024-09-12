import React from "react";
import Cookies from "js-cookie";
import Globe from "../../../assets/svgs/globe.svg";
import ThinkingIcon from "../../../assets/svgs/thinking";
const SomeOtherComponent = () => {
  const url = Cookies.get("deploymentUrl");

  return (
    <div>
      {url && url !== "null" ? (
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="pt-[15px] w-fit flex gap-[10px] items-center"
        >
          <img src={Globe} alt="Globe Icon" />
          <p className="font-normal text-base text-dark-blue cursor-pointer">
            {url}
          </p>
        </a>
      ) : (
        <div className="pt-[15px] w-fit flex gap-[10px] items-center">
          <img src={Globe} alt="Globe Icon" />
          <p className="font-normal text-base text-dark-blue cursor-pointer">
            Your App is being deployed, Please wait
          </p>
          <ThinkingIcon />
        </div>
      )}
    </div>
  );
};

export default SomeOtherComponent;
