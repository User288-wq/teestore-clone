import Layout from '../components/Layout';
import Link from 'next/link';
import products from '../data/products.json';

const categories = [
  { name: 'Men', slug: 'men', description: 'T‑shirts for men – classic and modern cuts' },
  { name: 'Women', slug: 'women', description: 'T‑shirts for women – elegant and casual' },
  { name: 'Kids', slug: 'kids', description: 'T‑shirts for kids – colorful and comfy' }
];

export default function CategoriesPage() {
  const counts = categories.map(cat => ({
    ...cat,
    count: products.filter(p => p.category === cat.slug).length
  }));

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-16 px-6">
        <h1 className="text-4xl font-bold text-center mb-12">Shop by Category</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {counts.map(cat => (
            <Link key={cat.slug} href={`/categories/${cat.slug}`} className="group">
              <div className="border border-gray-200 rounded-sm p-8 text-center hover:shadow-md transition">
                <h2 className="text-2xl font-semibold mb-2 group-hover:text-black">{cat.name}</h2>
                <p className="text-gray-600 mb-2">{cat.description}</p>
                <span className="text-sm text-gray-500">{cat.count} products</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
