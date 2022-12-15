import LogoSvg from 'src/assets/svg/logo.svg';
import styles from './logo.module.scss';

const Logo = () => {
  return (
    <div className={styles.logoWrapper}>
      <span className={`${styles.logoText} ${styles.textUp}`}>YOUR</span>
      <LogoSvg
        className={styles.logo}
        alt="logo"
      />
      <span className={`${styles.logoText} ${styles.textDown}`}>FORMATION</span>
    </div>
  );
};

export default Logo;
