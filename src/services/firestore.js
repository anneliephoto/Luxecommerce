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
import { sampleProducts } from "../data/products";

const PRODUCTS_COLLECTION = "products";
const ORDERS_COLLECTION = "orders";

function requireFirestore() {
  if (!db) {
    throw new Error("Firestore is not configured for this deployment.");
  }
}

export async function fetchProducts() {
  if (!db) {
    return sampleProducts;
  }

  try {
    requireFirestore();

    const q = query(collection(db, PRODUCTS_COLLECTION), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
  } catch {
    return sampleProducts;
  }
}

export async function fetchProductById(productId) {
  if (!db) {
    return sampleProducts.find((product) => product.id === productId) || null;
  }

  try {
    requireFirestore();

    const snapshot = await getDoc(doc(db, PRODUCTS_COLLECTION, productId));
    if (!snapshot.exists()) {
      return sampleProducts.find((product) => product.id === productId) || null;
    }

    return { id: snapshot.id, ...snapshot.data() };
  } catch {
    return sampleProducts.find((product) => product.id === productId) || null;
  }
}

export async function createProduct(productData) {
  requireFirestore();

  const payload = {
    ...productData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), payload);
  return { id: docRef.id, ...productData };
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
