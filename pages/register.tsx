import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = await register(name, email, password);
    if (success) {
      router.push('/');
    } else {
      setError('Registration failed. Email might already exist.');
    }
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto py-16 px-6">
        <h1 className="text-3xl font-bold mb-6">Register</h1>
        {error && <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Full Name" className="w-full border p-2 rounded" value={name} onChange={e => setName(e.target.value)} required />
          <input type="email" placeholder="Email" className="w-full border p-2 rounded" value={email} onChange={e => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" className="w-full border p-2 rounded" value={password} onChange={e => setPassword(e.target.value)} required />
          <button className="w-full bg-black text-white py-2 rounded">Create Account</button>
        </form>
        <p className="mt-4 text-center">Already have an account? <Link href="/login" className="underline">Login</Link></p>
      </div>
    </Layout>
  );
}
