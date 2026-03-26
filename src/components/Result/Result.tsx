import { Fragment, useState } from 'react';
import type { ColorSpace } from '@/types/data.ts';
import { generateCssRule } from '@/utils/colorMix.ts';
import { getContrastTextColor } from '@/utils/contrast.ts';
import s from './Result.module.scss';
import Icon from '@/components/Icon';
import { copy, check } from '@/assets/icons';
import Typo from '@/components/Typo';
import Flex from '@/components/Flex';

interface IResult {
  colorSpace: ColorSpace;
  primaryColor: string;
  secondaryColor: string;
  resultColor: string;
  primaryPercentage: number;
  secondaryPercentage: number;
}

const Result = (props: IResult) => {
  const {
    colorSpace,
    primaryColor,
    secondaryColor,
    resultColor,
    primaryPercentage,
    secondaryPercentage,
  } = props;
  const [copiedColor, setCopiedColor] = useState(false);
  const [copiedRule, setCopiedRule] = useState(false);
  const cssRule = generateCssRule(
    colorSpace,
    primaryPercentage,
    secondaryPercentage,
    primaryColor,
    secondaryColor,
  );
  const textColor = getContrastTextColor(resultColor);

  const handleCopy = (value: string, setCopied: (v: boolean) => void) => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const renderCopy = (type: 'hex' | 'css') => {
    const value = type === 'hex' ? resultColor : cssRule;
    const copied = type === 'hex' ? copiedColor : copiedRule;
    const setCopied = type === 'hex' ? setCopiedColor : setCopiedRule;
    return (
      <button
        className={s.copy}
        type="button"
        onClick={() => handleCopy(value, setCopied)}
      >
        <Icon
          src={copied ? check : copy}
          size={0.75}
          color={type === 'hex' ? textColor : 'light'}
        />
      </button>
    );
  };

  const renderColor = () => {
    return (
      <Flex
        className={s.color}
        style={{ backgroundColor: resultColor }}
        justify={'center'}
        align={'center'}
      >
        <Typo
          text={resultColor}
          color={textColor}
          weight={'semi'}
          size={'tr'}
        />
        {renderCopy('hex')}
      </Flex>
    );
  };

  const renderCSS = () => {
    return (
      <code className={s.code}>
        {cssRule}
        {renderCopy('css')}
      </code>
    );
  };

  return (
    <Fragment>
      {renderColor()}
      {renderCSS()}
    </Fragment>
  );
};

export default Result;
