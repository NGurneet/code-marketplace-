import mongoose from "mongoose";
import { type BaseSchema } from "../common/dto/base.dto";

export interface IProjects extends BaseSchema {
  title: string;
  sellerId: mongoose.Types.ObjectId; // Reference to User
  description: string;
  zipFile: string; // URL of the uploaded ZIP
  isVerified?: "pending" | "approved" | "rejected"; // Admin verification status
  category: string; // Project category
  technologies?: string[]; // Tags like ["React", "Node.js"]
  price: number; // Selling price of the project
  averageRating?: number; // Default should be 0 if undefined
}
