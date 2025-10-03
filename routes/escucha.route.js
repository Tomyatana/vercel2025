import { Router } from "express";
import * as EscuchaController from "../controllers/escucha.controller.js";
import verifyToken from "../middlewares/verifyToken.middleware.js";

const router = Router();

router.get('/escucho', verifyToken, EscuchaController.getListened);
router.post('/escucho', verifyToken, EscuchaController.listenSong);

export default router;
