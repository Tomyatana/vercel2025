import { Router } from "express";
import * as EscuchaController from "../controllers/escucha.controller.js";

const router = Router();

router.get('/escucho', EscuchaController.getListened);

export default router;
