import { useEffect, useState } from 'react';
import { db } from '../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    const fetchInterviews = async () => {
      const querySnapshot = await getDocs(collection(db, "interviews"));
      const interviewsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setInterviews(interviewsData);
    };
    fetchInterviews();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="p-4">
        <h1 className="text-xl font-bold">Completed Interviews</h1>
        <ul>
          {interviews.map(interview => (
            <li key={interview.id} className="border-b py-2">
              <span>{new Date(interview.timestamp).toLocaleString()}</span>
              <span className="ml-4">View Answers</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
