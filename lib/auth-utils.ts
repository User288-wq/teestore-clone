import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: string;
}

const usersPath = path.join(process.cwd(), 'data', 'users.json');

export function getUsers(): User[] {
  const data = fs.readFileSync(usersPath, 'utf-8');
  return JSON.parse(data);
}

export function saveUsers(users: User[]): void {
  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2), 'utf-8');
}

export function findUserByEmail(email: string): User | undefined {
  const users = getUsers();
  return users.find(u => u.email === email);
}

export async function createUser(name: string, email: string, password: string): Promise<User> {
  const users = getUsers();
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser: User = {
    id: users.length + 1,
    name,
    email,
    password: hashedPassword,
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);
  saveUsers(users);
  return newUser;
}

export async function verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(plainPassword, hashedPassword);
}
