import { FC, forwardRef, HTMLInputTypeAttribute, PropsWithoutRef } from 'react';
import { FieldError } from 'react-hook-form';

import styles from './input.module.scss';

interface IProps {
  type: HTMLInputTypeAttribute;
  label: string;
  inputProps: PropsWithoutRef<JSX.IntrinsicElements['input']>;
  error?: FieldError;
}

const Input: FC<IProps> = forwardRef<HTMLInputElement, IProps>(
  ({ inputProps, label, type, error }, ref) => {
    return (
      <div className={styles.inputWrapper}>
        <label>
          {label}
          <input
            ref={ref}
            type={type}
            {...inputProps}
          />
        </label>
        {error && <span>{error.message}</span>}
      </div>
    );
  }
);

export default Input;
