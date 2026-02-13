export default function AuthErrorPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">Authentication Error</h1>
      <p className="text-neutral-400 mb-8">
        There was an issue signing you in. Please try again.
      </p>
      <a
        href="/login"
        className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-neutral-200 transition-colors"
      >
        Back to Login
      </a>
    </div>
  );
}
