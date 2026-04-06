import { GetStaticPaths, GetStaticProps } from 'next';
import { useState, useMemo } from 'react';
import Layout from '../../components/Layout';
import ProductGrid from '../../components/ProductGrid';
import Pagination from '../../components/Pagination';
import products from '../../data/products.json';

type Slug = 'men' | 'women' | 'kids';
const slugs: Slug[] = ['men', 'women', 'kids'];
const titles: Record<Slug, string> = {
  men: 'Men',
  women: 'Women',
  kids: 'Kids'
};
const PRODUCTS_PER_PAGE = 6;

interface CategoryPageProps {
  slug: Slug;
  products: typeof products;
}

export default function CategoryPage({ slug, products: catProducts }: CategoryPageProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(catProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return catProducts.slice(start, start + PRODUCTS_PER_PAGE);
  }, [catProducts, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-16 px-6">
        <h1 className="text-3xl font-bold mb-4">{titles[slug]} T‑Shirts</h1>
        <p className="text-gray-600 mb-8">{catProducts.length} product(s)</p>
        <ProductGrid products={paginatedProducts} />
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = slugs.map(slug => ({ params: { slug } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<CategoryPageProps> = async ({ params }) => {
  const slug = params?.slug as Slug;
  const filtered = products.filter(p => p.category === slug);
  return { props: { slug, products: filtered } };
};
