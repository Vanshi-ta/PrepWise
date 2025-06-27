'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebase/config';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { generateQuestions } from '@/lib/gemini/client';
import { prepareInterviewSession } from '@/lib/vapi/client';

export default function CreateInterviewPage() {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCreate = async () => {
    setLoading(true);
    try {
      const user = getAuth().currentUser;
      if (!user) throw new Error('User not authenticated');

      // 1. Generate interview questions from Gemini
      const questions = await generateQuestions(topic);

      // 2. Prepare Vapi AI session
      const vapiSession = await prepareInterviewSession(questions);

      // 3. Save interview session in Firestore
      const docRef = await addDoc(collection(db, 'interviews'), {
        userId: user.uid,
        title: topic,
        date: Timestamp.now(),
        questions,
        vapiSessionId: vapiSession.id,
      });

      // 4. Redirect to interview page
      router.push(`/interview/${docRef.id}`);
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl p-6 mx-auto mt-8 bg-white rounded shadow">
      <h1 className="mb-4 text-xl font-bold">Create a New Interview</h1>
      <label className="block mb-2 text-sm font-medium">Topic</label>
      <input
        type="text"
        className="w-full p-2 mb-4 border rounded"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="e.g., Frontend Development, Data Structures"
      />
      <button
        onClick={handleCreate}
        disabled={loading || !topic}
        className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Generating...' : 'Start Interview'}
      </button>
    </div>
  );
}