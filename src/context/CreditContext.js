// CreditContext.js
import React, { createContext, useState, useContext } from 'react';

const CreditContext = createContext();

export const useCredit = () => useContext(CreditContext);

export const CreditProvider = ({ children }) => {
  const [credit, setCredit] = useState(0);

  return (
    <CreditContext.Provider value={{ credit, setCredit }}>
      {children}
    </CreditContext.Provider>
  );
};
