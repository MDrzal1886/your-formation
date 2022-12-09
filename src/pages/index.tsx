import { FormEvent, Fragment, useRef } from 'react';
import type { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { signIn, signOut, useSession } from 'next-auth/react';
import { unstable_getServerSession } from 'next-auth/next';

import { authOptions } from './api/auth/[...nextauth]';
import ThemeSwitch from 'src/components/theme-switch/ThemeSwitch';

const Home = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const { status } = useSession();

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
      }
    } catch (error) {
      console.log(error);
    }
  };

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
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = async () => {
    try {
      await signOut({
        redirect: false
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Fragment>
      <ThemeSwitch />
      <div>
        <form onSubmit={onSubmit}>
          <input
            type="email"
            ref={inputRef}
          />
          <button>Sign Up</button>
        </form>
      </div>
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
      {status === 'authenticated' ? (
        <button onClick={logOut}>Log out</button>
      ) : (
        <p>Not logged</p>
      )}
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const session = await unstable_getServerSession(
    ctx.req,
    ctx.res,
    authOptions
  );
  return {
    props: { session }
  };
};

export default Home;
