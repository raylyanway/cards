import AsyncStorage from '@react-native-async-storage/async-storage';

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
