import { Router } from 'express';
import { objectIdParamValidator } from '../utils/commonValidators';
import { validate } from '../utils/validatorHandler';
import { getAllPosts, getPostById, createPost, deletePostById } from './controller';
import { postBodyValidator } from './validator';


const router = Router();

router.post("/", postBodyValidator(), validate, createPost);
router.get("/", getAllPosts);
router.get("/:id", objectIdParamValidator(), validate, getPostById);
router.delete("/:id", objectIdParamValidator(), validate, deletePostById);

export default router;