import { CircleAlert } from "lucide-react";
import React from "react";

interface PaymentFailedCardProps {
  receiverName: string;                // e.g. "Sophia"
  errorMessage?: string;               // optional custom message
  onTryAgain?: () => void;             // callback for "Try Again"
  onContactSupport?: () => void;       // callback for "Contact Support"
  onReturnDashboard?: () => void;      // callback for "Return to Dashboard"
}

export const PaymentFailedCard: React.FC<PaymentFailedCardProps> = ({
  receiverName,
  errorMessage,
  onTryAgain,
  onContactSupport,
  onReturnDashboard
}) => {
  return (
    <div className="w-full max-w-md p-8 space-y-6 text-center bg-background-light dark:bg-background-dark rounded-xl shadow-lg">
      {/* Icon */}
      <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-red-200">
        <span className="material-symbols-outlined text-primary text-5xl"><CircleAlert className="h-12 w-12 text-red-600"/></span>
      </div>

      {/* Title */}
      <h2 className="text-3xl font-bold text-red-600">
        Payment Failed
      </h2>

      {/* Message */}
      <p className="text-red-400">
        {errorMessage ??
          `We couldn't process your payment to ${receiverName}. Please check your details or try again later.`}
      </p>

      {/* Action buttons */}
      <div className="space-y-4 pt-4">
        <button
          onClick={onTryAgain}
          className="w-full h-12 px-6 bg-primary text-white font-semibold rounded-lg hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
        >
          Try Again
        </button>

        <button
          onClick={onContactSupport}
          className="w-full h-12 px-6 bg-primary/10 dark:bg-primary/20 text-primary font-semibold rounded-lg hover:bg-primary/20 dark:hover:bg-primary/30 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
        >
          Contact Support
        </button>
      </div>

      {/* Link */}
      <button
        onClick={onReturnDashboard}
        className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary"
      >
        Return to Dashboard
      </button>
    </div>
  );
};
