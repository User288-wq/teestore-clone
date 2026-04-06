import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useWishlist } from '../hooks/useWishlist';
import { useNotify } from '../hooks/useNotify';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const ProductCard = ({ product }: { product: any }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { notifySuccess } = useNotify();

  const handleAddToCart = () => {
    addToCart(product);
    notifySuccess(`${product.name} added to cart!`);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      notifySuccess('Please login to add to wishlist');
      return;
    }
    toggleWishlist(product.id);
  };

  return (
    <div className="group border border-gray-200 rounded-sm p-4 hover:shadow-md transition-all duration-300 bg-white relative">
      <button
        onClick={handleWishlistToggle}
        className="absolute top-3 right-3 z-10 bg-white rounded-full p-1.5 shadow-md hover:scale-110 transition"
      >
        {isInWishlist(product.id) ? (
          <FaHeart className="text-red-500 w-5 h-5" />
        ) : (
          <FaRegHeart className="text-gray-400 w-5 h-5 hover:text-red-500" />
        )}
      </button>
      <div className="relative h-80 w-full mb-4 overflow-hidden rounded-sm bg-gray-100 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => (e.currentTarget.src = '/images/placeholder.jpg')}
        />
      </div>
      <h3 className="text-base font-medium text-gray-900">{product.name}</h3>
      <p className="text-gray-700 mt-1">{product.price.toFixed(2)} €</p>
      <button
        onClick={handleAddToCart}
        className="mt-4 w-full bg-black text-white py-2 text-sm font-medium rounded-sm hover:bg-gray-800 transition"
      >
        Add to Cart
      </button>
    </div>
  );
};
export default ProductCard;
