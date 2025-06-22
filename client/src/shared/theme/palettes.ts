import { Theme } from '@/shared/theme/theme.ts';
import { IThemeColor } from '@/shared/theme/colors/IThemeColor';
import { LightThemeColors } from '@/shared/theme/colors/LightThemeColors';
import { DarkThemeColors } from '@/shared/theme/colors/DarkThemeColors';

export const palettes: Record<Theme, IThemeColor> = {
  light: LightThemeColors,
  dark: DarkThemeColors,
};
