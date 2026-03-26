import type { ChangeEvent, KeyboardEvent, MouseEvent } from 'react';
import { useId } from 'react';

import { Keyboard } from '@/constants';

export type A11yEvent<T> = MouseEvent<T> | KeyboardEvent<T> | ChangeEvent<T>;

export default function useA11y() {
  const reactId = useId();

  const makeId = (id: string, ...inputs: Array<string>) => {
    return [id || reactId, ...inputs].filter(Boolean).join('_');
  };

  const getDirection = (key: string): number => {
    switch (key) {
      case Keyboard.DOWN:
      case Keyboard.RIGHT:
        return 1;
      case Keyboard.UP:
      case Keyboard.LEFT:
        return -1;
      default:
        return 0;
    }
  };

  const handleListNav = <T extends HTMLElement>(params: {
    event: A11yEvent<T>;
    active: number;
    total: number;
    setIndex: (i: number) => void;
    onEnter: (i: number, event: KeyboardEvent<T>) => void;
    onEsc: (event: KeyboardEvent<T>) => void;
    blockDefault?: () => boolean;
  }) => {
    const event = params.event as KeyboardEvent<T>;
    const { active, total, blockDefault = () => true } = params;
    const newIndex = (active + getDirection(event.key) + total) % total;

    const shouldBlock = blockDefault();

    switch (event.key) {
      case Keyboard.DOWN:
      case Keyboard.UP:
      case Keyboard.RIGHT:
      case Keyboard.LEFT:
        event.preventDefault();
        params.setIndex(newIndex);
        return;
      default:
        break;
    }

    if (event.key === Keyboard.ENTER) {
      if (active < 0) return;
      if (shouldBlock) {
        event.preventDefault();
        params.onEnter(active, event);
      }
    }

    if (event.key === Keyboard.TAB) {
      if (!event.shiftKey) {
        params.setIndex(-1);
        params.onEsc(event);
      }
    }

    if (event.key === Keyboard.ESC) {
      params.setIndex(-1);
      params.onEsc(event);
    }
  };

  return {
    makeId,
    getDirection,
    handleListNav,
  };
}
