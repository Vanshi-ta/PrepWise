'use client';

import { useState } from 'react';

interface ControlsProps {
  sessionId: string;
}

export default function Controls({ sessionId }: ControlsProps) {
  const [isActive, setIsActive] = useState(false);

  const handleStart = () => {
    // Replace with real Vapi activation
    console.log('Interview started:', sessionId);
    setIsActive(true);
  };

  const handleStop = () => {
    // Replace with real Vapi stop call
    console.log('Interview ended:', sessionId);
    setIsActive(false);
  };

  return (
    <div className="flex items-center gap-4">
      {!isActive ? (
        <button
          onClick={handleStart}
          className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
        >
          Start Interview
        </button>
      ) : (
        <button
          onClick={handleStop}
          className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
        >
          End Interview
        </button>
      )}
    </div>
  );
}