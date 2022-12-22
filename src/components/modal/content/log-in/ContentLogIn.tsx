import { useForm, SubmitHandler } from 'react-hook-form';
import { signIn } from 'next-auth/react';

import useModalContext from 'src/context/ModalContext';
import useNotificationContext, {
  NotificationStatus
} from 'src/context/NotificationContext';

interface IInputs {
  email: string;
  password: string;
}

const ContentLogIn = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm<IInputs>();

  const { closeModal } = useModalContext();

  const { showNotification } = useNotificationContext();

  const onLogIn: SubmitHandler<IInputs> = async (data) => {
    try {
      const res = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password
      });

      if (res?.ok) {
        setValue('email', '');
        setValue('password', '');

        showNotification({
          title: 'You are log in',
          status: NotificationStatus.Success,
          message: 'You are succesfully log in'
        });
        closeModal();
        return;
      }

      showNotification({
        title: 'Error',
        status: NotificationStatus.Error,
        message: res?.error || 'Something went wrong'
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit((data) => onLogIn(data))}
        noValidate
      >
        <input
          type="email"
          {...register('email', {
            required: 'This input is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Incorrect email'
            }
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}
        <input
          type="password"
          {...register('password', { required: 'This input is required' })}
        />
        {errors.password && <p>{errors.password.message}</p>}
        <button>Log in</button>
      </form>
    </div>
  );
};

export default ContentLogIn;
