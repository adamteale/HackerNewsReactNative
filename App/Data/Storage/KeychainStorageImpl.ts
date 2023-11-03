import {LocalStorageKey} from './LocalStorageKey';
import LocalStorage from './LocalStorage';
import {Platform} from 'react-native';
import Keychain from 'react-native-keychain';

/* react-native-keychain
https://github.com/oblador/react-native-keychain/blob/master/KeychainExample/App.js
*/

export default class KeychainStorageImpl implements LocalStorage {
  async get<R>(key: LocalStorageKey, authorised: boolean): Promise<R | null> {
    const options = authorised ? await this.keychainOptions(key) : undefined;
    const result = await Keychain.getGenericPassword(options);
    return result !== false ? (result.password as R) : null;
  }

  async update<R>(
    key: LocalStorageKey,
    value: any,
    authorised: boolean,
  ): Promise<R | null> {
    const options = authorised ? await this.keychainOptions(key) : undefined;
    await Keychain.resetGenericPassword(options);
    const result = await Keychain.setGenericPassword(key, value, options);
    return result !== false ? (value as R) : null;
  }

  async keychainOptions(key: LocalStorageKey): Promise<Keychain.Options> {
    const supportedBiometricType = await Keychain.getSupportedBiometryType();

    if (Platform.OS === 'ios') {
      if (supportedBiometricType) {
        return {
          accessControl:
            Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET_OR_DEVICE_PASSCODE,
          service: key,
        };
      } else {
        // Maybe this is unnecessary
        return {
          accessControl:
            Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET_OR_DEVICE_PASSCODE,
          service: key,
        };
      }
    } else {
      if (supportedBiometricType) {
        return {
          accessControl:
            Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET_OR_DEVICE_PASSCODE,
          securityLevel: Keychain.SECURITY_LEVEL.ANY,
          storage: Keychain.STORAGE_TYPE.KC,
          authenticationType:
            Keychain.AUTHENTICATION_TYPE.DEVICE_PASSCODE_OR_BIOMETRICS,
          service: key,
        };
      } else {
        // Maybe this is unnecessary
        return {
          accessControl:
            Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET_OR_DEVICE_PASSCODE,
          securityLevel: Keychain.SECURITY_LEVEL.SECURE_SOFTWARE,
          storage: Keychain.STORAGE_TYPE.AES,
          service: key,
        };
      }
    }
  }
}
