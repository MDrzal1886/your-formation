import { FC } from 'react';
import Loader from './loader/Loader';

interface IProps {
  text: string;
  isLoading: boolean;
}

const Button: FC<IProps> = ({ text, isLoading }) => {
  return <button>{isLoading ? <Loader /> : text}</button>;
};

export default Button;
