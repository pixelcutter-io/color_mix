import type { AriaAttributes, AriaRole } from 'react';

export type Classnames<T extends string> = {
  [P in T]?: string;
};

export type SizeType =
  | 'dc'
  | 'nn'
  | 'eg'
  | 'sp'
  | 'st'
  | 'qt'
  | 'qr'
  | 'tr'
  | 'big'
  | 'db'
  | 'xxl'
  | 'xl'
  | 'lg'
  | 'df'
  | 'md'
  | 'sm'
  | 'xs'
  | 'xxs'
  | 'us'
  | 'uxs'
  | 'uxxs';

export type ColorType =
  | 'dark'
  | 'dark-2'
  | 'light'
  | 'light-2'
  | 'body'
  | 'accent';

export type IconPositionType = 'before' | 'after';

export type HtmlTagType =
  | 'article'
  | 'aside'
  | 'div'
  | 'footer'
  | 'form'
  | 'header'
  | 'section'
  | 'nav'
  | 'ul';

// Button
export type ButtonThemeType = 'fill' | 'outline' | 'ghost' | 'text';
export type ButtonSizeType = Extract<
  SizeType,
  'tr' | 'big' | 'db' | 'xxl' | 'df'
>;

// Divider
export type DividerThemeType = 'line' | 'vertical' | 'space' | 'big';

// Flex
export type FlexDirectionType =
  | 'row'
  | 'row-reverse'
  | 'column'
  | 'column-reverse';
export type FlexJustifyType =
  | 'flex-start'
  | 'center'
  | 'flex-end'
  | 'space-between'
  | 'space-around';
export type FlexAlignType =
  | 'flex-start'
  | 'center'
  | 'flex-end'
  | 'stretch'
  | 'baseline';
export type FlexWrapType = 'nowrap' | 'wrap' | 'wrap-reverse';

// Typo
export type TypoFamilyType = 'main' | 'secondary' | 'mono';
export type TypoTagType = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'label' | 'span';
export type TypoSizeType = Exclude<SizeType, 'us' | 'uxs' | 'uxxs'>;
export type TypoWeightType = 'regular' | 'medium' | 'semi' | 'bold' | 'black';
export type TypoLineHeightType = 'default' | 'paragraph';
export type TypoAlignType = 'left' | 'center' | 'right';
export type TypoDecorationType = 'none' | 'underline' | 'overline';

// A11y
export type A11yType = {
  role?: AriaRole;
  label?: AriaAttributes['aria-label'];
  hidden?: AriaAttributes['aria-hidden'];
  expanded?: AriaAttributes['aria-expanded'];
  controls?: AriaAttributes['aria-controls'];
  haspopup?: AriaAttributes['aria-haspopup'];
  orientation?: AriaAttributes['aria-orientation'];
  describedBy?: AriaAttributes['aria-describedby'];
  htmlFor?: string;
  tabIndex?: number;
};
