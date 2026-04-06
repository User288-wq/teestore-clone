import { NextApiRequest, NextApiResponse } from 'next';
import { getReviewsByProduct, addReview } from '../../../lib/reviews-utils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { productId } = req.query;
  const id = parseInt(productId as string);

  if (isNaN(id)) {
    return res.status(400).json({ message: 'Invalid product ID' });
  }

  if (req.method === 'GET') {
    const reviews = getReviewsByProduct(id);
    return res.status(200).json({ reviews });
  }

  if (req.method === 'POST') {
    // Vérifier que l'utilisateur est connecté (authentification via votre AuthContext)
    // On reçoit userId, userName, rating, comment dans le body
    const { userId, userName, rating, comment } = req.body;
    if (!userId || !userName || !rating || !comment) {
      return res.status(400).json({ message: 'Missing fields' });
    }
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }
    const newReview = addReview({
      productId: id,
      userId,
      userName,
      rating,
      comment,
    });
    return res.status(201).json({ review: newReview });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
