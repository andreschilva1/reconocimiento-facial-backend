import {getPersonas, getMisPersonas, updatePersona,deletePersona } from "../services/personaDesaparecida.service.js";

const getPersonasDesaparecidas = async (req, res) => { 
    try {
        const personasDesaparecidas = await getPersonas();
        return res.status(200).json(personasDesaparecidas);
    } catch (error) {
        console.log("Error Server: ", error);
        return res.status(500).json(error);
    }
}

const getMisPersonasDesaparecidas = async (req, res) => { 
    try {
        const userId = req.body.authId;
        const personasDesaparecidas = await getMisPersonas(userId);

        return res.status(200).json(personasDesaparecidas);
    } catch (error) {
        console.log("Error Server: ", error);
        return res.status(500).json(error);
    }
}

const updatePersonaDesaparecida = async (req, res) => {
    try {

        const {id, nombre,descripcion, edad, sexo} = req.body;
        const updatedPersonaDesaparecida = await updatePersona(id, nombre, descripcion, edad, sexo);

        if (!updatedPersonaDesaparecida)
            return res.status(400).json({ message: "La persona no existe" });

        return res.status(200).json(updatedPersonaDesaparecida);
    } catch (error) {
        console.log("Error Server: ", error);
        return es.status(500).json(error);
    }
}

const deletePersonaDesaparecida = async (req, res) => {
    try {
        const { id} = req.body;
        
        const deletedPersonaDesaparecida = await deletePersona(id);
        if (!deletedPersonaDesaparecida)
            return res.status(400).json({ message: "La persona no existe" });
        
        return res.status(200).json(deletedPersonaDesaparecida);
    } catch (error) {
        console.log("Error Server: ", error);
        return es.status(500).json(error);
    }
}




export default {
    getPersonasDesaparecidas,
    getMisPersonasDesaparecidas,
    updatePersonaDesaparecida,
    deletePersonaDesaparecida,

};