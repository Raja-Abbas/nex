import React from 'react';
import { useSelector } from "react-redux";
import Globe from "../../../assets/svgs/globe.svg";

const SomeOtherComponent = () => {
  const { url } = useSelector((state) => state.deployment);

  return (
    <div>
      {url && (
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
      )}
    </div>
  );
};

export default SomeOtherComponent;
