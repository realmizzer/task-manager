import { createContext } from 'react';
import { Theme } from '@/shared/theme/theme';
import { IThemeColor } from '@/shared/theme/colors/IThemeColor';

export type ThemeContextValues = {
  currentTheme: Theme;
  colors: IThemeColor;
  switchTheme(theme: Theme): void;
};

export const ThemeContext = createContext<ThemeContextValues | null>(null);
