import React from 'react';
import { Link } from 'react-router';
import { Home, ArrowLeft, FileX } from 'lucide-react';
import Navbar from '../components/Navbar';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto">
          {/* 404 Icon */}
          <div className="w-32 h-32 bg-base-300 rounded-full flex items-center justify-center mb-8">
            <FileX className="w-16 h-16 text-base-content/50" />
          </div>
          
          {/* 404 Text */}
          <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
          
          {/* Error Message */}
          <h2 className="text-3xl font-bold text-base-content mb-4">
            Page Not Found
          </h2>
          
          <p className="text-base-content/70 mb-8 text-lg">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <Link
              to="/"
              className="btn btn-primary btn-lg flex-1 rounded-full"
            >
              <Home className="w-5 h-5 mr-2" />
              Go Home
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="btn btn-outline btn-lg flex-1 rounded-full"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
