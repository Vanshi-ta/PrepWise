import InterviewCard from './InterviewCard';

interface Interview {
  id: string;
  title: string;
  date: string;
  score?: number;
}

interface InterviewListProps {
  interviews: Interview[];
}

export default function InterviewList({ interviews }: InterviewListProps) {
  if (!interviews.length) {
    return <p className="text-gray-600">No interviews found. Let’s start one!</p>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {interviews.map((interview) => (
        <InterviewCard key={interview.id} interview={interview} />
      ))}
    </div>
  );
}