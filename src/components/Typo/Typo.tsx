import cx from 'clsx';
import { createElement, useMemo } from 'react';
import type {
  A11yType,
  ColorType,
  TypoAlignType,
  TypoDecorationType,
  TypoFamilyType,
  TypoLineHeightType,
  TypoSizeType,
  TypoTagType,
  TypoWeightType,
} from '@/types/components';
import s from './Typo.module.scss';

export interface ITypo {
  text: string | number;
  tag?: TypoTagType;
  family?: TypoFamilyType;
  size?: TypoSizeType | [TypoSizeType, TypoSizeType];
  sizeIncrease?: number;
  weight?: TypoWeightType;
  lineHeight?: TypoLineHeightType;
  align?: TypoAlignType;
  decoration?: TypoDecorationType;
  color?: ColorType;
  hover?: boolean;
  balancer?: boolean;
  id?: string;
  className?: string;
  a11y?: A11yType;
}

const Typo = (props: ITypo) => {
  const {
    text,
    tag = 'span',
    family = 'main',
    size = 'df',
    sizeIncrease = 5,
    weight = 'regular',
    lineHeight = 'default',
    align = 'left',
    decoration = 'none',
    color = 'grey',
    hover = false,
    balancer = false,
    id,
    className,
    a11y,
  } = props;

  const [sizeMin, sizeMax] = Array.isArray(size) ? size : [size, size];

  const typoProps = useMemo(() => {
    return {
      id,
      className: cx(s.typo, className, {
        [s.balancer]: balancer,
        [s.hover]: hover,
      }),
      style: {
        '--l-c': `var(--c-${color})`,
        '--l-ff': `var(--ff-${family})`,
        '--l-fs-min': `var(--fs-${sizeMin})`,
        '--l-fs-max': `var(--fs-${sizeMax})`,
        '--l-fs-increase': `${sizeIncrease}vw`,
        '--l-fw': `var(--fw-${weight})`,
        '--l-lh': lineHeight === 'default' ? '0.25rem' : '0.5em',
        '--l-align': align,
        '--l-decoration': decoration,
      },
      role: a11y?.role,
      htmlFor: a11y?.htmlFor,
    };
  }, [
    family,
    weight,
    lineHeight,
    color,
    className,
    a11y?.htmlFor,
    a11y?.role,
    align,
    balancer,
    decoration,
    hover,
    id,
    sizeIncrease,
    sizeMax,
    sizeMin,
  ]);

  return createElement(tag, typoProps, text);
};

export default Typo;
