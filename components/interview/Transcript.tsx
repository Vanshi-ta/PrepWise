'use client';

import { useEffect, useState } from 'react';

interface TranscriptProps {
  sessionId: string;
}

export default function Transcript({ sessionId }: TranscriptProps) {
  const [transcript, setTranscript] = useState<string[]>([]);

  useEffect(() => {
    // Simulated stream – replace with live WebSocket/Vapi streaming logic
    const mockInterval = setInterval(() => {
      setTranscript((prev) => [...prev, `Mock message at ${new Date().toLocaleTimeString()}`]);
    }, 3000);

    return () => clearInterval(mockInterval);
  }, [sessionId]);

  return (
    <div className="p-4 mb-6 bg-gray-100 rounded h-64 overflow-y-scroll">
      <h2 className="mb-2 text-lg font-semibold">Transcript</h2>
      {transcript.map((line, index) => (
        <p key={index} className="text-sm text-gray-800">
          {line}
        </p>
      ))}
    </div>
  );
}