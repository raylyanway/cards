import { SQLiteDatabase } from 'expo-sqlite';

import { ICard, ILearnedCard, ITheme, IThemedColors } from '@/types';

export type IAllSlices = IHydratedState &
  IThemeSlice &
  ICardSlice &
  IDatabaseSlice;

export interface IHydratedState {
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}

export interface IThemeSlice {
  theme: ITheme;
  setTheme: (theme: ITheme) => void;
  computedTheme: {
    colors: IThemedColors;
    isLightTheme: boolean;
    oppositeColors: IThemedColors;
  };
}

export interface ICardSlice {
  cardIndex: number;
  cards: ICard[];
  learnedCards: Record<number, ILearnedCard>;
  setCardIndex: (index: number) => void;
  updateLearned: (cardId: number) => void;
  refreshLearned: () => void;
}

export interface IDatabaseSlice {
  _db: SQLiteDatabase | null;
  getDb: () => SQLiteDatabase;
  setDb: (database: SQLiteDatabase) => void;
  getAllCustomers: () => Promise<any[]>;
  getCustomerById: (id: number) => Promise<any | null>;
  showAllTableData: () => Promise<void>;
  showKVStore: () => Promise<void>;
  removeKVStore: () => Promise<void>;
  deleteDb: () => Promise<void>;
}
