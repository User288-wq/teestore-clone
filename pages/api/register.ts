import { NextApiRequest, NextApiResponse } from 'next';
import { findUserByEmail, createUser } from '@lib/auth-utils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });
  const existingUser = findUserByEmail(email);
  if (existingUser) return res.status(409).json({ message: 'User already exists' });
  const newUser = await createUser(name, email, password);
  res.status(201).json({ user: newUser });
}
