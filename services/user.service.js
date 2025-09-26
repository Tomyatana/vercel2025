import { query } from "../db.js";

export async function addUser(name, pwd) {
    let result = await query("insert into public.user (nombre, password) values($1, $2)", [
        name, pwd
    ]);

    return result.rows[0];
}

export async function findUser(id) {
    result = await query("select * from public.user where user_id = $1", [id])
    return result.rows[0]
}
