import { useForm, SubmitHandler } from 'react-hook-form';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useMutation } from '@tanstack/react-query';

import useModalContext from 'src/context/ModalContext';
import useNotificationContext, {
  NotificationStatus
} from 'src/context/NotificationContext';
import { IData, TError } from 'src/types';
import Input from 'src/components/design-system/input/Input';

interface IInput {
  email: string;
}

const ContentSignUp = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm<IInput>();

  const { closeModal } = useModalContext();

  const { showNotification } = useNotificationContext();

  const { mutate } = useMutation<
    AxiosResponse<IData, TError>,
    AxiosError<TError>,
    { email: string }
  >({
    mutationFn: ({ email }) => {
      return axios.post('api/sign-up', { email });
    },
    onSuccess: (data) => {
      showNotification({
        title: 'Success',
        status: NotificationStatus.Success,
        message: data.data.message
      });
      setValue('email', '');
      closeModal();
    },
    onError: (error) => {
      showNotification({
        title: 'Error',
        status: NotificationStatus.Error,
        message: error.response?.data.message || 'Something went wrong'
      });
    }
  });

  const onSubmit: SubmitHandler<IInput> = async (data) => {
    mutate({ email: data.email });
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit((data) => onSubmit(data))}
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
        <button>Sign Up</button>
      </form>
    </div>
  );
};

export default ContentSignUp;
