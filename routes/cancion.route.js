import { Router } from "express";
import * as CancionController from "../controllers/cancion.controller.js";

const router = Router();

router.get('/canciones', CancionController.getCanciones);

export default router;
