export const palette = {
  black: '#0a0a0a',
  grayExtraDark: '#151515',
  grayDark: '#2b2b2b',
  gray: '#5a5a5a',
  grayLight: '#909090',
  grayExtraLight: '#eee',
  white: '#fafafa',
  tomato: '#ff6347',
  orange: '#fb923c',
  gold: '#ffd700',
  green: '#22c55e',
  blue: '#1e90ff'
};

const darkTheme = {
  background: palette.black,
  text: palette.white,
  backgroundBlock: palette.grayDark,
  border: palette.gray,
  textSecondary: palette.grayLight,
  error: palette.tomato,
  warning: palette.gold,
  success: palette.green,
  primary: palette.blue
};

export const themedColors: {
  dark: ThemeDefinition;
  light: ThemeDefinition;
} = {
  dark: darkTheme,
  light: {
    background: palette.grayExtraLight,
    text: palette.black,
    backgroundBlock: palette.white,
    border: palette.gray,
    textSecondary: palette.grayLight,
    error: palette.tomato,
    warning: palette.gold,
    success: palette.green,
    primary: palette.blue
  }
};

type ThemeDefinition = typeof darkTheme;
type PaletteKeys = keyof typeof palette;
type ThemedKeys = keyof ThemeDefinition;

// Utility type to enforce that no keys in ThemedKeys exist in PaletteKeys and vice versa
type NoOverlapKeys<T extends string, U extends string> =
  Extract<T, U> extends never ? true : ['Conflict in keys:', Extract<T, U>];

// Enforce no name overlap
type ValidateNoOverlap = NoOverlapKeys<ThemedKeys, PaletteKeys>;

// Trigger error on invalid overlap
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const validateThemeKeyUniqueness: ValidateNoOverlap = true;
