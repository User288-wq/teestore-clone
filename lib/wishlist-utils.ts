import fs from 'fs';
import path from 'path';

export interface WishlistItem {
  userId: number;
  productId: number;
  addedAt: string;
}

const wishlistPath = path.join(process.cwd(), 'data', 'wishlist.json');

export function getWishlist(): WishlistItem[] {
  const data = fs.readFileSync(wishlistPath, 'utf-8');
  return JSON.parse(data);
}

export function saveWishlist(items: WishlistItem[]): void {
  fs.writeFileSync(wishlistPath, JSON.stringify(items, null, 2), 'utf-8');
}

export function getUserWishlist(userId: number): WishlistItem[] {
  return getWishlist().filter(item => item.userId === userId);
}

export function addToWishlist(userId: number, productId: number): WishlistItem {
  const items = getWishlist();
  const existing = items.find(i => i.userId === userId && i.productId === productId);
  if (existing) return existing;
  const newItem: WishlistItem = {
    userId,
    productId,
    addedAt: new Date().toISOString(),
  };
  items.push(newItem);
  saveWishlist(items);
  return newItem;
}

export function removeFromWishlist(userId: number, productId: number): boolean {
  const items = getWishlist();
  const filtered = items.filter(i => !(i.userId === userId && i.productId === productId));
  if (filtered.length === items.length) return false;
  saveWishlist(filtered);
  return true;
}

export function isInWishlist(userId: number, productId: number): boolean {
  return getWishlist().some(i => i.userId === userId && i.productId === productId);
}
