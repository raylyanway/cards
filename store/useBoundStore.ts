import Storage from 'expo-sqlite/kv-store';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { createCardSlice } from './slices/createCardSlice';
import { createDatabaseSlice } from './slices/createDatabaseSlice';
import { createSettingSlice } from './slices/createSettingSlice';
import { IAllSlices } from './slices/types';

export const useBoundStore = create<IAllSlices>()(
  persist(
    (set, ...a) => ({
      ...createDatabaseSlice(set, ...a),
      ...createSettingSlice(set, ...a),
      ...createCardSlice(set, ...a),
      _hasHydrated: false,
      setHasHydrated: (state) => {
        set({
          _hasHydrated: state
        });
      }
    }),
    {
      name: 'bound-storage',
      storage: createJSONStorage(() => Storage),
      onRehydrateStorage: (state) => {
        return () => state.setHasHydrated(true);
      },
      partialize: (state) => ({
        theme: state.theme,
        learnedCards: state.learnedCards
      })
    }
  )
);
