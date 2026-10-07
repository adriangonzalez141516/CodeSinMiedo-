import fs from 'fs';
import path from 'path';

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
}

const dbPath = path.join(process.cwd(), 'src', 'mocks', 'users.json');

export async function getUsers(): Promise<User[]> {
  try {
    const data = await fs.promises.readFile(dbPath, 'utf8');
    return JSON.parse(data) as User[];
  } catch (error) {
    return [];
  }
}

export async function saveUser(user: User): Promise<void> {
  const users = await getUsers();
  users.push(user);
  await fs.promises.writeFile(dbPath, JSON.stringify(users, null, 2), 'utf8');
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
  const users = await getUsers();
  return users.find(u => u.email === email);
}
