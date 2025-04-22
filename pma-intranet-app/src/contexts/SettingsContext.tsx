import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SettingsContextType {
  showTeamEnergyLevel: boolean;
  showTribeHealth: boolean;
  toggleTeamEnergyLevel: () => void;
  toggleTribeHealth: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

interface SettingsProviderProps {
  children: ReactNode;
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
  const [showTeamEnergyLevel, setShowTeamEnergyLevel] = useState(true);
  const [showTribeHealth, setShowTribeHealth] = useState(true);

  const toggleTeamEnergyLevel = () => {
    setShowTeamEnergyLevel(prev => !prev);
  };

  const toggleTribeHealth = () => {
    setShowTribeHealth(prev => !prev);
  };

  return (
    <SettingsContext.Provider
      value={{
        showTeamEnergyLevel,
        showTribeHealth,
        toggleTeamEnergyLevel,
        toggleTribeHealth,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}; 