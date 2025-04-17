import { effect, signal, WritableSignal } from '@angular/core';

/**
 * Interface for storage implementations
 */
export interface StorageImplementation {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

/**
 * Creates a persistent signal that syncs with storage
 * @param key The key to use in storage
 * @param initialState The initial state if none exists in storage
 * @param storageImpl The storage implementation to use
 * @returns A writable signal that persists changes to storage
 */
export function signalPersistor<T>(
  key: string,
  initialState: T,
  storageImpl: StorageImplementation
): WritableSignal<T> {
  const storedValue = storageImpl.getItem(key);

  let state: T = initialState;

  if (storedValue) {
    try {
      state = JSON.parse(storedValue) as T;
    } catch (e) {
      throw new Error(`Failed to parse stored value for key "${key}"`);
    }
  }

  const signalState = signal<T>(state);

  effect(() => {
    const currentValue = signalState();
    const stored = storageImpl.getItem(key);

    if (stored !== JSON.stringify(currentValue)) {
      storageImpl.setItem(key, JSON.stringify(currentValue));
    }
  });

  return signalState;
}
