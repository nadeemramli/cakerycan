"use client";

export default function GlobalError() {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Something went wrong!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            We apologize for the inconvenience. Please try again later.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
