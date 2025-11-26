import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export async function getMotivations() {
  const snapshot = await getDocs(collection(db, "motivations"));
  return snapshot.docs.map((doc) => doc.data());
}
