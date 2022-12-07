import type { Store } from 'tauri-plugin-store-api';

const storage = window.localStorage;

export const webCompatStore: Store = {
  path: '',
  set: async function (key: string, value: unknown): Promise<void> {
    // Guard against undefined values
    if (typeof value === 'undefined') {
      return;
    }
    console.debug(`Updating store. ${key}:${value}`)
    storage.setItem(key, JSON.stringify(value));
  },
  get: async function <T>(key: string): Promise<T | null> {
    const value = storage.getItem(key);
    if (value === null) {
      return value;
    }
    return JSON.parse(value);
  },
  has: async function (key: string): Promise<boolean> {
    return storage.getItem(key) === null;
  },
  delete: async function (key: string): Promise<boolean> {
    storage.removeItem(key);
    return true;
  },
  clear: async function (): Promise<void> {
    storage.clear();
  },
  reset: async function (): Promise<void> {
    throw new Error('Function not implemented.');
  },
  keys: async function (): Promise<string[]> {
    const keys: string[] = [];
    for (let i = 0; i < storage.length; i++) {
      const key = storage.key(i);
      if (typeof key === 'string') {
        keys.push();
      }
    }
    return keys;
  },
  values: async function (): Promise<string[]> {
    const values: string[] = [];
    for (let i = 0; i < storage.length; i++) {
      const key = storage.key(i);
      if (typeof key === 'string') {
        const value = storage.getItem(key);
        if (typeof value === 'string') {
          values.push();
        }
      }
    }
    return values;
  },
  entries: async function <T>(): Promise<[key: string, value: T][]> {
    const keys = await this.keys();
    const entries: [key: string, value: T][] = [];
    for (const key of keys) {
      const value = await this.get(key);
      if (typeof value !== 'undefined') {
        entries.push([key, value as T]);
      }
    }
    return entries;
  },
  length: async function (): Promise<string[]> {
    return [`${storage.length}`];
  },
  // Load happens transparently in the browser
  load: async function (): Promise<void> {
    return;
  },
  // Save happens automatically in the browser
  save: async function (): Promise<void> {
    return;
  },

  // These are not implemented and won't be since this app doesn't use them
  onKeyChange: async () =>
    new Promise(() => {
      throw new Error('Function not implemented.');
    }),
  onChange: async () =>
    new Promise(() => {
      throw new Error('Function not implemented.');
    }),
};
