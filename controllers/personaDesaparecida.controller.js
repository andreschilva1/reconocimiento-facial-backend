import {getPersonas } from "../services/personaDesaparecida.service.js";

const getPersonasDesaparecidas = async (req, res) => { 
    try {
        const personasDesaparecidas = await getPersonas();
        return res.status(200).json(personasDesaparecidas);
    } catch (error) {
        console.log("Error Server: ", error);
        return res.status(500).json(error);
    }
}

export default getPersonasDesaparecidas;