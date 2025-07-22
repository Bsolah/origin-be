import express from 'express';
import {
  validateCreateUser,
  validateKycDetails,
  validateLoginUser,
} from '../validator/user';
import {
  addKycDetails,
  createUser,
  getMyKycDetails,
  loginUser,
  verifyAccount,
} from '../controllers/user.controller';
import { authenticateUser } from '../middlewares/authenticationMiddleware';

const router = express.Router();

router.post("/create", validateCreateUser, createUser)
router.post("/login", validateLoginUser, loginUser);
router.get("/verify-account", verifyAccount)
router.post('/add/kyc', authenticateUser, validateKycDetails, addKycDetails);
router.get('/kyc/personal', authenticateUser, getMyKycDetails);

export default router;