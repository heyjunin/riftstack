import * as jwt from "jsonwebtoken";
import { log } from "../lib/logger";
import { MockUserRepository } from "../repositories/mock-user-repository";
import type { AuthResponse, AuthUser, JWTPayload, User } from "../types";

const JWT_SECRET =
  process.env.JWT_SECRET || "your-super-secret-jwt-key-change-in-production";
const JWT_EXPIRES_IN = "7d";

export class AuthService {
  private userRepository: MockUserRepository;

  constructor() {
    this.userRepository = new MockUserRepository();
    log.info("AuthService initialized");
  }

  async register(
    email: string,
    username: string,
    password: string
  ): Promise<AuthResponse> {
    log.debug("Registration process started", { email, username });

    // Check if user already exists
    const existingUser = await this.userRepository.findUserByEmail(email);
    if (existingUser) {
      log.warn("Registration failed - user already exists", { email });
      throw new Error("User with this email already exists");
    }

    // Hash password
    const hashedPassword = await this.userRepository.hashPassword(password);
    log.debug("Password hashed successfully", { email });

    // Create user
    const user = await this.userRepository.createUser({
      email,
      username,
      password: hashedPassword,
      role: "user",
    });

    log.debug("User created in repository", {
      userId: user.id,
      email,
      username,
    });

    // Generate JWT token
    const token = this.generateToken(user);
    log.debug("JWT token generated", { userId: user.id, email });

    const response = {
      user: this.toAuthUser(user),
      token,
    };

    log.info("User registration completed successfully", {
      userId: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    });

    return response;
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    log.debug("Login process started", { email });

    // Authenticate user
    const user = await this.userRepository.authenticateUser(email, password);
    if (!user) {
      log.warn("Login failed - invalid credentials", { email });
      throw new Error("Invalid email or password");
    }

    log.debug("User authenticated successfully", {
      userId: user.id,
      email,
      role: user.role,
    });

    // Generate JWT token
    const token = this.generateToken(user);
    log.debug("JWT token generated for login", { userId: user.id, email });

    const response = {
      user: this.toAuthUser(user),
      token,
    };

    log.info("User login completed successfully", {
      userId: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    });

    return response;
  }

  async validateToken(token: string): Promise<AuthUser | null> {
    try {
      log.debug("Token validation started");

      const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
      log.debug("Token decoded successfully", {
        userId: decoded.userId,
        email: decoded.email,
      });

      const user = await this.userRepository.findUserById(decoded.userId);

      if (!user) {
        log.warn("Token validation failed - user not found", {
          userId: decoded.userId,
        });
        return null;
      }

      log.debug("Token validation completed successfully", {
        userId: user.id,
        email: user.email,
        role: user.role,
      });

      return this.toAuthUser(user);
    } catch (error) {
      log.warn("Token validation failed - invalid token", {
        error: error instanceof Error ? error.message : "Unknown error",
      });
      return null;
    }
  }

  async getCurrentUser(userId: string): Promise<AuthUser | null> {
    log.debug("Getting current user", { userId });

    const user = await this.userRepository.findUserById(userId);
    if (user) {
      log.debug("Current user retrieved", {
        userId: user.id,
        email: user.email,
        role: user.role,
      });
    } else {
      log.warn("Current user not found", { userId });
    }

    return user ? this.toAuthUser(user) : null;
  }

  async updateProfile(
    userId: string,
    updates: Partial<AuthUser>
  ): Promise<AuthUser | null> {
    log.debug("Profile update started", { userId, updates });

    const user = await this.userRepository.updateUser(userId, updates);
    if (user) {
      log.info("Profile updated successfully", {
        userId: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
        updates,
      });
    } else {
      log.warn("Profile update failed - user not found", { userId });
    }

    return user ? this.toAuthUser(user) : null;
  }

  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string
  ): Promise<boolean> {
    log.debug("Password change started", { userId });

    const user = await this.userRepository.findUserById(userId);
    if (!user) {
      log.warn("Password change failed - user not found", { userId });
      return false;
    }

    // For mock implementation, we'll just check if current password matches mock
    const mockPasswords: Record<string, string> = {
      "admin@example.com": "admin123",
      "user@example.com": "user123",
    };

    const mockPassword = mockPasswords[user.email];
    if (mockPassword !== currentPassword) {
      log.warn("Password change failed - incorrect current password", {
        userId,
        email: user.email,
      });
      return false;
    }

    // Hash new password and update
    const hashedPassword = await this.userRepository.hashPassword(newPassword);
    await this.userRepository.updateUser(userId, { password: hashedPassword });

    log.info("Password changed successfully", { userId, email: user.email });
    return true;
  }

  private generateToken(user: User): string {
    log.debug("Generating JWT token", {
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    const payload: JWTPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
      iat: Math.floor(Date.now() / 1000),
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    log.debug("JWT token generated", {
      userId: user.id,
      email: user.email,
      expiresIn: JWT_EXPIRES_IN,
      payload,
    });

    return token;
  }

  private toAuthUser(user: User): AuthUser {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    };
  }

  // Getter for dependency injection
  getUserRepository(): MockUserRepository {
    return this.userRepository;
  }
}
