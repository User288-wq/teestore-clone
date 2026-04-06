import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNotify } from './useNotify';

export const useWishlist = () => {
  const { user } = useAuth();
  const { notifySuccess, notifyError } = useNotify();
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    if (!user) {
      setWishlist([]);
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(`/api/wishlist?userId=${user.id}`);
      const data = await res.json();
      setWishlist(data.wishlist.map((item: any) => item.productId));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [user]);

  const addToWishlist = async (productId: number) => {
    if (!user) {
      notifyError('Please login to add to wishlist');
      return false;
    }
    try {
      const res = await fetch(`/api/wishlist?userId=${user.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      });
      if (res.ok) {
        setWishlist(prev => [...prev, productId]);
        notifySuccess('Added to wishlist');
        return true;
      }
      notifyError('Failed to add');
      return false;
    } catch {
      notifyError('Network error');
      return false;
    }
  };

  const removeFromWishlist = async (productId: number) => {
    if (!user) return false;
    try {
      const res = await fetch(`/api/wishlist?userId=${user.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      });
      if (res.ok) {
        setWishlist(prev => prev.filter(id => id !== productId));
        notifySuccess('Removed from wishlist');
        return true;
      }
      notifyError('Failed to remove');
      return false;
    } catch {
      notifyError('Network error');
      return false;
    }
  };

  const toggleWishlist = (productId: number) => {
    if (isInWishlist(productId)) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(productId);
    }
  };

  const isInWishlist = (productId: number) => wishlist.includes(productId);

  return { wishlist, loading, addToWishlist, removeFromWishlist, toggleWishlist, isInWishlist };
};
