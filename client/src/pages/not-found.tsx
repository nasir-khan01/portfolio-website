import { Link } from "wouter";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <div className="flex justify-center mb-4">
          <AlertCircle className="h-12 w-12 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">404 Page Not Found</h1>
        <p className="text-gray-600 mb-6">
          The page you requested could not be found.
        </p>
        <Link href="/">
          <a className="text-blue-600 hover:text-blue-800 font-medium">
            Return to Home
          </a>
        </Link>
      </div>
    </div>
  );
}
