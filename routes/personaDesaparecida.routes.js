import Router from "express";
import personasDesaparecidasController from "../controllers/personaDesaparecida.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/personasDesaparecidas",authMiddleware, personasDesaparecidasController.getPersonasDesaparecidas);
router.get("/misPersonasDesaparecidas",authMiddleware, personasDesaparecidasController.getMisPersonasDesaparecidas);
router.put("/updatePersonaDesaparecida",authMiddleware, personasDesaparecidasController.updatePersonaDesaparecida);
router.delete("/deletePersonaDesaparecida",authMiddleware,personasDesaparecidasController.deletePersonaDesaparecida);

export default router;
