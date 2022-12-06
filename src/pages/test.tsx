import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage
} from 'next';
import { unstable_getServerSession } from 'next-auth';

import { connectToDatabase } from 'src/api/db/connect';
import type { IFormation, IUser } from 'src/api/db/types';
import { authOptions } from './api/auth/[...nextauth]';
import Formation from 'src/components/formation/Formation';

interface IProps {
  formations: IFormation[];
}

const Test: NextPage<IProps> = ({ formations }) => {
  if (formations.length < 1) {
    return <div>No formation</div>;
  }

  return <Formation formation={formations[1]} />;
};

export const getServerSideProps: GetServerSideProps<IProps> = async (
  ctx: GetServerSidePropsContext
) => {
  const session = await unstable_getServerSession(
    ctx.req,
    ctx.res,
    authOptions
  );

  if (!session) {
    return {
      props: { formations: [] }
    };
  }

  const client = await connectToDatabase();

  const userEmail = session.user?.email || '';

  const user = await client
    .db()
    .collection<IUser>('users')
    .findOne({ email: userEmail });

  if (!user) {
    return {
      props: { formations: [] }
    };
  }

  const formations = await client
    .db()
    .collection<IFormation>('formations')
    .find()
    .toArray();

  const userFormations = formations.filter(
    (formation) => formation.createdBy.toString() === user._id.toString()
  );

  return {
    props: { formations: JSON.parse(JSON.stringify(userFormations)) }
  };
};

export default Test;
