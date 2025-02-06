import mongoose from "mongoose";
import { type IProjects } from "./projects.dto";

const Schema = mongoose.Schema;

const ProjectsSchema = new Schema<IProjects>(
  {
    title: { type: String, required: true },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    }, // Reference to User model
    description: { type: String, required: true },
    zipFile: { type: String, required: true }, // URL to ZIP file
    isVerified: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    }, // Admin verification
    category: { type: String, required: true },
    technologies: { type: [String], default: [] }, // Array of technology tags
    price: { type: Number, required: true },
    averageRating: { type: Number, default: 0 }, // Default rating
  },
  { timestamps: true },
);

export default mongoose.model<IProjects>("projects", ProjectsSchema);
