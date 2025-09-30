import { query } from "../db.js";

export async function getSongsListened(user_id) {
    return await query(`
        select e.user_id, c.id, c.nombre, e.reproducciones from public.escucha e 
        inner join public.cancion c on e.cancion_id = c.id 
        where e.user_id = $1`, [user_id]
    );
}
