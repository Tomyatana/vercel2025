import express from "express";
import 'dotenv/config'

import userRouter from './routes/user.route.js';
import cancionRouter from './routes/cancion.route.js'
import escuchaRouter from './routes/escucha.route.js'
import { sequelize } from "./dbconfig.js";

try {
    await sequelize.authenticate();
    console.log("Connected successfully");
} catch (e) {
    console.log("Connection failed: ", e);
}

const app = express()
const PORT = 8000

app.use(express.json())
app.use(cancionRouter)
app.use(userRouter)
app.use(escuchaRouter)

app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
})
