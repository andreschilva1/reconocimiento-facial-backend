import Router from "express";
import personasDesaparecidasController from "../controllers/personaDesaparecida.controller.js";

const router = Router();

router.get("/personasDesaparecidas", personasDesaparecidasController);

export default router;
