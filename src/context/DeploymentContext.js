import React, { createContext, useState, useContext } from "react";

const DeploymentContext = createContext();

export const DeploymentProvider = ({ children }) => {
  const [namespace, setNamespace] = useState("");
  const [message, setMessage] = useState("");

  return (
    <DeploymentContext.Provider
      value={{ namespace, setNamespace, message, setMessage }}
    >
      {children}
    </DeploymentContext.Provider>
  );
};

export const useDeploymentContext = () => {
  return useContext(DeploymentContext);
};
