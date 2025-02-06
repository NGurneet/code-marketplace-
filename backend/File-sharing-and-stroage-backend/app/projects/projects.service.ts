import path from "path";
import cloudinary from "../../config/cloudinary.config";
import { type IProjects } from "./projects.dto";
import ProjectsSchema from "./projects.schema";
import projectsSchema from "./projects.schema";
import fs from "fs";
import { response } from "express";
// import cloudinary from "cloudinary";
export const createProjects = async (
  data: IProjects,
  zipUrl: string,
  screenshots: string[],
) => {
  const result = await ProjectsSchema.create({
    ...data,
    zipFile: zipUrl,
    screenshots,
    active: true,
  });
  return result;
};

export const uploadProject = async (
  file: Express.Multer.File,
  userId: string,
  title: string,
  description: string,
  category: string,
  technologies: string[],
  price: number,
  screenshots: string[],
) => {
  try {
    // Upload file to Cloudinary
    const result = await uploadToCloudinary(file.path);

    // Create a new project record in the database
    const newProject = await projectsSchema.create({
      title: title, // Use the original file name as the project title
      zipFile: result.secure_url, // Cloudinary URL of the uploaded ZIP file
      description: description, // Project description passed from the form
      isVerified: "pending", // Verification status, can be updated later
      category: category, // Project category passed from the form
      technologies: technologies, // Technologies array passed from the form
      price: price, // Price of the project passed from the form
      averageRating: 0, // Initialize the average rating as 0
      sellerId: userId, // The user who uploaded the project
      screenshots: screenshots, // Assuming screenshots are handled elsewhere
    });

    return newProject;
  } catch (error) {
    console.error("Project upload failed:", error);
    throw new Error("Failed to upload the Project.");
  }
};

export const updateProjects = async (id: string, data: IProjects) => {
  const result = await ProjectsSchema.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });
  return result;
};

export const editProjects = async (id: string, data: Partial<IProjects>) => {
  const result = await ProjectsSchema.findOneAndUpdate({ _id: id }, data);
  return result;
};

export const deleteProjects = async (id: string) => {
  const result = await ProjectsSchema.deleteOne({ _id: id });
  return result;
};

export const getProjectsById = async (id: string) => {
  const result = await ProjectsSchema.findById(id).lean();
  return result;
};

export const getAllProjects = async () => {
  const result = await ProjectsSchema.find({}).lean();
  return result;
};

export const uploadToCloudinary = async (filePath: string) => {
  try {
    // Make sure resource type is set to 'auto' or 'raw' for audio files
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "raw", // Explicitly upload as 'raw' file type (for non-image files)
      public_id: `projects/${Date.now()}_${path.basename(filePath)}`, // Unique ID
    });

    return result; // Return cloud service response
  } catch (error) {
    throw new Error(`Cloudinary upload failed: ${error}`);
  }
};

export const addScreenshotsToProject = async (
  projectId: string,
  screenshotsUrls: string[],
) => {
  try {
    // Find the project by ID and update the screenshots field
    const updatedProject = await projectsSchema.findByIdAndUpdate(
      projectId,
      { $push: { screenshots: { $each: screenshotsUrls } } },
      { new: true },
    );
    return updatedProject;
  } catch (error) {
    throw new Error("Failed to add screenshots to project.");
  }
};

export const uploadScreenshots = async (
  screenshots: Express.Multer.File[], // Array of screenshots
  projectId: string, // The project ID to associate the screenshots with
) => {
  try {
    // Upload each screenshot to Cloudinary
    const screenshotUrls: string[] = [];

    for (const screenshot of screenshots) {
      const result = await uploadToCloudinary(screenshot.path); // Upload each screenshot
      screenshotUrls.push(result.secure_url); // Collect the Cloudinary URLs of the uploaded screenshots
    }

    // Update the project with the screenshot URLs
    const updatedProject = await ProjectsSchema.findByIdAndUpdate(
      projectId,
      { screenshots: screenshotUrls }, // Update screenshots field with the Cloudinary URLs
      { new: true }, // Return the updated project
    );

    return updatedProject; // Return the updated project record
  } catch (error) {
    console.error("Screenshot upload failed:", error);
    throw new Error("Failed to upload the screenshots.");
  }
};
