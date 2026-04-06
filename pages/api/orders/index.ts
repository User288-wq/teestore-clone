import { NextApiRequest, NextApiResponse } from 'next';
import { getOrdersByUser, createOrder } from '../../../lib/orders-utils';
import { getCartFromRequest } from '../../../lib/cart-utils'; // nous allons créer ce fichier

// Helper pour extraire le panier (on va le passer dans le body)
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;
  const userIdNum = parseInt(userId as string);
  if (isNaN(userIdNum)) return res.status(400).json({ message: 'Invalid user ID' });

  if (req.method === 'GET') {
    const orders = getOrdersByUser(userIdNum);
    return res.status(200).json({ orders });
  }

  if (req.method === 'POST') {
    const { items, total } = req.body;
    if (!items || !Array.isArray(items) || typeof total !== 'number') {
      return res.status(400).json({ message: 'Invalid order data' });
    }
    const newOrder = createOrder(userIdNum, items, total);
    return res.status(201).json({ order: newOrder });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
