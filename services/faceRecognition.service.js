import axios from 'axios';
import fs from 'fs';
import { env, nets, detectSingleFace, euclideanDistance } from 'face-api.js';
import canvas from 'canvas';

const { Canvas, Image, ImageData, loadImage  } = canvas;
env.monkeyPatch({ Canvas, Image, ImageData });



export async function getFaceDescriptor(fotoPath) {
    await loadModels();
    const foto = await cargarFotoDesdeURL(fotoPath);
    const resultado = await detectSingleFace(foto).withFaceLandmarks().withFaceDescriptor();
    console.log(resultado);
    return resultado.descriptor
}

export async function compararRostros(faceDescriptor1, faceDescriptor2) {

  const distanciaEuclidiana = euclideanDistance(faceDescriptor1,faceDescriptor2);
  const umbral = 0.6;
  return distanciaEuclidiana < umbral;
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



/* async function prueba() {
    const imageUsuarioDesaparecido = 'https://aws-sw1.s3.amazonaws.com/andres1.jpeg';
    const imageUsuarioEncontrado = 'https://aws-sw1.s3.amazonaws.com/1564318802764.jpg';
  
    const descriptor1 = await getFaceDescriptor(imageUsuarioDesaparecido);
    const descriptor2 = await getFaceDescriptor(imageUsuarioEncontrado);
  
    try {
      
        const resultado = await compararRostros(descriptor1, descriptor2);
  
      if (resultado) {
        console.log('Los rostros pertenecen a la misma persona.');
      } else {
        console.log('Los rostros pertenecen a personas diferentes.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  prueba(); */