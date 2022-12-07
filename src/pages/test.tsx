import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage
} from 'next';
import { Session, unstable_getServerSession } from 'next-auth';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import type { IFormation } from 'src/api/db/types';
import { authOptions } from './api/auth/[...nextauth]';
import Formation from 'src/components/formation/Formation';
import { connectToDatabase } from 'src/api/db/connect';

interface IProps {
  session: Session | null;
  formations: IFormation[];
}

const Test: NextPage<IProps> = ({ session, formations }) => {
  const userId = session?.user?.id || '';

  const { data } = useQuery<
    unknown,
    Error,
    { data: { formations: IFormation[] } }
  >({
    queryKey: ['formations'],
    queryFn: () => {
      if (!userId) return;

      const response = axios.get(`/api/formations/${userId}`);
      return response;
    },
    initialData: { data: { formations } }
  });

  if (!data.data.formations) {
    return <div>No formation</div>;
  }

  return <Formation formation={data.data.formations[1]} />;
};

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const session = await unstable_getServerSession(
    ctx.req,
    ctx.res,
    authOptions
  );

  if (!session) {
    return {
      props: {}
    };
  }
  const userId = session.user?.id || '';

  const client = await connectToDatabase();

  const formations = await client
    .db()
    .collection<IFormation>('formations')
    .find()
    .toArray();

  const userFormations = formations.filter(
    (formation) => formation.createdBy.toString() === userId
  );

  return {
    props: { formations: JSON.parse(JSON.stringify(userFormations)), session }
  };
};

export default Test;
