import { FormEvent, useRef } from 'react';
import { signIn } from 'next-auth/react';

import useModalContext from 'src/context/ModalContext';

const ContentLogIn = () => {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const { closeModal } = useModalContext();

  const onLogIn = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const enteredEmail = emailInputRef.current?.value || '';
      const enteredPassword = passwordInputRef.current?.value || '';

      const res = await signIn('credentials', {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword
      });

      if (res?.ok && emailInputRef.current && passwordInputRef.current) {
        emailInputRef.current.value = '';
        passwordInputRef.current.value = '';
        closeModal();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form onSubmit={onLogIn}>
        <input
          type="email"
          ref={emailInputRef}
        />
        <input
          type="password"
          ref={passwordInputRef}
        />
        <button>Log in</button>
      </form>
    </div>
  );
};

export default ContentLogIn;
