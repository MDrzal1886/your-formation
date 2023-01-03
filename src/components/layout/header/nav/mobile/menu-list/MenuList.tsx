import { FC, useEffect, useRef } from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import gsap from 'gsap';

import styles from './menuList.module.scss';
import useFocusTrap from 'src/hooks/useFocusTrap';
import { routeLinks } from 'src/dictionary/routeLinks';
import ThemeSwitch from 'src/components/design-system/theme-switch/ThemeSwitch';
import useModalContext from 'src/context/ModalContext';
import { ModalsContent } from 'src/utils/getModalsContent';
import useNotificationContext, {
  NotificationStatus
} from 'src/context/NotificationContext';
import Button from 'src/components/design-system/button/Button';

interface IProps {
  isMenuOpen: boolean;
  hamburgerButton: HTMLButtonElement | null;
  closeMenu: () => void;
}

const MenuList: FC<IProps> = ({ isMenuOpen, hamburgerButton, closeMenu }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  const { openModal, passModalContent } = useModalContext();

  const { showNotification } = useNotificationContext();

  const { status } = useSession();

  const logOut = async () => {
    try {
      const res = await signOut({
        redirect: false
      });

      if (res.url) {
        showNotification({
          title: 'You are log out',
          status: NotificationStatus.Success,
          message: 'Success'
        });
      }
    } catch (error) {
      showNotification({
        title: 'You are not log out',
        status: NotificationStatus.Error,
        message: 'Error'
      });
      console.log(error);
    }
  };

  const logInClick = () => {
    closeMenu();
    passModalContent(ModalsContent.LogIn);
    openModal();
  };

  const signUpClick = () => {
    closeMenu();
    passModalContent(ModalsContent.SignUp);
    openModal();
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
      <Button
        text={status === 'authenticated' ? 'Log out' : 'Log in'}
        onClickFn={status === 'authenticated' ? logOut : logInClick}
      />
      <Button
        text="Sign up"
        onClickFn={signUpClick}
      />
      <ThemeSwitch />
    </div>
  );
};

export default MenuList;
