import {
  users,
  contributions,
  type User,
  type UpsertUser,
  type Contribution,
  type InsertContribution,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations
  // (IMPORTANT) these user operations are mandatory for Replit Auth.
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Contribution operations
  createContribution(contribution: InsertContribution): Promise<Contribution>;
  getContributions(): Promise<(Contribution & { author?: User })[]>;
  getContribution(id: number): Promise<(Contribution & { author?: User }) | undefined>;
  likeContribution(id: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  // (IMPORTANT) these user operations are mandatory for Replit Auth.

  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Contribution operations
  async createContribution(contribution: InsertContribution): Promise<Contribution> {
    // Generate excerpt from content
    const plainText = contribution.content.replace(/<[^>]*>/g, '');
    const excerpt = plainText.length > 150 ? plainText.slice(0, 150) + '...' : plainText;
    
    const [newContribution] = await db
      .insert(contributions)
      .values({
        ...contribution,
        excerpt,
      })
      .returning();
    return newContribution;
  }

  async getContributions(): Promise<(Contribution & { author?: User })[]> {
    const result = await db
      .select({
        contribution: contributions,
        author: users,
      })
      .from(contributions)
      .leftJoin(users, eq(contributions.userId, users.id))
      .orderBy(desc(contributions.createdAt));

    return result.map(row => ({
      ...row.contribution,
      author: row.author || undefined,
    }));
  }

  async getContribution(id: number): Promise<(Contribution & { author?: User }) | undefined> {
    const [result] = await db
      .select({
        contribution: contributions,
        author: users,
      })
      .from(contributions)
      .leftJoin(users, eq(contributions.userId, users.id))
      .where(eq(contributions.id, id));

    if (!result) return undefined;

    return {
      ...result.contribution,
      author: result.author || undefined,
    };
  }

  async likeContribution(id: number): Promise<void> {
    await db
      .update(contributions)
      .set({
        likes: sql`${contributions.likes} + 1`,
      })
      .where(eq(contributions.id, id));
  }
}

export const storage = new DatabaseStorage();
