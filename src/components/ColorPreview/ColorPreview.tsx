import type { ColorPreviewProps } from '../../types/data.ts';
import { getContrastTextColor } from '../../utils/contrast';
import styles from './ColorPreview.module.scss';

interface PreviewBoxProps {
  outerColor: string;
  innerColor: string;
  outerLabel: string;
  innerLabel: string;
}

function PreviewBox({
  outerColor,
  innerColor,
  outerLabel,
  innerLabel,
}: PreviewBoxProps) {
  const outerTextColor = getContrastTextColor(outerColor);
  const innerTextColor = getContrastTextColor(innerColor);

  return (
    <div
      className={styles.previewBox}
      style={{ backgroundColor: outerColor, color: outerTextColor }}
    >
      <span className={styles.outerLabel}>{outerLabel}</span>
      <div
        className={styles.innerBox}
        style={{ backgroundColor: innerColor, color: innerTextColor }}
      >
        <span className={styles.innerLabel}>{innerLabel}</span>
      </div>
    </div>
  );
}

export function ColorPreview({
  backgroundColor,
  primaryColor,
  resultColor,
}: ColorPreviewProps) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Preview</h2>
      <div className={styles.previewGrid}>
        <PreviewBox
          outerColor={backgroundColor}
          innerColor={resultColor}
          outerLabel="BG"
          innerLabel="Result"
        />
        <PreviewBox
          outerColor={primaryColor}
          innerColor={resultColor}
          outerLabel="Primary"
          innerLabel="Result"
        />
        <PreviewBox
          outerColor={resultColor}
          innerColor={primaryColor}
          outerLabel="Result"
          innerLabel="Primary"
        />
      </div>
    </div>
  );
}
