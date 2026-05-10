import React, { useEffect } from 'react';

import { useBoundStore } from '@/store/useBoundStore';

interface InitializerProps {
  children: React.ReactNode;
}

export const Initializer = ({ children }: InitializerProps) => {
  const refreshLearned = useBoundStore(state => state.refreshLearned);
  const setAllCards = useBoundStore(state => state.setAllCards);
  const hasHydrated = useBoundStore.persist.hasHydrated();

  useEffect(() => {
    if (!hasHydrated) return;

    const init = async () => {
      await setAllCards();
      refreshLearned();
    };
    init();
  }, [setAllCards, refreshLearned, hasHydrated]);

  if (!hasHydrated) {
    return null; // or <LoadingScreen />
  }

  return <>{children}</>;
};
