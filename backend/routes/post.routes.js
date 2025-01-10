import express from 'express';
import { getPosts, createPost } from '../controllers/posts.controller.js';
import multer from 'multer';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/', getPosts);
router.post('/add', upload.single('image'), createPost);

export default router;
