import { GetStaticPaths, GetStaticProps } from 'next';
import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { useNotify } from '../../hooks/useNotify';
import StarRating from '../../components/StarRating';
import products from '../../data/products.json';

interface Review {
  id: number;
  productId: number;
  userId: number;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export default function ProductPage({ product }: any) {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const { notifySuccess, notifyError } = useNotify();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Charger les avis
  useEffect(() => {
    fetch(`/api/reviews/${product.id}`)
      .then(res => res.json())
      .then(data => setReviews(data.reviews || []))
      .catch(err => console.error(err));
  }, [product.id]);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      notifyError('Please login to leave a review');
      return;
    }
    if (!comment.trim()) {
      notifyError('Please enter a comment');
      return;
    }
    setIsSubmitting(true);
    const res = await fetch(`/api/reviews/${product.id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: user.id,
        userName: user.name,
        rating,
        comment,
      }),
    });
    if (res.ok) {
      const { review } = await res.json();
      setReviews([review, ...reviews]);
      setComment('');
      setRating(5);
      notifySuccess('Review added!');
    } else {
      notifyError('Failed to add review');
    }
    setIsSubmitting(false);
  };

  const averageRating = reviews.length > 0
    ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
    : 0;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-16 px-6">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-1/2 relative h-96 md:h-[500px]">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-sm" />
          </div>
          <div className="md:w-1/2">
            <h1 className="text-4xl font-bold">{product.name}</h1>
            <p className="text-2xl text-gray-700 my-4">{product.price.toFixed(2)} €</p>
            <p className="text-gray-600 mb-6">{product.description}</p>
            <button onClick={() => addToCart(product)} className="bg-black text-white px-8 py-3 rounded-sm hover:bg-gray-800 transition">
              Add to Cart
            </button>
          </div>
        </div>

        {/* Section avis */}
        <div className="mt-16 border-t pt-8">
          <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center">
              <StarRating rating={averageRating} readonly size={24} />
              <span className="ml-2 text-gray-600">({averageRating.toFixed(1)} / 5)</span>
            </div>
            <span className="text-gray-500">{reviews.length} review(s)</span>
          </div>

          {/* Formulaire d'avis (si connecté) */}
          {user ? (
            <form onSubmit={handleSubmitReview} className="bg-gray-50 p-4 rounded-sm mb-8">
              <h3 className="font-semibold mb-2">Write a review</h3>
              <div className="mb-3">
                <label className="block text-sm mb-1">Rating</label>
                <StarRating rating={rating} onRatingChange={setRating} size={24} />
              </div>
              <div className="mb-3">
                <label className="block text-sm mb-1">Comment</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={3}
                  className="w-full border rounded-sm p-2"
                  placeholder="Share your experience..."
                  required
                />
              </div>
              <button type="submit" disabled={isSubmitting} className="bg-black text-white px-4 py-2 rounded-sm hover:bg-gray-800 transition">
                {isSubmitting ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          ) : (
            <p className="text-gray-500 mb-8">Please <a href="/login" className="underline">login</a> to leave a review.</p>
          )}

          {/* Liste des avis */}
          <div className="space-y-4">
            {reviews.length === 0 ? (
              <p className="text-gray-500">No reviews yet. Be the first!</p>
            ) : (
              reviews.map(review => (
                <div key={review.id} className="border-b pb-4">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <StarRating rating={review.rating} readonly size={16} />
                      <span className="font-medium">{review.userName}</span>
                    </div>
                    <span className="text-xs text-gray-400">{new Date(review.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-gray-700 text-sm">{review.comment}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = products.map((p: any) => ({ params: { id: p.id.toString() } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const product = products.find((p: any) => p.id.toString() === params?.id);
  if (!product) return { notFound: true };
  return { props: { product } };
};
