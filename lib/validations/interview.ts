import { z } from 'zod';

export const interviewSchema = z.object({
  title: z.string().min(3, 'Title is too short'),
  questions: z
    .array(z.string().min(5, 'Each question must have some content'))
    .min(1, 'At least one question is required'),
  vapiSessionId: z.string().min(1, 'Vapi session ID is required'),
  date: z.date(),
  userId: z.string(),
});

export type InterviewData = z.infer<typeof interviewSchema>;