import { SQLiteDatabase } from 'expo-sqlite';

import { ICard, ICardType, ILearnedCard, ITheme, IThemedColors } from '@/types';

export type IAllSlices = IHydratedState &
  IThemeSlice &
  ICardsLearningSlice &
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

export interface ICardsLearningSlice {
  currentCardIndex: number;
  currentCardsType: ICardType;
  currentCards: ICard[];
  learnedCards: ILearnedCard[];
  learnedWords: ILearnedCard[];
  setCurrentCardIndex: (index: number) => void;
  setCurrentCardsType: (cardType: ICardType) => void;
  updateLearned: (cardId: number) => void;
  refreshLearned: () => void;
  getCurrentLearnedCards: () => ILearnedCard[];
}

export interface IDatabaseSlice {
  _db: SQLiteDatabase | null;
  getDb: () => SQLiteDatabase;
  setDb: (database: SQLiteDatabase) => void;
  getAllCustomers: () => Promise<any[]>;
  getCustomerById: (id: number) => Promise<any | null>;
  showAllTableData: () => Promise<void>;
}
