import { agregarSala, eliminarSalaPorId, actualizarSalaPorId } from "../model/salasModel.js";

export async function guardarSala(data) {
  await agregarSala(data);
}

export async function eliminarSala(id) {
  await eliminarSalaPorId(id);
}

export async function actualizarSala(id, data) {
  await actualizarSalaPorId(id, data);
}
