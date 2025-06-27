import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PrepWise – AI Interview Prep',
  description: 'Personalized AI-driven mock interviews with feedback',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">{children}</body>
    </html>
  );
}
