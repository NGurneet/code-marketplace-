import { Router } from "express";
import { catchError } from "../common/middleware/cath-error.middleware";
import * as projectsController from "./projects.controller";
import * as projectsValidator from "./projects.validation";
import { upload } from "../common/middleware/multer.middleware";
import validateToken from "../common/middleware/auth.middleware";

const router = Router();

router
  .get("/", projectsController.getAllProjects)
  .get("/:id", projectsController.getProjectsById)
  .delete("/:id", projectsController.deleteProjects)
  .post(
    "/",
    // projectsValidator.createProjects,  // Validate project data
    catchError,
    validateToken, // Catch errors
    upload.single("file"), // Handle file upload (single file with key "file")
    // upload.fields([
    //   { name: "file", maxCount: 1 }, // The main ZIP file
    //   { name: "screenshots", maxCount: 5 }, // Allow up to 5 screenshots (can adjust as needed)
    // ]),
    projectsController.uploadProject, // Handle the actual project creation
  )

  .put(
    "/:id",
    projectsValidator.updateProjects,
    catchError,
    projectsController.updateProjects,
  )
  .patch(
    "/:id",

    catchError,
    projectsController.editProjects,
  );

// const upload = multer({
//   dest: 'uploads/screenshots/', // Temporary file storage
//   limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
//   // You can add file filter here if you need to restrict file types
// });

router.post(
  "/projects/:projectId/screenshot", // Route to upload a single screenshot
  upload.single("screenshot"), // Handle a single file upload
  projectsController.uploadProjectScreenshot, // Call the controller function to handle the upload
);

export default router;
