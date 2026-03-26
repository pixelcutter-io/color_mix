'use client';

import { useState } from 'react';

import type { IButtonPopover } from '@/components/buttons/ButtonPopover/ButtonPopover';

import { check, xmark } from '@/assets/icons';
import Button from '@/components/buttons/Button';
import ButtonPopover from '@/components/buttons/ButtonPopover';
import MarkdownText from '@/components/typography/MarkdownText';
import Flex from '@/components/utils/Flex';

import { useTranslations } from 'next-intl';

export interface IButtonConfirm
  extends Omit<IButtonPopover, 'onOpen' | 'onClose' | 'open'> {
  text: string;
  onClick?: (...args: any[]) => void;
}
const ButtonConfirm = (props: IButtonConfirm) => {
  const {
    label,
    icon,
    size = 'big',
    theme = 'ghost',
    color,
    text,
    openTo = ['top', 'right'],
    openDirection = 'down',
    onClick,
  } = props;
  const t = useTranslations();

  const [showConfirm, setShowConfirm] = useState(false);

  const handleConfirm = () => {
    if (typeof onClick === 'function') {
      onClick();
    }
    setShowConfirm(false);
  };

  const renderConfirmButton = () => {
    return (
      <Button
        minWidth={3.5}
        label={t('action.yes')}
        icon={check}
        iconPosition={'before'}
        onClick={handleConfirm}
        theme={'fill'}
        color={'accent'}
        size={'db'}
      />
    );
  };

  const renderCancelButton = () => {
    return (
      <Button
        minWidth={3.5}
        label={t('action.no')}
        icon={xmark}
        iconPosition={'before'}
        onClick={() => setShowConfirm(false)}
        theme={'outline'}
        size={'db'}
      />
    );
  };

  return (
    <ButtonPopover
      label={label}
      icon={icon}
      open={showConfirm}
      onOpen={() => setShowConfirm(true)}
      onClose={() => setShowConfirm(false)}
      size={size}
      theme={theme}
      color={color}
      openTo={openTo}
      openDirection={openDirection}
    >
      <Flex direction={'column'} justify={'center'} align={'stretch'} gap={1}>
        <MarkdownText text={text} align={'center'} baseSize={'md'} />
        <Flex justify={'center'} align={'center'} gap={0.5}>
          {renderConfirmButton()}
          {renderCancelButton()}
        </Flex>
      </Flex>
    </ButtonPopover>
  );
};

export default ButtonConfirm;
