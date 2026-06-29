import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

const PRODUCTS_COLLECTION = "products";
const ORDERS_COLLECTION = "orders";

function requireFirestore() {
  if (!db) {
    throw new Error("Firestore is not configured for this deployment.");
  }
}

export async function fetchProducts() {
  requireFirestore();

  const q = query(collection(db, PRODUCTS_COLLECTION), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
}

export async function fetchProductById(productId) {
  requireFirestore();

  const snapshot = await getDoc(doc(db, PRODUCTS_COLLECTION, productId));
  if (!snapshot.exists()) {
    return null;
  }

  return { id: snapshot.id, ...snapshot.data() };
}

export async function createProduct(productData) {
  requireFirestore();

  const normalizedPrice = Number(productData?.price);
  const payload = {
    ...productData,
    title: productData?.title?.trim() || "Untitled Product",
    description: productData?.description?.trim() || "",
    category: productData?.category?.trim() || "Uncategorized",
    image: productData?.image?.trim() || "https://via.placeholder.com/150",
    price: Number.isFinite(normalizedPrice) ? normalizedPrice : 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), payload);
  return { id: docRef.id, ...payload };
}

export async function updateProduct(productId, productData) {
  requireFirestore();

  await updateDoc(doc(db, PRODUCTS_COLLECTION, productId), {
    ...productData,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteProduct(productId) {
  requireFirestore();

  await deleteDoc(doc(db, PRODUCTS_COLLECTION, productId));
}

export async function createOrder(orderData) {
  requireFirestore();

  const payload = {
    ...orderData,
    createdAt: serverTimestamp(),
  };

  const docRef = await addDoc(collection(db, ORDERS_COLLECTION), payload);
  return { id: docRef.id, ...orderData };
}
