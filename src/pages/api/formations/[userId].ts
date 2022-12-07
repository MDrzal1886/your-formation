import type { NextApiRequest } from 'next';
import { unstable_getServerSession } from 'next-auth';
import type { MongoClient } from 'mongodb';
import { ObjectID } from 'bson';

import type { ApiRouteHandler } from 'src/api/baseTypes';
import { connectToDatabase } from 'src/api/db/connect';
import { IFormation } from 'src/api/db/types';
import { authOptions } from '../auth/[...nextauth]';

interface IResponse {
  message?: string;
  formations?: IFormation[];
}

const handler: ApiRouteHandler<NextApiRequest, IResponse> = async (
  req,
  res
) => {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ message: 'You must be logged in.' });
    return;
  }

  const userId = req.query.userId?.toString() || '';

  let client: MongoClient;

  try {
    client = await connectToDatabase();
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Could not connect to database. Please try later.' });
    return;
  }

  const formations = client.db().collection<IFormation>('formations');

  let usersFormations: IFormation[];

  try {
    usersFormations = await formations
      .find({ createdBy: new ObjectID(userId) })
      .toArray();
  } catch (error) {
    client.close();
    res
      .status(500)
      .json({ message: 'Could not connect to database. Please try later.' });
    return;
  }

  res.status(200).json({
    formations: usersFormations
  });
};

export default handler;
