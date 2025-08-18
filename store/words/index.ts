import { IWordDb } from '@/types';

import { wordsDB_1001_1100 } from './words_1001_1100';
import { wordsDB_101_200 } from './words_101_200';
import { wordsDB_1101_1200 } from './words_1101_1200';
import { wordsDB_1201_1300 } from './words_1201_1300';
import { wordsDB_1301_1400 } from './words_1301_1400';
import { wordsDB_1401_1500 } from './words_1401_1500';
import { wordsDB_1501_1600 } from './words_1501_1600';
import { wordsDB_1601_1700 } from './words_1601_1700';
import { wordsDB_1701_1800 } from './words_1701_1800';
import { wordsDB_1801_1900 } from './words_1801_1900';
import { wordsDB_1901_2000 } from './words_1901_2000';
import { wordsDB_1_100 } from './words_1_100';
import { wordsDB_2001_2100 } from './words_2001_2100';
import { wordsDB_201_300 } from './words_201_300';
import { wordsDB_2101_2200 } from './words_2101_2200';
import { wordsDB_2201_2300 } from './words_2201_2300';
import { wordsDB_2301_2400 } from './words_2301_2400';
import { wordsDB_2401_2500 } from './words_2401_2500';
import { wordsDB_301_400 } from './words_301_400';
import { wordsDB_401_500 } from './words_401_500';
import { wordsDB_501_600 } from './words_501_600';
import { wordsDB_601_700 } from './words_601_700';
import { wordsDB_701_800 } from './words_701_800';
import { wordsDB_801_900 } from './words_801_900';
import { wordsDB_901_1000 } from './words_901_1000';

export const fileList = [
  'words_1_100',
  'words_101_200',
  'words_201_300',
  'words_301_400',
  'words_401_500',
  'words_501_600',
  'words_601_700',
  'words_701_800',
  'words_801_900',
  'words_901_1000',
  'words_1001_1100',
  'words_1101_1200',
  'words_1201_1300',
  'words_1301_1400',
  'words_1401_1500',
  'words_1501_1600',
  'words_1601_1700',
  'words_1701_1800',
  'words_1801_1900',
  'words_1901_2000',
  'words_2001_2100',
  'words_2101_2200',
  'words_2201_2300',
  'words_2301_2400',
  'words_2401_2500'
];

// const aggregateArraysDynamically = async () => {
//   const wordsMap: Record<string, IWordDb[]> = {};
//   for (const file of fileList) {
//     const module = await import(`./data/${file}`);
//     wordsMap[file] = module[Object.keys(module)[0]];
//   }
//   return wordsMap;
// };

// export const words2 = await aggregateArraysDynamically();

export const words1 = [
  wordsDB_1_100,
  wordsDB_101_200,
  wordsDB_201_300,
  wordsDB_301_400,
  wordsDB_401_500,
  wordsDB_501_600,
  wordsDB_601_700,
  wordsDB_701_800,
  wordsDB_801_900,
  wordsDB_901_1000,
  wordsDB_1001_1100,
  wordsDB_1101_1200,
  wordsDB_1201_1300,
  wordsDB_1301_1400,
  wordsDB_1401_1500,
  wordsDB_1501_1600,
  wordsDB_1601_1700,
  wordsDB_1701_1800,
  wordsDB_1801_1900,
  wordsDB_1901_2000,
  wordsDB_2001_2100,
  wordsDB_2101_2200,
  wordsDB_2201_2300,
  wordsDB_2301_2400,
  wordsDB_2401_2500
];

export const words = words1.reduce((acc, item) => {
  acc = [...acc, ...item];
  return acc;
}, []);

/**
 * Converts a word object to an SQL INSERT command for the cards table
 * @param word The word object to convert
 * @returns SQL INSERT command string
 */
export const wordToSqlInsert = (word: IWordDb): string => {
  return `INSERT INTO cards (id, text, ipa, translation) VALUES (${word.id}, '${word.word}', '${word.ipa}', '${word.translation}');`;
};

/**
 * Converts an array of word objects to SQL INSERT commands
 * @param words Array of word objects to convert
 * @returns Array of SQL INSERT command strings
 */
export const wordsToSqlInserts = (words: IWordDb[]): string[] => {
  return words.map(wordToSqlInsert);
};
