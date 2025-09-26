import {config} from './dbconfig.js'
import express from "express";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import 'dotenv/config'
import { query } from './db.js';

import userRouter from './routes/user.routes.js';
import { VERY_SECRET_JWT_KEY, JWT_OPTS } from './consts.js';

const app = express()
const PORT = 8000

app.use(express.json())
app.use(userRouter)

app.get('/canciones', async (req, res) => {
  let result = await query("select * from public.cancion");
  console.log(result.rows);
  res.send(result.rows)
})

app.post("/escucho", async (req, res) => {
    const user = req.body;
    console.log(user);
    if (!user.token) {
        return res.status(400).json({message: "Invalid fields"});
    }

    try {
        let user_payload = jwt.verify(user.token, VERY_SECRET_JWT_KEY);
        let result = await query("select * from public.user where user_id = $1", [user_payload.id]);
        if (result === 0) {
            return res.status(404).json({msg: "Invalid user"})
        }
        let listened = await query(`
                select e.user_id, c.id, c.nombre, e.reproducciones from public.escucha e 
                inner join public.cancion c on e.cancion_id = c.id 
                where e.user_id = $1`, [user_payload.id]);
        res.send(listened.rows);
    } catch (e) {
        return res.status(500).json({msg: e.message})
    }
})

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
})
