import { Store } from "tauri-plugin-store-api";

export const webCompatStore: Store = {
    path: '',
    set: function (key: string, value: unknown): Promise<void> {
        throw new Error('Function not implemented.');
    },
    get: function <T>(key: string): Promise<T | null> {
        throw new Error('Function not implemented.');
    },
    has: function (key: string): Promise<boolean> {
        throw new Error('Function not implemented.');
    },
    delete: function (key: string): Promise<boolean> {
        throw new Error('Function not implemented.');
    },
    clear: function (): Promise<void> {
        throw new Error('Function not implemented.');
    },
    reset: function (): Promise<void> {
        throw new Error('Function not implemented.');
    },
    keys: function (): Promise<string[]> {
        throw new Error('Function not implemented.');
    },
    values: function (): Promise<string[]> {
        throw new Error('Function not implemented.');
    },
    entries: function <T>(): Promise<[key: string, value: T][]> {
        throw new Error('Function not implemented.');
    },
    length: function (): Promise<string[]> {
        throw new Error('Function not implemented.');
    },
    load: function (): Promise<void> {
        throw new Error('Function not implemented.');
    },
    save: function (): Promise<void> {
        throw new Error('Function not implemented.');
    },
    onKeyChange: async () => new Promise(() => {}),
    onChange: async () => new Promise(() => {}),
}