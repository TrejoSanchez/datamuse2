// dashboard.js

import { configurarFormularioSala, cargarSalasTabla } from "./view/salasView.js";
import { configurarFormularioObra } from "./view/obrasView.js"; // solo esta

document.addEventListener("DOMContentLoaded", () => {
  configurarFormularioSala();
  configurarFormularioObra(); // ya hace todo (cargar tabla + select)
  cargarSalasTabla(); // ← esto carga la tabla de salas al iniciar

});

window.mostrarSeccion = function (seccion) {
  document.querySelectorAll(".form-section").forEach(sec => sec.classList.remove("active"));
  document.getElementById(`seccion-${seccion}`).classList.add("active");
};
