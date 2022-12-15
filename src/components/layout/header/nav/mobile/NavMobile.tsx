import { useRef, useState } from 'react';

import styles from './navMobile.module.scss';
import Hamburger from './hamburger/Hamburger';
import MenuList from './menu-list/MenuList';

const NavMobile = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const onHamburgerClick = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={styles.navWrapper}>
      <button
        className={styles.hamburgerButton}
        onClick={onHamburgerClick}
        ref={hamburgerRef}
      >
        <Hamburger isMenuOpen={isMenuOpen} />
      </button>
      <MenuList
        isMenuOpen={isMenuOpen}
        hamburgerButton={hamburgerRef.current}
        closeMenu={closeMenu}
      />
    </nav>
  );
};

export default NavMobile;
