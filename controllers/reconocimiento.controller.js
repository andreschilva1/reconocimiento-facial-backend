import axios from 'axios';
import { env, nets, detectSingleFace, euclideanDistance } from 'face-api.js';
import canvas from 'canvas';


const { Canvas, Image, ImageData, loadImage  } = canvas;
env.monkeyPatch({ Canvas, Image, ImageData });

async function cargarImagenDesdeURL(url) {
  const response = await axios({
    url,
    responseType: 'arraybuffer'
  });

  //fs.writeFileSync(nombreArchivo, Buffer.from(response.data), 'binary');
    const buffer = Buffer.from(response.data);
    const imagen = await loadImage(buffer);
    return imagen;
}


async function compararRostros(imagen1Path, imagen2Path) {
/*   const imagen1 = await canvas.loadImage(imagen1Path);
  const imagen2 = await canvas.loadImage(imagen2Path);
 */  
  await nets.ssdMobilenetv1.loadFromDisk('./public/models_face_api');
  await nets.faceRecognitionNet.loadFromDisk('./public/models_face_api');
  await nets.faceLandmark68Net.loadFromDisk('./public/models_face_api');

  const imagen1 = await cargarImagenDesdeURL(imagen1Path);
  const imagen2 = await cargarImagenDesdeURL(imagen2Path);

  const resultados1 = await detectSingleFace(imagen1).withFaceLandmarks().withFaceDescriptor();
  const resultados2 = await detectSingleFace(imagen2).withFaceLandmarks().withFaceDescriptor();

  /* if (resultados1.length === 0 || resultados2.length === 0) {
    throw new Error('No se encontraron rostros en al menos una de las imágenes.');
  } */ 


  console.log(resultados1);
  console.log(resultados2);

  const descriptor1 = resultados1.descriptor;
  const descriptor2 = resultados2.descriptor;

  const distanciaEuclidiana = euclideanDistance(descriptor1, descriptor2);

  const umbral = 0.6;

  return distanciaEuclidiana < umbral;

}

async function main() {
  const imageUsuarioDesaparecido = 'https://aws-sw1.s3.amazonaws.com/andres1.jpeg';
  const imageUsuarioEncontrado = 'https://aws-sw1.s3.amazonaws.com/andres2.jpeg';

  try {
    
      const resultado = await compararRostros(imageUsuarioDesaparecido, imageUsuarioEncontrado);

    if (resultado) {
      console.log('Los rostros pertenecen a la misma persona.');
    } else {
      console.log('Los rostros pertenecen a personas diferentes.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
