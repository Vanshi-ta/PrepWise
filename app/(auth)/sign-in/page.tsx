import SignInForm from '@/components/auth/SignInForm';

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow">
        <h1 className="mb-6 text-2xl font-bold text-center">Sign In</h1>
        <SignInForm />
      </div>
    </div>
  );
}