import { db } from "../firebase-config.js";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// ✅ usamos 'figuras' como colección para las obras
const obrasRef = collection(db, "figuras");

export async function agregarObra(obra) {
  await addDoc(obrasRef, obra);
}

export async function obtenerObras() {
  const snapshot = await getDocs(obrasRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function eliminarObraPorId(id) {
  const obraRef = doc(obrasRef, id);
  await deleteDoc(obraRef);
}

export async function actualizarObraPorId(id, datos) {
  const obraRef = doc(obrasRef, id);
  await updateDoc(obraRef, datos);
}

