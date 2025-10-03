import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import * as EscuchaService from "../services/escucha.service.js";
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
    try {
        let listened = await EscuchaService.getSongsListened(user.id);
        res.status(200).send(listened.rows);
    } catch (e) {
        res.status(500).json({msg:e.toString()});
    }
}

export async function incListened(req, res) {
    const user = req.body.user;
    const id = req.body.id;
    if (!user || !id) {
        return res.status(400).json({message: "Invalid fields"});
    }
    
    try {
        let listened = await EscuchaService.incrementSongsListened(user.id);
        res.status(200).send(listened.rows);
    } catch (e) {
        res.status(500).json({msg:e.toString()});
    }
}

export async function listenSong(req, res) {
    const user = req.body.user;
    const id = req.body.id;
    if (!user || !id) {
        return res.status(400).json({message: "Invalid fields"});
    }
    
    try {
        await EscuchaService.listenSong(id, user.id);
        res.sendStatus(200)
    } catch (e) {
        res.status(500).json({msg:e.toString()});
    }
}
