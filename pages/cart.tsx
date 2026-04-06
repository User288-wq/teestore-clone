import Layout from '../components/Layout';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import Link from 'next/link';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, totalPrice } = useCart();
  const { user } = useAuth();

  if (cart.length === 0) {
    return (
      <Layout>
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold">Your cart is empty</h2>
          <Link href="/products" className="text-black underline mt-4 inline-block">Continue Shopping</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-16 px-6">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        <div className="space-y-6">
          {cart.map(item => (
            <div key={item.id} className="flex flex-col md:flex-row gap-6 border-b pb-6">
              <div className="w-32 h-32"><img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-sm" /></div>
              <div className="flex-1"><h3 className="font-semibold">{item.name}</h3><p>{item.price.toFixed(2)} €</p></div>
              <div className="flex items-center gap-3">
                <button onClick={() => updateQuantity(item.id, item.quantity-1)} className="border px-2 py-1">-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity+1)} className="border px-2 py-1">+</button>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="text-red-500">Remove</button>
            </div>
          ))}
          <div className="text-right text-xl font-bold">Total: {totalPrice.toFixed(2)} €</div>
          {user ? (
            <Link href="/checkout"><button className="bg-black text-white px-8 py-3 rounded-sm">Proceed to Checkout</button></Link>
          ) : (
            <p className="text-sm text-gray-600">Please <Link href="/login" className="underline">login</Link> to checkout.</p>
          )}
        </div>
      </div>
    </Layout>
  );
}
