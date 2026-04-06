import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useNotify } from '../hooks/useNotify';

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const { notifySuccess, notifyError } = useNotify();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push('/login?redirect=/checkout');
    }
  }, [user, router]);

  if (!user) return null;

  if (cart.length === 0) {
    return (
      <Layout>
        <div className="text-center py-20">
          <h1 className="text-3xl font-bold mb-4">Checkout</h1>
          <p className="text-gray-600">Your cart is empty. <a href="/products" className="underline">Continue shopping</a></p>
        </div>
      </Layout>
    );
  }

  const handlePlaceOrder = async () => {
    setLoading(true);
    const items = cart.map(item => ({
      productId: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
    }));
    const res = await fetch(`/api/orders?userId=${user.id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items, total: totalPrice }),
    });
    if (res.ok) {
      const { order } = await res.json();
      clearCart();
      notifySuccess('Order placed successfully!');
      router.push(`/order/${order.id}`);
    } else {
      notifyError('Failed to place order');
    }
    setLoading(false);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-16 px-6">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        <div className="bg-gray-50 p-6 rounded-sm mb-8">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          {cart.map(item => (
            <div key={item.id} className="flex justify-between py-2 border-b">
              <span>{item.name} x {item.quantity}</span>
              <span>{(item.price * item.quantity).toFixed(2)} €</span>
            </div>
          ))}
          <div className="flex justify-between font-bold mt-4 text-lg">
            <span>Total</span>
            <span>{totalPrice.toFixed(2)} €</span>
          </div>
        </div>
        <button
          onClick={handlePlaceOrder}
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-sm hover:bg-gray-800 transition disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Place Order'}
        </button>
      </div>
    </Layout>
  );
}
