import AsyncStorage from '@react-native-async-storage/async-storage';

const LEARNED_CARDS_KEY = 'LEARNED_CARDS';

export async function getLearnedCards(): Promise<number[]> {
  const json = await AsyncStorage.getItem(LEARNED_CARDS_KEY);
  return json ? JSON.parse(json) : [];
}

export async function setLearnedCards(ids: number[]): Promise<void> {
  await AsyncStorage.setItem(LEARNED_CARDS_KEY, JSON.stringify(ids));
}

export async function addLearnedCard(id: number): Promise<void> {
  const ids = await getLearnedCards();
  if (!ids.includes(id)) {
    ids.push(id);
    await setLearnedCards(ids);
  }
}
