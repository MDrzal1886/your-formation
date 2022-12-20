import { RefObject, useEffect } from 'react';

const useBackdrop = <T extends HTMLElement>(
  ref: RefObject<T>,
  handleClose: () => void
) => {
  useEffect(() => {
    const handleBackdropClick = (e: MouseEvent | TouchEvent) => {
      if (
        ref.current &&
        e.target instanceof HTMLElement &&
        !ref.current.contains(e.target)
      ) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleBackdropClick);
    document.addEventListener('touchstart', handleBackdropClick);
    return () => {
      document.removeEventListener('mousedown', handleBackdropClick);
      document.removeEventListener('touchstart', handleBackdropClick);
    };
  }, [ref]);
};

export default useBackdrop;
