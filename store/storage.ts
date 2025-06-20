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

export async function setStorage(data: any): Promise<void> {
  await AsyncStorage.setItem('DATA', JSON.stringify(data));
}

export async function getStorage(): Promise<any> {
  const json = await AsyncStorage.getItem('DATA');
  return json ? JSON.parse(json) : null;
}

export async function logAllStorage() {
  const keys = await AsyncStorage.getAllKeys();
  const stores = await AsyncStorage.multiGet(keys);
  stores.forEach(([key, value]) => {
    console.log(`${key}:`, value);
  });
}

export async function clearAllStorage() {
  await AsyncStorage.clear();
  console.log('All storage cleared.');
}
