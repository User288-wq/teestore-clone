import { useRouter } from 'next/router';
import { useState, useMemo } from 'react';
import Layout from '../components/Layout';
import ProductGrid from '../components/ProductGrid';
import Pagination from '../components/Pagination';
import products from '../data/products.json';

const PRODUCTS_PER_PAGE = 6;

export default function SearchPage() {
  const router = useRouter();
  const { q } = router.query;
  const query = typeof q === 'string' ? q.toLowerCase() : '';
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = useMemo(() => {
    if (!query) return [];
    return products.filter(p => p.name.toLowerCase().includes(query));
  }, [query]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts.slice(start, start + PRODUCTS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset page when query changes
  if (router.isReady) {
    useMemo(() => setCurrentPage(1), [query]);
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-16 px-6">
        <h1 className="text-3xl font-bold mb-4">Search results for "{query}"</h1>
        {filteredProducts.length === 0 ? (
          <p className="text-gray-600">No products found.</p>
        ) : (
          <>
            <p className="text-gray-600 mb-8">{filteredProducts.length} product(s) found</p>
            <ProductGrid products={paginatedProducts} />
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </>
        )}
      </div>
    </Layout>
  );
}
