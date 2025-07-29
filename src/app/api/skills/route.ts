import clientPromise from '@/lib/mongodb';
import type { Collection, Db } from 'mongodb';
import type { Skill } from '@/types';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const client = await clientPromise;
    const db: Db = client.db('Portfolio');
    console.log('Connected to database:', db.databaseName);

    const skillsCollection: Collection<Skill> =
      db.collection('Skills');
    console.log('Accessing Skills collection');
    const skills = await skillsCollection
      .find({})
      .toArray();
    console.log('Found skills:', skills.length, skills);

    return NextResponse.json(skills);
  } catch (error) {
    console.error('Skills API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch skills' },
      { status: 500 }
    );
  }
}
