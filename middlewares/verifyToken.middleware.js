import express from "express"
import { VERY_SECRET_JWT_KEY } from "../consts.js";
import jwt from "jsonwebtoken"

export default async function verifyToken(req, res, next) {
    let token = req.body.token;
    if (!token) {
        res.status(400).json({ msg: "Invalid Token" });
        return;
    }

    try {
        let user_payload = jwt.verify(token, VERY_SECRET_JWT_KEY);
        req.body.user = user_payload;
        req.body.token = undefined;
        console.log(user_payload);
        next();
    } catch {
        res.status(400).json({msg:"Expected token"});
    }
}
