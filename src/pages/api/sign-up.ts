import type { NextApiRequest } from 'next';
import type { MongoClient } from 'mongodb';
import jwt from 'jwt-simple';

import { ApiRouteHandler } from 'src/api/baseTypes';
import { connectToDatabase } from 'src/api/db/connect';
import { getTransporter, mailToSend } from 'src/api/nodemailer';
import type { IUser, IUserWithoutActivation } from 'src/api/db/types';

interface IRequestBody extends NextApiRequest {
  body: {
    email: string;
  };
}

const handler: ApiRouteHandler<IRequestBody> = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  const { email: newUserEmail } = req.body;

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newUserEmail)) {
    res.status(422).json({ message: 'Invalid email' });
    return;
  }

  const token = jwt.encode(newUserEmail, process.env.JWT_SECRET!);

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

  const user = await users.findOne({ email: newUserEmail });

  if (user) {
    client.close();
    res.status(409).json({
      message: `User with email: ${newUserEmail} already exist.`
    });
    return;
  }

  const transporter = getTransporter();

  transporter.sendMail(mailToSend(newUserEmail, token), async (error) => {
    if (error) {
      client.close();
      res
        .status(500)
        .json({ message: 'Unable to send email. Please try later.' });
      return;
    }

    try {
      const usersWithoutActivation = client
        .db()
        .collection<IUserWithoutActivation>('users-without-activation');

      const user = await usersWithoutActivation.findOne({ token });

      if (!user) {
        await usersWithoutActivation.insertOne({
          token
        });
      }

      client.close();
    } catch (error) {
      client.close();
      res.status(500).json({
        message: 'Could not store into database. Please try later.'
      });
      return;
    }
  });

  res.status(200).json({
    message: `Email with link is send to ${newUserEmail}. Please Check your mail to set password and finish registration.`
  });
};

export default handler;
