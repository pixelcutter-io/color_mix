import {
  type Dispatch,
  type RefObject,
  type SetStateAction,
  useEffect,
  useState,
} from 'react';

export default function useClickOutside(
  parentRef: RefObject<HTMLElement | null>,
  childrenRef: RefObject<HTMLElement | null>,
  enabled: boolean,
  onClose?: () => void,
): [boolean, Dispatch<SetStateAction<boolean>>] {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const handleClick = (event: MouseEvent) => {
      if (
        parentRef.current &&
        !parentRef.current.contains(event.target as Node) &&
        childrenRef.current &&
        !childrenRef.current.contains(event.target as Node)
      ) {
        setShow(false);
        onClose?.();
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [enabled, onClose, parentRef, childrenRef]);

  return [show, setShow];
}
