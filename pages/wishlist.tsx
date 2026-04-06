import Layout from '../components/Layout';
import ProductGrid from '../components/ProductGrid';
import { useWishlist } from '../hooks/useWishlist';
import { useAuth } from '../contexts/AuthContext';
import productsData from '../data/products.json';

export default function WishlistPage() {
  const { user } = useAuth();
  const { wishlist, loading } = useWishlist();

  if (!user) {
    return (
      <Layout>
        <div className="text-center py-20">
          <h1 className="text-3xl font-bold mb-4">Wishlist</h1>
          <p className="text-gray-600">Please <a href="/login" className="underline">login</a> to view your wishlist.</p>
        </div>
      </Layout>
    );
  }

  const wishlistProducts = productsData.filter(p => wishlist.includes(p.id));

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-16 px-6">
        <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
        {loading ? (
          <p>Loading...</p>
        ) : wishlistProducts.length === 0 ? (
          <p className="text-gray-600">Your wishlist is empty. Start adding products!</p>
        ) : (
          <ProductGrid products={wishlistProducts} />
        )}
      </div>
    </Layout>
  );
}
