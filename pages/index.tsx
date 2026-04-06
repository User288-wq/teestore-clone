import Layout from '../components/Layout';
import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';
import products from '../data/products.json';

export default function Home() {
  const featured = products.slice(0, 3);
  return (
    <Layout>
      <Hero />
      <section className="max-w-7xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
        <ProductGrid products={featured} />
      </section>
    </Layout>
  );
}
