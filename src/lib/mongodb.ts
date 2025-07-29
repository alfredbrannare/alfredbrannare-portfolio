import { MongoClient } from 'mongodb';

if (typeof process.env.MONGODB_URI === 'undefined') {
  throw new Error('Add Mongo URI to .env.local');
}
const options = {};

const uri = process.env.MONGODB_URI;
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  const globalWithMongoClientPromise =
    global as typeof globalThis & {
      _mongoClientPromise: Promise<MongoClient>;
    };

  if (!globalWithMongoClientPromise._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongoClientPromise._mongoClientPromise =
      client.connect();
  }
  clientPromise =
    globalWithMongoClientPromise._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
