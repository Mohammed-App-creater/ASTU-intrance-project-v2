import React, { createContext, useState, useContext, ReactNode } from "react";

// Define the structure of the history object
interface HistoryData {
  firstMessages: string[];
  messageSessionIds: string[];
}

interface HistoryContextType {
  history: HistoryData;
  setHistory: React.Dispatch<React.SetStateAction<HistoryData>>;
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

interface HistoryProviderProps {
  children: ReactNode;
}

export const HistoryProvider: React.FC<HistoryProviderProps> = ({
  children,
}) => {
  const [history, setHistory] = useState<HistoryData>({
    firstMessages: [],
    messageSessionIds: [],
  });

  return (
    <HistoryContext.Provider value={{ history, setHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistory = (): HistoryContextType => {
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error("useHistory must be used within a HistoryProvider");
  }
  return context;
};
