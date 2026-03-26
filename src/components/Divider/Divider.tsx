import type { CSSProperties } from 'react';

import type {
  Classnames,
  ColorType,
  DividerThemeType,
} from '@/types/components';

import cx from 'clsx';
import s from './Divider.module.scss';

export interface IDivider {
  theme?: DividerThemeType;
  spacing?: number | [number, number];
  color?: ColorType;
  classNames?: Classnames<'wrapper'>;
}

const Divider = (props: IDivider) => {
  const {
    theme = 'line',
    spacing = 1.5,
    color = 'light-2',
    classNames,
  } = props;

  const [before, after] = Array.isArray(spacing) ? spacing : [spacing, spacing];

  const renderLine = () => {
    if (theme === 'space') return null;
    return <div className={s.line} />;
  };

  return (
    <div
      className={cx(classNames?.wrapper, s.wrapper, s[theme])}
      style={
        {
          '--ls': `${before}rem ${after}rem `,
          '--lc-line': `var(--c-${color})`,
        } as CSSProperties
      }
    >
      {renderLine()}
    </div>
  );
};

export default Divider;
