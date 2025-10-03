import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { getSongsListened } from "../services/escucha.service.js";
import { findUser } from "../services/user.service.js";
import { VERY_SECRET_JWT_KEY, JWT_OPTS } from "../consts.js";

export async function getListened(req, res) {
    const user = req.body.user;
    if (!user) {
        return res.status(400).json({message: "Invalid fields"});
    }
    
    let result = await findUser(user.id)
    if (result === 0) {
        return res.status(404).json({msg: "Invalid user"})
    }
    let listened = await getSongsListened(user.id);
    res.send(listened.rows);
}
