import { Router } from 'express';
import { objectIdParamValidator } from '../utils/commonValidators';
import { validate } from '../utils/validatorHandler';
import { getAllUsers, getUserById, createUser, deleteUserById } from './controller';


const router = Router();

router.get("/", getAllUsers);
router.get("/:id", objectIdParamValidator(), validate, getUserById);
router.delete("/:id", objectIdParamValidator(), validate, deleteUserById);

export default router;