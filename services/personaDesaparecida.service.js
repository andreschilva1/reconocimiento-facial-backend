import PersonaDesaparecida from "../models/personaDesaparecida.js";
import foto from "../models/foto.js";

export const addPersonaDesaparecida = async (nombre, descripcion, edad, sexo) => {
  const existePersonaDesaparecida = await PersonaDesaparecida.findOne({
    where: { nombre, edad, sexo },
  });

  if (existePersonaDesaparecida) return existePersonaDesaparecida;
  
    const personaDesaparecida = await PersonaDesaparecida.create({
        nombre,
        descripcion,
        edad,
        sexo,
    });

    return personaDesaparecida;
};

export const getPersonas = async () => { 
    const personasDesaparecidas = await PersonaDesaparecida.findAll({ include: { model: foto, as: 'fotos' } });
    return personasDesaparecidas;
}