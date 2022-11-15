import type { NextApiRequest } from 'next';
import type { MongoClient } from 'mongodb';
import jwt from 'jwt-simple';

import { ApiRouteHandler } from 'src/api/baseTypes';
import { connectToDatabase } from 'src/api/db';
import { hashPassword } from 'src/api/auth';

interface IRequestBody extends NextApiRequest {
  body: {
    token: string;
    password: string;
  };
}

const handler: ApiRouteHandler<IRequestBody> = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  const { password, token } = req.body;

  let client: MongoClient;

  try {
    client = await connectToDatabase();
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Could not connect to database. Please try later.' });
    return;
  }

  const userEmail = jwt.decode(token, process.env.JWT_SECRET!);

  let hashedPassword: string;

  try {
    hashedPassword = await hashPassword(password);
  } catch (error) {
    client.close();
    res
      .status(500)
      .json({ message: 'Problem with password. Please try later.' });
    return;
  }

  const users = client.db().collection('users');

  try {
    await users.insertOne({ email: userEmail, password: hashedPassword });
  } catch (error) {
    client.close();
    res.status(500).json({
      message: 'Could not store into database. Please try later.'
    });
    return;
  }

  try {
    const usersWithoutActivation = client
      .db()
      .collection('users-without-activation');

    await usersWithoutActivation.deleteOne({ token });
    client.close();
  } catch (error) {
    client.close();
    res.status(500).json({
      message: 'Could not store into database. Please try later.'
    });
    return;
  }

  res.status(200).json({ message: 'User password is correctly set' });
};

export default handler;
