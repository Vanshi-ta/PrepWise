import { auth } from './firebase';
import { signInWithEmailAndPassword, createUser WithEmailAndPassword, signOut } from 'firebase/auth';

export const signUp = (email: string, password: string) => {
  return createUser WithEmailAndPassword(auth, email, password);
};

export const signIn = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logout = () => {
  return signOut(auth);
};
