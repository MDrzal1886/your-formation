import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

import Sun from 'src/assets/svg/sun.svg';
import Moon from 'src/assets/svg/moon.svg';
import styles from './themeSwitch.module.scss';

const ThemeSwitch = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
      return;
    }
    setTheme('light');
  };

  const currentTheme = theme === 'system' ? systemTheme : theme;

  if (!mounted) {
    return null;
  }

  return (
    <div
      className={`${styles.switch} ${
        currentTheme === 'dark' ? styles.switchDark : styles.switchLight
      }`}
      onClick={(e) => {
        e.currentTarget.blur();
        toggleTheme();
      }}
      onKeyDown={(e) => {
        if (e.code !== 'Enter') return;
        toggleTheme();
      }}
      tabIndex={1}
    >
      <div
        className={`${styles.dot} ${
          currentTheme === 'dark' ? styles.dotDark : styles.dotLight
        }`}
      >
        {currentTheme === 'dark' ? <Sun /> : <Moon />}
      </div>
    </div>
  );
};

export default ThemeSwitch;
