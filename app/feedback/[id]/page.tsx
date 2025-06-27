'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { db } from '@/lib/firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { generateFeedback } from '@/lib/gemini/client';

export default function FeedbackPage() {
  const params = useParams();
  const id = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<string>('');
  const [title, setTitle] = useState<string>('');

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const ref = doc(db, 'interviews', id);
        const snap = await getDoc(ref);
        if (!snap.exists()) throw new Error('Interview not found');

        const data = snap.data();
        setTitle(data?.title);

        if (!data?.transcript || data.transcript.length === 0) {
          throw new Error('Transcript not available yet.');
        }

        const feedbackResult = await generateFeedback(data.transcript);
        setFeedback(feedbackResult);
      } catch (err: any) {
        console.error(err.message);
        setFeedback('Unable to generate feedback. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, [id]);

  return (
    <div className="max-w-2xl p-6 mx-auto mt-8 bg-white rounded shadow">
      <h1 className="mb-4 text-xl font-bold">Feedback for: {title}</h1>
      {loading ? (
        <p className="text-gray-500">Analyzing your interview...</p>
      ) : (
        <div className="whitespace-pre-wrap text-gray-800">{feedback}</div>
      )}
    </div>
  );
}
