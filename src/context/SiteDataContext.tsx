import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  SiteData,
  SaveSiteResult,
  defaultSiteData,
  loadSiteData,
  saveSiteData,
  fetchRemoteSiteData,
  saveRemoteSiteData,
} from '../data/siteData';

interface SiteDataContextType {
  data: SiteData;
  updateData: (newData: SiteData) => Promise<SaveSiteResult>;
  resetToDefault: () => Promise<SaveSiteResult>;
  isSyncing: boolean;
}

const SiteDataContext = createContext<SiteDataContextType>({
  data: defaultSiteData,
  updateData: async () => ({ ok: true, persistedToCloud: false }),
  resetToDefault: async () => ({ ok: true, persistedToCloud: false }),
  isSyncing: false,
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

  const updateData = async (newData: SiteData): Promise<SaveSiteResult> => {
    setIsSyncing(true);
    try {
      const token = sessionStorage.getItem('kenry_admin_token');
      const result = await saveRemoteSiteData(newData, token);
      if (!result.unauthorized) {
        setData(newData);
        saveSiteData(newData);
      }
      return result;
    } finally {
      setIsSyncing(false);
    }
  };

  const resetToDefault = async (): Promise<SaveSiteResult> => {
    setIsSyncing(true);
    try {
      const token = sessionStorage.getItem('kenry_admin_token');
      const result = await saveRemoteSiteData(defaultSiteData, token);
      if (!result.unauthorized) {
        setData(defaultSiteData);
        saveSiteData(defaultSiteData);
        if (token) {
          await fetch('/api/auth', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ action: 'factory_reset_auth' }),
          }).catch(() => {});
        }
      }
      return result;
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <SiteDataContext.Provider value={{ data, updateData, resetToDefault, isSyncing }}>
      {children}
    </SiteDataContext.Provider>
  );
};

export const useSiteData = () => useContext(SiteDataContext);
