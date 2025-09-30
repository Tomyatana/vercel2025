import * as CancionService from "../services/cancion.service.js";

export async function getCanciones(req, res) {
  let result = await CancionService.getAllCanciones();
  res.send(result.rows)
}
