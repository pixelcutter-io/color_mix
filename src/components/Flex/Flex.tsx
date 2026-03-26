import cx from 'clsx';
import { type CSSProperties, createElement, type ReactNode } from 'react';
import type {
  A11yType,
  FlexAlignType,
  FlexDirectionType,
  FlexJustifyType,
  FlexWrapType,
  HtmlTagType,
} from '@/types/components';
import s from './Flex.module.scss';

export interface IFlex {
  children: ReactNode;
  tag?: HtmlTagType;
  width?: 'full' | 'fit-content';
  direction?: FlexDirectionType;
  justify?: FlexJustifyType;
  align?: FlexAlignType;
  wrap?: FlexWrapType;
  gap?: number | [number, number];
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
  a11y?: A11yType;
}

const Flex = (props: IFlex) => {
  const {
    children,
    tag = 'div',
    width = 'full',
    direction = 'row',
    justify = 'flex-start',
    align = 'flex-start',
    wrap = 'nowrap',
    gap = 0,
    onClick,
    className,
    a11y,
    ...rest
  } = props;

  const [rowGap, colGap] = Array.isArray(gap) ? gap : [gap, gap];

  const flexProps = {
    ...rest,
    onClick,
    role: a11y?.role,
    tabIndex: a11y?.tabIndex,
    'aria-label': a11y?.label,
    className: cx(s.wrapper, className, { [s.hasClick]: onClick }),
    style: {
      '--l-width': width === 'full' ? '100%' : 'fit-content',
      '--l-direction': direction,
      '--l-justify': justify,
      '--l-align': align,
      '--l-row-gap': rowGap,
      '--l-column-gap': colGap,
      '--l-wrap': wrap,
      ...props.style,
    } as CSSProperties,
  };
  return createElement(tag, flexProps, children);
};

export default Flex;
