import * as projectsService from "./projects.service";
import { createResponse } from "../common/helper/response.hepler";
import asyncHandler from "express-async-handler";
import { type Request, type Response } from "express";
import cloudinary from "../../config/cloudinary.config";
import path from "path";

export const createProjects = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await projectsService.createProjects(
      req.body,
      req.body.zipUrl,
      req.body.screenshots,
    );
    res.send(createResponse(result, "Projects created sucssefully"));
  },
);

export const uploadProject = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    console.log("[controller] req.file: ", req.file);
    // Check if file is present
    if (!req.file) {
      res.status(400).send(createResponse(null, "No Project provided"));
      return;
    }

    // Ensure 'folder' field exists (default to "default")
    const folder = req.body.folder || "default";

    // Get 'userId' from the request (presumably from authentication)
    const userId = req.user?._id;
    console.log("userId: ",userId);
    const title: string = req.body.title;
    const description: string = "Description";
    const category: string = req.body.category;
    const technologies: string[] = [req.body.technologies];
    const price: number = req.body.price;
    const screenshots: string[] = [];
    if (!userId) {
      res.status(400).send(createResponse(null, "User not authenticated"));
      return;
    }

    // Call the service to upload the song and store metadata in DB
    // const fileData = await projectsService.uploadProject(req.file, userId, );
    const fileData = await projectsService.uploadProject(
      req.file,
      
      userId,
      title,
      description,
      category,
      technologies,
      price,
      screenshots,
    );

    // Send success response back to the user
    res
      .status(201)
      .send(createResponse(fileData, "File uploaded successfully"));
  },
);

export const updateProjects = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await projectsService.updateProjects(
      req.params.id,
      req.body,
    );
    res.send(createResponse(result, "Projects updated sucssefully"));
  },
);

export const editProjects = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await projectsService.editProjects(req.params.id, req.body);
    res.send(createResponse(result, "Projects updated sucssefully"));
  },
);

export const deleteProjects = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await projectsService.deleteProjects(req.params.id);
    res.send(createResponse(result, "Projects deleted sucssefully"));
  },
);

export const getProjectsById = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await projectsService.getProjectsById(req.params.id);
    res.send(createResponse(result));
  },
);

export const getAllProjects = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await projectsService.getAllProjects();
    res.send(createResponse(result));
  },
);

// Controller for Uploading Screenshots
export const uploadProjectScreenshot = async (req: Request, res: Response) => {
  try {
    // Ensure a screenshot is present in the request files
    if (!req.file) {
      return res.status(400).json({ message: "No screenshot uploaded." });
    }

    const screenshot = req.file as Express.Multer.File; // Multer handles the single file

    // Project ID should be passed in the request body or params
    const { projectId } = req.params; // Assuming the projectId is passed as a URL parameter

    // Ensure that projectId is provided
    if (!projectId) {
      return res.status(400).json({ message: "Project ID is required." });
    }

    // Call the service function to upload the screenshot
    const updatedProject = await projectsService.uploadScreenshots(
      [screenshot],
      projectId,
    );

    // Respond with success and the updated project details
    res.status(200).json({
      message: "Screenshot uploaded successfully",
      updatedProject,
    });
  } catch (error) {
    console.error("Error uploading screenshot:", error);
    res
      .status(500)
      .json({ message: "Failed to upload screenshot", error: error });
  }
};
