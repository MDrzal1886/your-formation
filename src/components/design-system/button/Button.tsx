import { FC } from 'react';

import styles from './button.module.scss';
import Loader from './loader/Loader';

interface IProps {
  text: string;
  isLoading?: boolean;
  onClickFn?: () => void;
}

const Button: FC<IProps> = ({ text, isLoading, onClickFn }) => {
  return (
    <button
      className={styles.button}
      onClick={onClickFn}
    >
      {isLoading ? <Loader /> : text}
    </button>
  );
};

export default Button;
