import React, { createContext, useContext, useState } from 'react';

interface ImportHistoryItem {
  id: string;
  filename: string;
  timestamp: Date;
  size: number;
}

interface ImportHistoryContextType {
  history: ImportHistoryItem[];
  addImport: (file: File) => void;
}

const ImportHistoryContext = createContext<ImportHistoryContextType | undefined>(undefined);

export const ImportHistoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [history, setHistory] = useState<ImportHistoryItem[]>([]);

  const addImport = (file: File) => {
    const newImport: ImportHistoryItem = {
      id: Date.now().toString(),
      filename: file.name,
      timestamp: new Date(),
      size: file.size,
    };
    setHistory(prev => [newImport, ...prev]);
  };

  return (
    <ImportHistoryContext.Provider value={{ history, addImport }}>
      {children}
    </ImportHistoryContext.Provider>
  );
};

export const useImportHistory = () => {
  const context = useContext(ImportHistoryContext);
  if (context === undefined) {
    throw new Error('useImportHistory must be used within an ImportHistoryProvider');
  }
  return context;
}; 