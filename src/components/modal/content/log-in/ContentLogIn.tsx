import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { signIn } from 'next-auth/react';

import useModalContext from 'src/context/ModalContext';
import useNotificationContext, {
  NotificationStatus
} from 'src/context/NotificationContext';
import Input from 'src/components/design-system/input/Input';
import Button from 'src/components/design-system/button/Button';

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

  const [isLoading, setIsLoading] = useState(false);

  const { closeModal } = useModalContext();

  const { showNotification } = useNotificationContext();

  const onLogIn: SubmitHandler<IInputs> = async (data) => {
    try {
      setIsLoading(true);
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

      setIsLoading(false);
      showNotification({
        title: 'Error',
        status: NotificationStatus.Error,
        message: res?.error || 'Something went wrong'
      });
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onLogIn)}
        noValidate
      >
        <Input
          type="email"
          label="Email"
          error={errors.email}
          inputProps={register('email', {
            required: 'This input is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Incorrect email'
            }
          })}
        />
        <Input
          type="password"
          label="Password"
          error={errors.password}
          inputProps={register('password', {
            required: 'This input is required'
          })}
        />
        <Button
          text="Log in"
          isLoading={isLoading}
        />
      </form>
    </div>
  );
};

export default ContentLogIn;
