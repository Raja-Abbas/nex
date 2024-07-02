import React, { useState } from "react";
import GithubDeployment from "./GithubDeployment";
import { useNavigate } from "react-router-dom";

const DeployComponent = () => {
  const [repoUrl, setRepoUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showGithubDeployment] = useState(false);
  let navigate = useNavigate();

  const isValidGitHubUrl = (url) => {
    const pattern = /^(https:\/\/github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+\/?)$/;
    return pattern.test(url);
  };

  const handleDeploy = () => {
    if (!repoUrl) {
      setErrorMessage("Repository URL cannot be empty.");
      return;
    }

    if (!isValidGitHubUrl(repoUrl)) {
      setErrorMessage("Please enter a valid GitHub repository URL.");
      return;
    }

    setErrorMessage("");
    navigate("/build");
  };

  return showGithubDeployment ? (
    <GithubDeployment />
  ) : (
    <div className="max-md:bg-background flex flex-col items-center justify-center bg-gray-900 text-white max-lg:w-auto lg:w-[700px] max-md:mt-[150px]">
      <div className="w-full max-w-full mt-6 p-4 px-6 rounded-md">
        <label
          className="block md:text-nowrap text-center text-xl font-bold mb-6"
          htmlFor="repo-url"
        >
          Deploy from a public repository by entering the URL below.
          <div className="relative bg-light-black border border-[#232323] rounded mt-8 flex items-center">
            <input
              id="repo-url"
              className="z-10 text-tiny w-full block p-2 py-3 border-light-black bg-light-black"
              placeholder="https://github.com/nexlayer-examples/express-hello-world"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
            />
            <button
              type="submit"
              className="z-20 text-black absolute end-1 bg-light-blue hover:bg-opacity-50 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-base px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={handleDeploy}
            >
              Deploy
            </button>
          </div>
        </label>
        {errorMessage && (
          <div className="text-base text-dark-blue mt-2 text-center">{errorMessage}</div>
        )}
      </div>
    </div>
  );
};

export default DeployComponent;
