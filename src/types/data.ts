export type ColorSpace = 'srgb' | 'oklch' | 'oklab' | 'hsl';

export interface AppState {
  colorSpace: ColorSpace;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  primaryPercentage: number;
  secondaryPercentage: number;
}
