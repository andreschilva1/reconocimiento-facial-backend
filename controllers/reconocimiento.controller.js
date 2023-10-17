import Foto from "../models/foto.js";
import PersonaDesaparecida from "../models/personaDesaparecida.js";
import { getFaceDescriptor,getLabeledFaceDescriptors, compararRostrosV1} from "../services/faceRecognition.service.js";
import s3Service from "../services/s3.service.js";

const compararRostros = async (req, res) => { 
  try {

    const url =  await s3Service.uploadImage(req);
    const faceDescriptor = await getFaceDescriptor(url);   
    const comparacion = await compararRostrosV1(faceDescriptor);
    return res.status(200).json(comparacion);

  } catch (error) {
    return res.status(500).json(error);
  }
}

export default compararRostros;



