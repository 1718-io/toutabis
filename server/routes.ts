import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { insertContributionSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Contribution routes
  app.post('/api/contributions', async (req, res) => {
    try {
      // Validate the request body
      const contributionData = insertContributionSchema.parse(req.body);
      
      // If user is authenticated, add their user ID
      let userId = null;
      if (req.isAuthenticated && req.isAuthenticated()) {
        userId = (req.user as any)?.claims?.sub;
      }

      const contribution = await storage.createContribution({
        ...contributionData,
        userId,
      });

      res.status(201).json(contribution);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      console.error("Error creating contribution:", error);
      res.status(500).json({ message: "Failed to create contribution" });
    }
  });

  app.get('/api/contributions', async (req, res) => {
    try {
      const contributions = await storage.getContributions();
      res.json(contributions);
    } catch (error) {
      console.error("Error fetching contributions:", error);
      res.status(500).json({ message: "Failed to fetch contributions" });
    }
  });

  app.get('/api/contributions/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid contribution ID" });
      }

      const contribution = await storage.getContribution(id);
      if (!contribution) {
        return res.status(404).json({ message: "Contribution not found" });
      }

      res.json(contribution);
    } catch (error) {
      console.error("Error fetching contribution:", error);
      res.status(500).json({ message: "Failed to fetch contribution" });
    }
  });

  app.post('/api/contributions/:id/like', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid contribution ID" });
      }

      await storage.likeContribution(id);
      res.json({ message: "Contribution liked successfully" });
    } catch (error) {
      console.error("Error liking contribution:", error);
      res.status(500).json({ message: "Failed to like contribution" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
