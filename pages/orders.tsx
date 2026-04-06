import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import Link from 'next/link';

interface Order {
  id: number;
  total: number;
  status: string;
  createdAt: string;
  items: any[];
}

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    fetch(`/api/orders?userId=${user.id}`)
      .then(res => res.json())
      .then(data => {
        setOrders(data.orders || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [user]);

  if (!user) {
    return (
      <Layout>
        <div className="text-center py-20">
          <h1 className="text-3xl font-bold mb-4">My Orders</h1>
          <p className="text-gray-600">Please <a href="/login" className="underline">login</a> to view your orders.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-16 px-6">
        <h1 className="text-3xl font-bold mb-8">My Orders</h1>
        {loading ? (
          <p>Loading...</p>
        ) : orders.length === 0 ? (
          <p className="text-gray-600">You haven't placed any orders yet. <a href="/products" className="underline">Start shopping</a></p>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order.id} className="border rounded-sm p-4 flex justify-between items-center">
                <div>
                  <p className="font-semibold">Order #{order.id}</p>
                  <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                  <p className="text-sm">Total: {order.total.toFixed(2)} €</p>
                  <p className="text-sm">Status: <span className="capitalize">{order.status}</span></p>
                </div>
                <Link href={`/order/${order.id}`}>
                  <button className="bg-black text-white px-4 py-2 rounded-sm text-sm hover:bg-gray-800">View Details</button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
