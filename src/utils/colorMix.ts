import { formatHex, interpolate, type Mode } from 'culori';
import type { ColorSpace } from '../types/data.ts';

const CULORI_COLOR_SPACE_MAP: Record<ColorSpace, Mode> = {
  srgb: 'rgb',
  oklch: 'oklch',
  oklab: 'oklab',
  hsl: 'hsl',
};

export function colorMix(
  colorSpace: ColorSpace,
  color1: string,
  color2: string,
  p1: number,
  p2: number,
): string {
  try {
    const culoriSpace = CULORI_COLOR_SPACE_MAP[colorSpace];
    const mix = interpolate([color1, color2], culoriSpace);
    // Normalize percentages: p2 / (p1 + p2) gives the interpolation position
    const total = p1 + p2;
    const t = total > 0 ? p2 / total : 0.5;
    const result = mix(t);
    return formatHex(result) || '#000000';
  } catch {
    return '#000000';
  }
}

export function generateCssRule(
  colorSpace: ColorSpace,
  p1: number,
  p2: number,
): string {
  return `color-mix(in ${colorSpace}, var(--c-primary) ${p1}%, var(--c-secondary) ${p2}%)`;
}
