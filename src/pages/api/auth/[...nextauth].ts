import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import Providers from 'next-auth/providers/credentials';
import type { MongoClient } from 'mongodb';

import { connectToDatabase } from 'src/api/db';
import { verifyPassword } from 'src/api/auth';

export const authOptions: NextAuthOptions = {
  callbacks: {
    session: async ({ session }) => {
      session.user = {
        email: session.user?.email || null
      };
      return session;
    }
  },
  session: {
    strategy: 'jwt'
  },
  providers: [
    Providers({
      credentials: {
        email: { type: 'text' },
        password: { type: 'password' }
      },
      authorize: async (credentials) => {
        let client: MongoClient;

        try {
          client = await connectToDatabase();
        } catch (error) {
          throw new Error('Could not connect to database. Please try later.');
        }

        const usersCollection = client.db().collection('users');

        const user = await usersCollection.findOne({
          email: credentials?.email
        });

        if (!user) {
          client.close();
          throw new Error('No user found!');
        }

        const isValid = await verifyPassword(
          credentials!.password,
          user.password
        );

        if (!isValid) {
          client.close();
          throw new Error('Could not log you in!');
        }

        client.close();
        return {
          id: user._id.toString(),
          email: user.email
        };
      }
    })
  ]
};

export default NextAuth(authOptions);
