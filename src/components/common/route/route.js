import React from 'react';
import { useSlug } from '../../../context/SlugContext';
import Globe from "../../../assets/svgs/globe.svg";
import { useSelector } from "react-redux";

const SomeOtherComponent = () => {
  const { namespace } = useSelector((state) => state.deployment);
  const { slug } = useSlug();
  return (
    <div>
      <a
          href={`https://${namespace}.${slug}.alpha.nexlayer.ai`}
          target="_blank"
          rel="noreferrer"
          className="pt-[15px] w-fit flex gap-[10px] items-center"
        >
          <img src={Globe} alt="Globe Icon" />
          <p className="font-normal text-base text-dark-blue cursor-pointer">
            https://{namespace}.{slug}.alpha.nexlayer.ai
          </p>
        </a>
    </div>
  );
};

export default SomeOtherComponent;
