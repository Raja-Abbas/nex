import React from "react";
import { MultiStepLoader } from "./aceternitycomponents/multi-step-loader";
import { steps } from "../constants/Framework";



export default function GithubDeployment({ toggleBuildPageDetails }) {
  return (
    <div className={`lg:w-[600px] 2xl:w-[700px] max-lg:mx-auto lg:ml-auto pt-[56px]`}>
      <MultiStepLoader
        steps={steps}
        loading={true}
        duration={3000}
        toggleBuildPageDetails={toggleBuildPageDetails}
      />
    </div>
  );
}
