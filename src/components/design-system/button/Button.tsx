import { FC } from 'react';

import styles from './button.module.scss';
import Loader from './loader/Loader';

interface IProps {
  text: string;
  isLoading: boolean;
}

const Button: FC<IProps> = ({ text, isLoading }) => {
  return (
    <button className={styles.button}>{isLoading ? <Loader /> : text}</button>
  );
};

export default Button;
