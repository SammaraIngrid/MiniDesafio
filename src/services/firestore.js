import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export async function getChallenges() {
  const snapshot = await getDocs(collection(db, "challenges"));
  return snapshot.docs.map((doc) => doc.data());
}

export async function getMotivations() {
  const snapshot = await getDocs(collection(db, "motivations"));
  return snapshot.docs.map((doc) => doc.data());
}
