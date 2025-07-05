import React from "react";
import { AlertTriangle, RefreshCw, Shield, Info } from "lucide-react";

const RateLimitedUI = ({
  title = "Rate Limit Exceeded",
  message = "You've made too many requests. Please wait before trying again.",
}) => {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card w-full max-w-2xl bg-base-100 shadow-2xl">
        <div className="card-body p-8 text-center">
          {/* Header with Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-warning/20 rounded-full flex items-center justify-center">
              <Shield className="w-10 h-10 text-warning stroke-2" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-base-content mb-4">{title}</h1>

          {/* Message */}
          <p className="text-base-content/70 text-lg mb-8 max-w-lg mx-auto">
            {message}
          </p>

          {/* Rate Limit Info Card */}
          <div className="bg-base-200 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <AlertTriangle className="w-5 h-5 text-warning" />
              <span className="font-semibold text-base-content">
                Rate Limit Active
              </span>
            </div>

            <p className="text-sm text-base-content/60">
              Please wait before making another request
            </p>
          </div>

          <button
            onClick={() => window.location.reload()}
            className="btn btn-primary rounded-2xl px-4 py-2 font-bold text-black shadow-lg hover:shadow-xl transition-all duration-200 ease-in-out transform hover:scale-105 flex items-center gap-2 w-fit mx-auto"
          >
            Refresh Page
          </button>

          {/* Info Section */}
          <div className="mt-8 p-4 bg-info/10 rounded-lg border border-info/20">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-info mt-0.5 flex-shrink-0" />
              <div className="text-left">
                <h3 className="font-semibold text-info mb-2">
                  Why did this happen?
                </h3>
                <ul className="text-sm text-base-content/70 space-y-1">
                  <li>
                    • Rate limiting helps protect our servers from overload
                  </li>
                  <li>
                    • You've exceeded the maximum number of requests per minute
                  </li>
                  <li>• This helps ensure reliable service for all users</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Tips Section */}
          <div className="mt-6 text-left">
            <h3 className="font-semibold text-base-content mb-3 text-center">
              Tips to avoid rate limiting:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-3 bg-base-200 rounded-lg">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-primary">1</span>
                </div>
                <div>
                  <h4 className="font-medium text-base-content">
                    Pace your requests
                  </h4>
                  <p className="text-sm text-base-content/60">
                    Avoid making multiple requests in quick succession
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-base-200 rounded-lg">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-primary">2</span>
                </div>
                <div>
                  <h4 className="font-medium text-base-content">
                    Use efficiently
                  </h4>
                  <p className="text-sm text-base-content/60">
                    Batch operations when possible to reduce API calls
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateLimitedUI;
