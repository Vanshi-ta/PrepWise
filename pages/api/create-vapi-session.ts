import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { questions } = req.body;

  // Simulated session creation
  const session = {
    id: `vapi-session-${Date.now()}`, // unique per request
    createdAt: new Date().toISOString(),
  };


  res.status(200).json({ session });
}