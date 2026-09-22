// Font-asset linking config for `npx react-native-asset` (react-native-asset
// package, not installed yet — see assets/fonts/README.md). Points at a
// directory that currently has no .ttf files in it; this wiring is here so
// dropping real font files in and running that one command completes the
// integration described in src/theme/typography.ts.
module.exports = {
  assets: ['./assets/fonts/'],
}
