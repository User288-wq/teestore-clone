import fs from 'fs';
import path from 'path';

export interface OrderItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: number;
  userId: number;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
}

const ordersPath = path.join(process.cwd(), 'data', 'orders.json');

export function getOrders(): Order[] {
  const data = fs.readFileSync(ordersPath, 'utf-8');
  return JSON.parse(data);
}

export function saveOrders(orders: Order[]): void {
  fs.writeFileSync(ordersPath, JSON.stringify(orders, null, 2), 'utf-8');
}

export function getOrdersByUser(userId: number): Order[] {
  const orders = getOrders();
  return orders.filter(o => o.userId === userId).sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getOrderById(orderId: number): Order | undefined {
  const orders = getOrders();
  return orders.find(o => o.id === orderId);
}

export function createOrder(userId: number, items: OrderItem[], total: number): Order {
  const orders = getOrders();
  const newId = orders.length > 0 ? Math.max(...orders.map(o => o.id)) + 1 : 1;
  const newOrder: Order = {
    id: newId,
    userId,
    items,
    total,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
  orders.push(newOrder);
  saveOrders(orders);
  return newOrder;
}

export function updateOrderStatus(orderId: number, status: Order['status']): Order | undefined {
  const orders = getOrders();
  const order = orders.find(o => o.id === orderId);
  if (!order) return undefined;
  order.status = status;
  saveOrders(orders);
  return order;
}
