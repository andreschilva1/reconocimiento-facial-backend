import axios from 'axios';
import faceApi from 'face-api.js';
import canvas from 'canvas';
import PersonaDesaparecida from '../models/personaDesaparecida.js';
import Foto from '../models/foto.js';

const { env, nets, detectSingleFace, euclideanDistance,LabeledFaceDescriptors } = faceApi;
const { Canvas, Image, ImageData, loadImage  } = canvas;
env.monkeyPatch({ Canvas, Image, ImageData });



export async function getFaceDescriptor(fotoPath) {
    await loadModels();
    const foto = await cargarFotoDesdeURL(fotoPath);
    const resultado = await detectSingleFace(foto).withFaceLandmarks().withFaceDescriptor();
    console.log(resultado);
    return resultado.descriptor
}

export async function getLabeledFaceDescriptors() { 
  const personasDesaparecidas = await PersonaDesaparecida.findAll({attributes: ['id'], include: { model: Foto, as: 'fotos' , attributes: ['faceDescriptor'] }});

  if (!personasDesaparecidas) return null;

  const labeledFaceDescriptors = personasDesaparecidas.map(personaDesaparecida => {
    const descriptions = [];
    personaDesaparecida.fotos.forEach(foto => {
      descriptions.push(Float32Array.from(Object.values(foto['faceDescriptor'])));
    });
    console.log(descriptions);
    return new LabeledFaceDescriptors(
      personaDesaparecida.id.toString(),
      descriptions,
    )
  });
  return labeledFaceDescriptors;
}




export async function compararRostros(faceDescriptor1, faceDescriptor2) {

  const distanciaEuclidiana = euclideanDistance(faceDescriptor1,faceDescriptor2);
  const umbral = 0.6;
  return distanciaEuclidiana < umbral;
}
//funcion que recibir una lista de faceDescriptor y los compara con el faceDescriptor de la foto
export async function compararRostrosV1(faceDescriptor1) {
  const labeledFaceDescriptors = await getLabeledFaceDescriptors();
  const faceMatcher = new faceApi.FaceMatcher(labeledFaceDescriptors, 0.6);
  console.log(faceMatcher);
  const bestMatch = faceMatcher.findBestMatch(faceDescriptor1);

  const personaEncontrada = await PersonaDesaparecida.findOne({where: {id: bestMatch.label}, include: { model: Foto, as: 'fotos' }});
  console.log(personaEncontrada);

  return personaEncontrada;
}


async function cargarFotoDesdeURL(url) {
    const response = await axios({
      url,
      responseType: 'arraybuffer'
    });
  
    //fs.writeFileSync(nombreArchivo, Buffer.from(response.data), 'binary');
      const buffer = Buffer.from(response.data);
      const imagen = await loadImage(buffer);
      return imagen;
}

//carga de mdoelos de face-api.js  
async function loadModels() {
      await nets.ssdMobilenetv1.loadFromDisk('./public/models_face_api');
      await nets.faceRecognitionNet.loadFromDisk('./public/models_face_api');
      await nets.faceLandmark68Net.loadFromDisk('./public/models_face_api');
}
