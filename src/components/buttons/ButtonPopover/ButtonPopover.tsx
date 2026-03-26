'use client';

import {
  type CSSProperties,
  Fragment,
  type ReactNode,
  useRef,
} from 'react';

import type { IButton } from '@/components/buttons/Button/Button';
import type {
  Classnames,
  OpenDirectionType,
  OpenToType,
} from '@/types/components';

import Button from '@/components/buttons/Button';
import Portal from '@/components/utils/Portal';
import { Keyboard } from '@/constants';
import useClickOutside from '@/hooks/useClickOutside';
import useElementSize from '@/hooks/useElementSize';

import cx from 'clsx';
import s from './ButtonPopover.module.scss';

import { motion } from 'framer-motion';

export interface IButtonPopover extends IButton {
  children?: ReactNode;
  maxWidth?: string;
  openTo?: OpenToType;
  openDirection?: OpenDirectionType;
  open: boolean;
  onOpen: () => void;
  onClose?: () => void;
  showParent?: boolean;
  classNames?: Classnames<'content' | 'children'>;
}

const ButtonPopover = (props: IButtonPopover) => {
  const {
    maxWidth = '15rem',
    theme,
    size,
    label,
    icon,
    iconPosition,
    color,
    children,
    loading,
    disabled,
    openTo = ['top', 'left'],
    openDirection,
    open,
    onOpen,
    onClose,
    showParent,
    classNames,
  } = props;
  const parentRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { width, height } = useElementSize(parentRef);

  const focusParent = () => {
    (parentRef.current as HTMLElement)?.focus();
  };

  const handleClose = () => {
    focusParent();
    onClose?.();
  };

  useClickOutside(parentRef, contentRef, open, handleClose);

  const handleAnimationComplete = () => {
    if (!open) return;
    contentRef.current?.focus();
  };

  const animeContent = {
    variants: {
      open: { width: maxWidth, height: 'auto', opacity: 1 },
      close: { width: `${width}px`, height: `${height}px`, opacity: 1 },
    },
  };

  const renderButton = () => {
    return (
      <Button
        ref={parentRef}
        classNames={{
          button: cx(s.btn, {
            [s.open]: open && !showParent,
          }),
        }}
        label={label}
        icon={icon}
        iconPosition={iconPosition}
        onClick={onOpen}
        theme={theme}
        color={color}
        size={size}
        disabled={disabled}
        loading={loading}
      />
    );
  };

  const renderContent = () => {
    return (
      <motion.div
        ref={contentRef}
        className={cx(s.content, classNames?.content, {
          [s.showParent]: showParent,
        })}
        style={
          { '--l-w': maxWidth, '--l-h-parent': `${height}px` } as CSSProperties
        }
        initial={'close'}
        animate={'open'}
        exit={'close'}
        variants={animeContent.variants}
        transition={{ duration: 0.25, ease: 'linear' }}
        onAnimationComplete={handleAnimationComplete}
        onKeyDown={(event) => {
          if (event.key === Keyboard.ESC) {
            handleClose();
          }
        }}
        tabIndex={-1}
      >
        <div className={cx(s.children, classNames?.children)} tabIndex={-1}>
          {children}
        </div>
      </motion.div>
    );
  };

  return (
    <Fragment>
      {renderButton()}
      <Portal
        className={cx(s.portal, { [s.showParent]: showParent })}
        opened={open}
        bindTo={parentRef.current as HTMLElement}
        openTo={openTo}
        openDirection={openDirection}
        parentWidth={false}
      >
        {renderContent()}
      </Portal>
    </Fragment>
  );
};

export default ButtonPopover;
