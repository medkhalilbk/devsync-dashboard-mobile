/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

const colors = {
  background: '#121212',
  text: '#EAEAEA',
  primary: '#BB86FC',
  secondary: '#03DAC6',
  border: '#333333',
  cardBackground: '#1E1E1E',
  buttonBackground: '#6200EE',
  buttonText: '#FFFFFF',
};

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    primary: colors.primary,
    secondary: colors.secondary,
    border: colors.border,
    cardBackground: colors.cardBackground,
    buttonBackground: colors.buttonBackground,
    buttonText: colors.buttonText,
  },
  dark: {
    text: colors.text,
    background: colors.background,
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    primary: colors.primary,
    secondary: colors.secondary,
    border: colors.border,
    cardBackground: colors.cardBackground,
    buttonBackground: colors.buttonBackground,
    buttonText: colors.buttonText,
  },
};
