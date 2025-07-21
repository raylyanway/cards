import React, { useEffect } from 'react';

import { timeIntervals } from '@/constants';
import { useBoundStore } from '@/store/useBoundStore';

interface InitializerProps {
  children: React.ReactNode;
}

export const Initializer = ({ children }: InitializerProps) => {
  const refreshLearned = useBoundStore((state) => state.refreshLearned);

  useEffect(() => {
    const interval = setInterval(() => {
      refreshLearned();
    }, timeIntervals[0]);
    return () => clearInterval(interval);
  }, [refreshLearned]);

  return <>{children}</>;
};
