import type { CSSProperties } from 'react';

import type { Classnames } from '@/types/components';

import cx from 'clsx';
import s from './Logo.module.scss';

import Svg from 'react-inlinesvg';

export interface ILogo {
  src?: string | { src: string };
  maxHeight?: number;
  title?: string;
  classNames?: Classnames<'wrapper' | 'logo'>;
}

const Logo = (props: ILogo) => {
  const { maxHeight, title, classNames } = props;
  const src = typeof props.src === 'string' ? props.src : props.src?.src || '';
  return (
    <div
      className={cx(s.wrapper, classNames?.wrapper)}
      style={{ '--lh-max': `${maxHeight}rem` } as CSSProperties}
    >
      <Svg className={cx(s.logo, classNames?.logo)} src={src} title={title} />
    </div>
  );
};

export default Logo;
