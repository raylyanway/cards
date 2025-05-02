export const palette = {
    black: '#080808',
    blue: '#1e90ff',
    gold: '#ffd700',
    gray: '#525252',
    grayDark: '#262626',
    grayLight: '#a3a3a3',
    green: '#22c55e',
    orange: '#fb923c',
    tomato: '#ff6347',
    white: '#fafafa'
  };
  
  const darkTheme = {
    background: palette.black,
    backgroundBlock: palette.grayDark,
    border: palette.gray,
    error: palette.tomato,
    primary: palette.blue,
    warning: palette.gold,
    success: palette.green,
    text: palette.white,
    textSecondary: palette.grayLight
  };
  
  
  export const themedColors: {
    dark: ThemeDefinition;
    light: ThemeDefinition;
  } = {
    dark: darkTheme,
    light: {
      background: palette.white,
      backgroundBlock: palette.grayDark,
      border: palette.gray,
      error: palette.tomato,
      primary: palette.blue,
      warning: palette.gold,
      success: palette.green,
      text: palette.black,
      textSecondary: palette.grayLight
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