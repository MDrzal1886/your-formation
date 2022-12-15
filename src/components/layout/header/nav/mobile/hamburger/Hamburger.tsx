import { FC, useEffect, useRef } from 'react';
import gsap from 'gsap';

import styles from './hamburger.module.scss';
import HamburgerSvg from 'src/assets/svg/hamburger.svg';

interface IProps {
  isMenuOpen: boolean;
}

const Hamburger: FC<IProps> = ({ isMenuOpen }) => {
  const hamburgerRef = useRef<SVGElement>(null);

  useEffect(() => {
    if (!hamburgerRef.current) return;

    const elements = hamburgerRef.current.children;
    const topLine = elements[0];
    const middleLine = elements[1];
    const bottomLine = elements[2];

    const tl = gsap.timeline();

    if (isMenuOpen) {
      tl.add('slide')
        .to([topLine], { y: 60, duration: 0.2 }, 'slide')
        .to([middleLine], { alpha: 0, duration: 0.2 }, 'slide')
        .to([bottomLine], { y: -60, duration: 0.2 }, 'slide')
        .add('rotate')
        .to(
          [topLine],
          { transformOrigin: '50% 50%', rotate: 45, duration: 0.2 },
          'rotate'
        )
        .to(
          [bottomLine],
          { transformOrigin: '50% 50%', rotate: -45, duration: 0.2 },
          'rotate'
        );
      return;
    }

    tl.to([topLine, bottomLine], {
      transformOrigin: '50% 50%',
      rotate: 0,
      duration: 0.2
    })
      .add('unslide')
      .to([topLine, bottomLine], { y: 0, duration: 0.2 }, 'unslide')
      .to([middleLine], { alpha: 1, duration: 0.2 }, 'unslide');
  }, [isMenuOpen]);

  return (
    <HamburgerSvg
      className={styles.hamburger}
      ref={hamburgerRef}
      alt="hamburger"
    />
  );
};

export default Hamburger;
