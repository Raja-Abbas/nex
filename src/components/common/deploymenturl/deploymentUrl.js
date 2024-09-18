import React from "react";
import Globe from "../../../assets/svgs/globe.svg";
import ThinkingIcon from "../../../assets/svgs/thinking";
import { useSelector } from "react-redux";

const DeploymentUrl = () => {
  const deploymentMessage = useSelector((state) => state.deployment.message);
  const url = useSelector((state) => state.deployment.url);

  console.log(deploymentMessage, url, "---deploymentMessage");

  return (
    <div>
      {deploymentMessage === "ready" && url && url !== "null" ? (
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

export default DeploymentUrl;
