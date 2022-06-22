import express from "express";
import { getPosts,createPost,updatdePosts,deletePost,likePost } from "../controllers/post.js";

const router = express.Router();

// request and respond
router.get("/", getPosts);
router.post("/", createPost);
// patch is used to update on existing document, :id means dynamic
// all patch is for updating
router.patch('/:id',updatdePosts)
router.delete('/:id',deletePost)
router.patch('/:id/likePost',likePost)

export default router;
