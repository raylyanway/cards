import React, { useEffect } from 'react';

import { useBoundStore } from '@/store/useBoundStore';
import { words, wordsToSqlInserts } from '@/store/words';

interface InitializerProps {
  children: React.ReactNode;
}

export const Initializer = ({ children }: InitializerProps) => {
  const refreshLearned = useBoundStore((state) => state.refreshLearned);
  const setAllCards = useBoundStore((state) => state.setAllCards);

  useEffect(() => {
    const init = async () => {
      await setAllCards();
      refreshLearned();
      console.log(wordsToSqlInserts(words).slice(2000, 2500).join(' '));
    };
    init();
  }, [setAllCards, refreshLearned]);

  return <>{children}</>;
};
