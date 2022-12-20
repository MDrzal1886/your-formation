import type { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { unstable_getServerSession } from 'next-auth/next';

import { authOptions } from './api/auth/[...nextauth]';

const Home = () => {
  return <div>index</div>;
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
