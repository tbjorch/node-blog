import { Router } from 'express';
import { validate } from '../utils/validatorHandler';
import { signup, login, logout } from './controller';
import { signupBodyValidator, loginBodyValidator } from './validator';

const router = Router();

router.post("/signup", signupBodyValidator, validate, signup);
router.post("/login", loginBodyValidator, validate, login);
router.post("/logout", logout);

export default router;