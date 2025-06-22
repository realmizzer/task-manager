import { PropsWithChildren, useState } from 'react';
import { ThemeContext, ThemeContextValues } from '@/shared/theme/themeContext';
import { Theme } from '@/shared/theme/theme';
import { IThemeColor } from '@/shared/theme/colors/IThemeColor';
import { LightThemeColors } from '@/shared/theme/colors/LightThemeColors';
import { palettes } from '@/shared/theme/palettes';

export const ThemeProvider = (props: PropsWithChildren) => {
  const { children } = props;

  const [currentTheme, setCurrentTheme] = useState<Theme>('light');
  const [colors, setColors] = useState<IThemeColor>(LightThemeColors);

  const switchTheme = (theme: Theme) => {
    setCurrentTheme(theme);
    setColors(palettes[theme]);
  };

  const value: ThemeContextValues = {
    currentTheme,
    colors,
    switchTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
