/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: import explicitly to use the types shiped with jest.
import {it} from '@jest/globals';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

jest.mock('react-native-webview', () => ({
  default: () => jest.fn(), // or any mocked component instead of native view,
}));

it('renders correctly', () => {
  renderer.create(<App />);
});
