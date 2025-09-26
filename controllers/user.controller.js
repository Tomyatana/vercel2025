import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { addUser, findUser } from "../services/user.service.js";
import { VERY_SECRET_JWT_KEY, JWT_OPTS } from "../consts.js";

export async function createUser(req, res) {
    const user = req.body;
    if (!user.nombre || !user.password) {
        return res.status(400).json({message: "Invalid fields"});
    }

    try {
        const hashedPwd = await bcrypt.hash(user.password, 10);
        user.password = hashedPwd;
        let result = addUser(user.nombre, user.password)
    }
    catch (err) {
        return res.status(500).json({message: err.message});
    }
    res.sendStatus(204);

}

export async function login(req, res) {
    const user = req.body;
    console.log(user);
    if (!user.user_id || !user.password) {
        return res.status(400).json({message: "Invalid fields"});
    }

    try {
        let dbuser = findUser(user.user_id);
        if (!dbuser) {
            return res.json({msg: "Incorrect user or password"});
        }
        const pwd_ok = bcrypt.compare(user.password, dbuser.password);

        const payload = {
            id: dbuser.user_id,
            username: dbuser.nombre,
        }
        const token = jwt.sign(payload, VERY_SECRET_JWT_KEY, JWT_OPTS);

        if (pwd_ok) {
            res.send({nombre: dbuser.nombre, token: token})
            return;
        }
        res.send("Incorrect user or password");
    } catch (e) {
        return res.status(500).json({msg: e.message})
    }
}
