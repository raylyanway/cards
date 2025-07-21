import { useSQLiteContext } from 'expo-sqlite';
import React, { useEffect, useState } from 'react';

import { useBoundStore } from '@/store/useBoundStore';

interface DatabaseInitializerProps {
  children: React.ReactNode;
}

export const DatabaseInitializer = ({ children }: DatabaseInitializerProps) => {
  const db = useSQLiteContext();
  const setDb = useBoundStore((state) => state.setDb);
  const [isStoreDbSet, setIsStoreDbSet] = useState(false);

  useEffect(() => {
    if (db && !isStoreDbSet) {
      setDb(db);
      setIsStoreDbSet(true);
      console.log('Database instance set in Zustand store.');
    }
  }, [db, setDb, isStoreDbSet]);

  if (!isStoreDbSet) return null;

  return <>{children}</>;
};
