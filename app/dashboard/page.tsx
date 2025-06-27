import { db } from '@/lib/firebase/config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';
import InterviewList from '@/components/dashboard/InterviewList';

export default function DashboardPage() {
  interface Interview {
    id: string;
    title: string;
    date: string;
    vapiSessionId: string;
    transcript?: string[];
  }

  const [interviews, setInterviews] = useState<Interview[]>([]);

  useEffect(() => {
    const fetchInterviews = async () => {
      const user = getAuth().currentUser;
      if (!user) return;

      const q = query(collection(db, 'interviews'), where('userId', '==', user.uid));
      const snapshot = await getDocs(q);

      const data: Interview[] = snapshot.docs
        .map(doc => {
          const raw = doc.data();
          if (raw.title && raw.date && raw.vapiSessionId) {
            return {
              id: doc.id,
              title: raw.title,
              date: raw.date,
              vapiSessionId: raw.vapiSessionId,
              transcript: raw.transcript || [],
            };
          }
          return null;
        })
        .filter(Boolean) as Interview[];

      setInterviews(data);
    };

    fetchInterviews();
  }, []);

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Your Past Interviews</h1>
      <InterviewList interviews={interviews} />
    </div>
  );
}