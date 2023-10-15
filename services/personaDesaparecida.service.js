import PersonaDesaparecida from "../models/personaDesaparecida.js";
import foto from "../models/foto.js";
import s3 from "../services/s3.service.js";


export const addPersonaDesaparecida = async (nombre, descripcion, edad, sexo,userId) => {
  const existePersonaDesaparecida = await PersonaDesaparecida.findOne({
    where: { nombre, edad, sexo },
  });

  if (existePersonaDesaparecida) return existePersonaDesaparecida;
  
    const personaDesaparecida = await PersonaDesaparecida.create({
        nombre,
        descripcion,
        edad,
        sexo,
        userId
    });

    return personaDesaparecida;
};

export const getPersonas = async () => { 
    const personasDesaparecidas = await PersonaDesaparecida.findAll({ include: { model: foto, as: 'fotos' } });
    return personasDesaparecidas;
}



export  const getMisPersonas = async (userId) => { 
  const personasDesaparecidas = await PersonaDesaparecida.findAll({ include: { model: foto, as: 'fotos' }, where: { userId: userId } });
  return personasDesaparecidas;
}

export const getPersonaById = async (id) => {
  const personaDesaparecida = await PersonaDesaparecida.findOne({where: {id}});
  return personaDesaparecida;
}

export const updatePersona = async ({id, nombre, descripcion, edad, sexo}) => {
  const personaDesaparecida = await PersonaDesaparecida.findOne({where: {id}});
  if(!personaDesaparecida) return null;

  personaDesaparecida.nombre = nombre;
  personaDesaparecida.descripcion = descripcion;
  personaDesaparecida.edad = edad;
  personaDesaparecida.sexo = sexo;

  await personaDesaparecida.save();

  return personaDesaparecida;
}

export const deletePersona = async (id) => {
  const personaDesaparecida = await PersonaDesaparecida.findOne({include: { model: foto, as: 'fotos' }, where: {id} });
  const fotos = personaDesaparecida.fotos;
  /* console.log(personaDesaparecida);
  console.log(fotos); */
  fotos.forEach(foto => {
    s3.deleteImage(foto.nombre);
  });

  if(!personaDesaparecida) return null;

  await personaDesaparecida.destroy();

  return personaDesaparecida;
}