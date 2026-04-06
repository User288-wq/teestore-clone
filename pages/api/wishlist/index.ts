import { NextApiRequest, NextApiResponse } from 'next';
import { getUserWishlist, addToWishlist, removeFromWishlist } from '../../../lib/wishlist-utils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Pour simplifier, on reçoit userId dans la requête (idéalement via session, mais ici on utilise query/body)
  // On suppose que l'utilisateur est authentifié et son ID est passé.
  const { userId } = req.query;
  const userIdNum = parseInt(userId as string);

  if (isNaN(userIdNum)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  if (req.method === 'GET') {
    const wishlist = getUserWishlist(userIdNum);
    return res.status(200).json({ wishlist });
  }

  if (req.method === 'POST') {
    const { productId } = req.body;
    if (!productId) return res.status(400).json({ message: 'Product ID required' });
    const item = addToWishlist(userIdNum, productId);
    return res.status(201).json({ item });
  }

  if (req.method === 'DELETE') {
    const { productId } = req.body;
    if (!productId) return res.status(400).json({ message: 'Product ID required' });
    const removed = removeFromWishlist(userIdNum, productId);
    if (!removed) return res.status(404).json({ message: 'Item not found' });
    return res.status(200).json({ message: 'Removed' });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
