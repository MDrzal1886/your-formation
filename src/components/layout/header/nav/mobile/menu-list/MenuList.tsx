import { FC, useEffect, useRef } from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import gsap from 'gsap';

import styles from './menuList.module.scss';
import useFocusTrap from 'src/hooks/useFocusTrap';
import { routeLinks } from 'src/dictionary/routeLinks';
import ThemeSwitch from 'src/components/theme-switch/ThemeSwitch';
import useModalContext from 'src/context/ModalContext';
import { ModalsContent } from 'src/utils/getModalsContent';

interface IProps {
  isMenuOpen: boolean;
  hamburgerButton: HTMLButtonElement | null;
  closeMenu: () => void;
}

const MenuList: FC<IProps> = ({ isMenuOpen, hamburgerButton, closeMenu }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  const { openModal, passModalContent } = useModalContext();

  const { status } = useSession();

  const logOut = async () => {
    try {
      await signOut({
        redirect: false
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!menuRef.current) return;

    const menuElement = menuRef.current;
    const tl = gsap.timeline();

    if (isMenuOpen) {
      const { keydownCallback } = useFocusTrap(menuElement, hamburgerButton);
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', keydownCallback);

      tl.to([menuElement], {
        y: '+=100vh',
        visibility: 'visible',
        duration: 0.5
      });
      return () => {
        document.removeEventListener('keydown', keydownCallback);
      };
    }

    document.body.style.overflow = 'auto';

    tl.to([menuElement], { y: 0, duration: 0.5 }).to([menuElement], {
      visibility: 'hidden'
    });
  }, [isMenuOpen]);

  return (
    <div
      className={styles.menuWrapper}
      ref={menuRef}
    >
      <ul>
        <li>
          <Link
            href={routeLinks.home}
            onClick={closeMenu}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href={routeLinks.test}
            onClick={closeMenu}
          >
            Test
          </Link>
        </li>
      </ul>
      {status === 'authenticated' ? (
        <button onClick={logOut}>Log out</button>
      ) : (
        <button
          onClick={() => {
            closeMenu();
            passModalContent(ModalsContent.LogIn);
            openModal();
          }}
        >
          Log in
        </button>
      )}
      <button
        onClick={() => {
          closeMenu();
          passModalContent(ModalsContent.SignUp);
          openModal();
        }}
      >
        Sign Up
      </button>
      <ThemeSwitch />
    </div>
  );
};

export default MenuList;
