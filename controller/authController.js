import { validarCredenciales } from "../model/authModel.js";
import { mostrarMensajeError, redirigirADashboard } from "../view/loginView.js";

export function manejarLogin(email, password) {
  const valido = validarCredenciales(email, password);
  if (valido) {
    redirigirADashboard();
  } else {
    mostrarMensajeError("Credenciales incorrectas. Intenta de nuevo.");
  }
}
