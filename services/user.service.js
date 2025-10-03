import { query } from "../db.js";

export async function addUser(name, pwd, isAdmin = false) {
    let result = await query("insert into public.user (nombre, password, is_admin) values($1, $2, $3) returning user_id", [
        name, pwd, isAdmin
    ]);

    return result.rows[0];
}

export async function findUser(id) {
    let result = await query("select * from public.user where user_id = $1", [id])
    return result.rows[0]
}
