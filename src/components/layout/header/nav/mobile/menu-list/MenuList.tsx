import { FC, useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';

import styles from './menuList.module.scss';
import useFocusTrap from 'src/hooks/useFocusTrap';
import { routeLinks } from 'src/dictionary/routeLinks';

interface IProps {
  isMenuOpen: boolean;
  hamburgerButton: HTMLButtonElement | null;
  closeMenu: () => void;
}

const MenuList: FC<IProps> = ({ isMenuOpen, hamburgerButton, closeMenu }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuRef.current) return;

    const menuElement = menuRef.current;
    const tl = gsap.timeline();

    const { keydownCallback } = useFocusTrap(menuRef.current, hamburgerButton);

    if (isMenuOpen) {
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
    </div>
  );
};

export default MenuList;
