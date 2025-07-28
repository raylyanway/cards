import * as FileSystem from 'expo-file-system';
import Storage from 'expo-sqlite/kv-store';
import { StateCreator } from 'zustand';

import { IAllSlices, IDatabaseSlice } from './types';

export const createDatabaseSlice: StateCreator<
  IAllSlices,
  [],
  [],
  IDatabaseSlice
> = (set, get) => ({
  _db: null,

  setDb: (database) => set({ _db: database }),
  getDb() {
    const database = get()._db;
    if (!database) {
      throw new Error('Database not initialized!');
    }
    return database;
  },
  getAllCustomers: async () => {
    try {
      // Access db via the getter defined in this slice
      const customers = await get()
        .getDb()
        .getAllAsync('SELECT * FROM customer');
      return customers;
    } catch (error) {
      console.error('Error fetching all customers:', error);
      throw error; // Re-throw to propagate error for calling components
    }
  },
  getCustomerById: async (id) => {
    try {
      const result = await get()
        .getDb()
        .getFirstAsync('SELECT * FROM customer WHERE id = ?', [id]);
      return result;
    } catch (error) {
      console.error(`Error fetching customer by ID ${id}:`, error);
      throw error;
    }
  },
  showAllTableData: async () => {
    try {
      const database = get().getDb();
      const tableNamesResult = await database.getAllAsync(
        "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'"
      );

      const tableNames: { name: string }[] = tableNamesResult as {
        name: string;
      }[];

      for (const row of tableNames) {
        const tableName = row.name;
        console.log(`\n--- Data for Table: ${tableName} ---`);
        const tableData = await database.getAllAsync(
          `SELECT * FROM ${tableName}`
        );
        console.log(tableData);
      }
    } catch (error) {
      console.error('Error fetching all table data:', error);
    }
  },
  deleteDb: async () => {
    const dbFilePath = `${FileSystem.documentDirectory}SQLite/storage.db`;

    try {
      const fileInfo = await FileSystem.getInfoAsync(dbFilePath);
      if (fileInfo.exists) {
        console.log(
          'Existing database found. Deleting and recreating for update.'
        );
        await FileSystem.deleteAsync(dbFilePath);
      }
    } catch (error) {
      console.error('Error checking or deleting database:', error);
    }
  },
  showKVStore: async () => {
    try {
      console.log('\n--- Data in KV Store ---');
      const allKeys = await Storage.getAllKeys();
      const boundStorageValue = Storage.getItem('bound-storage');
      console.log('All keys: ', allKeys);
      console.log('Bound Storage Value: ', boundStorageValue);
    } catch (error) {
      console.error('Error fetching KV store data:', error);
    }
  },
  removeKVStore: async () => {
    Storage.clear();
    console.log('KV storage cleared');
  }
});
