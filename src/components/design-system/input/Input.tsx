import { FC, forwardRef, HTMLInputTypeAttribute, PropsWithoutRef } from 'react';
import { FieldError } from 'react-hook-form';

import styles from './input.module.scss';
import ErrorIcon from 'src/assets/svg/error.svg';

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
        <label className={styles.labelWrapper}>
          <span className={styles.label}>{label}</span>
          <input
            className={`${styles.input} ${error ? styles.error : ''}`}
            ref={ref}
            type={type}
            {...inputProps}
          />
        </label>
        {error && (
          <span className={styles.validationMessage}>
            <ErrorIcon className={styles.errorIcon} />
            {error.message}
          </span>
        )}
      </div>
    );
  }
);

export default Input;
