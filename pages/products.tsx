import { useState, useMemo, useCallback } from 'react';
import Layout from '../components/Layout';
import ProductGrid from '../components/ProductGrid';
import FilterSidebar from '../components/FilterSidebar';
import Pagination from '../components/Pagination';
import productsData from '../data/products.json';

const PRODUCTS_PER_PAGE = 6;

export default function ProductsPage() {
  const [filters, setFilters] = useState({
    categories: [] as string[],
    priceRange: [0, 1000] as [number, number],
  });
  const [currentPage, setCurrentPage] = useState(1);

  const maxPrice = useMemo(() => {
    return Math.max(...productsData.map(p => p.price), 0);
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = [...productsData];
    if (filters.categories.length > 0) {
      filtered = filtered.filter(p => filters.categories.includes(p.category));
    }
    filtered = filtered.filter(
      p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );
    return filtered;
  }, [filters]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts.slice(start, start + PRODUCTS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleFilterChange = useCallback((newFilters: typeof filters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  }, []);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-16 px-6">
        <h1 className="text-3xl font-bold mb-8">All Products</h1>
        <div className="flex flex-col md:flex-row gap-8">
          <FilterSidebar onFilterChange={handleFilterChange} maxPrice={maxPrice} />
          <div className="flex-1">
            <p className="text-gray-600 mb-4">{filteredProducts.length} product(s) found</p>
            <ProductGrid products={paginatedProducts} />
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
