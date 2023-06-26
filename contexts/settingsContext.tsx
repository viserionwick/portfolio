// Essentials
import React, { createContext, useContext } from 'react';

// Types
import { ISettings } from '../utils/models/settings';

// Set Context
const SettingsContext = createContext<ISettings | undefined>(undefined);

// Use Context
const useSettingsContext = () => useContext(SettingsContext);

// Provider
const SettingsProvider: React.FC<{ settings: ISettings, children: React.ReactNode }> = ({ settings, children }) => {

  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
};

export { SettingsProvider, useSettingsContext };