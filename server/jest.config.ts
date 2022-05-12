import type {Config} from '@jest/types';
import {defaults} from 'jest-config';
// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx']
};
export default config;