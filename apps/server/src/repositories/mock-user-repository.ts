import * as bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import type { User, UserRepository } from "../types";

// Mock in-memory database
const users: User[] = [
  {
    id: "1",
    email: "admin@example.com",
    username: "admin",
    password: "hashed_admin123", // Will be properly hashed
    role: "admin",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    email: "user@example.com",
    username: "user",
    password: "hashed_user123", // Will be properly hashed
    role: "user",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
];

// Hash passwords for mock users
const mockPasswords = {
  "admin@example.com": "admin123",
  "user@example.com": "user123",
};

export class MockUserRepository implements UserRepository {
  async createUser(
    userData: Omit<User, "id" | "createdAt" | "updatedAt">
  ): Promise<User> {
    const existingUser = await this.findUserByEmail(userData.email);
    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    const user: User = {
      ...userData,
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    users.push(user);
    return user;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return users.find((user) => user.email === email) || null;
  }

  async findUserById(id: string): Promise<User | null> {
    return users.find((user) => user.id === id) || null;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | null> {
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) return null;

    users[userIndex] = {
      ...users[userIndex],
      ...updates,
      updatedAt: new Date(),
    };

    return users[userIndex];
  }

  async deleteUser(id: string): Promise<boolean> {
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) return false;

    users.splice(userIndex, 1);
    return true;
  }

  // Mock authentication methods
  async authenticateUser(
    email: string,
    password: string
  ): Promise<User | null> {
    const user = await this.findUserByEmail(email);
    if (!user) return null;

    const mockPassword = mockPasswords[email as keyof typeof mockPasswords];
    if (mockPassword && password === mockPassword) {
      return user;
    }

    return null;
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async verifyPassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
