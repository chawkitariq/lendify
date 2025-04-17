import { signal, Signal, WritableSignal } from '@angular/core';

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

  let state: T;
  try {
    state = storedValue ? JSON.parse(storedValue) : initialState;
  } catch (e) {
    throw new Error(`Error parsing stored value for key "${key}":`);
  }

  const signalState = signal<T>(state);

  /**
   * @throws Will throw an error if the value cannot be serialized
   */
  const persistToStorage = (value: T) => {
    try {
      storageImpl.setItem(key, JSON.stringify(value));
    } catch (e) {
      throw e;
    }
  };

  const persistentSignal = function () {
    return signalState();
  } as WritableSignal<T>;

  persistentSignal.set = (value: T) => {
    signalState.set(value);
    persistToStorage(value);
  };

  persistentSignal.update = (updateFn: (value: T) => T) => {
    signalState.update(updateFn);
    persistToStorage(signalState());
  };

  if (!storedValue) {
    persistToStorage(initialState);
  }

  return persistentSignal;
}
