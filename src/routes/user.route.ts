import express from 'express';
import { validateCreateUser, validateLoginUser } from '../validator/user';
import { createUser, loginUser, verifyAccount } from '../controllers/user.controller';

const router = express.Router();

router.post("/create", validateCreateUser, createUser)
router.post("/login", validateLoginUser, loginUser);
router.get("/verify-account", verifyAccount)

export default router;