import { Check, UserCircle2 } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

interface TransactionSuccessCardProps {
  amount: number;                
  currency?: string;              
  receiverName: string;           
  purpose?: string;        
}

export const TransactionSuccessCard: React.FC<TransactionSuccessCardProps> = ({
  amount,
  currency = "₹",
  receiverName,
  purpose = "",
}) => {
  const navigate = useNavigate()
  function onDone(){
    navigate('/')
  }
  return (
    <div className="w-full max-w-md mx-auto bg-content-light dark:bg-content-dark rounded-xl shadow-lg p-6 md:p-8 text-center">
      {/* Check icon */}
      <div className="flex justify-center items-center mx-auto  size-16 rounded-full mb-6 bg-green-200">
        <span className="material-symbols-outlined text-primary text-4xl"><Check className="text-green-600"/></span>
      </div>

      <h1 className="text-2xl font-bold text-green-600 mb-2">
        Transaction Successful!
      </h1>

      <p className="text-subtext-light dark:text-subtext-dark mb-6">
        You sent{" "}
        <span className="font-semibold text-text-light dark:text-text-dark">
          {currency}
          {amount.toFixed(2)}
        </span>{" "}
        to {receiverName}.
      </p>

      {/* Receiver info */}
      <div className="bg-background-light dark:bg-background-dark rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <UserCircle2
            className="w-12"
            />
          </div>
          <div className="flex-1 text-left">
            <p className="font-semibold text-text-light dark:text-text-dark">
              {receiverName}
            </p>
            {purpose && (
              <p className="text-sm text-subtext-light dark:text-subtext-dark">
                For: {purpose}
              </p>
            )}
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-text-light dark:text-text-dark">
              {currency}
              {amount.toFixed(2)}
            </p>
            <p className="text-xs text-subtext-light dark:text-subtext-dark">
              Completed
            </p>
          </div>
        </div>
      </div>

      <p className="text-xs text-subtext-light dark:text-subtext-dark mb-8">
        It may take a few moments for the transaction to appear in your activity.
      </p>

      <button
        onClick={onDone}
        className="w-full bg-primary text-white  font-semibold py-3 px-4 rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50  transition-colors"
      >
        Done
      </button>
    </div>
  );
};
