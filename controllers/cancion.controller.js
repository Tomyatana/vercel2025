import * as CancionService from "../services/cancion.service.js";

export async function getCanciones(req, res) {
    try {
        let result = await CancionService.getPublicCanciones();
        res.send(result.rows);
    } catch (e) {
        res.status(500).json({msg:e.toString()});
    }
}

export async function createCancion(req, res) {
    let name = req.body.name;
    if (!name) {
        return res.status(400).json({msg:"Expected name"})
    }
    try {
        await CancionService.addCancion(name);
        res.sendStatus(200);
    } catch (e) {
        res.status(500).json({msg:e.toString()});
    }
}

export async function modifyCancion(req, res) {
    let id = req.body.id;
    let name = req.body.name;
    if (!name) {
        return res.status(400).json({msg:"Expected name"})
    }
    if (!id) {
        return res.status(400).json({msg:"Expected id"})
    }
    try {
        await CancionService.modifyCancion(id, name);
        res.sendStatus(200);
    } catch (e) {
        res.status(500).json({msg:e.toString()});
    }
}

export async function deleteCancion(req, res) {
    let id = req.body.id;
    if (!id) {
        return res.status(400).json({msg:"Expected id"})
    }
    try {
        await CancionService.hideCancion(id);
        res.sendStatus(200);
    } catch (e) {
        res.status(500).json({msg:e.toString()});
    }
}
