import { parse, wcagLuminance } from 'culori';

export function getContrastTextColor(
  backgroundColor: string,
): 'black' | 'white' {
  const color = parse(backgroundColor);
  if (!color) return 'black';

  const luminance = wcagLuminance(color);
  return luminance > 0.179 ? 'var(--c-dark)' : 'var(--c-light)';
}
