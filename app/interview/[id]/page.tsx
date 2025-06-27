'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import Transcript from '@/components/interview/Transcript';
import Controls from '@/components/interview/Controls';

export default function InterviewSessionPage() {
  const params = useParams();
  const id = params?.id as string;

  const [interview, setInterview] = useState<any>(null);

  useEffect(() => {
    const fetchInterview = async () => {
      const docRef = doc(db, 'interviews', id);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        setInterview({ id: snap.id, ...snap.data() });
      }
    };

    fetchInterview();
  }, [id]);

  if (!interview) {
    return <p className="p-6 text-center">Loading interview...</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="mb-4 text-2xl font-bold">{interview.title}</h1>
      <Transcript sessionId={interview.vapiSessionId} />
      <Controls sessionId={interview.vapiSessionId} />
    </div>
  );
}
