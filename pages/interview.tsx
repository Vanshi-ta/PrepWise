import { useState } from 'react';
import { db } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import Navbar from '../components/Navbar';

const questions = [
  "Tell me about yourself.",
  "What are your strengths and weaknesses?",
  "Why do you want to work here?",
];

const InterviewPage = () => {
  const [answers, setAnswers] = useState(Array(questions.length).fill(''));

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    const docRef = await addDoc(collection(db, "interviews"), {
      answers,
      timestamp: new Date(),
    });
    console.log("Document written with ID: ", docRef.id);
  };

  return (
    <div>
      <Navbar />
      <div className="p-4">
        {questions.map((question, index) => (
          <div key={index} className="mb-4">
            <h2 className="font-bold">{question}</h2>
            <textarea
              value={answers[index]}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
        ))}
        <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 rounded">
          Submit Answers
        </button>
      </div>
    </div>
  );
};

export default InterviewPage;
