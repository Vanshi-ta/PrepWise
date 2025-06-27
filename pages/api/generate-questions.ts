// pages/api/generate-questions.ts

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { topic } = req.body;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Generate 5 mock interview questions on the topic "${topic}".`
            }]
          }]
        })
      }
    );

    const data = await response.json();
    const questionsText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    const questions = [
    `Tell me about your experience with ${topic}.`,
    `What are the most common challenges in ${topic}?`,
    `Explain a project you worked on involving ${topic}.`,
    `Which tools or frameworks do you prefer in ${topic}?`,
    `How would you handle a problem in ${topic}?`
  ];

    res.status(200).json({ questions });
  } catch (error: any) {
    console.error('Gemini error:', error.message);
    res.status(500).json({ error: 'Failed to generate questions' });
  }
}
