import { db } from './config';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

export async function getUserInterviews(userId: string) {
  const ref = collection(db, 'interviews');
  const q = query(ref, where('userId', '==', userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function saveInterview(data: any) {
  const ref = collection(db, 'interviews');
  const docRef = await addDoc(ref, data);
  return docRef.id;
}