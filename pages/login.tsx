import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = await login(email, password);
    if (success) {
      router.push('/');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto py-16 px-6">
        <h1 className="text-3xl font-bold mb-6">Login</h1>
        {error && <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" placeholder="Email" className="w-full border p-2 rounded" value={email} onChange={e => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" className="w-full border p-2 rounded" value={password} onChange={e => setPassword(e.target.value)} required />
          <button className="w-full bg-black text-white py-2 rounded">Sign In</button>
        </form>
        <p className="mt-4 text-center">No account? <Link href="/register" className="underline">Register</Link></p>
      </div>
    </Layout>
  );
}
