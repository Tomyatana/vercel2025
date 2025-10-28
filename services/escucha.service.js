import { query } from "../db.js";
import { Escucha } from "../models/escucha.model.js";

export async function getSongsListened(user_id) {
    return await Escucha.findAll({
        where: {
            user_id: user_id,
        },
    })
    return await query(`
        select e.user_id, c.id as cancion_id, c.nombre, e.fechaEscucha id from public.escucha e 
        inner join public.cancion c on e.cancion_id = c.id 
        where e.user_id = $1`, [user_id]
    );
}

export async function incrementSongsListened(cancion_id, user_id) {
    let date = new Date().toISOString();
    return await query(`
              INSERT INTO public.escucha(cancion_id, user_id, fechaEscucha) VALUES ($1, $2, $3)
        `, [cancion_id, user_id, date]
    );
}

export async function listenSong(cancion_id, user_id) {
    incrementSongsListened(cancion_id, user_id);
}
