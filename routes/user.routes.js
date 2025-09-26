import { Router } from "express";
import * as UserController from "../controllers/user.controller.js";

const router = Router();

router.post('/createuser', UserController.createUser);
router.post('/login', UserController.login);

export default router;
