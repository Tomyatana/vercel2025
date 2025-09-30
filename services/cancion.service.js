import { query } from "../db.js";

export async function getAllCanciones() {
    return await query("select * from public.cancion");
}
