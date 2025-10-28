"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
      <h1 className="text-6xl font-bold text-red-600">500</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mt-4">Something went wrong</h2>
      <p className="text-gray-600 mt-2">{error.message}</p>

      <button
        onClick={() => reset()}
        className="mt-6 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-2 rounded transition"
      >
        Try again
      </button>
    </div>
  );
}
