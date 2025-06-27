import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './config';

export function subscribeToAuthChanges(callback: (user: any) => void) {
  return onAuthStateChanged(auth, (user) => {
    callback(user);
  });
}

export async function logoutUser() {
  await signOut(auth);
}