'use client';

import type { CSSProperties, MouseEvent, Ref } from 'react';

import type { Url } from 'next/dist/shared/lib/router/router';
import Link from 'next/link';

import type {
  ButtonColorType,
  ButtonSizeType,
  ButtonThemeType,
  Classnames,
  IconPositionType,
} from '@/types/components';

import LoaderIcon from '@/components/loaders/LoaderIcon';
import Typo from '@/components/typography/Typo';
import Icon from '@/components/utils/Icon';

import cx from 'clsx';
import s from './Button.module.scss';

export interface IButton {
  minWidth?: number | string;
  label?: string;
  title?: string;
  icon?: string;
  iconPosition?: IconPositionType;
  type?: 'button' | 'submit' | 'reset' | 'link' | undefined;
  theme?: ButtonThemeType;
  size?: ButtonSizeType;
  color?: ButtonColorType;
  loading?: boolean;
  disabled?: boolean;
  href?: Url;
  target?: '_blank' | '_self' | undefined;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  ref?: Ref<HTMLButtonElement> | Ref<HTMLAnchorElement>;
  classNames?: Classnames<'button' | 'content' | 'label' | 'icon'>;
}

const Button = (props: IButton) => {
  const {
    minWidth = 10,
    label,
    icon,
    iconPosition,
    title,
    type = 'button',
    theme = 'fill',
    size = 'tr',
    color = 'grey',
    loading,
    disabled,
    href,
    target = '_self',
    onClick,
    ref,
    classNames,
  } = props;

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (typeof onClick === 'function') {
      onClick(event);
    }
  };

  const renderLoading = () => {
    if (!loading) return null;
    return (
      <div className={s.wrapLoader}>
        <LoaderIcon
          size={2.5}
          color={theme === 'fill' ? 'invert' : color}
          theme={'signature'}
        />
      </div>
    );
  };

  const renderIcon = () => {
    if (!icon) return null;
    return <Icon className={cx(s.icon, classNames?.icon)} src={icon} />;
  };

  const renderLabel = () => {
    if (!label) return null;
    return (
      <Typo
        className={cx(s.label, classNames?.label)}
        text={label}
        size={'df'}
        weight={'medium'}
        align={'center'}
      />
    );
  };

  const renderContent = () => {
    return (
      <div className={cx(s.content, classNames?.content)}>
        {renderIcon()}
        {renderLabel()}
      </div>
    );
  };

  const sharedProps = {
    className: cx(s.btn, classNames?.button, s[theme], s[size], {
      [s.onlyIcon]: icon && !label,
      [s.disabled]: disabled || loading,
    }),
    style: {
      '--l-w-min': typeof minWidth === 'number' ? `${minWidth}rem` : minWidth,
      '--l-color': `var(--c-${color})`,
      '--l-icon-position': iconPosition === 'before' ? 'row' : 'row-reverse',
    } as CSSProperties,
    disabled: disabled || loading,
    'data-loading': loading || undefined,
  };

  if (href || type === 'link') {
    return (
      <Link
        {...sharedProps}
        ref={ref as Ref<HTMLAnchorElement>}
        href={href || ''}
        target={target}
        title={title}
      >
        {renderLoading()}
        {renderContent()}
      </Link>
    );
  }

  return (
    <button
      {...sharedProps}
      ref={ref as Ref<HTMLButtonElement>}
      onClick={handleClick}
      type={type}
      title={title}
    >
      {renderLoading()}
      {renderContent()}
    </button>
  );
};

export default Button;
