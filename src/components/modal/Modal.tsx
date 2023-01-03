import { useEffect, useRef } from 'react';
import gsap from 'gsap';

import styles from './modal.module.scss';
import Close from 'src/assets/svg/close.svg';
import useModalContext from 'src/context/ModalContext';
import useFocusTrap from 'src/hooks/useFocusTrap';
import useBackdrop from 'src/hooks/useBackdrop';
import { getModalContent } from 'src/utils/getModalsContent';

const Modal = () => {
  const backdropRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const { isModalOpen, modalContent, closeModal } = useModalContext();

  useBackdrop(modalRef, closeModal);

  useEffect(() => {
    if (!backdropRef.current || !modalRef.current) return;

    const backdropElement = backdropRef.current;
    const modalElement = modalRef.current;
    const tl = gsap.timeline();

    if (isModalOpen) {
      const { keydownCallback } = useFocusTrap(modalElement);

      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', keydownCallback);

      tl.to([backdropElement], {
        height: '2px',
        scaleX: 1,
        visibility: 'visible',
        duration: 0.3
      })
        .to([backdropElement], { height: '100vh', duration: 0.3 })
        .to([modalElement], { scale: 1, duration: 0.3 });

      return () => {
        document.removeEventListener('keydown', keydownCallback);
      };
    }

    document.body.style.overflow = 'auto';

    tl.to([modalElement], { scale: 0, duration: 0.3 })
      .to([backdropElement], { height: '2px', duration: 0.3 })
      .to([backdropElement], { scaleX: 0, duration: 0.3 })
      .to([backdropElement], {
        height: 0,
        visibility: 'hidden'
      });
  }, [isModalOpen]);

  return (
    <div
      className={styles.backdrop}
      ref={backdropRef}
    >
      <div
        className={styles.modal}
        ref={modalRef}
      >
        <div
          className={styles.closeIconWrapper}
          tabIndex={0}
          onClick={closeModal}
          onKeyDown={(e) => {
            if (e.code !== 'Enter') return;
            closeModal();
          }}
        >
          <Close
            className={styles.closeIcon}
            alt="close"
          />
        </div>
        {getModalContent(modalContent)}
      </div>
    </div>
  );
};

export default Modal;
