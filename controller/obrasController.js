import {
  agregarObra,
  obtenerObras,
  eliminarObraPorId,
  actualizarObraPorId
} from "../model/obrasModel.js";

export async function guardarObra(data) {
  return await agregarObra(data);
}

export async function obtenerTodasLasObras() {
  return await obtenerObras();
}

export async function borrarObra(id) {
  return await eliminarObraPorId(id);
}

export async function editarObra(id, datos) {
  return await actualizarObraPorId(id, datos);
}
export async function actualizarObra(id, datos) {
  return await actualizarObraPorId(id, datos);
}


