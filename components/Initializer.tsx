import React, { useEffect, useState } from 'react';

import { useBoundStore } from '@/store/useBoundStore';

interface InitializerProps {
  children: React.ReactNode;
}

export const Initializer = ({ children }: InitializerProps) => {
  const refreshLearned = useBoundStore((state) => state.refreshLearned);
  const setAllCards = useBoundStore((state) => state.setAllCards);
  const hasHydrated = useBoundStore.persist.hasHydrated();

  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!hasHydrated || isInitialized) return;

    const init = async () => {
      try {
        await setAllCards();
        refreshLearned();
      } finally {
        setIsInitialized(true);
      }
    };

    init();
  }, [hasHydrated, isInitialized, setAllCards, refreshLearned]);

  if (!hasHydrated || !isInitialized) {
    return null; // or <LoadingScreen />
  }

  return <>{children}</>;
};
