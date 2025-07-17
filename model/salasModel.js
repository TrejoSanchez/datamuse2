import { db } from "../firebase-config.js";
import { collection, addDoc, getDocs, deleteDoc, updateDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const salasRef = collection(db, "salas");

export async function agregarSala(sala) {
  await addDoc(salasRef, sala);
}

export async function obtenerSalas() {
  const snapshot = await getDocs(salasRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function eliminarSalaPorId(id) {
  await deleteDoc(doc(salasRef, id));
}

export async function actualizarSalaPorId(id, datos) {
  await updateDoc(doc(salasRef, id), datos);
}

