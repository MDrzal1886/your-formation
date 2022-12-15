import Link from 'next/link';

import styles from './header.module.scss';
import Logo from 'src/components/logo/Logo';
import { routeLinks } from 'src/dictionary/routeLinks';
import useMediaContext from 'src/context/MediaContext';
import NavDesktop from './nav/desktop/NavDesktop';
import NavMobile from './nav/mobile/NavMobile';

const Header = () => {
  const { isLg, isXl } = useMediaContext();
  return (
    <header className={styles.header}>
      <Link
        className={styles.logoWrapper}
        href={routeLinks.home}
      >
        <Logo />
      </Link>
      {isLg || isXl ? <NavDesktop /> : <NavMobile />}
    </header>
  );
};

export default Header;
