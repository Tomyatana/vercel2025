import { Escucha } from "../models/escucha.model.js";

export async function getSongsListened(user_id) {
    return await Escucha.findAll({
        where: {
            user_id: user_id,
        },
    })
}

export async function incrementSongsListened(cancion_id, user_id) {
    const date = new Date().toISOString();
    return await Escucha.create({
    cancion_id: cancion_id,
    user_id: user_id,
    fechaEscucha: date,
  });
}

export async function listenSong(cancion_id, user_id) {
    incrementSongsListened(cancion_id, user_id);
}
