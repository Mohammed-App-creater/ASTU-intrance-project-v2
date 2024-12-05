import React, { createContext, useState, useContext, ReactNode } from "react";

type HistoryItem = string;

interface HistoryContextType {
  history: HistoryItem[];
  setHistory: React.Dispatch<React.SetStateAction<HistoryItem[]>>;
}
const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

interface HistoryProviderProps {
  children: ReactNode;
}

export const HistoryProvider: React.FC<HistoryProviderProps> = ({
  children,
}) => {
  const [history, setHistory] = useState<HistoryItem[]>([]);

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
