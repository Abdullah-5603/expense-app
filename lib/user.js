import { connectDB } from './db/db'

export async function createUser(data) {
  const db = await connectDB();

  const existingUser = await db.collection('all_users').findOne({ email: data.email });
  if (existingUser) return { message: 'User already exists', status: 409 };

  await db.collection('all_users').insertOne(data);
  const createdUser = await db.collection('all_users')
    .findOne({ email: data.email })

  return {
    data: createdUser,
    message: 'User created successfully',
    status: 201
  };
}

// Monthly Income functions
export async function getMonthlyIncome(email) {
  const db = await connectDB();
  const user = await db.collection('all_users').findOne({ email });
  return user?.monthlyIncome || null;
}

export async function updateMonthlyIncome(email, monthlyIncome) {
  const db = await connectDB();
  
  // Validate monthly income
  const income = parseFloat(monthlyIncome);
  if (isNaN(income) || income < 0) {
    throw new Error('Monthly income must be a non-negative number');
  }

  const result = await db.collection('all_users').updateOne(
    { email },
    { $set: { monthlyIncome: income, updatedAt: new Date() } },
    { upsert: true }
  );

  return income;
}
