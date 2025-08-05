import React, { useEffect } from 'react';

import { useBoundStore } from '@/store/useBoundStore';

interface InitializerProps {
  children: React.ReactNode;
}

export const Initializer = ({ children }: InitializerProps) => {
  const refreshLearned = useBoundStore((state) => state.refreshLearned);

  useEffect(() => {
    refreshLearned();
  }, [refreshLearned]);

  return <>{children}</>;
};
