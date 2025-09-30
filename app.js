import express from "express";
import jwt from "jsonwebtoken"
import 'dotenv/config'

import userRouter from './routes/user.route.js';
import { VERY_SECRET_JWT_KEY } from './consts.js';
import cancionRouter from './routes/cancion.route.js'
import { findUser } from './services/user.service.js';
import { getSongsListened } from './services/escucha.service.js';
import escuchaRouter from './routes/escucha.route.js'

const app = express()
const PORT = 8000

app.use(express.json())
app.use(userRouter)
app.use(cancionRouter)
app.use(escuchaRouter)

app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
})
