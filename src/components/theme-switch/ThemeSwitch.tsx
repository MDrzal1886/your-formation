import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

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

  if (currentTheme === 'dark') {
    return <button onClick={toggleTheme}>Light</button>;
  }

  return <button onClick={toggleTheme}>Dark</button>;
};

export default ThemeSwitch;
