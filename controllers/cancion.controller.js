import * as CancionService from "../services/cancion.service.js";

export async function getCanciones(req, res) {
    let result = await CancionService.getPublicCanciones();
    res.send(result.rows)
}

export async function createCancion(req, res) {
    let name = req.body.name;
    if (!name) {
        return res.status(400).json({msg:"Expected name"})
    }
    await CancionService.addCancion(name);
    res.sendStatus(200);
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
    await CancionService.modifyCancion(id, name);
    res.sendStatus(200);
}

export async function deleteCancion(req, res) {
    let id = req.body.id;
    if (!id) {
        return res.status(400).json({msg:"Expected id"})
    }
    await CancionService.hideCancion(id);
    res.sendStatus(200);
}
