import { FormEvent, useRef, useState } from 'react';
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage
} from 'next';
import { useRouter } from 'next/router';
import jwt from 'jwt-simple';

import { connectToDatabase } from 'src/api/db';

interface IProps {
  email?: string;
  isTokenExist: boolean;
  token: string;
}

const SetPassword: NextPage<IProps> = ({ email, isTokenExist, token }) => {
  const router = useRouter();

  const passwordInput = useRef<HTMLInputElement>(null);
  const repeatPasswordInput = useRef<HTMLInputElement>(null);
  const [validation, setValidation] = useState(true);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (passwordInput.current?.value !== repeatPasswordInput.current?.value) {
      setValidation(false);
      return;
    }

    try {
      const res = await fetch('/api/set-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token, password: passwordInput.current?.value })
      });

      if (res.ok && passwordInput.current && repeatPasswordInput.current) {
        passwordInput.current.value = '';
        repeatPasswordInput.current.value = '';
        setValidation(true);
        router.replace('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!isTokenExist) {
    return <div>Invalid token</div>;
  }

  if (email) {
    return <div>User with email: {email} was activated</div>;
  }

  return (
    <form onSubmit={onSubmit}>
      {!validation && <p>Passwords do not match</p>}
      <input
        type="password"
        ref={passwordInput}
      />
      <input
        type="password"
        ref={repeatPasswordInput}
      />
      <button>Set Password</button>
    </form>
  );
};

export const getServerSideProps: GetServerSideProps<IProps> = async (
  ctx: GetServerSidePropsContext
) => {
  const { token = '' } = ctx.params || {};

  const tokenString = token.toString();

  const client = await connectToDatabase();

  const users = client.db().collection('users');

  const usersWithoutActivation = client
    .db()
    .collection('users-without-activation');

  const userToActivate = await usersWithoutActivation.findOne({
    token: tokenString
  });

  if (!userToActivate) {
    return {
      props: {
        isTokenExist: false,
        token: tokenString
      }
    };
  }

  const email: string = jwt.decode(tokenString, process.env.JWT_SECRET!);

  const user = await users.findOne({ email });

  if (user) {
    return {
      props: {
        email,
        isTokenExist: true,
        token: tokenString
      }
    };
  }

  return {
    props: {
      isTokenExist: true,
      token: tokenString
    }
  };
};

export default SetPassword;
