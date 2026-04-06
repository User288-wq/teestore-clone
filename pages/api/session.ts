import { NextApiRequest, NextApiResponse } from 'next';
import { findUserByEmail } from '@lib/auth-utils';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).json({ message: 'Method not allowed' });
  const { email } = req.query;
  if (!email || typeof email !== 'string') return res.status(400).json({ message: 'Email required' });
  const user = findUserByEmail(email);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.status(200).json({ user });
}
