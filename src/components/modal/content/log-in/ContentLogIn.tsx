import { FormEvent, useRef } from 'react';
import { signIn } from 'next-auth/react';

import useModalContext from 'src/context/ModalContext';
import useNotificationContext, {
  NotificationStatus
} from 'src/context/NotificationContext';

const ContentLogIn = () => {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const { closeModal } = useModalContext();

  const { showNotification } = useNotificationContext();

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

        showNotification({
          title: 'You are log in',
          status: NotificationStatus.Success,
          message: 'You are succesfully log in'
        });
        closeModal();
        return;
      }

      showNotification({
        title: res?.error || 'Something went wrong',
        status: NotificationStatus.Error,
        message: 'Wrong'
      });
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
