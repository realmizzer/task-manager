import { useContext } from 'react';
import { ThemeContext } from '@/shared/theme/themeContext';

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (context === null) {
    throw new Error("ThemeContext wasn't created");
  }

  return context;
};
