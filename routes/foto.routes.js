import Router from "express";
import multer from "multer";
import uploadFoto from "../controllers/foto.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";


const upload = multer({ dest: "public/images/temporary_image" }); // Directorio temporal para almacenar las imágenes antes de subirlas a S3

const router = Router();

router.post("/subirImagen", upload.single("imagen"),authMiddleware , uploadFoto);


export default router;
