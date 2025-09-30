import {config} from './dbconfig.js'
import express from "express";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import 'dotenv/config'
import { query } from './db.js';

import userRouter from './routes/user.routes.js';
import { VERY_SECRET_JWT_KEY, JWT_OPTS } from './consts.js';
import cancionRouter from './routes/cancion.route.js'
import { findUser } from './services/user.service.js';
import { getSongsListened } from './services/escucha.service.js';

const app = express()
const PORT = 8000

app.use(express.json())
app.use(userRouter)
app.use(cancionRouter)

app.post("/escucho", async (req, res) => {
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
})

app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
})
