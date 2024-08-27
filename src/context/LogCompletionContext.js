// LogCompletionContext.js
import React, { createContext, useState } from 'react';

export const LogCompletionContext = createContext();

export const LogCompletionProvider = ({ children }) => {
  const [logsCompleted, setLogsCompleted] = useState(false);

  return (
    <LogCompletionContext.Provider value={{ logsCompleted, setLogsCompleted }}>
      {children}
    </LogCompletionContext.Provider>
  );
};
