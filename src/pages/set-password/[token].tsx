import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage
} from 'next';
import jwt from 'jwt-simple';

import { connectToDatabase } from 'src/api/db';

interface IProps {
  email?: string;
  isTokenExist: boolean;
  token: string;
}

const SetPassword: NextPage<IProps> = ({ email, isTokenExist, token }) => {
  if (!isTokenExist) {
    return <div>Invalid token</div>;
  }

  if (email) {
    return <div>User with email: {email} was activated</div>;
  }

  return (
    <form>
      <input type="password" />
      <input type="password" />
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
