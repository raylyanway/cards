import { openDatabaseAsync, SQLiteDatabase } from 'expo-sqlite';

export type StorageRow = {
  id: string;
  value: string;
};

let dbPromise: Promise<SQLiteDatabase> | null = null;

async function getDb(): Promise<SQLiteDatabase> {
  if (!dbPromise) {
    dbPromise = openDatabaseAsync('storage.db');
    const db = await dbPromise;
    await db.runAsync(
      'CREATE TABLE IF NOT EXISTS data (id TEXT PRIMARY KEY NOT NULL, value TEXT);'
    );
  }
  return dbPromise;
}

export async function setStorage(data: any): Promise<void> {
  console.log('Setting storage with data:', data);
  const db = await getDb();
  await db.runAsync(
    'REPLACE INTO data (id, value) VALUES (?, ?);',
    'DATA',
    JSON.stringify(data)
  );
}

export async function getStorage(): Promise<any> {
  const db = await getDb();
  const value = (await db.getFirstAsync(
    'SELECT value FROM data WHERE id = ?;',
    'DATA'
  )) as string;
  console.log('Retrieved value:', value);
  return value ? JSON.parse(value) : null;
}

export async function logAllStorage(): Promise<void> {
  const db = await getDb();
  const results = (await db.getAllAsync('SELECT * FROM data;')) as StorageRow[];
  for (const item of results) {
    const { id, value } = item;
    console.log(`${id}:`, value);
  }
}

export async function clearAllStorage(): Promise<void> {
  const db = await getDb();
  await db.runAsync('DELETE FROM data;');
  console.log('All storage cleared.');
}
