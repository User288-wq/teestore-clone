import { GetServerSideProps } from 'next';
import Layout from '../../components/Layout';
import { getOrderById } from '../../lib/orders-utils';
import { Order } from '../../lib/orders-utils';
import { useAuth } from '../../contexts/AuthContext';

interface OrderPageProps {
  order: Order | null;
}

export default function OrderPage({ order }: OrderPageProps) {
  const { user } = useAuth();

  if (!order) {
    return (
      <Layout>
        <div className="text-center py-20">
          <h1 className="text-3xl font-bold mb-4">Order not found</h1>
        </div>
      </Layout>
    );
  }

  // Vérifier que l'utilisateur connecté est bien le propriétaire
  if (user && user.id !== order.userId) {
    return (
      <Layout>
        <div className="text-center py-20">
          <h1 className="text-3xl font-bold mb-4">Access denied</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-16 px-6">
        <h1 className="text-3xl font-bold mb-4">Order #{order.id}</h1>
        <p className="text-gray-600 mb-2">Date: {new Date(order.createdAt).toLocaleString()}</p>
        <p className="mb-6">Status: <span className="font-semibold">{order.status}</span></p>
        <div className="bg-gray-50 p-6 rounded-sm">
          <h2 className="text-xl font-semibold mb-4">Items</h2>
          {order.items.map((item, idx) => (
            <div key={idx} className="flex justify-between py-2 border-b">
              <span>{item.name} x {item.quantity}</span>
              <span>{(item.price * item.quantity).toFixed(2)} €</span>
            </div>
          ))}
          <div className="flex justify-between font-bold mt-4 text-lg">
            <span>Total</span>
            <span>{order.total.toFixed(2)} €</span>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = parseInt(params?.id as string);
  if (isNaN(id)) return { props: { order: null } };
  const order = getOrderById(id);
  return { props: { order: order || null } };
};
