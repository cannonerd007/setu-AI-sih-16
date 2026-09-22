module.exports = {
  preset: '@react-native/jest-preset',
  setupFiles: ['./jest.setup.js'],
  // @react-navigation and its deps ship ESM; the default preset only
  // whitelists react-native-related packages for transform, not these.
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|react-native|@react-navigation|react-native-screens|react-native-safe-area-context|@react-native-community|lucide-react-native|react-native-svg)/)',
  ],
  // lucide-react-native's package.json "react-native" export condition
  // points at its .mjs build, which Jest's resolver picks up even under
  // transformIgnorePatterns; force it to the equivalent CJS build for tests
  // only — the real Metro/Android build is unaffected by this file.
  moduleNameMapper: {
    '^lucide-react-native$': '<rootDir>/node_modules/lucide-react-native/dist/cjs/lucide-react-native.js',
  },
};
