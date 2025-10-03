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
        let result = await addUser(user.nombre, user.password);
        return res.status(200).json({user_id: result.user_id});
    }
    catch (err) {
        return res.status(500).json({message: err.message});
    }

}

export async function login(req, res) {
    const user = req.body;
    if (!user.id || !user.password) {
        return res.status(400).json({message: "Invalid fields"});
    }

    try {
        let dbuser = await findUser(user.id);
        if (!dbuser) {
            return res.status(400).json({msg: "Incorrect user or password"});
        }
        if (!dbuser.password) {
            return res.json({msg: "Incorrect user or password"});
        }

        const pwd_ok = await bcrypt.compare(user.password, dbuser.password);
        if (!pwd_ok) {
            return res.status(400).json({msg: "Incorrect user or password"});
        }

        const payload = {
            id: dbuser.user_id,
            username: dbuser.nombre,
            isAdmin: dbuser.is_admin
        };

        const token = jwt.sign(payload, VERY_SECRET_JWT_KEY, JWT_OPTS);

        if (pwd_ok) {
            res.send({nombre: dbuser.nombre, token: token})
            return;
        }
        res.send("Incorrect user or password");
    } catch (e) {
        return res.status(500).json({msg: e.toString()})
    }
}
