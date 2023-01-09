import { MongoClient } from 'mongodb';

const defaultConnectionString = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTERNAME}.m0vtzg2.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`;

export const connectToDatabase = async (
  connectionString = defaultConnectionString
) => {
  const client = await MongoClient.connect(connectionString);

  return client;
};
