import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  SiteData,
  defaultSiteData,
  loadSiteData,
  saveSiteData,
  fetchRemoteSiteData,
  saveRemoteSiteData
} from '../data/siteData';

interface SiteDataContextType {
  data: SiteData;
  updateData: (newData: SiteData) => Promise<boolean>;
  resetToDefault: () => void;
  isSyncing: boolean;
}

const SiteDataContext = createContext<SiteDataContextType>({
  data: defaultSiteData,
  updateData: async () => true,
  resetToDefault: () => {},
  isSyncing: false
});

export const SiteDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<SiteData>(defaultSiteData);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  useEffect(() => {
    // 1. Instant local load
    const initial = loadSiteData();
    setData(initial);

    // 2. Background Edge KV sync
    fetchRemoteSiteData().then((remote) => {
      if (remote) {
        setData(remote);
      }
    });
  }, []);

  const updateData = async (newData: SiteData): Promise<boolean> => {
    setData(newData);
    saveSiteData(newData);
    setIsSyncing(true);
    try {
      const ok = await saveRemoteSiteData(newData);
      return ok;
    } finally {
      setIsSyncing(false);
    }
  };

  const resetToDefault = () => {
    setData(defaultSiteData);
    saveSiteData(defaultSiteData);
    saveRemoteSiteData(defaultSiteData);
  };

  return (
    <SiteDataContext.Provider value={{ data, updateData, resetToDefault, isSyncing }}>
      {children}
    </SiteDataContext.Provider>
  );
};

export const useSiteData = () => useContext(SiteDataContext);
