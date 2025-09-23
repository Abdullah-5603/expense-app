import { connectDB } from './db/db'

export async function createUser(data) {

  const db = await connectDB();

  const existingUser = await db.collection('all_users').findOne({ email: data.email });
  if (existingUser) return {message: 'User already exists', status: 409};

  await db.collection('all_users').insertOne(data);
  const createdUser = await db.collection('all_users')
    .findOne({ email: data.email })

  return {
    data: createdUser,
    message: 'User created successfully',
    status: 201
  };
}
