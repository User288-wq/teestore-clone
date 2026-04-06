import fs from 'fs';
import path from 'path';

export interface Review {
  id: number;
  productId: number;
  userId: number;
  userName: string;
  rating: number; // 1-5
  comment: string;
  createdAt: string;
}

const reviewsPath = path.join(process.cwd(), 'data', 'reviews.json');

export function getReviews(): Review[] {
  const data = fs.readFileSync(reviewsPath, 'utf-8');
  return JSON.parse(data);
}

export function saveReviews(reviews: Review[]): void {
  fs.writeFileSync(reviewsPath, JSON.stringify(reviews, null, 2), 'utf-8');
}

export function getReviewsByProduct(productId: number): Review[] {
  const reviews = getReviews();
  return reviews.filter(r => r.productId === productId).sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function addReview(review: Omit<Review, 'id' | 'createdAt'>): Review {
  const reviews = getReviews();
  const newId = reviews.length > 0 ? Math.max(...reviews.map(r => r.id)) + 1 : 1;
  const newReview: Review = {
    ...review,
    id: newId,
    createdAt: new Date().toISOString(),
  };
  reviews.push(newReview);
  saveReviews(reviews);
  return newReview;
}
