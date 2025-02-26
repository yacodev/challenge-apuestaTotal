import { create, StateCreator } from 'zustand';
import {
  devtools,
  persist,
  subscribeWithSelector,
  PersistStorage,
  StorageValue,
} from 'zustand/middleware';

const sessionStorageCustom: PersistStorage<object> = {
  getItem: (name: string): StorageValue<object> | null => {
    const value = sessionStorage.getItem(name);
    return value ? JSON.parse(value) : null;
  },
  setItem: (name: string, value: StorageValue<object>): void => {
    sessionStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name: string): void => {
    sessionStorage.removeItem(name);
  },
};

type SliceCreator<T> = StateCreator<T, [], [], T>;
const initialStates: Record<string, unknown> = {};

export function createStore<Slices>(
  sliceCreators: SliceCreator<Slices>[],
  persistConfig: { name: string }
) {
  const store = create<Slices>()(
    subscribeWithSelector(
      devtools(
        persist(
          (...a) => {
            const slices = sliceCreators.reduce(
              (slices, createSlice) => ({
                ...slices,
                ...createSlice(...a),
              }),
              {} as Slices
            );

            initialStates[persistConfig.name] = slices;

            return slices;
          },
          {
            ...persistConfig,
            storage: sessionStorageCustom,
          }
        ),
        persistConfig
      )
    )
  );

  return store;
}
