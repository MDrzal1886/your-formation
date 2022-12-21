import { RefObject, useEffect } from 'react';

import useNotificationContext from 'src/context/NotificationContext';

const useBackdrop = <T extends HTMLElement>(
  ref: RefObject<T>,
  handleClose: () => void
) => {
  const { notificationRef } = useNotificationContext();

  useEffect(() => {
    const handleBackdropClick = (e: MouseEvent | TouchEvent) => {
      if (
        ref.current &&
        e.target instanceof HTMLElement &&
        !ref.current.contains(e.target) &&
        !notificationRef?.current?.contains(e.target)
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
  }, []);
};

export default useBackdrop;
