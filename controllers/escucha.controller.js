import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { getSongsListened } from "../services/escucha.service.js";
import { findUser } from "../services/user.service.js";
import { VERY_SECRET_JWT_KEY, JWT_OPTS } from "../consts.js";

export async function getListened(req, res) {
    const user = req.body;
    console.log(user);
    if (!user.token) {
        return res.status(400).json({message: "Invalid fields"});
    }
    let user_payload = jwt.verify(user.token, VERY_SECRET_JWT_KEY);
    let result = await findUser(user_payload.id)
    if (result === 0) {
        return res.status(404).json({msg: "Invalid user"})
    }
    let listened = await getSongsListened(user_payload.id);
    res.send(listened.rows);
}
