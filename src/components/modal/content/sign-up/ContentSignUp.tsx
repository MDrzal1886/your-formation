import { FormEvent, useRef } from 'react';

import useModalContext from 'src/context/ModalContext';
import useNotificationContext, {
  NotificationStatus
} from 'src/context/NotificationContext';

const ContentSignUp = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { closeModal } = useModalContext();

  const { showNotification } = useNotificationContext();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('api/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: inputRef.current?.value })
      });

      if (res.ok && inputRef.current) {
        inputRef.current.value = '';
        showNotification({
          title: 'You are sign up',
          status: NotificationStatus.Success,
          message: 'You are succesfully signed up. Check Your email'
        });
        closeModal();
        return;
      }

      showNotification({
        title: 'Something went wrong',
        status: NotificationStatus.Error,
        message: 'Wrong'
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          ref={inputRef}
        />
        <button>Sign Up</button>
      </form>
    </div>
  );
};

export default ContentSignUp;
