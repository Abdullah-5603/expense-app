import { connectDB } from './db/db'

export async function createUser(data) {

  const db = await connectDB()

  await db.collection('all_users').insertOne(data);
  const createdUser = await db.collection('all_users')
    .findOne({ email: data.email })

  return createdUser;
}
