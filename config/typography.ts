export const palette = {
  black: '#0a0a0a',
  grayExtraDark: '#151515',
  grayDark: '#2b2b2b',
  gray: '#5a5a5a',
  grayLight: '#909090',
  grayExtraLight: '#ddd',
  white: '#eee',
  tomato: '#ff6347',
  orange: '#fb923c',
  gold: '#ffd700',
  green: '#22c55e',
  blue: '#1e90ff'
};

const darkTheme = {
  background: palette.grayExtraDark,
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
    text: palette.grayExtraDark,
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

export const elevations = {
  sm: 1,
  md: 4,
  lg: 8
};

export const fontSizes = {
  sm: 20,
  md: 24,
  lg: 36
};

export const fontWeights = {
  normal: '400',
  semibold: '600',
  bold: '700'
} as const;

export const lineHeights = {
  sm: 22,
  md: 26,
  lg: 38
};

export const opacities = {
  none: 0,
  xs: 0.1,
  sm: 0.3,
  md: 0.5,
  lg: 0.7,
  xl: 0.9,
  full: 1
};

export const radii = {
  sm: 4,
  md: 6,
  lg: 8
};

export const spaces = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20
};

export const shadows = (color: string) => ({
  md: {
    elevation: elevations.md,
    shadowColor: color,
    shadowOffset: {
      height: 1,
      width: 0
    },
    shadowOpacity: opacities.sm,
    shadowRadius: radii.md
  }
});
