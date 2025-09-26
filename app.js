import {config} from './dbconfig.js'
import express from "express";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import 'dotenv/config'

import pkg from 'pg'
const {Client} = pkg;

let client;
    client = new Client(config);
    await client.connect();

const app = express()
const PORT = 8000

const VERY_SECRET_JWT_KEY = "password"
const JWT_OPTS = {
    expiresIn: '1h',
}

app.use(express.json())

app.get('/canciones', async (req, res) => {
  let result = await client.query("select * from public.cancion");
  await client.end();
  console.log(result.rows);
  res.send(result.rows)
})

app.post('/createuser', async (req, res) => {
    const user = req.body;
    if (!user.nombre || !user.password) {
        return res.status(400).json({message: "Invalid fields"});
    }

    try {
        const hashedPwd = await bcrypt.hash(user.password, 10);
        user.password = hashedPwd;
        let result = await client.query("insert into public.user (nombre, password) values($1, $2) returning *", [
            user.nombre, user.password
        ]);
        await client.end();
        res.send(result.rows);
    }
    catch (err) {
        return res.status(500).json({message: err.message});
    }
});

app.post("/login", async (req, res) => {
    const user = req.body;
    console.log(user);
    if (!user.user_id || !user.password) {
        return res.status(400).json({message: "Invalid fields"});
    }

    try {
        let result = await client.query("select * from public.user where user_id = $1", [user.user_id])
        if (result.rows === 0) {
            return res.json({msg: "Incorrect user or password"});
        }
        let dbuser = result.rows[0];
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
})

app.post("/escucho", async (req, res) => {
    const user = req.body;
    console.log(user);
    if (!user.token) {
        return res.status(400).json({message: "Invalid fields"});
    }

    try {
        let user_payload = jwt.verify(user.token, VERY_SECRET_JWT_KEY);
        let result = await client.query("select * from public.user where user_id = $1", [user_payload.id]);
        if (result === 0) {
            return res.status(404).json({msg: "Invalid user"})
        }
        let listened = await client.query(`
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
