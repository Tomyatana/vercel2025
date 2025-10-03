import { query } from "../db.js";

export async function getSongsListened(user_id) {
    return await query(`
        select e.user_id, c.id as cancion_id, c.nombre, e.reproducciones id from public.escucha e 
        inner join public.cancion c on e.cancion_id = c.id 
        where e.user_id = $1`, [user_id]
    );
}

export async function incrementSongsListened(cancion_id, user_id) {
    return await query(`
            update public.escucha e set reproducciones = reproducciones+1 where e.cancion_id = $1 and e.user_id = $2
        `, [cancion_id, user_id]
    );
}

export async function listenSong(cancion_id, user_id) {
    let songs_listened = await getSongsListened(user_id);
    let exists = false;
    for (let i = 0; i < songs_listened.rows.length; i++) {
        let row = songs_listened.rows[i];
        exists = row.user_id == user_id && row.cancion_id == cancion_id;
        if (exists) {
            break;
        }
    }
    if (exists) {
        return incrementSongsListened(cancion_id, user_id);
    }
    return await query(`
              INSERT INTO public.escucha(cancion_id, user_id, reproducciones) VALUES ($1, $2, 1)
        `, [cancion_id, user_id]
    );
}
