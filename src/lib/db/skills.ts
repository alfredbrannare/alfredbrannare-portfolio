import clientPromise from '@/lib/mongodb';
import type { Collection, Db } from 'mongodb';
import type { Skill } from '@/types';

export async function getDbSkills(): Promise<Skill[]> {
  const client = await clientPromise;
  const db: Db = client.db('Portfolio');
  const skillsCollection: Collection<Skill> =
    db.collection('Skills');
  return skillsCollection.find({}).toArray();
}
