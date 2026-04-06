import { NextApiRequest, NextApiResponse } from 'next';
import { findUserByEmail, verifyPassword } from '@lib/auth-utils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Missing fields' });
  const user = findUserByEmail(email);
  if (!user || !(await verifyPassword(password, user.password)))
    return res.status(401).json({ message: 'Invalid credentials' });
  res.status(200).json({ user });
}
