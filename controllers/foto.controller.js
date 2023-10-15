import s3 from "../services/s3.service.js";
import Foto from "../models/foto.js";
import { getFaceDescriptor } from "../services/faceRecognition.service.js";
import { addPersonaDesaparecida } from "../services/personaDesaparecida.service.js";

const uploadFoto = async (req, res) => {
  try {
    console.log(req.body);
    const url = await s3.uploadImage(req);
    const { nombre,descripcion, edad, sexo,authId} = req.body;

    const personaDesaparecida = await addPersonaDesaparecida(
      nombre,
      descripcion,
      edad,
      sexo,
      authId,
    );

    const descriptor = await getFaceDescriptor(url);

    await Foto.create({
      nombre: req.file.originalname,
      url,
      faceDescriptor: descriptor,
      personaDesaparecidaId: personaDesaparecida.id,
    });

    console.log(url);
    return res.status(200).json({
      message: "is Ok",
      url,
    });
  } catch (error) {
    console.log("Error Server: ", error);
    return res.status(500).json(error);
  }
};

export default uploadFoto;
