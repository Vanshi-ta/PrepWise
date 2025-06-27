export async function prepareInterviewSession(questions: string[]) {
  const response = await fetch('/api/create-vapi-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ questions }),
  });

  if (!response.ok) {
    throw new Error('Failed to create Vapi session');
  }

  const data = await response.json();
  return data.session;
}