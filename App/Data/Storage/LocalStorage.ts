import {LocalStorageKey} from './LocalStorageKey';

export default interface LocalStorage {
  get<R>(key: LocalStorageKey, authorised: boolean): Promise<R | null>;
  update<T>(
    key: LocalStorageKey,
    value: T,
    authorised: boolean,
  ): Promise<T | null>;
}
