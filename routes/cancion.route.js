import { Router } from "express";
import * as CancionController from "../controllers/cancion.controller.js";
import verifyToken from "../middlewares/verifyToken.middleware.js";
import verifyAdmin from "../middlewares/verifyAdmin.middleware.js";

const router = Router();

router.get('/canciones', CancionController.getCanciones);
router.post('/canciones', verifyToken, verifyAdmin, CancionController.createCancion);
router.put('/canciones', verifyToken, verifyAdmin, CancionController.modifyCancion);
router.delete('/canciones', verifyToken, verifyAdmin, CancionController.deleteCancion);

export default router;
