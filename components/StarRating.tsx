import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

interface StarRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  readonly?: boolean;
  size?: number;
}

const StarRating = ({ rating, onRatingChange, readonly = false, size = 20 }: StarRatingProps) => {
  const handleClick = (value: number) => {
    if (!readonly && onRatingChange) onRatingChange(value);
  };

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;

  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => {
        const starValue = i + 1;
        if (starValue <= fullStars) {
          return <FaStar key={i} size={size} className="text-yellow-500 cursor-pointer" onClick={() => handleClick(starValue)} />;
        } else if (starValue === fullStars + 1 && hasHalfStar && !readonly) {
          return <FaStarHalfAlt key={i} size={size} className="text-yellow-500 cursor-pointer" onClick={() => handleClick(starValue)} />;
        } else {
          return <FaRegStar key={i} size={size} className="text-yellow-500 cursor-pointer" onClick={() => handleClick(starValue)} />;
        }
      })}
    </div>
  );
};

export default StarRating;
