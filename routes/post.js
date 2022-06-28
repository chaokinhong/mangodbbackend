import express from "express";
import {
  getPosts,
  createPost,
  updatdePosts,
  deletePost,
  likePost,
} from "../controllers/post.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// request and respond
router.get("/", getPosts);
router.post("/", auth, createPost);
// patch is used to update on existing document, :id means dynamic
// all patch is for updating
router.patch("/:id", auth, updatdePosts);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);

export default router;
