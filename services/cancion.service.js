import { query } from "../db.js";
import { Cancion } from "../models/cancion.model.js";

export async function getAllCanciones() {
    return await Cancion.findAll({attributes: ["id", "nombre"]});
}

export async function getPublicCanciones() {
    return await Cancion.findAll({
        attributes: ["id", "nombre"],
        where: {is_hidden: false}
    });
}

export async function addCancion(name, isHidden = false) {
    await Cancion.create({nombre: name, is_hidden: isHidden});
    await Cancion.sync()
}

export async function modifyCancion(id, name) {
    const song = await Cancion.findByPk(id);
    song.nombre = name;
    await song.save();
}

export async function hideCancion(id) {
    const song = await Cancion.findByPk(id);
    song.is_hidden = false;
    await song.save();
}
