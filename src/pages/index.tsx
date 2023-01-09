import { FC, useState } from 'react';
import type { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { Session } from 'next-auth';
import { unstable_getServerSession } from 'next-auth/next';
import { Navigation, Keyboard } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import Formation from 'src/components/formation/Formation';
import { authOptions } from './api/auth/[...nextauth]';
import { IFormation } from 'src/api/db/types';
import { connectToDatabase } from 'src/api/db/connect';

interface IProps {
  session: Session | null;
  defaultFormations: IFormation[];
}

const Home: FC<IProps> = ({ defaultFormations }) => {
  const [index, setIndex] = useState(0);
  return (
    <div>
      <Swiper
        centeredSlides
        onRealIndexChange={(a) => setIndex(a.realIndex)}
        initialSlide={0}
        modules={[Navigation, Keyboard]}
        slidesPerView={3}
        navigation
        keyboard={{
          enabled: true
        }}
        loop
      >
        {defaultFormations.map((formation, index) => (
          <SwiperSlide key={index}>
            <div style={{ textAlign: 'center' }}>{formation.formationName}</div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Formation
        formation={{
          formationName: defaultFormations[index].formationName,
          playersPositions: defaultFormations[index].playersPositions
        }}
      />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<IProps> = async (
  ctx: GetServerSidePropsContext
) => {
  const session = await unstable_getServerSession(
    ctx.req,
    ctx.res,
    authOptions
  );

  const connectionString = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTERNAME}.m0vtzg2.mongodb.net/default-formations?retryWrites=true&w=majority`;

  const client = await connectToDatabase(connectionString);
  const defaultFormations = await client
    .db()
    .collection<IFormation>('default-formations')
    .find()
    .toArray();

  return {
    props: {
      session,
      defaultFormations: JSON.parse(JSON.stringify(defaultFormations))
    }
  };
};

export default Home;
