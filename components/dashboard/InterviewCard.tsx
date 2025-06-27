// components/dashboard/InterviewCard.tsx

import Link from 'next/link';

interface InterviewCardProps {
  interview: {
    id: string;
    title: string;
    date: string;
    score?: number;
  };
}

export default function InterviewCard({ interview }: InterviewCardProps) {
  const formattedDate = new Date(interview.date).toLocaleDateString();

  return (
    <Link href={`/interview/${interview.id}`}>
      <div className="p-4 bg-white rounded shadow hover:shadow-md transition">
        <h2 className="text-lg font-semibold">{interview.title}</h2>
        <p className="text-sm text-gray-500">{formattedDate}</p>
        {interview.score !== undefined && (
          <p className="mt-2 text-sm font-medium text-blue-600">Score: {interview.score}</p>
        )}
      </div>
    </Link>
  );
}