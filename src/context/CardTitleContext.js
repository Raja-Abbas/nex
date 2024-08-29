import React, { createContext, useState, useContext } from "react";

const CardTitleContext = createContext();

export const CardTitleProvider = ({ children }) => {
  const [cardTitle, setCardTitle] = useState("nodejs");

  return (
    <CardTitleContext.Provider value={{ cardTitle, setCardTitle }}>
      {children}
    </CardTitleContext.Provider>
  );
};

export const useCardTitle = () => useContext(CardTitleContext);
