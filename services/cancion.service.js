import { query } from "../db.js";

export async function getAllCanciones() {
    return await query("select * from public.cancion");
}

export async function getPublicCanciones() {
    return await query("select * from public.cancion c where not c.is_hidden");
}

export async function addCancion(name, isHidden = false) {
    return await query("insert into public.cancion(nombre, is_hidden) values ($1, $2)", [name, isHidden]);
}

export async function modifyCancion(id, name) {
    return await query("update public.cancion c set nombre = $2 where c.id = $1", [id, name]);
}

export async function hideCancion(id) {
    return await query("update public.cancion c set is_hidden = true where c.id = $1", [id]);
}
