import express from "express";
import userRoutes from "./user/user.route";
import playlistRoutes from "./playlist/playlist.route";
import songRoutes from "./song/song.route";
import folderRoutes from "./folder/folder.route";
import projectRoutes from "./projects/projects.route";
import wallets from "./wallet/wallet.route"

// routes
const router = express.Router();

router.use("/users", userRoutes);
router.use("/playlists", playlistRoutes);
router.use("/songs", songRoutes);
router.use("/folders", folderRoutes);
router.use("/projects", projectRoutes);
router.use("/wallets",wallets)

export default router;
