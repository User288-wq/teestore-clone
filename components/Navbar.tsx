import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useState } from 'react';
import { FiShoppingCart, FiUser, FiLogOut, FiSearch, FiHeart, FiSun, FiMoon } from 'react-icons/fi';

const Navbar = () => {
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <nav className="flex items-center justify-between px-6 md:px-12 py-5 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 transition-colors">
      <Link href="/" className="text-xl font-semibold tracking-wide text-gray-900 dark:text-white">T-SHIRT STORE</Link>
      <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-700 dark:text-gray-300">
        <Link href="/about" className="hover:text-black dark:hover:text-white">About</Link>
        <div className="relative" onMouseEnter={() => setIsCategoriesOpen(true)} onMouseLeave={() => setIsCategoriesOpen(false)}>
          <button className="hover:text-black dark:hover:text-white flex items-center gap-1">
            Categories <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </button>
          {isCategoriesOpen && (
            <div className="absolute left-0 mt-2 w-44 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-sm shadow-lg z-50">
              <Link href="/categories/men" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">Men</Link>
              <Link href="/categories/women" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">Women</Link>
              <Link href="/categories/kids" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">Kids</Link>
            </div>
          )}
        </div>
        <Link href="/products" className="hover:text-black dark:hover:text-white">Products</Link>
        <Link href="/contact" className="hover:text-black dark:hover:text-white">Contact</Link>
      </div>
      <div className="flex items-center space-x-5">
        <form onSubmit={handleSearch} className="relative">
          <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-8 pr-2 py-1 border rounded-sm text-sm focus:outline-none focus:border-black dark:focus:border-white bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600" />
          <FiSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        </form>
        <Link href="/wishlist"><FiHeart className="w-5 h-5 text-gray-700 dark:text-gray-300" /></Link>
        <Link href="/cart" className="relative">
          <FiShoppingCart className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          {totalItems > 0 && <span className="absolute -top-2 -right-2 bg-black dark:bg-white text-white dark:text-black text-[10px] w-4 h-4 flex items-center justify-center rounded-full">{totalItems}</span>}
        </Link>
        <button onClick={toggleTheme} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition">
          {theme === 'light' ? <FiMoon className="w-5 h-5 text-gray-700" /> : <FiSun className="w-5 h-5 text-yellow-400" />}
        </button>
        {user ? (
          <div className="relative">
            <button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} className="flex items-center gap-1">
              <FiUser className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              <span className="text-sm text-gray-700 dark:text-gray-300">{user.name}</span>
            </button>
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border rounded-sm shadow-lg z-50">
                <Link href="/orders" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">My Orders</Link>
                <button onClick={logout} className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 w-full">
                  <FiLogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center space-x-3">
            <Link href="/login" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white">Login</Link>
            <Link href="/register"><button className="bg-black dark:bg-white text-white dark:text-black px-5 py-2 text-sm font-medium rounded-sm hover:bg-gray-800 dark:hover:bg-gray-200 transition">Register</button></Link>
          </div>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
