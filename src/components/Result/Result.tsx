import { useState } from 'react';
import type { ColorSpace } from '@/types/data.ts';
import { generateCssRule } from '@/utils/colorMix.ts';
import { getContrastTextColor } from '@/utils/contrast.ts';
import s from './Result.module.scss';

interface IResult {
  colorSpace: ColorSpace;
  primaryColor: string;
  secondaryColor: string;
  resultColor: string;
  primaryPercentage: number;
  secondaryPercentage: number;
}

const Result = (props: IResult) => {
  const { colorSpace, resultColor, primaryPercentage, secondaryPercentage } =
    props;
  const [copiedColor, setCopiedColor] = useState(false);
  const [copiedRule, setCopiedRule] = useState(false);
  const cssRule = generateCssRule(
    colorSpace,
    primaryPercentage,
    secondaryPercentage,
  );
  const textColor = getContrastTextColor(resultColor);

  const handleCopy = (value: string, setCopied: (v: boolean) => void) => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div>
      <div style={{ backgroundColor: resultColor, color: textColor }}>
        <button type="button" onClick={() => handleCopy(resultColor, setCopiedColor)}>
          {copiedColor ? 'Copied!' : resultColor.toUpperCase()}
        </button>
      </div>

      <div>
        <div>
          <code>{cssRule}</code>
          <button type="button" onClick={() => handleCopy(cssRule, setCopiedRule)} title="Copy to clipboard">
            {copiedRule ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;
