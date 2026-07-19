import { auth } from "../config/firebase";
import { 
  signInWithEmailAndPassword, 
  signOut, 
  createUserWithEmailAndPassword,
  sendPasswordResetEmail
} from "firebase/auth";

export async function loginUser(email, password) {
  return await signInWithEmailAndPassword(auth, email, password);
}

export async function registerUser(email, password) {
  return await createUserWithEmailAndPassword(auth, email, password);
}

export async function logoutUser() {
  return await signOut(auth);
}

export async function sendResetEmail(email) {
  return await sendPasswordResetEmail(auth, email);
}

export function getRedirectRoute(user) {
  if (!user) return "/login";
  if (user.email === "hridesh027@gmail.com") {
    return "/admin-dashboard";
  }
  return "/"; // Default home ya client dashboard route
}