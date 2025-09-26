import { SQLiteDatabase } from 'expo-sqlite';

import {
  ICard,
  ICardDb,
  ICardsInfo,
  ILearnedCard,
  ITheme,
  IThemedColors
} from '@/types';

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
  allCards: Record<string, ICardDb>;
  cardsInfo: ICardsInfo;
  learnedCards: Record<string, ILearnedCard>;
  setCards: () => void;
  setAllCards: () => Promise<void>;
  updateLearned: (cardId: number) => void;
  refreshLearned: () => void;
  setCardsInfo: () => void;
}

export interface IDatabaseSlice {
  _db: SQLiteDatabase | null;
  getDb: () => SQLiteDatabase;
  setDb: (database: SQLiteDatabase) => void;
  getAllCards: () => Promise<Record<string, ICardDb>>;
  getCardsByIdRange: (
    startId: number,
    endId: number
  ) => Promise<Record<string, ICardDb>>;
  getCustomerById: (id: number) => Promise<any | null>;
  showAllTableData: () => Promise<void>;
  showKVStore: () => Promise<void>;
  removeKVStore: () => Promise<void>;
  deleteDb: () => Promise<void>;
}
