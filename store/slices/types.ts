import { SQLiteDatabase } from 'expo-sqlite';

import { ICard, ILearnedCard, ITheme, IThemedColors, IWordDb } from '@/types';

export type IAllSlices = IHydratedState &
  ISettingSlice &
  ICardSlice &
  IDatabaseSlice;

export interface IHydratedState {
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}

export interface ISettingSlice {
  theme: ITheme;
  autoPronounce: boolean;
  setTheme: (theme: ITheme) => void;
  setAutoPronounce: (autoPronounce: boolean) => void;
  computedTheme: {
    colors: IThemedColors;
    isLightTheme: boolean;
    oppositeColors: IThemedColors;
  };
}

export interface ICardSlice {
  cards: ICard[];
  learnedCards: Record<string, ILearnedCard>;
  getCards: () => void;
  updateLearned: (cardId: number) => void;
  refreshLearned: () => void;
}

export interface IDatabaseSlice {
  _db: SQLiteDatabase | null;
  words: Record<string, IWordDb>;
  getDb: () => SQLiteDatabase;
  setDb: (database: SQLiteDatabase) => void;
  getAllCustomers: () => Promise<any[]>;
  getCustomerById: (id: number) => Promise<any | null>;
  showAllTableData: () => Promise<void>;
  showKVStore: () => Promise<void>;
  removeKVStore: () => Promise<void>;
  deleteDb: () => Promise<void>;
}
