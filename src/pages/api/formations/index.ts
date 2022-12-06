import type { NextApiRequest } from 'next';
import { unstable_getServerSession } from 'next-auth';
import type { InsertOneResult, MongoClient, WithId } from 'mongodb';

import { ApiRouteHandler } from 'src/api/baseTypes';
import { connectToDatabase } from 'src/api/db/connect';
import { authOptions } from '../auth/[...nextauth]';
import type { IFormation, IPlayersPosition, IUser } from 'src/api/db/types';

interface IRequestBody extends NextApiRequest {
  body: {
    formationName: string;
    playersPositions: IPlayersPosition[];
  };
}

const handler: ApiRouteHandler<IRequestBody> = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ message: 'You must be logged in.' });
    return;
  }

  const userEmail = session.user?.email || '';

  if (!userEmail) {
    res.status(500).json({
      message: 'Could not find email from session. Please try later.'
    });
    return;
  }

  const { formationName, playersPositions } = req.body;

  let client: MongoClient;

  try {
    client = await connectToDatabase();
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Could not connect to database. Please try later.' });
    return;
  }

  const users = client.db().collection<IUser>('users');

  const user = await users.findOne({ email: userEmail });

  if (!user) {
    client.close();
    res.status(404).json({ message: 'User not found.' });
    return;
  }

  const formations = client.db().collection<IFormation>('formations');

  let usersFormations: WithId<IFormation>[];

  try {
    usersFormations = await formations.find({ createdBy: user._id }).toArray();
  } catch (error) {
    client.close();
    res
      .status(500)
      .json({ message: 'Could not connect to database. Please try later.' });
    return;
  }

  if (
    usersFormations.find(
      (formation) => formation.formationName === formationName
    )
  ) {
    client.close();
    res.status(409).json({
      message: `Formation with name: ${formationName} already exist.`
    });
    return;
  }

  let newFormation: InsertOneResult<IFormation>;

  try {
    newFormation = await formations.insertOne({
      createdBy: user._id,
      formationName,
      playersPositions
    });
  } catch (error) {
    client.close();
    res.status(500).json({
      message: 'Could not store into database. Please try later.'
    });
    return;
  }

  try {
    const newMyFormations = [...user.myFormations, newFormation.insertedId];

    await users.findOneAndUpdate(
      { email: userEmail },
      { $set: { myFormations: newMyFormations } }
    );

    client.close();
  } catch (error) {
    await formations.findOneAndDelete({ _id: newFormation.insertedId });

    client.close();
    res.status(500).json({
      message: 'Could not store into database. Please try later.'
    });
    return;
  }

  res.status(201).json({ message: 'Your formation is save corectly!' });
};

export default handler;
