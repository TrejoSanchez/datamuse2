import { manejarLogin } from "../controller/authController.js";

export function configurarLogin() {
  const form = document.getElementById("form-login");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    manejarLogin(email, password);
  });
}

export function mostrarMensajeError(mensaje) {
  const mensajeDiv = document.getElementById("mensaje-error");
  mensajeDiv.textContent = mensaje;
  mensajeDiv.style.color = "red";
}

export function redirigirADashboard() {
  // Aquí puedes redirigir a la siguiente interfaz o cargar el dashboard
  window.location.href = "dashboard.html"; // Crea luego este archivo
}
