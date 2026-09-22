// NetInfo's own official jest mock (ships with the package) — this is the
// documented way to unit-test code that uses it, not a workaround.
jest.mock('@react-native-community/netinfo', () =>
  require('@react-native-community/netinfo/jest/netinfo-mock'),
)
