// pages/api/generate-feedback.ts

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { transcript } = req.body;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `This is an interview transcript:\n\n${transcript.join('\n')}\n\nPlease provide constructive feedback to improve performance.`
            }]
          }]
        })
      }
    );

    const data = await response.json();
    const feedback = `Great effort! Your responses were detailed.\n\nYou mentioned '${transcript.slice(-1)}'. Try expanding on it next time.\n\nSuggestions:\n- Add examples\n- Avoid filler words.`;

    res.status(200).json({ feedback });
  } catch (error: any) {
    console.error('Gemini feedback error:', error.message);
    res.status(500).json({ error: 'Failed to generate feedback' });
  }
}
