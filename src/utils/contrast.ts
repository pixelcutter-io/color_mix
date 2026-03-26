import { parse, wcagLuminance } from 'culori';

export function getContrastTextColor(
  backgroundColor: string,
): 'dark' | 'light' {
  const color = parse(backgroundColor);
  if (!color) return 'dark';

  const luminance = wcagLuminance(color);
  return luminance > 0.179 ? 'dark' : 'light';
}
