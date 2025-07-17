import {
  guardarObra,
  obtenerTodasLasObras,
  borrarObra,
  editarObra,
  actualizarObra
} from "../controller/obrasController.js";

import { obtenerSalas } from "../model/salasModel.js";

// Cargar salas en el <select>
async function cargarSalasEnSelect() {
  const select = document.getElementById("select-sala");
  select.innerHTML = `<option value="">Selecciona una sala</option>`;
  const salas = await obtenerSalas();
  salas.forEach(sala => {
    const opt = document.createElement("option");
    opt.value = sala.id;
    opt.textContent = sala.nombre;
    select.appendChild(opt);
  });
}

// Cargar tabla de obras
import { db } from "../firebaseConfig.js";
import { collection, getDocs } from "firebase/firestore";

// Función para cargar obras y mostrar nombre de sala
export async function mostrarObras() {
  const obrasSnapshot = await getDocs(collection(db, 'figuras'));
  const salasSnapshot = await getDocs(collection(db, 'salas'));

  // Mapeamos IDs de salas a sus nombres
  const mapaSalas = {};
  salasSnapshot.forEach((doc) => {
    mapaSalas[doc.id] = doc.data().nombre;
  });

  const tabla = document.getElementById("tabla-obras");
  tabla.innerHTML = ""; // Limpiar tabla

  obrasSnapshot.forEach((doc) => {
    const obra = doc.data();
    const nombreSala = mapaSalas[obra.salaId] || "Sin asignar";

    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${obra.nombre}</td>
      <td>${obra.descripcion}</td>
      <td><img src="${obra.imagenUrl}" width="100" /></td>
      <td>${nombreSala}</td>
      <td>
        <button onclick="editarObra('${doc.id}')">Editar</button>
        <button onclick="eliminarObra('${doc.id}')">Eliminar</button>
      </td>
    `;
    tabla.appendChild(fila);
  });
}


// Guardar nueva obra
export function configurarFormularioObra() {
  const form = document.getElementById("form-obra");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const obra = {
      nombre: document.getElementById("nombre-obra").value,
      descripcion: document.getElementById("descripcion-obra").value,
      imagenUrl: document.getElementById("imagen-obra").value,
      salaId: document.getElementById("select-sala").value
    };

    await guardarObra(obra);
    form.reset();
    cargarObrasTabla();
  });

  cargarSalasEnSelect();
  cargarObrasTabla();
}

// Eliminar
window.eliminarObra = async function(id) {
  if (confirm("¿Eliminar esta obra?")) {
    await borrarObra(id);
    cargarObrasTabla();
  }
};

// Editar obra (modal)
window.editarObra = async function(id, nombre, descripcion, imagenUrl, salaId) {
  const modal = document.getElementById("modal-editar-obra");
  modal.style.display = "block";

  document.getElementById("editar-nombre-obra").value = nombre;
  document.getElementById("editar-descripcion-obra").value = descripcion;
  document.getElementById("editar-imagen-obra").value = imagenUrl;

  // Cargar salas en el select del modal
  const selectSala = document.getElementById("editar-sala-obra");
  selectSala.innerHTML = `<option value="">Selecciona una sala</option>`;
  const salas = await obtenerSalas();
  salas.forEach(sala => {
    const option = document.createElement("option");
    option.value = sala.id;
    option.textContent = sala.nombre;
    selectSala.appendChild(option);
  });
  selectSala.value = salaId;

  const form = document.getElementById("form-editar-obra");

  // Evitar duplicados: clonar y reemplazar form
  const newForm = form.cloneNode(true);
  form.parentNode.replaceChild(newForm, form);

  newForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nuevosDatos = {
      nombre: document.getElementById("editar-nombre-obra").value,
      descripcion: document.getElementById("editar-descripcion-obra").value,
      imagenUrl: document.getElementById("editar-imagen-obra").value,
      salaId: document.getElementById("editar-sala-obra").value,
    };

    await actualizarObra(id, nuevosDatos);
    modal.style.display = "none";
    newForm.reset();
    cargarObrasTabla();
  });

  // Botón cancelar
  document.getElementById("btn-cancelar-edicion-obra").onclick = () => {
    modal.style.display = "none";
    newForm.reset();
  };

  // Botón cerrar (X)
  document.getElementById("cerrar-modal-editar-obra").onclick = () => {
    modal.style.display = "none";
    newForm.reset();
  };

  // Cerrar modal si se hace clic fuera
  window.onclick = function(event) {
    if (event.target === modal) {
      modal.style.display = "none";
      newForm.reset();
    }
  };
};




