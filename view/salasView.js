import { guardarSala, eliminarSala as eliminarSalaBD, actualizarSala } from "../controller/salasController.js";
import { obtenerSalas } from "../model/salasModel.js";

// 🔒 Función de validación
function validarCampos(nombre, descripcion, imagenUrl) {
  if (!nombre.trim()) {
    alert("El nombre no puede estar vacío.");
    return false;
  }

  if (descripcion.trim().length < 10) {
    alert("La descripción debe tener al menos 10 caracteres.");
    return false;
  }

  if (!/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(imagenUrl.trim())) {
    alert("La URL de imagen no es válida.");
    return false;
  }

  return true;
}

// 🔧 Configurar formulario de registro de sala
export function configurarFormularioSala() {
  const form = document.getElementById("form-sala");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre-sala").value;
    const descripcion = document.getElementById("descripcion-sala").value;
    const imagenUrl = document.getElementById("imagen-sala").value;

    if (!validarCampos(nombre, descripcion, imagenUrl)) return;

    await guardarSala({ nombre, descripcion, imagenUrl });
    form.reset();
    cargarSalasTabla();
  });
}

// 🖍️ Configurar formulario de edición
export function configurarEdicionFormularioSala() {
  const modal = document.getElementById("modal-editar-sala");

  document.getElementById("btn-cancelar-edicion-sala").onclick = () => {
    modal.style.display = "none";
  };
  document.getElementById("cerrar-modal-editar-sala").onclick = () => {
    modal.style.display = "none";
  };
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });
}

// 🧾 Cargar las salas en la tabla
export async function cargarSalasTabla() {
  const salas = await obtenerSalas();
  const tabla = document.getElementById("tabla-salas");
  tabla.innerHTML = "";

  salas.forEach(sala => {
    const fila = document.createElement("tr");

    fila.innerHTML = `
      <td>${sala.nombre}</td>
      <td>${sala.descripcion}</td>
      <td><img src="${sala.imagenUrl}" width="60" /></td>
      <td>
        <button onclick="editarSala('${sala.id}', '${sala.nombre}', '${sala.descripcion}', '${sala.imagenUrl}')">✏️</button>
        <button onclick="eliminarSala('${sala.id}')">🗑️</button>
      </td>
    `;

    tabla.appendChild(fila);
  });
}

// 🗑️ Eliminar sala
window.eliminarSala = async function (id) {
  if (confirm("¿Deseas eliminar esta sala?")) {
    await eliminarSalaBD(id);
    cargarSalasTabla();
  }
};

// ✏️ Editar sala
window.editarSala = function (id, nombre, descripcion, imagenUrl) {
  const modal = document.getElementById("modal-editar-sala");
  modal.style.display = "block";

  const form = document.getElementById("form-editar-sala");
  const inputNombre = document.getElementById("editar-nombre-sala");
  const inputDescripcion = document.getElementById("editar-descripcion-sala");
  const inputImagen = document.getElementById("editar-imagen-sala");

  inputNombre.value = nombre;
  inputDescripcion.value = descripcion;
  inputImagen.value = imagenUrl;

  // Elimina otros listeners antiguos
  const nuevoForm = form.cloneNode(true);
  form.parentNode.replaceChild(nuevoForm, form);

  nuevoForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nuevoNombre = inputNombre.value;
    const nuevaDescripcion = inputDescripcion.value;
    const nuevaImagen = inputImagen.value;

    if (!validarCampos(nuevoNombre, nuevaDescripcion, nuevaImagen)) return;

    await actualizarSala(id, {
      nombre: nuevoNombre,
      descripcion: nuevaDescripcion,
      imagenUrl: nuevaImagen
    });

    modal.style.display = "none";
    cargarSalasTabla();
  });
};









