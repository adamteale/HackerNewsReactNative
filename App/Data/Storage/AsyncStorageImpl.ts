import {LocalStorageKey} from '@Storage/LocalStorageKey';
import LocalStorage from '@Storage/LocalStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AsyncStorageImpl: LocalStorage = {
  async update<T>(
    key: LocalStorageKey,
    value: T,
    authorised: boolean,
  ): Promise<T | null> {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    return value;
  },

  async get<R>(key: LocalStorageKey, authorised: boolean): Promise<R | null> {
    const result = await AsyncStorage.getItem(key);
    if (result) {
      const jsonValue = JSON.parse(result);
      return jsonValue as R;
    }
    return null;
  },
};

export default AsyncStorageImpl;
